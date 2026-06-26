"use client"
import gsap from "gsap"
import { useRef } from "react"
interface Buttonprops {
   className : string,
   children : React.ReactNode
   onClick? : React.MouseEventHandler<HTMLButtonElement>       
}
function ButtonContainer({className ,  children , onClick} : Buttonprops) {
    const btnRef = useRef<HTMLButtonElement | null>(null);

    const handleEnter = () => {
      if(!btnRef.current) return;
       gsap.to(btnRef.current , {
     scale : 0.9,
     duration : 0.2,
     ease : "power2.out",      
    });    
    };
    const handleLeave = () => {
       gsap.to(btnRef.current , {
        scale : 1,
        duration : 0.6, 
        ease : "elastic.out(1,0.4)"  
       })   
    }     
  return (
    <button
    ref={btnRef}
    onClick={onClick}
    onMouseEnter={handleEnter}
    onMouseLeave={handleLeave}
    type="button" className={`${className}  h-54 w-full max-w-76 shadow-lg rounded-md mx-auto cursor-pointer`}>
     {children}
    </button>
  )
}
export default ButtonContainer