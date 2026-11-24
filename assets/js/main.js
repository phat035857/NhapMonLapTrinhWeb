// ====================================================================================================
// TẬP TIN: main.js
// DỰ ÁN: Website Cửa hàng Mắt kính An Phát (Môn Nhập môn Lập trình Web)
// MỤC ĐÍCH: Xử lý các chức năng dùng chung trên toàn bộ website:
//           - Menu responsive (hamburger) cho thiết bị di động
//           - Đồng bộ và hiển thị số lượng giỏ hàng trên thanh header
//           - Kiểm tra trạng thái đăng nhập / đăng xuất của người dùng
//           - Điều hướng danh mục sản phẩm và chuyển trang xem chi tiết
// ====================================================================================================

// 1. Lấy tham chiếu đến thanh điều hướng chính trên header (.header__navform)
const thanhDieuHuong = document.querySelector('.header__navform');

// 2. Lấy tham chiếu đến nút icon 3 gạch (hamburger menu) trên mobile (.hamburger)
const nutMenu = document.querySelector('.hamburger');

// 3. Lấy tất cả các thẻ liên kết <a> có thuộc tính 'data-category' (menu điều hướng danh mục)
const cacLinkWeb = document.querySelectorAll('a[data-category]');

// 4. Lấy tất cả các hình ảnh danh mục nổi bật trên trang chủ (#danh-muc article img)
const cacLinkWebHinh = document.querySelectorAll('#danh-muc article img');

// 5. Lấy tham chiếu đến nút 'Khám phá ngay' ở banner trang chủ (.kham-pha)
const nutKhamPham = document.querySelector('.kham-pha');

// 6. Lấy tham chiếu đến thẻ <span> hiển thị số lượng sản phẩm trên icon giỏ hàng (#cartCount)
const oSoLuongGio = document.querySelector('#cartCount');

// 7. Lấy danh sách các thẻ bài viết sản phẩm Best Seller trên trang chủ (#san-pham article)
const dsBestSeller = document.querySelectorAll('#san-pham article');

/**
 * HÀM 1: batTatMenuDienThoai()
 * - Nhiệm vụ: Bật hoặc tắt menu điều hướng khi người dùng nhấn nút hamburger trên màn hình điện thoại/tablet.
 * - Cơ chế: Sử dụng classList.toggle để thêm/gỡ class 'active--ham' và 'active'.
 */
function batTatMenuDienThoai() {
    // Thêm hoặc gỡ class 'active--ham' để trượt mở hoặc đóng thanh menu
    thanhDieuHuong.classList.toggle('active--ham');
    // Thêm hoặc gỡ class 'active' trên icon hamburger (hiệu ứng chuyển thành dấu X)
    nutMenu.classList.toggle('active');
}

/**
 * HÀM 2: capNhatSoGioHang()
 * - Nhiệm vụ: Đọc giỏ hàng từ localStorage, tính tổng số lượng sản phẩm và cập nhật vào badge giỏ hàng ở header.
 * - Được gọi dùng chung ở mọi trang (index, shop, detail, cart...).
 */
function capNhatSoGioHang() {
    // 1. Lấy dữ liệu giỏ hàng từ localStorage (nếu chưa có thì mặc định là mảng rỗng [])
    const gioHang = JSON.parse(localStorage.getItem('cart')) || [];
    // 2. Khởi tạo biến lưu tổng số lượng món hàng
    let tongSoLuong = 0;

    // 3. Duyệt qua từng sản phẩm trong giỏ và cộng dồn số lượng (monHang.sl)
    gioHang.forEach(function (monHang) {
        tongSoLuong += monHang.sl;
    });

    // 4. Nếu phần tử hiển thị số lượng (#cartCount) tồn tại trên trang thì gán giá trị mới
    if (oSoLuongGio) {
        oSoLuongGio.textContent = tongSoLuong;
    }
}

/**
 * HÀM 3: checkAuthentication()
 * - Nhiệm vụ: Kiểm tra trạng thái đăng nhập của người dùng:
 *     + Nếu ĐÃ đăng nhập: ẩn nút Đăng nhập/Đăng ký, hiển thị 'Xin chào, [tên]' và nút Đăng xuất.
 *     + Nếu CHƯA đăng nhập: hiển thị nút Đăng nhập/Đăng ký, ẩn khu vực thông tin tài khoản.
 *     + Bắt sự kiện click nút Đăng xuất.
 */
function checkAuthentication() {
    // 1. Lấy các phần tử DOM trên header liên quan đến xác thực tài khoản:
    const authBox = document.querySelector('#authentication'); // Khối chứa link Đăng nhập / Đăng ký
    const userInfoBox = document.querySelector('#user-info');   // Khối chứa tên người dùng & nút Đăng xuất
    const principal = document.querySelector('#principal');     // Thẻ span hiển thị lời chào tên người dùng
    const logoutBtn = document.querySelector('#logout');        // Thẻ link nút 'Đăng xuất'

    // 2. Đọc thông tin tài khoản từ localStorage
    const account = JSON.parse(localStorage.getItem('account'));

    // 3. Kiểm tra nếu các phần tử DOM này tồn tại trên trang
    if (authBox && userInfoBox && principal) {
        // Trường hợp người dùng ĐÃ đăng nhập (account != null và isLoggedIn === true)
        if (account != null && account.isLoggedIn === true) {
            authBox.classList.add('hidden');                // Ẩn khối Đăng nhập / Đăng ký
            userInfoBox.classList.remove('hidden');          // Hiện khối thông tin người dùng
            principal.textContent = 'Xin chào, ' + account.username; // Gán lời chào kèm username
        } else {
            // Trường hợp người dùng CHƯA đăng nhập
            authBox.classList.remove('hidden');             // Hiện khối Đăng nhập / Đăng ký
            userInfoBox.classList.add('hidden');             // Ẩn khối thông tin người dùng
        }
    }

    // 4. Xử lý sự kiện khi người dùng nhấn nút 'Đăng xuất'
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            // Ngăn chặn hành vi nhảy trang mặc định của thẻ <a>
            e.preventDefault();

            // Lấy lại thông tin tài khoản từ localStorage
            const account = JSON.parse(localStorage.getItem('account'));

            // Đặt trạng thái đăng nhập về false
            if (account != null) {
                account.isLoggedIn = false;
                localStorage.setItem('account', JSON.stringify(account));
            }

            // Xóa sạch giỏ hàng hiện tại khi đăng xuất để đảm bảo bảo mật thông tin
            localStorage.removeItem('cart');

            // Bật thông báo đã đăng xuất
            alert('Đã đăng xuất!');
            // Điều hướng người dùng quay trở về trang chủ index.html
            location.href = 'index.html';
        });
    }
}

