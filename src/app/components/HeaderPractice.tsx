"use client"
import { Button } from "@/components/ui/button";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function HeaderPractice() {
  const [timeLeft, setTimeLeft] = useState<number>(7200);
     const router = useRouter();
  const handleRoute = () => {
     router.replace('/');    
  }        
   useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
       const updatedTime = prev - 1;
       localStorage.setItem("time" , JSON.stringify(updatedTime));
       return updatedTime;  
      })
    }, 1000); 

    
    // const savedTime = localStorage.getItem("timeLeft")
    // console.log(typeof );
    return () => clearInterval(timer);
  }, [timeLeft]);

   const hours = Math.floor(timeLeft / 3600);
   const minutes = Math.floor((timeLeft % 3600) / 60);
   const seconds = timeLeft % 60;
  // As every seconds passes save it to localStorage 
  // Anytime the browser is refreshed if there's any instance of a saved time update the state of that time to it 
  return (
 <>
       <header className=" overflow-x-hidden  flex justify-between flex-1 bg-green-500/50 backdrop-blur-2xl py-3 shadow-lg">
      <div>
      <Button variant="secondary" className="py-2 ml-2" onClick={handleRoute}>
        <CiLogout/>    
        <p>Quit Test</p>
       </Button>  
      </div>    

    <div className=" w-full max-w-36 mr-4 rounded-2xl bg-white shadow-xl py-2  border border-black/10">
      <div className="flex justify-center items-center">
        <div className="font-bold tracking-widest">
          {String(hours).padStart(2, "0")}:
          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </div>
      </div>
    </div>  
 </header>   
 </>
  )
}
export default HeaderPractice