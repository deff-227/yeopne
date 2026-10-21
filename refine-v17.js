/* Gentle notification sounds and vibration for the interactive phone story. */
const noticeAudioV17={context:null,enabled:true};
function primeNoticeAudioV17(){try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;noticeAudioV17.context??=new C();if(noticeAudioV17.context.state==='suspended')noticeAudioV17.context.resume()}catch{}}
function playNoticeToneV17(kind='message'){
 if(!soundOn)return;
 try{primeNoticeAudioV17();const c=noticeAudioV17.context;if(!c||c.state!=='running')return;const now=c.currentTime;const notes=kind==='call'?[[659,0],[784,.2],[988,.4]]:[[880,0],[1175,.12]];
 for(const [hz,delay] of notes){const osc=c.createOscillator(),gain=c.createGain();osc.type='sine';osc.frequency.setValueAtTime(hz,now+delay);gain.gain.setValueAtTime(.0001,now+delay);gain.gain.exponentialRampToValueAtTime(kind==='call'?.055:.035,now+delay+.018);gain.gain.exponentialRampToValueAtTime(.0001,now+delay+(kind==='call'?.18:.13));osc.connect(gain);gain.connect(c.destination);osc.start(now+delay);osc.stop(now+delay+(kind==='call'?.2:.15))}
 }catch{}
}
function vibrateNoticeV17(kind='message'){
 if(!soundOn||!navigator.vibrate)return;
 try{navigator.vibrate(kind==='call'?[180,100,180,450]:[70,45,70])}catch{}
}
const receiveBannerBeforeV17=receiveBanner;
receiveBanner=function(id,text){if(id==='yechan'){playNoticeToneV17('message');vibrateNoticeV17('message')}return receiveBannerBeforeV17(id,text)};
const ringToneBeforeV17=ringTone;
ringTone=function(){playNoticeToneV17('call');vibrateNoticeV17('call')};
/* Browsers allow audio only after a real user gesture. The site already primes
   call audio on interaction; this also covers Kakao alerts and mobile Safari. */
document.addEventListener('pointerdown',primeNoticeAudioV17,{passive:true});
document.addEventListener('keydown',primeNoticeAudioV17);
