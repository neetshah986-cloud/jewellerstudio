(function(){var t=document.querySelector(".toc");if(!t)return;var sc=t.querySelector(".toc-s"),f=t.querySelector(".toc-f"),lab=t.querySelector(".toc-t"),links=[].slice.call(sc.querySelectorAll("a")),map={};
links.forEach(function(a){map[a.getAttribute("href").slice(1)]=a});
var rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
function on(id){links.forEach(function(a){a.classList.toggle("on",a===map[id])});var a=map[id];if(a){var l=a.offsetLeft-(sc.clientWidth-a.offsetWidth)/2;sc.scrollTo({left:Math.max(0,l),behavior:rm?"auto":"smooth"})}}
var hs=Object.keys(map).map(function(id){return document.getElementById(id)}).filter(Boolean);
if("IntersectionObserver"in window){var cur=null,io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&e.target.id!==cur){cur=e.target.id;on(cur)}})},{rootMargin:"-90px 0px -65% 0px",threshold:0});hs.forEach(function(h){io.observe(h)})}
links.forEach(function(a){a.addEventListener("click",function(){on(a.getAttribute("href").slice(1))})});
/* scroll affordances: arrow buttons + swipe hint */
function btn(c,d,l){var b=document.createElement("button");b.type="button";b.className="toc-b "+c;b.setAttribute("aria-label",l);b.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="'+(d<0?"M15 5l-7 7 7 7":"M9 5l7 7-7 7")+'" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';b.addEventListener("click",function(){sc.scrollBy({left:d*Math.max(180,sc.clientWidth*.6),behavior:rm?"auto":"smooth"})});f.appendChild(b);return b}
var bl=btn("l",-1,"Scroll sections left"),br=btn("r",1,"Scroll sections right");
var hint=document.createElement("span");hint.className="toc-h";hint.innerHTML='Swipe <i aria-hidden="true">&rarr;</i>';hint.setAttribute("aria-hidden","true");lab.appendChild(hint);
function st(){var over=sc.scrollWidth>sc.clientWidth+4,x=sc.scrollLeft;bl.classList.toggle("off",!over||x<=4);br.classList.toggle("off",!over||x+sc.clientWidth>=sc.scrollWidth-4);f.classList.toggle("can-l",over&&x>4);f.classList.toggle("can-r",over&&x+sc.clientWidth<sc.scrollWidth-4);hint.hidden=!over||x>8}
sc.addEventListener("scroll",st,{passive:true});addEventListener("resize",st);st();
if(!rm&&sc.scrollWidth>sc.clientWidth+4){var k="tocNudged",done=0;try{done=sessionStorage.getItem(k)}catch(e){}if(!done){try{sessionStorage.setItem(k,"1")}catch(e){}setTimeout(function(){if(sc.scrollLeft>4)return;sc.scrollTo({left:70,behavior:"smooth"});setTimeout(function(){sc.scrollTo({left:0,behavior:"smooth"})},750)},1100)}}
})();
