/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from "@/components/ui/button";
import {use, useRef} from "react";
import { useState } from "react";
import questions from "@/data/subjectData.json"
import PracticeShell from "../components/practiceShell";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import {PanelLeftClose, PanelLeftOpen } from "lucide-react";
import SpinnerLoader from "../components/spinnerLoader";
type Props = {
   subject : string       
};
type PageProps = {
   params :Promise<Props>      
}
/* 
Problem score is undefined always only an updated score shows in our UI
*/
export default function PracticePage({params}:PageProps) {
  const resolvedParams = use(params)
  const subject = resolvedParams.subject as keyof typeof questions
  const [currentIndex , setCurrentIndex] = useState<number>(0);
  const currentQuestion = questions[subject][currentIndex]; //questions.english.0
  const [isSubmitted  , setIssubmitted] = useState<boolean>(false);
  const [showResult , setShowResult] = useState<boolean>(false);
  const [submit , setSubmit] = useState<boolean>(false);
  const [sideBarOpen , setSideBarOpen] = useState<boolean>(true);
  const [loading ,setLoading] = useState<boolean>(false);
  const [score , setScore] = useState<number>(); // because the user hasn't finished the exam yet
  const [answers , setAnswers] = useState<Record<number,string>>({});
  const scoreRef = useRef<number>(0);
function handleSelectOption(option:string) {
  setAnswers((prev) => ({
    ...prev,
    [currentIndex]: option
  }));
}
const calCulateScore = () => {
  let total = 0;
  questions[subject].forEach((q , i) => {
    if(answers[i] === q.answer){
      total++
    }
    
  })
  setScore(total)
  scoreRef.current = total;
  setIssubmitted(true);
    console.log(total)
    console.log(scoreRef.current);
}

 async function SaveResult() {
  const resolvedScore = scoreRef.current
  try{
   setLoading(true);
  if(score == undefined){
   toast.error("No score to save")
   return
  } 
  await api.saveResult( subject , resolvedScore, questions[subject].length);
  toast.success("Your attempt has been submitted")
  } catch(err:any){
   toast.error(err.message || "Failed to save Profile")
  }finally{
  setLoading(false);
  }
 }
  return (
 <PracticeShell>
  <div className="h-auto overflow-y-auto scrollbar-thin flex bg-mist-100">

  {/* SIDEBAR */}
  <AnimatePresence initial={false}>
    {sideBarOpen ? (
    
    <motion.aside
    key="sidebar"
    initial={{width:0 , opacity:0}}
    animate={{width:300 , opacity:1}}
    exit={{width:0 , opacity:0}}
    transition={{type:"spring" , stiffness:300 , damping:30}}
    className="w-80 bg-mist-300 shadow-xl border-r border-mist-400 p-5">

    <div className="flex justify-between">
     <div className="mb-6">
      <h2 className="text-xl font-bold font-heading">
        Questions
      </h2>

      <p className="text-sm text-gray-600 mt-1">
        Navigate through questions
      </p>
    </div>
    <button className="p-2 rounded-lg  text-gray-500 hover:text-green-500 transition-colors" 
    aria-label="Toggle sidebar">
      <PanelLeftOpen size={18} onClick={() => setSideBarOpen(false)}/>
    </button>
    </div>

    <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
      {questions[subject].map((q, index) => {
        const isActive = currentIndex === index;
        const isAnswered = !!answers[index];

        return (
          <button
            key={q.id}
            onClick={() => {
             setCurrentIndex(index);
             setSideBarOpen(false); 
            }}
            disabled={isSubmitted}
            className={`
              h-11 w-11 rounded-lg font-heading font-semibold
              transition-all duration-200 shadow-md
              
              ${
                isActive
                  ? "bg-green-400 text-white scale-105"
                  : isAnswered
                  ? "bg-green-200 text-green-900"
                  : "bg-white hover:bg-mist-200"
              }

              ${isSubmitted ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
            `}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  </motion.aside>
  ) : (
  <>
  <div>
    <button onClick={() => setSideBarOpen(true)}
    className="p-2 rounded-lg w-fit text-gray-500 hover:text-green-500 transition-colors" 
    aria-label="Toggle sidebar"
    >
    {sideBarOpen ? <PanelLeftClose size={18}/> : (
      <>
      <div className="flex gap-2">
        <PanelLeftOpen size={18}/>
        {/* <p className="text-xs animate-pulse">Click the Icon to toggle sidebar</p> */}
      </div>
      </>
     )}     
  </button> 
  </div>
 
 {/*  <div>Hello World</div> */}
  </>
)}
  </AnimatePresence>
  
  {/* MAIN CONTENT */}
  <main className="flex-1 p-8 overflow-y-auto">

    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

      {/* QUESTION HEADER */}
      <div className="mb-8">
        <div className="flex items-center justify-between">

          <h2 className="md:text-3xl font-bold">
            Question {currentIndex + 1}
          </h2>

          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
            {currentIndex + 1} / {questions[subject].length}
          </span>
        </div>

        {currentQuestion.instruction && (
          <h3 className="md:text-lg font-semibold mt-4 text-gray-700">
            {currentQuestion.instruction}
          </h3>
        )}
      </div>

      {/* QUESTION BODY */}
      <div
        className={`
          whitespace-pre-line font-heading leading-8 text-gray-800
          ${currentIndex === 0 || 6 ? "text-sm" : "text-lg"}
        `}
        dangerouslySetInnerHTML={{
          __html: currentQuestion.question,
        }}
      />

      {/* OPTIONS */}
      <div className="mt-10 flex flex-col gap-4">

        {questions[subject][currentIndex].options.map((opt, i) => (
          <label
            key={i}
            className={`
              flex items-center gap-4 p-4 rounded-xl border
              transition-all duration-200

              ${
                answers[currentIndex] === opt
                  ? "border-green-400 bg-green-50"
                  : "border-gray-200 bg-white"
              }

              ${
                isSubmitted
                  ? "cursor-not-allowed"
                  : "hover:border-green-300 hover:bg-green-50 cursor-pointer"
              }
            `}
          >
            <input
              type="radio"
              name={`questions-${currentIndex}`}
              checked={answers[currentIndex] === opt}
              onChange={() => handleSelectOption(opt)}
              disabled={isSubmitted}
            />

            <span className="font-heading text-xs md:text-base">
              {opt}
            </span>
          </label>
        ))}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-10">

        <Button
          className="md:px-8 py-5"
          disabled={isSubmitted || currentIndex === 0}
          onClick={() =>
            setCurrentIndex((prev) => Math.max(prev - 1 , 0))
          }
        >
          Previous
        </Button>

        <div className="flex gap-3">

          <Button
            className="  md:px-8 py-5"
            disabled={isSubmitted}
            onClick={() => {
             setSubmit(true); 
            }}
          >
            Submit
          </Button>

          <Button
            className=" px-4 md:px-8 py-5"
            disabled={
              isSubmitted ||
              currentIndex === questions[subject].length - 1
            }
            onClick={() =>
              setCurrentIndex((prev) =>
                Math.min(prev + 1, questions[subject].length - 1)
              )
            }
          >
            Next
          </Button>
        </div>
      </div>
      {/* Submission Modal */}
       {submit && (
         <section className="fixed inset-0 flex justify-center items-center bg-black/50">
             <div className="mt-10 w-3/5 h-auto min-h-50  border bg-white border-green-200 rounded-2xl p-6">

  
          <h2 className="md:text-2xl font-bold text-red-700">
            Are you sure that you want to submit this exam
            <p className="text-xs md:text-sm text-red-700/50">Note this action is not reversible</p>
          </h2>
          <div className="flex gap-4 mt-4">
            <Button className="p-2 md:px-6 md:py-5" onClick={() => {
              setSubmit(!submit);
              setIssubmitted(false);
            }}>Cancel</Button>
            <Button onClick={() => {
               calCulateScore();
                // console.log(score);
             setShowResult(true) 
            }} className=" p-2 md:px-6 md:py-5 mr-4">Submit</Button>
          </div>
        </div>
          </section>
       )}
      {/* RESULT MODAL */}
      {
        showResult && score !== null && (
          <section className="fixed inset-0 flex justify-center items-center bg-black/50">
             <div className="mt-10 w-3/5 h-auto min-h-50  border bg-white border-green-200 rounded-2xl p-6">

          <h2 className=" text-lg md:text-2xl font-bold text-green-800">
            Exam Result
          </h2>
          {score as number < 25 ? ( <>
          <p className="mt-2 md:text-2xl text-green-700">
            You scored{" "}
            <span className="font-bold text-red-600">
              {score}
            </span>{" "}
            / {questions[subject].length}
          </p>
            <p className="animate-in text-sm  md:text-md font-bold text-red-500">Study Harder Mahn !</p>
          </>  ) : ( <>
          <p className="mt-2 text-lg text-green-700">
            You scored{" "}
            <span className="font-bold">
              {score}
            </span>{" "}
            / {questions[subject].length}
          </p>
            <p className="animate-in font-bold text-sm  md:text-md text-green-500">Good Job Mahn !</p>
          </> )}
        
           <div className="flex">
           <Button onClick={() => {
             SaveResult();
             setShowResult(false);
             /* Backend Ops */
           }} className=" px-3 md:px-6 py-5 mt-4">
            {loading ? (
              <SpinnerLoader/>
            ) : (
              <p>Finish</p>
            )}
           </Button>
           </div>
        </div>
          </section>
       
         
        )
      }
    </div>
  </main>
</div>
 </PracticeShell>


  )
}