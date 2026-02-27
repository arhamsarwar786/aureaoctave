import{c as o}from"./createLucideIcon-BA9cSPXr.js";import{r,j as e,y as d}from"./app-BaTSaDbl.js";import{m as t}from"./Footer-Df-AUlaO.js";/**
 * @license lucide-react v0.414.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=o("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.414.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=o("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]]);function b(){const[a,i]=r.useState(""),[l,n]=r.useState(!1),c=s=>{s.preventDefault(),a&&(n(!0),d.post("/newsletter",{email:a},{onFinish:()=>{n(!1),i("")}}))};return e.jsxs("section",{className:"relative h-[620px] w-full overflow-hidden bg-[#0B0F14]",children:[e.jsxs(t.div,{initial:{scale:1.08,opacity:0},animate:{scale:1,opacity:1},transition:{duration:1.4,ease:"easeOut"},className:"absolute inset-0",children:[e.jsx("div",{className:"absolute inset-0 bg-cover bg-center",style:{backgroundImage:"url('/Images/pexels-suzyhazelwood-1329645.jpg')"}}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"})]}),e.jsx("div",{className:"pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-[#3BF5C4]/10 blur-[140px]"}),e.jsx("div",{className:"relative z-10 flex h-full items-center justify-center px-6",children:e.jsxs(t.div,{initial:{opacity:0,y:36},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.9},className:"text-center max-w-3xl",children:[e.jsx("p",{className:"text-sm uppercase tracking-widest text-[#3BF5C4] mb-6",children:"Newsletter"}),e.jsx("h2",{className:"text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight mb-6",children:"The Future of Finance"}),e.jsxs("p",{className:"text-lg md:text-xl text-[#9CA3AF] leading-relaxed mb-14",children:["Receive research, market insights, and platform updates",e.jsx("br",{}),"directly from the Aurea Octave team."]}),e.jsxs(t.form,{onSubmit:c,initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{delay:.2,duration:.6},className:"flex flex-col sm:flex-row gap-4 max-w-xl mx-auto",children:[e.jsx("input",{type:"email",required:!0,value:a,onChange:s=>i(s.target.value),placeholder:"Email address",className:`
                w-full flex-1 rounded-xl px-6 py-4
                bg-white/[0.06] border border-white/10
                text-white placeholder-[#9CA3AF]
                backdrop-blur-md
                focus:outline-none focus:ring-2 focus:ring-[#3BF5C4]/40
                transition
              `}),e.jsx(t.button,{type:"submit",whileHover:{y:-2},whileTap:{scale:.97},disabled:l,className:`
                px-8 py-4 rounded-xl
                bg-[#3BF5C4] text-black font-medium
                hover:opacity-90 transition
                whitespace-nowrap
                disabled:opacity-50
              `,children:l?"Subscribing...":"Subscribe"})]}),e.jsx("p",{className:"mt-8 text-xs text-white/40",children:"No spam. Unsubscribe at any time."})]})})]})}export{h as A,m as B,b as N};
