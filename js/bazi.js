/**
 * 明道测算 - 八字排盘模块
 * 计算四柱（年柱、月柱、日柱、时柱）天干地支
 */

// ============ 日柱计算 ============
function getDayGanZhi(year, month, day) {
  // 参考日期: 2000-01-07 = 甲子日 (cycle index 0)
  const refDate = new Date(2000, 0, 7);
  const targetDate = new Date(year, month - 1, day);
  const diffDays = Math.round((targetDate - refDate) / (1000 * 60 * 60 * 24));
  const cycleIndex = ((diffDays % 60) + 60) % 60;
  return cycleIndex;
}

// ============ 年柱计算 ============
function getYearGanZhi(year) {
  const ganIndex = (year - 4) % 10;
  const zhiIndex = (year - 4) % 12;
  return { ganIndex, zhiIndex };
}

// ============ 月柱计算 ============
// 月支固定按节气划分（简化版用公历月份估算）
function getMonthZhiIndex(month) {
  // 公历月份 → 地支月索引
  // 2月 → 寅(2), 3月 → 卯(3), 4月 → 辰(4), 5月 → 巳(5), 6月 → 午(6),
  // 7月 → 未(7), 8月 → 申(8), 9月 → 酉(9), 10月 → 戌(10), 11月 → 亥(11),
  // 12月 → 子(0), 1月 → 丑(1)
  const monthZhiMap = [11, 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return monthZhiMap[month - 1];
}

// 月干计算（五虎遁）
function getMonthGanIndex(yearGanIndex, monthZhiIndex) {
  // 五虎遁年上起月表
  const baseStems = [2, 4, 6, 8, 0]; // 甲己起丙寅, 乙庚起戊寅, 丙辛起庚寅, 丁壬起壬寅, 戊癸起甲寅
  const group = Math.floor(yearGanIndex / 2); // 每两个年干一组
  const base = baseStems[group];
  return (base + monthZhiIndex) % 10;
}

// ============ 时柱计算 ============
// 时支
function getHourZhiIndex(hour) {
  // 23-0 → 子(0), 1-2 → 丑(1), 3-4 → 寅(2), 5-6 → 卯(3), 7-8 → 辰(4),
  // 9-10 → 巳(5), 11-12 → 午(6), 13-14 → 未(7), 15-16 → 申(8), 17-18 → 酉(9),
  // 19-20 → 戌(10), 21-22 → 亥(11)
  return Math.floor(((hour + 1) % 24) / 2);
}

// 时干计算（五鼠遁）
function getHourGanIndex(dayGanIndex, hourZhiIndex) {
  // 五鼠遁日上起时表
  const baseStems = [0, 2, 4, 6, 8]; // 甲己起甲子, 乙庚起丙子, 丙辛起戊子, 丁壬起庚子, 戊癸起壬子
  const group = Math.floor(dayGanIndex / 2);
  const base = baseStems[group];
  return (base + hourZhiIndex) % 10;
}

// ============ 五行统计 ============
function countWuxing(pillars) {
  const count = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 };
  pillars.forEach(p => {
    count[GAN_WUXING[p.ganIndex]]++;
    count[ZHI_WUXING[p.zhiIndex]]++;
  });
  return count;
}

// ============ 简单命理分析 ============
function analyzeBazi(pillars, gender) {
  const wuxingCount = countWuxing(pillars);
  const dayWuxing = GAN_WUXING[pillars[2].ganIndex]; // 日主五行
  const dayGan = GAN[pillars[2].ganIndex];
  const dayYinYang = GAN_YINYANG[pillars[2].ganIndex];

  let analysis = [];
  analysis.push(`日主为<strong>${dayGan}</strong>（${dayWuxing}，${dayYinYang}性）`);

  // 五行平衡分析
  const maxWuxing = Object.entries(wuxingCount).sort((a, b) => b[1] - a[1])[0];
  const minWuxing = Object.entries(wuxingCount).sort((a, b) => a[1] - b[1])[0];

  if (maxWuxing[1] >= 4) {
    analysis.push(`八字中<strong>${maxWuxing[0]}</strong>过旺（出现${maxWuxing[1]}次），需注意相关五行过盛带来的影响。`);
  }

  let balance = '较为均衡';
  const values = Object.values(wuxingCount);
  const spread = Math.max(...values) - Math.min(...values);
  if (spread >= 3) balance = '五行分布不均衡';
  else if (spread >= 2) balance = '五行分布略有不均';

  analysis.push(`命局五行${balance}，日主${dayGan}${dayWuxing}。`);

  // 日主强弱简评
  let strength = '中和';
  const supportingWuxing = WUXING_SHENG[dayWuxing]; // 生我的
  const selfWuxing = dayWuxing;
  const supportCount = (wuxingCount[supportingWuxing] || 0) + (wuxingCount[selfWuxing] || 0);

  if (supportCount >= 5) strength = '偏强';
  else if (supportCount <= 2) strength = '偏弱';

  analysis.push(`日主<strong>${strength}</strong>，${gender === 'male' ? '男' : '女'}命。`);

  // 性格简评
  const personalityMap = {
    '甲木': '性格正直刚毅，积极向上，有领导才能，如同参天大树。',
    '乙木': '性格柔韧温和，善解人意，具有较强的适应力和创造力。',
    '丙火': '热情开朗，光明磊落，具有感染力和号召力，如太阳般温暖。',
    '丁火': '心思细腻，内敛但不失热忱，如同烛光照亮黑暗。',
    '戊土': '诚实稳重，信守承诺，如同大地般敦厚可靠。',
    '己土': '温和包容，细致周到，善于协调和平衡各方关系。',
    '庚金': '刚强果断，勇于担当，如刀剑般锋利果敢。',
    '辛金': '精致细腻，追求完美，具有独特的审美品味。',
    '壬水': '智慧灵活，胸怀宽广，如同江河奔腾不息。',
    '癸水': '深沉内敛，洞察力强，如同静水深流。'
  };

  analysis.push(personalityMap[dayGan + dayWuxing] || '');

  return {
    dayWuxing,
    dayGan,
    wuxingCount,
    analysis: analysis.join('<br>'),
    balance,
    strength
  };
}

