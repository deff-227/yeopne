/* Recover bundled historical timestamps and extend the fixed October 23 calls. */
function historicalTimesV41(){
 const result={};for(const [id,rows] of Object.entries(SEED_CHATS)){const map=result[id]=new Map();let date=22,previous=-1;for(const row of rows){const match=String(row[2]).match(/(오전|오후)\s*(\d+):(\d+)/);if(!match)continue;const hour=(Number(match[2])%12)+(match[1]==='오후'?12:0),minute=Number(match[3]),clock=hour*60+minute;if(previous>=0&&clock<previous)date++;previous=clock;map.set(row[0]+'|'+row[1],{time:row[2],ms:Date.parse(`2026-10-${date}T${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}:00+09:00`)})}}
 for(const row of NATURAL_YECHAN){const match=row[2].match(/(오전|오후)\s*(\d+):(\d+)/);if(!match)continue;const hour=Number(match[2])%12+(match[1]==='오후'?12:0);result.yechan.set(row[0]+'|'+row[1],{time:row[2],ms:Date.parse(`2026-10-22T${String(hour).padStart(2,'0')}:${match[3]}:00+09:00`)})}return result;
}
function repairHistoricalTimesV41(){const templates=historicalTimesV41();let changed=false;for(const source of [chats,chatBaselineV14])for(const [id,rows] of Object.entries(source))for(const row of rows){if(row[3])continue;const original=templates[id]?.get(row[0]+'|'+row[1]);if(original&&(row[2]!==original.time||row[4]!==original.ms)){row[2]=original.time;row[4]=original.ms;realtimeKnownRowsV22.add(row);changed=true}}if(changed){saveBeforeV14('chat-baseline-v14',chatBaselineV14);persistRealtimeV22()}return changed}
const scheduledBeforeV41=scheduledCallsV37;
scheduledCallsV37=function(){return [...scheduledBeforeV41(),{id:'story41:23:lunch',day:23,time:'12:30',ms:Date.parse('2026-10-23T12:30:00+09:00'),title:'첫콘 날 점심',lines:[
 '예찬|엽아 밥 먹었어? 나 이제 먹으러 가려고.',
 '상엽|아직. 조금만 더 맞춰보고 먹으려고 했는데.',
 '예찬|그러다 또 시간 놓친다. 지금 같이 먹자.',
 '상엽|형 어디야? 내가 그쪽으로 갈게.',
 '예찬|대기실 앞이야. 원상이가 메뉴 고르고 있어ㅋㅋ',
 '상엽|또 고기 먹자는 거 아니야?',
 '예찬|맞아ㅋㅋ 근데 너 노래해야 되니까 편한 걸로 먹자.',
 '상엽|난 국 있는 거면 좋아. 따뜻한 거 먹고 싶어.',
 '예찬|그럼 그걸로 하자. 너 먹는 거 보고 나도 골라야지.',
 '상엽|형 먹고 싶은 것도 시켜. 나 다 먹을 수 있어.',
 '예찬|ㅎㅎ알았어. 오늘 첫날이라 좀 떨리지?',
 '상엽|조금. 근데 형 얼굴 보면 괜찮아질 것 같아.',
 '예찬|그럼 빨리 와. 밥 먹으면서 같이 좀 떨자ㅋㅋ',
 '상엽|응 형. 지금 갈게.'
 ]},{id:'story41:23:outgoing',day:23,time:'22:10',ms:Date.parse('2026-10-23T22:10:00+09:00'),title:'첫콘 끝나고 상엽이 건 전화',type:'발신',audioSrc:secondCallAudioV23,seconds:58,lines:[]}].sort((a,b)=>a.ms-b.ms)};
const importCallsBeforeV41=importStoryCallsV37;
importStoryCallsV37=function(now=Date.now()){let changed=importCallsBeforeV41(now);for(const event of scheduledCallsV37()){if(event.ms>now)continue;const row=callLog.find(r=>r.recordId===event.id);if(!row)continue;if(event.type&&row.type!==event.type){row.type=event.type;changed=true}if(event.audioSrc&&(row.audioSrc!==event.audioSrc||row.seconds!==event.seconds)){row.audioSrc=event.audioSrc;row.seconds=event.seconds;changed=true}}if(changed)saveStore('call-log',callLog);return changed};
const viewBeforeV41=viewStoryCallV37;
viewStoryCallV37=function(id){const row=callLog.find(r=>r.recordId===id);if(!row?.audioSrc)return viewBeforeV41(id);if(callStage)return;stopStoryViewerV37();collectionSheetV25('통화 기록',`<p>${esc(row.date)} · ${esc(row.time)}<br>${row.type==='발신'?'최상엽 → ':''}${esc(CONTACTS[row.id]?.name||'예찬이형♥')}${row.type==='발신'?' · 발신':' → 최상엽 · 수신'}</p><audio controls preload="metadata" src="${esc(row.audioSrc)}" style="width:100%"></audio><button class="collection-item-v25" onclick="storyCallListV37()">목록으로</button>`);if(!eventStateV37.read.includes(id)){eventStateV37.read.push(id);saveEventsV37()}syncUnreadV39()};
const resetBeforeV41=resetHistoryV38;
resetHistoryV38=function(){resetBeforeV41();repairHistoricalTimesV41();importStoryCallsV37();persistRealtimeV22()};
repairHistoricalTimesV41();importStoryCallsV37();
