/**
 * 明道测算 - 主应用控制器
 * 导航切换、全局状态管理
 */

// 当前活跃的模块
let currentModule = null;

// 所有模块列表
const MODULES = ['bazi', 'liuyao', 'paipan', 'lost', 'romance', 'tarot'];

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initDefaultDates();
});

// 初始化默认日期
function initDefaultDates() {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(input => {
    if (!input.value) input.value = todayStr;
  });
}

// 初始化导航
function initNavigation() {
  const navCards = document.querySelectorAll('.nav-card');
  navCards.forEach(card => {
    card.addEventListener('click', () => {
      const module = card.dataset.module;
      showModule(module);
    });

    // 键盘可访问性
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

// 显示指定模块
function showModule(moduleName) {
  // 隐藏所有模块
  document.querySelectorAll('.module-content').forEach(m => m.classList.remove('active'));

  // 显示目标模块
  const target = document.getElementById(`${moduleName}-module`);
  if (target) {
    target.classList.add('active');
    currentModule = moduleName;

    // 重置结果容器
    const results = target.querySelectorAll('.result-container');
    results.forEach(r => r.style.display = 'none');

    // 重置六爻显示
    if (moduleName === 'liuyao') {
      const lines = target.querySelector('.liuyao-display');
      if (lines) {
        lines.innerHTML = '<p class="placeholder-text">点击上方按钮开始摇卦<br>心中默念所问之事，专注凝神</p>';
      }
    }

    // 重置塔罗牌
    if (moduleName === 'tarot') {
      const cards = target.querySelector('.tarot-display');
      if (cards) cards.innerHTML = '';
      document.querySelectorAll('.spread-option').forEach((o, i) => {
        o.classList.toggle('active', i === 0);
      });
      currentSpread = 1;
    }

    // 滚动到模块
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    // 隐藏导航区域（小屏幕优化）
    const navSection = document.getElementById('nav-section');
    if (window.innerWidth < 480) {
      navSection.style.display = 'none';
    }
  }
}

// 返回导航
function showNav() {
  document.querySelectorAll('.module-content').forEach(m => m.classList.remove('active'));
  currentModule = null;

  const navSection = document.getElementById('nav-section');
  navSection.style.display = '';

  // 滚动到导航
  document.getElementById('hero').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 键盘快捷键
document.addEventListener('keydown', (e) => {
  // Esc 返回导航
  if (e.key === 'Escape' && currentModule) {
    showNav();
  }

  // Alt+数字 快速切换模块
  if (e.altKey && e.key >= '1' && e.key <= '6') {
    const idx = parseInt(e.key) - 1;
    showModule(MODULES[idx]);
  }
});

// 初始化提示
console.log('%c明道测算 %c已就绪',
  'font-family:"ZCOOL XiaoWei",serif;font-size:18px;color:#9d2933',
  'color:#5c4b31');
console.log('%c命理玄学 · 仅供消遣', 'color:#c9a96e;font-size:12px');
