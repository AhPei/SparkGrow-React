"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[537],{2527:function(e,n,r){r.d(n,{Z:function(){return t}});var s=r(2791);function t(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];(0,s.useEffect)((function(){document.title="Loading...",n&&(document.title=e)}),[n])}},9537:function(e,n,r){r.r(n),r.d(n,{default:function(){return g}});var s=r(7689),t=r(7022),i=r(9743),c=r(2677),l=r(4154),d=r(4453),a=r(9388),o=r(885),u=r(2791),h=r(2265),x=r(6355),m=r(184);function j(e){var n=e.images,r=(0,u.useState)(0),s=(0,o.Z)(r,2),t=s[0],i=s[1];return(0,m.jsx)(h.Z,{className:"overflow-hidden",style:{backgroundColor:"#969696"},activeIndex:t,onSelect:function(e,n){return i(e)},prevIcon:(0,m.jsx)(x.bUI,{size:"2rem"}),nextIcon:(0,m.jsx)(x.Dli,{size:"2rem"}),controls:n.length>1,interval:null,indicators:n.length>0,children:n.length>0?null===n||void 0===n?void 0:n.map((function(e,n){return(0,m.jsx)(h.Z.Item,{children:(0,m.jsx)("img",{className:"d-block mx-auto w-auto mh-100 cover",src:e,alt:e})},n)})):(0,m.jsx)(h.Z.Caption,{children:(0,m.jsx)("h3",{style:{textAlign:"center"},children:"No preview image"})})})}var f=r(6720),Z=r(2527),v=r(3402);var g=function(e){var n=e.title,r=(0,s.UO)(),o=(0,f.m$)(r.id),u=o.isLoading,h=o.isError,x=o.error,g=o.data,p=o.isSuccess;(0,Z.Z)("".concat(n," ").concat(null===g||void 0===g?void 0:g.name),p);var k=(0,f.Bq)().mutate;if(u)return(0,m.jsx)(a.Z,{});if(h)return(0,m.jsxs)("span",{children:["Error: ",x.message]});var N=g.id,w=g.name,b=g.desc,C=g.image,I=g.stock,S=g.unitprice;return(0,m.jsx)(m.Fragment,{children:(0,m.jsx)(t.Z,{children:(0,m.jsxs)(i.Z,{children:[(0,m.jsx)(c.Z,{sm:12,md:6,children:(0,m.jsx)(l.Z,{aspectRatio:"4x3",children:(0,m.jsx)(j,{images:C})})}),(0,m.jsxs)(c.Z,{md:6,children:[(0,m.jsxs)(i.Z,{children:[(0,m.jsx)(c.Z,{sm:10,children:(0,m.jsx)("h3",{className:"text-ellipsis",children:w})}),(0,m.jsx)(c.Z,{sm:2,children:(0,m.jsx)("h5",{className:"d-flex justify-content-end align-items-center h-100",children:S})})]}),(0,m.jsxs)(i.Z,{children:[(0,m.jsx)(c.Z,{children:(0,m.jsxs)("pre",{className:"p-3",style:{backgroundColor:"#d4d3d2"},children:[(0,m.jsx)("h6",{children:"Product Description"}),(0,m.jsx)("p",{children:b})]})}),(0,m.jsx)(c.Z,{className:"d-none",children:I})]}),(0,m.jsx)(i.Z,{children:(0,m.jsx)(c.Z,{children:I?(0,m.jsx)(d.Z,{value:N,onClick:function(e){var n=e.target.value;k(n,{onError:function(){return v.ZP.error("Something went error.")},onSuccess:function(){return v.ZP.success("Item added to cart.")}})},className:"w-100",children:"Add to Cart"}):(0,m.jsx)(d.Z,{className:"w-100",disabled:!0,children:"Sold Out"})})})]})]})})})}}}]);
//# sourceMappingURL=537.9be5f5d0.chunk.js.map