/*
 * @File: DNhapDKy.js - Form Validation & Client-Side Authentication using Web Storage (localStorage)
 * @Module: CT188 - Nhập môn Lập trình Web
 * Trường Công nghệ Thông tin & Truyền thông - Đại học Cần Thơ (CTU)
 * Giảng viên hướng dẫn: ThS. GVC. Vũ Duy Linh
 * Đồ án: Website Cửa hàng Mắt kính An Phát
 * Ghi chú: Kỹ thuật kiểm tra form phía Client (Form Validation) bằng Biểu thức chính quy (Regular Expression)
 */

// ====================================================================================================
// ///// PHẦN 1: XỬ LÝ FORM ĐĂNG NHẬP (loginForm) /////
// ====================================================================================================

const formDangNhap = document.querySelector('#loginForm');

if (formDangNhap) {
    // DOM Traversal: Lấy các trường input và icon toggle mật khẩu
    const oTaiKhoan = document.querySelector('#loginUser');
    const oMatKhau = document.querySelector('#loginPassword');
    const nutMat = document.querySelector('.eye-toggle');
    const iconMat = document.querySelector('#eyeIcon');

    // Event Listener: Bật/tắt hiển thị mật khẩu (Password Toggle)
    nutMat.addEventListener('click', function () {
        if (oMatKhau.type === 'password') {
            oMatKhau.type = 'text';
            iconMat.classList.remove('fa-eye');
            iconMat.classList.add('fa-eye-slash');
        } else {
            oMatKhau.type = 'password';
            iconMat.classList.remove('fa-eye-slash');
            iconMat.classList.add('fa-eye');
        }
    });

    // Event Listener: Xử lý submit form đăng nhập (Event Object: e)
    formDangNhap.addEventListener('submit', function (e) {
        e.preventDefault(); // Ngăn chặn reload trang mặc định

        const taiKhoan = oTaiKhoan.value.trim();
        const matKhau = oMatKhau.value.trim();

        // Lấy các element hiển thị thông báo lỗi
        const loiTaiKhoan = oTaiKhoan.parentElement.querySelector('.form-error');
        const loiMatKhau = oMatKhau.parentElement.querySelector('.form-error');
        let hopLe = true;

        // Reset error message
        loiTaiKhoan.textContent = '';
        loiMatKhau.textContent = '';

        // Validation 1: Kiểm tra rỗng tài khoản
        if (taiKhoan === '') {
            loiTaiKhoan.textContent = 'Vui lòng nhập tài khoản hoặc email.';
            hopLe = false;
        }

        // Validation 2: Kiểm tra rỗng mật khẩu
        if (matKhau === '') {
            loiMatKhau.textContent = 'Vui lòng nhập mật khẩu.';
            hopLe = false;
        }

        if (!hopLe) return; // Dừng nếu dữ liệu chưa hợp lệ

        // Authentication logic: Đọc thông tin tài khoản từ localStorage
        const account = JSON.parse(localStorage.getItem('account'));

        // Đối chiếu username/email và password với dữ liệu đã đăng ký
        if (account != null && (taiKhoan === account.username || taiKhoan === account.email) && matKhau === account.password) {
            account.isLoggedIn = true; // Cập nhật trạng thái phiên đăng nhập
            localStorage.setItem('account', JSON.stringify(account)); // Lưu vào Web Storage

            alert('Đăng nhập thành công!');
            location.href = 'index.html'; // Chuyển về trang chủ
        } else {
            alert('Tài khoản hoặc mật khẩu không đúng!');
        }
    });
}

// ====================================================================================================
// ///// PHẦN 2: XỬ LÝ FORM ĐĂNG KÝ (registerForm) /////
// ====================================================================================================

const formDangKy = document.querySelector('#registerForm');

