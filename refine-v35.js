/* Explicit app-entry dates and compact home schedule. */
function currentDateKeyV35(){const d=phoneDate();return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`}
function selectTodayV35(){const d=phoneDate();calendarMonth=d.getMonth()+1;selectedDay=d.getDate()}
const openBeforeV35=openApp;
openApp=function(id,...args){if(id==='calendar')selectTodayV35();return openBeforeV35(id,...args)};
const calendarBeforeV35=renderCalendar;
renderCalendar=function(day){
 if(day===undefined&&screen!=='calendar')selectTodayV35();
 const result=calendarBeforeV35(day===undefined?selectedDay:day),d=phoneDate();
 surface.querySelectorAll('.cal-day').forEach(el=>{el.classList.remove('actual-today-v35');if(calendarMonth===d.getMonth()+1&&el.getAttribute('aria-label')===`${calendarMonth}월 ${d.getDate()}일`)el.classList.add('actual-today-v35')});
 const today=surface.querySelector('.cal-today');if(today){today.title='오늘로 이동';today.setAttribute('aria-label','오늘 날짜로 이동');today.textContent=d.getDate();today.onclick=()=>{selectTodayV35();renderCalendar(selectedDay)}}
 return result;
};
const monthBeforeV35=changeCalendarMonth;
changeCalendarMonth=function(delta){const result=monthBeforeV35(delta);const d=phoneDate();if(calendarMonth===d.getMonth()+1){selectedDay=d.getDate();renderCalendar(selectedDay)}return result};
function weatherDateV35(){
 const d=phoneDate(),label=`${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일 ${realtimeDaysV22[d.getDay()]}`;
 const toolbar=surface.querySelector('.weather-toolbar-v8');if(toolbar){let date=surface.querySelector('#weatherDateV35');if(!date){date=document.createElement('div');date.id='weatherDateV35';date.className='weather-date-v35';toolbar.insertAdjacentElement('afterend',date)}date.textContent=label+' · '+phoneTime()}
 const footer=surface.querySelector('.weather-footer-v8');if(footer)footer.textContent=label+' · 서울특별시';
 surface.querySelectorAll('.weather-day-v8>span:first-child').forEach((el,i)=>{const t=new Date(d);t.setDate(d.getDate()+i);el.textContent=(i===0?'오늘':realtimeDaysV22[t.getDay()].slice(0,1))+` ${t.getMonth()+1}.${t.getDate()}`});
}
const weatherBeforeV35=renderWeather;
renderWeather=function(...args){const result=weatherBeforeV35(...args);syncDateSurfacesV34();weatherDateV35();return result};
// Refresh dates across midnight without taking away a manually selected calendar date.
let lastDateV35=currentDateKeyV35();
const clockBeforeV35=updatePhoneClock;
updatePhoneClock=function(...args){const result=clockBeforeV35(...args);if(screen==='weather')weatherDateV35();const date=currentDateKeyV35();if(date!==lastDateV35){lastDateV35=date;if(screen==='calendar'){selectTodayV35();renderCalendar(selectedDay)}syncCalendarIconV34()}return result};
// Refresh notification timestamp while its panel remains open.
const quickBeforeV35=openQuick;
openQuick=function(...args){const result=quickBeforeV35(...args);const panel=overlay.querySelector('.quick-panel');if(panel)panel.setAttribute('aria-label','알림 및 빠른 설정');return result};
const cssV35=document.createElement('style');cssV35.textContent=`
.home .schedule-widget,.device.compact .home .schedule-widget,.folded-open .home .schedule-widget{box-sizing:border-box;min-width:0;padding:7px 9px!important;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:3px;overflow:hidden;font-size:9px!important;line-height:1.15;text-align:left}
.home .schedule-widget b,.device.compact .home .schedule-widget b,.folded-open .home .schedule-widget b{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;max-width:100%;font-size:10px!important;font-weight:600;line-height:1.2;margin:0!important;overflow-wrap:anywhere}
.home .schedule-widget>span{display:block;max-width:100%;font-size:8px!important;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex-shrink:0}
.weather-date-v35{font-size:11px;opacity:.78;padding:0 22px 8px;text-align:left}.weather-day-v8>span:first-child{min-width:62px;font-size:11px}.actual-today-v35 .cal-number{box-shadow:0 0 0 1px #7c9a7a;border-radius:50%}.cal-today{font-variant-numeric:tabular-nums}
@media(max-width:700px){.home .schedule-widget,.folded-open .home .schedule-widget{padding:5px 7px!important;gap:2px;font-size:8px!important}.home .schedule-widget b,.folded-open .home .schedule-widget b{font-size:9px!important;line-height:1.15}.home .schedule-widget>span{font-size:7px!important}}
`;document.head.appendChild(cssV35);
syncDateSurfacesV34();if(screen==='weather')weatherDateV35();
