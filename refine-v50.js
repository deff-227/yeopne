/* October 24 LUCY group-chat cleanup (Sangyeop's phone only). */
(() => {
  'use strict';
  const unwantedMinuteV50 = Date.parse('2026-10-24T02:27:00+09:00');
  const rehearsalV50 = [
    ['16:10','wonsang','오늘 리허설 좋았다ㅋㅋ 합도 잘 맞았고'],
    ['16:11','gwangil','ㅇㅇ 어제보다 훨씬 편한 듯'],
    ['16:12','yechan','그치 ㅎㅎ 오늘도 재밌게 해보자'],
    ['16:13','self','오늘 공연도 힘내자. 다들 이따 봐'],
    ['16:14','wonsang','오케이ㅋㅋ 무대에서 보자']
  ];
  const isRetiredV50 = row => Array.isArray(row) &&
    Number.isFinite(row[4]) && row[4] >= unwantedMinuteV50 &&
    row[4] < unwantedMinuteV50 + 60000 &&
    !String(row[3] || '').startsWith('typed:');

  function removeTwoV50(rows) {
    if (!Array.isArray(rows)) return false;
    let removed = 0;
    for (let i = 0; i < rows.length && removed < 2;) {
      if (isRetiredV50(rows[i])) {rows.splice(i, 1);removed++;}
      else i++;
    }
    return removed > 0;
  }
  function updateGroupV50() {
    if (!Array.isArray(chats.group)) chats.group = [];
    const rows = chats.group;
    let changed = removeTwoV50(rows);
    let baselineChanged = false;
    if (typeof chatBaselineV14 !== 'undefined' && Array.isArray(chatBaselineV14?.group)) {
      baselineChanged = removeTwoV50(chatBaselineV14.group);
    }
    const now = Date.now();
    for (const [clock,speaker,content] of rehearsalV50) {
      const id = 'group50:20261024:' + clock;
      const ms = Date.parse('2026-10-24T' + clock + ':00+09:00');
      if (ms > now || rows.some(row => row[3] === id)) continue;
      rows.push([speaker === 'self' ? 1 : 0,content,realtimeTimeV22(ms),id,ms,speaker]);
      changed = true;
    }
    if (changed) {
      rows.sort((a,b) => (a[4] || 0) - (b[4] || 0));
      saveStore('chats',chats);
    }
    if (baselineChanged && typeof saveBeforeV14 === 'function')
      saveBeforeV14('chat-baseline-v14',chatBaselineV14);
    return changed;
  }
  const previousRenderChatV50 = renderChat;
  renderChat = function (...args) {
    if (activeChat === 'group') updateGroupV50();
    return previousRenderChatV50(...args);
  };
  const previousImportV50 = importPostsV32;
  importPostsV32 = function (...args) {
    const result = previousImportV50(...args);
    updateGroupV50();
    return result;
  };
  const previousResetV50 = resetHistoryV38;
  resetHistoryV38 = function (...args) {
    const result = previousResetV50(...args);
    updateGroupV50();
    return result;
  };
  updateGroupV50();
})();
