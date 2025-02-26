import{r,j as t,g as X,u as Z}from"./index-Dsiti9ea.js";import{D as K}from"./index-Fn6LWwSB.js";import{r as L}from"./right_arrow-CHTTzB5r.js";import{g as B}from"./companyService-CnaIkxcQ.js";import{c as R,a as Y,b as Q}from"./dateTimeFormater-BDVaTzxG.js";import{S as tt}from"./index-oExKzVNE.js";import{c as $}from"./Frame-BNJlJ0X3.js";import{n as U,a as W,b as et}from"./investorGrossTotal-DqOj9_yd.js";import"./index-BRC1RqNz.js";import"./iconBase-DkO8iWrC.js";const st="/assets/investment-DZaxrG47.png",nt="/assets/examination-DLEo242M.png",at="/assets/receive-money-BX_SY2uW.png",rt="/assets/distribution-of-wealth-BkfwJAiH.png",it="/assets/increase-BlPrZrvo.png",ot="/assets/return-on-investment-hb7KJEPm.png",ct=({deals:c,sector:P,currentValuation:E,userId:l})=>{var S,v;const[g,s]=r.useState(0),[u,A]=r.useState(0),[V,C]=r.useState(0),[p,F]=r.useState(0),b=async()=>{const d=(await Y(l)).reduce((N,h)=>{var j;const m=(j=h==null?void 0:h.investors)==null?void 0:j.find(e=>e.investerId===l);return N+parseInt((m==null?void 0:m.amount)||0)},0);C(d)};return r.useEffect(()=>{const T=async()=>{var f;let d=0,N=0,h=0,m=[],j=0;for(const n of c){const a=(f=n==null?void 0:n.investors)==null?void 0:f.find(i=>i.investerId===l);if(a){h+=1;const i=parseFloat((a==null?void 0:a.amount)||0)+parseFloat((a==null?void 0:a.fees)||0),w=parseFloat((a==null?void 0:a.carried)||0),y=parseFloat((a==null?void 0:a.shareholding)||0),_=await U(i,y,E,n.currency,w/100),D=await W(i,y,E,n.currency,w/100);j+=i,m=[...m,[-1*i,n==null?void 0:n.investedDate]],d+=_,N+=D}}m=[...m,[j+d,new Date]];const e=$(m);F(e==null?void 0:e.toFixed(2)),s(d.toFixed(2)),A(N/h)};b().then(()=>T())},[E,l,c]),t.jsxs(t.Fragment,{children:[t.jsxs("div",{children:[t.jsx("button",{className:`btn btn-sm text-dark text-nowrap bg-white-smoke
                ${Number.isNaN(g)?"bg-white-smoke text-dark":g<0?"loss":"profit"}`,children:"NET PROFIT"}),t.jsx("div",{className:"d-flex justify-content-center align-items-center",style:{marginTop:"10%"},children:t.jsx("div",{className:"fw-bold p-txt",style:{textAlign:"center",fontSize:"13px",color:g.toString()=="NaN"?"black":g<0?"red":"green"},children:R(g)})})]}),t.jsxs("div",{children:[t.jsx("button",{className:`btn btn-sm text-dark text-nowrap bg-white-smoke
                ${Number.isNaN(u)?"bg-white-smoke text-dark":u<0?"loss":"profit"}`,children:"NET MOIC"}),t.jsx("div",{className:"d-flex justify-content-center align-items-center",style:{marginTop:"10%"},children:t.jsx("div",{className:"fw-bold p-txt",style:{textAlign:"center",fontSize:"13px",color:u.toString()=="NaN"?"black":u<0?"red":"green"},children:u&&((S=u==null?void 0:u.toString())==null?void 0:S.substring(0,4))+"x"})})]}),t.jsxs("div",{children:[t.jsx("button",{className:`btn btn-sm text-dark text-nowrap bg-white-smoke
                ${Number.isNaN(p)?"bg-white-smoke text-dark":p<0?"loss":"profit"}`,children:"NET IRR"}),t.jsx("div",{className:"d-flex justify-content-center align-items-center",style:{marginTop:"10%"},children:t.jsx("div",{className:"fw-bold p-txt",style:{textAlign:"center",fontSize:"13px",color:p.toString()=="NaN"?"black":p<0?"red":"green"},children:p&&((v=(p*100).toString())==null?void 0:v.substring(0,4))+"%"})})]})]})},bt=()=>{var h,m,j;r.useState(!1);const[c,P]=r.useState([]),[E,l]=r.useState(0),[g,s]=r.useState(0),[u,A]=r.useState(0),[V,C]=r.useState(1),[p,F]=r.useState(0),[b,S]=r.useState(0),[v,T]=r.useState(0),d=(m=(h=X())==null?void 0:h.user)==null?void 0:m._id,N=[{name:" TOTAL INVESTMENTS",qty:E,icon:st},{name:"   AMOUNT INVESTED (INCL. FEES)",qty:R(Math.round(g)),icon:at},{name:"CURRENT VALUE OF INVESTMENT",qty:R(Math.round(u)),icon:nt},{name:" NET PROFIT (LOSS)",qty:(p<0?"(-) ":"")+R(Math.abs(Math.round(p))),icon:it},{name:"  NET MOIC",qty:b&&((j=b==null?void 0:b.toString())==null?void 0:j.substring(0,4))+"x"||0,icon:rt},{name:"  NET IRR",qty:Math.round(v)+"%",icon:ot}];return r.useEffect(()=>{(async()=>{var _,D,q;const f=await Q(d);let n=0,a=0,i=0,w=0,y=[];for(const I of f)for(const o of I==null?void 0:I.deals){const G=await et(o==null?void 0:o.currency);C(G);const k=await B(o==null?void 0:o.companyId),x=(_=o==null?void 0:o.investors)==null?void 0:_.find(M=>M.investerId===d);if(x){w+=1;const M=parseFloat((x==null?void 0:x.amount)||0)+parseFloat((x==null?void 0:x.fees)||0),O=parseFloat((x==null?void 0:x.carried)||0),z=parseFloat((x==null?void 0:x.shareholding)||0),H=await U(M,z,parseInt(((D=k==null?void 0:k.dealSummary)==null?void 0:D.currentValuation)||0),o.currency,O/100),J=await W(M,z,parseInt(((q=k==null?void 0:k.dealSummary)==null?void 0:q.currentValuation)||0),o.currency,O/100);n+=H,a+=J,i+=M,y=[...y,[-1*M,o==null?void 0:o.investedDate]]}}if(i!==0){y=[...y,[i+n,new Date]];const I=$(y);T(I==null?void 0:I.toFixed(2))}F(n),S(a/w),s(i),A(i+n),P(f),l(w)})()},[d]),t.jsx(t.Fragment,{children:t.jsxs("div",{className:"main-part",children:[t.jsx("div",{className:"my-3",children:t.jsx("div",{className:"bg-dark py-3 px-4 rounded d-flex justify-content-between",children:t.jsx("h5",{className:"text-white mb-0 fw-bold text-capitalize",children:"OVERVIEW"})})}),t.jsx("div",{className:"overview",children:t.jsx("div",{className:"container w-100 pe-0",children:t.jsx("div",{className:"row",children:t.jsx("div",{className:"row row-cols-1 row-cols-md-3 pe-0",children:N==null?void 0:N.map((e,f)=>{var n;return t.jsx("div",{className:"px-0",children:t.jsxs("div",{className:`d-flex px-2 py-2 border border-1 box mb-3 over-box ${f%3!==0&&"mx-md-3 me-0"} rounded-3 border-dark bg-white justify-content-between`,children:[t.jsxs("div",{className:"d-flex flex-column justify-content-between",children:[t.jsx("span",{className:"text-muted small fw-bold OverView_title",children:e==null?void 0:e.name}),t.jsx("span",{className:"fw-bold p-txt fs-5 OverView_items",children:((n=e==null?void 0:e.qty)==null?void 0:n.length)>20?`${e==null?void 0:e.qty.slice(0,3)} %`:e==null?void 0:e.qty})]}),t.jsx("div",{className:"my-auto rounded-circle bg-very-light-red",style:{width:"57px",aspectRatio:"1/1"},children:t.jsx("img",{className:"w-100 h-100 p-3",src:e==null?void 0:e.icon,alt:""})})]})},f)})})})})}),t.jsxs("div",{className:"h-50",children:[t.jsx("div",{className:"my-3",children:t.jsx("div",{className:"bg-dark py-3 px-4 rounded d-flex justify-content-between",children:t.jsx("h5",{className:"text-white mb-0 fw-bold text-capitalize",children:"INVESTMENT"})})}),t.jsx("div",{className:"w-100",children:c&&c.length>0&&(c==null?void 0:c.map((e,f)=>t.jsx(lt,{list:c,index:f,companyId:e==null?void 0:e._id,userId:d,deals:e==null?void 0:e.deals})))})]})]})})},lt=({companyId:c,list:P,index:E,deals:l,userId:g})=>{var b,S,v,T,d,N,h;const[s,u]=r.useState(null),[A,V]=r.useState(!1),[C,p]=r.useState(0);r.useState(0);const F=Z();return r.useEffect(()=>{(async()=>{const j=await B(c);u(j),p(()=>l.reduce((f,n)=>{var i;const a=(i=n==null?void 0:n.investors)==null?void 0:i.find(w=>w.investerId===g);return f+parseFloat((a==null?void 0:a.amount)||0)},0))})()},[c]),t.jsx(t.Fragment,{children:t.jsxs("div",{className:"investment_container_table",children:[t.jsxs("div",{className:"investment_container",children:[t.jsxs("div",{onClick:()=>F("/customer/overview/about",{state:c}),className:"invt_img",style:{display:"flex",justifyContent:"center",cursor:"pointer",alignItems:"center",padding:"10px"},children:[t.jsx("img",{className:"invt_img_img",src:tt+(s==null?void 0:s.profile)||(s==null?void 0:s.img),alt:""}),t.jsx("img",{src:L,className:"right_red_arrow"})]}),t.jsxs("div",{className:"invt_ftq",children:[t.jsxs("div",{children:[t.jsx("button",{className:"btn btn-sm bg-white-smoke text-dark text-nowrap",children:"ASSET CLASS"}),t.jsx("div",{className:"d-flex justify-content-center align-items-center",style:{marginTop:"10%"},children:t.jsx("div",{className:"fw-bold p-txt",style:{textAlign:"center",fontSize:"13px"},children:(b=s==null?void 0:s.dealSummary)==null?void 0:b.asset})})]}),t.jsxs("div",{children:[t.jsx("button",{className:"btn btn-sm bg-white-smoke text-dark text-nowrap",children:"SECTOR"}),t.jsx("div",{className:"d-flex justify-content-center align-items-center",style:{marginTop:"14%"},children:t.jsx("div",{className:"fw-bold p-txt",style:{textAlign:"center",fontSize:"13px"},children:((v=(S=s==null?void 0:s.dealSummary)==null?void 0:S.sector)==null?void 0:v.length)>8?`${(T=s==null?void 0:s.dealSummary)==null?void 0:T.sector.slice(0,8)}...`:(d=s==null?void 0:s.dealSummary)==null?void 0:d.sector})})]}),t.jsxs("div",{children:[t.jsx("button",{className:"btn btn-sm text-dark text-nowrap bg-white-smoke",children:"INVESTMENT"}),t.jsx("div",{className:"d-flex justify-content-center align-items-center",style:{marginTop:"10%"},children:t.jsx("div",{className:"fw-bold p-txt",style:{textAlign:"center",fontSize:"13px"},children:R(C)})})]})]}),t.jsx("div",{className:"invt_stq",children:t.jsx(ct,{deals:l,userId:g,currentValuation:(N=s==null?void 0:s.dealSummary)==null?void 0:N.currentValuation,sector:(h=s==null?void 0:s.dealSummary)==null?void 0:h.sector})}),t.jsxs("div",{className:"invt_ltq",children:[t.jsxs("div",{children:[t.jsx("button",{className:"btn btn-sm bg-white-smoke text-dark text-nowrap",children:"WEIGHT"}),t.jsx("div",{className:"d-flex justify-content-center align-items-center",style:{marginTop:"10%"},children:t.jsx("div",{className:"fw-bold p-txt",style:{textAlign:"center",fontSize:"13px"},children:"100%"})})]}),t.jsxs("div",{className:"resp",children:[t.jsxs("button",{className:"btn btn-sm text-dark text-nowrap bg-white-smoke loss",style:{cursor:"pointer"},onClick:()=>V(!0),children:["N° of INV.",t.jsx("img",{src:L,alt:"Right Arrow"})]}),t.jsx("div",{className:"d-flex justify-content-center align-items-center",style:{marginTop:"10%"},children:t.jsx("div",{className:"fw-bold p-txt",style:{textAlign:"center",fontSize:"13px",color:"red"},children:l==null?void 0:l.length})})]})]})]}),A&&t.jsx(K,{userId:g,company:s,deals:l,setIsNew:V})]})})};export{bt as default};
