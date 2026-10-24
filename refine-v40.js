/* Fixed story chronology is independent of interaction history and reset time. */
const timelineStartV40=Date.parse('2026-10-23T00:00:00+09:00');
let timelineCursorV40=timelineStartV40-1,timelineBusyV40=false;
function fixedMessageV40(row){return /^(rt22:|concert23:|weekend26:|voice25:|group32:)/.test(String(row?.[3]||''))}
function protectBaselineV40(){for(const rows of Object.values(chats))for(const row of rows)if(!row[4])realtimeKnownRowsV22.add(row)}
// Cloned editor/baseline rows are historical content, never new sends.
const stampBeforeV40=stampRealtimeRowsV22;
stampRealtimeRowsV22=function(){for(const rows of Object.values(chats))for(const row of rows)if(fixedMessageV40(row)&&!row[4])realtimeKnownRowsV22.add(row);return stampBeforeV40()};
const importCallsBeforeV40=importStoryCallsV37;
importStoryCallsV37=function(now=Date.now()){
 const due=scheduledCallsV37().filter(event=>event.ms<=now);let changed=false;
 for(const event of due){const row=callLog.find(r=>r.recordId===event.id);if(!row){eventStateV37.imported=eventStateV37.imported.filter(id=>id!==event.id);if(event.id.startsWith('morning36:'))localStorage.removeItem('yeop-'+event.id)}else if(row.startedAt!==event.ms||row.time!==realtimeTimeV22(event.ms)||row.date!==realtimeDateLabelV22(event.ms)){row.startedAt=event.ms;row.time=realtimeTimeV22(event.ms);row.date=realtimeDateLabelV22(event.ms);changed=true}}
 changed=importCallsBeforeV40(now)||changed;if(changed)saveStore('call-log',callLog);return changed;
};
function reconcileTimelineV40(now=Date.now(),full=false){
 if(timelineBusyV40||now<timelineStartV40)return;timelineBusyV40=true;
 try{
  const from=full?timelineStartV40-1:Math.min(timelineCursorV40,now);let changed=false;
  for(const event of realtimeEventsV22(from,now)){
   const rows=event.channel==='bubble'?bubble:(chats.yechan||(chats.yechan=[]));let row=rows.find(r=>r[3]===event.id);
   if(!row){row=[event.dir,event.text,realtimeTimeV22(event.ms),event.id,event.ms];rows.push(row);changed=true;if(event.channel!=='bubble'&&!event.dir)allRead=false}
   else if(row[4]!==event.ms||row[2]!==realtimeTimeV22(event.ms)){row[4]=event.ms;row[2]=realtimeTimeV22(event.ms);changed=true}
   realtimeKnownRowsV22.add(row);
  }
  timelineCursorV40=now;importPostsV32(now);importStoryCallsV37(now);
  if(changed){bubble.sort((a,b)=>(a[4]||0)-(b[4]||0));saveStore('bubble',bubble);persistRealtimeV22();refreshUnreadBadges();if(!document.hidden&&screen==='kakao'){if(activeChat==='yechan')renderChat();else if(!activeChat)renderKakao()}}
 }finally{timelineBusyV40=false}
}
const advanceBeforeV40=advanceRealtimeV22;
advanceRealtimeV22=function(now,away){const result=advanceBeforeV40(now,away);reconcileTimelineV40(now);return result};
const resetBeforeV40=resetHistoryV38;
resetHistoryV38=function(){
 // Register every fresh baseline clone before the older save wrapper can stamp it.
 const originalRead=readStore;
 readStore=function(key,fallback){const value=originalRead(key,fallback);if(key==='chat-baseline-v14'&&value)for(const rows of Object.values(value))for(const row of rows)realtimeKnownRowsV22.add(row);return value};
 const originalStamp=stampRealtimeRowsV22;
 stampRealtimeRowsV22=function(){protectBaselineV40();return originalStamp()};
 try{resetBeforeV40();reconcileTimelineV40(Date.now(),true);persistRealtimeV22()}finally{readStore=originalRead;stampRealtimeRowsV22=originalStamp}
};
// Keep generated story events out of the editable reset baseline.
const saveBaselineBeforeV40=saveBaselineV39;
saveBaselineV39=function(){if(callStage)return saveBaselineBeforeV40();saveBaselineBeforeV40();for(const id of Object.keys(chatBaselineV14))chatBaselineV14[id]=chatBaselineV14[id].filter(row=>!fixedMessageV40(row));saveBeforeV14('chat-baseline-v14',chatBaselineV14)};
protectBaselineV40();reconcileTimelineV40(Date.now(),true);
