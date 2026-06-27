"use strict";(globalThis.webpackChunkgrocerapp=globalThis.webpackChunkgrocerapp||[]).push([[651],{7651(e,t,a){a.r(t),a.d(t,{default:()=>G});var s=a(9643),i=a(2721),r=a(514);const o="adminReviews_wrapper__y5PXX",n="adminReviews_header__iL7Wx",l="adminReviews_subtitle__BMS6q",d="adminReviews_stats__9dt9r",c="adminReviews_statItem__j3uk0",m="adminReviews_toolbar__d0+zR",p="adminReviews_searchWrapper__uXGzD",u="adminReviews_searchInput__-n3i5",v="adminReviews_filterWrapper__6O6ej",h="adminReviews_filterSelect__FFBHg",f="adminReviews_loading__1iy7u",_="adminReviews_spinner__aIzKh",g="adminReviews_empty__Pdzc9",x="adminReviews_reviewsGrid__RUZIT",w="adminReviews_reviewCard__NYeGa",y="adminReviews_cardHeader__SK05U",b="adminReviews_productInfo__NqSrc",j="adminReviews_productImage__YQesM",N="adminReviews_productName__cUnS1",R="adminReviews_orderId__C4nGa",$="adminReviews_deleteBtn__LoCMG",k="adminReviews_cardBody__Nb7Do",C="adminReviews_ratingInfo__F5lQv",S="adminReviews_stars__mdfAK",E="adminReviews_star__u2snY",I="adminReviews_active__rGUdT",L="adminReviews_date__OpsJ9",F="adminReviews_comment__gGrKY",z="adminReviews_cardFooter__Uzh3p",A="adminReviews_userInfo__OTJQm",O="adminReviews_userName__HdA1Q",D="adminReviews_userEmail__Vz2Kr";var T=a(6507);const G=()=>{const[e,t]=(0,s.useState)([]),[a,G]=(0,s.useState)(!0),[M,P]=(0,s.useState)("all"),[K,U]=(0,s.useState)("");(0,s.useEffect)(()=>{(async()=>{G(!0);try{const{data:e}=await(0,i.e_)();t(e.reviews||[])}catch(s){var e,a;console.error("Failed to fetch reviews:",s),r.oR.error((null===s||void 0===s||null===(e=s.response)||void 0===e||null===(a=e.data)||void 0===a?void 0:a.message)||"Failed to load reviews")}finally{G(!1)}})()},[]);const B=e.filter(e=>{var t,a,s,i,r,o,n;const l="all"===M||e.rating===Number(M),d=(null===(t=e.product)||void 0===t||null===(a=t.name)||void 0===a?void 0:a.toLowerCase())||"",c=`${(null===(s=e.user)||void 0===s?void 0:s.first_name)||""} ${(null===(i=e.user)||void 0===i?void 0:i.last_name)||""}`.toLowerCase(),m=(null===(r=e.user)||void 0===r||null===(o=r.email)||void 0===o?void 0:o.toLowerCase())||"",p=(null===(n=e.comment)||void 0===n?void 0:n.toLowerCase())||"",u=""===K||d.includes(K.toLowerCase())||c.includes(K.toLowerCase())||m.includes(K.toLowerCase())||p.includes(K.toLowerCase());return l&&u});return(0,T.jsxs)("div",{className:o,children:[(0,T.jsxs)("div",{className:n,children:[(0,T.jsxs)("div",{children:[(0,T.jsx)("h1",{className:"heading",children:"Product Reviews"}),(0,T.jsx)("p",{className:l,children:"Moderate and manage customer feedback"})]}),(0,T.jsxs)("div",{className:d,children:[(0,T.jsxs)("span",{className:c,children:["Total Reviews: ",(0,T.jsx)("strong",{children:e.length})]}),(0,T.jsxs)("span",{className:c,children:["Filtered: ",(0,T.jsx)("strong",{children:B.length})]})]})]}),(0,T.jsxs)("div",{className:m,children:[(0,T.jsxs)("div",{className:p,children:[(0,T.jsx)("span",{className:"material-symbols-outlined",children:"search"}),(0,T.jsx)("input",{type:"text",placeholder:"Search product, customer, or comment...",value:K,onChange:e=>U(e.target.value),className:u})]}),(0,T.jsxs)("div",{className:v,children:[(0,T.jsx)("label",{children:"Rating:"}),(0,T.jsxs)("select",{value:M,onChange:e=>P(e.target.value),className:h,children:[(0,T.jsx)("option",{value:"all",children:"All Ratings"}),(0,T.jsx)("option",{value:"5",children:"5 Stars"}),(0,T.jsx)("option",{value:"4",children:"4 Stars"}),(0,T.jsx)("option",{value:"3",children:"3 Stars"}),(0,T.jsx)("option",{value:"2",children:"2 Stars"}),(0,T.jsx)("option",{value:"1",children:"1 Star"})]})]})]}),a?(0,T.jsxs)("div",{className:f,children:[(0,T.jsx)("div",{className:_}),(0,T.jsx)("p",{children:"Loading reviews..."})]}):0===B.length?(0,T.jsxs)("div",{className:g,children:[(0,T.jsx)("span",{className:"material-symbols-outlined",children:"rate_review"}),(0,T.jsx)("h3",{children:"No Reviews Found"}),(0,T.jsx)("p",{children:"There are no reviews matching your filters."})]}):(0,T.jsx)("div",{className:x,children:B.map(a=>{var s,o,n,l,d,c,m;return(0,T.jsxs)("div",{className:w,children:[(0,T.jsxs)("div",{className:y,children:[(0,T.jsxs)("div",{className:b,children:[(0,T.jsx)("img",{src:(null===(s=a.product)||void 0===s?void 0:s.image)||"/placeholder-grocery.png",alt:null===(o=a.product)||void 0===o?void 0:o.name,className:j,onError:e=>{e.target.src="https://placehold.co/100?text=Product"}}),(0,T.jsxs)("div",{children:[(0,T.jsx)("h4",{className:N,children:null===(n=a.product)||void 0===n?void 0:n.name}),(0,T.jsxs)("span",{className:R,children:["Order ID: #",a.order_id]})]})]}),(0,T.jsx)("button",{className:$,onClick:()=>(async a=>{if(window.confirm("Are you sure you want to delete this review? This action cannot be undone."))try{await(0,i.tJ)(a),r.oR.success("Review deleted successfully!"),t(e.filter(e=>e._id!==a))}catch(n){var s,o;console.error("Failed to delete review:",n),r.oR.error((null===n||void 0===n||null===(s=n.response)||void 0===s||null===(o=s.data)||void 0===o?void 0:o.message)||"Failed to delete review")}})(a._id),title:"Delete Review",children:(0,T.jsx)("span",{className:"material-symbols-outlined",children:"delete"})})]}),(0,T.jsxs)("div",{className:k,children:[(0,T.jsxs)("div",{className:C,children:[(m=a.rating,(0,T.jsx)("div",{className:S,children:[1,2,3,4,5].map(e=>(0,T.jsx)("span",{className:`${E} ${e<=m?I:""}`,children:"\u2605"},e))})),(0,T.jsx)("span",{className:L,children:new Date(a.createdAt).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})})]}),(0,T.jsx)("p",{className:F,children:a.comment?`"${a.comment}"`:(0,T.jsx)("em",{children:"No written comment provided."})})]}),(0,T.jsx)("div",{className:z,children:(0,T.jsxs)("div",{className:A,children:[(0,T.jsx)("span",{className:"material-symbols-outlined",children:"person"}),(0,T.jsxs)("div",{children:[(0,T.jsxs)("span",{className:O,children:[null===(l=a.user)||void 0===l?void 0:l.first_name," ",null===(d=a.user)||void 0===d?void 0:d.last_name]}),(0,T.jsx)("span",{className:D,children:null===(c=a.user)||void 0===c?void 0:c.email})]})]})})]},a._id)})})]})}},514(e,t,a){a.d(t,{oR:()=>I});var s=a(9643);let i={data:""},r=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let a="",s="",i="";for(let r in e){let o=e[r];"@"==r[0]?"i"==r[1]?a=r+" "+o+";":s+="f"==r[1]?d(o,r):r+"{"+d(o,"k"==r[1]?"":t)+"}":"object"==typeof o?s+=d(o,t?t.replace(/([^,])+/g,e=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):r):null!=o&&(r="-"==r[1]?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=d.p?d.p(r,o):r+":"+o+";")}return a+(t&&i?t+"{"+i+"}":i)+s},c={},m=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+m(e[a]);return t}return e},p=(e,t,a,s,i)=>{let r=m(e),p=c[r]||(c[r]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(r));if(!c[p]){let t=r!==e?e:(e=>{let t,a,s=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?s.shift():t[3]?(a=t[3].replace(l," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(l," ").trim();return s[0]})(e);c[p]=d(i?{["@keyframes "+p]:t}:t,a?"":"."+p)}let u=a&&c.g;return a&&(c.g=c[p]),((e,t,a,s)=>{s?t.data=t.data.replace(s,e):-1===t.data.indexOf(e)&&(t.data=a?e+t.data:t.data+e)})(c[p],t,s,u),p};function u(e){let t=this||{},a=e.call?e(t.p):e;return p(a.unshift?a.raw?((e,t,a)=>e.reduce((e,s,i)=>{let r=t[i];if(r&&r.call){let e=r(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;r=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==r?"":r)},""))(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,r(t.target),t.g,t.o,t.k)}u.bind({g:1});let v,h,f,_=u.bind({k:1});function g(e,t){let a=this||{};return function(){let s=arguments;function i(r,o){let n=Object.assign({},r),l=n.className||i.className;a.p=Object.assign({theme:h&&h()},n),a.o=/go\d/.test(l),n.className=u.apply(a,s)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),f&&d[0]&&f(n),v(d,n)}return t?t(i):i}}var x=(e,t)=>(e=>"function"==typeof e)(e)?e(t):e,w=(()=>{let e=0;return()=>(++e).toString()})(),y=(()=>{let e;return()=>{if(void 0===e&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),b="default",j=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return j(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+r}))}}},N=[],R={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},$={},k=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:b;$[t]=j($[t]||R,e),N.forEach(e=>{let[a,s]=e;a===t&&s($[t])})},C=e=>Object.keys($).forEach(t=>k(e,t)),S=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b;return t=>{k(t,e)}},E=e=>(t,a)=>{let s=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"blank",a=arguments.length>2?arguments[2]:void 0;return{createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||w()}}(t,e,a);return S(s.toasterId||(e=>Object.keys($).find(t=>$[t].toasts.some(t=>t.id===e)))(s.id))({type:2,toast:s}),s.id},I=(e,t)=>E("blank")(e,t);I.error=E("error"),I.success=E("success"),I.loading=E("loading"),I.custom=E("custom"),I.dismiss=(e,t)=>{let a={type:3,toastId:e};t?S(t)(a):C(a)},I.dismissAll=e=>I.dismiss(void 0,e),I.remove=(e,t)=>{let a={type:4,toastId:e};t?S(t)(a):C(a)},I.removeAll=e=>I.remove(void 0,e),I.promise=(e,t,a)=>{let s=I.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?x(t.success,e):void 0;return i?I.success(i,{id:s,...a,...null==a?void 0:a.success}):I.dismiss(s),e}).catch(e=>{let i=t.error?x(t.error,e):void 0;i?I.error(i,{id:s,...a,...null==a?void 0:a.error}):I.dismiss(s)}),e};var L=_`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,F=_`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,z=_`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,A=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${L} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${F} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${z} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,O=_`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,D=g("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${O} 1s linear infinite;
`,T=_`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,G=_`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,M=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${T} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${G} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,P=g("div")`
  position: absolute;
`,K=g("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,U=_`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,B=g("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${U} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,H=e=>{let{toast:t}=e,{icon:a,type:i,iconTheme:r}=t;return void 0!==a?"string"==typeof a?s.createElement(B,null,a):a:"blank"===i?null:s.createElement(K,null,s.createElement(D,{...r}),"loading"!==i&&s.createElement(P,null,"error"===i?s.createElement(A,{...r}):s.createElement(M,{...r})))},Q=e=>`\n0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,Y=e=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}\n`,q=g("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,J=g("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`;s.memo(e=>{let{toast:t,position:a,style:i,children:r}=e,o=t.height?((e,t)=>{let a=e.includes("top")?1:-1,[s,i]=y()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Q(a),Y(a)];return{animation:t?`${_(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${_(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(t.position||a||"top-center",t.visible):{opacity:0},n=s.createElement(H,{toast:t}),l=s.createElement(J,{...t.ariaProps},x(t.message,t));return s.createElement(q,{className:t.className,style:{...o,...i,...t.style}},"function"==typeof r?r({icon:n,message:l}):s.createElement(s.Fragment,null,n,l))});!function(e,t,a,s){d.p=t,v=e,h=a,f=s}(s.createElement);u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`}}]);
//# sourceMappingURL=651.9725c20b.chunk.js.map