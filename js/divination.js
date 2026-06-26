/**
 * 明道测算 - 占卜模块
 * 寻物方位、桃花姻缘、命盘排盘
 */

// ============ 寻物方位 ============
function findLost() {
  const item = document.getElementById('lost-item').value.trim();
  const dateStr = document.getElementById('lost-date').value;
  const place = document.getElementById('lost-place').value.trim();

  if (!item) {
    alert('请输入丢失的物品');
    return;
  }

  const resultDiv = document.getElementById('lost-result');
  resultDiv.style.display = 'block';

  // 根据日期和时间计算方位
  let directionIndex;
  if (dateStr) {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dayCycle = getDayGanZhi(y, m, d);
    directionIndex = dayCycle % 8;
  } else {
    // 无日期时随机
    directionIndex = Math.floor(Math.random() * 8);
  }

  const dir = LOST_DIRECTIONS[directionIndex];

  // 模拟可能性
  const likelihoods = ['较低', '中等', '较高', '较高'];
  const likelihood = likelihoods[Math.floor(Math.random() * 4)];
  const timeFrame = ['1天内', '3天内', '1周内', '半个月内', '1个月内'][Math.floor(Math.random() * 5)];

  let html = '';

  // 罗盘
  html += `<div class="lost-compass">
    <div class="compass-circle">
      <span class="compass-arrow">🧭</span>
      <span class="compass-direction dir-n">北</span>
      <span class="compass-direction dir-s">南</span>
      <span class="compass-direction dir-e">东</span>
      <span class="compass-direction dir-w">西</span>
    </div>
  </div>`;

  html += `<div class="bazi-summary">`;
  html += `<h4>🔍 失物推算结果</h4>`;
  html += `<p><strong>丢失物品：</strong>${item}</p>`;
  if (place) html += `<p><strong>丢失地点：</strong>${place}</p>`;

  html += `<hr style="border-color:rgba(201,168,76,0.15);margin:0.75rem 0">`;

  // 方位信息
  html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin:0.75rem 0">`;
  html += `<div style="text-align:center;padding:0.75rem;background:var(--paper-cream);border-radius:8px">
    <div style="font-size:0.8rem;color:var(--text-secondary)">寻找方位</div>
    <div style="font-size:1.5rem;font-weight:700;color:var(--cinnabar);font-family:var(--font-title)">${dir.direction}</div>
    <div style="font-size:0.75rem;color:var(--text-secondary)">五行属${dir.element}</div>
  </div>`;
  html += `<div style="text-align:center;padding:0.75rem;background:var(--paper-cream);border-radius:8px">
    <div style="font-size:0.8rem;color:var(--text-secondary)">找到几率</div>
    <div style="font-size:1.5rem;font-weight:700;color:${likelihood === '较高' ? '#5a8a8a' : likelihood === '较低' ? 'var(--cinnabar)' : '#a88a3d'};font-family:var(--font-title)">${likelihood}</div>
    <div style="font-size:0.75rem;color:var(--text-secondary)">预计${timeFrame}</div>
  </div>`;
  html += `</div>`;

  html += `<p><strong>寻找建议：</strong>${dir.advice}。</p>`;
  html += `<p style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-secondary)">保持冷静，仔细回忆最后一次使用该物品的时间和地点，往往就在你忽略的角落。</p>`;
  html += `</div>`;

  html += '<p style="text-align:center;font-size:0.75rem;color:var(--text-secondary);margin-top:0.5rem">以上推算仅供参考 🔍</p>';

  // 寻物详解
  html += `<div class="detail-section">
    <div class="detail-title">🔍 寻物简述</div>
    <div class="detail-text">失物${item}，推算方位在<strong>${dir.direction}</strong>，五行属${dir.element}。找到几率<strong>${likelihood}</strong>，预计${timeFrame}内有望寻回。</div>
    <div class="detail-title" style="margin-top:8px">🔍 寻物详解</div>
    <div class="detail-text">${dir.advice}。建议先从${dir.direction}方位的常用区域开始搜寻，如抽屉、柜子、${dir.element === '木' ? '书架花盆附近' : dir.element === '火' ? '厨房电器附近' : dir.element === '土' ? '角落地面附近' : dir.element === '金' ? '金属器具、包包夹层' : '浴室水槽附近'}。保持耐心，往往失物就在你眼皮底下。</div>
  </div>`;

  // 弹窗
  html += `<div class="xuzeye-popover">
    <div class="xuzeye-icon">🧧</div>
    <div class="xuzeye-text">说了你也不懂，问问徐泽野吧！</div>
    <div class="xuzeye-sub">— 寻物之道，还需高人指点 —</div>
  </div>`;

  resultDiv.innerHTML = html;
  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ============ 桃花姻缘 ============
function checkTaohua() {
  const dateStr = document.getElementById('romance-date').value;
  const gender = document.getElementById('romance-gender').value;
  const status = document.getElementById('romance-status').value;

  if (!dateStr) {
    alert('请选择出生日期');
    return;
  }

  const [y, m, d] = dateStr.split('-').map(Number);
  const yearGZ = getYearGanZhi(y);
  const dayCycle = getDayGanZhi(y, m, d);

  const resultDiv = document.getElementById('romance-result');
  resultDiv.style.display = 'block';

  // 年支三合找桃花
  const yearZhi = ZHI[yearGZ.zhiIndex];
  let taohuaZhi = '';
  for (const [key, value] of Object.entries(TAOHUA_STAR)) {
    if (key.includes(yearZhi)) {
      taohuaZhi = value;
      break;
    }
  }

  const taohuaIndex = ZHI.indexOf(taohuaZhi);

  // 分析桃花
  const dayZhiIndex = dayCycle % 12;
  const hasTaohuaInDay = ZHI[dayZhiIndex] === taohuaZhi;

  // 随机桃花运势
  const taohuaLevels = [
    { level: '盛', desc: '桃花运极旺，异性缘佳，容易遇到心仪对象。', color: 'var(--cinnabar)' },
    { level: '旺', desc: '桃花运势不错，社交活动中容易结交新朋友。', color: 'var(--cinnabar-light)' },
    { level: '平', desc: '桃花运势平稳，顺其自然即可。', color: 'var(--gold)' },
    { level: '弱', desc: '桃花运一般，可能需要主动出击。', color: '#5a8a8a' },
    { level: '暗', desc: '近期桃花运较弱，宜修身养性，提升自我。', color: 'var(--text-secondary)' }
  ];

  const levelIdx = hasTaohuaInDay ? 0 : Math.floor(Math.random() * 5);
  const taohua = taohuaLevels[levelIdx];

  // 桃花方位
  const directions = ['正北', '东北', '正东', '东南', '正南', '西南', '正西', '西北'];
  const luckyDir = directions[Math.floor(Math.random() * 8)];
  const luckyMonth = ZHI_YUEFEN[Math.floor(Math.random() * 12)];
  const luckyColor = ['红色', '粉色', '白色', '紫色', '蓝色'][Math.floor(Math.random() * 5)];

  const adviceMap = {
    'single': '多参加社交活动，拓展交友圈。桃花运来时挡也挡不住，保持开放心态。',
    'dating': '感情需要经营和维护。多沟通、多包容，感情会越来越甜蜜。',
    'married': '婚姻需要互相理解与信任。在生活中创造小惊喜，保持新鲜感。'
  };

  let html = '';

  // 桃花图标
  html += `<div class="taohua-result">
    <div class="taohua-icon">🌸</div>`;

  // 桃花运势
  html += `<div style="margin-bottom:1rem">
    <div style="font-size:0.9rem;color:var(--text-secondary)">你的桃花运</div>
    <div style="font-size:2.5rem;font-weight:900;color:${taohua.color};font-family:var(--font-title)">${taohua.level}</div>
    <p style="margin-top:0.5rem;font-size:0.95rem">${taohua.desc}</p>
  </div>`;

  // 详细信息
  html += `<div class="bazi-summary" style="text-align:left">
    <h4>💕 姻缘分析</h4>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;font-size:0.85rem">
      <div><strong>生肖：</strong>${ZHI_SHENGXIAO[yearGZ.zhiIndex]}</div>
      <div><strong>桃花地支：</strong>${taohuaZhi}(肖${ZHI_SHENGXIAO[taohuaIndex]})</div>
      <div><strong>幸运方位：</strong>${luckyDir}</div>
      <div><strong>旺桃花月：</strong>${luckyMonth}</div>
      <div style="grid-column:span 2"><strong>幸运色：</strong>${luckyColor}</div>
    </div>
    <hr style="border-color:rgba(201,168,76,0.15);margin:0.75rem 0">
    <p style="font-size:0.85rem">${adviceMap[status]}</p>
  </div>`;

  html += `<p style="text-align:center;font-size:0.75rem;color:var(--text-secondary);margin-top:0.5rem">桃花运仅供娱乐参考，真爱需要用心经营 ❤️</p>`;
  html += `</div>`;

  // 桃花详解
  html += `<div class="detail-section">
    <div class="detail-title">🌸 桃花简述</div>
    <div class="detail-text">桃花运<strong style="color:${taohua.color}">「${taohua.level}」</strong>— ${taohua.desc}</div>
    <div class="detail-title" style="margin-top:8px">🌸 桃花详解</div>
    <div class="detail-text">命带<strong>${taohuaZhi}</strong>桃花星（肖${ZHI_SHENGXIAO[taohuaIndex]}），桃花方位在<strong>${luckyDir}</strong>，${luckyMonth}桃花最旺，幸运色为<strong>${luckyColor}</strong>。${adviceMap[status]} 桃花星坐${taohuaZhi}，${taohuaZhi === '子' ? '水性桃花，柔和多情' : taohuaZhi === '午' ? '火性桃花，热情奔放' : taohuaZhi === '卯' ? '木性桃花，温润秀美' : '金性桃花，精致含蓄'}。缘分天定，修心为上。</div>
  </div>`;

  // 弹窗
  html += `<div class="xuzeye-popover">
    <div class="xuzeye-icon">🧧</div>
    <div class="xuzeye-text">说了你也不懂，问问徐泽野吧！</div>
    <div class="xuzeye-sub">— 姻缘之事，还需高人指点 —</div>
  </div>`;

  resultDiv.innerHTML = html;
  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ============ 命盘排盘 ============
function generatePaipan() {
  const dateInput = document.getElementById('paipan-date').value;
  const hourSelect = parseInt(document.getElementById('paipan-hour').value);
  const gender = document.getElementById('paipan-gender').value;

  if (!dateInput) {
    alert('请选择出生日期');
    return;
  }

  const [y, m, d] = dateInput.split('-').map(Number);

  // 复用八字计算
  const yearGZ = getYearGanZhi(y);
  const monthZhi = getMonthZhiIndex(m);
  const monthGan = getMonthGanIndex(yearGZ.ganIndex, monthZhi);
  const dayCycle = getDayGanZhi(y, m, d);
  const dayGan = dayCycle % 10;
  const dayZhi = dayCycle % 12;
  const hourZhi = getHourZhiIndex(hourSelect);
  const hourGan = getHourGanIndex(dayGan, hourZhi);

  const pillars = [
    { name: '年柱', ganIndex: yearGZ.ganIndex, zhiIndex: yearGZ.zhiIndex },
    { name: '月柱', ganIndex: monthGan, zhiIndex: monthZhi },
    { name: '日柱', ganIndex: dayGan, zhiIndex: dayZhi },
    { name: '时柱', ganIndex: hourGan, zhiIndex: hourZhi }
  ];

  // 纳音
  const nayinList = [];
  pillars.forEach(p => {
    const jz = JIAZI.indexOf(GAN[p.ganIndex] + ZHI[p.zhiIndex]);
    nayinList.push(jz >= 0 ? NAYIN[Math.floor(jz / 2)] : '未知');
  });

  // 日主五行统计
  const wuxingCount = countWuxing(pillars);

  const resultDiv = document.getElementById('paipan-result');
  resultDiv.style.display = 'block';

  let html = '';

  // 命盘网格
  html += '<div class="paipan-grid">';
  const labels = ['年 柱', '月 柱', '日 柱', '时 柱'];
  pillars.forEach((p, i) => {
    const gan = GAN[p.ganIndex];
    const zhi = ZHI[p.zhiIndex];
    const canggan = ZHI_CANGGAN[zhi] || [];

    html += `<div class="paipan-cell">
      <div class="cell-label">${labels[i]}</div>
      <div class="cell-gan" style="color:${WUXING_COLORS[GAN_WUXING[p.ganIndex]]}">${gan}</div>
      <div class="cell-zhi" style="color:${WUXING_COLORS[ZHI_WUXING[p.zhiIndex]]}">${zhi}</div>
      <div class="cell-canggan">藏：${canggan.join(' ')}</div>
      <div class="cell-nayin">${nayinList[i]}</div>
    </div>`;
  });
  html += '</div>';

  // 五行平衡
  html += '<div style="margin-top:1rem;display:flex;gap:0.5rem;flex-wrap:wrap;justify-content:center">';
  Object.entries(wuxingCount).forEach(([wx, cnt]) => {
    const bars = '█'.repeat(cnt) + '░'.repeat(4 - Math.min(cnt, 4));
    html += `<div style="flex:1;min-width:60px;text-align:center;padding:0.5rem;border-radius:8px;background:${WUXING_BG[wx]}">
      <div style="font-weight:700;color:${WUXING_COLORS[wx]}">${wx}</div>
      <div style="font-size:0.8rem;font-family:monospace;color:var(--text-secondary)">${bars}</div>
      <div style="font-size:0.7rem;color:var(--text-secondary)">${cnt}/8</div>
    </div>`;
  });
  html += '</div>';

  // 基本信息
  html += `<div class="bazi-summary">`;
  html += `<h4>📋 命盘概要</h4>`;
  html += `<p style="font-size:0.85rem;line-height:2">`;
  html += `八字：${pillars.map(p => GAN[p.ganIndex] + ZHI[p.zhiIndex]).join(' ')}<br>`;
  html += `日主：${GAN[dayGan]}${GAN_WUXING[dayGan]} · ${GAN_YINYANG[dayGan]}性<br>`;
  html += `性别：${gender === 'male' ? '男' : '女'}<br>`;
  html += `生肖：${ZHI_SHENGXIAO[yearGZ.zhiIndex]}<br>`;
  html += `四柱纳音：${nayinList.join(' · ')}`;
  html += `</p>`;
  html += `</div>`;

  html += '<p style="text-align:center;font-size:0.75rem;color:var(--text-secondary);margin-top:0.5rem">命盘排盘仅供研究参考 📜</p>';

  // 命盘详解
  const dayWx = GAN_WUXING[dayGan];
  const dayYinYangStr = GAN_YINYANG[dayGan] === '阳' ? '阳刚果决' : '阴柔缜密';
  html += `<div class="detail-section">
    <div class="detail-title">📜 命盘简述</div>
    <div class="detail-text">日主<strong>${GAN[dayGan]}</strong>${dayWx}，${dayYinYangStr}之性。四柱纳音${nayinList.join('·')}。命局五行<strong>${Math.max(...Object.values(wuxingCount)) === Math.min(...Object.values(wuxingCount)) ? '均衡' : '偏' + Object.entries(wuxingCount).sort((a,b)=>b[1]-a[1])[0][0] + '旺'}</strong>。</div>
    <div class="detail-title" style="margin-top:8px">📜 命盘详解</div>
    <div class="detail-text">
      年柱${GAN[yearGZ.ganIndex]}${ZHI[yearGZ.zhiIndex]}为根，${nayinList[0]}之命，祖德${yearGZ.ganIndex % 2 === 0 ? '深厚' : '清寒'}。<br>
      月柱${GAN[monthGan]}${ZHI[monthZhi]}为苗，${nayinList[1]}之气，事业${monthGan % 2 === 0 ? '顺遂' : '波折中成长'}。<br>
      日柱${GAN[dayGan]}${ZHI[dayZhi]}为花，${nayinList[2]}之身，婚姻${dayGan % 2 === 0 ? '和谐美满' : '需多沟通包容'}。<br>
      时柱${GAN[hourGan]}${ZHI[hourZhi]}为果，${nayinList[3]}之归，晚年${hourGan % 2 === 0 ? '福泽绵长' : '自在清闲'}。
      生肖属${ZHI_SHENGXIAO[yearGZ.zhiIndex]}，${gender === 'male' ? '男' : '女'}命${GAN[dayGan]}${dayWx}日主，${dayYinYangStr}，整体${Object.values(wuxingCount).filter(v=>v>=2).length >= 4 ? '五行流通有致' : '五行有所偏颇，宜后天调和'}。
    </div>
  </div>`;

  // 弹窗
  html += `<div class="xuzeye-popover">
    <div class="xuzeye-icon">🧧</div>
    <div class="xuzeye-text">说了你也不懂，问问徐泽野吧！</div>
    <div class="xuzeye-sub">— 命盘玄妙，还需高人解读 —</div>
  </div>`;

  resultDiv.innerHTML = html;
  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
