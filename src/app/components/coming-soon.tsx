import { FaRocket } from "react-icons/fa"
function ComingSoon() {
  return (
    <>
    {/* <section className="bg-white rounded-b-xl h-auto">
       <div className="flex flex-col justify-center items-center py-8">
        <span className="border-2 outline-2 border-blue-600/10 p-8 rounded-full">
          <FaRocket color="#00B261" size={50} className="animate-bounce"/>
        </span>
        <h3 className="py-2 font-semibold leading-relaxed md:text-2xl">Feature Coming Soon..</h3>
       </div>
       <div className="flex justify-center items-center">
        <h4 className="animate-pulse p-2  text-sm md:text-md font-semibold">This Feature is currently under progress</h4>   
       </div>
    </section> */}
     <section className="bg-white rounded-b-xl px-6 py-14 flex flex-col items-center gap-5">
      {/* Icon badge */}
      <span className="flex items-center justify-center w-24 h-24 rounded-full bg-emerald-50 border border-emerald-100">
        <FaRocket color="#00B261" size={36} className="animate-bounce" />
      </span>

      {/* Heading group */}
      <div className="flex flex-col items-center gap-1.5 text-center">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
          Coming Soon
        </h3>
        <p className="text-sm md:text-base text-gray-500 font-normal max-w-xs leading-relaxed">
          This feature is actively being built. Check back soon.
        </p>
      </div>

      {/* Status pill */}
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-medium text-emerald-700 tracking-wide">In Progress</span>
      </span>
    </section>
    </>
  )
}


export default ComingSoon