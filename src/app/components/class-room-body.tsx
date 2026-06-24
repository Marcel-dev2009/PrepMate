"use client"

import { Subjects } from "@/lib/data"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
// import { useState } from "react"
// import Button from "@/components/ui/button"
function ClassRoomBody() {
  //  const [classSection , setClassSection] = useState<string>("")        
  const router = useRouter()
  const classOpen = (subject:string) => {
   if(!subject){
    toast.error("Please select a subject to open up a class")      
   }else{          
     router.replace(`/classroom/${subject}`)     
   }       
  }        
  return (
    <>
    <section className="bg-white rounded-b-md overflow-y-auto">
    <div className="">
     <h3 className="font-bold p-1 text-black/80 md:ml-1.5 leading-relaxed md:text-xl">
      Select a subject to get in with studies    
     </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto">
         {Subjects.map((s) => (
         <button
         onClick={() => {
          classOpen(s.subject);
         }}
        type="button"
        key={s.id}
        className={`p-4 m-8 rounded-md h-auto  shadow-lg w-auto max-w-75 max-h-75  ${s.bg} `}
        >
        <div className="flex flex-col gap-4">
        <s.logo size={24} className={` ${s.fill} mx-auto`}/>
        <h3 className="font-semibold font-stretch-condensed leading-0.5">{s.subject}</h3>  
        </div> 
        </button
        > 
      ))}  
      </div>
     
     </div>
    </section>
    </>
  )
}
export default ClassRoomBody