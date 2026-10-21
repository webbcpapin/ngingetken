"use strict";
(()=>{
 const toggle=document.getElementById("menu-toggle");
 const nav=document.getElementById("main-nav");
 if(!toggle||!nav)return;
 const close=()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Buka navigasi");};
 toggle.addEventListener("click",()=>{const isOpen=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(isOpen));toggle.setAttribute("aria-label",isOpen?"Tutup navigasi":"Buka navigasi");});
 nav.querySelectorAll("a").forEach(el=>el.addEventListener("click",close));
 document.addEventListener("keydown",e=>{if(e.key==="Escape")close();});
 document.addEventListener("click",e=>{if(!nav.contains(e.target)&&!toggle.contains(e.target))close();});
})();
