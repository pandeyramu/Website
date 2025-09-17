class TypingSpeedTest {
    constructor() {
        this.shortTexts = [
            "The quick brown fox jumps over the lazy dog. Typing this classic pangram helps practice every letter in the alphabet. Accuracy is more important than rushing, because consistent correct typing builds real speed over time. Every word you type with focus improves memory, coordination, and confidence in your skills.",
            "Practice makes perfect, and typing every day sharpens both accuracy and speed. Small efforts, done consistently, form habits that last. The more you type with proper posture and attention, the easier it becomes to turn thoughts into words on the screen. Good technique saves time and reduces fatigue.",
            "Clear thoughts flow easily onto the page when typing feels natural. Instead of thinking about keys, your mind focuses on ideas. Writing emails, assignments, or stories becomes faster when accuracy is second nature. This freedom of expression is what makes typing a core skill in the digital world.",
            "Technology evolves rapidly, shaping how people live, work, and communicate. From smartphones to global networks, progress has connected the world in ways once thought impossible. These changes bring new opportunities but also new challenges. Balancing innovation with responsibility ensures that technology benefits everyone.",
            "Reading is one of the most powerful habits a person can build. It expands vocabulary, strengthens focus, and opens doors to knowledge. A good book can transport the mind to new worlds and cultures. Even a short daily reading habit can spark creativity and teach valuable lessons for life and work."
        ];
        this.mediumTexts = [
            "History reveals that societies succeed when they embrace change and struggle when they resist it. Civilizations like Rome, Egypt, and China thrived during periods of openness and learning, yet declined when they ignored innovation. Today, the world faces complex challenges such as climate change, economic shifts, and technological disruption. To move forward, humanity must combine creativity with responsibility. Progress requires resilience, adaptability, and the willingness to learn from both mistakes and successes. In doing so, future generations can inherit a more sustainable and fair world.",
            "Typing is not only about pressing keys quickly but also about expressing ideas clearly. Beginners often focus only on speed, forgetting that accuracy matters just as much. A balance of both creates true mastery. Practicing regularly builds muscle memory, allowing fingers to move naturally across the keyboard. As typing becomes effortless, thoughts can flow freely without interruption, making communication smoother and faster.",
            "Discipline is often the dividing line between those who succeed and those who fall short. While talent gives a head start, it is the daily effort, focus, and patience that sustain progress. Every small step compounds into something bigger. Learning to manage time, ignoring distractions, and working steadily creates momentum. Even when motivation fades, discipline keeps a person moving forward toward goals and dreams.",
            "Creativity and logic are not enemies but partners. Great innovations emerge when imagination meets structure. A musician practices scales before creating melodies, and a scientist follows methods before making discoveries. In typing and communication, the same principle applies. Accuracy provides structure, while speed and fluency add creativity. Together, they allow ideas to be expressed powerfully and efficiently."
        ];
        this.longTexts = [
            "In the digital age, typing skills have become essential for productivity and communication. Whether you're writing emails, coding software, or creating content, fast and accurate typing can significantly improve your efficiency and reduce the time spent on various tasks. The ability to type effortlessly is not just about speed, but about developing confidence and focus while working on complex ideas. This is why consistent practice, combined with mindfulness of posture and accuracy, is critical. Over time, these habits shape a typist into someone capable of handling intense workloads with ease and precision.",
            "Errors aren't the end—they're evidence that effort exists. Every mistake is a step closer to mastery, and practice builds both resilience and speed. Caffeine-fueled coders create complex, clever code at 2:45 a.m. without complaint, while writers polish sentences until clarity shines through. Typing is more than just hitting keys—it’s about expressing thought fluidly. The skill connects imagination with digital expression, allowing ideas to flow freely across screens and networks in the modern world.",
            "Human progress has always been fueled by curiosity, determination, and the search for knowledge. From ancient tools to modern computers, each step has transformed the way people interact with the world. The digital age has connected billions, created new opportunities, and reshaped daily life. Yet technology alone cannot solve every problem. Issues like inequality, privacy, and mental health demand thoughtful solutions. Education plays a central role in this process. By teaching not only technical skills but also creativity, empathy, and resilience, education prepares individuals for the future. A society that values both knowledge and responsibility will continue to grow stronger. Progress is not defined by machines alone but by the choices people make in using them wisely for the benefit of all.",
            "Nature demonstrates balance in every aspect of life. Ecosystems thrive when each part fulfills its role, yet collapse when balance is disturbed. Humanity often disrupts this balance through deforestation, pollution, and unsustainable practices. The consequences are visible in climate change and loss of biodiversity. However, positive change is possible. Renewable energy, conservation, and sustainable habits offer hope. Each person can contribute by reducing waste, protecting resources, and respecting nature. Small steps, when multiplied across communities, create powerful results. Protecting the planet is not only a responsibility but also an act of gratitude toward the Earth, which has sustained countless generations and continues to provide for all living beings.",
            "Success is rarely an accident; it is the result of vision, preparation, and perseverance. The most accomplished individuals often start with limited resources but compensate with determination and creativity. Challenges, failures, and rejections are part of every journey, yet they shape resilience and character. What matters is the ability to rise again, learn from mistakes, and adapt strategies. Just as a river carves valleys through persistence, human effort can overcome even the toughest barriers when fueled by purpose and belief.",
            "Communication is the bridge that connects people, cultures, and generations. From spoken language to digital platforms, the ways of sharing ideas have changed, but the essence remains the same. Clear communication builds trust, strengthens relationships, and drives progress. Misunderstandings, however, can lead to conflicts and setbacks. Learning to listen deeply, express ideas clearly, and respect different perspectives is an art as valuable as any technical skill. In a world overflowing with information, true communication is not about speaking the loudest but about reaching hearts and minds effectively."
        ];
        this.cumulativeTyped = 0;
        this.cumulativeErrors = 0;
        this.currentText = '';
        this.currentPosition = 0;
        this.startTime = null;
        this.isTestActive = false;
        this.timer = null;
        this.timeLeft = 60;
        this.totalTyped = 0;
        this.errors = 0;

        this.initializeElements();
        this.bindEvents();

        if (this.timeSelect) this.timeLeft = parseInt(this.timeSelect.value) || this.timeLeft;
        this.timerDisplay.textContent = this.timeLeft;

        this.loadNewText();
    }

    initializeElements() {
        this.textContent = document.getElementById('text-content');
        this.typingInput = document.getElementById('typing-input');
        this.startBtn = document.getElementById('start-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.timeSelect = document.getElementById('time-select');
        this.wpmDisplay = document.getElementById('wpm');
        this.accuracyDisplay = document.getElementById('accuracy');
        this.timerDisplay = document.getElementById('timer');
        this.resultsModal = document.getElementById('results-modal');
        this.tryAgainBtn = document.getElementById('try-again-btn');

        if (this.typingInput) {
            this.typingInput.addEventListener('paste', e => e.preventDefault());
            this.typingInput.addEventListener('copy', e => e.preventDefault());
            this.typingInput.addEventListener('cut', e => e.preventDefault());
            this.typingInput.addEventListener('drop', e => e.preventDefault());
            this.typingInput.addEventListener('dragstart', e => e.preventDefault());
            this.typingInput.addEventListener('contextmenu', e => e.preventDefault());
        }
    }

    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startTest());
        this.resetBtn.addEventListener('click', () => this.resetTest());
        this.tryAgainBtn.addEventListener('click', () => this.resetTest());
        this.typingInput.addEventListener('input', () => this.handleTyping());
        this.timeSelect.addEventListener('change', () => this.updateTimeLimit());
    }

    pickTextByTime() {
        if (this.timeLeft <= 60) {
            return this.shortTexts[Math.floor(Math.random() * this.shortTexts.length)];
        } else if (this.timeLeft <= 120) {
            return this.mediumTexts[Math.floor(Math.random() * this.mediumTexts.length)];
        } else {
            return this.longTexts[Math.floor(Math.random() * this.longTexts.length)];
        }
    }

    loadNewText() {
        this.currentText = this.pickTextByTime();
        this.currentPosition = 0;
        if (this.typingInput) this.typingInput.value = "";
        this.updateTextDisplay();
    }

    updateTextDisplay() {
        const curLen = this.currentPosition;
        let html = '';
        for (let i = 0; i < this.currentText.length; i++) {
            const char = this.currentText[i];
            if (i < curLen) {
                const typedChar = this.typingInput.value[i];
                if (typedChar === char) {
                    html += `<span class="typed-correct">${char === ' ' ? '&nbsp;' : char}</span>`;
                } else {
                    html += `<span class="typed-incorrect">${char === ' ' ? '&nbsp;' : char}</span>`;
                }
            } else if (i === curLen) {
                html += `<span class="current-char">${char === ' ' ? '&nbsp;' : char}</span>`;
            } else {
                html += `<span class="remaining-char">${char === ' ' ? '&nbsp;' : char}</span>`;
            }
        }
        this.textContent.innerHTML = html;
    }

    startTest() {
        if (this.isTestActive) return;
        this.isTestActive = true;
        if (!this.startTime) this.startTime = Date.now();
        this.typingInput.disabled = false;
        this.typingInput.focus();
        this.startBtn.disabled = true;
        this.resetBtn.disabled = false;
        this.timeSelect.disabled = true;

        this.timer = setInterval(() => {
            this.timeLeft--;
            this.timerDisplay.textContent = this.timeLeft;

            if (this.timeLeft <= 0) {
                this.endTest();
            }
        }, 1000);
    }

    handleTyping() {
        if (!this.isTestActive) return;

        const inputValue = this.typingInput.value;
        const currentTyped = inputValue.length;
        this.currentPosition = currentTyped;

        let errorsInCurrent = 0;
        for (let i = 0; i < currentTyped; i++) {
            if (inputValue[i] !== this.currentText[i]) errorsInCurrent++;
        }

        this.totalTyped = this.cumulativeTyped + currentTyped;
        this.errors = this.cumulativeErrors + errorsInCurrent;

        this.updateTextDisplay();
        this.updateStats();

        if (currentTyped >= this.currentText.length) {
            this.cumulativeTyped += this.currentText.length;
            this.cumulativeErrors += errorsInCurrent;
            setTimeout(() => {
                if (this.isTestActive) {
                    this.loadNewText();
                    this.typingInput.focus();
                }
            }, 250);
        }
    }

    updateStats() {
        if (!this.startTime) return;
        const timeElapsed = (Date.now() - this.startTime) / 1000 / 60;
        if (timeElapsed <= 0) return;

        const wordsTyped = this.totalTyped / 5;
        const wpm = Math.round(wordsTyped / timeElapsed) || 0;
        const accuracy = this.totalTyped > 0
            ? Math.round(((this.totalTyped - this.errors) / this.totalTyped) * 100)
            : 100;
        if (this.wpmDisplay) this.wpmDisplay.textContent = wpm;
        if (this.accuracyDisplay) this.accuracyDisplay.textContent = accuracy + "%";
    }

    endTest() {
        this.isTestActive = false;
        clearInterval(this.timer);
        this.typingInput.disabled = true;

        const inputValue = this.typingInput.value || "";
        let errorsInCurrent = 0;
        for (let i = 0; i < inputValue.length; i++) {
            if (inputValue[i] !== this.currentText[i]) errorsInCurrent++;
        }
        const finalTotal = this.cumulativeTyped + inputValue.length;
        const finalErrors = this.cumulativeErrors + errorsInCurrent;

        const timeElapsed = (Date.now() - this.startTime) / 1000 / 60;
        const wordsTyped = finalTotal / 5;
        const finalWpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
        const finalAccuracy = finalTotal > 0 ? Math.round(((finalTotal - finalErrors) / finalTotal) * 100) : 100;
        const correctChars = Math.max(finalTotal - finalErrors, 0);

        document.getElementById('final-wpm').textContent = finalWpm;
        document.getElementById('final-accuracy').textContent = finalAccuracy + "%";
        document.getElementById('final-correct').textContent = correctChars;
        document.getElementById('final-incorrect').textContent = finalErrors;

        this.resultsModal.classList.remove('hidden');
    }

    resetTest() {
        this.isTestActive = false;
        this.currentPosition = 0;
        this.startTime = null;
        this.cumulativeTyped = 0;
        this.cumulativeErrors = 0;
        this.totalTyped = 0;
        this.errors = 0;
        this.timeLeft = parseInt(this.timeSelect.value) || 60;

        clearInterval(this.timer);

        this.typingInput.value = '';
        this.typingInput.disabled = true;
        this.startBtn.disabled = false;
        this.resetBtn.disabled = true;
        this.timeSelect.disabled = false;

        this.timerDisplay.textContent = this.timeLeft;
        this.wpmDisplay.textContent = '0';
        this.accuracyDisplay.textContent = '100%';
        this.resultsModal.classList.add('hidden');
        this.loadNewText();
    }

    updateTimeLimit() {
        this.timeLeft = parseInt(this.timeSelect.value) || this.timeLeft;
        this.timerDisplay.textContent = this.timeLeft;
        this.loadNewText();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TypingSpeedTest();
});
