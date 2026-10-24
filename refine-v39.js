/* Completion pass: reader controls, backup, configured baseline and unified unread state. */
const buildV39='2026.10.24 · 39';
function backupPayloadV39(){const values={};for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(key?.startsWith('yeop-'))values[key]=localStorage.getItem(key)}return {format:'lucy-phone-backup',version:1,createdAt:new Date().toISOString(),values}}
function validateBackupV39(data){
 if(!data||data.format!=='lucy-phone-backup'||data.version!==1||!data.values||Array.isArray(data.values)||typeof data.values!=='object')throw Error('이 휴대폰의 백업 파일이 아닙니다.');
 const entries=Object.entries(data.values);if(entries.length>1000)throw Error('백업 항목이 너무 많습니다.');
 for(const [key,value] of entries){if(!key.startsWith('yeop-')||key.length>200||typeof value!=='string')throw Error('백업 형식이 올바르지 않습니다.');let parsed;try{parsed=JSON.parse(value)}catch{throw Error('손상된 백업 항목이 있습니다.')}
  if(key==='yeop-realtime-conversations-v22'&&(!parsed?.chats||typeof parsed.chats!=='object'||!Array.isArray(parsed.calls)))throw Error('대화 백업 형식이 올바르지 않습니다.');
  if(key==='yeop-realtime-conversations-v22'&&(Array.isArray(parsed.chats)||Object.values(parsed.chats).some(rows=>!Array.isArray(rows)||rows.some(row=>!Array.isArray(row)))))throw Error('대화 목록이 손상되었습니다.');
  if(key==='yeop-story-calls-v37'&&(!parsed||!Array.isArray(parsed.imported)||!Array.isArray(parsed.read)||!parsed.progress||typeof parsed.progress!=='object'))throw Error('통화 상태가 손상되었습니다.');
 }
 return entries;
}
function downloadBackupV39(){captureDraftV31();persistRealtimeV22();const blob=new Blob([JSON.stringify(backupPayloadV39(),null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='LUCY-backup-'+new Date().toISOString().slice(0,10)+'.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function chooseBackupV39(){const input=document.createElement('input');input.type='file';input.accept='.json,application/json';input.onchange=async()=>{try{const file=input.files?.[0];if(!file)return;if(file.size>50*1024*1024)throw Error('백업 파일이 너무 큽니다.');const data=JSON.parse(await file.text());validateBackupV39(data);window.pendingBackupV39=data;collectionSheetV25('백업 복원',`<p>백업 시각: ${esc(data.createdAt||'알 수 없음')}</p><p>현재 브라우저의 휴대폰 데이터를 이 백업으로 교체한다. 필요하면 먼저 현재 내용을 백업한다.</p><button class="collection-item-v25" onclick="downloadBackupV39()">현재 내용 백업</button><button class="collection-item-v25" onclick="restoreBackupV39()">이 백업으로 복원</button><button class="collection-item-v25" onclick="window.pendingBackupV39=null;overlay.innerHTML=''">취소</button>`)}catch(e){toast('복원할 수 없습니다. '+e.message)}};input.click()}
let reloadAfterRestoreV39=false;
function restoreBackupV39(){
 if(callStage){toast('통화를 종료한 후 복원해 주세요.');return}
 const data=window.pendingBackupV39;if(!data)return;const previous=backupPayloadV39().values;
 try{const entries=validateBackupV39(data);const keys=Object.keys(previous);for(const key of keys)localStorage.removeItem(key);for(const [key,value] of entries)localStorage.setItem(key,value);reloadAfterRestoreV39=true;window.pendingBackupV39=null;location.reload()}
 catch(e){let recovered=true;try{const keys=[];for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(key?.startsWith('yeop-'))keys.push(key)}for(const key of keys)localStorage.removeItem(key);for(const [key,value] of Object.entries(previous))localStorage.setItem(key,value)}catch{recovered=false}toast('복원하지 못했습니다. '+(recovered?'기존 데이터를 복구했습니다. ':'저장 공간을 확인하고 백업 파일을 보관해 주세요. ')+e.message)}
}
// Older pagehide handlers must not overwrite the restored snapshot while reloading.
window.addEventListener('pagehide',event=>{if(reloadAfterRestoreV39)event.stopImmediatePropagation()},true);
function saveBaselineV39(){
 if(callStage){toast('통화를 종료한 후 저장해 주세요.');return}
 const baseline=structuredClone(chats);
 for(const id of Object.keys(baseline))baseline[id]=baseline[id].filter(row=>!/^rt22:|^group32:|^story37:/.test(String(row[3]||'')));
 chatBaselineV14=baseline;saveBeforeV14('chat-baseline-v14',baseline);
 const artist=bubble.filter(row=>!/^bubble32:|^bubble42:|^bubble-screenshot-|^rt22:|^concert23:|^weekend26:/.test(String(row[3]||''))).map(row=>row.slice(0,3));
 saveStore('configured-baseline-v39',{bubble:artist,savedAt:Date.now()});saveStore('call-baseline-v15',savedRecentV5);toast('현재 기본 내용을 저장했습니다. 이후 리셋에도 유지됩니다.');overlay.innerHTML='';
}
function confirmBaselineV39(){collectionSheetV25('기본 내용으로 저장',`<p>현재 대화와 버블 내용을 리셋 후에도 남길 기본 내용으로 저장한다. 이후 사용자가 추가한 기록만 리셋된다.</p><button class="collection-item-v25" onclick="saveBaselineV39()">현재 내용을 기본으로 저장</button><button class="collection-item-v25" onclick="overlay.innerHTML=''">취소</button>`)}
const resetBeforeV39=resetHistoryV38;
resetHistoryV38=function(){const configured=readStore('configured-baseline-v39',null);if(Array.isArray(configured?.bubble)){bubble=structuredClone(configured.bubble);saveStore('bubble',bubble)}resetBeforeV39();syncUnreadV39()};
// Existing record reader gains playback controls without affecting live calls.
let readerPausedV39=false,readerSpeedV39=1;
const viewBeforeV39=viewStoryCallV37;
viewStoryCallV37=function(id){readerPausedV39=false;readerSpeedV39=1;viewBeforeV39(id);const box=$('#storyTranscriptV37');if(!box)return;const controls=document.createElement('div');controls.className='record-controls-v39';controls.innerHTML='<button id="recordPauseV39" onclick="toggleReaderV39()">일시정지</button><button onclick="restartReaderV39()">처음부터</button><button id="recordSpeedV39" onclick="speedReaderV39()">속도 1×</button>';box.insertAdjacentElement('beforebegin',controls)};
function toggleReaderV39(){if(!viewerV37)return;readerPausedV39=!readerPausedV39;const button=$('#recordPauseV39');if(button)button.textContent=readerPausedV39?'계속 보기':'일시정지';clearTimeout(viewerV37.timer);if(!readerPausedV39)viewerV37.timer=setTimeout(advanceStoryViewerV37,400)}
function speedReaderV39(){readerSpeedV39=readerSpeedV39===1?1.5:readerSpeedV39===1.5?2:1;const b=$('#recordSpeedV39');if(b)b.textContent='속도 '+readerSpeedV39+'×';if(viewerV37&&!readerPausedV39){clearTimeout(viewerV37.timer);viewerV37.timer=setTimeout(advanceStoryViewerV37,400)}}
function restartReaderV39(){const id=viewerV37?.id||$('#storyTranscriptV37')?.dataset.recordId;if(!id)return;stopStoryViewerV37();eventStateV37.progress[id]=0;saveEventsV37();viewStoryCallV37(id);syncUnreadV39()}
const advanceReaderBeforeV39=advanceStoryViewerV37;
advanceStoryViewerV37=function(){if(readerPausedV39)return;const result=advanceReaderBeforeV39();if(viewerV37){const box=$('#storyTranscriptV37');if(box)box.dataset.recordId=viewerV37.id;if(readerSpeedV39!==1&&!document.hidden){clearTimeout(viewerV37.timer);const current=viewerV37,last=current.row.transcript[Math.max(0,current.index-1)]?.text||'';current.timer=setTimeout(()=>{if(viewerV37===current)advanceStoryViewerV37()},current.index>=current.row.transcript.length?2500:naturalDelayV36(last)/readerSpeedV39)}}syncUnreadV39();return result};
function syncUnreadV39(){
 const count=unreadStoryCallsV37().length;
 document.querySelectorAll('.app-button[onclick*="phone"]').forEach(button=>{let badge=button.querySelector('.call-badge-v39');if(!count){badge?.remove();return}if(!badge){badge=document.createElement('span');badge.className='badge call-badge-v39';button.style.position='relative';button.appendChild(badge)}badge.textContent=count;badge.setAttribute('aria-label','미확인 통화 '+count+'건')});
 const inbox=surface.querySelector('.story-inbox-v37');if(inbox)inbox.textContent='통화 기록 · 미확인 '+count+'건';
 const panel=$('#quickNotificationsV27');if(panel){let card=overlay.querySelector('#callNoticeV39');if(!count){card?.remove();return}if(!card){card=document.createElement('button');card.id='callNoticeV39';card.className='quick-notification-v27';card.onclick=storyCallListV37;panel.insertAdjacentElement('afterend',card)}const html='<b>전화</b><p>미확인 통화 기록 '+count+'건 · 확인하기</p>';if(card.innerHTML!==html)card.innerHTML=html}
}
const settingsBeforeV39=renderSettings;
renderSettings=function(...args){const result=settingsBeforeV39(...args),content=surface.querySelector('.app-content');if(content)content.insertAdjacentHTML('beforeend',`<div class="section-card"><button class="list-item" onclick="downloadBackupV39()">사용 기록 백업 ›</button><button class="list-item" onclick="chooseBackupV39()">백업 파일 복원 ›</button><button class="list-item" onclick="confirmBaselineV39()">현재 내용을 기본으로 저장 ›</button><div class="list-item"><small>업데이트 버전 ${buildV39}</small></div></div>`);return result};
// After the final concert, current calls and replies stop referring to tomorrow's show.
function afterFinalV39(ms=Date.now()){return ms>=Date.parse('2026-10-25T20:00:00+09:00')}
const dialogueBeforeV39=nextDialogueV36;
nextDialogueV36=function(){const script=dialogueBeforeV39();if(afterFinalV39())script.lines=script.lines.map(text=>text.replaceAll('너 오늘 노래해야 되니까','너 목 쉬어야 되니까').replaceAll('내일도 옆에 있어줘','쉬는 날에도 옆에 있어줘').replaceAll('내일도 잘 부탁해 형','이제 같이 좀 쉬자 형').replaceAll('오늘도 눈 마주치면 웃어주는 거다?','나 만나면 오늘처럼 웃어주는 거다?'));return script};
const replyBeforeV39=makeReply;
makeReply=function(id,text){if(id==='yechan'&&afterFinalV39()&&/공연|콘서트|막콘|끝났|허전|여운/.test(text))return pickReplyV25(id,'after-final39',['나 아직도 객석 소리 들리는 것 같아. 너랑 같이해서 진짜 좋았어 ㅎㅎ','다 끝나니까 좀 허전하지. 내일은 나랑 밥 먹으면서 공연 얘기하자','엽아 사흘 동안 정말 고생했어. 이제 목도 쉬고 나랑 푹 쉬자']);return replyBeforeV39(id,text)};
const surfaceBeforeV39=setSurface;
setSurface=function(...args){const result=surfaceBeforeV39(...args);syncUnreadV39();return result};
setInterval(()=>{if(!document.hidden)syncUnreadV39()},2000);
const cssV39=document.createElement('style');cssV39.textContent='.record-controls-v39{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0}.record-controls-v39 button{padding:8px 10px;border:1px solid #d9e3d6;border-radius:12px;background:#f0f6ec;font-size:11px}.call-badge-v39{pointer-events:none}.composer{padding-bottom:max(8px,env(safe-area-inset-bottom));flex-shrink:0}.chat-room{min-height:0}.chat-room .chat-scroll{min-height:0}#callNoticeV39{margin-top:8px;width:100%;text-align:left}';document.head.appendChild(cssV39);
syncUnreadV39();
