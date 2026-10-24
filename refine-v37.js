/* Deterministic story calls: elapsed events exist independently of interaction. */
const eventStateV37=readStore('story-calls-v37',{imported:[],progress:{},read:[]});
eventStateV37.imported=Array.isArray(eventStateV37.imported)?eventStateV37.imported:[];
eventStateV37.progress=eventStateV37.progress&&typeof eventStateV37.progress==='object'?eventStateV37.progress:{};
eventStateV37.read=Array.isArray(eventStateV37.read)?eventStateV37.read:[];
function saveEventsV37(){saveStore('story-calls-v37',eventStateV37)}
function scheduledCallsV37(){
 return [24,25].flatMap(day=>[
  {id:'morning36:'+day,day,time:'07:00',title:'모닝콜',lines:dialoguesV36.morning[day-24].slice()},
  {id:'story37:'+day+':lunch',day,time:'12:30',title:'점심 먹었어?',lines:dialoguesV36.lunch[day-24].slice()},
  {id:'story37:'+day+':after',day,time:day===24?'21:30':'20:30',title:day===24?'중콘 끝나고':'막콘 끝나고',lines:day===24?dialoguesV36.night[0].slice():[
   '예찬|엽아, 끝났다. 진짜 사흘 다 했네.',
   '상엽|그러게. 나 아직도 공연장에 있는 것 같아.',
   '예찬|나도. 내려와서 옷 갈아입는데 그제야 좀 실감 나더라.',
   '상엽|형 오늘 마지막 곡에서 나 보는 거 봤어.',
   '예찬|잘 기억해 두려고 봤지. 네가 웃고 있길래 나도 좋았어.',
   '상엽|오늘은 좀 울 것 같았는데 형 보니까 웃음 났어ㅋㅋ',
   '예찬|ㅎㅎ다행이다. 오늘 네 옆에서 연주해서 너무 좋았어.',
   '상엽|나도. 사흘 동안 정말 수고했어 형.',
   '예찬|너도 고생했어 엽아. 목 많이 아프지는 않고?',
   '상엽|괜찮아. 이제 며칠 푹 쉬면 되지. 형 손은?',
   '예찬|나도 괜찮아. 근데 끝났으니까 너 좀 안아주고 싶다.',
   '상엽|그럼 이따 만나. 밥도 같이 먹고.',
   '예찬|좋아. 오늘은 공연 얘기 오래 해도 되겠다ㅋㅋ',
   '상엽|응. 내일 일찍 안 일어나도 되니까.',
   '예찬|고마워 엽아. 같이해서 행복했어.',
   '상엽|나도. 사랑해 형. 얼른 와.'
  ]}
 ]).map(e=>({...e,ms:Date.parse(`2026-10-${e.day}T${e.time}:00+09:00`)}));
}
function importStoryCallsV37(now=Date.now()){
 let changed=false;
 for(const event of scheduledCallsV37()){
  if(event.ms>now)continue;
  let row=callLog.find(r=>r.recordId===event.id);
  if(!row&&!eventStateV37.imported.includes(event.id)){
   // Preserve the user's deletion of an already imported morning call.
   if(event.id.startsWith('morning36:')&&readStore(event.id,false)){eventStateV37.imported.push(event.id);changed=true;continue}
   let offset=0;const transcript=event.lines.map(text=>{const result={text,at:event.ms+offset};offset+=naturalDelayV36(text);return result});
   row={recordId:event.id,id:'yechan',type:'수신',time:realtimeTimeV22(event.ms),date:realtimeDateLabelV22(event.ms),startedAt:event.ms,seconds:Math.ceil(offset/1000),transcript};callLog.push(row);changed=true;
  }
  if(row&&!row.storyEventV37){row.storyEventV37=true;row.storyTitleV37=event.title;changed=true}
  if(!eventStateV37.imported.includes(event.id)){eventStateV37.imported.push(event.id);changed=true}
 }
 if(changed){callLog.sort((a,b)=>(b.startedAt||0)-(a.startedAt||0));saveStore('call-log',callLog);saveEventsV37()}
 return changed;
}
function unreadStoryCallsV37(){return callLog.filter(r=>r.storyEventV37&&!eventStateV37.read.includes(r.recordId)).sort((a,b)=>b.startedAt-a.startedAt)}
function storyCallListV37(){
 importStoryCallsV37();collectionSheetV25('통화 기록',callLog.filter(r=>r.storyEventV37).sort((a,b)=>b.startedAt-a.startedAt).map(r=>`<button class="collection-item-v25" onclick="viewStoryCallV37('${esc(r.recordId)}')"><b>${esc(r.date)} · ${esc(r.time)}</b><span>${r.type==='발신'?'최상엽 → ':''}${esc(CONTACTS[r.id]?.name||'예찬이형♥')}${r.type==='발신'?' · 발신':'에게서 걸려온 전화'}</span><small>${esc(r.storyTitleV37)} · ${eventStateV37.read.includes(r.recordId)?'확인 완료':'미확인'}</small></button>`).join(''));
}
let viewerV37=null,promptSignatureV37='',eligibleAtV37=0;
function stopStoryViewerV37(){if(viewerV37){clearTimeout(viewerV37.timer);viewerV37=null}}
function storyLineHTMLV37(text){const parts=String(text).split('|'),who=parts.length>1?parts.shift():'예찬';return `<p class="story-line-v37 ${who==='상엽'?'quiet-self-v33':''}"><small>${esc(who)}</small>${esc(parts.join('|'))}</p>`}
function advanceStoryViewerV37(){
 const viewer=viewerV37,box=$('#storyTranscriptV37');if(!viewer||!box){stopStoryViewerV37();return}if(document.hidden){viewer.timer=setTimeout(advanceStoryViewerV37,1000);return}
 const lines=viewer.row.transcript||[];
 if(viewer.index>=lines.length){
  if(!eventStateV37.read.includes(viewer.id))eventStateV37.read.push(viewer.id);
  saveEventsV37();const state=$('#storyStatusV37');if(state)state.textContent='통화 기록을 모두 확인했다';stopStoryViewerV37();return;
 }
 const text=lines[viewer.index++].text;box.insertAdjacentHTML('beforeend',storyLineHTMLV37(text));box.scrollTop=box.scrollHeight;eventStateV37.progress[viewer.id]=viewer.index;saveEventsV37();
 viewer.timer=setTimeout(advanceStoryViewerV37,viewer.index===lines.length?5000:naturalDelayV36(text));
}
function viewStoryCallV37(id){
 const row=callLog.find(r=>r.recordId===id);if(!row?.storyEventV37||callStage)return;
 stopStoryViewerV37();const done=eventStateV37.read.includes(id),length=row.transcript.length;
 const saved=Number(eventStateV37.progress[id]),index=done?0:Math.max(0,Math.min(length,Number.isInteger(saved)?saved:0));
 collectionSheetV25(row.storyTitleV37,`<p>${esc(row.date)} · ${esc(row.time)}<br>${esc(CONTACTS[row.id]?.name||'예찬이형♥')}에게서 걸려온 전화</p><div id="storyTranscriptV37" class="story-transcript-v37" aria-live="polite">${row.transcript.slice(0,index).map(r=>storyLineHTMLV37(r.text)).join('')}</div><small id="storyStatusV37">${index?'이어서 확인하는 중…':'대화 기록을 확인하는 중…'}</small><button class="collection-item-v25" onclick="stopStoryViewerV37();storyCallListV37()">목록으로</button>`);
 viewerV37={id,row,index,timer:null};viewerV37.timer=setTimeout(advanceStoryViewerV37,index>=length?5000:500);
}
function promptStoryCallsV37(){
 const rows=unreadStoryCallsV37();if(!rows.length||!unlocked||document.hidden||callStage||overlay.children.length||Date.now()<eligibleAtV37)return;
 const signature=rows.map(r=>r.recordId).sort().join('|');if(signature===promptSignatureV37)return;promptSignatureV37=signature;
 collectionSheetV25('통화 기록',`<p>확인하지 않은 통화 기록이 <b>${rows.length}건</b> 있습니다.<br>확인하시겠습니까?</p><button class="collection-item-v25" onclick="storyCallListV37()">기록 확인하기 ›</button><button class="collection-item-v25" onclick="overlay.innerHTML=''">나중에</button>`);
}
const homeBeforeV37=goHome;
goHome=function(...args){const result=homeBeforeV37(...args);if(!eligibleAtV37)eligibleAtV37=Date.now()+8000;return result};
const archiveBeforeV37=openCallArchiveV26;
openCallArchiveV26=function(id){const row=callLog.find(r=>r.recordId===id);if(row?.storyEventV37){viewStoryCallV37(id);return}return archiveBeforeV37(id)};
const phoneBeforeV37=renderPhone;
renderPhone=function(tab='recent'){importStoryCallsV37();const result=phoneBeforeV37(tab);if(tab==='recent'){const box=surface.querySelector('.adot-summary-label');if(box){const button=document.createElement('button');button.className='story-inbox-v37';button.textContent=`통화 기록 · 미확인 ${unreadStoryCallsV37().length}건`;button.onclick=storyCallListV37;box.insertAdjacentElement('afterend',button)}}return result};
document.addEventListener('visibilitychange',()=>{if(!document.hidden){importStoryCallsV37();promptSignatureV37='';eligibleAtV37=Date.now()+3000}});
window.addEventListener('pagehide',stopStoryViewerV37);
importStoryCallsV37();setInterval(()=>{if(viewerV37&&!$('#storyTranscriptV37'))stopStoryViewerV37();if(document.hidden)return;importStoryCallsV37();promptStoryCallsV37()},2000);
const cssV37=document.createElement('style');cssV37.textContent='.story-transcript-v37{max-height:45vh;overflow:auto;scrollbar-width:none;overscroll-behavior:contain}.story-transcript-v37::-webkit-scrollbar{display:none}.story-line-v37{padding:10px 12px;background:#f1f3ef;border-radius:14px;font-size:13px;line-height:1.7;overflow-wrap:anywhere}.story-line-v37 small{display:block;font-size:10px;opacity:.6}.story-inbox-v37{margin:8px 16px;padding:9px 13px;border:0;border-radius:12px;background:#edf4eb;color:#3c6041;font:inherit;font-size:12px}.collection-list-v25>.collection-item-v25 span{display:block;font-size:11px;margin-top:4px}';document.head.appendChild(cssV37);
