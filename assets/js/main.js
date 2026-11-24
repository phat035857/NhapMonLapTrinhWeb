/*
 * @File: main.js - Chức năng dùng chung: Điều hướng, Giỏ hàng & Xác thực
 */

// ///// 1. Duyệt cây DOM: Lấy các phần tử dùng chung trên phần đầu trang & Trang chủ /////
const thanhDieuHuong = document.querySelector('.header__navform'); // Thanh điều hướng menu
const nutMenu = document.querySelector('.hamburger'); // Biểu tượng menu trên điện thoại
const cacLinkWeb = document.querySelectorAll('a[data-category]'); // Liên kết danh mục trên menu
const cacLinkWebHinh = document.querySelectorAll('#danh-muc article img'); // Hình ảnh danh mục trang chủ
const nutKhamPham = document.querySelector('.kham-pha'); // Nút khám phá trên banner
const oSoLuongGio = document.querySelector('#cartCount'); // Biểu tượng số lượng giỏ hàng
const dsBestSeller = document.querySelectorAll('#san-pham article'); // Danh sách sản phẩm bán chạy

// ///// 2. Điều hướng tương thích di động: Bật/tắt menu trên điện thoại /////
function batTatMenuDienThoai() {
    thanhDieuHuong.classList.toggle('active--ham');
    nutMenu.classList.toggle('active');
}

// ///// 3. Cập nhật số lượng giỏ hàng trên phần đầu trang /////
function capNhatSoGioHang() {
    const gioHang = JSON.parse(localStorage.getItem('cart')) || [];
    let tongSoLuong = 0;

    gioHang.forEach(function (monHang) {
        tongSoLuong += monHang.sl;
    });

    if (oSoLuongGio) {
        oSoLuongGio.textContent = tongSoLuong;
    }
}

// ///// 4. Kiểm tra trạng thái phiên đăng nhập của người dùng /////
function checkAuthentication() {
    const authBox = document.querySelector('#authentication'); // Khối Đăng nhập/Đăng ký
    const userInfoBox = document.querySelector('#user-info'); // Khối thông tin người dùng
    const principal = document.querySelector('#principal'); // Vị trí hiển thị lời chào
    const logoutBtn = document.querySelector('#logout'); // Nút Đăng xuất

    const account = JSON.parse(localStorage.getItem('account'));

    // Trường hợp 1: Người dùng đã đăng nhập -> hiển thị thông tin, ẩn nút đăng nhập/đăng ký
    if (authBox && userInfoBox && principal) {
        if (account != null && account.isLoggedIn === true) {
            authBox.classList.add('hidden');
            userInfoBox.classList.remove('hidden');
            principal.textContent = 'Xin chào, ' + account.username;
        } else {
            // Trường hợp 2: Chưa đăng nhập -> hiển thị nút đăng nhập/đăng ký
            authBox.classList.remove('hidden');
            userInfoBox.classList.add('hidden');
        }
    }

    // Xử lý sự kiện Đăng xuất
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();

            const account = JSON.parse(localStorage.getItem('account'));
            if (account != null) {
                account.isLoggedIn = false;
                localStorage.setItem('account', JSON.stringify(account));
            }

            localStorage.removeItem('cart'); // Xóa giỏ hàng khi đăng xuất
            alert('Đã đăng xuất!');
            location.href = 'index.html'; // Chuyển về trang chủ
        });
    }
}

// ///// 5. Hàm tiện ích: Điều hướng sang trang cửa hàng theo danh mục /////
function chuyenTrangShop(loai) {
    if (loai === '') {
        window.location.href = 'shop.html';
    } else {
        // Truyền mã danh mục qua tham số URL
        window.location.href = 'shop.html?category=' + encodeURIComponent(loai);
    }
}

// ///// 6. Hàm tiện ích: Chuyển sang trang xem chi tiết sản phẩm /////
function chuyenTrangChiTiet(sp) {
    // Đóng gói dữ liệu sản phẩm vào tham số URL
    const url = 'detail.html?' +
        'id=' + encodeURIComponent(sp.id) +
        '&category=' + encodeURIComponent(sp.category) +
        '&name=' + encodeURIComponent(sp.name) +
        '&price=' + encodeURIComponent(sp.price) +
        '&image=' + encodeURIComponent(sp.image);

    window.location.href = url;
}

// ///// 7. Lắng nghe sự kiện: Đăng ký các sự kiện tương tác /////

// Nhấn nút 'Khám phá ngay' trên banner -> chuyển sang shop.html (tất cả sản phẩm)
if (nutKhamPham) {
    nutKhamPham.addEventListener('click', function (e) {
        e.preventDefault();
        chuyenTrangShop('');
    });
}

// Nhấn vào sản phẩm bán chạy -> chuyển sang xem chi tiết ở detail.html
dsBestSeller.forEach((i) => {
    i.addEventListener('click', function (e) {
        e.preventDefault();

        const data = {
            id: i.getAttribute('data-id'),
            category: i.getAttribute('data-category'),
            name: i.querySelector('figcaption').textContent.trim(),
            price: Number(i.getAttribute('data-price')),
            image: i.querySelector('img').getAttribute('src')
        };

        chuyenTrangChiTiet(data);
    });
});

// Nhấn vào hình ảnh danh mục trên trang chủ
cacLinkWebHinh.forEach((e) => {
    e.addEventListener('click', function () {
        const loai = e.getAttribute('data-category');
        chuyenTrangShop(loai);
    });
});

// Nhấn vào liên kết danh mục trên thanh menu
cacLinkWeb.forEach((e) => {
    e.addEventListener('click', function (evt) {
        evt.preventDefault();
        const loai = e.getAttribute('data-category');
        chuyenTrangShop(loai);
    });
});

// ///// 8. Khởi chạy khi tải trang /////
checkAuthentication();
capNhatSoGioHang();

if (nutMenu) {
    nutMenu.addEventListener('click', batTatMenuDienThoai);
}
