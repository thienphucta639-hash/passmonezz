/**
 * CHUYỆN NHÀ SINH VIÊN - UI ENHANCER
 * Tự động nâng cấp UX/UI cho các thành phần có sẵn
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Tự động thêm Tooltip cho các nút Icon (để người dùng hiểu nút đó làm gì)
    const addTooltips = () => {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            const html = btn.innerHTML.toLowerCase();
            if (!btn.hasAttribute('data-tooltip')) {
                if (html.includes('lucide="trash"') || html.includes('lucide-trash')) {
                    btn.setAttribute('data-tooltip', 'Xóa mục này');
                } else if (html.includes('lucide="edit"') || html.includes('lucide-edit')) {
                    btn.setAttribute('data-tooltip', 'Chỉnh sửa');
                } else if (html.includes('lucide="download"')) {
                    btn.setAttribute('data-tooltip', 'Tải xuống');
                } else if (html.includes('lucide="plus"')) {
                    btn.setAttribute('data-tooltip', 'Thêm mới');
                }
            }
        });
    };

    // 2. Thêm hiệu ứng Kính mờ cho Sidebar (nếu có id là sidebar)
    const sidebar = document.getElementById('sidebar') || document.querySelector('aside');
    if (sidebar) sidebar.classList.add('glass-effect');

    // 3. Tự động làm đẹp các ô Input (Thêm placeholder xịn hơn)
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        if (input.placeholder === 'Tìm kiếm...' || input.placeholder === 'Search') {
            input.placeholder = '🔍 Tìm môn học, tài liệu, mật khẩu...';
        }
        // Hiệu ứng focus Tailwind
        input.classList.add('focus:ring-2', 'focus:ring-indigo-400', 'transition-all');
    });

    // 4. Lời chào theo giờ tự động
    const addGreeting = () => {
        const header = document.querySelector('header');
        if (header && !document.getElementById('smart-greeting')) {
            const hour = new Date().getHours();
            let greeting = 'Chào bạn!';
            if (hour < 12) greeting = '🌅 Chào buổi sáng! Chúc một ngày học tập năng suất.';
            else if (hour < 18) greeting = '☕ Chào buổi chiều! Cố gắng chạy deadline nhé.';
            else greeting = '🌙 Chào buổi tối! Nhớ nghỉ ngơi sớm nha.';

            const greetingEl = document.createElement('div');
            greetingEl.id = 'smart-greeting';
            greetingEl.className = 'text-sm text-slate-500 font-medium hidden md:block mt-1 animate-fade-in';
            greetingEl.innerText = greeting;
            
            // Tìm chỗ nhét lời chào vào dưới tiêu đề
            const titleBox = header.querySelector('h1')?.parentElement;
            if (titleBox) titleBox.appendChild(greetingEl);
        }
    };

    // Chạy các hàm khởi tạo
    setTimeout(() => {
        addTooltips();
        addGreeting();
    }, 500); // Đợi DOM render xong

});

// 5. Hàm tạo Toast Notification (Thông báo xịn) để dùng global
window.showToast = function(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-msg ${type}`;
    
    // Icon theo type
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    
    container.appendChild(toast);

    // Tự động xóa sau 3.5 giây
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 400); // Đợi animation xong
    }, 3500);
};
