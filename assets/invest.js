(function(){
var f=document.getElementById("calc");if(!f)return;
var metal=f.getAttribute("data-kind"),mode="p";
var $=function(i){return document.getElementById(i)};
function n(v){v=parseFloat(String(v).replace(/,/g,""));return isFinite(v)&&v>=0?v:NaN}
function sn(v){v=String(v).replace(/,/g,"").trim();if(v==="")return 0;v=parseFloat(v);return isFinite(v)?v:NaN}
function inr(x){var neg=x<0;x=Math.abs(x);var c=Math.round(x*100)%100!==0;return(neg?"\u2212":"")+"\u20B9"+x.toLocaleString("en-IN",{minimumFractionDigits:c?2:0,maximumFractionDigits:2})}
function pc(x){return(x>=0?"+":"\u2212")+Math.abs(x).toFixed(1)+"%"}
function val(id,d){var e=$(id);return n(e.value===""?d:e.value)}
function row(a,b,c){return'<div class="cl'+(c?" "+c:"")+'"><span>'+a+'</span><b>'+b+'</b></div>'}
var last="";
function sale(inv,eff0,w,gr,y,d,rc){var effT=eff0*Math.pow(1+gr/100,y);return Math.max(0,w*effT*(1-d/100)-rc)}
function calc(){
 var w=val("wt"),r=val("rt"),m=val("mk",0),ws=val("ws",0),o=val("ot",0),g=val("gs",0),y=val("yr"),gr=sn($("gr").value),d=val("dd",0),rc=val("rc",0);
 var pbRaw=$("pb").value.trim(),pb=pbRaw===""?NaN:n(pbRaw),db=val("db",0);
 var bad=[w,r,m,ws,o,g,y,gr,d,rc,db].some(isNaN)||(pbRaw!==""&&isNaN(pb))||w<=0||r<=0||y<=0||d>=100||gr<=-100;
 $("er").hidden=!bad;if(bad)return;
 var a=parseFloat($("rb").value),b=parseFloat($("jb").value),eff0=r*b/a,adj=a!==b?"Rate adjusted for purity: "+inr(eff0)+" per gram":"";
 var base=w*eff0,wast=base*ws/100,mk=mode==="p"?base*m/100:w*m,sub=base+wast+mk+o,gst=sub*g/100,inv=sub+gst,extra=inv-base;
 var M=metal==="gold"?"Gold":"Silver";
 var effBE=(inv+rc)/(w*(1-d/100)),rise=(effBE/eff0-1)*100,riseYr=(Math.pow(effBE/eff0,1/y)-1)*100;
 var sv=sale(inv,eff0,w,gr,y,d,rc),pl=sv-inv,ret=pl/inv*100,cagr=sv>0?(Math.pow(sv/inv,1/y)-1)*100:-100;
 var h=row(M+" value today ("+w+" g \u00D7 "+inr(eff0)+")",inr(base));
 if(wast>0)h+=row("Wastage",inr(wast));
 h+=row("Making charges",inr(mk));
 if(o>0)h+=row("Stone / other",inr(o));
 h+=row("GST ("+g+"%)",inr(gst));
 h+=row("Total you pay today",inr(inv),"cok");
 h+=row("Paid on top of the "+metal+" value",inr(extra)+" ("+(extra/base*100).toFixed(1)+"%)");
 h+=row("Break-even rate for your purity",inr(effBE)+"/g");
 h+=row("Needs a rise of "+(riseYr<0?"":"about ")+Math.abs(riseYr).toFixed(1)+"% a year over "+y+" yr",rise>=0?"+"+rise.toFixed(1)+"% in all":"no rise needed");
 h+='<p class="chd">If the '+metal+' price changes by '+gr+'% a year</p>';
 h+=row("Value when you sell",inr(sv));
 h+=row("Profit or loss",inr(pl)+" ("+pc(ret)+")",pl>=0?"cok":"cbad");
 h+=row("Yearly result",pc(cagr)+" a year");
 h+='<p class="chd">Other price changes (per year)</p>';
 [-5,0,5,10,15].forEach(function(x){var v=sale(inv,eff0,w,x,y,d,rc),p=v-inv;h+=row((x>0?"+":"")+x+"%",inr(v)+" ("+pc(p/inv*100)+")",p>=0?"":"cbad")});
 var bar="";
 if(!isNaN(pb)){var bv=inv/(1+pb/100)*Math.pow(1+gr/100,y)*(1-db/100);bar="Same money in a "+metal+" bar or coin: "+inr(bv)+" ("+pc((bv-inv)/inv*100)+")";h+='<p class="chd">Same money in a '+metal+' bar or coin</p>'+row("Value when you sell",inr(bv))+row("Profit or loss",inr(bv-inv)+" ("+pc((bv-inv)/inv*100)+")",bv>=inv?"cok":"cbad")+row("Difference from jewellery",(bv-sv>=0?"+":"\u2212")+inr(Math.abs(bv-sv)))}
 $("lines").innerHTML=h;
 $("vt").textContent=rise<=0?"None":"+"+rise.toFixed(1)+"%";
 $("adj").textContent=adj;$("adj").hidden=!adj;
 last=M+" jewellery investment estimate\nWeight: "+w+" g, rate "+inr(eff0)+"/g\nPaid today: "+inr(inv)+" ("+inr(extra)+" on top of the metal value)\nBreak-even rise: "+(rise<=0?"none":rise.toFixed(1)+"% in "+y+" years")+"\nAt "+gr+"% a year: sale "+inr(sv)+", "+pc(ret)+"\n"+(bar?bar+"\n":"")+"This is an estimate, not financial advice.\n\nCalculated at jewellerstudio.com";
 $("wa").href="https://wa.me/?text="+encodeURIComponent(last);
}
function setMode(x){mode=x;$("mp").setAttribute("aria-pressed",x==="p");$("mg").setAttribute("aria-pressed",x==="g");$("mku").textContent=x==="p"?"%":"\u20B9/g";$("mk").value=x==="p"?$("mk").getAttribute("data-p"):$("mk").getAttribute("data-g");calc()}
$("mp").onclick=function(){setMode("p")};$("mg").onclick=function(){setMode("g")};
f.addEventListener("input",calc);f.addEventListener("change",calc);
$("cp").onclick=function(){var b=$("cp");function ok(){b.textContent="Copied";setTimeout(function(){b.textContent="Copy summary"},1600)}
 try{navigator.clipboard.writeText(last).then(ok,function(){b.textContent="Press Ctrl+C to copy"})}catch(e){b.textContent="Press Ctrl+C to copy"}};
f.addEventListener("submit",function(e){e.preventDefault()});
calc();
})();
