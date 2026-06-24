"use client"
import ClassroomLayout from "../components/classShell"
import { useParams } from "next/navigation"
type Props = {
  classroom : string        
}
type PageProps = {
  params : Promise<Props>      
}
function ClassRoom({params}:PageProps) {
  const urlParams = useParams();
// const name = subjectTopics[subjectTopic].find((t) => t.title === subjectTopic)
 const subjectName = (urlParams?.room as string) ?? "Study Subject" 
  return (
   <ClassroomLayout>
    <div className="flex justify-between">
     <div>
       <h3 className="font-bold text-2xl p-4 text-black">{subjectName}</h3>
      <p>When you&apos;re done click the <span className="text-black font-bold animate-bounce">finish</span> button </p>
     </div>
    </div>
   </ClassroomLayout>
     
  
  )
}
export default ClassRoom
// This is the classRoom where the logic is written