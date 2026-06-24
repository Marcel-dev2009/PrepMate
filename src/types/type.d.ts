export type Question = {
   id : number ,  
   questions : string,
   instruction : string,
   options : string[],
   answer : string,
   word : string,     
}
export type Result = {
   id : string;
   username : string,
   email : string,
   subject : string,
   score : number,
   total? : number,
   taken_at? : string
}

// issue suspense
// issue key