// ============ 主计算函数 ============
function calculateBazi() {
  const dateInput = document.getElementById('bazi-date').value;
  const hourSelect = parseInt(document.getElementById('bazi-hour').value);
  const gender = document.getElementById('bazi-gender').value;

  if (!dateInput) {
    alert('请选择出生日期');
    return;
  }

  const [y, m, d] = dateInput.split('-').map(Number);

  // 计算四柱
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
  const nayin = [];
  pillars.forEach(p => {
    const jiaziIndex = JIAZI.indexOf(GAN[p.ganIndex] + ZHI[p.zhiIndex]);
    nayin.push(jiaziIndex >= 0 ? NAYIN[Math.floor(jiaziIndex / 2)] : '未知');
  });

  // 分析
  const analysis = analyzeBazi(pillars, gender);

  // 渲染结果
  const resultDiv = document.getElementById('bazi-result');
  resultDiv.style.display = 'block';

  let html = '<table class="bazi-table"><thead><tr>';
  html += '<th></th>';
  pillars.forEach(p => html += `<th>${p.name}</th>`);
  html += '</tr></thead><tbody>';

  // 天干行
  html += '<tr><td style="font-weight:600;color:#9d2933">天干</td>';
  pillars.forEach(p => {
    const gan = GAN[p.ganIndex];
    html += `<td><span class="pillar-gan">${gan}</span><br><span class="wuxing-tag" style="background:${WUXING_BG[GAN_WUXING[p.ganIndex]]};color:${WUXING_COLORS[GAN_WUXING[p.ganIndex]]}">${GAN_WUXING[p.ganIndex]}</span></td>`;
  });
  html += '</tr>';

  // 地支行
  html += '<tr><td style="font-weight:600;color:#9d2933">地支</td>';
  pillars.forEach(p => {
    html += `<td><span class="pillar-zhi">${ZHI[p.zhiIndex]}</span><br><span class="wuxing-tag" style="background:${WUXING_BG[ZHI_WUXING[p.zhiIndex]]};color:${WUXING_COLORS[ZHI_WUXING[p.zhiIndex]]}">${ZHI_WUXING[p.zhiIndex]}</span></td>`;
  });
  html += '</tr>';

  // 藏干行
  html += '<tr><td style="font-weight:600;color:#5a8a8a">藏干</td>';
  pillars.forEach(p => {
    const canggan = ZHI_CANGGAN[ZHI[p.zhiIndex]] || [];
    html += `<td style="font-size:0.8rem;color:#5a8a8a">${canggan.join(' ')}</td>`;
  });
  html += '</tr>';

  // 纳音行
  html += '<tr><td style="font-weight:600;color:#c9a96e">纳音</td>';
  pillars.forEach((p, i) => {
    html += `<td style="font-size:0.8rem;color:#c9a96e">${nayin[i]}</td>`;
  });
  html += '</tr>';

  // 生肖
  html += '<tr><td style="font-weight:600;color:#9d2933">生肖</td>';
  html += `<td colspan="4" style="text-align:center">${ZHI_SHENGXIAO[yearGZ.zhiIndex]}</td>`;
  html += '</tr>';

  html += '</tbody></table>';

  // 五行统计
  html += '<div style="margin-top:1rem;display:flex;gap:0.5rem;flex-wrap:wrap;justify-content:center">';
  Object.entries(analysis.wuxingCount).forEach(([wx, cnt]) => {
    const pct = Math.round((cnt / 8) * 100);
    html += `<div style="flex:1;min-width:50px;text-align:center;padding:0.5rem;border-radius:8px;background:${WUXING_BG[wx]}">
      <div style="font-weight:700;color:${WUXING_COLORS[wx]}">${wx}</div>
      <div style="font-size:1.2rem;font-weight:700">${cnt}</div>
      <div style="font-size:0.7rem;color:var(--color-ink-light)">${pct}%</div>
    </div>`;
  });
  html += '</div>';

  // 分析
  html += `<div class="bazi-summary"><h4>命理简析</h4><p>${analysis.analysis}</p></div>`;

  resultDiv.innerHTML = html;
  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
