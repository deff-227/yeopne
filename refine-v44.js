/* Repair media registration; reload calls become a fixed archive; pin quick music. */
function disableReloadCallV44(){clearTimeout(refreshTimerV29);refreshTimerV29=null;refreshPendingV29=false;refreshScheduledV29=false}
disableReloadCallV44();queueRefreshCallV29=disableReloadCallV44;
const callsBeforeV44=scheduledCallsV37;
scheduledCallsV37=function(){return [...callsBeforeV44(),{id:'story44:23:first-audio',day:23,time:'01:03',ms:Date.parse('2026-10-23T01:03:00+09:00'),title:'첫콘 전날 밤 예찬이에게 온 전화',type:'수신',audioSrc:firstCallAudioV23,seconds:61,lines:[]}].sort((a,b)=>a.ms-b.ms)};
function repairSelfieV44(){
 if(readStore('selfie-repaired-v44',false))return;
 const key='selfie-oct23-v42';if(!PHOTOS.some(p=>p[0]===key))PHOTOS.push([key,'첫콘 끝나고 셀카','10월 23일 오후 11:16']);
 let album=albumsV9.find(a=>a.id==='selfies')||albumsV9.find(a=>a.name==='셀카');if(!album){album={id:'selfies',name:'셀카',photos:[]};albumsV9.push(album)}
 if(!Array.isArray(album.photos))album.photos=[];if(!album.photos.includes(key))album.photos.push(key);
 editsV7.photos=PHOTOS;persistV7();saveAlbumsV9();saveStore('selfie-repaired-v44',true);
}
function quickSongIndexV44(){let index=SONGS.findIndex(song=>song.title==='나는 너야'&&song.artist==='LUCY');if(index<0){index=SONGS.length;SONGS.push({title:'나는 너야',artist:'LUCY',query:'LUCY 나는 너야',color:'#748d83'})}return index}
function openPinnedMusicV44(){const index=quickSongIndexV44();currentSong=index;saveStore('selected-song-v29',index);overlay.innerHTML='';if(!unlocked){beginUnlock('music');return}openApp('music');openPlayer(index)}
function syncQuickSongV44(){const quick=overlay.querySelector('.quick-music-v27');if(!quick)return;quick.setAttribute('aria-label','LUCY 나는 너야 열기');quick.innerHTML='<img src="assets/stage.jpg" alt="LUCY"><span><small>YouTube Music</small><b>나는 너야</b><small>LUCY</small></span><strong>▷</strong>';quick.onclick=openPinnedMusicV44}
const syncTrackBeforeV44=syncTrackV29;
syncTrackV29=function(){syncTrackBeforeV44();syncQuickSongV44()};
const quickBeforeV44=openQuick;
openQuick=function(...args){const result=quickBeforeV44(...args);syncQuickSongV44();return result};
openQuickMusicV27=openPinnedMusicV44;
const settingsBeforeV44=renderSettings;
renderSettings=function(...args){const result=settingsBeforeV44(...args);surface.querySelectorAll('small').forEach(el=>{if(el.textContent.includes('업데이트 버전'))el.textContent='업데이트 버전 2026.10.24 · 44'});return result};
repairSelfieV44();importStoryCallsV37();syncUnreadV39();
