// // /* eslint-disable @typescript-eslint/no-namespace */
// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { useRef, useEffect, useState } from 'react';
// // import renderMathInElement from 'katex/contrib/auto-render';
// // import 'katex/dist/katex.min.css';
// // import 'mathlive/dist/mathlive.css';
// // import { MathfieldElement } from 'mathlive';
// // import "mathlive/dist/mathlive.css";

// // // Add TypeScript declaration for the custom element 'math-field'
// // declare global {
// //   namespace JSX {
// //     interface IntrinsicElements {
// //       'math-field': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
// //         ref?: React.Ref<MathfieldElement>;
// //       };
// //     }
// //   }
// // }


// // export default function MathEditor() {
// //   const mathFieldRef = useRef<MathfieldElement | null>(null);
// //   const [latex, setLatex] = useState('');

// //   // Set up the mathfield after mount
// //   useEffect(() => {
// //     const mf = mathFieldRef.current;
// //     if (mf) {
// //       (mf as any).virtualKeyboardMode = 'manual';
// //       mf.smartFence = true;
// //       const handleChange = () => {
// //         setLatex(mf.getValue());
// //       };
// //       mf.addEventListener('input', handleChange);
// //       return () => {
// //         mf.removeEventListener('input', handleChange);
// //       };
// //     }
// //   }, []);

// //   // Render with KaTeX
// //   useEffect(() => {
// //     const el = document.getElementById('katex-preview');
// //     if (el) {
// //       el.innerHTML = latex;
// //       renderMathInElement(el, {
// //         delimiters: [{ left: '', right: '', display: true }],
// //         throwOnError: false,
// //       });
// //     }
// //   }, [latex]);

// //   return (
// //     <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
// //       <h2>✍️ Math Expression Input</h2>

// //       <math-field
// //         ref={(el: MathfieldElement) => (mathFieldRef.current = el as MathfieldElement)}
// //         style={{
// //           border: '1px solid #ccc',
// //           padding: '10px',
// //           display: 'block',
// //           minHeight: '50px',
// //           marginBottom: '20px',
// //         }}
// //       ></math-field>

// //       <h3>🧾 Extracted LaTeX:</h3>
// //       <code style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{latex}</code>

// //       <h3>📌 Rendered with KaTeX:</h3>
// //       <div
// //         id="katex-preview"
// //         className="border p-3 bg-gray-50 rounded shadow"
// //       />
// //     </div>
// //   );
// // }
// import { BlockMath } from 'react-katex';
// import 'katex/dist/katex.min.css';
// import  { useState } from 'react';

// export default function MathInput() {
//   const [input, setInput] = useState('');

//   return (
//     <>
//       <textarea
//         rows={4}
//         cols={40}
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Type LaTeX math here"
//       />
//       <div style={{ marginTop: '1rem' }}>
//         <BlockMath math={input} />
//       </div>
//     </>
//   );
// }
