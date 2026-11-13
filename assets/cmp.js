(function(){
var f=document.getElementById("calc");if(!f)return;
var $=function(i){return document.getElementById(i)};
function n(v){v=parseFloat(String(v).replace(/,/g,""));return isFinite(v)&&v>=0?v:NaN}
function inr(x){var c=Math.round(x*100)%100!==0;return"\u20B9"+x.toLocaleString("en-IN",{minimumFractionDigits:c?2:0,maximumFractionDigits:2})}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function val(id,d){var e=$(id);return n(e.value===""?d:e.value)}
var last="";
function q(p,label){
 var w=val(p+"wt"),r=val(p+"rt"),m=val(p+"mk",0),ws=val(p+"ws",0),o=val(p+"ot",0),g=val(p+"gs",0);
 if([w,r,m,ws,o,g].some(isNaN)||w<=0)return null;
 var fn=$(p+"fn").value,fam=fn.charAt(0),fine=parseFloat(fn.slice(1)),mode=$(p+"md").value;
 var metal=w*r,wast=metal*ws/100,mk=mode==="p"?metal*m/100:w*m,sub=metal+wast+mk+o,gst=sub*g/100,tot=sub+gst,pure=w*fine/1000;
 var nm=$(p+"nm").value.trim()||label;
 return{nm:nm,w:w,fam:fam,fine:fine,metal:metal,wast:wast,mk:mk,o:o,sub:sub,gst:gst,g:g,tot:tot,pure:pure,pg:tot/pure,extra:(wast+mk+o)/metal*100};
}
function calc(){
 var A=q("a","Quote A"),B=q("b","Quote B");
 $("er").hidden=!!(A&&B);
 if(!A||!B){return}
 var rows=[["Metal value",inr(A.metal),inr(B.metal)],["Wastage",inr(A.wast),inr(B.wast)],["Making charges",inr(A.mk),inr(B.mk)],["Stone / other",inr(A.o),inr(B.o)],["Subtotal",inr(A.sub),inr(B.sub)],["GST ("+A.g+"% / "+B.g+"%)",inr(A.gst),inr(B.gst)]];
 function cell(v,best){return'<b'+(best?' class="cokc"':'')+'>'+v+'</b>'}
 var h='<div class="ct ch"><span></span><b>'+esc(A.nm)+'</b><b>'+esc(B.nm)+'</b></div>';
 rows.forEach(function(r){h+='<div class="ct"><span>'+r[0]+'</span><b>'+r[1]+'</b><b>'+r[2]+'</b></div>'});
 var bt=A.tot===B.tot?-1:(A.tot<B.tot?0:1);
 h+='<div class="ct strong"><span>Total</span>'+cell(inr(A.tot),bt===0)+cell(inr(B.tot),bt===1)+'</div>';
 var same=A.fam===B.fam,bp=!same||A.pg===B.pg?-1:(A.pg<B.pg?0:1),be=A.extra===B.extra?-1:(A.extra<B.extra?0:1);
 h+='<div class="ct"><span>Pure metal in the piece</span><b>'+A.pure.toFixed(3)+' g</b><b>'+B.pure.toFixed(3)+' g</b></div>';
 h+='<div class="ct strong"><span>All-in cost per gram of pure metal</span>'+cell(inr(A.pg),bp===0)+cell(inr(B.pg),bp===1)+'</div>';
 h+='<div class="ct"><span>Extras (making, wastage, other) as % of metal value</span>'+cell(A.extra.toFixed(1)+"%",be===0)+cell(B.extra.toFixed(1)+"%",be===1)+'</div>';
 $("tab").innerHTML=h;
 var vd="",note="";
 if(!same){vd="These quotes are for different metals, so they cannot be compared fairly.";note="Choose the same metal (gold or silver) for both quotes."}
 else if(A.w===B.w&&A.fine===B.fine){
  var d=Math.abs(A.tot-B.tot);
  if(d<0.005)vd="Both quotes come to the same total.";
  else{var lo=A.tot<B.tot?A:B,hi=A.tot<B.tot?B:A;vd=esc(lo.nm)+" is cheaper by "+inr(d)+" ("+(d/hi.tot*100).toFixed(1)+"%) for the same weight and purity."}
  note="Same weight and purity, so the totals are directly comparable."
 }else{
  var d2=Math.abs(A.pg-B.pg);
  if(d2<0.005)vd="Both quotes cost the same per gram of pure metal.";
  else{var l2=A.pg<B.pg?A:B,h2=A.pg<B.pg?B:A;vd=esc(l2.nm)+" costs "+inr(d2)+" less per gram of pure metal ("+(d2/h2.pg*100).toFixed(1)+"% lower)."}
  note="Weight or purity differs, so compare the cost per gram of pure metal. The totals are for different pieces."
 }
 $("vd").innerHTML=vd;$("nt").textContent=note;
 last="Jewellery quote comparison\n"+[A,B].map(function(x){return x.nm+": "+x.w+" g, total "+inr(x.tot)+", "+inr(x.pg)+" per pure gram, extras "+x.extra.toFixed(1)+"% of metal value"}).join("\n")+"\n"+$("vd").textContent+"\n\nCompared at jewellerstudio.com";
 $("wa").href="https://wa.me/?text="+encodeURIComponent(last);
}
$("clr").addEventListener("click",function(){["a","b"].forEach(function(p){["nm","wt","rt","mk","ws","ot"].forEach(function(k){$(p+k).value=""})});$("awt").focus();$("tab").innerHTML="";$("vd").textContent="Enter both quotes to compare them.";$("nt").textContent="";$("er").hidden=false});
f.addEventListener("input",calc);f.addEventListener("change",calc);
$("cp").onclick=function(){var b=$("cp");function ok(){b.textContent="Copied";setTimeout(function(){b.textContent="Copy comparison"},1600)}
 try{navigator.clipboard.writeText(last).then(ok,function(){b.textContent="Press Ctrl+C to copy"})}catch(e){b.textContent="Press Ctrl+C to copy"}};
f.addEventListener("submit",function(e){e.preventDefault()});
calc();
})();
