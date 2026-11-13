(function(){
var f=document.getElementById("calc");if(!f)return;
var $=function(i){return document.getElementById(i)};
var K=[["ring","Ring boxes"],["ear","Earring boxes"],["pen","Pendant boxes"],["nec","Necklace boxes"],["ban","Bangle boxes"],["pou","Pouches"],["bag","Carry bags"]];
function n(v){v=parseFloat(String(v).replace(/,/g,""));return isFinite(v)&&v>=0?v:NaN}
function inr(x){var c=Math.round(x*100)%100!==0;return"₹"+x.toLocaleString("en-IN",{minimumFractionDigits:c?2:0,maximumFractionDigits:2})}
function num(x){return x.toLocaleString("en-IN")}
function val(id,d){var e=$(id);return n(e.value===""?d:e.value)}
function row(a,b,c){return'<div class="cl'+(c?" "+c:"")+'"><span>'+a+'</span><b>'+b+'</b></div>'}
var last="";
function calc(){
 var mo=val("mo"),sp=val("sp",0),moq=val("moq",0),su=val("su",0),gs=val("gs",0),ab=val("ab",0);
 var bad=[mo,sp,moq,su,gs,ab].some(isNaN),items=[],sold=0,sub=0,qtyAll=0,notes=[];
 K.forEach(function(k){var m=val("m_"+k[0],0),r=val("r_"+k[0],0);if(isNaN(m)||isNaN(r)){bad=true;return}items.push([k,m,r])});
 $("er").hidden=!bad;if(bad)return;
 var h="";
 items.forEach(function(it){var k=it[0],m=it[1],r=it[2];if(m<=0)return;
  var base=m*mo,need=Math.ceil(base*(1+sp/100)),raised=false;
  if(moq>0&&need<moq){need=moq;raised=true}
  var c=need*r;sub+=c;qtyAll+=need;if(k[0]!=="pou"&&k[0]!=="bag")sold+=base;
  h+=row(k[1]+" ("+num(need)+" × "+inr(r)+")",inr(c));
  if(raised)notes.push(k[1]+" raised to the minimum order of "+num(moq));
 });
 if(!h){$("lines").innerHTML='<p class="cnote">Enter how many you need per month for at least one item.</p>';$("vt").textContent=inr(0);$("adj").hidden=true;return}
 var pre=sub+su,gst=pre*gs/100,tot=pre+gst;
 h+=row("Packaging subtotal",inr(sub));
 if(su>0)h+=row("One-time setup (design, die, plate)",inr(su));
 h+=row("GST ("+gs+"%)",inr(gst));
 var per=sold>0?tot/sold:0;
 if(sold>0)h+=row("Packaging cost per jewellery piece sold",inr(per));
 if(sold>0&&ab>0)h+=row("Share of an average "+inr(ab)+" bill",(per/ab*100).toFixed(2)+"%");
 $("lines").innerHTML=h;$("vt").textContent=inr(tot);
 var note=notes.join(". ");$("adj").textContent=note;$("adj").hidden=!note;
 last="Packaging estimate for "+mo+" month"+(mo>1?"s":"")+"\n"+items.filter(function(i){return i[1]>0}).map(function(i){var need=Math.ceil(i[1]*mo*(1+sp/100));if(moq>0&&need<moq)need=moq;return i[0][1]+": "+num(need)+" x "+inr(i[2])}).join("\n")+"\nSubtotal: "+inr(sub)+(su>0?"\nSetup: "+inr(su):"")+"\nGST ("+gs+"%): "+inr(gst)+"\nTotal: "+inr(tot)+(sold>0?"\nPer piece sold: "+inr(per):"")+"\n\nCalculated at jewellerstudio.com";
 $("wa").href="https://wa.me/?text="+encodeURIComponent(last);
}
$("clr").addEventListener("click",function(){K.forEach(function(k){$("m_"+k[0]).value="";$("r_"+k[0]).value=""});$("su").value="";$("ab").value="";calc();$("m_ring").focus()});
f.addEventListener("input",calc);f.addEventListener("change",calc);
$("cp").onclick=function(){var b=$("cp");function ok(){b.textContent="Copied";setTimeout(function(){b.textContent="Copy summary"},1600)}
 try{navigator.clipboard.writeText(last).then(ok,function(){b.textContent="Press Ctrl+C to copy"})}catch(e){b.textContent="Press Ctrl+C to copy"}};
f.addEventListener("submit",function(e){e.preventDefault()});
calc();
})();
