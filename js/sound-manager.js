/**
 * CHUYỆN NHÀ SINH VIÊN - SOUND MANAGER
 * Tự động phát âm thanh khi tương tác
 */

const SoundManager = {
    enabled: true, // Mặc định bật
    sounds: {
        // Dùng link audio miễn phí từ Pixabay (Nhẹ & Tốc độ cao)
        pop: new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_79124016b3.mp3'),     // Âm thanh click nhẹ
        success: new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3'), // Âm thanh thành công (leng keng)
        trash: new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3')    // Âm thanh vứt rác/xóa
    },

    init() {
        // Giảm âm lượng xuống 40% để nghe êm tai, không bị giật mình
        Object.values(this.sounds).forEach(audio => {
            audio.volume = 0.4;
        });

        // TỰ ĐỘNG GẮN ÂM THANH 'POP' VÀO TẤT CẢ CÁC NÚT (BUTTON)
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (btn) {
                // Nếu là nút Xóa, phát âm thanh thùng rác
                if (btn.innerHTML.includes('lucide="trash"') || btn.innerHTML.includes('lucide-trash')) {
                    this.play('trash');
                } else {
                    // Các nút khác phát âm thanh click nhẹ
                    this.play('pop');
                }
            }
        });
    },

    play(type) {
        if (!this.enabled || !this.sounds[type]) return;
        
        // Clone để có thể phát liên tục nếu người dùng bấm nhanh
        const soundClone = this.sounds[type].cloneNode();
        soundClone.volume = this.sounds[type].volume;
        
        // Bắt lỗi nếu trình duyệt chặn tự động phát âm thanh
        soundClone.play().catch(err => console.log("Trình duyệt chặn âm thanh:", err));
    }
};

// Khởi tạo khi web load xong
document.addEventListener('DOMContentLoaded', () => {
    SoundManager.init();
});
