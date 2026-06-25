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

        <p className="text-zinc-500 max-w-md">
         Try to Sign In or Create a new Account 
        </p>

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