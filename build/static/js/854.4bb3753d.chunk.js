"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[854],{7273:function(e,n,t){var s=t(1413),a=t(5987),r=t(1827),i=t(9410),l=t(3053),c=t(4651),d=t(184),o=["type","label","feedback","onChange","floating","prefix","suffix","reset","children"];n.Z=function(e){var n=e.type,t=void 0===n?"text":n,u=e.label,f=void 0===u?"Example":u,x=e.feedback,h=e.onChange,p=e.floating,Z=e.prefix,m=e.suffix,j=e.reset,b=e.children,g=(0,a.Z)(e,o),v=(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(r.Z.Control,(0,s.Z)((0,s.Z)({},g),{},{type:t,placeholder:f,isInvalid:!!x,onChange:function(e){var n=e.target,s=n.value,a=n.files;if("file"===t)return h(a);if("number"!==t||/^\d+$/i.test(s)){if("text"!==t||!/[^\w\s@.]/i.test(s)){"email"===t&&/[^\w@.]/i.test(s)||h(s)}}}})),(0,d.jsx)(r.Z.Control.Feedback,{type:"invalid",style:{marginTop:p?"0":"2.2rem"},children:x}),b]});return(0,d.jsx)(r.Z.Group,{className:"mb-4",children:(0,d.jsxs)(i.Z,{children:[Z&&(0,d.jsx)(i.Z.Text,{children:Z}),p?(0,d.jsx)(l.Z,{label:f,children:v}):v,m&&(0,d.jsx)(i.Z.Text,{children:m}),j&&(0,d.jsx)(i.Z.Text,{children:(0,d.jsx)(c.p9r,{color:"black",className:"pointer",onClick:j})})]})})}},2527:function(e,n,t){t.d(n,{Z:function(){return a}});var s=t(2791);function a(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];(0,s.useEffect)((function(){document.title="Loading...",n&&(document.title=e)}),[n])}},6854:function(e,n,t){t.r(n),t.d(n,{default:function(){return b}});var s=t(4165),a=t(5861),r=t(885),i=t(2791),l=t(7022),c=t(9140),d=t(1827),o=t(9743),u=t(2677),f=t(4453),x=t(7273),h=t(6720),p=t(7689),Z=t(1087),m=t(2527),j=t(184);function b(e){var n=e.title;(0,m.Z)(n);var t=(0,i.useState)(""),b=(0,r.Z)(t,2),g=b[0],v=b[1],w=(0,i.useState)(""),y=(0,r.Z)(w,2),k=y[0],C=y[1],N=(0,i.useState)(""),S=(0,r.Z)(N,2),T=S[0],E=S[1],A=(0,i.useState)(""),L=(0,r.Z)(A,2),F=L[0],P=L[1],R=(0,i.useState)({}),U=(0,r.Z)(R,2),D=U[0],G=U[1],I=(0,h.mr)(),V=I.isLoading,$=I.isSuccess,_=I.mutate,q=(0,p.s0)(),z=function(){var e=(0,a.Z)((0,s.Z)().mark((function e(n){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),_({username:k,email:g,password:T,re_password:F},{onError:function(e){return G(e.response.data)},onSuccess:function(){return setTimeout((function(){return q("/")}),3e3)}});case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,j.jsx)(l.Z,{className:"d-flex justify-content-center align-items-center vh-100",children:(0,j.jsxs)(c.Z,{className:"overflow-hidden py-3",style:{width:"500px"},children:[(0,j.jsx)("h2",{className:"center",children:"Create an Account"}),(0,j.jsx)("hr",{}),(0,j.jsxs)(d.Z,{noValidate:!0,onSubmit:z,className:"px-4 py-2",children:[(0,j.jsx)(o.Z,{children:(0,j.jsx)(u.Z,{children:(0,j.jsx)(x.Z,{floating:!0,type:"email",label:"Email Address",value:g,onChange:v,feedback:D.email,disabled:V||$})})}),(0,j.jsx)(o.Z,{children:(0,j.jsx)(u.Z,{children:(0,j.jsx)(x.Z,{floating:!0,label:"Username",value:k,onChange:C,feedback:D.username,disabled:V||$})})}),(0,j.jsxs)(o.Z,{children:[(0,j.jsx)(u.Z,{children:(0,j.jsx)(x.Z,{floating:!0,type:"password",label:"Password",value:T,onChange:E,feedback:D.password,disabled:V||$})}),(0,j.jsx)(u.Z,{md:!0,children:(0,j.jsx)(x.Z,{floating:!0,type:"password",label:"Confirm Password",value:F,onChange:P,feedback:D.repassword,disabled:V||$})})]}),(0,j.jsx)(f.Z,{type:"submit",loading:V||$,className:"w-100",style:{borderRadius:"50px"},children:"Register"})]}),(0,j.jsxs)(o.Z,{className:"d-inline text-center mt-3",children:["Already a member?",(0,j.jsx)(Z.rU,{to:"/login",relative:"path",children:"Login"})]})]})})}}}]);
//# sourceMappingURL=854.4bb3753d.chunk.js.map