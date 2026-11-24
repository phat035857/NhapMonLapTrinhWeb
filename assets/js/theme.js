// ====================================================================================================
// TẬP TIN: theme.js
// DỰ ÁN: Website Cửa hàng Mắt kính An Phát (Môn Nhập môn Lập trình Web)
// MỤC ĐÍCH: Xử lý chức năng chuyển đổi giao diện Sáng / Tối (Light / Dark mode)
//           và lưu trạng thái theme vào localStorage để duy trì khi chuyển giữa các trang web
// ====================================================================================================

/**
 * HÀM: ChangeMode()
 * - Nhiệm vụ: Bật/tắt class 'dark-mode' trên thẻ <body> và lưu trạng thái vào localStorage.
 * - Được kích hoạt khi người dùng click vào nút toggle theme (#themeToggle) trên thanh header.
 */
function ChangeMode() {
    // 1. Lấy tham chiếu đến thẻ <body> của trang web hiện tại
    var element = document.body;

    // 2. Sử dụng classList.toggle: nếu body chưa có class 'dark-mode' thì thêm vào, nếu đã có thì gỡ bỏ
    element.classList.toggle("dark-mode");

    // 3. Kiểm tra lại trạng thái của thẻ body sau khi toggle
    if (element.classList.contains("dark-mode")) {
        // Nếu body đang có class 'dark-mode' -> lưu giá trị "dark" vào localStorage dưới key "theme"
        localStorage.setItem("theme", "dark");
    } else {
        // Nếu body không có class 'dark-mode' -> lưu giá trị "light" vào localStorage dưới key "theme"
        localStorage.setItem("theme", "light");
    }
}

// ====================================================================================================
// KHỐI KHỞI TẠO THEME KHI TẢI TRANG
// ====================================================================================================

// 1. Đọc giá trị theme đã được lưu trước đó trong localStorage (trả về "dark", "light" hoặc null)
var myTheme = localStorage.getItem("theme");

// 2. Nếu theme đã lưu trước đó là "dark", tự động thêm class "dark-mode" vào body ngay khi tải trang
if (myTheme === "dark") {
    // Thêm class 'dark-mode' để áp dụng bộ màu nền tối và chữ sáng theo quy định trong style.css
    document.body.classList.add("dark-mode");
}
