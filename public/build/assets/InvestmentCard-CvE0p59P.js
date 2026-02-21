import{c as i}from"./createLucideIcon-CqwhnBzC.js";import{j as e}from"./app-D9rBxlmw.js";/**
 * @license lucide-react v0.414.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=i("HandCoins",[["path",{d:"M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17",key:"geh8rc"}],["path",{d:"m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",key:"1fto5m"}],["path",{d:"m2 16 6 6",key:"1pfhp9"}],["circle",{cx:"16",cy:"9",r:"2.9",key:"1n0dlu"}],["circle",{cx:"6",cy:"5",r:"3",key:"151irh"}]]);/**
 * @license lucide-react v0.414.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o=i("SquareArrowDown",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M12 8v8",key:"napkw2"}],["path",{d:"m8 12 4 4 4-4",key:"k98ssh"}]]);/**
 * @license lucide-react v0.414.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=i("SquareArrowUp",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"m16 12-4-4-4 4",key:"177agl"}],["path",{d:"M12 16V8",key:"1sbj14"}]]),h=({title:l,amount:c,percentage:s,Icon:d,type:t="neutral",active:r=!1})=>{const n=t==="profit",a=t==="loss";return e.jsxs("div",{className:`
                relative rounded-2xl p-6 transition-all duration-300
                bg-[#0E151D] text-white shadow-lg scale-[1.02] border border-gray-500
            `,children:[r&&e.jsx("div",{className:"absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none"}),e.jsxs("div",{className:"relative space-y-5",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:`
                                w-10 h-10 flex items-center justify-center rounded-xl
                                ${r?"bg-white/20 text-white":"bg-blue-50 text-blue-600"}
                            `,children:e.jsx(d,{className:"w-5 h-5"})}),e.jsx("h3",{className:"text-sm font-medium opacity-80",children:l})]})}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"text-2xl font-bold tracking-tight",children:[a&&"-"," ",c]}),s&&s!=="—"&&e.jsxs("div",{className:`
                                inline-flex items-center gap-1 text-sm font-medium
                                ${n&&"text-emerald-500"}
                                ${a&&"text-red-500"}
                                ${t==="neutral"&&"text-gray-400"}
                            `,children:[n&&e.jsx(x,{size:16}),a&&e.jsx(o,{size:16}),e.jsxs("span",{children:[s,"%"]})]})]})]})]})},y=h;export{u as H,y as I,x as S,o as a};
