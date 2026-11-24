/*
 * @File: main.js - Core Utilities: Navigation, Authentication & Shopping Cart Synchronization
 * @Module: CT188 - Nhập môn Lập trình Web
 * Trường Công nghệ Thông tin & Truyền thông - Đại học Cần Thơ (CTU)
 * Giảng viên hướng dẫn: ThS. GVC. Vũ Duy Linh
 * Đồ án: Website Cửa hàng Mắt kính An Phát
 */

// ///// 1. DOM Traversal: Lấy các phần tử dùng chung trên Header & Trang chủ /////
const thanhDieuHuong = document.querySelector('.header__navform'); // Menu navigation
const nutMenu = document.querySelector('.hamburger'); // Mobile hamburger icon
const cacLinkWeb = document.querySelectorAll('a[data-category]'); // Category links trên menu
const cacLinkWebHinh = document.querySelectorAll('#danh-muc article img'); // Category images trang chủ
const nutKhamPham = document.querySelector('.kham-pha'); // Banner button
const oSoLuongGio = document.querySelector('#cartCount'); // Badge giỏ hàng
const dsBestSeller = document.querySelectorAll('#san-pham article'); // Best seller items

// ///// 2. Responsive Navigation: Bật/tắt menu mobile /////
function batTatMenuDienThoai() {
    thanhDieuHuong.classList.toggle('active--ham');
    nutMenu.classList.toggle('active');
}

// ///// 3. Web Storage API: Cập nhật badge số lượng giỏ hàng trên header /////
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

// ///// 4. Authentication: Kiểm tra trạng thái phiên đăng nhập /////
function checkAuthentication() {
    const authBox = document.querySelector('#authentication'); // Nút Đăng nhập/Đăng ký
    const userInfoBox = document.querySelector('#user-info'); // Khối thông tin User
    const principal = document.querySelector('#principal'); // Chứa lời chào
    const logoutBtn = document.querySelector('#logout'); // Nút Đăng xuất

    const account = JSON.parse(localStorage.getItem('account'));

    // trh 1: Người dùng đã đăng nhập -> hiển thị thông tin, ẩn nút login/register
    if (authBox && userInfoBox && principal) {
        if (account != null && account.isLoggedIn === true) {
            authBox.classList.add('hidden');
            userInfoBox.classList.remove('hidden');
            principal.textContent = 'Xin chào, ' + account.username;
        } else {
            // trh 2: Chưa đăng nhập -> hiển thị nút login/register
            authBox.classList.remove('hidden');
            userInfoBox.classList.add('hidden');
        }
    }

    // Xử lý sự kiện Đăng xuất (Logout)
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

// ///// 5. Hàm tiện ích: Điều hướng sang trang Shop theo danh mục /////
function chuyenTrangShop(loai) {
    if (loai === '') {
        window.location.href = 'shop.html';
    } else {
        // Truyền tham số danh mục qua URL Query String
        window.location.href = 'shop.html?category=' + encodeURIComponent(loai);
    }
}

// ///// 6. Hàm tiện ích: Chuyển sang trang xem chi tiết sản phẩm /////
function chuyenTrangChiTiet(sp) {
    // Đóng gói dữ liệu sản phẩm vào URL Query Parameters
    const url = 'detail.html?' +
        'id=' + encodeURIComponent(sp.id) +
        '&category=' + encodeURIComponent(sp.category) +
        '&name=' + encodeURIComponent(sp.name) +
        '&price=' + encodeURIComponent(sp.price) +
        '&image=' + encodeURIComponent(sp.image);

    window.location.href = url;
}

// ///// 7. Event Listeners: Đăng ký sự kiện tương tác /////

// Click nút 'Khám phá' -> chuyển sang shop.html (tất cả sản phẩm)
if (nutKhamPham) {
    nutKhamPham.addEventListener('click', function (e) {
        e.preventDefault();
        chuyenTrangShop('');
    });
}

// Click sản phẩm Best Seller -> chuyển sang detail.html
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

// Click hình ảnh danh mục trên trang chủ
cacLinkWebHinh.forEach((e) => {
    e.addEventListener('click', function () {
        const loai = e.getAttribute('data-category');
        chuyenTrangShop(loai);
    });
});

// Click liên kết danh mục trên menu header
cacLinkWeb.forEach((e) => {
    e.addEventListener('click', function (evt) {
        evt.preventDefault();
        const loai = e.getAttribute('data-category');
        chuyenTrangShop(loai);
    });
});

// ///// 8. Khởi chạy khi nạp trang /////
checkAuthentication();
capNhatSoGioHang();

if (nutMenu) {
    nutMenu.addEventListener('click', batTatMenuDienThoai);
}
