// 日付をフォーマットする関数
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
    const weekDay = weekDays[date.getDay()];
    return `${year}年${month}月${day}日（${weekDay}）`;
}

// 現在の日付を表示
function displayCurrentDate() {
    const currentDate = new Date();
    document.getElementById('currentDate').textContent = formatDate(currentDate);
}

// ローカルストレージから日記を取得
function getDiariesFromStorage() {
    const diaries = localStorage.getItem('diaries');
    return diaries ? JSON.parse(diaries) : [];
}

// ローカルストレージに日記を保存
function saveDiariesToStorage(diaries) {
    localStorage.setItem('diaries', JSON.stringify(diaries));
}

// 日記を保存
function saveDiary() {
    const title = document.getElementById('diaryTitle').value.trim();
    const content = document.getElementById('diaryContent').value.trim();

    if (!title || !content) {
        alert('タイトルと日記の内容を入力してください');
        return;
    }

    const diaries = getDiariesFromStorage();
    const today = new Date();
    const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // 今日の日記があるか確認（更新の場合）
    const existingIndex = diaries.findIndex(diary => diary.date === dateKey);

    const newDiary = {
        id: existingIndex >= 0 ? diaries[existingIndex].id : Date.now(),
        date: dateKey,
        title: title,
        content: content,
        createdAt: existingIndex >= 0 ? diaries[existingIndex].createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
        diaries[existingIndex] = newDiary;
    } else {
        diaries.unshift(newDiary);
    }

    saveDiariesToStorage(diaries);
    displayDiaries();

    // フォームをクリア
    document.getElementById('diaryTitle').value = '';
    document.getElementById('diaryContent').value = '';

    alert('日記を保存しました！');
}

// 日記を表示
function displayDiaries() {
    const diaries = getDiariesFromStorage();
    const container = document.getElementById('diariesContainer');

    if (diaries.length === 0) {
        container.innerHTML = '<div class="empty-message">まだ日記がありません。今日の日記を書いてみましょう！</div>';
        return;
    }

    container.innerHTML = diaries.map(diary => `
        <div class="diary-item" onclick="loadDiary('${diary.id}')">
            <div class="diary-date">${formatDate(new Date(diary.date + 'T00:00:00'))}</div>
            <div class="diary-title">${escapeHtml(diary.title)}</div>
            <div class="diary-preview">${escapeHtml(diary.content)}</div>
            <div class="diary-actions">
                <button class="btn-small btn-edit" onclick="loadDiary('${diary.id}'); event.stopPropagation();">編集</button>
                <button class="btn-small btn-delete" onclick="deleteDiary('${diary.id}'); event.stopPropagation();">削除</button>
            </div>
        </div>
    `).join('');
}

// 日記を読み込む（編集用）
function loadDiary(id) {
    const diaries = getDiariesFromStorage();
    const diary = diaries.find(d => d.id == id);

    if (diary) {
        document.getElementById('diaryTitle').value = diary.title;
        document.getElementById('diaryContent').value = diary.content;
        // ページの上部にスクロール
        document.querySelector('.diary-form').scrollIntoView({ behavior: 'smooth' });
    }
}

// 日記を削除
function deleteDiary(id) {
    if (confirm('この日記を削除しますか？')) {
        let diaries = getDiariesFromStorage();
        diaries = diaries.filter(diary => diary.id != id);
        saveDiariesToStorage(diaries);
        displayDiaries();
        alert('日記を削除しました。');
    }
}

// HTMLをエスケープ（XSS対策）
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', () => {
    displayCurrentDate();
    displayDiaries();

    // 保存ボタンのクリックイベント
    document.getElementById('saveBtn').addEventListener('click', saveDiary);

    // Enterキーでの保存（Ctrl+Enter）
    document.getElementById('diaryContent').addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            saveDiary();
        }
    });

    // 毎日午前0時に日付を更新
    setInterval(() => {
        const now = new Date();
        if (now.getHours() === 0 && now.getMinutes() === 0) {
            displayCurrentDate();
        }
    }, 60000); // 1分ごとにチェック
});
