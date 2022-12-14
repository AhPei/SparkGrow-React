"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[376,811],{7273:function(e,n,t){var r=t(1413),s=t(5987),i=t(1827),c=t(9410),a=t(3053),o=t(4651),d=t(184),l=["type","label","feedback","onChange","floating","prefix","suffix","reset","children"];n.Z=function(e){var n=e.type,t=void 0===n?"text":n,u=e.label,h=void 0===u?"Example":u,f=e.feedback,x=e.onChange,j=e.floating,Z=e.prefix,p=e.suffix,v=e.reset,m=e.children,g=(0,s.Z)(e,l),w=(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(i.Z.Control,(0,r.Z)((0,r.Z)({},g),{},{type:t,placeholder:h,isInvalid:!!f,onChange:function(e){var n=e.target,r=n.value,s=n.files;if("file"===t)return x(s);if("number"!==t||/^\d+$/i.test(r)){if("text"!==t||!/[^\w\s@.]/i.test(r)){"email"===t&&/[^\w@.]/i.test(r)||x(r)}}}})),(0,d.jsx)(i.Z.Control.Feedback,{type:"invalid",style:{marginTop:j?"0":"2.2rem"},children:f}),m]});return(0,d.jsx)(i.Z.Group,{className:"mb-4",children:(0,d.jsxs)(c.Z,{children:[Z&&(0,d.jsx)(c.Z.Text,{children:Z}),j?(0,d.jsx)(a.Z,{label:h,children:w}):w,p&&(0,d.jsx)(c.Z.Text,{children:p}),v&&(0,d.jsx)(c.Z.Text,{children:(0,d.jsx)(o.p9r,{color:"black",className:"pointer",onClick:v})})]})})}},2527:function(e,n,t){t.d(n,{Z:function(){return s}});var r=t(2791);function s(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];(0,r.useEffect)((function(){document.title="Loading...",n&&(document.title=e)}),[n])}},376:function(e,n,t){t.r(n),t.d(n,{Payment:function(){return k.Z},default:function(){return C}});var r=t(4165),s=t(5861),i=t(885),c=t(2791),a=t(3053),o=t(1827),d=t(7689),l=t(6720),u=t(4453),h=t(5797),f=(t(7811),t(9337)),x="https://js.stripe.com/v3",j=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,Z="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",p=null,v=function(e){return null!==p||(p=new Promise((function(n,t){if("undefined"!==typeof window)if(window.Stripe&&e&&console.warn(Z),window.Stripe)n(window.Stripe);else try{var r=function(){for(var e=document.querySelectorAll('script[src^="'.concat(x,'"]')),n=0;n<e.length;n++){var t=e[n];if(j.test(t.src))return t}return null}();r&&e?console.warn(Z):r||(r=function(e){var n=e&&!e.advancedFraudSignals?"?advancedFraudSignals=false":"",t=document.createElement("script");t.src="".concat(x).concat(n);var r=document.head||document.body;if(!r)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return r.appendChild(t),t}(e)),r.addEventListener("load",(function(){window.Stripe?n(window.Stripe):t(new Error("Stripe.js not available"))})),r.addEventListener("error",(function(){t(new Error("Failed to load Stripe.js"))}))}catch(s){return void t(s)}else n(null)}))),p},m=function(e,n,t){if(null===e)return null;var r=e.apply(void 0,n);return function(e,n){e&&e._registerWrapper&&e._registerWrapper({name:"stripe-js",version:"1.36.0",startTime:n})}(r,t),r},g=Promise.resolve().then((function(){return v(null)})),w=!1;g.catch((function(e){w||console.warn(e)}));var y=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];w=!0;var r=Date.now();return g.then((function(e){return m(e,n,r)}))},b=t(2527),S=t(184);var k=t(1228),C=function(e){var n=e.title;(0,b.Z)(n);var t=(0,d.TH)().state,x=t.items,j=t.total,Z=(0,l.pP)(),p=Z.data,v=Z.isLoading,m=(0,c.useState)(""),g=(0,i.Z)(m,2),w=g[0],k=g[1],C=(0,c.useState)(!1),N=(0,i.Z)(C,2),E=N[0],F=N[1];(0,c.useEffect)((function(){if((null===p||void 0===p?void 0:p.length)>0){var e=p.filter((function(e){return e}));k(e[0].id)}}),[p]);var A=function(){var e=(0,s.Z)((0,r.Z)().mark((function e(){var n,t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=x.map((function(e){return{product:e.product,quantity:e.quantity}})),t={items:n,address_id:w},l.ZP.post("payment/checkout/",t).then(function(){var e=(0,s.Z)((0,r.Z)().mark((function e(n){var t,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.data,e.next=3,y(t.stripe_public_key);case 3:return s=e.sent,e.next=6,s.redirectToCheckout({sessionId:t.session_id}).then((function(e){}));case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}());case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return t?(0,S.jsx)(S.Fragment,{children:(0,S.jsxs)(h.OrderForm,{items:x,total:j,children:[(0,S.jsx)(a.Z,{label:"Select Address",className:"my-3",children:(0,S.jsx)(o.Z.Select,{value:w,onChange:function(e){return k(e.target.value)},style:{whiteSpace:"pre-wrap",height:"80px"},children:null===p||void 0===p?void 0:p.map((function(e){var n=e.id,t=e.consignee,r=e.contact,s=e.address,i=e.city,c=e.postcode,a=e.country;return(0,S.jsxs)("option",{value:n,style:{whiteSpace:"pre-line"},defaultValue:n,children:[t," | ",r," ",s,", ",i,", ",c,","," ",a,"."]},n)}))})}),(0,S.jsx)(u.Z,{onClick:function(){F((function(e){return!e}))},className:"w-100",children:"Add address"}),(0,S.jsx)(f.Z,{show:E,setShow:F}),(0,S.jsx)(u.Z,{className:"w-100 my-4",loading:v,onClick:A,disabled:""===w,children:"Check Out"})]})}):(0,S.jsx)(d.Fg,{to:"/cart",replace:!0})}},5797:function(e,n,t){t.r(n),t.d(n,{OrderForm:function(){return h},default:function(){return x}});var r=t(7689),s=t(6720),i=t(9388),c=t(7022),a=t(9743),o=t(2677),d=t(2591),l=t(9140),u=t(184);function h(e){var n=e.id,t=e.items,r=e.total,s=e.children;return(0,u.jsx)(c.Z,{className:"mx-auto",children:(0,u.jsxs)(a.Z,{children:[(0,u.jsxs)(o.Z,{children:[n&&(0,u.jsxs)("h4",{children:["Order ID: ",n," "]}),(0,u.jsxs)(d.Z,{striped:!0,bordered:!0,hover:!0,variant:"dark",borderless:!0,className:"text-center",style:{width:"50rem"},children:[(0,u.jsx)("thead",{children:(0,u.jsxs)("tr",{children:[(0,u.jsx)("th",{children:"Item"}),(0,u.jsx)("th",{children:"Unit Price"}),(0,u.jsx)("th",{children:"Quantity"}),(0,u.jsx)("th",{children:"Total"})]})}),(0,u.jsx)("tbody",{children:t.map((function(e,n){var t=e.name,r=e.unitprice,s=e.quantity;return(0,u.jsxs)("tr",{children:[(0,u.jsx)("td",{children:t}),(0,u.jsxs)("td",{children:["RM ",r.toFixed(2)]}),(0,u.jsx)("td",{children:s}),(0,u.jsxs)("td",{children:["RM ",(r*s).toFixed(2)]})]},n)}))})]})]}),(0,u.jsxs)(o.Z,{children:[(0,u.jsxs)(l.Z,{bg:"dark",text:"light",border:"primary",children:[(0,u.jsx)("h3",{className:"ms-2 mt-2",children:"Summary"}),(0,u.jsx)("hr",{className:"m-0"}),(0,u.jsx)(d.Z,{variant:"dark",children:(0,u.jsxs)("tbody",{children:[(0,u.jsxs)("tr",{children:[(0,u.jsx)("td",{children:"Item Total:"}),(0,u.jsxs)("td",{children:["RM ",r]})]}),(0,u.jsxs)("tr",{children:[(0,u.jsx)("td",{children:"Estimated shipping cost:"}),(0,u.jsx)("td",{children:"RM 0.00"})]}),(0,u.jsxs)("tr",{children:[(0,u.jsx)("td",{children:"Taxes total:"}),(0,u.jsx)("td",{children:"RM 0.00"})]}),(0,u.jsxs)("tr",{children:[(0,u.jsx)("td",{children:"Heavy fee:"}),(0,u.jsx)("td",{children:"RM 0.00"})]})]})})]}),s]})]})})}var f=t(2527);var x=function(e){var n=e.title;(0,f.Z)(n);var t=(0,r.UO)().id,c=(0,s.gz)(t),a=c.data;if(c.isLoading)return(0,u.jsx)(i.Z,{});var o=a.products,d=a.total;return(0,u.jsx)(h,{id:t,items:o,total:d})}},7811:function(e,n,t){t.r(n),t.d(n,{default:function(){return g}});var r=t(4165),s=t(5861),i=t(885),c=t(2791),a=t(7022),o=t(9743),d=t(2677),l=t(9140),u=t(8820),h=t(828),f=t(6720),x=t(4453),j=t(5316),Z=t(184);function p(e){var n=e.show,t=e.setShow,r=e.onConfirm;return(0,Z.jsxs)(j.Z,{show:n,onHide:function(){return t(!1)},centered:!0,children:[(0,Z.jsx)(j.Z.Header,{closeButton:!0,children:(0,Z.jsx)(j.Z.Title,{children:"Delete Address"})}),(0,Z.jsx)(j.Z.Body,{children:"Are you sure?"}),(0,Z.jsxs)(j.Z.Footer,{children:[(0,Z.jsx)(x.Z,{variant:"light",onClick:function(){return t(!1)},children:"CANCEL"}),(0,Z.jsx)(x.Z,{onClick:function(){t(!1),r()},children:"YES"})]})]})}var v=t(9388),m=t(9337);function g(){var e=(0,c.useState)(!1),n=(0,i.Z)(e,2),t=n[0],j=n[1],g=(0,c.useState)(!1),w=(0,i.Z)(g,2),y=w[0],b=w[1],S=(0,c.useState)({}),k=(0,i.Z)(S,2),C=k[0],N=k[1],E=(0,c.useState)(!1),F=(0,i.Z)(E,2),A=F[0],R=F[1],T=(0,c.useState)(""),q=(0,i.Z)(T,2),P=q[0],L=q[1],z=(0,f.pP)(),M=z.data,D=z.isLoading,H=(0,f.Hi)().mutate,_=(0,f.FM)(P).mutate;return D?(0,Z.jsx)(v.Z,{}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(a.Z,{children:[(0,Z.jsx)(o.Z,{children:(0,Z.jsx)(d.Z,{className:"text-right",children:(0,Z.jsx)(x.Z,{onClick:function(){return b(!0)},children:"+ Add New Address"})})}),null===M||void 0===M?void 0:M.map((function(e,n){return(0,Z.jsx)(l.Z,{className:"mb-3 py-1 px-2 mx-auto",style:{width:"35rem"},children:(0,Z.jsxs)(o.Z,{children:[(0,Z.jsxs)(d.Z,{children:[(0,Z.jsxs)(l.Z.Title,{className:"text-capitalize",children:[e.consignee," | ",e.contact]}),(0,Z.jsxs)("p",{children:[e.address,", ",e.city,", ",e.postcode,", ",e.country,"."]})]}),(0,Z.jsxs)(d.Z,{className:"text-right",md:4,children:[(0,Z.jsx)(o.Z,{children:(0,Z.jsxs)(d.Z,{children:[(0,Z.jsx)(u.$iz,{className:"pointer",size:"2rem",onClick:function(){j(!0),N(e)}}),!e.isDefault&&(0,Z.jsx)(h._51,{className:"pointer",size:"2rem",onClick:function(){R(!0),L(e.id)}})]})}),(0,Z.jsx)(o.Z,{children:(0,Z.jsx)(d.Z,{children:(0,Z.jsx)(x.Z,{variant:"outline-secondary",size:"sm",disabled:e.isDefault,onClick:(0,s.Z)((0,r.Z)().mark((function n(){return(0,r.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,L(e.id);case 2:_({isDefault:!0});case 3:case"end":return n.stop()}}),n)}))),children:"Set Default"})})})]})]})},n)}))]}),(0,Z.jsx)(p,{show:A,setShow:R,onConfirm:function(){return H(P)}}),(0,Z.jsx)(m.Z,{show:y,setShow:b}),(0,Z.jsx)(m.Z,{show:t,setShow:j,data:C})]})}},9337:function(e,n,t){t.d(n,{Z:function(){return x}});var r=t(885),s=t(2791),i=t(5316),c=t(1827),a=t(9743),o=t(2677),d=t(6720),l=t(4453),u=t(7273),h=t(3521),f=t(184);function x(e){var n=e.show,t=e.setShow,x=e.data,j=x||{},Z=j.id,p=j.consignee,v=j.address,m=j.city,g=j.postcode,w=j.country,y=j.contact,b=(0,s.useState)(""),S=(0,r.Z)(b,2),k=S[0],C=S[1],N=(0,s.useState)(""),E=(0,r.Z)(N,2),F=E[0],A=E[1],R=(0,s.useState)(""),T=(0,r.Z)(R,2),q=T[0],P=T[1],L=(0,s.useState)(""),z=(0,r.Z)(L,2),M=z[0],D=z[1],H=(0,s.useState)(""),_=(0,r.Z)(H,2),I=_[0],O=_[1],B=(0,s.useState)(""),$=(0,r.Z)(B,2),U=$[0],W=$[1],G=(0,s.useState)({}),Q=(0,r.Z)(G,2),V=Q[0],Y=Q[1];(0,s.useEffect)((function(){x&&(C(p),A(y),P(v),D(g),O(m),W(w))}),[x]);var J=(0,d.IA)().mutate,K=(0,d.FM)(Z).mutate;return(0,f.jsxs)(i.Z,{show:n,onHide:function(){return t(!1)},centered:!0,backdrop:!0,children:[(0,f.jsx)(i.Z.Header,{closeButton:!0,children:(0,f.jsxs)(i.Z.Title,{children:[x?"Edit":"Add"," Address"]})}),(0,f.jsx)(i.Z.Body,{children:(0,f.jsxs)(c.Z,{children:[(0,f.jsxs)(a.Z,{children:[(0,f.jsx)(o.Z,{children:(0,f.jsx)(u.Z,{floating:!0,label:"Consignee",value:k,onChange:C,feedback:V.consignee,reset:x&&function(){return C(p)}})}),(0,f.jsx)(o.Z,{children:(0,f.jsx)(u.Z,{floating:!0,label:"Contact",value:F,onChange:A,feedback:V.contact,reset:x&&function(){return A(y)}})})]}),(0,f.jsx)(a.Z,{children:(0,f.jsx)(o.Z,{children:(0,f.jsx)(u.Z,{floating:!0,label:"Address Line 1",value:q,onChange:P,feedback:V.address,reset:x&&function(){return P(v)}})})}),(0,f.jsx)(a.Z,{children:(0,f.jsx)(o.Z,{children:(0,f.jsx)(u.Z,{floating:!0,label:"Zip / Postcode",value:M,onChange:D,feedback:V.postcode,reset:x&&function(){return D(g)}})})}),(0,f.jsxs)(a.Z,{children:[(0,f.jsx)(o.Z,{children:(0,f.jsx)(u.Z,{floating:!0,label:"City",value:I,onChange:O,feedback:V.city,reset:x&&function(){return O(m)}})}),(0,f.jsx)(o.Z,{children:(0,f.jsx)(u.Z,{floating:!0,label:"Country",value:U,onChange:W,feedback:V.consignee,reset:x&&function(){return W(w)}})})]}),(0,f.jsx)(a.Z,{children:(0,f.jsxs)(o.Z,{className:"d-flex justify-content-end gap-3",children:[(0,f.jsx)(l.Z,{variant:"secondary",onClick:function(){return t(!1)},children:"Cancel"}),(0,f.jsx)(l.Z,{onClick:function(){var e={};if(""===k&&(e.consignee="Required"),""===F&&(e.contact="Required"),""===q&&(e.address="Required"),""===I&&(e.city="Required"),""===M&&(e.postcode="Required"),""===U&&(e.country="Required"),!(0,h.Z)(e))return Y(e);Y({});var n={};k!==p&&(n.consignee=k),F!==y&&(n.contact=F),q!==v&&(n.address=q),M!==g&&(n.postcode=M),I!==m&&(n.city=I),U!==w&&(n.country=U);var r=function(){t(!1),C(""),A(""),P(""),D(""),O(""),W("")};x?K(n,{onSuccess:r}):(console.log(n),J(n,{onSuccess:r}))},children:"Save"})]})})]})})]})}},3521:function(e,n,t){function r(e){return 0===Object.keys(e).length}t.d(n,{Z:function(){return r}})},2591:function(e,n,t){var r=t(1413),s=t(5987),i=t(1707),c=t.n(i),a=t(2791),o=t(162),d=t(184),l=["bsPrefix","className","striped","bordered","borderless","hover","size","variant","responsive"],u=a.forwardRef((function(e,n){var t=e.bsPrefix,i=e.className,a=e.striped,u=e.bordered,h=e.borderless,f=e.hover,x=e.size,j=e.variant,Z=e.responsive,p=(0,s.Z)(e,l),v=(0,o.vE)(t,"table"),m=c()(i,v,j&&"".concat(v,"-").concat(j),x&&"".concat(v,"-").concat(x),a&&"".concat(v,"-").concat("string"===typeof a?"striped-".concat(a):"striped"),u&&"".concat(v,"-bordered"),h&&"".concat(v,"-borderless"),f&&"".concat(v,"-hover")),g=(0,d.jsx)("table",(0,r.Z)((0,r.Z)({},p),{},{className:m,ref:n}));if(Z){var w="".concat(v,"-responsive");return"string"===typeof Z&&(w="".concat(w,"-").concat(Z)),(0,d.jsx)("div",{className:w,children:g})}return g}));n.Z=u}}]);
//# sourceMappingURL=376.50cf8d32.chunk.js.map