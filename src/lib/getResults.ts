import { cookies } from "next/headers";
export default async function getResults(){
  const cookieStore = await cookies();
  const SessionCookies = cookieStore.get("session_id");         
   const res = await fetch('http://localhost:8080/api/result' , {
    cache : "no-store",
    headers:{
    Cookie : `session_id=${SessionCookies?.value}`     
    }      
   }); 
   if(!res.ok) throw new Error("failed to fetch data");

  const data = await res.json();
  return  data.result ?? []     
}