/**
 * HÀM 4: chuyenTrangShop(loai)
 * - Nhiệm vụ: Chuyển hướng trình duyệt sang trang cửa hàng (shop.html) kèm theo mã danh mục trên URL query string.
 * - Tham số:
 *     + loai: Mã định danh danh mục sản phẩm (VD: 'gong-kinh', 'trong-kinh', '' cho tất cả).
 */
function chuyenTrangShop(loai) {
    if (loai === '') {
        // Nếu không truyền loại (chọn Tất cả) -> chuyển sang shop.html không cần tham số
        window.location.href = 'shop.html';
    } else {
        // Nếu có mã loại -> chuyển sang shop.html kèm query param ?category=... (có encode an toàn)
        window.location.href = 'shop.html?category=' + encodeURIComponent(loai);
    }
}

/**
 * HÀM 5: chuyenTrangChiTiet(sp)
 * - Nhiệm vụ: Chuyển hướng trình duyệt sang trang chi tiết sản phẩm (detail.html) và truyền dữ liệu qua query string.
 * - Tham số:
 *     + sp: Đối tượng chứa thông tin sản phẩm {id, category, name, price, image}.
 */
function chuyenTrangChiTiet(sp) {
    // Xây dựng URL kèm toàn bộ thông số sản phẩm dưới dạng query parameters
    const url = 'detail.html?' +
        'id=' + encodeURIComponent(sp.id) +
        '&category=' + encodeURIComponent(sp.category) +
        '&name=' + encodeURIComponent(sp.name) +
        '&price=' + encodeURIComponent(sp.price) +
        '&image=' + encodeURIComponent(sp.image);

    // Điều hướng trình duyệt chuyển đến trang chi tiết
    window.location.href = url;
}

// ====================================================================================================
// ĐĂNG KÝ CÁC SỰ KIỆN TƯƠNG TÁC NGƯỜI DÙNG
// ====================================================================================================

// 1. Xử lý khi click nút 'Khám phá ngay' ở banner trang chủ -> mở trang shop hiển thị tất cả sản phẩm
if (nutKhamPham) {
    nutKhamPham.addEventListener('click', function (e) {
        e.preventDefault();
        chuyenTrangShop(''); // Chuyển sang shop.html với danh mục trống (tất cả)
    });
}

// 2. Xử lý khi click vào các sản phẩm Best Seller trên trang chủ -> mở trang chi tiết của sản phẩm đó
dsBestSeller.forEach((i) => {
    i.addEventListener('click', function (e) {
        e.preventDefault();

        // Thu thập thông tin sản phẩm từ các thuộc tính data-* và thẻ con bên trong
        const data = {
            id: i.getAttribute('data-id'),
            category: i.getAttribute('data-category'),
            name: i.querySelector('figcaption').textContent.trim(),
            price: Number(i.getAttribute('data-price')),
            image: i.querySelector('img').getAttribute('src')
        };

        // Gọi hàm chuyển sang trang chi tiết với dữ liệu thu thập được
        chuyenTrangChiTiet(data);
    });
});

// 3. Xử lý khi click vào các hình ảnh danh mục ở trang chủ (#danh-muc article img)
cacLinkWebHinh.forEach((e) => {
    e.addEventListener('click', function () {
        // Lấy mã danh mục từ thuộc tính data-category của ảnh
        const loai = e.getAttribute('data-category');
        // Chuyển sang trang shop và lọc theo danh mục đó
        chuyenTrangShop(loai);
    });
});

// 4. Xử lý khi click vào các liên kết danh mục trên thanh menu header (thẻ a có data-category)
cacLinkWeb.forEach((e) => {
    e.addEventListener('click', function (evt) {
        evt.preventDefault();
        // Lấy mã danh mục từ thuộc tính data-category
        const loai = e.getAttribute('data-category');
        // Chuyển sang trang shop và lọc theo danh mục đó
        chuyenTrangShop(loai);
    });
});

// ====================================================================================================
// KHỐI KHỞI CHẠY CHUNG KHI VÀO TRANG WEB
// ====================================================================================================

// 1. Kiểm tra trạng thái đăng nhập để cập nhật header ngay khi tải trang
checkAuthentication();

// 2. Cập nhật số lượng hiển thị trên badge giỏ hàng ngay khi tải trang
capNhatSoGioHang();

// 3. Đăng ký sự kiện click nút hamburger nếu phần tử tồn tại trên trang
if (nutMenu) {
    nutMenu.addEventListener('click', batTatMenuDienThoai);
}
