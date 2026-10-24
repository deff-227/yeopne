/* October 24 supplied posts, selfies and fixed after-concert conversation. */
const selfiesV47=['selfie-oct24-v47-1','selfie-oct24-v47-2','selfie-oct24-v47-3'];
const postsV47=[['14:13','이름만 앙콘'],['14:13','그저 명분이 필요했을 뿐'],['15:18','공연 3시간 전 !!'],['16:41','1시간20분 전 !!'],['17:22','40분전 !!'],['17:44','무대에서 만나자 !!'],['21:56','중콘도 너무너무 재밌었다'],...selfiesV47.map((key)=>['21:57','[사진 '+key+']'])];
const eventsBeforeV47=realtimeEventsV22;
realtimeEventsV22=function(from,to){
 const added=postsV47.map(([time,text],i)=>({ms:Date.parse('2026-10-24T'+time+':00+09:00')+(i>=7?i-7:0)*1000,channel:'bubble',dir:1,text,id:'weekend26:extra47:bubble:'+i}));
 added.push({ms:Date.parse('2026-10-24T21:58:00+09:00'),channel:'chat',dir:0,text:'얼음팩 가져다줄까?',id:'weekend26:extra47:ice:0'},{ms:Date.parse('2026-10-24T21:59:00+09:00'),channel:'chat',dir:1,text:'아냐 ㅋㅋㅋ 나 멀쩡해',id:'weekend26:extra47:ice:1'});
 return [...eventsBeforeV47(from,to),...added.filter(e=>e.ms>from&&e.ms<=to)].sort((a,b)=>a.ms-b.ms);
};
function addContentV47(){
 if(!readStore('selfies-imported-v47',false)){
  let album=albumsV9.find(a=>a.id==='selfies'||a.name==='셀카');if(!album){album={id:'selfies',name:'셀카',photos:[]};albumsV9.push(album)}
  selfiesV47.forEach((key,i)=>{if(!PHOTOS.some(p=>p[0]===key))PHOTOS.push([key,'중콘 셀카 '+(i+1),'10월 24일 오후 9:57']);if(!album.photos.includes(key))album.photos.push(key)});
  editsV7.photos=PHOTOS;persistV7();saveAlbumsV9();saveStore('selfies-imported-v47',true);
 }
 if(!readStore('note-imported-v47',false)){
  const body='울지 말았어야지 왜 울었어 내일은 참자';
  if(!notes.some(n=>n.body===body))notes.push({title:'중콘 끝나고',body,date:'10월 24일'});
  saveStore('notes',notes);saveStore('note-imported-v47',true);
 }
}
const bubbleBeforeV47=renderBubble;
renderBubble=function(...args){
 const result=bubbleBeforeV47(...args),rows=bubble.filter(r=>r[0]);
 surface.querySelectorAll('#bubbleScroll .artist-message,#bubbleScroll .artist-outgoing').forEach((el,index)=>{
  const key=selfiesV47.find(k=>rows[index]?.[1]==='[사진 '+k+']');if(!key)return;
  const box=el.querySelector('.artist-bubble')||el.firstElementChild;if(!box)return;
  box.classList.add('bubble-photo-v32');box.innerHTML='<div class="bubble-photo-frame-v32 raw-selfie-v42"><img src="'+esc(mediaV7['photo:'+key]||'assets/'+key+'.jpg')+'" alt="중콘 셀카" loading="lazy"></div>';
 });return result;
};
const settingsBeforeV47=renderSettings;
renderSettings=function(...args){const result=settingsBeforeV47(...args);surface.querySelectorAll('small').forEach(el=>{if(el.textContent.includes('업데이트 버전'))el.textContent='업데이트 버전 2026.10.24 · 47'});return result};
addContentV47();reconcileTimelineV40(Date.now(),true);
