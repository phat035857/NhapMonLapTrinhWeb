/*
 * @File: theme.js - Light/Dark Mode Toggle using Web Storage (localStorage)
 * @Module: CT188 - Nhập môn Lập trình Web
 * Trường Công nghệ Thông tin & Truyền thông - Đại học Cần Thơ (CTU)
 * Giảng viên hướng dẫn: ThS. GVC. Vũ Duy Linh
 * Đồ án: Website Cửa hàng Mắt kính An Phát
 */

// ///// Hàm chuyển đổi giao diện Sáng / Tối (Light / Dark Mode) /////
function ChangeMode() {
    var element = document.body; // Nút đích: thẻ <body>
    element.classList.toggle("dark-mode"); // Toggle class 'dark-mode'

    // Lưu trạng thái theme vào Web Storage (localStorage) để duy trì khi chuyển trang
    if (element.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// ///// Khôi phục theme đã lưu khi tải trang /////
var myTheme = localStorage.getItem("theme");

// Nếu theme đã lưu là 'dark' thì tự động thêm class 'dark-mode' vào body
if (myTheme === "dark") {
    document.body.classList.add("dark-mode");
}
