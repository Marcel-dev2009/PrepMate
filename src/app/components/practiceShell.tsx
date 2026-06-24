"use client"
import HeaderPractice from "../components/HeaderPractice"
const PracticeShell = (
 {children} :
 Readonly<{children:React.ReactNode}>          
) => {
  return (
    <>
    <header>
     <HeaderPractice/>
    </header>
    <main 
    style={{
      backgroundImage : "url('/bg.svg')"   
    }}
    className="bg-cover bg-center bg-no-repeat overflow-x-hidden min-h-screen"
    >
       {children}   
    </main>
    </>
  )
}
export default PracticeShell