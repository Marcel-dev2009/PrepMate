/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
interface Props {
  onSuccess : () => void;
}
import { useState } from "react";
// import { useRouter } from "next/navigation";
import { toast } from "sonner";
import dynamic from "next/dynamic";
const SpinnerLoader = dynamic(() => import("./spinnerLoader"));
import { api } from "@/lib/api";
export default function SignUpForm({onSuccess}:Props) {;
 const [username , setUsername] = useState<string>("")

 const [emailAddress, setEmailAddress] =useState<string>("");
 const [password, setPassword] = useState("");
 const [loading , setLoading] = useState<boolean>(false);
//  const router = useRouter();
 const handleSubmit = async (e:React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();
   if(!emailAddress || !username || !password){
    toast.error("Please Fill in all fields") 
   }
   try{
    setLoading(true)
     await api.register(username , emailAddress , password);
     toast.success("Account Created Succesfully")
     onSuccess();
   }catch(err:any){
    toast.error(err.message || "Registeration Failed") 
   }finally{
    setLoading(false);
   }
 }
return (
   
     <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <h1 className=" text-xl md:text-3xl font-bold text-white">
        Create Account
      </h1>

     <div 
     className="
     flex flex-col gap-8
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
     
     >
     <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-white/5
          p-4
          text-white
          outline-none
        "
      />
     
      <input
        type="email"
        placeholder="Email"
        value={emailAddress}
        onChange={(e) =>
          setEmailAddress(e.target.value)
        }
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-white/5
          p-4
          text-white
          outline-none
        "
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-white/5
          p-4
          text-white
          outline-none
        "
      />

     </div>
   
           <button
        type="submit"
        className="
          w-full
          rounded-2xl
          p-4
          font-semibold
          text-black
           bg-linear-to-r from-green-400/80 to-mist-400/80
      hover:from-green-300 hover:to-white/80
      hover:text-black
      active:scale-[0.98]
      transition-all
      shadow-lg
        "
      >
        {loading ? (
         <div><SpinnerLoader/></div> 
        ) : (
          <p>Sign Up</p>
        )}
      </button>
    </form>
  );
}