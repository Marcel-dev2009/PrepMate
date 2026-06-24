"use server";
import { Metadata } from "next";
import Practice from "../Practice";
type Props = {
      subject : string;
};
type PageProps = {
  params : Promise<Props>
}
export async function generateMetadata({params}:PageProps):Promise<Metadata>{
 const resolvedParams = await params
 return{
  title : `${decodeURIComponent(resolvedParams.subject)}`
 }
} 
async function PracticePage({params}:PageProps) {
  return (
   <Practice params={params}/>
  )
}
export default PracticePage