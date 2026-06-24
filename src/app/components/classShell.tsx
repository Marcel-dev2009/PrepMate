/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import NotFound from "../not-found";
import { useState, useEffect} from "react";
import { useParams} from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  PanelLeftClose,
  PanelLeftOpen,
  BookOpen,
  ChevronRight,
  Clock,
  CheckCircle2,
  Circle,
} from "lucide-react";

// ─── Mock topics per subject ────────────────────────────────────────────────
import { subjectTopics } from "@/lib/data";
import { Button } from "@/components/ui/button";

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({
  subject,
  open,
  topics,
  activeTopic,  
  setActiveTopic,
}: {
  subject: string;
  open: boolean;
  topics: { id: string; title: string; done: boolean }[];
  activeTopic: string;
  setActiveTopic: (id: string) => void;
}) 
{; // This line says filter the array and get the number of those whose "done" fields are true
  const done = topics.filter((t) => t.done).length
  const pct = Math.round((done / topics.length) * 100);
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.aside
          key="sidebar"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 272, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="h-full bg-white border-r border-green-100 flex flex-col overflow-hidden shrink-0"
          style={{ minWidth: 0 }}
        >
          {/* Sidebar inner — fixed width so content doesn't squish during animation */}
          <div className="w-68 flex flex-col h-full">
            {/* Subject label */}
            <div className="px-5 pt-6 pb-4 border-b border-green-100">
              <p className="text-[11px] font-semibold tracking-widest text-green-500 uppercase mb-1">
                Subject
              </p>
              <h2 className="text-lg font-bold text-gray-900 leading-tight">
                {subject.replace(/_/g, " ")}
              </h2>
            </div>

            {/* Progress bar widget */}
            <div className="px-5 py-4 border-b border-green-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">Progress</span>
                <span className="text-xs font-bold text-green-600">{pct}%</span>
              </div>
              <div className="w-full h-2 bg-green-50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-green-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1.5">
                {done} of {topics.length} topics completed
              </p>
            </div>

            {/* Topics list */}
            <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
              <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase px-2 mb-2">
                Topics
              </p>
              {topics.map((topic, i) => {
                const isActive = activeTopic === topic.id;
                return (
                  <motion.button
                    key={topic.id}
                    onClick={() => {
                      setActiveTopic(topic.id)
                      console.log(topic)
                    }}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 group
                      ${isActive
                        ? "bg-green-500 text-white shadow-sm shadow-green-200"
                        : "hover:bg-green-50 text-gray-700"
                      }`}
                  >
                    {topic.done ? (
                      <CheckCircle2
                        size={15}
                        className={isActive ? "text-white" : "text-green-400"}
                      />
                    ) : (
                      <Circle
                        size={15}
                        className={isActive ? "text-white/70" : "text-gray-300"}
                      />
                    )}
                    <span className="text-sm font-medium flex-1 leading-snug">
                      {topic.title}
                    </span>
                    {isActive && <ChevronRight size={13} className="text-white/80" />}
                  </motion.button>
                );
              })}
            </nav>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
// Done button
function ToggleButton({topics , activeTopic , OnToggle}:{topics:{id:string , done:boolean}[] , activeTopic:string , OnToggle:(id:string) => void}){
//  const [done , setDone] = useState(false) 
 /* 
 Once I update the object property then I'll update it's UI state
 */
 const currentTopic = topics.find((t) => t.id === activeTopic);
 if(!currentTopic) return null;
 return(
  <Button className="px-8 py-6 md:mt-5"
               onClick={() => OnToggle(activeTopic)}
               >
            <p className="font-semibold">{currentTopic.done ? "Mark Incomplete" : "Finish"}</p>
             </Button>
 )
}
// ─── Header ───────────────────────────────────────────────────────────────────
function Header({
  subject,
  sidebarOpen,
  toggleSidebar,
  activeTopic,
  topics,
}: {
  subject: string;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  activeTopic: string;
  topics: { id: string; title: string; done: boolean }[];
}) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const currentTopic = topics.find((t) => t.id === activeTopic);

  return (
    <header className="h-14 bg-white border-b border-green-100 flex items-center px-4 gap-3 shrink-0">
      {/* Sidebar toggle */}
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg hover:bg-green-50 text-gray-500 hover:text-green-600 transition-colors"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
      </button>

      {/* Divider */}
      <span className="w-px h-5 bg-green-100" />

      {/* Subject + topic breadcrumb */}
      <div className="flex items-center gap-2 min-w-0">
        <BookOpen size={15} className="text-green-500 shrink-0" />
        <span className="text-sm font-semibold text-gray-800 truncate">
          {subject.replace(/_/g, " ")}
        </span>
        {currentTopic && (
          <>
            <ChevronRight size={13} className="text-gray-300 shrink-0" />
            <span className="text-sm text-gray-500 truncate hidden sm:block">
              {currentTopic.title} 
            </span>
          </>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Clock widget */}
      <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 bg-green-50 px-3 py-1.5 rounded-full">
        <Clock size={12} className="text-green-400" />
        <span className="font-mono font-medium text-gray-600">{time}</span>
      </div>
    </header>
  );
}

// ─── Root Layout Shell ────────────────────────────────────────────────────────
export default function ClassroomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const subject = (params?.room as string) ?? "Subject"
  const [topics , setTopics] = useState(subjectTopics[subject] ?? subjectTopics["default"]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTopic, setActiveTopic] = useState(topics[0]?.id ?? "1");
  const handleToggle = (id:string) => {
   setTopics((prev) => prev.map((t) => t.id === id ? {...t , done:!t.done} : t)) 
  }
  // Auto-close sidebar on mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    if (mq.matches) setSidebarOpen(false);
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setSidebarOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
    const currentTopic = topics.find((t) => t.id === activeTopic);
   const pdfPath = currentTopic?.pdf; 
   if (!currentTopic?.enabled || !pdfPath) {
  return <NotFound />
}
  return (
    <div className="flex flex-col h-screen bg-[#f7fdf7] overflow-hidden">
      {/* Header */}
      <Header
        subject={subject}
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen((p) => !p)}
        activeTopic={activeTopic}
        topics={topics}
      />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="md:hidden fixed inset-0 bg-black/20 z-10"
            />
          )}
        </AnimatePresence>

        {/* Sidebar — absolute on mobile, relative on md+ */}
        <div
          className={`
            ${sidebarOpen ? "block" : "hidden md:block"}
            absolute md:relative z-20 md:z-auto h-full
          `}
        >
          <Sidebar
            subject={subject}
            open={sidebarOpen}
            topics={topics}
            activeTopic={activeTopic} 
            setActiveTopic={setActiveTopic}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scroll-smooth scrollbar-none">
          <motion.div
            key={activeTopic}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="max-w-4xl mx-auto"
          > 
            <iframe src={pdfPath} className="w-full h-200 scroll-auto scrollbar-none"/>
            {children}
             <div className="" dir="rtl">
             <ToggleButton topics={topics} activeTopic={activeTopic} OnToggle={handleToggle}/>
             </div>
          </motion.div>
         
        </main>
      </div>
    </div>
  );
}