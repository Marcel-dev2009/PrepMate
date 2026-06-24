 "use client"
 interface LiftProps {
  setShowLogin : React.Dispatch<React.SetStateAction<boolean>>;
  setShowNotes : React.Dispatch<React.SetStateAction<boolean>>;
  setOpenNotifications: React.Dispatch<React.SetStateAction<boolean>>; 
 }
import logo from "../../../public/logo.png"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { UserRound } from 'lucide-react';
import { NotebookPen } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
  import { Bell } from 'lucide-react';
import Link from "next/link";
function Header({setShowLogin , setShowNotes ,setOpenNotifications}:LiftProps ) {
  const [open ,setOpen] = useState<boolean>(false);
  return (
    <>
    <header className=" overflow-x-hidden flex flex-1 bg-green-500/50 backdrop-blur-2xl py-3 shadow-lg">
      <div className="flex flex-1 gap-1.5 text-white">
      <Image src={logo} alt="PrepMate logo" className="w-auto max-w-12 min-w-6 mt-2 ml-2" loading="eager"/>
      <h2 className="font-heading mt-5 text-[clamp(1rem , 1.2rem , 1.5rem )] ">PrepMate</h2>    
      </div>
      <div className="mt-4 hidden md:block mr-8 text-white">
          <Button variant="ghost" className="rounded-md font-heading" title="Learn and discover graphs" size="lg" onClick={() => setShowNotes(true)}>
            <span className="flex text-md gap-1"><NotebookPen/> Science Notes</span>
          </Button>
       <Button variant="ghost" size="lg" className="rounded-full" title="login to your account" onClick={() => setShowLogin(true)}>
          <UserRound className="size-5"/>
       </Button>
       <Button variant="ghost" className="rounded-full" title="Notifications" onClick={() => setOpenNotifications(true)}>
          <Bell className="size-5"/>
       </Button>
      </div>
       
       <div className="md:hidden">
        <button className="mt-4 mr-4"
        onClick={() => setOpen(!open)}
        >
        <RxHamburgerMenu/>
       </button>
       </div>
    </header>
     <AnimatePresence initial={false}>
     {open && (
      
         <motion.aside
        initial={{top:0 , opacity:0}}
         animate={{top:300 , opacity:1}}
         exit={{top:0 , opacity:0 }}
         transition={{type:"tween", stiffness:300, damping:30 , ease:"easeInOut"}}
>
          <nav
        
          className="bg-green-500/50 transition-all w-auto rounded-b-lg text-black/80 flex flex-col gap-5">
            <Button variant="ghost">
              <Link href="#" className="flex text-sm font-semibold ml-2 py-2"><NotebookPen className="" size={24} fill="#fff"/> Science Notes </Link>
            </Button>
           <Button variant="ghost" onClick={() => setShowLogin(true)}> <Link href="#" className=" font-semibold flex text-sm ml-2 py-2" > <UserRound size={24} fill="#fff"/> Login to your account</Link></Button>
            <Button variant="ghost">
              <Link href="#" className="flex font-semibold text-sm ml-2 py-2"> <Bell size={24} fill="#fff"/> Notifications</Link>
            </Button>
          </nav>
        </motion.aside> 
    
       )}
          </AnimatePresence>
    </>
  )
}
export default Header