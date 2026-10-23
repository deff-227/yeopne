/* Current-day surfaces follow the calendar; historical conversations retain their dates. */
function concertLabelV34(date=phoneDate()){
 if(date.getFullYear()!==2026||date.getMonth()!==9)return '';
 return ({23:'첫콘',24:'중콘',25:'막콘'})[date.getDate()]||'';
}
concertDDayV30=function(){
 const group=surface.querySelector('.lock-clock-group'),label=concertLabelV34();let badge=surface.querySelector('#concertDDayV30');
 if(!label){badge?.remove();return}if(!group)return;
 if(!badge){badge=document.createElement('div');badge.id='concertDDayV30';badge.className='concert-dday-v30';group.appendChild(badge)}
 badge.textContent=label==='첫콘'?'콘서트 D-DAY':label+' D-DAY';
};
function syncDateSurfacesV34(){
 const d=phoneDate(),label=concertLabelV34(),day=d.getDate(),week=realtimeDaysV22[d.getDay()];
 const right=document.querySelector('.right-note>span');if(right)right.textContent=`${String(d.getMonth()+1).padStart(2,'0')}/${String(day).padStart(2,'0')} ${d.getFullYear()}`;
 const dateWidget=surface.querySelector('.date-widget');if(dateWidget)dateWidget.innerHTML=esc(`${d.getMonth()+1}월 ${day}일 ${week}`)+`<b>${label?esc('오늘은 '+label):'오늘도 좋은 하루'}</b>`;
 const schedule=surface.querySelector('.schedule-widget');if(schedule&&label){const w=concertWindowV26(d.getTime());schedule.innerHTML=`오늘의 일정<b>LUCY CONCERT · ${label}</b><span style="font-size:8px;opacity:.7">${String(Math.floor(w.start)).padStart(2,'0')}:${String(Math.round((w.start%1)*60)).padStart(2,'0')} 공연 시작</span>`}
 const footer=surface.querySelector('.weather-footer-v8');if(footer)footer.textContent=`${d.getMonth()+1}월 ${day}일 ${week} · 서울특별시`;
 surface.querySelectorAll('.weather-hour-v8>span:first-child').forEach((el,i)=>{const t=new Date(d.getTime()+i*3600000);el.textContent=i===0?'지금':`${String(t.getHours()).padStart(2,'0')}시`;el.title=`${t.getMonth()+1}월 ${t.getDate()}일`});
 surface.querySelectorAll('.weather-day-v8>span:first-child').forEach((el,i)=>{const t=new Date(d);t.setDate(day+i);el.textContent=i===0?'오늘':realtimeDaysV22[t.getDay()].slice(0,1);el.title=`${t.getMonth()+1}월 ${t.getDate()}일`});
 // Day/night icon follows the hour; weather measurements remain the existing site data.
 const night=d.getHours()<7||d.getHours()>=18;
 const moon=surface.querySelector('.weather-widget .weather-moon');if(moon)moon.textContent=night?'☾':'☀';
 const hero=surface.querySelector('.weather-hero-v8>svg');if(hero){const holder=document.createElement('div');holder.innerHTML=weatherSymbolV8(night?'moon':'sun');hero.replaceWith(holder.firstElementChild)}
 concertDDayV30();
}
const surfaceBeforeV34=setSurface;
setSurface=function(html,opts){const result=surfaceBeforeV34(html,opts);syncDateSurfacesV34();return result};
const clockBeforeV34=updatePhoneClock;
updatePhoneClock=function(...args){const result=clockBeforeV34(...args);syncDateSurfacesV34();return result};
const iconBeforeV34=appIcon;
appIcon=function(id){if(id!=='calendar')return iconBeforeV34(id);const d=phoneDate();return `<span class="calendar-live-v34"><small>${realtimeDaysV22[d.getDay()]}</small><b>${d.getDate()}</b></span>`};
// The home icon also updates if the page stays open overnight.
let calendarStampV34='';
function syncCalendarIconV34(){const d=phoneDate(),key=`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;if(key===calendarStampV34)return;calendarStampV34=key;document.querySelectorAll('.app-icon.calendar').forEach(el=>el.innerHTML=appIcon('calendar'))}
const replyBeforeV34=makeReply;
makeReply=function(id,text){const n=normalizeText(text).replace(/\s/g,''),label=concertLabelV34();if(id==='yechan'&&['중콘','막콘'].includes(label)&&/오늘.*콘서트|오늘.*중콘|오늘.*막콘|중콘.*기대|막콘.*기대/.test(n))return pickReplyV25(id,'concert34:'+label,label==='중콘'?['오늘은 중콘이네 ㅎㅎ 어제도 좋았는데 오늘은 더 재밌게 해보자. 내 옆에 딱 붙어 있어','나 벌써 기대돼ㅋㅋ 오늘도 나 보고 웃어줘 엽아. 나도 계속 보고 있을게','어제 같이 무대 해서 너무 좋았어. 오늘도 우리 다치지 말고 재밌게 하자 ㅎㅎ']:['벌써 막콘이라니 아쉽다아. 오늘은 더 많이 눈 마주치자 엽아','오늘도 네 옆에서 열심히 켤게 ㅎㅎ 끝나고 내가 꼭 안아줄게','우리 마지막까지 재밌게 하자. 엽이랑 같이해서 좋다']);return replyBeforeV34(id,text)};
const cssV34=document.createElement('style');cssV34.textContent='.calendar-live-v34{display:flex;width:100%;height:100%;flex-direction:column;align-items:center;justify-content:center;background:#fff;border-radius:23%;overflow:hidden;color:#222;box-sizing:border-box}.calendar-live-v34 small{font-size:9px;line-height:16px;color:#ee6767}.calendar-live-v34 b{font-size:26px;line-height:29px;font-weight:500}';document.head.appendChild(cssV34);
syncDateSurfacesV34();syncCalendarIconV34();setInterval(syncCalendarIconV34,30000);
