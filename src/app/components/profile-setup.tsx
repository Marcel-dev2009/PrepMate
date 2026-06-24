/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";
interface Props {
  onComplete : () => void;
}
import { GraduationCap , Trash2Icon , SaveIcon , User2Icon , UploadIcon} from "lucide-react";
import dynamic from "next/dynamic";
// import { api } from "@/lib/api";
import { useState , useRef, ChangeEvent, useEffect } from "react";
import { Subjects } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
const SpinnerLoader = dynamic(() => import("@/app/components/spinnerLoader"));
function ProfileSetUp({onComplete}:Props) {
  const [photoPreview ,setPhotoPreview] = useState<string>("");
   const fileRef = useRef<HTMLInputElement | null>(null);
  const [loading , setLoading] = useState<boolean>(false);
  const [grade , setGrade] = useState<string>("")
  const [school , setSchool] = useState<string>("")
  // const [test ,setTest] = useState<string>();
  const [selectedSubject , setSelectedSubject] = useState<string[]>([]);
  const dummyHandleSubmit = () => {
    if(!grade){
      toast.error("Please Input your grade")
    } else if(!school){
      toast.error("Please Input your school name")
    } else if(!selectedSubject){
      toast.error("Please select your core subjects")
    };
    toast.success("user profile saved")
    setLoading(false);
  }
/*   const handleProfileSubmit = async() => {
   if(!grade){
      toast.error("Please Input your grade")
    } else if(!school){
      toast.error("Please Input your school name")
    } else if(!selectedSubject){
      toast.error("Please select your core subjects")
    } else if(!photoPreview){
        toast.error("Please select your core subjects");
    }
    try{
    setLoading(true);
    await api.saveProfile(grade , school , photoPreview)
    toast.success("user profile saved succesfully");
    }catch(err:any){
      toast.error(err.message || "Please Provide the required data");
    } finally{
      setLoading(false)
    }
  } */
  const handlePhoto = (e:ChangeEvent<HTMLInputElement>) => {
   const file = e.target.files?.[0];
   if(!file) return;
   const reader = new FileReader();
   reader.onload = (ev) => {
    const result = ev.target?.result;
    if(typeof result === "string"){
      setPhotoPreview(result);
      localStorage.setItem("photo" , result);
    }
   };
   reader.readAsDataURL(file)
  }
  useEffect(() => {
   const savedPhoto = localStorage.getItem("photo");
   if(savedPhoto){
    setPhotoPreview(savedPhoto);
   }
  },[])
  const subjectToggle = (id:string) => {
    setSelectedSubject((prev) => prev.includes(id) ? prev.filter((g) => g !== id) : prev.length < 5 ? [...prev , id] : prev); 
  }
  return (
   <section className="fixed inset-0 bg-black/50 z-10 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-linear-to-r from-white/10 to-green-800/85 backdrop-blur-sm p-5  h-auto  rounded-md shadow-lg leading-relaxed">
         <div className="flex justify-between p-4">
        <div className="flex gap-2">
           <span className="border border-green-400 rounded-md bg-green-800/20 backdrop-blur-sm p-2"><GraduationCap color="#90EE90"/></span>
        <div className="flex flex-col">
            <h3 className="font-semibold text-background/85">Complete Your Profile</h3>
            <h4 className="font-semibold text-sm text-emerald-100/50">Set up your account to continue</h4>
        </div>
        </div>
         </div>
        {/* Header End */}
         {/* <div className="md:ml-8 flex gap-4"> */}
        {photoPreview ? (
          <div className="md:ml-8 flex gap-4">
            <div
          className="w-auto 
          max-w-30 
          shadow-lg
          rounded-full
          " 
          >
            <div className="
          w-auto 
          max-w-20
          p-2
          rounded-full
          ">
            <img src={photoPreview} alt="User Photo" loading="lazy" className="h-full w-full object-cover rounded-full"/>
          </div>

          
          </div>
          <div className="flex flex-col gap-2 md:mt-2">
              <h4 className="font-semibold text-shadow-secondary-foreground 
              text-background/85 
              text-sm">Complete Your profile to save photo</h4>
              <Button className="
              bg-transparent 
              border
              py-2
              border-gray-400
              w-auto max-w-30
              "
              onClick={() => setPhotoPreview("")}>
                
                <span className="flex gap-2"><Trash2Icon size={10} className="mt-1"/> <p className="text-sm font-semibold font-stretch-condensed text-gray-200/85">Remove Photo</p></span>
              </Button>
            </div>
          </div>
        ) : (
          <>
           <div className="md:ml-8 flex gap-4">
                  <div className="
           w-fit h-full object-cover
            border border-dotted px-4 py-4 
            border-green-400 rounded-full
            bg-green-400/10
            backdrop-blur-sm
            " onClick={() => fileRef.current?.click()}>
            <div className="flex flex-col justify-center items-center">
              <User2Icon color="#90EE90"  size={20}/>
            <p className="text-xs text-gray-400 font-semibold">Photo</p>
            </div>
            
          </div>

          <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-shadow-secondary-foreground text-gray-400 text-sm">Upload a clear photo of yourself. JPG or PNG, max 5MB.</h4>
              <Button className="
              bg-transparent 
              border
              py-2
              border-gray-400
              w-auto max-w-30
              "
              onClick={() => fileRef.current?.click()}>
                
                <span className="flex gap-2"><UploadIcon size={10} className="mt-1"/> <p className="text-sm font-semibold font-stretch-condensed text-gray-200/85">Upload Photo</p></span>
              </Button>
              <input type="file" accept="images/*" className="hidden" ref={fileRef} onChange={handlePhoto}>            
                </input>
            </div>
            </div> 
          </>
        )}
          <div className="flex-1 border-t opacity-20 m-2 border-gray-400"></div> {/* Breaker line */}
          {/* Input data class/schoolName */}
          <div className="flex justify-evenly">
           <div className="flex flex-col">
            <label htmlFor="class" className="text-background/85 font-stretch-condensed font-bold text-md">CLASS</label>
            <input type="text" onChange={(e) => setGrade(e.target.value)} placeholder="e.g SS3, Year 12" className="border border-white/50 bg-stone-900/50 px-8 rounded-md py-2 placeholder:text-neutral-300/50 placeholder:font-semibold text-white/65 outline-0"/>
           </div>
           <div className="flex flex-col">
            <label htmlFor="school" className="text-background/85 font-stretch-condensed font-bold text-md">SCHOOL NAME</label>
            <input onChange={(e) => setSchool(e.target.value)} type="text" placeholder="e.g Command Secondary School" className="border border-white/50 bg-stone-900/50 px-8 rounded-md py-2 placeholder:text-neutral-300/50 placeholder:font-semibold outline-0 text-white/65"/>
           </div>
          </div>
         {/* </div> Container div */}
         <div>
           <div className="flex mt-2 ml-9">
            <h3 className="text-md font-semibold font-stretch-condensed text-white">CORE SUBJECTS</h3>
            <p className="text-sm mt-1 font-semibold text-white/50">-select 5 to 12</p>
           </div>
          <div className="grid grid-cols-3 gap-2 py-2">
            
             {Subjects.map((s) => {
            const sel = selectedSubject.includes(s.id)
            return (
              <>
                
              <Button
              key={s.id}
              className={` backdrop-blur-sm shadow-lg border border-white/20 ${sel ? "bg-green-800/65" : "bg-white/10"}`}
            
              type="button"
              onClick={() => {
                subjectToggle(s.id);
              }}
                
              >
              <div>
                <p>{s.subject}</p>
              </div>
              </Button>
            
              </>
         
            )
           })}
          </div>
         </div>
        <div className="flex justify-center items-center mt-2">
           {selectedSubject.length === 5 && (
          <button 
             className="
          w-auto
          max-w-md
          flex 
          rounded-2xl
          py-2
          px-4
          font-semibold
          text-emerald-950
           bg-linear-to-r from-green-400/80 to-mist-400/80
          hover:from-green-300 hover:to-white/80
          hover:text-black
          active:scale-[0.98]
          transition-all
      shadow-lg"
      onClick={() => {
      // handleProfileSubmit();
      dummyHandleSubmit();
        onComplete();
      }}
          >
            {loading ? (<SpinnerLoader/>) : (
             <div className="flex gap-1">
              <SaveIcon color="#fff" size={20}/>
               <p>Save Profile</p>
             </div>
            )}
          </button>
         )}
        </div>
      </div>
     </section>
  )
}
export default ProfileSetUp