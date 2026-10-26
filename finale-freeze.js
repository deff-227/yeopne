/* Final story time; real timers remain active for user interactions. */
(()=>{
const cutoff=Date.parse('2026-10-26T00:00:00+09:00'),video='z8oLq_vcLZU';
phoneDate=function(){return new Date(cutoff)};
// Communication availability follows the frozen story, not the visitor's real hour.
sleepingV23=function(){return false};
contactBlockV23=function(){return ''};
clearTimeout(storyCallTimer);storyStage='finished';
queueIncomingCall=function(){storyStage='finished';persistRealtimeV22()};
const timeLabel=realtimeTimeV22,dateLabel=realtimeDateLabelV22;
realtimeTimeV22=function(ms){return timeLabel(Math.min(ms,cutoff))};
realtimeDateLabelV22=function(ms){return dateLabel(Math.min(ms,cutoff))};
const events=realtimeEventsV22;realtimeEventsV22=function(from,to){return from>=cutoff?[]:events(from,Math.min(to,cutoff)).filter(e=>e.ms<=cutoff)};
const calls=scheduledCallsV37;scheduledCallsV37=function(){return calls().filter(e=>e.ms<=cutoff)};
const advance=advanceRealtimeV22;advanceRealtimeV22=function(now,away){return advance(Math.min(now,cutoff),away)};
const timeline=reconcileTimelineV40;reconcileTimelineV40=function(now=Date.now(),full=false){return timeline(Math.min(now,cutoff),full)};
runFollowupsV25=function(){};
scheduleFollowupV25=function(){};
function clean(){const generated=r=>r[4]>cutoff&&/^(rt22:|concert23:|weekend26:|voice25:|group32:|followup25:)/.test(String(r[3]||''));for(const rows of Object.values(chats))for(let i=rows.length-1;i>=0;i--)if(generated(rows[i]))rows.splice(i,1);bubble=bubble.filter(r=>!generated(r));chatExtrasV25.followups=[];saveChatExtrasV25();saveStore('bubble',bubble);persistRealtimeV22()}
clean();reconcileTimelineV40(cutoff,true);
const entry={id:video,title:'LUCY - Ending Concert Live Clip (@2022 Encore Concert) / ENG sub',channel:0,sub:'LUCY ISLAND · 엔딩 라이브클립'};
const existing=YT_VIDEOS.findIndex(v=>v.id===video);if(existing>=0)YT_VIDEOS.splice(existing,1);YT_VIDEOS.unshift(entry);
let song=SONGS.findIndex(s=>s.id===video);if(song<0){song=SONGS.length;SONGS.push({id:video,title:'Ending',artist:'LUCY',query:'LUCY Ending Concert Live Clip',color:'#748d83'})}
quickSongIndexV44=function(){return song};
currentSong=song;saveStore('selected-song-v29',song);
syncQuickSongV44=function(){const q=overlay.querySelector('.quick-music-v27');if(!q)return;q.setAttribute('aria-label','LUCY Ending 라이브클립 열기');q.innerHTML='<img src="https://i.ytimg.com/vi/'+video+'/hqdefault.jpg" alt="LUCY Ending"><span><small>YouTube Music</small><b>Ending</b><small>LUCY · Concert Live Clip</small></span><strong>▷</strong>';q.onclick=openPinnedMusicV44};
const videoCard=ytVideoCard;ytVideoCard=function(v){if(v.id!==video)return videoCard(v);return '<button class="yt-video" onclick="openYTVideo(\''+video+'\')"><span class="yt-thumbnail"><img src="https://i.ytimg.com/vi/'+video+'/hqdefault.jpg" alt="LUCY Ending 라이브클립" onerror="this.onerror=null;this.src=\'assets/stage.jpg\'"></span><span class="yt-video-info"><span><b>'+esc(v.title)+'</b><small>'+esc(v.sub)+'</small></span></span></button>'};
const yt=renderYouTube;renderYouTube=function(tab='home'){const r=yt(tab);if(tab==='home'){const c=surface.querySelector('.app-content'),card=c?.querySelector('.yt-video');if(card)c.prepend(card)}return r};
const clock=updatePhoneClock;updatePhoneClock=function(...a){const r=clock(...a);const right=document.querySelector('.right-note');if(right){const p=right.querySelector('p');if(p)p.innerHTML='다시 만날 걸 알아<br>그러니 우리 더 빛나자'}return r};
updatePhoneClock();
})();
