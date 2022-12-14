"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[480,285],{7542:function(e,n,r){r.d(n,{Z:function(){return i}});var t=r(5316),s=r(4453),a=r(184);function i(e){var n=e.variant,r=e.show,i=e.setShow,c=e.title,o=e.body,l=e.confirm,d=e.onClick,u=(e.closeButton,e.stick),f=e.children,h=e.loading;return u&&(u="static"),(0,a.jsxs)(t.Z,{show:r,onHide:function(){return i(!1)},centered:!0,backdrop:u,children:[(0,a.jsx)(t.Z.Header,{closeButton:!0,children:(0,a.jsx)(t.Z.Title,{children:c})}),(0,a.jsxs)(t.Z.Body,{children:[o," ",f]}),(0,a.jsxs)(t.Z.Footer,{children:[!u&&(0,a.jsx)(s.Z,{variant:"light",onClick:function(){return i(!1)},disabled:h,children:"CANCEL"}),(0,a.jsx)(s.Z,{variant:n,onClick:d,loading:h,children:l})]})]})}},7273:function(e,n,r){var t=r(1413),s=r(5987),a=r(1827),i=r(9410),c=r(3053),o=r(4651),l=r(184),d=["type","label","feedback","onChange","floating","prefix","suffix","reset","children"];n.Z=function(e){var n=e.type,r=void 0===n?"text":n,u=e.label,f=void 0===u?"Example":u,h=e.feedback,x=e.onChange,Z=e.floating,j=e.prefix,m=e.suffix,p=e.reset,v=e.children,g=(0,s.Z)(e,d),w=(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(a.Z.Control,(0,t.Z)((0,t.Z)({},g),{},{type:r,placeholder:f,isInvalid:!!h,onChange:function(e){var n=e.target,t=n.value,s=n.files;if("file"===r)return x(s);if("number"!==r||/^\d+$/i.test(t)){if("text"!==r||!/[^\w\s@.]/i.test(t)){"email"===r&&/[^\w@.]/i.test(t)||x(t)}}}})),(0,l.jsx)(a.Z.Control.Feedback,{type:"invalid",style:{marginTop:Z?"0":"2.2rem"},children:h}),v]});return(0,l.jsx)(a.Z.Group,{className:"mb-4",children:(0,l.jsxs)(i.Z,{children:[j&&(0,l.jsx)(i.Z.Text,{children:j}),Z?(0,l.jsx)(c.Z,{label:f,children:w}):w,m&&(0,l.jsx)(i.Z.Text,{children:m}),p&&(0,l.jsx)(i.Z.Text,{children:(0,l.jsx)(o.p9r,{color:"black",className:"pointer",onClick:p})})]})})}},2527:function(e,n,r){r.d(n,{Z:function(){return s}});var t=r(2791);function s(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];(0,t.useEffect)((function(){document.title="Loading...",n&&(document.title=e)}),[n])}},3480:function(e,n,r){r.r(n),r.d(n,{default:function(){return T}});var t=r(7022),s=r(2527),a=r(2982),i=r(4942),c=r(1413),o=r(885),l=r(7408),d=r(2791),u=r(9140),f=r(9743),h=r(2677),x=r(1827),Z=r(6720),j=r(8617),m=r(4373),p=r(4453),v=r(7542),g=r(7273),w=r(3755),b=r(5285),C=r(2041),k={Container:b.default,SendEmailForm:C.default,Form:w.Z},y=r(7689),N=r(5987),S=r(184),_=["label","children"];function E(e){var n=e.label,r=e.children,t=(0,N.Z)(e,_);return(0,S.jsxs)(x.Z.Group,{as:f.Z,className:"mb-2",children:[(0,S.jsx)(x.Z.Label,{column:!0,sm:"4",className:"text-right",children:n&&n+":"}),(0,S.jsx)(h.Z,{sm:"8",children:r||(0,S.jsx)(x.Z.Control,(0,c.Z)({},t))})]})}function P(){var e=(0,y.s0)(),n=(0,l.useQueryClient)(),r=n.getQueryData(["me"]).data,t=r.username,s=r.email,w=r.image,b=(0,d.useState)(t),C=(0,o.Z)(b,2),N=C[0],_=C[1],P=(0,d.useState)(w),L=(0,o.Z)(P,2),R=L[0],F=L[1],T=(0,d.useState)(!1),D=(0,o.Z)(T,2),O=D[0],A=D[1],U=(0,d.useState)(w),q=(0,o.Z)(U,2),z=q[0],H=q[1],B=(0,d.useState)(!1),I=(0,o.Z)(B,2),Q=I[0],G=I[1],K=(0,d.useState)({}),V=(0,o.Z)(K,2),W=V[0],X=V[1],M=(0,Z.PQ)(),$=M.isLoading,J=M.isSuccess,Y=M.mutate,ee=function(){if(_(t),F(w),Q)return G(!1);O&&A(!1)},ne=(0,d.useState)(!1),re=(0,o.Z)(ne,2),te=re[0],se=re[1],ae=(0,d.useState)(""),ie=(0,o.Z)(ae,2),ce=ie[0],oe=ie[1],le=(0,Z.ZR)(),de=le.mutate,ue=le.isLoading;function fe(){return O?(0,S.jsx)(m.iXN,{size:"2rem",className:"icon me-2 top-left",onClick:ee}):(0,S.jsxs)("div",{className:"d-flex top-right",children:[(0,S.jsx)(m.rzH,{onClick:function(){return A((function(e){return!e}))},className:"icon",size:"2rem"}),(0,S.jsx)(j.cKt,{onClick:function(){return(0,Z.RD)(n)},className:"icon",size:"2rem"})]})}return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(v.Z,{variant:"danger",title:"DELETE ACCOUNT",body:"Are you sure to delete you account? Never be recovered.",confirm:"DELETE",onClick:function(){if(!ce)return X({current_password:"Please enter your password."});de({current_password:ce},{onError:function(e){for(var n=e.response.data,r=function(){var e=(0,o.Z)(s[t],2),n=e[0],r=e[1];X((function(e){return(0,c.Z)((0,c.Z)({},e),{},(0,i.Z)({},n,r[0]))}))},t=0,s=Object.entries(n);t<s.length;t++)r()}})},loading:ue,show:te,setShow:se,cancel:!0,children:(0,S.jsx)(g.Z,{type:"password",label:"Current Password",value:ce,onChange:oe,feedback:W.current_password})}),(0,S.jsxs)(u.Z,{style:{width:"50%"},className:"py-4 mx-auto",children:[(0,S.jsx)(f.Z,{children:(0,S.jsxs)(h.Z,{className:"d-flex justify-content-center mb-3",children:[(0,S.jsx)("img",{src:z,alt:"profile",width:"150px",height:"150px",className:"cover circle"}),(0,S.jsx)(fe,{})]})}),(0,S.jsx)(x.Z,{noValidate:!0,className:"m-4",children:Q?(0,S.jsx)(k.Form,{current:!0,onConfirm:function(){return G(!1)}}):(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(E,{label:"Username",type:"text",value:N,onChange:function(e){return _(e.target.value)},disabled:!O||$||J,plaintext:!O}),(0,S.jsx)(E,{label:"Email",type:"text",defaultValue:s,disabled:!0,plaintext:!O}),O?(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(E,{label:"Password",children:(0,S.jsx)(p.Z,{variant:"secondary",onClick:function(){return G((function(e){return!e}))},children:"Change"})}),(0,S.jsx)(E,{children:(0,S.jsx)(g.Z,{type:"file",accept:"image/*",onChange:function(e){var n=Object.entries(e).map((function(e){return URL.createObjectURL(e[1])}));H((0,a.Z)(n)),F.apply(void 0,(0,a.Z)(e))},feedback:W.image,reset:function(){return F(w)},onClick:function(e){return e.target.value=""},disabled:$||J})}),(0,S.jsx)(E,{children:(0,S.jsx)(p.Z,{variant:"danger",onClick:se,children:"Delete Account"})}),(0,S.jsx)(f.Z,{className:"mt-4 text-center",children:(0,S.jsx)(h.Z,{children:(0,S.jsx)(p.Z,{variant:"success",type:"submit",onClick:function(e){e.preventDefault(),X({});var n={};N!==t&&(n.username=N),R!==w&&(n.image=R);Y(n,{onError:function(e){for(var n=e.response.data,r=function(){var e=(0,o.Z)(s[t],2),n=e[0],r=e[1];X((function(e){return(0,c.Z)((0,c.Z)({},e),{},(0,i.Z)({},n,r[0]))}))},t=0,s=Object.entries(n);t<s.length;t++)r()},onSuccess:function(){return A(!1)}})},disabled:$||J,children:"Save"})})})]}):(0,S.jsx)(f.Z,{children:(0,S.jsx)(h.Z,{className:"text-center",children:(0,S.jsx)(p.Z,{onClick:function(){return e("address")},children:"Address"})})})]})})]})]})}var L=r(2591),R=r(9388);function F(){var e=(0,Z.Wb)(),n=e.isLoading,r=e.data,t=(0,y.s0)();return n?(0,S.jsx)(R.Z,{}):(console.log(r),(0,S.jsxs)(L.Z,{striped:!0,bordered:!0,hover:!0,variant:"dark",style:{width:"50%"},className:"mx-auto text-center mt-3",children:[(0,S.jsx)("thead",{children:(0,S.jsx)("tr",{children:["Order ID","Products","Total","Purchased Date"].map((function(e,n){return(0,S.jsx)("th",{style:{fontWeight:"bold"},children:e},n)}))})}),(0,S.jsx)("tbody",{children:null===r||void 0===r?void 0:r.map((function(e,n){var r=e.id,s=e.products,a=e.total,i=e.created_at;return(0,S.jsxs)("tr",{onClick:function(){return t("/order/".concat(r))},children:[(0,S.jsx)("td",{children:r}),(0,S.jsx)("td",{children:s.length}),(0,S.jsxs)("td",{children:["RM ",a]}),(0,S.jsx)("td",{children:i})]},n)}))})]}))}var T=function(e){var n=e.title;return(0,s.Z)(n),(0,S.jsxs)(t.Z,{children:[(0,S.jsx)(P,{}),(0,S.jsx)(F,{})]})}},5285:function(e,n,r){r.r(n),r.d(n,{default:function(){return l}});var t=r(7689),s=r(2527),a=r(3755),i=r(7022),c=r(9140),o=r(184);function l(e){var n=e.title;(0,s.Z)(n);var r=(0,t.s0)();return(0,o.jsx)(i.Z,{className:"screen-center",children:(0,o.jsx)(c.Z,{className:"p-3",style:{width:"30%"},children:(0,o.jsx)(a.Z,{onConfirm:function(){return r("/")}})})})}},2041:function(e,n,r){r.r(n),r.d(n,{default:function(){return m}});var t=r(885),s=r(2791),a=r(7022),i=r(9140),c=r(9743),o=r(2677),l=r(4373),d=r(7689),u=r(6720),f=r(4453),h=r(7542),x=r(7273),Z=r(2527),j=r(184);function m(e){var n=e.title;(0,Z.Z)(n);var r=(0,d.s0)(),m=(0,s.useState)({}),p=(0,t.Z)(m,2),v=p[0],g=p[1],w=(0,s.useState)(""),b=(0,t.Z)(w,2),C=b[0],k=b[1],y=(0,s.useState)(!1),N=(0,t.Z)(y,2),S=N[0],_=N[1],E=(0,u.Hk)(),P=E.isLoading,L=E.mutate;return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(h.Z,{show:S,setShow:_,onClick:function(){return r("/")},title:"Email was sent successfully",body:"Please check your email to reset your password.",confirm:"OK",stick:!0}),(0,j.jsx)(a.Z,{className:"screen-center",children:(0,j.jsxs)(i.Z,{className:"p-3",style:{width:"30%"},children:[(0,j.jsx)(c.Z,{children:(0,j.jsx)(o.Z,{children:(0,j.jsxs)(i.Z.Title,{children:[(0,j.jsx)(l.iXN,{className:"me-3 pointer",onClick:function(){return r("/")}}),"Reset Password"]})})}),(0,j.jsx)(c.Z,{children:(0,j.jsx)(o.Z,{children:(0,j.jsx)(x.Z,{floating:!0,type:"email",label:"Email Address",placeholder:"Email Address",value:C,onChange:k,feedback:v.email})})}),(0,j.jsx)(c.Z,{className:"mx-auto",children:(0,j.jsx)(o.Z,{children:(0,j.jsx)(f.Z,{onClick:function(e){if(e.preventDefault(),""===C)return g({email:"This field is required."});g({});L({email:C},{onError:function(e){var n=e.response.data;g({email:n[0]})},onSuccess:function(){return _(!0)}})},loading:P,children:"Reset Password"})})})]})})]})}},3755:function(e,n,r){r.d(n,{Z:function(){return Z}});var t=r(4942),s=r(1413),a=r(885),i=r(2791),c=r(9743),o=r(2677),l=r(7689),d=r(6720),u=r(4453),f=r(7273),h=r(3521),x=r(184);function Z(e){var n=e.current,r=(e.onConfirm,(0,i.useState)({})),Z=(0,a.Z)(r,2),j=Z[0],m=Z[1],p=(0,i.useState)(""),v=(0,a.Z)(p,2),g=v[0],w=v[1],b=(0,i.useState)(""),C=(0,a.Z)(b,2),k=C[0],y=C[1],N=(0,i.useState)(""),S=(0,a.Z)(N,2),_=S[0],E=S[1],P=(0,l.UO)(),L=P.uid,R=P.token,F=(0,d.y8)(),T=F.isLoading,D=F.isSuccess,O=F.mutate,A=(0,d.mI)(),U=A.isLoading,q=A.isSuccess,z=A.mutate;return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(c.Z,{children:(0,x.jsx)(o.Z,{children:(0,x.jsxs)("h4",{children:[n?"Change":"Reset"," Password"]})})}),n&&(0,x.jsx)(f.Z,{type:"password",label:"Current Password",value:g,onChange:w,feedback:j.current_password,disabled:T||D||q||U}),(0,x.jsx)(f.Z,{type:"password",label:"New Password",value:k,onChange:y,feedback:j.new_password,disabled:T||D||q||U}),(0,x.jsx)(f.Z,{type:"password",label:"Confirm New Password",value:_,onChange:E,feedback:j.re_new_password,disabled:T||D||q||U}),(0,x.jsx)(c.Z,{children:(0,x.jsx)(o.Z,{children:(null===j||void 0===j?void 0:j.token)&&(0,x.jsx)("span",{className:"error",children:j.token})})}),(0,x.jsx)(c.Z,{children:(0,x.jsx)(o.Z,{className:"d-flex justify-content-end gap-3",children:(0,x.jsxs)(u.Z,{variant:"success",onClick:function(e){return function(e){e.preventDefault();var r={};if(n&&!g&&(r.current_password="Required"),k||(r.new_password="Required"),_||(r.re_new_password="Required"),!(0,h.Z)(r))return m(r);if(k!==_)return m({re_new_password:"Password does not match!"});m({});var i=function(e){for(var n=e.response.data,r=function(){var e=(0,a.Z)(c[i],2),n=e[0],r=e[1];m((function(e){return(0,s.Z)((0,s.Z)({},e),{},(0,t.Z)({},n,r[0]))}))},i=0,c=Object.entries(n);i<c.length;i++)r()};n?O({current_password:g,new_password:k,re_new_password:_},{onError:i}):z({uid:L,token:R,new_password:k,re_new_password:_},{onError:i})}(e)},loading:T||D||q||U,children:[n?"Change":"Reset"," Password"]})})})]})}},3521:function(e,n,r){function t(e){return 0===Object.keys(e).length}r.d(n,{Z:function(){return t}})}}]);
//# sourceMappingURL=480.a5bae6fc.chunk.js.map