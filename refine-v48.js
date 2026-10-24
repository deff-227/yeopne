/* Fourth home page: editable, persistent letter widget. */
const letterBodyV48=`안녕하세요 상엽이에요
오늘 이렇게 왈왈이들 앞에 서서 노래하고 나면.
한 가지는 확실하게 알 게 될 것 같아요
여러분은 제가 음악을 계속할 수 있게 해주는 아주 커다란 이유라는 걸요
여러분의 모든 날이 행복할 수는 없겠지만 그 중에 저희의 음악이 함께하는 날만큼은 조금 더 행복했으면 좋겠어요
저희를 좋아해주고 저희 음악이 여러분의 삶에 함께할 수 있게 해줘서 고맙습니다
우리 앞으로도 오래 만나요 사랑합니다`;
function letterIndexV48(){return notes.findIndex(n=>n.id==='letter48:walwal')}
function ensureLetterV48(){let i=letterIndexV48();if(i<0){notes.push({id:'letter48:walwal',title:'왈왈이들에게',body:letterBodyV48,date:'10월 24일'});saveStore('notes',notes);i=notes.length-1}return i}
function openLetterV48(){const i=ensureLetterV48();openApp('notes');openNote(i)}
function paintLetterV48(){const widget=document.querySelector('.letter-widget-v48');if(!widget)return;const note=notes[ensureLetterV48()];widget.querySelector('h3').textContent=note.title;widget.querySelector('.letter-body-v48').textContent=note.body}
setHomePage=function(i){homePage=Math.max(0,Math.min(3,Number.isFinite(i)?i:0));const slider=$('.home-carousel');slider?.scrollTo({left:homePage*slider.clientWidth,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});paintHomeDots()};
paintHomeDots=function(){document.querySelectorAll('.home .dots button').forEach((b,i)=>{b.classList.toggle('active',i===homePage);b.setAttribute('aria-current',i===homePage?'page':'false')});const wallpaper=$('.wallpaper');if(wallpaper)wallpaper.style.backgroundPosition=`${25+homePage*25}% center`};
let homeResizeV48=null;
const homeBeforeV48=goHome;
goHome=function(...args){
 homeResizeV48?.disconnect();const result=homeBeforeV48(...args);if(!unlocked||screen!=='home')return result;
 const slider=$('.home-carousel');if(!slider)return result;
 const page=document.createElement('section');page.className='home-page page-letter-v48';page.setAttribute('aria-label','홈 화면 4 · 왈왈이들에게');
 page.innerHTML='<article class="letter-widget-v48"><header><span class="letter-icon-v48">'+icon('notes')+'</span><span>Samsung Notes<small>10월 24일 · 중콘을 마치고</small></span></header><h3></h3><div class="letter-body-v48" tabindex="0" aria-label="왈왈이들에게 편지 내용"></div><footer><span>상엽이가</span><button onclick="openLetterV48()" aria-label="편지 열기 및 수정">편지 열기 ↗</button></footer></article>';
 slider.appendChild(page);paintLetterV48();const dots=$('.home .dots');dots.innerHTML=[0,1,2,3].map(i=>`<button aria-label="홈 화면 ${i+1}" onclick="setHomePage(${i})">●</button>`).join('');paintHomeDots();
 dots.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();setHomePage(homePage+(e.key==='ArrowRight'?1:-1));dots.children[homePage]?.focus()}});
 if(typeof ResizeObserver!=='undefined'){let width=slider.clientWidth;homeResizeV48=new ResizeObserver(()=>{if(slider.clientWidth!==width){width=slider.clientWidth;slider.scrollTo({left:homePage*width,behavior:'instant'})}});homeResizeV48.observe(slider)}return result;
};
const styleV48=document.createElement('style');styleV48.textContent=`.page-letter-v48{display:flex;align-items:stretch;padding:16px 5px 10px!important}.letter-widget-v48{display:flex;flex-direction:column;width:100%;min-height:0;padding:23px 22px 16px;border-radius:25px;background:#fffaf0f5;color:#493e33;box-shadow:0 5px 18px #18251b18;text-align:left}.letter-widget-v48 header{display:flex;align-items:center;gap:9px;font-size:11px;font-weight:600;color:#7b6b58}.letter-widget-v48 header small{display:block;font-size:9px;font-weight:400;margin-top:4px;color:#998b7c}.letter-icon-v48{display:grid;place-items:center;background:#f4e2c2;border-radius:10px;width:32px;height:32px}.letter-icon-v48 svg{width:19px;height:19px}.letter-widget-v48 h3{font-size:23px;letter-spacing:-.8px;font-weight:650;margin:23px 0 17px}.letter-body-v48{flex:1;min-height:0;overflow-y:auto;scrollbar-width:none;white-space:pre-wrap;word-break:keep-all;overflow-wrap:anywhere;font-size:12px;line-height:1.95;letter-spacing:-.2px;overscroll-behavior-y:contain}.letter-body-v48::-webkit-scrollbar{display:none}.letter-widget-v48 footer{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:15px;margin-top:12px;border-top:1px solid #e7dccb;font-size:11px;color:#88745d;flex-shrink:0}.letter-widget-v48 footer button{font-size:11px;color:#776048;padding:8px 10px;background:#f1e6d5;border-radius:10px}.letter-widget-v48 :focus-visible{outline:2px solid #b6976b;outline-offset:3px}.home .dots button{min-width:22px;min-height:24px}.home .dots{gap:0;padding:3px 0 5px}.folded-open .letter-widget-v48{max-width:580px;margin-inline:auto}.folded-open .letter-body-v48{font-size:14px}`;document.head.appendChild(styleV48);
const settingsBeforeV48=renderSettings;
renderSettings=function(...args){const result=settingsBeforeV48(...args);surface.querySelectorAll('small').forEach(el=>{if(el.textContent.includes('업데이트 버전'))el.textContent='업데이트 버전 2026.10.24 · 48'});return result};
ensureLetterV48();
