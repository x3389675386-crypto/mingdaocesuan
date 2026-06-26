/**
 * 明道测算 - 六爻占卜模块
 * 铜钱起卦法生成六爻，解读64卦
 */

// ============ 铜钱起卦 ============
// 三枚铜钱：正面(字)=2, 反面(花)=3, 总和6/7/8/9
// 6=老阴(变爻)⚋×, 7=少阳⚊, 8=少阴⚋, 9=老阳(变爻)⚊○
function tossCoins() {
  const coins = [];
  for (let i = 0; i < 3; i++) {
    coins.push(Math.random() < 0.5 ? 2 : 3);
  }
  return coins.reduce((a, b) => a + b, 0);
}

function getYaoType(value) {
  switch (value) {
    case 6: return { type: 'yin', changing: true, symbol: '⚋', changingSymbol: '⚋×', label: '老阴(变爻)' };
    case 7: return { type: 'yang', changing: false, symbol: '⚊', changingSymbol: '⚊', label: '少阳' };
    case 8: return { type: 'yin', changing: false, symbol: '⚋', changingSymbol: '⚋', label: '少阴' };
    case 9: return { type: 'yang', changing: true, symbol: '⚊', changingSymbol: '⚊○', label: '老阳(变爻)' };
    default: return null;
  }
}

// ============ 生成六爻 ============
function generateYao() {
  const yaos = [];
  for (let i = 0; i < 6; i++) {
    const coinSum = tossCoins();
    const yaoInfo = getYaoType(coinSum);
    yaos.push({
      ...yaoInfo,
      coinSum,
      position: 6 - i // 从下往上显示: 1(初爻)~6(上爻)
    });
  }
  return yaos;
}

// ============ 根据六爻获取卦象 ============
function getHexagram(yaos) {
  // binary: 从下往上, 0=阴, 1=阳
  const binary = yaos.map(y => y.type === 'yang' ? '1' : '0').join('');
  const changingBinary = yaos.map(y => y.type === 'yang' ? '1' : '0').join('');

  const hexagram = HEXAGRAM_MAP[binary];

  // 如果有变爻，计算变卦
  let changedHexagram = null;
  if (yaos.some(y => y.changing)) {
    const changedBinary = yaos.map(y => {
      if (y.changing) return y.type === 'yang' ? '0' : '1';
      return y.type === 'yang' ? '1' : '0';
    }).join('');
    changedHexagram = HEXAGRAM_MAP[changedBinary];
  }

  return { hexagram, changedHexagram, binary };
}

// ============ 显示六爻动画 ============
function displayLiuyaoLines(yaos) {
  const container = document.getElementById('liuyao-lines');
  container.innerHTML = '';

  yaos.forEach((yao, index) => {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'yao-line';
    lineDiv.style.animationDelay = `${index * 0.25}s`;

    const numSpan = document.createElement('span');
    numSpan.className = 'yao-num';
    numSpan.textContent = `第${yao.position}爻`;
    lineDiv.appendChild(numSpan);

    const symbolSpan = document.createElement('span');
    symbolSpan.className = `yao-symbol${yao.changing ? ' changing' : ''}`;

    // 用更美观的方式显示爻
    if (yao.type === 'yang') {
      symbolSpan.textContent = yao.changing ? '━━━○' : '━━━━';
      symbolSpan.style.color = yao.changing ? 'var(--color-red)' : 'var(--color-ink)';
    } else {
      symbolSpan.textContent = yao.changing ? '━ ━×' : '━  ━';
      symbolSpan.style.color = yao.changing ? 'var(--color-red)' : 'var(--color-ink-light)';
    }
    symbolSpan.style.fontSize = '1.8rem';
    symbolSpan.style.letterSpacing = '0.1em';
    lineDiv.appendChild(symbolSpan);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'yao-label';
    labelSpan.textContent = yao.label;
    lineDiv.appendChild(labelSpan);

    container.appendChild(lineDiv);
  });
}

// ============ 主函数 ============
function castLiuyao() {
  const question = document.getElementById('liuyao-question').value.trim();
  const container = document.getElementById('liuyao-lines');

  // 摇卦动画
  container.innerHTML = '<p style="text-align:center;font-size:2rem;animation:coinBounce 0.6s ease-in-out 3">🪙🪙🪙</p><p class="placeholder-text">正在起卦中...</p>';

  setTimeout(() => {
    const yaos = generateYao();
    const { hexagram, changedHexagram, binary } = getHexagram(yaos);

    // 显示六爻
    displayLiuyaoLines(yaos);

    // 显示结果
    const resultDiv = document.getElementById('liuyao-result');
    resultDiv.style.display = 'block';

    if (!hexagram) {
      resultDiv.innerHTML = '<p>起卦异常，请重新摇卦</p>';
      return;
    }

    let html = '<div class="bazi-summary">';

    // 本卦
    html += `<h4>📖 本卦：${hexagram.name} ${String.fromCharCode(0x4DBF + hexagram.num)}</h4>`;
    html += `<p style="font-size:0.85rem;color:var(--color-ink-light)">${hexagram.trigrams}</p>`;
    html += `<p style="margin:0.5rem 0"><strong>卦辞：</strong>${hexagram.judgment}</p>`;
    html += `<p>${hexagram.meaning}</p>`;

    // 变卦
    if (changedHexagram) {
      html += `<hr style="border-color:var(--color-border-light);margin:1rem 0">`;
      html += `<h4>🔄 变卦：${changedHexagram.name} ${String.fromCharCode(0x4DBF + changedHexagram.num)}</h4>`;
      html += `<p style="font-size:0.85rem;color:var(--color-ink-light)">${changedHexagram.trigrams}</p>`;
      html += `<p style="margin:0.5rem 0"><strong>卦辞：</strong>${changedHexagram.judgment}</p>`;
      html += `<p>${changedHexagram.meaning}</p>`;

      // 变爻提示
      const changingYaos = yaos.filter(y => y.changing);
      html += `<p style="margin-top:0.5rem;font-size:0.85rem;color:var(--color-red)">`;
      html += `变爻：${changingYaos.map(y => `第${y.position}爻(${y.label})`).join('、')}`;
      html += `</p>`;
    }

    if (question) {
      html += `<hr style="border-color:var(--color-border-light);margin:1rem 0">`;
      html += `<p style="font-size:0.85rem;color:var(--color-ink-light)"><strong>所问之事：</strong>${question}</p>`;
    }

    html += '</div>';
    html += '<p style="text-align:center;font-size:0.75rem;color:var(--color-ink-light);margin-top:0.5rem">以上解读仅供参考，心诚则灵 ✨</p>';

    resultDiv.innerHTML = html;
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 1800);
}
