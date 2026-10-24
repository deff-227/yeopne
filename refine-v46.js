/* Exact bundled-line edits only: preserve timestamps and visitor-authored messages. */
const chatLinesV46={
 '알았어 형. 어제 좋았던 거 오늘도 같이 하자':'알았어 형\n어제 좋았잖아 오늘은 더 잘하자',
 '중콘이라고 방심하지 말고 밥부터 먹자 ㅎㅎ':'엽아 밥 먹었어?\n나 이제 먹으려고 ㅎㅎ',
 '응 괜찮아. 형도 손 안 아파? 오늘도 무리하지 말자':'응 괜찮아 형은?\n손 괜찮아?',
 '엽아 일어났어? 목은 좀 괜찮아? 어제 많이 불렀잖아':'엽아 일어났어?\n목은 좀 어때 어제 많이 불렀잖아',
 '엽아 오늘도 수고했어. 어제보다 더 편하게 웃으면서 한 것 같아':'엽아 오늘도 고생했어\n오늘은 좀 덜 떨렸지? ㅎㅎ',
 '형도 수고했어. 오늘 눈 마주칠 때마다 웃음 났다ㅋㅋ':'형도 고생했어\n나 형이랑 눈 마주칠 때마다 웃겨서ㅋㅋ',
 '오늘이 벌써 마지막이네. 엽아 잘 잤어?':'엽아 잘 잤어?\n오늘 벌써 막콘이네',
 '응 형. 아직 끝나지도 않았는데 벌써 아쉽다':'응 형\n나 벌써 아쉬운데 어떡하지ㅋㅋ',
 '우리 오늘도 다치지 말고 재밌게 하자. 끝나고 내가 꼭 안아줄게':'오늘도 재밌게 하자\n끝나면 형이 안아줄게 ㅎㅎ',
 '좋아. 형도 끝까지 내 옆에 있어줘':'좋아 형\n오늘도 옆에서 잘 부탁해',
 '엽아 정말 수고했어. 끝났다는 게 아직 실감이 안 나':'엽아 진짜 고생했어\n나 아직 끝난 것 같지가 않아',
 '나도 그래. 형이랑 같이해서 더 행복했어. 고마워':'나도 그래\n형이랑 같이해서 좋았어 고마워',
 '내일은 알람 끄고 푹 자. 일어나면 같이 밥 먹자':'내일은 알람 끄고 자ㅋㅋ\n일어나면 밥 먹자',
 '응 형. 내일은 내가 맛있는 거 사줄게':'알았어 형\n내일은 내가 살게 먹고 싶은 거 골라놔',
 '엽아 오늘은 연습 때문에 정신없겠다. 나도 이제 들어가. 끝나고 연락하자':'엽아 나 이제 들어가\n연습 끝나고 연락할게',
 '응 형. 나도 준비하러 가야 해. 이따 무대에서 보자':'알았어 형 나도 준비하러 가\n이따 봐',
 '엽아 오늘 진짜 수고했어. 네 목소리 들으면서 나도 너무 좋았어':'엽아 오늘 진짜 고생했어\n너 노래하는 거 옆에서 듣는데 너무 좋더라 ㅎㅎ',
 '형도 수고했어. 오늘 진짜 행복했다. 얼른 쉬고 내일 보자':'형도 고생했어\n오늘 좋았다 내일은 더 잘하자\n얼른 쉬어 형'
};
const naturalChatV46=text=>chatLinesV46[text]||text;
const eventsBeforeV46=realtimeEventsV22;
realtimeEventsV22=function(...args){return eventsBeforeV46(...args).map(event=>event.channel==='bubble'?event:{...event,text:naturalChatV46(event.text)})};
const replyBeforeV46=makeReply;
makeReply=function(...args){return naturalChatV46(replyBeforeV46(...args))};
function reviseChatsV46(){let changed=false;for(const source of [chats,chatBaselineV14])for(const rows of Object.values(source))for(const row of rows){if(String(row[3]||'').startsWith('typed:'))continue;const text=naturalChatV46(row[1]);if(text!==row[1]){row[1]=text;changed=true}}for(const reply of Object.values(realtimeStateV22.pending||{}))reply.text=naturalChatV46(reply.text);if(changed){saveBeforeV14('chat-baseline-v14',chatBaselineV14);persistRealtimeV22()}return changed}
const resetBeforeV46=resetHistoryV38;
resetHistoryV38=function(){resetBeforeV46();reviseChatsV46()};
const settingsBeforeV46=renderSettings;
renderSettings=function(...args){const result=settingsBeforeV46(...args);surface.querySelectorAll('small').forEach(el=>{if(el.textContent.includes('업데이트 버전'))el.textContent='업데이트 버전 2026.10.24 · 46'});return result};
reviseChatsV46();
