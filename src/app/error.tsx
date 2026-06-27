"use client"
export default function Error(
  {
   error ,
   reset 
  }:{
  error : Error;
  reset : () => void;
}) {        
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <section className="text-center space-y-4">

        <h1 className="text-7xl font-bold text-red-500">
          404
        </h1>

        <h2 className="text-2xl font-semibold">
          Oops Something went wrong
        </h2>

        <p className="">
         Here are list of ways to fix the issue
        </p>

         <nav>
          <ol className="border border-gray-100 shadow-sm p-8 flex flex-col gap-5">
           <li className="p-2  text-md text-black/60">  1 : Try signing in to an account or creating a new account</li>
           <li className="p-2  text-md text-black/60"> 2 : Make sure you&apos;ve taken at least a test to get acess to result hsitory (recommended)</li>
            <li className="p-2 text-md text-black/60 "> 3 : Click the retry button for a refresh</li>
          </ol>
         </nav>

        <button
          onClick={() => {
           reset();
          }}
          className="inline-block mt-4 px-5 py-3 rounded-xl bg-black text-white"
        >
          Retry
        </button>

      </section>
    </main>
  )
}