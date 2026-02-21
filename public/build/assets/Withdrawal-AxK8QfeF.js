import{W as m,j as e}from"./app-D9rBxlmw.js";import{I as d}from"./InputError-CF0yGIFz.js";import"./TextInput-08aMHvFR.js";import{A as h}from"./AuthenticatedLayout-Mv9CrXIP.js";import{c as u}from"./createLucideIcon-CqwhnBzC.js";import"./transition-LmW5JQ0c.js";import"./index-DYSEnbnX.js";/**
 * @license lucide-react v0.414.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=u("CheckCheck",[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]]);function y({auth:i}){const{data:a,setData:s,errors:r,post:n,processing:l}=m({amount:"",transaction_type:"debit",address:""}),o=t=>{t.preventDefault(),n(route("withdrawal.store"))};return e.jsx(h,{user:i.user,title:"Withdrawal",children:e.jsx("div",{className:"p-6 lg:p-10",children:e.jsxs("section",{className:"grid grid-cols-1 lg:grid-cols-2 gap-10",children:[e.jsxs("div",{className:`bg-gradient-to-br from-[#0F1720] to-[#0B1117]
                            border border-slate-700
                            rounded-2xl shadow-2xl
                            p-8 space-y-6`,children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-bold text-white",children:"Withdrawal Guidelines"}),e.jsx("p",{className:"text-slate-400 mt-2 text-sm",children:"Please read carefully before submitting your withdrawal request."})]}),e.jsx("main",{className:"space-y-5 text-sm text-slate-300",children:["Withdrawal request cut off time 12:00 AEST/AEDT.","Withdrawal amount must be less than or equal to your balance.","No third-party transfers allowed.","Credit card withdrawals go to the same card used.","At least 100% free margin must be available.","Add your bank details if withdrawing for the first time.","All withdrawals require email confirmation.","For first USDT withdrawals, upload wallet QR & ID."].map((t,c)=>e.jsxs("div",{className:"flex gap-4 items-start",children:[e.jsx(x,{className:"text-[#3BF5C4] mt-1 shrink-0"}),e.jsx("p",{className:"leading-relaxed",children:t})]},c))})]}),e.jsxs("div",{className:`bg-gradient-to-br from-[#0F1720] to-[#0B1117]
                            border border-slate-700
                            rounded-2xl shadow-2xl
                            p-8 space-y-8`,children:[e.jsxs("header",{children:[e.jsx("h1",{className:"text-3xl font-bold text-white",children:"Withdraw Funds"}),e.jsx("p",{className:"text-slate-400 mt-2",children:"Enter your withdrawal details below."})]}),e.jsxs("form",{onSubmit:o,className:"space-y-8",children:[e.jsxs("div",{children:[e.jsx("label",{className:"text-sm text-slate-400",children:"Withdrawal Amount (USD)"}),e.jsx("input",{type:"text",value:a.amount,onChange:t=>s("amount",t.target.value),required:!0,placeholder:"Enter amount",className:`mt-2 w-full bg-[#0B141B]
                                       border border-slate-700
                                       text-white rounded-xl px-4 py-3
                                       focus:border-[#3BF5C4]
                                       focus:ring-0 transition`}),e.jsx(d,{message:r.amount,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"text-sm text-slate-400",children:"BTC Address"}),e.jsx("input",{type:"text",value:a.address,onChange:t=>s("address",t.target.value),required:!0,placeholder:"Enter your BTC wallet address",className:`mt-2 w-full bg-[#0B141B]
                                       border border-slate-700
                                       text-white rounded-xl px-4 py-3
                                       focus:border-[#3BF5C4]
                                       focus:ring-0 transition`}),e.jsx(d,{message:r.address,className:"mt-2"})]}),e.jsx("button",{disabled:l,className:`w-full py-4 rounded-xl
                                   bg-gradient-to-r from-[#3BF5C4] to-[#2DD4BF]
                                   text-black font-semibold tracking-wide
                                   hover:scale-[1.02]
                                   hover:shadow-lg
                                   transition-all duration-300`,children:l?"Processing...":"Submit Withdrawal"})]})]})]})})})}export{y as default};
