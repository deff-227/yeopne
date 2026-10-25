/* Preserve October 24's note; feature the October 25 letter. */
(()=>{
const body="안녕하세요 상엽이에요\n생각해 보면 우리가 함께 만들어 온 순간들에는 참 많은 꽃이 피어 있었던 것 같아요.\n작은 씨앗이 발아해 꽃을 개화하듯 우리의 음악도 여러분과 함께 자라나고, 여러분의 일상 곳곳에 예쁜 꽃처럼 피어났으면 좋겠습니다.\n그리고 그 꽃잎들이 모여 우리만의 아름다운 반딧불이 같은 계절을 만들어 갔으면 좋겠어요.\n앞으로 함께할 날들이 더 기대돼요.\n아직 들려드리고 싶은 노래도 많고, 여러분과 함께하고 싶은 순간도 많거든요.\n저희의 음악을 사랑해 주셔서 감사합니다.\n앞으로도 우리 함께 파랗게 피어나요.\n사랑합니다.",id='letter52:20261025';
function ensure(){let i=notes.findIndex(n=>n.id===id);if(i<0){notes.push({id,title:'왈왈이들에게 · 막콘',body,date:'10월 25일'});saveStore('notes',notes);i=notes.length-1}return i}
letterIndexV48=function(){return notes.findIndex(n=>n.id===id)};
ensureLetterV48=ensure;
const previousPaint=paintLetterV48;
paintLetterV48=function(){previousPaint();const label=document.querySelector('.letter-widget-v48 header small');if(label)label.textContent='10월 25일 · 막콘을 마치고'};
ensure();
if(typeof screen!=='undefined'&&screen==='home')paintLetterV48();
})();
