/* Targeted fixes: group-chat sender labels and one removed Bubble post. */
(() => {
  const removedBubbleTextV49 = '둘째 날도 정말 즐거웠다. 덕분에 힘 많이 받았어요. 내일 마지막까지 같이 놀자';
  const removedBubbleIdV49 = 'weekend26:24:21:30:bubble';

  // Group events created in v32 store the speaker separately from the message.
  // Never interpret an entire message as its sender's name.
  const previousMsgHTMLV49 = msgHTML;
  msgHTML = function (row, id) {
    const html = previousMsgHTMLV49(row, id);
    if (id !== 'group' || row[0] || !row[5]) return html;
    const speaker = {yechan:'신예찬', wonsang:'조원상', gwangil:'신광일'}[row[5]]
      || CONTACTS[row[5]]?.short || CONTACTS[row[5]]?.name;
    if (!speaker) return html;
    return html.replace(
      /(<div class="sender-name">)[\s\S]*?(<\/div>)/,
      (_, opening, closing) => opening + esc(speaker) + closing
    );
  };

  // A previously generated message survives in browser-local storage even
  // after its original scheduled entry has been removed.
  const isRemovedBubbleV49 = row => Array.isArray(row) &&
    (row[3] === removedBubbleIdV49 || row[1] === removedBubbleTextV49);
  function scrubRemovedBubbleV49() {
    const oldLength = bubble.length;
    bubble = bubble.filter(row => !isRemovedBubbleV49(row));
    if (bubble.length !== oldLength) saveStore('bubble', bubble);
    const configured = readStore('configured-baseline-v39', null);
    if (configured && Array.isArray(configured.bubble)) {
      const clean = configured.bubble.filter(row => !isRemovedBubbleV49(row));
      if (clean.length !== configured.bubble.length) {
        configured.bubble = clean;
        saveStore('configured-baseline-v39', configured);
      }
    }
  }

  const eventsBeforeV49 = realtimeEventsV22;
  realtimeEventsV22 = function (...args) {
    return eventsBeforeV49(...args).filter(event =>
      !(event.channel === 'bubble' &&
        (event.id === removedBubbleIdV49 || event.text === removedBubbleTextV49)));
  };
  const renderBubbleBeforeV49 = renderBubble;
  renderBubble = function (...args) {
    scrubRemovedBubbleV49();
    return renderBubbleBeforeV49(...args);
  };
  const resetBeforeV49 = resetHistoryV38;
  resetHistoryV38 = function (...args) {
    const result = resetBeforeV49(...args);
    scrubRemovedBubbleV49();
    return result;
  };
  scrubRemovedBubbleV49();
})();
