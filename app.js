// Pastel Colors for roulette segments
const PASTEL_COLORS = [
    '#FFB3D9', // Pink
    '#B3D9FF', // Blue
    '#B3FFD9', // Green
    '#FFFFB3', // Yellow
    '#D9B3FF', // Purple
    '#FFD9B3', // Peach
    '#C9FFB3', // Light Green
    '#FFB3E5', // Magenta
];

class RouletteApp {
    constructor() {
        this.options = [];
        this.isSpinning = false;
        this.currentRotation = 0;
        this.appContainer = document.getElementById('app');
        
        this.render();
        this.attachEventListeners();
    }
    
    createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --pastel-pink: #FFB3D9;
                --pastel-blue: #B3D9FF;
                --pastel-green: #B3FFD9;
                --pastel-yellow: #FFFFB3;
                --pastel-purple: #D9B3FF;
                --pastel-peach: #FFD9B3;
                --light-gray: #F5F5F5;
                --dark-gray: #333333;
            }
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #FFB3D9 0%, #B3D9FF 50%, #B3FFD9 100%);
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
                max-width: 600px;
                width: 100%;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            }
            
            h1 {
                text-align: center;
                color: var(--dark-gray);
                margin-bottom: 30px;
                font-size: 2.5em;
            }
            
            .input-section {
                margin-bottom: 30px;
            }
            
            .input-group {
                display: flex;
                gap: 10px;
                margin-bottom: 15px;
            }
            
            input[type="text"] {
                flex: 1;
                padding: 12px 16px;
                border: 2px solid var(--pastel-pink);
                border-radius: 10px;
                font-size: 1em;
                transition: all 0.3s ease;
            }
            
            input[type="text"]:focus {
                outline: none;
                border-color: #FF69B4;
                box-shadow: 0 0 10px rgba(255, 105, 180, 0.2);
            }
            
            button {
                transition: all 0.3s ease;
                border: none;
                border-radius: 10px;
                font-weight: bold;
                cursor: pointer;
            }
            
            .btn-add {
                padding: 12px 24px;
                background: linear-gradient(135deg, var(--pastel-pink), #FFB3D9);
                color: white;
                font-size: 1em;
            }
            
            .btn-add:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(255, 105, 180, 0.3);
            }
            
            .btn-add:active {
                transform: translateY(0);
            }
            
            .btn-clear {
                width: 100%;
                padding: 10px;
                background: #E8E8E8;
                color: var(--dark-gray);
                font-size: 0.9em;
            }
            
            .btn-clear:hover {
                background: #D0D0D0;
            }
            
            .options-list {
                margin-bottom: 30px;
            }
            
            .options-list h3 {
                color: var(--dark-gray);
                margin-bottom: 15px;
                font-size: 1.1em;
            }
            
            .options-list ul {
                list-style: none;
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            
            .option-tag {
                background: linear-gradient(135deg, var(--pastel-blue), #B3D9FF);
                color: var(--dark-gray);
                padding: 8px 16px;
                border-radius: 20px;
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: 500;
                animation: slideIn 0.3s ease;
            }
            
            .option-tag button {
                background: rgba(255, 255, 255, 0.6);
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                color: var(--dark-gray);
                padding: 0;
            }
            
            .option-tag button:hover {
                background: rgba(255, 255, 255, 0.9);
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .roulette-section {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 30px;
            }
            
            .roulette-container {
                position: relative;
                width: 300px;
                height: 300px;
                margin-bottom: 30px;
            }
            
            canvas {
                width: 300px;
                height: 300px;
                display: block;
                border-radius: 50%;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
            }
            
            .needle {
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 12px solid transparent;
                border-right: 12px solid transparent;
                border-top: 30px solid #FF6B9D;
                z-index: 10;
                filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
            }
            
            .result-display {
                text-align: center;
                min-height: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .result-display h2 {
                font-size: 1.5em;
                color: var(--dark-gray);
                animation: popIn 0.5s ease;
            }
            
            @keyframes popIn {
                0% {
                    opacity: 0;
                    transform: scale(0.5);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            .btn-start {
                width: 100%;
                padding: 16px;
                background: linear-gradient(135deg, var(--pastel-green), #B3FFD9);
                color: var(--dark-gray);
                font-size: 1.2em;
            }
            
            .btn-start:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(179, 255, 217, 0.4);
            }
            
            .btn-start:active:not(:disabled) {
                transform: translateY(0);
            }
            
            .btn-start:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            @media (max-width: 600px) {
                .container {
                    padding: 20px;
                }
                
                h1 {
                    font-size: 2em;
                }
                
                .roulette-container {
                    width: 250px;
                    height: 250px;
                }
                
                canvas {
                    width: 250px;
                    height: 250px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    render() {
        this.createStyles();
        
        const html = `
            <div class="container">
                <h1>🎡 ルーレットアプリ</h1>
                
                <div class="input-section">
                    <div class="input-group">
                        <input 
                            type="text" 
                            id="optionInput" 
                            placeholder="候補を入力してください"
                            autocomplete="off"
                        >
                        <button id="addBtn" class="btn-add">追加</button>
                    </div>
                    <button id="clearBtn" class="btn-clear">リセット</button>
                </div>
                
                <div class="options-list">
                    <h3>候補一覧</h3>
                    <ul id="optionsList"></ul>
                </div>
                
                <div class="roulette-section">
                    <div class="roulette-container">
                        <canvas id="rouletteCanvas" width="400" height="400"></canvas>
                        <div class="needle"></div>
                    </div>
                    <div class="result-display" id="resultDisplay"></div>
                </div>
                
                <button id="startBtn" class="btn-start" disabled>スタート</button>
            </div>
        `;
        
        this.appContainer.innerHTML = html;
        
        this.optionInput = document.getElementById('optionInput');
        this.addBtn = document.getElementById('addBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.optionsList = document.getElementById('optionsList');
        this.startBtn = document.getElementById('startBtn');
        this.canvas = document.getElementById('rouletteCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resultDisplay = document.getElementById('resultDisplay');
    }
    
    attachEventListeners() {
        this.addBtn.addEventListener('click', () => this.addOption());
        this.optionInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addOption();
        });
        this.clearBtn.addEventListener('click', () => this.resetApp());
        this.startBtn.addEventListener('click', () => this.spin());
    }
    
    addOption() {
        const value = this.optionInput.value.trim();
        if (value === '') {
            alert('候補を入力してください');
            return;
        }
        
        if (this.options.includes(value)) {
            alert('同じ候補は追加できません');
            return;
        }
        
        if (this.options.length >= 8) {
            alert('候補は最大8個までです');
            return;
        }
        
        this.options.push(value);
        this.optionInput.value = '';
        this.updateUI();
    }
    
    removeOption(index) {
        this.options.splice(index, 1);
        this.updateUI();
    }
    
    updateUI() {
        // Update options list
        this.optionsList.innerHTML = '';
        this.options.forEach((option, index) => {
            const li = document.createElement('li');
            li.className = 'option-tag';
            li.innerHTML = `
                ${option}
                <button onclick="window.app.removeOption(${index})">×</button>
            `;
            this.optionsList.appendChild(li);
        });
        
        // Enable/disable start button
        this.startBtn.disabled = this.options.length < 2;
        
        // Redraw roulette
        this.drawRoulette();
        this.resultDisplay.innerHTML = '';
    }
    
    drawRoulette() {
        if (this.options.length === 0) {
            this.ctx.fillStyle = '#E8E8E8';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#999';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.font = '16px sans-serif';
            this.ctx.fillText('候補を2個以上追加してください', 200, 200);
            return;
        }
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = 190;
        const sliceAngle = (2 * Math.PI) / this.options.length;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw circle background
        this.ctx.fillStyle = '#FFF';
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.strokeStyle = '#DDD';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Draw segments
        this.options.forEach((option, index) => {
            const startAngle = index * sliceAngle + this.currentRotation;
            const endAngle = startAngle + sliceAngle;
            
            // Draw segment
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            this.ctx.closePath();
            this.ctx.fillStyle = PASTEL_COLORS[index % PASTEL_COLORS.length];
            this.ctx.fill();
            this.ctx.strokeStyle = '#FFF';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            
            // Draw text
            const textAngle = startAngle + sliceAngle / 2;
            const textX = centerX + Math.cos(textAngle) * (radius * 0.65);
            const textY = centerY + Math.sin(textAngle) * (radius * 0.65);
            
            this.ctx.save();
            this.ctx.translate(textX, textY);
            this.ctx.rotate(textAngle + Math.PI / 2);
            this.ctx.fillStyle = '#333';
            this.ctx.font = 'bold 14px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            // Wrap text if needed
            const maxWidth = radius * 0.4;
            this.wrapText(this.ctx, option, 0, 0, maxWidth, 18);
            
            this.ctx.restore();
        });
        
        // Draw center circle
        this.ctx.fillStyle = '#FFF';
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.strokeStyle = '#FF6B9D';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
    }
    
    wrapText(context, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        let lines = [];
        
        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            
            if (testWidth > maxWidth && i > 0) {
                lines.push(line);
                line = words[i] + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line);
        
        const totalHeight = lines.length * lineHeight;
        let currentY = y - (totalHeight / 2) + lineHeight / 2;
        
        lines.forEach(line => {
            context.fillText(line.trim(), x, currentY);
            currentY += lineHeight;
        });
    }
    
    spin() {
        if (this.isSpinning || this.options.length < 2) return;
        
        this.isSpinning = true;
        this.startBtn.disabled = true;
        this.resultDisplay.innerHTML = '';
        
        // Fast spinning for 3 seconds
        const spinDuration = 3000; // 3 seconds
        const startTime = Date.now();
        const spinSpeed = 30; // rotations
        
        const spinAnimation = () => {
            const elapsed = Date.now() - startTime;
            
            if (elapsed < spinDuration) {
                this.currentRotation += (spinSpeed * 2 * Math.PI) / 1000 * 0.016; // smooth rotation
                this.drawRoulette();
                requestAnimationFrame(spinAnimation);
            } else {
                // After 3 seconds, slow down for 2 seconds
                this.slowDownSpin();
            }
        };
        
        spinAnimation();
    }
    
    slowDownSpin() {
        const slowDuration = 2000; // 2 seconds
        const startTime = Date.now();
        const finalRotation = Math.random() * 2 * Math.PI;
        const initialRotation = this.currentRotation;
        
        const slowAnimation = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / slowDuration, 1);
            
            // Ease out cubic for deceleration
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            this.currentRotation = initialRotation + (finalRotation - initialRotation) * easeProgress;
            
            this.drawRoulette();
            
            if (elapsed < slowDuration) {
                requestAnimationFrame(slowAnimation);
            } else {
                this.showResult();
            }
        };
        
        slowAnimation();
    }
    
    showResult() {
        // Calculate which option is at the top (needle position)
        const sliceAngle = (2 * Math.PI) / this.options.length;
        const normalizedRotation = ((this.currentRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const selectedIndex = Math.floor((2 * Math.PI - normalizedRotation) / sliceAngle) % this.options.length;
        const selectedOption = this.options[selectedIndex];
        
        this.resultDisplay.innerHTML = `<h2>🎉 ${selectedOption} 🎉</h2>`;
        
        this.isSpinning = false;
        this.startBtn.disabled = false;
    }
    
    resetApp() {
        this.options = [];
        this.currentRotation = 0;
        this.optionInput.value = '';
        this.resultDisplay.innerHTML = '';
        this.updateUI();
    }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new RouletteApp();
});
