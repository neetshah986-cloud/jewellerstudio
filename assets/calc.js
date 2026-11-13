(function(){
var f=document.getElementById("calc");if(!f)return;
var kind=f.getAttribute("data-kind"),mode="p";
var $=function(i){return document.getElementById(i)};
function n(v){v=parseFloat(String(v).replace(/,/g,""));return isFinite(v)&&v>=0?v:NaN}
function inr(x){var c=Math.round(x*100)%100!==0;return"₹"+x.toLocaleString("en-IN",{minimumFractionDigits:c?2:0,maximumFractionDigits:2})}
function num(x){return x.toLocaleString("en-IN",{maximumFractionDigits:3})}
var last="";
function val(id,d){var e=$(id);return e?n(e.value===""?d:e.value):0}
function row(a,b){return'<div class="cl"><span>'+a+'</span><b>'+b+'</b></div>'}
function calc(){
 var w=val("wt"),r=val("rt"),m=val("mk"),o=val("ot",0),g=val("gs",0),ws=val("ws",0);
 var bad=[w,r,m,o,g,ws].some(isNaN);
 $("er").hidden=!bad;if(bad)return;
 var grams=w,wl=num(w)+" g";
 if($("un")&&$("un").value==="kg"){grams=w*1000;wl=num(w)+" kg"}
 var eff=r,adj="";
 if($("rb")&&$("jb")){var a=parseFloat($("rb").value),b=parseFloat($("jb").value);eff=r*b/a;if(a!==b)adj="Rate adjusted for purity: "+inr(eff)+" per gram"}
 var metal=$("mt")?$("mt").options[$("mt").selectedIndex].text:(kind==="gold"?"Gold":"Silver");
 var base=grams*eff,wast=base*ws/100,mk=mode==="p"?base*m/100:grams*m;
 var sub=base+wast+mk+o,gst=sub*g/100,tot=sub+gst;
 var h=row(metal+" value ("+wl+" × "+inr(eff)+")",inr(base));
 if($("ws"))h+=row("Wastage ("+ws+"%)",inr(wast));
 h+=row("Making charges ("+(mode==="p"?m+"%":inr(m)+"/g")+")",inr(mk));
 h+=row("Stone / other charges",inr(o))+row("Subtotal",inr(sub))+row("GST ("+g+"%)",inr(gst));
 $("lines").innerHTML=h;$("vt").textContent=inr(tot);
 $("adj").textContent=adj;$("adj").hidden=!adj;
 last=(kind==="gold"?"Gold":kind==="silver"?"Silver":"Jewellery")+" price estimate\n"+metal+": "+wl+" @ "+inr(eff)+"/g\nValue: "+inr(base)+(ws?"\nWastage: "+inr(wast):"")+"\nMaking: "+inr(mk)+"\nOther: "+inr(o)+"\nGST ("+g+"%): "+inr(gst)+"\nTotal: "+inr(tot)+"\n\nCalculated at jewellerstudio.com";
 $("wa").href="https://wa.me/?text="+encodeURIComponent(last);
}
f.addEventListener("input",calc);f.addEventListener("change",calc);
function setMode(x){mode=x;$("mp").setAttribute("aria-pressed",x==="p");$("mg").setAttribute("aria-pressed",x==="g");$("mku").textContent=x==="p"?"%":"₹/g";$("mk").value=x==="p"?$("mk").getAttribute("data-p"):$("mk").getAttribute("data-g");calc()}
$("mp").onclick=function(){setMode("p")};$("mg").onclick=function(){setMode("g")};
$("cp").onclick=function(){var b=$("cp");function ok(){b.textContent="Copied";setTimeout(function(){b.textContent="Copy summary"},1600)}
 try{navigator.clipboard.writeText(last).then(ok,function(){b.textContent="Press Ctrl+C to copy"})}catch(e){b.textContent="Press Ctrl+C to copy"}};
f.addEventListener("submit",function(e){e.preventDefault()});
calc();
})();
