"use server";
import { Metadata } from "next";
import ClassRoom from "../ClassRoom";
type Props = {
  params : Promise<{room : string}>
}
export const generateMetadata = async ({params}:Props):Promise<Metadata> => {
 const subject = (await params).room
/*  const title = await new Promise((resolve) => {
  setTimeout(() => {
   resolve(`${subject}`)
  },100)
 }) */
 return{
  title : `Prepmate Classroom | ${subject}`
 }
}
async function ClassPage(){
  return(
    <ClassRoom/>
  )        
}
export default ClassPage;
