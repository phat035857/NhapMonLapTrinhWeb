// ====================================================================================================
// TẬP TIN: DNhapDKy.js
// DỰ ÁN: Website Cửa hàng Mắt kính An Phát (Môn Nhập môn Lập trình Web)
// MỤC ĐÍCH: Xử lý chức năng Đăng nhập (login.html) và Đăng ký tài khoản (register.html),
//           bao gồm kiểm tra tính hợp lệ dữ liệu (form validation), ẩn/hiện mật khẩu,
//           và lưu trữ thông tin tài khoản người dùng vào localStorage.
// ====================================================================================================

// ====================================================================================================
// PHẦN 1: XỬ LÝ FORM ĐĂNG NHẬP (TRANG login.html)
// ====================================================================================================

// 1. Tìm thẻ <form> đăng nhập thông qua ID #loginForm
const formDangNhap = document.querySelector('#loginForm');

// 2. Kiểm tra nếu đang ở trang login.html (formDangNhap tồn tại) thì mới chạy khối code đăng nhập
if (formDangNhap) {
    // Lấy tham chiếu đến ô nhập tài khoản/email
    const oTaiKhoan = document.querySelector('#loginUser');
    // Lấy tham chiếu đến ô nhập mật khẩu
    const oMatKhau = document.querySelector('#loginPassword');
    // Lấy tham chiếu đến nút bấm con mắt để bật/tắt ẩn hiện mật khẩu
    const nutMat = document.querySelector('.eye-toggle');
    // Lấy tham chiếu đến thẻ icon con mắt bên trong nút bấm
    const iconMat = document.querySelector('#eyeIcon');

    // --- CHỨC NĂNG ẨN / HIỆN MẬT KHẨU ---
    // Gắn sự kiện click vào nút con mắt
    nutMat.addEventListener('click', function () {
        // Nếu ô mật khẩu hiện đang là kiểu 'password' (đang bị ẩn)
        if (oMatKhau.type === 'password') {
            // Chuyển sang kiểu 'text' để hiện mật khẩu rõ ràng
            oMatKhau.type = 'text';
            // Đổi icon từ con mắt mở sang con mắt gạch chéo (fa-eye-slash)
            iconMat.classList.remove('fa-eye');
            iconMat.classList.add('fa-eye-slash');
        } else {
            // Ngược lại, nếu đang là 'text' thì chuyển về 'password' để ẩn mật khẩu
            oMatKhau.type = 'password';
            // Đổi icon từ con mắt gạch chéo về lại con mắt mở (fa-eye)
            iconMat.classList.remove('fa-eye-slash');
            iconMat.classList.add('fa-eye');
        }
    });

    // --- CHỨC NĂNG XỬ LÝ SUBMIT FORM ĐĂNG NHẬP ---
    formDangNhap.addEventListener('submit', function (e) {
        // Ngăn chặn hành vi mặc định của trình duyệt là reload/gửi request lên server
        e.preventDefault();

        // Lấy giá trị người dùng nhập và loại bỏ khoảng trắng thừa ở 2 đầu (trim)
        const taiKhoan = oTaiKhoan.value.trim();
        const matKhau = oMatKhau.value.trim();

        // Lấy thẻ hiển thị thông báo lỗi tương ứng bên dưới mỗi ô nhập liệu
        const loiTaiKhoan = oTaiKhoan.parentElement.querySelector('.form-error');
        const loiMatKhau = oMatKhau.parentElement.querySelector('.form-error');

        // Biến cờ đánh dấu dữ liệu form có hợp lệ hay không (mặc định là true)
        let hopLe = true;

        // Xóa sạch các nội dung thông báo lỗi cũ trước khi bắt đầu kiểm tra mới
        loiTaiKhoan.textContent = '';
        loiMatKhau.textContent = '';

        // Kiểm tra 1: Ô tài khoản có bị để trống không
        if (taiKhoan === '') {
            loiTaiKhoan.textContent = 'Vui lòng nhập tài khoản hoặc email.';
            hopLe = false; // Đánh dấu không hợp lệ
        }

        // Kiểm tra 2: Ô mật khẩu có bị để trống không
        if (matKhau === '') {
            loiMatKhau.textContent = 'Vui lòng nhập mật khẩu.';
            hopLe = false; // Đánh dấu không hợp lệ
        }

        // Nếu có lỗi nhập liệu thì dừng lại ngay, không kiểm tra tiếp thông tin đăng nhập
        if (!hopLe) return;

        // Lấy dữ liệu tài khoản đã đăng ký trước đó từ localStorage (dưới key 'account')
        const account = JSON.parse(localStorage.getItem('account'));

        // Kiểm tra thông tin:
        // 1. Phải có tài khoản trong localStorage (account != null)
        // 2. Tài khoản nhập vào phải khớp với username HOẶC email đã đăng ký
        // 3. Mật khẩu nhập vào phải khớp chính xác với mật khẩu đã lưu
        if (account != null && (taiKhoan === account.username || taiKhoan === account.email) && matKhau === account.password) {
            // Cập nhật trạng thái đăng nhập thành công cho tài khoản
            account.isLoggedIn = true;
            // Lưu lại thông tin tài khoản (đã có isLoggedIn = true) vào localStorage
            localStorage.setItem('account', JSON.stringify(account));

            // Bật thông báo đăng nhập thành công
            alert('Đăng nhập thành công!');
            // Điều hướng người dùng về trang chủ (index.html)
            location.href = 'index.html';
        } else {
            // Nếu thông tin không khớp hoặc chưa từng đăng ký tài khoản
            alert('Tài khoản hoặc mật khẩu không đúng!');
        }
    });
}

