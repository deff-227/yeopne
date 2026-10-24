/* Vocal exercises can be shared with context-specific encouragement. */
const practiceRecordingsV43=[{"id": "practice43:1792811131985", "name": "발성연습 01", "date": "10월 24일", "length": "00:46", "src": "assets/practice-v43-1792811131985.mp3", "note": "원본: 1792811131985.mp4", "practiceV43": true}, {"id": "practice43:1792811104823", "name": "발성연습 02", "date": "10월 24일", "length": "01:01", "src": "assets/practice-v43-1792811104823.mp3", "note": "원본: 1792811104823.mp4", "practiceV43": true}, {"id": "practice43:1792811091023", "name": "발성연습 03", "date": "10월 24일", "length": "01:01", "src": "assets/practice-v43-1792811091023.mp3", "note": "원본: 1792811091023.mp4", "practiceV43": true}, {"id": "practice43:1792811081374", "name": "목풀기 01", "date": "10월 24일", "length": "01:01", "src": "assets/practice-v43-1792811081374.mp3", "note": "원본: 1792811081374.mp4", "practiceV43": true}, {"id": "practice43:1792810944990", "name": "목풀기 02", "date": "10월 24일", "length": "01:01", "src": "assets/practice-v43-1792810944990.mp3", "note": "원본: 1792810944990.mp4", "practiceV43": true}, {"id": "practice43:1792810879983", "name": "목풀기 03", "date": "10월 24일", "length": "01:01", "src": "assets/practice-v43-1792810879983.mp3", "note": "원본: 1792810879983.mp4", "practiceV43": true}];
function importPracticeV43(){if(readStore('practice-import-v43',false))return;for(const record of practiceRecordingsV43)if(!RECORDINGS.some(r=>r.id===record.id||r.src===record.src))RECORDINGS.push({...record});editsV7.recordings=RECORDINGS;persistV7();saveStore('practice-import-v43',true)}
const replyBeforeV43=makeReply;
makeReply=function(id,text){const record=id==='yechan'?sharedRecordingV24(text):null;if(record?.practiceV43||practiceRecordingsV43.some(r=>r.id===record?.id))return pickReplyV25(id,'practice43',[
 '연습 중이야? ㅎㅎ 파이팅 엽아 오늘 진짜 기대된다',
 '목 풀고 있었구나 ㅎㅎ 벌써 듣고 싶다. 무리하지 말고 이따 보자',
 '엽아 파이팅 ㅎㅎ 오늘도 네 옆에서 들을 생각하니까 좋다',
 '열심히 하고 있네 ㅎㅎ 물도 마시면서 해. 오늘 무대 기대할게',
 '지금도 좋은데 무대에서는 얼마나 더 좋으려고ㅋㅋ 이따 같이 재밌게 하자'
 ]);return replyBeforeV43(id,text)};
importPracticeV43();
