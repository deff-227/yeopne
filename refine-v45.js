/* Stability pass for persistent media identity, baseline posts and outdated controls. */
quickSongIndexV44();
const selectedIndexV45=Number(readStore('selected-song-v29',-1));if(Number.isInteger(selectedIndexV45)&&SONGS[selectedIndexV45])currentSong=selectedIndexV45;
// Avoid rebuilding an unchanged media card during clock/UI refreshes.
syncQuickSongV44=function(){const quick=overlay.querySelector('.quick-music-v27');if(!quick)return;if(quick.getAttribute('aria-label')!=='LUCY 나는 너야 열기'||quick.querySelector('b')?.textContent!=='나는 너야'){quick.setAttribute('aria-label','LUCY 나는 너야 열기');quick.innerHTML='<img src="assets/stage.jpg" alt="LUCY"><span><small>YouTube Music</small><b>나는 너야</b><small>LUCY</small></span><strong>▷</strong>'}quick.onclick=openPinnedMusicV44};
const settingsBeforeV45=renderSettings;
renderSettings=function(...args){const result=settingsBeforeV45(...args);surface.querySelectorAll('[onclick*="restartStoryV15"]').forEach(button=>button.closest('.section-card')?.remove());surface.querySelectorAll('small').forEach(el=>{if(el.textContent.includes('업데이트 버전'))el.textContent='업데이트 버전 2026.10.24 · 45'});return result};
showHelp=function(){showInfo('상엽의 Galaxy Z Fold7','PIN은 0613이다.\n\n휴대폰 시계는 현실 시간을 따른다. 정해진 카톡과 통화는 해당 시각이 지나면 원래 날짜와 시각으로 기록에 남는다. 전화 앱에서 지난 통화의 음성과 대사를 다시 확인할 수 있다. 새로고침으로 전화가 다시 오지는 않는다.\n\n사용 기록 리셋은 직접 보낸 메시지와 통화 기록을 지우며, 편집한 기본 내용과 정해진 사건은 유지한다. 설정에서 백업과 복원이 가능하다.\n\n갤러리의 셀카·신예찬 앨범, 음성녹음의 예찬이에게 보내기 기능을 이용할 수 있다.')};
// Previously saved baselines may contain anonymous copies of scheduled bubble posts.
function cleanScheduledBaselineV45(){const configured=readStore('configured-baseline-v39',null);if(!Array.isArray(configured?.bubble))return;const scheduled=new Set([...bubblePostsV32.map(row=>row[2]),...bubblePostsV42.map(row=>row[1]),...screenshotBubbleV28.map(row=>row[2])]);const filtered=configured.bubble.filter(row=>!(scheduled.has(row[1])&&bubble.some(post=>post[3]&&post[1]===row[1]&&post[2]===row[2])));if(filtered.length!==configured.bubble.length){configured.bubble=filtered;saveStore('configured-baseline-v39',configured)}}
cleanScheduledBaselineV45();
