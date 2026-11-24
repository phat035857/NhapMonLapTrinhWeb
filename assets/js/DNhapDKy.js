/*
 * @File: DNhapDKy.js - Đăng nhập, Đăng ký & Kiểm tra dữ liệu form
 */

// ====================================================================================================
// ///// PHẦN 1: XỬ LÝ FORM ĐĂNG NHẬP (loginForm) /////
// ====================================================================================================

const formDangNhap = document.querySelector('#loginForm');

if (formDangNhap) {
    // Duyệt cây DOM: Lấy các trường nhập liệu và icon bật/tắt mật khẩu
    const oTaiKhoan = document.querySelector('#loginUser');
    const oMatKhau = document.querySelector('#loginPassword');
    const nutMat = document.querySelector('.eye-toggle');
    const iconMat = nutMat.querySelector('i');

    // Lắng nghe sự kiện: Bật/tắt hiển thị mật khẩu
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

    // Lắng nghe sự kiện: Xử lý gửi form đăng nhập
    formDangNhap.addEventListener('submit', function (e) {
        e.preventDefault(); // Ngăn chặn tải lại trang mặc định

        const taiKhoan = oTaiKhoan.value.trim();
        const matKhau = oMatKhau.value.trim();

        // Lấy các phần tử hiển thị thông báo lỗi
        const loiTaiKhoan = oTaiKhoan.parentElement.querySelector('.form-error');
        const loiMatKhau = oMatKhau.parentElement.querySelector('.form-error');
        let hopLe = true;

        // Xóa thông báo lỗi cũ
        loiTaiKhoan.textContent = '';
        loiMatKhau.textContent = '';

        // Kiểm tra 1: Kiểm tra rỗng tài khoản
        if (taiKhoan === '') {
            loiTaiKhoan.textContent = 'Vui lòng nhập tài khoản hoặc email.';
            hopLe = false;
        }

        // Kiểm tra 2: Kiểm tra rỗng mật khẩu
        if (matKhau === '') {
            loiMatKhau.textContent = 'Vui lòng nhập mật khẩu.';
            hopLe = false;
        }

        if (!hopLe) return; // Dừng nếu dữ liệu chưa hợp lệ

        // Kiểm tra xác thực: Đọc thông tin tài khoản từ localStorage
        const account = JSON.parse(localStorage.getItem('account'));

        // Đối chiếu tên đăng nhập/email và mật khẩu với dữ liệu đã lưu
        if (account != null && (taiKhoan === account.username || taiKhoan === account.email) && matKhau === account.password) {
            account.isLoggedIn = true; // Cập nhật trạng thái phiên đăng nhập
            localStorage.setItem('account', JSON.stringify(account)); // Lưu vào localStorage

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
    // Duyệt cây DOM: Lấy các phần tử trong form đăng ký
    const oUsername = document.querySelector('#regUsername');
    const oFullName = document.querySelector('#regFullName');
    const oEmail = document.querySelector('#regEmail');
    const oPhone = document.querySelector('#regPhone');
    const oAddress = document.querySelector('#regAddress');
    const oPass = document.querySelector('#regPassword');
    const oConfirmPass = document.querySelector('#regConfirmPassword');
    const oAgree = document.querySelector('#agreeTerms');

    // Lắng nghe sự kiện: Ẩn/hiện mật khẩu cho cả 2 ô nhập mật khẩu
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

    // Lắng nghe sự kiện: Kiểm tra dữ liệu khi gửi form đăng ký
    formDangKy.addEventListener('submit', function (e) {
        e.preventDefault(); // Ngăn gửi form mặc định

        const username = oUsername.value.trim();
        const fullName = oFullName.value.trim();
        const email = oEmail.value.trim();
        const phone = oPhone.value.trim();
        const address = oAddress.value.trim();
        const password = oPass.value.trim();
        const confirmPassword = oConfirmPass.value.trim();

        // Xóa tất cả thông báo lỗi cũ
        const cacTheLoi = formDangKy.querySelectorAll('.form-error');
        cacTheLoi.forEach(theLoi => {
            theLoi.textContent = '';
        });

        let hopLe = true;

        // 1. Kiểm tra Tên đăng nhập (bắt buộc, không chứa khoảng trắng)
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

        // 3. Kiểm tra Email bằng Biểu thức chính quy
        const mauEmail = /^\S+@\S+\.\S+$/;
        if (email === '') {
            oEmail.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập email.';
            hopLe = false;
        } else if (!mauEmail.test(email)) {
            oEmail.parentElement.querySelector('.form-error').textContent = 'Email không đúng định dạng.';
            hopLe = false;
        }

        // 4. Kiểm tra Số điện thoại (10 chữ số, bắt đầu bằng số 0)
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

        // 8. Kiểm tra Ô đánh dấu đồng ý điều khoản
        if (!oAgree.checked) {
            oAgree.parentElement.parentElement.querySelector('.form-error').textContent = 'Bạn cần đồng ý với điều khoản để đăng ký.';
            hopLe = false;
        }

        if (!hopLe) return;

        // Đóng gói thông tin tài khoản thành đối tượng
        const account = {
            username: username,
            fullName: fullName,
            email: email,
            phone: phone,
            address: address,
            password: password,
            isLoggedIn: false
        };

        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem('account', JSON.stringify(account));
        alert('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
        location.href = 'login.html'; // Chuyển trang đăng nhập
    });
}
