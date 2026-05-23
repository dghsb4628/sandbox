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
        
        this.optionInput = document.getElementById('optionInput');
        this.addBtn = document.getElementById('addBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.optionsList = document.getElementById('optionsList');
        this.startBtn = document.getElementById('startBtn');
        this.canvas = document.getElementById('rouletteCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resultDisplay = document.getElementById('resultDisplay');
        
        this.initEventListeners();
        this.drawRoulette();
    }
    
    initEventListeners() {
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
                <button onclick="app.removeOption(${index})">×</button>
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
