/* October 26, 00:00 finale alignment; preserve the existing UI and shared chat. */
(() => {
  'use strict';
  const finaleTimeV51 = Date.parse('2026-10-26T00:00:00+09:00');
  phoneDate = () => new Date(finaleTimeV51);
  phoneTime = () => '오전 12:00';

  const clockBeforeV51 = updatePhoneClock;
  updatePhoneClock = function (...args) {
    const result = clockBeforeV51(...args);
    const status = document.querySelector('#statusbar > span');
    if (status) status.innerHTML = '00:00 <span class="tiny-notice">▣</span>';
    const lockClock = document.querySelector('.lock-time');
    if (lockClock) lockClock.innerHTML = '<span>00</span><span>00</span>';
    const underDate = document.querySelector('.under-device > span:nth-child(2)');
    if (underDate) underDate.textContent = '10월 26일 월요일';
    const underTime = document.querySelector('.under-device > span:last-child');
    if (underTime) underTime.textContent = '00:00';
    document.querySelectorAll('.lock-date').forEach(el => { el.textContent = '10월 26일 월요일'; });
    const note = document.querySelector('.right-note > p');
    if (note) note.innerHTML = '그러니 우리 더 빛나자<br>이 순간이 영원할 것처럼';
    return result;
  };

  updatePhoneClock();
})();
