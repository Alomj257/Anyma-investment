import{r as o,j as e,g as F,a as L}from"./index-BzgxH7_M.js";import{g as P,u as O,r as B}from"./AuthService-DGn1PQ4G.js";import{c as k,b as v}from"./dateTimeFormater-D7Rvvgct.js";import{g as V}from"./companyService-b3vlbPf8.js";import{N as z,D as U,p as G,c as _}from"./netProfit-DGqBlvIn.js";import{S as Y}from"./index-DQlLYHdx.js";import{I as q}from"./index-BTECkaYL.js";import"./index-DxjXa1Bi.js";import"./iconBase-2GWgdyYW.js";import"./calculateIrrSingleInvestment-Dz4nqlKD.js";import"./investorGrossTotal-D-hXK5B4.js";function H(l=8){const c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let r="";const t=c.length;for(let s=0;s<l;s++)r+=c.charAt(Math.floor(Math.random()*t));return r}const J=({userId:l})=>{const[c,r]=o.useState([]);return o.useEffect(()=>{(async()=>{const s=await v(l);r(s)})()},[]),e.jsx(e.Fragment,{children:e.jsx("div",{className:"bg-white h-50",children:e.jsxs("table",{children:[e.jsx("thead",{className:"thead-dark",children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col text-uppercase ",style:{width:"60px",aspectRatio:"1/1"},className:"border-0",children:" "}),e.jsx("th",{scope:"col text-uppercase ",children:" COMPANY"}),e.jsx("th",{scope:"col text-uppercase ",children:"ASSET CLASS"}),e.jsx("th",{scope:"col text-uppercase ",children:"NET PROFIT(LOSS)"}),e.jsx("th",{scope:"col text-uppercase ",children:"SECTOR"}),e.jsx("th",{scope:"col text-uppercase ",children:"NET MOIC"}),e.jsx("th",{scope:"col text-uppercase ",children:"TOTAL INVESTMENT"}),e.jsx("th",{scope:"col text-uppercase ",children:"NET IRR "}),e.jsx("th",{scope:"col text-uppercase ",className:"text-end",children:"NUMBER OF INVESTMENTS "}),e.jsx("th",{style:{width:"60px",aspectRatio:"1/1"},className:"border-0"})]})}),e.jsxs("tbody",{children:[c.length==0&&e.jsx("h5",{className:"text-center text-muted",children:"No Any Investment  "}),c.length>0&&(c==null?void 0:c.map((t,s)=>e.jsx(K,{list:c,index:s,companyId:t==null?void 0:t._id,userId:l,deals:t==null?void 0:t.deals})))]})]})})})},K=({companyId:l,list:c,index:r,deals:t,userId:s})=>{var b,g;const[a,d]=o.useState({}),[m,p]=o.useState(!1),[u,h]=o.useState(0),[n,i]=o.useState(0),[j,R]=o.useState(0);return o.useEffect(()=>{(async()=>{var I;const x=await V(l);d(x),i((I=x==null?void 0:x.dealSummary)==null?void 0:I.currentValuation),h(()=>t.reduce((D,f)=>{var T;const N=(T=f==null?void 0:f.investors)==null?void 0:T.find(M=>M.investerId===s);return D+parseInt((N==null?void 0:N.amount)||0)},0));const A=c==null?void 0:c.filter(E=>E._id===l),{totalCurrentValue:S,currentDate:w,investments:C}=G(A,s);S&&w&&C&&R(_(C,w,S))})()},[l,t]),e.jsxs(e.Fragment,{children:[e.jsxs("tr",{className:"p-3 ",children:[e.jsx("td",{children:e.jsxs("div",{className:"ms-2 ",style:{width:"50px",aspectRatio:"1/1"},children:["  ",e.jsx("img",{className:"w-100 h-100 rounded-circle",src:Y+(a==null?void 0:a.profile)||(a==null?void 0:a.img),alt:""})]})}),e.jsx("td",{className:"text-capitalize",children:a==null?void 0:a.name}),e.jsx("td",{children:(b=a==null?void 0:a.dealSummary)==null?void 0:b.asset}),e.jsx(z,{deals:t,userId:s,currentValuation:n,sector:(g=a==null?void 0:a.dealSummary)==null?void 0:g.sector}),e.jsx("td",{children:k(u)}),e.jsx("td",{children:j}),e.jsx("td",{className:"text-end",children:e.jsx("div",{className:"d-flex justify-content-end",children:e.jsxs("button",{onClick:()=>p(!0),className:"btn-dark d-flex justify-content-center gap-2 align-items-center",children:[t&&(t==null?void 0:t.length)," ",e.jsxs("div",{style:{width:"25px",aspectRatio:"1/1"},className:" rounded-circle bg-dark-orange",children:[" ",e.jsx(q,{size:10})]})]})})}),e.jsx("td",{style:{width:"60px",aspectRatio:"1/1"}})]},r),m&&e.jsx(U,{userId:s,company:a,deals:t,setIsNew:p})]})},ie=()=>{var h;const l=(h=F())==null?void 0:h.user,{pathname:c,state:r}=L(),t=c.split("/"),[s,a]=o.useState(null),[d,m]=o.useState(!1),p=n=>{const{name:i,value:j}=n.target;a({...s,[i]:j})};o.useEffect(()=>{r&&(async()=>{const i=await P(r);a({...i==null?void 0:i.account,...i==null?void 0:i.personal})})()},[r]);const u=n=>{if(n.preventDefault(),r){O(r,{personal:{...s},account:{...s}}),m(!1);return}const i=H();B({member:{adminId:l==null?void 0:l._id},account:{...s,password:i,cnfPassword:i},personal:{...s}})};return e.jsxs(e.Fragment,{children:[r&&e.jsxs("div",{className:"d-flex my-3 py-2  admin-header justify-content-between align-items-center",children:[e.jsx("h5",{className:"text-capitalize m-0 fw-semibold",children:"Personal Details"}),e.jsx("div",{className:"right-profile  d-flex gap-4",children:!d&&e.jsx("div",{children:e.jsx("button",{onClick:()=>m(!0),className:"btn-red py-2 text-decoration-none",children:"Edit"})})})]}),e.jsxs("form",{action:"",onSubmit:u,children:[e.jsx("div",{className:"bg-white create-mamber",children:e.jsx("div",{className:"container",children:e.jsx("div",{className:"row",children:e.jsx("div",{className:"row row-cols-3",children:y==null?void 0:y.map((n,i)=>e.jsx("div",{children:e.jsxs("div",{className:"mx-3 mb-3 d-flex flex-column gap-2 field",children:[e.jsx("label",{className:"ms-3",htmlFor:"",children:n==null?void 0:n.label}),e.jsx("input",{type:(n==null?void 0:n.type)==="date"?"date":"text",style:{cursor:r?d?"auto":"not-allowed":"auto"},disabled:r?!d:!1,onChange:p,value:s&&s[n==null?void 0:n.name],name:n==null?void 0:n.name,className:"input-field"})]})},i))})})})}),(d||!r)&&e.jsx("div",{className:"text-center",children:e.jsx("button",{className:"btn-red rounded-5 px-4 my-3",children:"Save"})})]}),!(t!=null&&t.includes("personal-add"))&&e.jsxs("div",{className:"h-50",children:[e.jsx("div",{className:"my-3",children:e.jsx("div",{className:"bg-dark py-3 px-4 rounded d-flex justify-content-between",children:e.jsx("h5",{className:"text-white mb-0 fw-bold",children:"Investments"})})}),e.jsx(J,{userId:r})]})]})},y=[{place:"Thomas",type:"input",name:"firstName",label:"First name"},{place:"Domingue",type:"input",name:"lastName",label:"Last name"},{place:"thomas.domnugue@gmail.com",type:"input",name:"email",label:" E-mail"},{place:"Paris, France",type:"input",name:"city",label:"City of residence"},{place:" 10-05-1993",type:"date",name:"dob",label:"Date Of birth"},{place:" 07754838908",type:"input",name:"phone",label:"Phone number"},{place:"Blue Nest",type:"input",name:"company",label:"Company name"},{place:" Tech and E-commerce ",type:"input",name:"industry",label:" Industry"}];export{ie as default};
