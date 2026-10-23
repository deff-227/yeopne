/* Reset interaction history without removing the configured phone content. */
function showHistoryResetV38(){
 collectionSheetV25('사용 기록 리셋',`<p>프로필·사진·배경·설정과 편집한 기본 대화는 유지한다.</p><p>직접 보낸 카톡, 통화, 답장 예약, 초안과 기록 확인 상태를 지우고 정해진 사건만 다시 남긴다.</p><button class="collection-item-v25" onclick="resetHistoryV38()">사용 기록 리셋하기</button><button class="collection-item-v25" onclick="overlay.innerHTML=''">취소</button>`);
}
let resettingV38=false;
function resetHistoryV38(){
 if(resettingV38)return;resettingV38=true;
 try{
  captureDraftV31();pauseRefreshTimerV31();stopStoryViewerV37();closeMediaV31();
  clearTimeout(storyCallTimer);clearCallTimers();postCallMessageTimers.forEach(clearTimeout);postCallMessageTimers=[];Object.values(replyTimers).forEach(clearTimeout);replyTimers={};
  callSong.pause();outgoingVoiceV13.pause();surface.querySelectorAll('audio').forEach(a=>a.pause());
  refreshPendingV29=false;refreshRingingV29=false;refreshConnectedV29=false;refreshScheduledV29=false;restoringCallV33=null;audioArchiveV26=null;outgoingArchiveV26=null;
  chats=structuredClone(readStore('chat-baseline-v14',chatBaselineV14));callLog=[];allRead=true;storyStage='finished';callStage=null;activeChat=null;callQueued=false;
  const now=Date.now(),start=Date.parse('2026-10-23T00:00:00+09:00');
  realtimeStateV22={created:now,chats,calls:callLog,allRead,story:'finished',pending:{},dayCall:[],saved:now};
  chatExtrasV25.memory={};chatExtrasV25.favorites=[];chatExtrasV25.followups=[];saveChatExtrasV25();
  extrasV29.reactions={};extrasV29.draft='';extrasV29.chatDrafts={};extrasV29.replyQueue=[];extrasV29.missedAt=0;extrasV29.lastPostCall=0;saveExtrasV29();
  eventStateV37.imported=[];eventStateV37.progress={};eventStateV37.read=[];saveEventsV37();promptSignatureV37='';eligibleAtV37=now+8000;
  for(const id of Object.keys(notificationReadV27))delete notificationReadV27[id];dismissedV27.splice(0);saveStore('notification-read-v27',notificationReadV27);saveStore('notification-dismissed-v27',dismissedV27);
  for(const day of [24,25])localStorage.removeItem('yeop-morning36:'+day);
  for(const band of ['morning','lunch','day','night'])localStorage.removeItem('yeop-dialogue36:'+band);
  localStorage.removeItem('yeop-quiet-call-next-v32');
  // Bubble editor content has no runtime ID; scheduled posts are imported again below.
  bubble=bubble.filter(row=>!String(row[3]||'').startsWith('bubble-typed:'));saveStore('bubble',bubble);
  saveCursorV22(Math.min(now,start));persistRealtimeV22();advanceRealtimeV22(now,true);importScreenshotBubbleV28(now);importPostsV32(now);importMorningV36(now);importStoryCallsV37(now);
  saveStore('chats',chats);saveStore('call-log',callLog);persistRealtimeV22();
  // Do not let a stale input put a discarded draft back into storage during navigation.
  const input=$('#chatInput');if(input)input.value='';const draft=$('#bubbleInput');if(draft)draft.value='';
  unlocked=false;screen='lock';pin='';pending=null;history=[];recent=[];overlay.innerHTML='';$('#systemNav').style.visibility='hidden';renderLock();refreshUnreadBadges();toast('사용 기록을 리셋했습니다. 설정과 정해진 사건은 유지됩니다.');
 }finally{resettingV38=false}
}
const deskV38=document.querySelector('.desk-controls');if(deskV38&&!$('#resetHistoryV38')){const button=document.createElement('button');button.id='resetHistoryV38';button.textContent='↺ 사용 기록 리셋';button.onclick=showHistoryResetV38;deskV38.appendChild(button)}
const settingsBeforeV38=renderSettings;
renderSettings=function(...args){const result=settingsBeforeV38(...args);const content=surface.querySelector('.app-content');if(content){const button=document.createElement('button');button.className='list-item reset-settings-v38';button.innerHTML='<span>사용 기록 리셋<small>설정은 유지하고 정해진 사건부터 다시 보기</small></span>›';button.onclick=showHistoryResetV38;content.appendChild(button)}return result};
const cssV38=document.createElement('style');cssV38.textContent='#resetHistoryV38{flex-basis:100%;justify-content:center}.desk-controls{flex-wrap:wrap}.reset-settings-v38{width:100%;margin-top:18px;color:#815f53}.reset-settings-v38 small{display:block;font-size:10px;margin-top:5px;color:#888}';document.head.appendChild(cssV38);
