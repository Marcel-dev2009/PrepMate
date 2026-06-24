This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.






<!-- 

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
        <button className="mt-2" onClick={() => setShowLogin(true)}>
           <IoMdClose color="#fff"/>
        </button>
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
            <input type="text" placeholder="e.g SS3, Year 12" className="border border-white/50 bg-stone-900/50 px-8 rounded-md py-2 placeholder:text-neutral-300/50 placeholder:font-semibold text-white/65 outline-0"/>
           </div>
           <div className="flex flex-col">
            <label htmlFor="school" className="text-background/85 font-stretch-condensed font-bold text-md">SCHOOL NAME</label>
            <input type="text" placeholder="e.g Command Secondary School" className="border border-white/50 bg-stone-900/50 px-8 rounded-md py-2 placeholder:text-neutral-300/50 placeholder:font-semibold outline-0 text-white/65"/>
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
              onClick={() => subjectToggle(s.id)}
                
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
 -->