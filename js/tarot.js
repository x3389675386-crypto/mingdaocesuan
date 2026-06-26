/**
 * 明道测算 - 塔罗牌占卜模块
 * 大阿卡纳抽牌、翻牌动画与解读
 */

let currentSpread = 1; // 默认单张牌
let tarotDrawn = [];

// 选择牌阵
function selectSpread(el, count) {
  document.querySelectorAll('.spread-option').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
  currentSpread = count;
}

// 塔罗牌占卜符号
const TAROT_SYMBOLS = ['★', '☽', '☀', '☿', '♀', '♂', '♃', '♄', '♅', '♆', '♇', '✦', '✧', '⋆', '◈', '⬡', '△', '♢', '♤', '♧', '♡', '♢'];

// 绘制塔罗卡牌
function drawTarot() {
  const question = document.getElementById('tarot-question').value.trim();
  const cardsContainer = document.getElementById('tarot-cards');
  const resultDiv = document.getElementById('tarot-result');
  resultDiv.style.display = 'none';

  // 随机抽取卡牌
  const deck = [...TAROT_MAJOR_ARCANA];
  tarotDrawn = [];
  for (let i = 0; i < currentSpread; i++) {
    const idx = Math.floor(Math.random() * deck.length);
    const card = deck.splice(idx, 1)[0];
    const isReversed = Math.random() < 0.3; // 30%概率逆位
    tarotDrawn.push({ ...card, isReversed });
  }

  // 显示卡牌（背面朝上）
  cardsContainer.innerHTML = '';
  tarotDrawn.forEach((card, index) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'tarot-card';
    cardEl.style.animationDelay = `${index * 0.15}s`;
    cardEl.style.animation = 'cardEntrance 0.5s ease forwards';

    cardEl.innerHTML = `
      <div class="tarot-card-inner">
        <div class="tarot-card-back">
          <div style="position:relative;z-index:1">
            <div style="font-size:0.7rem;margin-bottom:4px">TAROT</div>
            ${TAROT_SYMBOLS[card.num]}
          </div>
        </div>
        <div class="tarot-card-front">
          <div class="card-num">${card.num}</div>
          <div class="card-name">${card.name}</div>
          <div class="card-symbol">${TAROT_SYMBOLS[card.num]}</div>
          <div class="card-keywords">${card.keywords}</div>
          <div class="card-position ${card.isReversed ? 'reversed' : 'upright'}">
            ${card.isReversed ? '逆位' : '正位'}
          </div>
        </div>
      </div>
    `;

    cardEl.addEventListener('click', () => {
      cardEl.classList.toggle('flipped');
      // 所有牌翻开后显示解读
      setTimeout(() => {
        const allFlipped = document.querySelectorAll('.tarot-card.flipped');
        if (allFlipped.length === tarotDrawn.length) {
          showTarotResult(question);
        }
      }, 600);
    });

    cardsContainer.appendChild(cardEl);
  });

  cardsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// 显示塔罗解读
function showTarotResult(question) {
  const resultDiv = document.getElementById('tarot-result');
  resultDiv.style.display = 'block';

  let html = '';

  if (question) {
    html += `<div class="bazi-summary" style="border-left-color:var(--color-jade);margin-bottom:1rem">
      <h4 style="color:var(--color-jade)">你的问题</h4>
      <p>${question}</p>
    </div>`;
  }

  tarotDrawn.forEach((card, index) => {
    const positionLabel = currentSpread === 3
      ? ['过去', '现在', '未来'][index]
      : '启示';

    html += `<div class="bazi-summary" style="margin-bottom:1rem;border-left-color:${card.isReversed ? 'var(--color-red)' : 'var(--color-gold)'}">`;
    html += `<h4 style="color:${card.isReversed ? 'var(--color-red)' : 'var(--color-gold)'}">`;

    if (currentSpread === 3) {
      html += `${positionLabel} · `;
    }

    html += `${card.name} ${card.isReversed ? '（逆位）' : '（正位）'}</h4>`;
    html += `<p style="font-size:0.8rem;color:var(--color-ink-light);margin-bottom:0.5rem">
      元素：${card.element} | 对应：${card.planet}
    </p>`;
    html += `<p style="font-size:0.9rem;line-height:1.8">`;
    html += card.isReversed ? card.reversed : card.upright;
    html += `</p>`;
    html += `</div>`;
  });

  // 综合解读
  if (currentSpread === 3) {
    html += `<div class="bazi-summary">
      <h4>综合解读</h4>
      <p>过去(${tarotDrawn[0].name}) → 现在(${tarotDrawn[1].name}) → 未来(${tarotDrawn[2].name})</p>
      <p style="font-size:0.85rem;color:var(--color-ink-light);margin-top:0.5rem">
        三张牌的流动显示了事态的发展脉络。请参考每张牌的具体解读，结合你的实际情况进行思考。
      </p>
    </div>`;
  }

  html += '<p style="text-align:center;font-size:0.75rem;color:var(--color-ink-light);margin-top:0.5rem">塔罗牌仅供娱乐参考，命运掌握在自己手中 🌟</p>';

  resultDiv.innerHTML = html;
  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
