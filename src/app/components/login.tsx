/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
interface ModalProps{
  onSuccess : () => void;
}
import { SubmitEventHandler, useState } from "react";
import { api } from "@/lib/api";
import dynamic from "next/dynamic";
import { toast } from "sonner";
const SpinnerLoader = dynamic(() => import("./spinnerLoader"))
function Login({onSuccess}:ModalProps) {
 const [email , setEmail] = useState<string>("") ;        
 const [password , setPassword] = useState<string>("");
 const [loading , setLoading] = useState<boolean>(false);
//  const [showProfile , setShowProfile] = useState<boolean>(false);
 const handleLogin:SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault(); 
    if(!email || !password){
      toast.error("Please fill in all the fields");
      return 
    }
   try{
   setLoading(true);
   await api.login(email,password);
   toast.success("Welcome back!");
    onSuccess();
   }catch(err:any){
    toast.error(err.message || "Login Failed , try again");
   }  
   finally{
    setLoading(false);
   } 
 }   
  return (
    <>
       <form
  onSubmit={handleLogin}
  className="
    w-full max-w-md
    rounded-3xl
    border border-white/20
    bg-white/10
    backdrop-blur-2xl
    shadow-[0_8px_30px_rgba(0,0,0,0.25)]
    p-8 space-y-10 mt-4
  "
>
  {/* Header */}
  <div className="text-center space-y-2">
    <h1 className=" text-md md:text-3xl font-bold text-white">
      Welcome Back
    </h1>
    <p className="text-xs md:text-sm text-white/60">
      Login to continue your CBT experience
    </p>
  </div>

  {/* Inputs */}
  <div className="space-y-4">
    <input
      type="email"
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
      className="
        w-full
        rounded-2xl
        border border-white/10
        bg-white/5
        px-4 py-3
        text-white
        placeholder:text-white/40
        outline-none
        focus:border-green-300/60
        focus:ring-2 focus:ring-green-300/20
        transition
      "
    />

    <input
      type="password"
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
      className="
        w-full
        rounded-2xl
        border border-white/10
        bg-white/5
        px-4 py-3
        text-white
        placeholder:text-white/40
        outline-none
        focus:border-red-300/60
        focus:ring-2 focus:ring-red-300/20
        transition
      "
    />
  </div>

  {/* Button */}
  <button
    type="submit"
    className="
      w-full
      rounded-2xl
      py-3
      font-semibold
      text-white
      bg-linear-to-r from-green-400/80 to-mist-400/80
      hover:from-green-300 hover:to-white/80
      hover:text-black
      active:scale-[0.98]
      transition-all
      shadow-lg
    "
  >
    {loading ? (
      <div>
        <SpinnerLoader/>
      </div>
    ) : (
      <p>Login</p>
    )}
  </button>
</form>
  </>
  ) 
}
export default Login