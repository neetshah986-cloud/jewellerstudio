(function(){var t=document.querySelector(".toc");if(!t)return;var sc=t.querySelector(".toc-s"),links=[].slice.call(sc.querySelectorAll("a")),map={};
links.forEach(function(a){map[a.getAttribute("href").slice(1)]=a});
function on(id){links.forEach(function(a){a.classList.toggle("on",a===map[id])});var a=map[id];if(a){var l=a.offsetLeft-(sc.clientWidth-a.offsetWidth)/2;sc.scrollTo({left:Math.max(0,l),behavior:"smooth"})}}
var hs=Object.keys(map).map(function(id){return document.getElementById(id)}).filter(Boolean);
if("IntersectionObserver"in window){var cur=null,io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&e.target.id!==cur){cur=e.target.id;on(cur)}})},{rootMargin:"-90px 0px -65% 0px",threshold:0});hs.forEach(function(h){io.observe(h)})}
links.forEach(function(a){a.addEventListener("click",function(){on(a.getAttribute("href").slice(1))})});
})();
