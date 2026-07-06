// ===== Clan Selection =====
function selectClan(clan) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');

    if (clan === 'chest') {
        modalTitle.textContent = '🪙 Клан Сундуков';
        modalTitle.style.color = '#FFD700';
        modalText.innerHTML = `
            Ты выбрал <span style="color: #FFD700; font-weight: bold;">Клан Сундуков</span>!<br><br>
            Основатель: <span style="color: #FFD700;">SeAk</span><br><br>
            «Богатство — наша сила!»
        `;
    } else {
        modalTitle.textContent = '🛡️ Клан Волунов';
        modalTitle.style.color = '#6EA8FF';
        modalText.innerHTML = `
            Ты выбрал <span style="color: #6EA8FF; font-weight: bold;">Клан Волунов</span>!<br><br>
            Основатель: <span style="color: #6EA8FF;">TOCHARA</span><br><br>
            «Сила — в единстве!»
        `;
    }

    modal.classList.add('show');
    playClickSound();
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');
}

// Закрытие модала по клику на оверлей
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Закрытие по Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ===== Hotbar Interaction =====
document.querySelectorAll('.hotbar-slot').forEach(slot => {
    slot.addEventListener('click', function() {
        document.querySelectorAll('.hotbar-slot').forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        playClickSound();
    });
});

// ===== Minecraft Click Sound (Web Audio API) =====
function playClickSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime + 0.05);

        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
        // Audio not supported
    }
}

// ===== Add tooltips =====
document.querySelector('.clan-chest')?.setAttribute('data-tooltip', '');
document.querySelector('.clan-bolun')?.setAttribute('data-tooltip', '');

// ===== Background parallax on mouse move =====
document.addEventListener('mousemove', function(e) {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;

    const bg = document.querySelector('.bg-tiles');
    if (bg) {
        bg.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// ===== Console Easter Egg =====
console.log('%c⚔ CLAN WARS ⚔', 'font-size: 24px; color: #FFD700; text-shadow: 2px 2px #000; font-family: monospace;');
console.log('%cВыбери свой клан мудро...', 'font-size: 14px; color: #aaa; font-family: monospace;');
