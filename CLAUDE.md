@AGENTS.md

test password 098765


show me code just show me the steps

8:22 AM
Here's the mental model:

1. Structure your PDFs
Organise your PDF files in your public folder to match subjects and topics:

public/
  pdfs/
    Math/
      Algebraic_Expressions.pdf
      Trigonometry.pdf
    English/
      Essay_Writing.pdf
      Comprehension.pdf //Done
2. Map each topic to its PDF path
In your subjects data file, add a pdf field to each topic pointing to its public path:

ts
{ id: "2", title: "Algebraic Expressions", done: false, pdf: "/pdfs/Math/Algebraic_Expressions.pdf" } //Done
3. Track the active topic in state
You already have activeTopic state in your layout. When a topic is clicked in the sidebar, that state updates to the clicked topic's id. //Done

4. Derive the active PDF from the active topic.
Use the activeTopic id to find the matching topic object from your list, then read its pdf field — that gives you the current PDF path.

5. Pass the PDF path down to your page
Send the resolved PDF path into your main content area — either via context, a state lifted to the layout, or a URL search param like ?topic=2.

6. Render the PDF in your page
Use the PDF path to render it. Three common options:

Native <iframe src={pdfPath} /> — simplest, no extra library
<embed src={pdfPath} /> — similar to iframe
react-pdf library — most control over rendering, page navigation, zoom etc.
7. Handle missing PDFs
Always have a fallback UI for when a topic has no PDF assigned yet, so the page doesn't break.

The flow in summary:

Click topic → activeTopic updates → find topic object → read pdf field → render PDF in main area

{available ? (
  <iframe src={topic.pdf} className="w-full h-full" />
) : (
  
)}

I have two idea in mind
using state to control the done state 

