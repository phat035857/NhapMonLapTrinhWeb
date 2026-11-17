const formDangNhap = document.querySelector('#loginForm');

if (formDangNhap) {
    // Khai báo các phần tử nhập liệu và nút ẩn/hiện mật khẩu
    const oTaiKhoan = document.querySelector('#loginUser');
    const oMatKhau = document.querySelector('#loginPassword');
    const nutMat = document.querySelector('.eye-toggle');
    const iconMat = document.querySelector('#eyeIcon');

    // Xử lý bấm biểu tượng con mắt để hiện hoặc ẩn mật khẩu
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

    formDangNhap.addEventListener('submit', function () {
        const taiKhoan = oTaiKhoan.value.trim();
        const matKhau = oMatKhau.value.trim();

        const loiTaiKhoan = oTaiKhoan.parentElement.querySelector('.form-error');
        const loiMatKhau = oMatKhau.parentElement.querySelector('.form-error');
        let hopLe = true;

        // Xóa thông báo lỗi cũ trước khi kiểm tra lại
        loiTaiKhoan.textContent = '';
        loiMatKhau.textContent = '';

        // Kiểm tra rỗng tài khoản/email
        if (taiKhoan === '') {
            loiTaiKhoan.textContent = 'Vui lòng nhập tài khoản hoặc email.';
            hopLe = false;
        }

        // Kiểm tra rỗng mật khẩu
        if (matKhau === '') {
            loiMatKhau.textContent = 'Vui lòng nhập mật khẩu.';
            hopLe = false;
        }

        // Dừng lại nếu dữ liệu nhập chưa hợp lệ
        if (!hopLe) return;

        // Lấy thông tin tài khoản đã đăng ký trong localStorage để đối chiếu
        const account = JSON.parse(localStorage.getItem('account'));

        if (account != null && (taiKhoan === account.username || taiKhoan === account.email) && matKhau === account.password) {
            localStorage.setItem('currentUser', JSON.stringify(account));
            alert('Đăng nhập thành công!');
            location.href = 'index.html';
        } else {
            alert('Tài khoản hoặc mật khẩu không đúng!');
        }
    });
}

const formDangKy = document.querySelector('#registerForm');

if (formDangKy) {
    const oUsername = document.querySelector('#regUsername');
    const oFullName = document.querySelector('#regFullName');
    const oEmail = document.querySelector('#regEmail');
    const oPhone = document.querySelector('#regPhone');
    const oAddress = document.querySelector('#regAddress');
    const oPass = document.querySelector('#regPassword');
    const oConfirmPass = document.querySelector('#regConfirmPassword');
    const oAgree = document.querySelector('#agreeTerms');

    // Gắn sự kiện hiện/ẩn mật khẩu cho cả 2 ô mật khẩu
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

    // Xử lý kiểm tra dữ liệu và lưu tài khoản khi bấm Đăng ký
    formDangKy.addEventListener('submit', function () {
        const username = oUsername.value.trim();
        const fullName = oFullName.value.trim();
        const email = oEmail.value.trim();
        const phone = oPhone.value.trim();
        const address = oAddress.value.trim();
        const password = oPass.value.trim();
        const confirmPassword = oConfirmPass.value.trim();

        // Xóa toàn bộ thông báo lỗi cũ
        const cacTheLoi = formDangKy.querySelectorAll('.form-error');
        cacTheLoi.forEach(theLoi => {
            theLoi.textContent = '';
        });

        let hopLe = true;

        // 1. Kiểm tra tên đăng nhập
        if (username === '') {
            oUsername.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập tên đăng nhập.';
            hopLe = false;
        } else if (/\s/.test(username)) {
            oUsername.parentElement.querySelector('.form-error').textContent = 'Tên đăng nhập không được chứa khoảng trắng.';
            hopLe = false;
        }

        // 2. Kiểm tra họ và tên
        if (fullName === '') {
            oFullName.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập họ và tên người nhận.';
            hopLe = false;
        }

        // 3. Kiểm tra email
        const mauEmail = /^\S+@\S+\.\S+$/;
        if (email === '') {
            oEmail.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập email.';
            hopLe = false;
        } else if (!mauEmail.test(email)) {
            oEmail.parentElement.querySelector('.form-error').textContent = 'Email không đúng định dạng.';
            hopLe = false;
        }

        // 4. Kiểm tra số điện thoại (10 chữ số, bắt đầu bằng 0)
        const mauSDT = /^0\d{9}$/;
        if (phone === '') {
            oPhone.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập số điện thoại.';
            hopLe = false;
        } else if (!mauSDT.test(phone)) {
            oPhone.parentElement.querySelector('.form-error').textContent = 'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0.';
            hopLe = false;
        }

        // 5. Kiểm tra địa chỉ giao hàng
        if (address === '') {
            oAddress.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập địa chỉ giao hàng.';
            hopLe = false;
        }

        // 6. Kiểm tra mật khẩu
        if (password === '') {
            oPass.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập mật khẩu.';
            hopLe = false;
        } else if (password.length < 6) {
            oPass.parentElement.querySelector('.form-error').textContent = 'Mật khẩu phải có ít nhất 6 ký tự.';
            hopLe = false;
        }

        // 7. Kiểm tra nhập lại mật khẩu
        if (confirmPassword === '') {
            oConfirmPass.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập lại mật khẩu.';
            hopLe = false;
        } else if (confirmPassword !== password) {
            oConfirmPass.parentElement.querySelector('.form-error').textContent = 'Mật khẩu nhập lại không khớp.';
            hopLe = false;
        }

        // 8. Kiểm tra checkbox đồng ý điều khoản
        if (!oAgree.checked) {
            oAgree.parentElement.parentElement.querySelector('.form-error').textContent = 'Bạn cần đồng ý với điều khoản để đăng ký.';
            hopLe = false;
        }

        if (!hopLe) return;

        // Tạo tài khoản chứa đầy đủ thông tin cá nhân & địa chỉ giao hàng
        const account = {
            username: username,
            fullName: fullName,
            email: email,
            phone: phone,
            address: address,
            password: password
        };

        // Lưu vào localStorage
        localStorage.setItem('account', JSON.stringify(account));
        alert('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
        location.href = 'login.html';
    });
}