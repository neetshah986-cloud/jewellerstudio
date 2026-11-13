(function(){
var f=document.getElementById("calc");if(!f)return;
var $=function(i){return document.getElementById(i)};
function n(v){v=parseFloat(String(v).replace(/,/g,""));return isFinite(v)&&v>=0?v:NaN}
function inr(x){var c=Math.round(x*100)%100!==0;return"\u20B9"+x.toLocaleString("en-IN",{minimumFractionDigits:c?2:0,maximumFractionDigits:2})}
function val(id,d){var e=$(id);return n(e.value===""?d:e.value)}
function row(a,b,cls){return'<div class="cl'+(cls?" "+cls:"")+'"><span>'+a+'</span><b>'+b+'</b></div>'}
var last="";
function calc(){
 var q=val("qt"),ic=val("ic"),pk=val("pk",0),pr=val("pr",0),dl=val("dl",0),sp=val("sp",0),g=val("gs",0),bg=val("bg",0);
 var bad=[q,ic,pk,pr,dl,sp,g,bg].some(isNaN)||q<1;
 $("er").hidden=!bad;if(bad)return;
 var Q=Math.ceil(q*(1+sp/100)),p=ic+pk+pr+dl,sub=Q*p,gst=sub*g/100,tot=sub+gst,per=tot/q;
 var h=row("Cost per gift before GST<br><small>"+inr(ic)+" gift + "+inr(pk)+" pack + "+inr(pr)+" personalising + "+inr(dl)+" delivery</small>",inr(p));
 h+=row("Gifts to buy ("+q+" + "+sp+"% spare)",String(Q));
 h+=row("Subtotal",inr(sub))+row("GST ("+g+"%)",inr(gst));
 h+=row("Cost per recipient, all-in",inr(per));
 var note="",ok=true;
 if(bg>0){
  var diff=bg-tot,perBuy=p*(1+g/100),maxBuy=perBuy>0?Math.floor(bg/perBuy):0,maxRec=Math.floor(maxBuy/(1+sp/100));
  ok=diff>=0;
  h+=row("Your budget",inr(bg));
  h+=row(ok?"Left in budget":"Over budget by",inr(Math.abs(diff)),ok?"cok":"cbad");
  note=ok?"You are within budget. At this cost per gift you could cover up to "+maxRec+" recipients.":"Over budget. At this cost per gift your budget covers about "+maxRec+" recipients, or reduce the cost per gift to about "+inr(bg/Q/(1+g/100))+" before GST.";
 }
 $("lines").innerHTML=h;$("vt").textContent=inr(tot);
 $("adj").textContent=note;$("adj").hidden=!note;
 last="Gifting budget estimate\nRecipients: "+q+" (buy "+Q+" with "+sp+"% spare)\nCost per gift before GST: "+inr(p)+"\nSubtotal: "+inr(sub)+"\nGST ("+g+"%): "+inr(gst)+"\nTotal: "+inr(tot)+"\nPer recipient: "+inr(per)+(bg>0?"\nBudget: "+inr(bg)+" ("+(ok?"within":"over")+")":"")+"\n\nCalculated at jewellerstudio.com";
 $("wa").href="https://wa.me/?text="+encodeURIComponent(last);
}
var PRE={dw:[200,300,60,40,25],wr:[150,250,60,30,0],em:[25,1000,150,100,50],ho:[50,1500,250,150,100]};
$("ps").addEventListener("change",function(){var v=PRE[this.value];if(!v)return;["qt","ic","pk","pr","dl"].forEach(function(id,i){$(id).value=v[i]});calc()});
f.addEventListener("input",calc);f.addEventListener("change",calc);
$("cp").onclick=function(){var b=$("cp");function ok(){b.textContent="Copied";setTimeout(function(){b.textContent="Copy summary"},1600)}
 try{navigator.clipboard.writeText(last).then(ok,function(){b.textContent="Press Ctrl+C to copy"})}catch(e){b.textContent="Press Ctrl+C to copy"}};
f.addEventListener("submit",function(e){e.preventDefault()});
calc();
})();
