// クレーンゲームアプリ
class CraneGameApp {
    constructor() {
        this.appContainer = document.getElementById('app');
        
        // クレーンの位置と状態
        this.craneX = 50; // 左からのパーセンテージ (0-100)
        this.craneZ = 10; // 上からのパーセンテージ（奥行き表現） (0-40)
        this.isMoving = false; // アーム降下中かどうか
        
        // キーボードの入力状態
        this.keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false
        };
        
        // 景品リスト
        this.prizes = ['🧸', '🎁', '🐼', '🐰', '💎', '👑'];
        
        this.render();
        this.attachEventListeners();
        this.startGameLoop();
        this.scatterPrizes();
    }
    
    // アプリ全体のデザイン（CSS）を注入
    createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --arcade-pink: #ff7eb3;
                --arcade-blue: #7eb3ff;
                --machine-bg: #ffe6f2;
                --dark-gray: #333;
                --claw-color: #c0c0c0;
            }
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                min-height: 100vh;
                padding: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: var(--dark-gray);
            }
            
            .container {
                background: white;
                border-radius: 20px;
                padding: 30px;
                width: 100%;
                max-width: 450px;
                box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
                text-align: center;
            }
            
            h1 {
                color: var(--arcade-pink);
                margin-bottom: 5px;
                font-size: 2em;
                text-shadow: 2px 2px 0px rgba(255, 126, 179, 0.2);
            }
            
            .subtitle {
                color: #666;
                font-size: 0.9em;
                margin-bottom: 20px;
            }
            
            /* クレーンゲームの筐体画面 */
            .game-screen {
                position: relative;
                width: 100%;
                height: 400px;
                background: var(--machine-bg);
                border: 8px solid var(--arcade-pink);
                border-radius: 15px;
                border-bottom-width: 30px;
                overflow: hidden;
                margin-bottom: 20px;
                box-shadow: inset 0 0 20px rgba(0,0,0,0.1);
            }
            
            /* 背景のストライプ模様 */
            .game-screen::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 20px,
                    rgba(255, 255, 255, 0.5) 20px,
                    rgba(255, 255, 255, 0.5) 40px
                );
                z-index: 1;
            }
            
            /* アーム全体のコンテナ */
            .crane-system {
                position: absolute;
                top: 10%; /* Z軸（奥行き）で変化 */
                left: 50%; /* X軸（左右）で変化 */
                transform: translateX(-50%);
                z-index: 10;
                display: flex;
                flex-direction: column;
                align-items: center;
                transition: top 0.1s, left 0.1s; /* キー操作用の滑らかな補間 */
            }
            
            /* 吊り下げているワイヤー */
            .wire {
                width: 4px;
                height: 20px; /* ここが伸びて降下する */
                background: #999;
                transition: height 1s cubic-bezier(0.25, 0.1, 0.25, 1);
            }
            
            /* アームの土台 */
            .claw-base {
                width: 40px;
                height: 20px;
                background: var(--arcade-blue);
                border-radius: 5px;
                border: 2px solid #5a8ecc;
                position: relative;
                z-index: 2;
            }
            
            /* アームの爪（左右） */
            .prongs {
                display: flex;
                justify-content: space-between;
                width: 70px;
                margin-top: -5px;
            }
            
            .prong {
                width: 15px;
                height: 40px;
                border: 4px solid var(--claw-color);
                border-top: none;
                transition: transform 0.3s ease;
            }
            
            .prong.left {
                border-right: none;
                border-radius: 0 0 0 15px;
                transform-origin: top right;
                transform: rotate(20deg);
            }
            
            .prong.right {
                border-left: none;
                border-radius: 0 0 15px 0;
                transform-origin: top left;
                transform: rotate(-20deg);
            }
            
            /* アームが閉じた状態 */
            .crane-system.closed .prong.left { transform: rotate(0deg); }
            .crane-system.closed .prong.right { transform: rotate(0deg); }
            
            /* 獲得した景品がアームに挟まる部分 */
            .caught-prize {
                position: absolute;
                top: 35px;
                font-size: 2.5em;
                opacity: 0;
                transition: opacity 0.2s;
                pointer-events: none;
            }
            
            .crane-system.has-prize .caught-prize {
                opacity: 1;
            }
            
            /* 下部の景品エリア */
            .prize-area {
                position: absolute;
                bottom: -10px;
                width: 100%;
                height: 100px;
                z-index: 5;
            }
            
            .scattered-prize {
                position: absolute;
                font-size: 3em;
                filter: drop-shadow(0 5px 5px rgba(0,0,0,0.2));
            }
            
            /* コントロール部分 */
            .controls {
                display: flex;
                flex-direction: column;
                gap: 15px;
                align-items: center;
            }
            
            .btn-go {
                background: linear-gradient(135deg, #ff4757, #ff6b81);
                color: white;
                font-size: 1.8em;
                font-weight: bold;
                padding: 15px 60px;
                border: none;
                border-radius: 50px;
                cursor: pointer;
                box-shadow: 0 6px 0 #cf3a46, 0 10px 20px rgba(255, 71, 87, 0.4);
                transition: all 0.1s ease;
            }
            
            .btn-go:hover:not(:disabled) {
                transform: translateY(2px);
                box-shadow: 0 4px 0 #cf3a46, 0 8px 15px rgba(255, 71, 87, 0.4);
            }
            
            .btn-go:active:not(:disabled) {
                transform: translateY(6px);
                box-shadow: 0 0 0 #cf3a46, 0 4px 5px rgba(255, 71, 87, 0.4);
            }
            
            .btn-go:disabled {
                background: #ccc;
                box-shadow: 0 6px 0 #999;
                cursor: not-allowed;
                transform: none;
            }
            
            .instructions {
                display: flex;
                gap: 10px;
                justify-content: center;
                align-items: center;
                background: #f5f5f5;
                padding: 10px 20px;
                border-radius: 10px;
                font-weight: bold;
                color: #555;
            }
            
            .key-icon {
                background: white;
                border: 2px solid #ddd;
                border-radius: 5px;
                padding: 2px 8px;
                box-shadow: 0 2px 0 #ddd;
            }

            /* 結果表示モーダル */
            #resultMessage {
                min-height: 30px;
                font-size: 1.2em;
                font-weight: bold;
                color: var(--arcade-pink);
                margin-top: 15px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // HTML構造のレンダリング
    render() {
        this.createStyles();
        
        const html = `
            <div class="container">
                <h1>🛸 クレーンゲーム</h1>
                <div class="subtitle">前後左右（矢印キー）で狙いを定めてGO！</div>
                
                <div class="game-screen">
                    <div class="crane-system" id="craneSystem">
                        <div class="wire" id="craneWire"></div>
                        <div class="claw-base"></div>
                        <div class="prongs">
                            <div class="prong left"></div>
                            <div class="prong right"></div>
                        </div>
                        <div class="caught-prize" id="caughtPrize">🧸</div>
                    </div>
                    
                    <div class="prize-area" id="prizeArea">
                        </div>
                </div>
                
                <div class="controls">
                    <div class="instructions">
                        操作: <span class="key-icon">↑</span><span class="key-icon">↓</span><span class="key-icon">←</span><span class="key-icon">→</span>
                    </div>
                    <button id="btnGo" class="btn-go">GO</button>
                    <div id="resultMessage"></div>
                </div>
            </div>
        `;
        
        this.appContainer.innerHTML = html;
        
        // DOM要素の取得
        this.craneSystem = document.getElementById('craneSystem');
        this.craneWire = document.getElementById('craneWire');
        this.btnGo = document.getElementById('btnGo');
        this.resultMessage = document.getElementById('resultMessage');
        this.prizeArea = document.getElementById('prizeArea');
        this.caughtPrize = document.getElementById('caughtPrize');
    }
    
    // 景品をランダムに配置する
    scatterPrizes() {
        this.prizeArea.innerHTML = '';
        for (let i = 0; i < 15; i++) {
            const prize = document.createElement('div');
            prize.className = 'scattered-prize';
            prize.textContent = this.prizes[Math.floor(Math.random() * this.prizes.length)];
            
            // ランダムな位置と角度
            const left = Math.random() * 80 + 5; // 5% ~ 85%
            const bottom = Math.random() * 40; // 0px ~ 40px
            const rotate = Math.random() * 60 - 30; // -30deg ~ 30deg
            
            prize.style.left = \`\${left}%\`;
            prize.style.bottom = \`\${bottom}px\`;
            prize.style.transform = \`rotate(\${rotate}deg)\`;
            
            this.prizeArea.appendChild(prize);
        }
    }
    
    // イベントリスナーの登録
    attachEventListeners() {
        // キーが押された時
        document.addEventListener('keydown', (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault(); // 画面がスクロールしないようにする
                if (!this.isMoving) {
                    this.keys[e.key] = true;
                }
            }
        });
        
        // キーが離された時
        document.addEventListener('keyup', (e) => {
            if (this.keys.hasOwnProperty(e.key)) {
                this.keys[e.key] = false;
            }
        });
        
        // GOボタン
        this.btnGo.addEventListener('click', () => this.dropCrane());
    }
    
    // ゲームループ（滑らかな移動処理）
    startGameLoop() {
        setInterval(() => {
            if (this.isMoving) return; // 降下中は動かせない
            
            const speed = 1.5;
            let moved = false;
            
            // X軸（左右）の移動
            if (this.keys.ArrowLeft) { this.craneX -= speed; moved = true; }
            if (this.keys.ArrowRight) { this.craneX += speed; moved = true; }
            // Z軸（前後＝画面上では上下）の移動
            if (this.keys.ArrowUp) { this.craneZ -= speed; moved = true; }
            if (this.keys.ArrowDown) { this.craneZ += speed; moved = true; }
            
            // 画面外に出ないように制限
            this.craneX = Math.max(5, Math.min(95, this.craneX));
            this.craneZ = Math.max(5, Math.min(45, this.craneZ));
            
            if (moved) {
                this.updateCraneVisual();
                this.resultMessage.textContent = ''; // 動かしたらメッセージを消す
            }
        }, 20); // 約50FPSで更新
    }
    
    // クレーンの見た目を更新
    updateCraneVisual() {
        this.craneSystem.style.left = \`\${this.craneX}%\`;
        this.craneSystem.style.top = \`\${this.craneZ}%\`;
    }
    
    // クレーンを降下させる処理
    dropCrane() {
        if (this.isMoving) return;
        
        this.isMoving = true;
        this.btnGo.disabled = true;
        this.resultMessage.textContent = 'アーム降下中...';
        
        // 1. ワイヤーを伸ばして下へ
        const dropHeight = 250 - (this.craneZ * 2.5); // 奥行きによって降下距離を調整
        this.craneWire.style.height = \`\${dropHeight}px\`;
        
        // 2. 下まで到達したらアームを閉じる
        setTimeout(() => {
            this.craneSystem.classList.add('closed');
            
            // 3. 確率計算（2分の1の確率でゲット）
            const isSuccess = Math.random() < 0.5;
            
            if (isSuccess) {
                // ランダムな景品をアームの中に表示
                const randomPrize = this.prizes[Math.floor(Math.random() * this.prizes.length)];
                this.caughtPrize.textContent = randomPrize;
                this.craneSystem.classList.add('has-prize');
            }
            
            // 4. 少し待ってからアームを上に戻す
            setTimeout(() => {
                this.craneWire.style.height = '20px'; // ワイヤーを元の長さに
                
                // 5. 上まで戻りきったら結果表示
                setTimeout(() => {
                    if (isSuccess) {
                        this.resultMessage.style.color = '#2ecc71';
                        this.resultMessage.textContent = '🎉 おめでとう！景品ゲット！ 🎉';
                    } else {
                        this.resultMessage.style.color = '#e74c3c';
                        this.resultMessage.textContent = '💦 残念！アームがすっぽ抜けました...';
                    }
                    
                    // アームを開いて初期状態に戻す
                    this.resetCrane();
                    
                }, 1000); // 戻るアニメーションの時間
                
            }, 600); // 下で掴んでいる時間
            
        }, 1000); // 降りるアニメーションの時間
    }
    
    // クレーンを初期状態に戻す
    resetCrane() {
        setTimeout(() => {
            this.craneSystem.classList.remove('closed');
            this.craneSystem.classList.remove('has-prize');
            this.isMoving = false;
            this.btnGo.disabled = false;
        }, 1500); // 結果を少し見せてからリセット
    }
}

// DOMが読み込まれたらアプリを起動
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CraneGameApp();
});
