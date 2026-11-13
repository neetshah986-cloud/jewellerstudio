(function(){
var f=document.getElementById("calc");if(!f)return;
var kind=f.getAttribute("data-kind");
var $=function(i){return document.getElementById(i)};
function n(v){v=parseFloat(String(v).replace(/,/g,""));return isFinite(v)&&v>=0?v:NaN}
function inr(x){var c=Math.round(x*100)%100!==0;return"\u20B9"+x.toLocaleString("en-IN",{minimumFractionDigits:c?2:0,maximumFractionDigits:2})}
function g3(x){return x.toLocaleString("en-IN",{maximumFractionDigits:3})}
function val(id,d){var e=$(id);return n(e.value===""?d:e.value)}
function row(a,b,c){return'<div class="cl'+(c?" "+c:"")+'"><span>'+a+'</span><b>'+b+'</b></div>'}
var last="";
function calc(){
 var w=val("wt"),sw=val("sw",0),r=val("rt"),d=val("dd",0),ch=val("ch",0),np=val("np",0),d2raw=$("d2").value.trim(),d2=d2raw===""?NaN:n(d2raw);
 var bad=[w,sw,r,d,ch,np].some(isNaN)||(d2raw!==""&&isNaN(d2))||w<=0||sw>=w;
 $("er").hidden=!bad;if(bad){$("er").textContent=(sw>=w&&w>0)?"Stone weight must be less than the total weight.":"Please enter numbers only. Weight and rate are needed.";return}
 var net=w-sw,eff=r,adj="";
 if($("rb")&&$("jb")){var a=parseFloat($("rb").value),b=parseFloat($("jb").value);eff=r*b/a;if(a!==b)adj="Rate adjusted for purity: "+inr(eff)+" per gram"}
 var metal=$("mt")?$("mt").options[$("mt").selectedIndex].text:(kind==="gold"?"Gold":"Silver");
 var gross=net*eff,ded=gross*d/100,val1=Math.max(0,gross-ded-ch);
 var h=row("Total weight",g3(w)+" g");
 if(sw>0)h+=row("Less stones and other weight",g3(sw)+" g");
 h+=row("Net "+metal.toLowerCase()+" weight",g3(net)+" g");
 h+=row(metal+" value ("+g3(net)+" g \u00D7 "+inr(eff)+")",inr(gross));
 h+=row("Deduction ("+d+"%)","\u2212"+inr(ded));
 if(ch>0)h+=row("Other charges","\u2212"+inr(ch));
 h+=row("Exchange value",inr(val1),"cok");
 var cash=NaN;
 if(!isNaN(d2)){cash=Math.max(0,gross-gross*d2/100-ch);var df=val1-cash;h+=row("If sold for cash ("+d2+"% deduction)",inr(cash));h+=row("Exchange minus cash",(df>=0?"+":"\u2212")+inr(Math.abs(df)))}
 if(np>0){var bal=np-val1;h+=row("Price of new jewellery",inr(np));h+=row(bal>=0?"Balance to pay":"Credit left with the jeweller",inr(Math.abs(bal)),bal>=0?"":"cok")}
 $("lines").innerHTML=h;$("vt").textContent=inr(val1);
 $("adj").textContent=adj;$("adj").hidden=!adj;
 last="Old "+metal.toLowerCase()+" exchange estimate\nWeight: "+g3(w)+" g (net "+g3(net)+" g)\nRate: "+inr(eff)+"/g\nMetal value: "+inr(gross)+"\nDeduction ("+d+"%): "+inr(ded)+(ch>0?"\nCharges: "+inr(ch):"")+"\nExchange value: "+inr(val1)+(!isNaN(cash)?"\nIf sold for cash: "+inr(cash):"")+(np>0?"\nBalance to pay: "+inr(Math.max(np-val1,0)):"")+"\n\nCalculated at jewellerstudio.com";
 $("wa").href="https://wa.me/?text="+encodeURIComponent(last);
}
f.addEventListener("input",calc);f.addEventListener("change",calc);
$("cp").onclick=function(){var b=$("cp");function ok(){b.textContent="Copied";setTimeout(function(){b.textContent="Copy summary"},1600)}
 try{navigator.clipboard.writeText(last).then(ok,function(){b.textContent="Press Ctrl+C to copy"})}catch(e){b.textContent="Press Ctrl+C to copy"}};
f.addEventListener("submit",function(e){e.preventDefault()});
calc();
})();
