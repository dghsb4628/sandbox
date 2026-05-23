// 小学6年生レベルの算数計算ドリルアプリ
class MathDrillApp {
    constructor() {
        this.currentQuestion = null;
        this.score = 0;
        this.total = 0;
        this.appContainer = document.getElementById('app');
        
        this.render();
        this.attachEventListeners();
        this.nextQuestion();
    }
    
    // アプリ全体のデザイン（CSS）を注入
    createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --pastel-blue: #B3D9FF;
                --pastel-purple: #D9B3FF;
                --pastel-yellow: #FFFFB3;
                --pastel-green: #B3FFD9;
                --dark-gray: #333333;
                --success-color: #2ecc71;
                --error-color: #e74c3c;
            }
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, var(--pastel-blue) 0%, var(--pastel-purple) 100%);
                min-height: 100vh;
                padding: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .container {
                background: white;
                border-radius: 20px;
                padding: 40px;
                max-width: 550px;
                width: 100%;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            
            h1 {
                color: var(--dark-gray);
                margin-bottom: 5px;
                font-size: 2em;
            }
            
            .subtitle {
                color: #666;
                font-size: 0.9em;
                margin-bottom: 25px;
            }
            
            .score-board {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin-bottom: 30px;
                font-weight: bold;
                color: var(--dark-gray);
                background: #f9f9f9;
                padding: 10px;
                border-radius: 10px;
            }
            
            .formula-section {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 12px;
                min-height: 120px;
                margin-bottom: 30px;
                font-size: 2.4em;
                color: var(--dark-gray);
                font-weight: 600;
                background: #fffdf0;
                border: 2px dashed var(--pastel-yellow);
                border-radius: 15px;
                padding: 20px;
            }
            
            /* 分数を縦に綺麗に並べるためのスタイル */
            .fraction-container {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                vertical-align: middle;
                line-height: 1.1;
                padding: 0 6px;
            }
            .numerator {
                font-size: 0.8em;
                padding-bottom: 2px;
            }
            .fraction-line {
                width: 100%;
                height: 3px;
                background-color: var(--dark-gray);
                border-radius: 2px;
            }
            .denominator {
                font-size: 0.8em;
                padding-top: 2px;
            }
            
            .input-section {
                margin-bottom: 30px;
            }
            
            .answer-input {
                width: 100%;
                max-width: 240px;
                padding: 15px;
                font-size: 1.6em;
                text-align: center;
                border: 3px solid var(--pastel-blue);
                border-radius: 12px;
                outline: none;
                transition: all 0.3s ease;
            }
            
            .answer-input:focus {
                border-color: #4a90e2;
                box-shadow: 0 0 10px rgba(74, 144, 226, 0.2);
            }
            
            /* ボタンのスタイル */
            button {
                padding: 14px 35px;
                font-size: 1.2em;
                font-weight: bold;
                border: none;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.2s ease;
                width: 100%;
                max-width: 240px;
            }
            
            .btn-submit {
                background: linear-gradient(135deg, #FFB3D9, #ff94c2);
                color: white;
                box-shadow: 0 4px 15px rgba(255, 179, 217, 0.4);
            }
            
            .btn-submit:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(255, 179, 217, 0.6);
            }
            
            .btn-next {
                background: linear-gradient(135deg, var(--pastel-green), #8affc1);
                color: var(--dark-gray);
                box-shadow: 0 4px 15px rgba(179, 255, 217, 0.4);
                display: none;
            }
            
            .btn-next:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(179, 255, 217, 0.6);
            }
            
            button:active {
                transform: translateY(0);
            }
            
            /* 結果アニメーション */
            .result-section {
                min-height: 80px;
                margin-top: 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            
            .result-message {
                font-size: 2em;
                font-weight: bold;
                animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            
            .result-correct {
                color: var(--success-color);
            }
            
            .result-incorrect {
                color: var(--error-color);
            }
            
            @keyframes popIn {
                0% { opacity: 0; transform: scale(0.7); }
                100% { opacity: 1; transform: scale(1); }
            }
            
            @media (max-width: 500px) {
                .container { padding: 25px; }
                .formula-section { font-size: 1.8em; min-height: 100px; }
                h1 { font-size: 1.6em; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // HTML構造のレンダリング
    render() {
        this.createStyles();
        
        const html = `
            <div class="container">
                <h1>🧮 算数計算ドリル</h1>
                <div class="subtitle">小学6年生レベル（分数・小数の混合計算）</div>
                
                <div class="score-board">
                    <div>正解数: <span id="scoreText">0</span></div>
                    <div>解いた数: <span id="totalText">0</span></div>
                </div>
                
                <div class="formula-section" id="formulaContainer">
                    </div>
                
                <div class="input-section">
                    <input 
                        type="number" 
                        step="any" 
                        id="answerInput" 
                        class="answer-input" 
                        placeholder="答えを入力"
                        autocomplete="off"
                    >
                </div>
                
                <div style="display: flex; justify-content: center;">
                    <button id="submitBtn" class="btn-submit">採点</button>
                    <button id="nextBtn" class="btn-next">次の問題へ</button>
                </div>
                
                <div class="result-section" id="resultContainer"></div>
            </div>
        `;
        
        this.appContainer.innerHTML = html;
        
        this.formulaContainer = document.getElementById('formulaContainer');
        this.answerInput = document.getElementById('answerInput');
        this.submitBtn = document.getElementById('submitBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.resultContainer = document.getElementById('resultContainer');
        this.scoreText = document.getElementById('scoreText');
        this.totalText = document.getElementById('totalText');
    }
    
    attachEventListeners() {
        this.submitBtn.addEventListener('click', () => this.checkAnswer());
        
        // Enterキーでも採点・次へ進むができるように設定
        this.answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if (this.submitBtn.style.display !== 'none') {
                    this.checkAnswer();
                } else {
                    this.nextQuestion();
                }
            }
        });
        
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
    }
    
    // 小学6年生レベルの問題をランダムに自動生成するロジック
    generateQuestion() {
        const types = ['decimal-mul', 'decimal-div', 'mixed-fraction', 'mixed-nested'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        let html = '';
        let answer = 0;
        
        switch(type) {
            case 'decimal-mul': {
                // 小数の掛け算 (例: 2.4 × 1.5)
                const a = (Math.floor(Math.random() * 80) + 11) / 10; // 1.1 ~ 9.0
                const b = [0.2, 0.4, 0.5, 0.6, 0.8, 1.2, 1.5, 2.5][Math.floor(Math.random() * 8)];
                answer = a * b;
                html = `<span>${a} × ${b} ＝</span>`;
                break;
            }
            case 'decimal-div': {
                // 小数の割り算 (割り切れるものを逆算して生成)
                const b = [0.3, 0.4, 0.5, 0.6, 0.8, 1.2, 1.5][Math.floor(Math.random() * 7)];
                const ans = (Math.floor(Math.random() * 25) + 5) / 10; // 0.5 ~ 2.9
                const a = Math.round(b * ans * 100) / 100;
                answer = ans;
                html = `<span>${a} ÷ ${b} ＝</span>`;
                break;
            }
            case 'mixed-fraction': {
                // 分数と小数の混ざった計算 (答えが整数か小数にきれいに収まるもの)
                const fractions = [
                    {n: 1, d: 2, v: 0.5},
                    {n: 1, d: 4, v: 0.25},
                    {n: 3, d: 4, v: 0.75},
                    {n: 1, d: 5, v: 0.2},
                    {n: 2, d: 5, v: 0.4},
                    {n: 3, d: 5, v: 0.6},
                    {n: 4, d: 5, v: 0.8}
                ];
                const f = fractions[Math.floor(Math.random() * fractions.length)];
                const b = (Math.floor(Math.random() * 12) + 1) / 10; // 0.1 ~ 1.2
                const op = ['＋', '－', '×'][Math.floor(Math.random() * 3)];
                
                if (op === '＋') {
                    answer = f.v + b;
                    html = `${this.renderFraction(f.n, f.d)} <span> ＋ ${b} ＝</span>`;
                } else if (op === '－') {
                    if (b > f.v) {
                        answer = b - f.v;
                        html = `<span>${b} － </span> ${this.renderFraction(f.n, f.d)} <span> ＝</span>`;
                    } else {
                        answer = f.v - b;
                        html = `${this.renderFraction(f.n, f.d)} <span> － ${b} ＝</span>`;
                    }
                } else {
                    answer = f.v * b;
                    html = `${this.renderFraction(f.n, f.d)} <span> × ${b} ＝</span>`;
                }
                break;
            }
            case 'mixed-nested': {
                // カッコのある複雑な四則混合計算
                const op = Math.random() > 0.5 ? '＋' : '－';
                if (op === '＋') {
                    const a = (Math.floor(Math.random() * 30) + 10) / 10;
                    const b = (Math.floor(Math.random() * 30) + 10) / 10;
                    const c = [0.2, 0.5, 2, 3][Math.floor(Math.random() * 4)];
                    answer = (a + b) * c;
                    html = `<span>（ ${a} ＋ ${b} ） × ${c} ＝</span>`;
                } else {
                    const b = (Math.floor(Math.random() * 20) + 10) / 10;
                    const ans = (Math.floor(Math.random() * 5) + 1);
                    const c = [0.4, 0.5, 0.6, 0.8, 1.2][Math.floor(Math.random() * 5)];
                    const diff = Math.round(ans * c * 10) / 10;
                    const a = Math.round((diff + b) * 10) / 10;
                    answer = ans;
                    html = `<span>（ ${a} － ${b} ） ÷ ${c} ＝</span>`;
                }
                break;
            }
        }
        
        // JavaScriptの浮動小数点数による計算誤差を修正 (小数点第3位まで丸める)
        answer = Math.round(answer * 1000) / 1000;
        return { html, answer };
    }
    
    // 分数用HTMLの生成
    renderFraction(n, d) {
        return `
            <div class="fraction-container">
                <span class="numerator">${n}</span>
                <span class="fraction-line"></span>
                <span class="denominator">${d}</span>
            </div>
        `;
    }
    
    // 次の問題をセット
    nextQuestion() {
        this.currentQuestion = this.generateQuestion();
        this.formulaContainer.innerHTML = this.currentQuestion.html;
        this.answerInput.value = '';
        this.answerInput.disabled = false;
        this.resultContainer.innerHTML = '';
        
        this.submitBtn.style.display = 'block';
        this.nextBtn.style.display = 'none';
        this.answerInput.focus();
    }
    
    // 採点処理
    checkAnswer() {
        const userInput = this.answerInput.value.trim();
        if (userInput === '') {
            alert('答えを入力してください！');
            return;
        }
        
        const userNum = Math.round(parseFloat(userInput) * 1000) / 1000;
        const isCorrect = userNum === this.currentQuestion.answer;
        
        this.total++;
        this.totalText.textContent = this.total;
        
        this.answerInput.disabled = true;
        this.submitBtn.style.display = 'none';
        this.nextBtn.style.display = 'block';
        
        if (isCorrect) {
            this.score++;
            this.scoreText.textContent = this.score;
            this.resultContainer.innerHTML = `<div class="result-message result-correct">🎉 おめでとう！🎉</div>`;
        } else {
            this.resultContainer.innerHTML = `
                <div class="result-message result-incorrect">❌ 不正解！</div>
                <div style="margin-top: 8px; color: #666; font-size: 0.9em;">正解は <strong>${this.currentQuestion.answer}</strong> でした</div>
            `;
        }
    }
}

// DOMが読み込まれたらアプリを起動
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MathDrillApp();
});