// ====================================================================================================
// PHẦN 2: XỬ LÝ FORM ĐĂNG KÝ (TRANG register.html)
// ====================================================================================================

// 1. Tìm thẻ <form> đăng ký thông qua ID #registerForm
const formDangKy = document.querySelector('#registerForm');

// 2. Kiểm tra nếu đang ở trang register.html (formDangKy tồn tại) thì mới chạy khối code đăng ký
if (formDangKy) {
    // Lấy tham chiếu đến tất cả các ô nhập liệu trong form đăng ký:
    const oUsername = document.querySelector('#regUsername');         // Ô Tên đăng nhập
    const oFullName = document.querySelector('#regFullName');         // Ô Họ và tên người nhận
    const oEmail = document.querySelector('#regEmail');               // Ô Địa chỉ Email
    const oPhone = document.querySelector('#regPhone');               // Ô Số điện thoại
    const oAddress = document.querySelector('#regAddress');           // Ô Địa chỉ giao hàng
    const oPass = document.querySelector('#regPassword');             // Ô Mật khẩu
    const oConfirmPass = document.querySelector('#regConfirmPassword');// Ô Nhập lại mật khẩu
    const oAgree = document.querySelector('#agreeTerms');             // Ô checkbox Đồng ý điều khoản

    // --- CHỨC NĂNG ẨN / HIỆN MẬT KHẨU CHO CẢ 2 Ô MẬT KHẨU ---
    // Tìm tất cả các nút con mắt trong form đăng ký (gồm nút ở ô Mật khẩu và ô Nhập lại mật khẩu)
    const cacNutMat = formDangKy.querySelectorAll('.eye-toggle');
    cacNutMat.forEach(nut => {
        // Gắn sự kiện click cho từng nút con mắt
        nut.addEventListener('click', function () {
            // Tìm ô input cùng cấp với nút con mắt
            const oNhap = nut.parentElement.querySelector('input');
            // Tìm thẻ icon <i> bên trong nút
            const icon = nut.querySelector('i');

            // Bật/tắt giữa kiểu 'password' và 'text'
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

    // --- CHỨC NĂNG KIỂM TRA DỮ LIỆU VÀ LƯU TÀI KHOẢN KHI BẤM ĐĂNG KÝ ---
    formDangKy.addEventListener('submit', function (e) {
        // Ngăn chặn trình duyệt tự động submit form
        e.preventDefault();

        // Lấy giá trị của từng ô nhập liệu và cắt bỏ khoảng trắng thừa ở 2 đầu
        const username = oUsername.value.trim();
        const fullName = oFullName.value.trim();
        const email = oEmail.value.trim();
        const phone = oPhone.value.trim();
        const address = oAddress.value.trim();
        const password = oPass.value.trim();
        const confirmPassword = oConfirmPass.value.trim();

        // Xóa sạch toàn bộ các thông báo lỗi cũ trên giao diện
        const cacTheLoi = formDangKy.querySelectorAll('.form-error');
        cacTheLoi.forEach(theLoi => {
            theLoi.textContent = '';
        });

        // Biến cờ theo dõi tính hợp lệ của toàn bộ form
        let hopLe = true;

        // --- 1. KIỂM TRA TÊN ĐĂNG NHẬP ---
        if (username === '') {
            oUsername.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập tên đăng nhập.';
            hopLe = false;
        } else if (/\s/.test(username)) { // Kiểm tra có chứa khoảng trắng hay không bằng Regular Expression
            oUsername.parentElement.querySelector('.form-error').textContent = 'Tên đăng nhập không được chứa khoảng trắng.';
            hopLe = false;
        }

        // --- 2. KIỂM TRA HỌ VÀ TÊN ---
        if (fullName === '') {
            oFullName.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập họ và tên người nhận.';
            hopLe = false;
        }

        // --- 3. KIỂM TRA ĐỊA CHỈ EMAIL ---
        // Biểu thức chính quy (Regex) kiểm tra cấu trúc email hợp lệ: dạng abc@def.xyz
        const mauEmail = /^\S+@\S+\.\S+$/;
        if (email === '') {
            oEmail.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập email.';
            hopLe = false;
        } else if (!mauEmail.test(email)) {
            oEmail.parentElement.querySelector('.form-error').textContent = 'Email không đúng định dạng.';
            hopLe = false;
        }

        // --- 4. KIỂM TRA SỐ ĐIỆN THOẠI ---
        // Biểu thức chính quy: bắt đầu bằng số 0 và theo sau là đúng 9 chữ số (tổng 10 số)
        const mauSDT = /^0\d{9}$/;
        if (phone === '') {
            oPhone.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập số điện thoại.';
            hopLe = false;
        } else if (!mauSDT.test(phone)) {
            oPhone.parentElement.querySelector('.form-error').textContent = 'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0.';
            hopLe = false;
        }

        // --- 5. KIỂM TRA ĐỊA CHỈ GIAO HÀNG ---
        if (address === '') {
            oAddress.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập địa chỉ giao hàng.';
            hopLe = false;
        }

        // --- 6. KIỂM TRA MẬT KHẨU ---
        if (password === '') {
            oPass.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập mật khẩu.';
            hopLe = false;
        } else if (password.length < 6) { // Yêu cầu mật khẩu tối thiểu 6 ký tự để bảo mật
            oPass.parentElement.querySelector('.form-error').textContent = 'Mật khẩu phải có ít nhất 6 ký tự.';
            hopLe = false;
        }

        // --- 7. KIỂM TRA NHẬP LẠI MẬT KHẨU ---
        if (confirmPassword === '') {
            oConfirmPass.parentElement.querySelector('.form-error').textContent = 'Vui lòng nhập lại mật khẩu.';
            hopLe = false;
        } else if (confirmPassword !== password) { // Phải trùng khớp 100% với mật khẩu đã nhập ở trên
            oConfirmPass.parentElement.querySelector('.form-error').textContent = 'Mật khẩu nhập lại không khớp.';
            hopLe = false;
        }

        // --- 8. KIỂM TRA CHECKBOX ĐỒNG Ý ĐIỀU KHOẢN ---
        if (!oAgree.checked) {
            oAgree.parentElement.parentElement.querySelector('.form-error').textContent = 'Bạn cần đồng ý với điều khoản để đăng ký.';
            hopLe = false;
        }

        // Nếu có bất kỳ trường nào vi phạm tính hợp lệ -> dừng lại, không tiến hành lưu
        if (!hopLe) return;

        // Đóng gói thông tin tài khoản thành đối tượng (Object) hoàn chỉnh
        const account = {
            username: username,       // Tên đăng nhập
            fullName: fullName,       // Họ và tên người nhận
            email: email,             // Email
            phone: phone,             // Số điện thoại nhận hàng
            address: address,         // Địa chỉ giao hàng
            password: password,       // Mật khẩu đăng nhập
            isLoggedIn: false         // Trạng thái đăng nhập mặc định là false (chưa đăng nhập)
        };

        // Lưu thông tin tài khoản vào localStorage dưới dạng chuỗi JSON với key là 'account'
        localStorage.setItem('account', JSON.stringify(account));

        // Thông báo cho người dùng đã đăng ký thành công
        alert('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');

        // Chuyển hướng người dùng sang trang đăng nhập (login.html)
        location.href = 'login.html';
    });
}
