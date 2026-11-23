/* Hàm thay đổi mode, sử dụng localStorage để không bị mất theme khi chuyển trang */
function ChangeMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    /* Sử dụng localStorage để lưu thông tin theme hiện tại */
    if (element.classList.contains("dark-mode")){
        localStorage.setItem("theme", "dark");
    }
    else{
        localStorage.setItem("theme", "light");
    }
}
/* Lấy nội dung đã lưu trong theme */
var myTheme = localStorage.getItem("theme");
/* Nếu kết quả trả về từ localStorage là dark thì thêm class="dark-mode" vào body */
if (myTheme === "dark"){
    document.body.classList.add("dark-mode");
}
