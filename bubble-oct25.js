(()=>{
const start=Date.parse('2026-10-25T00:00:00+09:00'),end=start+86400000;
const retired=['벌써 마지막 날이네. 오늘 남은 힘까지 다 쓰고 가자. 이따 만나요 :)','사흘 내내 너무 행복했다. 같이 노래해 줘서 고마워요. 조심히 들어가고 우리 또 만나자'];
const oldRow=r=>retired.includes(r[1])||(/^weekend26:25:/.test(String(r[3]||'')));
const posts=[['12:30','막콘이라니ㅜ'],['13:07','ㅋㅋㅋㅋ시작도 안했는데 아쉽구만'],['13:33','ㅋㅋㅋㅋㅋ공연보기 딱 좋은 날씨네'],['15:21','공연 40분 전 !!'],['15:21','무대에서 보자 !!'],['20:33','이번 콘 진짜 미쳤다 그치?'],['20:34','[막콘 사진 1]'],['20:34','[막콘 사진 2]'],['20:39','행복했냐고?'],['20:39','이게 행복이 아니라면'],['20:40','세상의 모든 행복은 거짓이다.'],['20:40','이 감정이 행복이라는 것이다.'],['20:56','ㅋㅋㅋ재밌었다 !!'],['20:59','세상 사람들이'],['21:00','우리 왈왈이들 무대 이렇게까지 잘 즐긴다는걸']];
const prevEvents=realtimeEventsV22;
realtimeEventsV22=function(...a){return prevEvents(...a).filter(e=>!(e.channel==='bubble'&&e.ms>=start&&e.ms<end))};
function sync(now=Date.now()){
let changed=false;const clean=bubble.filter(r=>!oldRow(r));if(clean.length!==bubble.length){bubble=clean;changed=true}
posts.forEach(([time,text],i)=>{const ms=Date.parse('2026-10-25T'+time+':00+09:00'),id='bubble51:'+i;if(ms<=now&&!bubble.some(r=>r[3]===id)){bubble.push([1,text,realtimeTimeV22(ms),id,ms]);changed=true}});
if(changed){bubble.sort((a,b)=>(a[4]||0)-(b[4]||0));saveStore('bubble',bubble)}
const baseline=readStore('configured-baseline-v39',null);if(baseline?.bubble?.some(oldRow)){baseline.bubble=baseline.bubble.filter(r=>!oldRow(r));saveStore('configured-baseline-v39',baseline)}return changed;
}
const prevImport=importPostsV32;importPostsV32=function(now=Date.now()){const r=prevImport(now);return {...r,bubbleChanged:sync(now)||r.bubbleChanged}};
const prevRender=renderBubble;renderBubble=function(...a){sync();const result=prevRender(...a),rows=bubble.filter(r=>r[0]);surface.querySelectorAll('#bubbleScroll .artist-message,#bubbleScroll .artist-outgoing').forEach((el,i)=>{const m=/^\[막콘 사진 ([12])\]$/.exec(rows[i]?.[1]||'');if(!m)return;const box=el.querySelector('.artist-bubble')||el.firstElementChild;if(box){box.classList.add('bubble-photo-v32');box.innerHTML='<div class="bubble-photo-frame-v32 raw-selfie-v42"><img loading="lazy" alt="막콘 셀카" src="assets/bubble-oct25-'+m[1]+'.jpg"></div>'}});return result};
const prevReset=resetHistoryV38;resetHistoryV38=function(...a){const r=prevReset(...a);sync();return r};sync();
})();
