import{g as m,u as n,r as c,j as a,O as d}from"./index-BzgxH7_M.js";import{S as p,H as l}from"./index-CzM9v4OR.js";import{c as x}from"./index-BAHlO6AQ.js";import{F as j,a as u}from"./index-BIAQVY8k.js";import{g as h}from"./AuthService-DGn1PQ4G.js";import"./Logo-02-removebg-preview-Cm97PXJs.js";import"./index-BTECkaYL.js";import"./iconBase-2GWgdyYW.js";import"./index-DQlLYHdx.js";const I=()=>{var t,r;const e=(r=(t=m())==null?void 0:t.user)==null?void 0:r._id,o=n();return c.useEffect(()=>{(async()=>{var i;const s=await h(e);((i=s==null?void 0:s.account)==null?void 0:i.role)!=="ADMIN"&&o("/")})()},[e]),a.jsx(a.Fragment,{children:a.jsxs("div",{className:"admin-layout",children:[a.jsx(p,{sidebarData:f}),a.jsxs("div",{className:"main-part",children:[a.jsx(l,{role:"admin"}),a.jsx("div",{className:"admin-pages h-100 mt-3",children:a.jsx(d,{})})]})]})})},f=[{icon:a.jsx(x,{}),name:"Members",path:"member"},{icon:a.jsx(j,{}),name:"Companies",path:"companies"},{icon:a.jsx(u,{}),name:"Deals",path:"deals"}];export{I as default};
