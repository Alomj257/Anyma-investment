import{A as n,s as c}from"./index-naFqRyV3.js";import{s as o}from"./index---ThxQHl.js";const u=async r=>await n.post("/auth/register",r),i=async r=>await n.post("/auth/login",r),g=async r=>await n.get(`/auth/users/role/${r}`),m=async(r,t)=>await n.put(`/auth//update/${r}`,t),y=async r=>await n.get(`/auth/users/${r}`),p=async r=>await n.get(`/auth/users/email/${r}`),h=async r=>await n.post("/auth/users/email/",{email:r}),l=async r=>await n.delete(`/auth/delete/${r}`),R=async r=>{var t,a,e;try{const{data:s}=await u(r);return s!=null&&s.message?(c("error",s==null?void 0:s.message),s):(c("success",s),s)}catch(s){return c("error",(a=(t=s==null?void 0:s.response)==null?void 0:t.data)==null?void 0:a.message),(e=s==null?void 0:s.response)==null?void 0:e.data}},A=async r=>{var t,a;try{const{data:e}=await h(r);if(e!=null&&e.message)return c("error",e==null?void 0:e.message),e;c("success",e)}catch(e){c("error",(a=(t=e==null?void 0:e.response)==null?void 0:t.data)==null?void 0:a.message)}},v=async r=>{var t,a;try{const{data:e}=await i(r);if(e!=null&&e.message){c("error",e==null?void 0:e.message);return}return o(e),c("success",e),e}catch(e){c("error",(a=(t=e==null?void 0:e.response)==null?void 0:t.data)==null?void 0:a.message);return}},S=async r=>{var t,a,e;try{const{data:s}=await g(r);if(s!=null&&s.message){c("error",s==null?void 0:s.message);return}return s}catch(s){return c("error",(a=(t=s==null?void 0:s.response)==null?void 0:t.data)==null?void 0:a.message),(e=s==null?void 0:s.response)==null?void 0:e.data}},B=async r=>{try{const{data:t}=await y(r);if(t!=null&&t.message){c("error",t==null?void 0:t.message);return}return t}catch(t){console.log(t)}},U=async r=>{var t,a;try{const{data:e}=await p(r);if(e!=null&&e.message){c("error",e==null?void 0:e.message);return}return e}catch(e){c("error",(a=(t=e==null?void 0:e.response)==null?void 0:t.data)==null?void 0:a.message)}},$=async(r,t)=>{var a,e;try{const{data:s}=await m(r,t);if(s!=null&&s.message){c("error",s==null?void 0:s.message);return}return c("success",s),s}catch(s){console.log(s),c("error",(e=(a=s==null?void 0:s.response)==null?void 0:a.data)==null?void 0:e.message);return}},T=async r=>{var t,a;try{const{data:e}=await l(r);if(e!=null&&e.message){c("error",e==null?void 0:e.message);return}return c("success",e),e}catch(e){c("error",(a=(t=e==null?void 0:e.response)==null?void 0:t.data)==null?void 0:a.message)}};export{S as a,U as b,A as c,T as d,B as g,v as l,R as r,$ as u};
