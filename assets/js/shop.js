/*
 * @File: shop.js - Danh mục sản phẩm, Lọc & Tìm kiếm
 */

// ///// 1. Duyệt cây DOM: Lấy các phần tử bộ lọc và danh sách sản phẩm /////
const tieuDeShop = document.querySelector('#pageTitle');
const oLocGia = document.querySelector('#price');
const khungSanPham = document.querySelector('.shop-grid');
const nutDatLai = document.querySelector('#reset');
const oTimKiem = document.querySelector('#search');
const dsNutThemGio = document.querySelectorAll('.add-cart-btn');
const dsTheShop = document.querySelectorAll('.shop-card');

// ///// 2. Hàm trích xuất mã danh mục từ URL /////
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

    // Duyệt danh sách sản phẩm: ẩn/hiện bằng lớp class 'hidden'
    data.forEach((e) => {
        const currloai = e.querySelectorAll('p.hidden')[0].textContent.trim();
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
        const dsAn = the.querySelectorAll('p.hidden');
        const loaiThe = dsAn[0].textContent.trim();
        const gia = dsAn[2].textContent.trim();

        const dungLoai = (loai === '' || loaiThe === loai);
        const dungGia = kiemTraGia(gia, mucGia);

        if (dungLoai && dungGia) {
            the.classList.remove('hidden');
        } else {
            the.classList.add('hidden');
        }
    });
}

// ///// 6. Hàm Đặt lại bộ lọc về giá trị mặc định /////
function nuReset() {
    oLocGia.selectedIndex = 0;
    oTimKiem.value = '';
    locTheoGia();
}

// ///// 7. Hàm nghiệp vụ: Tìm kiếm trực tiếp kết hợp bộ lọc /////
function timKiemSanPham() {
    const loai = layDanhMucURL();
    const mucGia = oLocGia.value;
    const tuKhoa = oTimKiem.value.trim().toLowerCase();
    const dsThe = khungSanPham.querySelectorAll('.shop-card');

    dsThe.forEach(function (the) {
        const dsAn = the.querySelectorAll('p.hidden');
        const loaiThe = dsAn[0].textContent.trim();
        const giaThe = dsAn[2].textContent.trim();
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

// ///// 8. Hàm trích xuất dữ liệu sản phẩm từ thẻ DOM /////
function docThongTinThe(the) {
            // Danh sách dữ liệu ẩn (dữ liệu bị ẩn đị)
    const dsAn = the.querySelectorAll('p.hidden');
    return {
        id: dsAn[1].textContent.trim(),
        category: dsAn[0].textContent.trim(),
        name: the.querySelector('.shop-card__title').textContent.trim(),
        price: Number(dsAn[2].textContent.trim()),
        image: the.querySelector('.shop-card__img').getAttribute('src')
    };
}

// ///// 9. Lắng nghe sự kiện: Xử lý Thêm nhanh vào giỏ hàng /////
dsNutThemGio.forEach(function (nutGio) {
    nutGio.addEventListener('click', function (suKien) {
        // Ngăn chặn nổi bọt sự kiện lên thẻ cha (không kích hoạt xem chi tiết)
        suKien.stopPropagation();

        // Kiểm tra trạng thái đăng nhập
        const account = JSON.parse(localStorage.getItem('account'));

        if (account == null || account.isLoggedIn !== true) {
            alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
            location.href = 'login.html';
            return;
        }

        // Lấy thông tin từ thẻ sản phẩm chứa nút này
        const theSanPham = nutGio.parentElement.parentElement;
        const sanPhamMoi = docThongTinThe(theSanPham);
        const gioHang = JSON.parse(localStorage.getItem('cart')) || [];

        // Kiểm tra sản phẩm đã có trong giỏ chưa
        const sanPhamCoSan = gioHang.find(function (monHang) {
            return monHang.id === sanPhamMoi.id;
        });

        // Trường hợp 1: Sản phẩm đã có trong giỏ -> tăng số lượng
        if (sanPhamCoSan) {
            sanPhamCoSan.sl += 1;
        } else {
            // Trường hợp 2: Sản phẩm chưa có trong giỏ -> thêm mới
            sanPhamMoi.sl = 1;
            gioHang.push(sanPhamMoi);
        }

        // Cập nhật localStorage và badge giỏ hàng
        localStorage.setItem('cart', JSON.stringify(gioHang));
        capNhatSoGioHang();
        alert('Đã thêm "' + sanPhamMoi.name + '" vào giỏ hàng!');
    });
});

// ///// 10. Lắng nghe sự kiện: Nhấn vào thẻ sản phẩm để chuyển sang trang chi tiết /////
dsTheShop.forEach(function (the) {
    the.addEventListener('click', function () {
        const spChon = docThongTinThe(the);
        chuyenTrangChiTiet(spChon); // Hàm dùng chung từ main.js
    });
});

// ///// 11. Đăng ký các sự kiện tương tác bộ lọc /////
nutDatLai.addEventListener('click', nuReset);
oLocGia.addEventListener('change', locTheoGia);
oTimKiem.addEventListener('input', timKiemSanPham);

// ///// Khởi chạy lọc theo danh mục URL khi tải trang /////
locSanPham();