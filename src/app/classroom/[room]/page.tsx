"use server";
import { Metadata } from "next";
import ClassRoom from "../ClassRoom";
type Props = {
  classroom : string        
};
type PageProps = {
   params : Promise<Props>       
}
export async function generateMetadata({params}:PageProps):Promise<Metadata>{
 const resolvedParams = await params
 return {
   title : `${decodeURIComponent(resolvedParams.classroom)}`       
 }         
}
async function ClassPage({params}:PageProps) {
  return(
    <ClassRoom params={params}/>
  )        
}
export default ClassPage;