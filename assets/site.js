(function(){var h=document.getElementById("hdr"),bg=document.getElementById("burger"),items=[].slice.call(document.querySelectorAll(".nav-item")),cats=[].slice.call(document.querySelectorAll(".cat")),dm=matchMedia("(min-width:1240px)"),hv=matchMedia("(min-width:1240px) and (hover:hover)"),t;
function set(i,o){i.classList.toggle("open",o);i.querySelector(".nav-btn").setAttribute("aria-expanded",o)}
function sync(){h.classList.toggle("mega-open",dm.matches&&document.querySelector(".mega-item").classList.contains("open"))}
function closeAll(x){items.forEach(function(i){if(i!==x)set(i,false)});sync()}
function burger(o){h.classList.toggle("nav-open",o);bg.setAttribute("aria-expanded",o);bg.setAttribute("aria-label",o?"Close menu":"Open menu");document.body.classList.toggle("lock",o)}
function cat(c,o){c.classList.toggle("closed",!o);c.querySelector(".cat-t").setAttribute("aria-expanded",o)}
items.forEach(function(it){var b=it.querySelector(".nav-btn");
b.addEventListener("click",function(e){var o=it.classList.contains("open");if(hv.matches&&e.detail>0&&o)return;closeAll(it);set(it,!o);sync()});
it.addEventListener("mouseenter",function(){if(!hv.matches)return;clearTimeout(t);closeAll(it);set(it,true);sync()});
it.addEventListener("mouseleave",function(){if(!hv.matches)return;t=setTimeout(function(){set(it,false);sync()},140)});
it.addEventListener("focusout",function(e){if(dm.matches&&e.relatedTarget&&!it.contains(e.relatedTarget)){set(it,false);sync()}})});
cats.forEach(function(c){c.querySelector(".cat-t").addEventListener("click",function(){cat(c,c.classList.contains("closed"))})});
bg.addEventListener("click",function(){var o=!h.classList.contains("nav-open");if(o&&!bg.dataset.i){bg.dataset.i=1;cats.forEach(function(c){cat(c,false)})}burger(o)});
document.addEventListener("click",function(e){if(dm.matches&&!e.target.closest(".nav-item"))closeAll(null)});
document.addEventListener("keydown",function(e){if(e.key!=="Escape")return;var o=items.filter(function(i){return i.classList.contains("open")})[0];if(dm.matches){closeAll(null);if(o)o.querySelector(".nav-btn").focus()}else if(h.classList.contains("nav-open")){burger(false);bg.focus()}});
function mq(){closeAll(null);if(dm.matches){cats.forEach(function(c){cat(c,true)});burger(false)}}
dm.addEventListener("change",mq);mq()})();
(function(){var d=document.getElementById("help");if(!d)return;document.addEventListener("click",function(e){if(d.open&&!d.contains(e.target))d.open=false});document.addEventListener("keydown",function(e){if(e.key==="Escape"&&d.open){d.open=false;d.querySelector("summary").focus()}})})();
