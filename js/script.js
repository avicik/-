import poems from './poems.js';

const poemCard = document.getElementById('poemCard');
const poemText = document.getElementById('poemText');

// 用于存储最近显示过的诗句
const recentPoems = new Set();
const MAX_RECENT_POEMS = 10; // 记录最近显示的10首诗

// 改进的随机诗句选择函数
function getRandomPoem() {
    let availablePoems = poems.filter(poem => !recentPoems.has(poem));
    
    // 如果所有诗都在最近列表中，清空历史
    if (availablePoems.length === 0) {
        recentPoems.clear();
        availablePoems = poems;
    }
    
    // 随机选择一首可用的诗
    const randomIndex = Math.floor(Math.random() * availablePoems.length);
    const newPoem = availablePoems[randomIndex];
    
    // 添加到最近列表
    recentPoems.add(newPoem);
    
    // 如果最近列表太长，删除最早的记录
    if (recentPoems.size > MAX_RECENT_POEMS) {
        const firstItem = recentPoems.values().next().value;
        recentPoems.delete(firstItem);
    }
    
    return newPoem;
}

// 页面加载时显示随机诗句
window.addEventListener('DOMContentLoaded', () => {
    poemText.textContent = getRandomPoem();
});

function createFirework(x, y) {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    
    const colors = ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#0000ff', '#ff00ff', '#ff1493', '#00ffff'];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const angle = (i / particleCount) * 360;
        const distance = Math.random() * 150 + 50;
        particle.style.setProperty('--tx', `${Math.cos(angle * Math.PI / 180) * distance}px`);
        particle.style.setProperty('--ty', `${Math.sin(angle * Math.PI / 180) * distance}px`);
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDelay = `${Math.random() * 0.2}s`;
        firework.appendChild(particle);
    }

    poemCard.appendChild(firework);
    setTimeout(() => {
        poemCard.removeChild(firework);
    }, 1500);
}

poemCard.addEventListener('click', (e) => {
    e.preventDefault();
    const rect = poemCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createFirework(x, y);
    poemText.style.opacity = 0;
    setTimeout(() => {
        poemText.textContent = getRandomPoem();
        poemText.style.opacity = 1;
    }, 300);
});

poemCard.addEventListener('mousedown', (e) => {
    e.preventDefault();
}); 