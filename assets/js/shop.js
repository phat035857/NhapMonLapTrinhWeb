/*
 * @File: shop.js - Product Catalog, Filtering, Searching & Add to Cart
 * @Module: CT188 - Nhập môn Lập trình Web
 * Trường Công nghệ Thông tin & Truyền thông - Đại học Cần Thơ (CTU)
 * Giảng viên hướng dẫn: ThS. GVC. Vũ Duy Linh
 * Đồ án: Website Cửa hàng Mắt kính An Phát
 * Ghi chú: Kỹ thuật DOM Filtering, URL Query Strings và xử lý Event Bubbling (stopPropagation)
 */

// ///// 1. DOM Traversal: Lấy các phần tử bộ lọc và danh sách sản phẩm /////
const tieuDeShop = document.querySelector('#pageTitle');
const oLocGia = document.querySelector('#price');
const khungSanPham = document.querySelector('.shop-grid');
const nutDatLai = document.querySelector('#reset');
const oTimKiem = document.querySelector('#search');
const dsNutThemGio = document.querySelectorAll('.add-cart-btn');
const dsTheShop = document.querySelectorAll('.shop-card');

// ///// 2. Hàm trích xuất danh mục từ URL API (window.location.search) /////
function layDanhMucURL() {
    const thamSoURL = new URLSearchParams(window.location.search);
    return thamSoURL.get('category') || '';
}

// Cập nhật tiêu đề trang tương ứng với danh mục
function doiTieuDe(loai) {
    if (loai === 'gong-kinh') {
        tieuDeShop.textContent = 'Gọng Kính';
    } else if (loai === 'trong-kinh') {
        tieuDeShop.textContent = 'Tròng Kính';
    } else if (loai === 'kinh-mat') {
        tieuDeShop.textContent = 'Kính Mát';
    } else if (loai === 'ap-trong') {
        tieuDeShop.textContent = 'Kính Áp Tròng';
    } else {
        tieuDeShop.textContent = 'Tất Cả Sản Phẩm';
    }
}

// ///// 3. Hàm nghiệp vụ: Lọc sản phẩm theo danh mục /////
function locSanPham() {
    const loai = layDanhMucURL();
    const data = document.querySelectorAll('.shop-card');
    doiTieuDe(loai);

    // Duyệt danh sách sản phẩm: ẩn/hiện bằng class 'hidden'
    data.forEach((e) => {
        const currloai = e.getAttribute('data-category');
        if (currloai === loai || loai === '') {
            e.classList.remove('hidden');
        } else {
            e.classList.add('hidden');
        }
    });
}

// ///// 4. Hàm kiểm tra điều kiện khoảng giá /////
function kiemTraGia(gia, mucGia) {
    if (mucGia === 'duoi1') return gia < 1000000;
    if (mucGia === '1-3') return gia >= 1000000 && gia <= 3000000;
    if (mucGia === '3-10') return gia > 3000000 && gia <= 10000000;
    return true; // Tất cả mức giá
}

// ///// 5. Hàm nghiệp vụ: Lọc kết hợp danh mục và giá bán /////
function locTheoGia() {
    const loai = layDanhMucURL();
    const mucGia = oLocGia.value;
    const danhSachSanPham = document.querySelectorAll('.shop-card');

    danhSachSanPham.forEach(function (the) {
        const loaiThe = the.getAttribute('data-category');
        const gia = the.querySelector('.shop-card__current-price').getAttribute('data-price');

        const dungLoai = (loai === '' || loaiThe === loai);
        const dungGia = kiemTraGia(gia, mucGia);

        if (dungLoai && dungGia) {
            the.classList.remove('hidden');
        } else {
            the.classList.add('hidden');
        }
    });
}

// ///// 6. Hàm Reset bộ lọc về giá trị mặc định /////
function nuReset() {
    oLocGia.selectedIndex = 0;
    oTimKiem.value = '';
    locTheoGia();
}

// ///// 7. Hàm nghiệp vụ: Tìm kiếm realtime kết hợp bộ lọc /////
function timKiemSanPham() {
    const loai = layDanhMucURL();
    const mucGia = oLocGia.value;
    const tuKhoa = oTimKiem.value.trim().toLowerCase();
    const dsThe = khungSanPham.querySelectorAll('.shop-card');

    dsThe.forEach(function (the) {
        const loaiThe = the.getAttribute('data-category');
        const giaThe = the.querySelector('.shop-card__current-price').getAttribute('data-price');
        const tenThe = the.querySelector('.shop-card__title').textContent.trim().toLowerCase();

        const dungLoai = (loai === '' || loaiThe === loai);
        const dungGia = kiemTraGia(giaThe, mucGia);
        const dungTen = tenThe.includes(tuKhoa);

        if (dungLoai && dungGia && dungTen) {
            the.classList.remove('hidden');
        } else {
            the.classList.add('hidden');
        }
    });
}

// ///// 8. Hàm trích xuất dữ liệu sản phẩm từ DOM Node /////
function docThongTinThe(the) {
    return {
        id: the.getAttribute('data-id'),
        category: the.getAttribute('data-category'),
        name: the.querySelector('.shop-card__title').textContent.trim(),
        price: Number(the.querySelector('.shop-card__current-price').getAttribute('data-price')),
        image: the.querySelector('.shop-card__img').getAttribute('src')
    };
}

// ///// 9. Event Listener: Xử lý Thêm nhanh vào giỏ hàng /////
dsNutThemGio.forEach(function (nutGio) {
    nutGio.addEventListener('click', function (suKien) {
        // Ngăn chặn nổi bọt sự kiện (Event Bubbling) lên thẻ cha .shop-card
        suKien.stopPropagation();

        // Authentication check: Kiểm tra đăng nhập
        const account = JSON.parse(localStorage.getItem('account'));

        if (account == null || account.isLoggedIn !== true) {
            alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
            location.href = 'login.html';
            return;
        }

        // DOM Traversal ngược lên thẻ cha để lấy thông tin sản phẩm
        const theSanPham = nutGio.parentElement.parentElement;
        const sanPhamMoi = docThongTinThe(theSanPham);
        const gioHang = JSON.parse(localStorage.getItem('cart')) || [];

        // Kiểm tra sản phẩm đã có trong giỏ chưa
        const sanPhamCoSan = gioHang.find(function (monHang) {
            return monHang.id === sanPhamMoi.id;
        });

        // trh 1: Sản phẩm đã có trong giỏ -> tăng số lượng
        if (sanPhamCoSan) {
            sanPhamCoSan.sl += 1;
        } else {
            // trh 2: Sản phẩm chưa có trong giỏ -> thêm mới
            sanPhamMoi.sl = 1;
            gioHang.push(sanPhamMoi);
        }

        // Cập nhật localStorage và badge giỏ hàng
        localStorage.setItem('cart', JSON.stringify(gioHang));
        capNhatSoGioHang();
        alert('Đã thêm "' + sanPhamMoi.name + '" vào giỏ hàng!');
    });
});

// ///// 10. Event Listener: Click thẻ sản phẩm -> Chuyển sang trang chi tiết /////
dsTheShop.forEach(function (the) {
    the.addEventListener('click', function () {
        const spChon = docThongTinThe(the);
        chuyenTrangChiTiet(spChon); // Hàm dùng chung từ main.js
    });
});

// ///// 11. Đăng ký các sự kiện tương tác /////
nutDatLai.addEventListener('click', nuReset);
oLocGia.addEventListener('change', locTheoGia);
oTimKiem.addEventListener('input', timKiemSanPham);

// ///// Khởi chạy lọc theo danh mục URL khi tải trang /////
locSanPham();
