/*
 * @File: theme.js - Chuyển đổi giao diện Sáng / Tối
 */

// ///// Hàm chuyển đổi giao diện Sáng / Tối /////
function ChangeMode() {
    var element = document.body; // Thẻ body của trang web
    element.classList.toggle("dark-mode"); // Bật hoặc tắt lớp giao diện tối

    // Lưu trạng thái giao diện vào localStorage để duy trì khi chuyển trang
    if (element.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// ///// Khôi phục giao diện đã lưu khi tải trang /////
var myTheme = localStorage.getItem("theme");

// Nếu giao diện đã lưu là tối ('dark') thì tự động thêm lớp 'dark-mode' vào thẻ body
if (myTheme === "dark") {
    document.body.classList.add("dark-mode");
}
