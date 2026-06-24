 "use server"

import { Result } from "@/types/type"

 interface PromiseProps{
   resultPromise : Promise<Result[]>        
 }
async function ResultList({resultPromise}:PromiseProps) {
    const results = await resultPromise;   
  return (
   <div>
    {results.map((result) => (
     <div
     key={result.id}
     >
       <h1>{result.username}</h1>
       <h2>{result.email}</h2>
       <h3>{result.score ?? "You haven't taken a test yet"}</h3>
       <h5>{result.taken_at}</h5>
     </div>     
    ))}      
   </div>
  )
}
export default ResultList