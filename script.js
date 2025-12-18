// 打字机效果
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// 终端模拟效果
class TerminalSimulator {
    constructor(element) {
        this.element = element;
        this.commands = [
            "npm run build --production",
            "Deploying to GitHub Pages...",
            "✓ Build successful!",
            "Visit https://sapchen.github.io/resume-chenliang",
            "Last updated: " + new Date().toLocaleDateString('zh-CN')
        ];
        this.currentCommand = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        this.simulate();
    }

    simulate() {
        const currentCmd = this.commands[this.currentCommand];
        
        if (!this.isDeleting && this.currentChar <= currentCmd.length) {
            this.element.textContent = currentCmd.substring(0, this.currentChar);
            this.currentChar++;
            setTimeout(() => this.simulate(), 50);
        } else if (this.isDeleting && this.currentChar >= 0) {
            this.element.textContent = currentCmd.substring(0, this.currentChar);
            this.currentChar--;
            setTimeout(() => this.simulate(), 30);
        } else {
            this.isDeleting = !this.isDeleting;
            if (!this.isDeleting) {
                this.currentCommand = (this.currentCommand + 1) % this.commands.length;
            }
            setTimeout(() => this.simulate(), 1000);
        }
    }
}

// 初始化函数
document.addEventListener('DOMContentLoaded', function() {
    // 设置当前日期
    document.getElementById('current-date').textContent = 
        new Date().toLocaleDateString('zh-CN', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
        });

    // 初始化打字机效果
    const txtElement = document.querySelector('.typewriter');
    const words = ['无限可能', '用有限创造无限'];
    if (txtElement) {
        new TypeWriter(txtElement, words, 3000);
    }

    // 初始化终端模拟
    const terminalText = document.getElementById('typing-text');
    if (terminalText) {
        new TerminalSimulator(terminalText);
    }

    // 初始化粒子效果
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#00d9ff" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6c63ff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            },
            retina_detect: true
        });
    }

    // 滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // 观察所有卡片
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });

    // 技能标签点击效果
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});