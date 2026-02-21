import{j as e}from"./app-C-qCNlJ0.js";import{c as n}from"./createLucideIcon-DKP5sVv5.js";/**
 * @license lucide-react v0.414.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=n("SquareArrowDown",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M12 8v8",key:"napkw2"}],["path",{d:"m8 12 4 4 4-4",key:"k98ssh"}]]);/**
 * @license lucide-react v0.414.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=n("SquareArrowUp",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"m16 12-4-4-4 4",key:"177agl"}],["path",{d:"M12 16V8",key:"1sbj14"}]]),u=({title:l,amount:d,percentage:s,Icon:o,type:t="neutral",active:r=!1})=>{const i=t==="profit",a=t==="loss";return e.jsxs("div",{className:`
                relative rounded-2xl p-6 transition-all duration-300
                bg-[#0E151D] text-white shadow-lg scale-[1.02] border border-gray-500
            `,children:[r&&e.jsx("div",{className:"absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none"}),e.jsxs("div",{className:"relative space-y-5",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:`
                                w-10 h-10 flex items-center justify-center rounded-xl
                                ${r?"bg-white/20 text-white":"bg-blue-50 text-blue-600"}
                            `,children:e.jsx(o,{className:"w-5 h-5"})}),e.jsx("h3",{className:"text-sm font-medium opacity-80",children:l})]})}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"text-2xl font-bold tracking-tight",children:[a&&"-"," ",d]}),s&&s!=="—"&&e.jsxs("div",{className:`
                                inline-flex items-center gap-1 text-sm font-medium
                                ${i&&"text-emerald-500"}
                                ${a&&"text-red-500"}
                                ${t==="neutral"&&"text-gray-400"}
                            `,children:[i&&e.jsx(x,{size:16}),a&&e.jsx(c,{size:16}),e.jsxs("span",{children:[s,"%"]})]})]})]})]})};export{u as I,x as S,c as a};
