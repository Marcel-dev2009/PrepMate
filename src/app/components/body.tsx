"use client";
interface LiftProps {
  showLogin : boolean; 
  showNotes : boolean;
  openNotifications: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>> 
  setShowNotes: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenNotifications: React.Dispatch<React.SetStateAction<boolean>>;
} 

import { BsRocketTakeoffFill } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { CgNotes } from "react-icons/cg";
import { IoMdPlay } from "react-icons/io";
import { MdSubject } from "react-icons/md";
import { items } from "@/lib/data";
import { GiProgression } from "react-icons/gi";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { IoMdClose } from "react-icons/io";
import ButtonContainer from "./buttonHeader";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GoHash } from "react-icons/go"; 
import { toast } from "sonner";
import Footer from "./footer";
const ProfileSetUp = dynamic(() => import("./profile-setup"));
const ComingSoon = dynamic(() => import("./coming-soon"));
const ResultHistory = dynamic(() => import("./result-history"));
const Login = dynamic(() => import('./login'));
const Slider = dynamic(() => import('./Slider'));
const ClassRoomBody = dynamic(() => import("./class-room-body"))
const SignUp = dynamic(() => import('./signUp')); // This is to lazy load this component to make sure it's loaded when needed;
function Body({showLogin , setShowLogin , showNotes , setShowNotes , openNotifications , setOpenNotifications} : LiftProps) {
  const [practiceOpen , setpracticeOpen] = useState<boolean>(false);
  const [subjectOpen , setSubjectOpen] =useState<boolean>(false);
  const [selected , setSelected] = useState<string>("");
  const [checkedSubject , setCheckedSubject] = useState<boolean>(false);
  const [error , setError] = useState<string>("");
  const [classRoomOpen , setClassRoomOpen] = useState<boolean>(false);
  const [modal , setModal] = useState<"login" | "profile" | boolean | null>(null)
  const [showSignUp , setShowsignUp] = useState<boolean>(false);
  const [showAnalysis , setShowAnalysis] = useState<boolean>(false);
  const [showResult , setShowResult] = useState<boolean>(false);
  const router = useRouter()
 const openPractice = () => {
  if(!selected){
   setError("Select a subject to get started!!")
  } else {
   router.push(`/practice/${selected}`);
   setError(" ")
 }};
    return (
   <>
   <main
   style={{
    backgroundImage : "url('/bg.svg')"
   }}
   className={ practiceOpen ? "blur-sm grid grid-cols-2 bg-cover bg-center bg-no-repeat overflow-hidden" :  "grid grid-cols-2 bg-cover bg-center bg-no-repeat overflow-hidden"}
   >
      <div className="sm:block md:hidden w-screen">
      <Slider/>
     </div>

    <div className="mt-4 md:mt-8 absolute top-105 left-2 md:static md:ml-12"> 
       <div className="space-x-3.5 space-y-1.5">
        <ButtonContainer onClick={() => setpracticeOpen(!practiceOpen)} className="bg-blue-100
        group relative
        ">
          <BsRocketTakeoffFill className="w-12 mx-auto" size="1.5rem"/>
        <p className="text-blue-500 font-semibold">Practice Past Questions</p>
        <span className=" hidden group-hover:block absolute bottom-0  bg-black/30 w-full rounded-tr-sm  rounded-tl-sm py-2">
          <p className="text-sm">With 33,350 questions</p>
        </span>
       </ButtonContainer>




       <ButtonContainer className=" group bg-pink-200 md:ml-2 relative" onClick={() => setClassRoomOpen(!classRoomOpen)}>
        <SiGoogleclassroom className="w-12 mx-auto" size="1.5rem"/>
        <p className="font-semibold text-red-500">Classroom</p>
          <span className=" hidden group-hover:block absolute bottom-0  bg-black/30 w-full rounded-tr-sm  rounded-tl-sm py-2">
          <p className="text-sm">Study Materials,Excersices and AI tutor</p>
        </span>
       </ButtonContainer>
 
       </div>
   



       <div className="space-x-2.5 space-y-1.5">
        <ButtonContainer className=" group mt-2 bg-gray-300 relative" onClick={() => setShowResult(!showResult)}>
          <CgNotes className="mx-auto" size="1.5rem"/>
        <p className="font-semibold text-gray-700">Result History</p>
        <span className=" hidden group-hover:block absolute bottom-0  bg-black/30 w-full rounded-tr-sm  rounded-tl-sm py-2">
          <p className="text-sm">Track Your Performance</p>
        </span>
       </ButtonContainer>
       <ButtonContainer className=" group bg-gray-400 md:ml-2 relative" onClick={() => setShowAnalysis(!showAnalysis)}>
        <GiProgression className="mx-auto" size="1.5rem"/>
        <p className="font-semibold text-green-950">Performance Analysis</p>
        <span className=" hidden group-hover:block absolute bottom-0  bg-black/30 w-full rounded-tr-sm  rounded-tl-sm py-2">
          <p className="text-sm">Insightful Analysis on your result</p>
        </span>
       </ButtonContainer>
       </div>
    </div>

   <div className="ml-12 hidden md:block">
      <Slider/> {/* Slider */}
     </div>

   </main>

    {/* Utility handlers and pages */}
    {classRoomOpen && (
      <section className="fixed inset-0 flex items-start py-10 justify-center bg-black/50 z-10">
        <div className=" h-auto max-h-[90vh] overflow-y-auto scroll-smooth scrollbar-none">
        <div className="flex items-center justify-between px-5 py-4 bg-linear-to-r from-emerald-500 to-green-600 rounded-t-2xl">
        {/* Header */}
        <div>
          <h2 className="text-lg font-bold text-white">
          Class Room and Study Hub
          </h2>
          <p className="text-sm text-white/70">
          Prepare for your exams with precise and up-to-date notes
          </p>
        </div>
            <Button
        variant="ghost"
        size="icon"
        onClick={() => setClassRoomOpen(!classRoomOpen)}
        className="rounded-full hover:bg-white/10 transition"
      >
        <IoMdClose className="text-2xl text-white" />
      </Button>
        </div>
          {/* Body Would be an External component */}
          <ClassRoomBody/>
        </div>

      </section>
    )};
    {showAnalysis && (
      <section className="fixed inset-0 bg-black/50 z-10 flex justify-center items-start py-10">
        <div className="max-h[90vh] w-3xl h-auto">
           <div className="flex justify-between bg-linear-to-r px-5 py-4 from-emerald-500 to-green-600 rounded-t-2xl">
       <div className="flex flex-col gap-2">
          <h2 className="font-bold text-white text-md md:text-lg tracking-widset leading-snug">Performace Analysis</h2>
        <p className="font-light text-neutral-100">Get an insight on your Performance</p>
       </div>
       <span className="mt-2 md:mt-3">
        <IoMdClose fill="#fff" onClick={() => setShowAnalysis(!showAnalysis)}/>
       </span>
       </div>
          <ComingSoon/>
        </div>
      </section>
    )}
    {showResult && (
      <section className="fixed inset-0 bg-black/50 z-10 flex justify-center items-start py-5">
        <div className="max-h-[90vh] w-3xl h-auto overflow-y-auto scroll-smooth scrollbar-none">

           <div className="flex justify-between bg-linear-to-r px-5 py-4 from-emerald-500 to-green-600 rounded-t-2xl overflow-y-auto scroll-smooth scrollbar-none">

            <div className="flex flex-col gap-2">
          <h2 className="font-bold text-white text-md md:text-lg tracking-widset leading-snug">Performace Analysis</h2>
        <p className="font-light text-neutral-100">Get an insight on your Performance</p>
       </div>

       <span className="mt-2 md:mt-3">
        <IoMdClose fill="#fff" onClick={() => setShowResult(!showResult)}/>
       </span>
       </div>
         <ResultHistory/>
        </div> {/* Main end */}
      </section>
    )}
    {practiceOpen && (
     <section className="fixed inset-0 flex items-start py-10 justify-center bg-black/50 ">
       <div className="max-h-[90vh] w-4xl h-auto overflow-y-auto scrollbar-thumb-card scrollbar-none">

         <div className="flex items-center justify-between px-5 py-4 bg-linear-to-r from-emerald-500 to-green-600 rounded-t-2xl">

  {/* LEFT SIDE */}
  <div>
    <h2 className="text-lg font-bold text-white">
      Practice Session
    </h2>

    <p className="text-sm text-white/70">
      Prepare for UTME & SSCE exams
    </p>
  </div>

  {/* CLOSE BUTTON */}
  <Button
    variant="ghost"
    size="icon"
    onClick={() => setpracticeOpen(!practiceOpen)}
    className="rounded-full hover:bg-white/10 transition"
  >
    <IoMdClose className="text-2xl text-white" />
  </Button>
</div>
          <div className="bg-white min-h-full shadow-lg rounded-b-2xl">
          <div className="flex justify-between">
           <Button className="bg-green-500 py-2 ml-4 mt-2" onClick={() => setSubjectOpen(!subjectOpen)}>
             Select Subjects
           </Button>
           <Button className="flex bg-red-600 mr-4 mt-2" onClick={openPractice}>
            <IoMdPlay/> <span>Start</span>
           </Button>
          </div>
          <div>
           {checkedSubject && (
           <div className="w-full max-w-md mx-auto rounded-2xl bg-white shadow-xl border border-black/5 p-6">

  {/* SUBJECT SECTION */}
  <div className="flex items-center justify-between pb-5 border-b border-black/10">
    
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
        <MdSubject className="text-2xl text-indigo-600" />
      </div>

      <div>
        <p className="text-sm text-black/50 font-medium">
          Subject
        </p>

        <h2 className="text-2xl font-bold text-black">
          {selected}
        </h2>
      </div>
    </div>
  </div>

  {/* QUESTION SECTION */}
  <div className="flex items-center justify-between pt-5">
    
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
        <GoHash className="text-2xl text-emerald-600" />
      </div>

      <div>
        <p className="text-sm text-black/50 font-medium">
          No. of Questions
        </p>

        <h3 className="text-lg font-semibold">
          Select Amount
        </h3>
      </div>
    </div>

    <select
      name="nos"
      id="nos"
      className="px-4 py-3 rounded-xl border border-black/10 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-400 font-medium"
    >
      <option>10</option>
      <option>20</option>
      <option>30</option>
      <option>40</option>
      <option>50</option>
      <option>60</option>
    </select>
  </div>
</div>
           )}
           {!selected && (
            <div>
              <h4 className="ml-3 text-sm text-red-600 animate-out">{error}</h4>
            </div>
           )}
          </div>
          <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-black/5 p-6">

  {/* HEADER */}
  <div className="mb-5">
    <h2 className="text-2xl font-bold text-black">
      Instructions
    </h2>

    <p className="text-sm text-black/50 mt-1">
      Please read carefully before starting the exam.
    </p>
  </div>

  {/* INSTRUCTIONS */}
  <div className="flex flex-col gap-4">

    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
      <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600">
        1
      </div>

      <p className="text-black/80">
        You can only take one subject per session.
      </p>
    </div>

    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
      <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600">
        2
      </div>

      <p className="text-black/80">
        The exam duration is strictly 2 hours.
      </p>
    </div>

    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
      <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600">
        3
      </div>

      <p className="text-black/80">
        You can quit the exam anytime you wish.
      </p>
    </div>

    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
      <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600">
        4
      </div>

      <p className="text-black/80">
        Attempt all questions before submission.
      </p>
    </div>

  </div>
</div>
          </div> {/* Secondary Container */}
       </div>  {/* Container */}
     </section> 
    )}
    {/* 2nd utility flow */}
      {subjectOpen && (
  <section className="fixed inset-0 z-50 flex items-start py-10 justify-center bg-black/50 backdrop-blur-sm px-4">

    {/* MODAL CONTAINER */}
    <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in-95">

      {/* HEADER */}
      <div className="flex items-center justify-between bg-linear-to-r from-emerald-500 to-green-600 px-6 py-5">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Select Subject
          </h2>

          <p className="text-sm text-white/70 mt-1">
            Choose one subject to begin practice
          </p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSubjectOpen(false)}
          className="rounded-full hover:bg-white/10"
        >
          <IoMdClose className="text-2xl text-white" />
        </Button>
      </div>

      {/* BODY */}
      <div className="p-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {items.map((s) => (
            <label
              key={s}
              className={`flex items-center gap-4 rounded-2xl border p-4 cursor-pointer transition-all duration-200
              
              ${
                selected === s
                  ? "border-emerald-500 bg-emerald-50 shadow-md"
                  : "border-black/10 hover:border-emerald-300 hover:bg-slate-50"
              }`}
            >
              <input
                type="radio"
                name="subject"
                value={s}
                checked={selected === s}
                onChange={() => setSelected(s)}
                className="w-5 h-5 accent-emerald-600"
              />

              <span className="font-medium text-black/80">
                {s}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="flex justify-end gap-3 border-t border-black/5 bg-slate-50 px-6 py-4">

        <Button
          onClick={() => setSubjectOpen(false)}
          className="bg-white text-black border border-black/10 hover:bg-slate-100"
        >
          Cancel
        </Button>

        <Button
          onClick={() => {
            setCheckedSubject(true);
            setSubjectOpen(false);
          }}
          className="bg-emerald-600 hover:bg-emerald-700 px-6"
        >
          Continue
        </Button>
      </footer>
    </div>
  </section>
)}

   { showLogin  && (
    <section className="fixed inset-0 bg-black/50 flex items-center justify-center z-10">
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
  <div
    className="
      w-full 
      max-w-md 
      rounded-3xl 
      border border-white/20
      bg-linear-to-r from-white/10 to-green-800/50
      backdrop-blur-2xl
      shadow-[0_8px_32px_rgba(0,0,0,0.25)]
      p-8
      sm:p-10
      relative
      overflow-hidden
    "
  >
    {/* Decorative Glow */}
    <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
    <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-white/5 blur-3xl" />

    {/* Content */}
    <div className="relative z-10">
      <span className="flex justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
        Login / Sign Up
      </h1>
       <Button className="rounded-full outline-0 bg-transparent" onClick={() => setShowLogin(false)}> {/* Toggle button */}
        <IoMdClose/>
       </Button>
      </span>
      <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
        Welcome back. Continue your journey and access your account securely.
      </p>

      <Login onSuccess={() => {
         setShowLogin(false);
        // setShowProfile(true);
        setModal("profile");
      }}/>
    </div>
    <div>
      <Button className="bg-white/20 px-6 py-2  backdrop-blur-3xl  flex mt-5"
      onClick={() => {
        setShowLogin(false);
        setShowsignUp(true);
      }}
      >
       <span> Don&apos;t have an Account? Create</span>
      </Button>
    </div>
  </div>
</div>
    </section>
   )} {/* Login Modal end */}
   {modal === "profile" && (
    <>
          <ProfileSetUp onComplete={() => setModal(false)}/>
    </>
   )}
    
   
  {showSignUp && (
    <section className="fixed inset-0 bg-black/50 flex items-center justify-center z-10">
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
  <div
    className="
      w-full 
      max-w-md 
      rounded-3xl 
      border border-white/20
      bg-white/10
      backdrop-blur-2xl
      shadow-[0_8px_32px_rgba(0,0,0,0.25)]
      p-8
      sm:p-10
      relative
      overflow-hidden
    "
  >
    {/* Decorative Glow */}
    <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
    <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-white/5 blur-3xl" />

    {/* Content */}
    <div className="relative z-10">
     <span className="flex justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
        Login / Sign Up
      </h1>
       <Button className="rounded-full outline-0 bg-transparent" onClick={() => setShowsignUp(false)}>
        <IoMdClose/>
       </Button>
      </span>

      <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
        Create an account with us and feel an immersive CBT experience
      </p>

      <SignUp onSuccess={() => {
        setShowLogin(true);
        toast.error("Login in to your account")
      }}/>
    </div>
    <div>
      <Button className=" mt-4 bg-white/40 backdrop-blur-3xl px-6 py-2" onClick={() => {
        setShowsignUp(false);
        setShowLogin(true);
      }}>
        Have an account already? Login.
      </Button>
    </div>
  </div>
</div>
    </section>
  )}
  {showNotes && (
    <section className="fixed inset-0 bg-black/50 z-10 flex justify-center items-start py-10">
     <div className="max-h-[90vh] h-auto w-3xl">
     <div className="flex justify-between bg-linear-to-r px-5 py-4 from-emerald-500 to-green-600 rounded-t-2xl overflow-y-auto scroll-smooth scrollbar-none">
     <div className="flex flex-col">
      <h3 className="text-md md:text-xl text-white font-bold leading-relaxed"> Science Notes</h3>
      <p className="text-xs md:text-sm font-semibold leading-relaxed text-white">Learn and Plot Graphs</p>
     </div>
    <span className=" mt-4 md:mt-5"> <IoMdClose fill="#fff" onClick={() => setShowNotes(false)}/></span>
       </div>
     <ComingSoon/>
     </div>
    </section>
  )}
  {openNotifications && (
   
      <>
      <section className="fixed inset-0 bg-black/50 z-10 flex justify-center items-start py-10">
     <div className="max-h-[90vh] h-auto w-3xl">
     <div className="flex justify-between bg-linear-to-r px-5 py-4 from-emerald-500 to-green-600 rounded-t-2xl overflow-y-auto scroll-smooth scrollbar-none">
     <div className="flex flex-col">
      <h3 className="text-md md:text-xl text-white font-bold leading-relaxed">Notification</h3>
      <p className="text-xs md:text-sm font-semibold leading-relaxed text-white">Get daily feeds from the Prepmate team</p>
     </div>
    <span className=" mt-4 md:mt-5"> <IoMdClose fill="#fff" onClick={() => setOpenNotifications(false)}/></span>
       </div>
     <ComingSoon/>
     </div>
    </section>
      </>
    )}
       <footer className="hidden md:block">
    <Footer/>
  </footer>
   </>
  )    
}
export default Body