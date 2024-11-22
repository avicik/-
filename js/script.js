const poems = [
    "醉里挑灯看剑，梦回吹角连营。",
    "东风夜放花千树，更吹落、星如雨。",
    "青山遮不住，毕竟东流去。",
    "少年不识愁滋味，爱上层楼。",
    "莫等闲，白了少年头，空悲切。",
    "我见青山多妩媚，料青山见我应如是。",
    "昨夜西风凋碧树，独上高楼，望尽天涯路。",
    "千古江山，英雄无觅孙仲谋处。",
    "把吴钩看了，栏杆拍遍，无人会，登临意。",
    "何处望神州？满眼风光北固楼。",
    "想当年，金戈铁马，气吞万里如虎。",
    "壮志饥餐胡虏肉，笑谈渴饮匈奴血。",
    "可惜流年，忧愁风雨，树犹如此。",
    "人生如梦，一樽还酹江月。",
    "水龙吟，水调歌头，一夜潇湘雨。",
    "长安回望绣成堆，山顶千门次第开。",
    "凤凰台上凤凰游，凤去台空江自流。",
    "江南好，风景旧曾谙。",
    "天下英雄谁敌手？曹刘。生子当如孙仲谋。",
    "乱石穿空，惊涛拍岸，卷起千堆雪。",
];

const poemCard = document.getElementById('poemCard');
const poemText = document.getElementById('poemText');

function getRandomPoem() {
    const currentPoem = poemText.textContent;
    let newPoem;
    do {
        newPoem = poems[Math.floor(Math.random() * poems.length)];
    } while (newPoem === currentPoem);
    return newPoem;
}

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