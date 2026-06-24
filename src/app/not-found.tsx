"use client"
import { useRouter } from "next/navigation"
export default function NotFound() {
  const router = useRouter()        
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <section className="text-center space-y-4">

        <h1 className="text-7xl font-bold text-red-500">
          404
        </h1>

        <h2 className="text-2xl font-semibold">
          Page Not Found
        </h2>

        <p className="text-zinc-500 max-w-md">
        Classroom and  PDF development under progress
        </p>

        <button
          onClick={() => {
           router.replace("/");
          }}
          className="inline-block mt-4 px-5 py-3 rounded-xl bg-black text-white"
        >
          Go Home
        </button>

      </section>
    </main>
  )
}