if (formDangKy) {
    // DOM Traversal: Lấy các phần tử form đăng ký
    const oUsername = document.querySelector('#regUsername');
    const oFullName = document.querySelector('#regFullName');
    const oEmail = document.querySelector('#regEmail');
    const oPhone = document.querySelector('#regPhone');
    const oAddress = document.querySelector('#regAddress');
    const oPass = document.querySelector('#regPassword');
    const oConfirmPass = document.querySelector('#regConfirmPassword');
    const oAgree = document.querySelector('#agreeTerms');

    // Event Listener: Toggle ẩn/hiện mật khẩu cho cả 2 ô input
    const cacNutMat = formDangKy.querySelectorAll('.eye-toggle');
    cacNutMat.forEach(nut => {
        nut.addEventListener('click', function () {
            const oNhap = nut.parentElement.querySelector('input');
            const icon = nut.querySelector('i');
            if (oNhap.type === 'password') {
                oNhap.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                oNhap.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Event Listener: Kiểm tra dữ liệu khi submit form đăng ký
    formDangKy.addEventListener('submit', function (e) {
        e.preventDefault(); // Ngăn submit mặc định

        const username = oUsername.value.trim();
        const fullName = oFullName.value.trim();
        const email = oEmail.value.trim();
        const phone = oPhone.value.trim();
        const address = oAddress.value.trim();
        const password = oPass.value.trim();
        const confirmPassword = oConfirmPass.value.trim();

        // Reset tất cả thông báo lỗi cũ
        const cacTheLoi = formDangKy.querySelectorAll('.form-error');
        cacTheLoi.forEach(theLoi => {
            theLoi.textContent = '';
        });

        let hopLe = true;

        // 1. Kiểm tra Username (bắt buộc, không chứa khoảng trắng)
        if (username === '') {
            oUsername.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập tên đăng nhập.';
            hopLe = false;
        } else if (/\s/.test(username)) {
            oUsername.parentElement.querySelector('.form-error').textContent = 'Tên đăng nhập không được chứa khoảng trắng.';
            hopLe = false;
        }

        // 2. Kiểm tra Họ và tên
        if (fullName === '') {
            oFullName.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập họ và tên người nhận.';
            hopLe = false;
        }

        // 3. Kiểm tra Email bằng Biểu thức chính quy (Regular Expression)
        const mauEmail = /^\S+@\S+\.\S+$/;
        if (email === '') {
            oEmail.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập email.';
            hopLe = false;
        } else if (!mauEmail.test(email)) {
            oEmail.parentElement.querySelector('.form-error').textContent = 'Email không đúng định dạng.';
            hopLe = false;
        }

        // 4. Kiểm tra Số điện thoại (Regex: 10 chữ số, bắt đầu bằng 0)
        const mauSDT = /^0\d{9}$/;
        if (phone === '') {
            oPhone.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập số điện thoại.';
            hopLe = false;
        } else if (!mauSDT.test(phone)) {
            oPhone.parentElement.querySelector('.form-error').textContent = 'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0.';
            hopLe = false;
        }

        // 5. Kiểm tra Địa chỉ giao hàng
        if (address === '') {
            oAddress.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập địa chỉ giao hàng.';
            hopLe = false;
        }

        // 6. Kiểm tra Mật khẩu (tối thiểu 6 ký tự)
        if (password === '') {
            oPass.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập mật khẩu.';
            hopLe = false;
        } else if (password.length < 6) {
            oPass.parentElement.querySelector('.form-error').textContent = 'Mật khẩu phải có ít nhất 6 ký tự.';
            hopLe = false;
        }

        // 7. Kiểm tra Xác nhận mật khẩu (phải trùng khớp)
        if (confirmPassword === '') {
            oConfirmPass.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập lại mật khẩu.';
            hopLe = false;
        } else if (confirmPassword !== password) {
            oConfirmPass.parentElement.querySelector('.form-error').textContent = 'Mật khẩu nhập lại không khớp.';
            hopLe = false;
        }

        // 8. Kiểm tra Checkbox đồng ý điều khoản
        if (!oAgree.checked) {
            oAgree.parentElement.parentElement.querySelector('.form-error').textContent = 'Bạn cần đồng ý với điều khoản để đăng ký.';
            hopLe = false;
        }

        if (!hopLe) return;

        // Đóng gói thông tin tài khoản thành Object
        const account = {
            username: username,
            fullName: fullName,
            email: email,
            phone: phone,
            address: address,
            password: password,
            isLoggedIn: false
        };

        // Lưu thông tin người dùng vào Web Storage (localStorage)
        localStorage.setItem('account', JSON.stringify(account));
        alert('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
        location.href = 'login.html'; // Chuyển trang đăng nhập
    });
}
