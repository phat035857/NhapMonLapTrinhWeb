// ====================================================================================================
// TẬP TIN: shop.js
// DỰ ÁN: Website Cửa hàng Mắt kính An Phát (Môn Nhập môn Lập trình Web)
// MỤC ĐÍCH: Xử lý hiển thị danh sách sản phẩm trên trang cửa hàng (shop.html),
//           bao gồm: lọc theo danh mục từ URL, lọc theo khoảng giá, tìm kiếm theo tên,
//           thêm nhanh vào giỏ hàng và chuyển hướng sang trang xem chi tiết sản phẩm.
// ====================================================================================================

// 1. Lấy tham chiếu đến thẻ tiêu đề chính của trang cửa hàng (#pageTitle)
const tieuDeShop = document.querySelector('#pageTitle');

// 2. Lấy tham chiếu đến thẻ <select> lọc theo mức giá (#price)
const oLocGia = document.querySelector('#price');

// 3. Lấy tham chiếu đến khung lưới chứa toàn bộ thẻ sản phẩm (.shop-grid)
const khungSanPham = document.querySelector('.shop-grid');

// 4. Lấy tham chiếu đến nút 'Đặt lại' bộ lọc (#reset)
const nutDatLai = document.querySelector('#reset');

// 5. Lấy tham chiếu đến ô <input> tìm kiếm tên sản phẩm (#search)
const oTimKiem = document.querySelector('#search');

// 6. Lấy danh sách tất cả các nút 'Thêm vào giỏ' nhanh trên từng thẻ sản phẩm (.add-cart-btn)
const dsNutThemGio = document.querySelectorAll('.add-cart-btn');

// 7. Lấy danh sách tất cả các thẻ sản phẩm trên giao diện (.shop-card)
const dsTheShop = document.querySelectorAll('.shop-card');

/**
 * HÀM 1: layDanhMucURL()
 * - Nhiệm vụ: Trích xuất tham số 'category' từ URL query string (VD: shop.html?category=gong-kinh).
 * - Trả về: Chuỗi mã danh mục hoặc chuỗi rỗng '' nếu không có tham số.
 */
function layDanhMucURL() {
    // Đọc toàn bộ chuỗi tham số truy vấn trên thanh địa chỉ URL
    const thamSoURL = new URLSearchParams(window.location.search);
    // Lấy giá trị của tham số 'category', nếu không có thì trả về chuỗi rỗng ''
    return thamSoURL.get('category') || '';
}

/**
 * HÀM 2: doiTieuDe(loai)
 * - Nhiệm vụ: Thay đổi nội dung thẻ tiêu đề trang (#pageTitle) tương ứng với danh mục đang xem.
 * - Tham số:
 *     + loai: Mã danh mục sản phẩm (chuỗi)
 */
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
        // Mặc định nếu không chọn danh mục cụ thể hoặc chọn 'Tất cả'
        tieuDeShop.textContent = 'Tất Cả Sản Phẩm';
    }
}

/**
 * HÀM 3: locSanPham()
 * - Nhiệm vụ: Lọc các thẻ sản phẩm theo danh mục lấy từ URL khi người dùng vừa chuyển trang đến.
 * - Tham số: Không có.
 */
function locSanPham() {
    // 1. Lấy mã danh mục hiện tại từ URL
    const loai = layDanhMucURL();

    // 2. Lấy toàn bộ các thẻ sản phẩm đang có trên trang
    const data = document.querySelectorAll('.shop-card');

    // 3. Cập nhật tiêu đề trang tương ứng với danh mục vừa lấy được
    doiTieuDe(loai);

    // 4. Duyệt qua từng thẻ sản phẩm để kiểm tra thuộc tính data-category
    data.forEach((e) => {
        // Lấy mã danh mục được lưu trong thuộc tính data-category của thẻ sản phẩm
        const currloai = e.getAttribute('data-category');

        // Nếu sản phẩm trùng danh mục HOẶC đang chọn 'Tất cả' (loai === '')
        if (currloai === loai || loai === '') {
            // Xóa class 'hidden' để hiển thị sản phẩm
            e.classList.remove('hidden');
        } else {
            // Thêm class 'hidden' để ẩn sản phẩm không liên quan
            e.classList.add('hidden');
        }
    });
}

/**
 * HÀM 4: kiemTraGia(gia, mucGia)
 * - Nhiệm vụ: Kiểm tra xem mức giá của sản phẩm có nằm trong khoảng lọc mà người dùng chọn hay không.
 * - Tham số:
 *     + gia: Giá bán của sản phẩm (số hoặc chuỗi số)
 *     + mucGia: Giá trị option người dùng chọn từ dropdown (#price)
 * - Trả về: true nếu khớp khoảng giá, ngược lại false.
 */
function kiemTraGia(gia, mucGia) {
    // Khoảng 1: Dưới 1 triệu đồng (< 1.000.000)
    if (mucGia === 'duoi1') return gia < 1000000;
    // Khoảng 2: Từ 1 triệu đến 3 triệu đồng (>= 1.000.000 và <= 3.000.000)
    if (mucGia === '1-3') return gia >= 1000000 && gia <= 3000000;
    // Khoảng 3: Từ 3 triệu đến 10 triệu đồng (> 3.000.000 và <= 10.000.000)
    if (mucGia === '3-10') return gia > 3000000 && gia <= 10000000;
    // Mặc định (khi chọn 'Tất cả mức giá'): luôn trả về true
    return true;
}

/**
 * HÀM 5: locTheoGia()
 * - Nhiệm vụ: Lọc kết hợp giữa danh mục trên URL và khoảng giá đang chọn trong ô dropdown (#price).
 * - Kích hoạt khi: Người dùng thay đổi lựa chọn trong thẻ <select id="price">.
 */
function locTheoGia() {
    // 1. Lấy danh mục hiện tại từ URL
    const loai = layDanhMucURL();
    // 2. Lấy giá trị mức giá đang được chọn trong dropdown
    const mucGia = oLocGia.value;
    // 3. Lấy tất cả các thẻ sản phẩm
    const danhSachSanPham = document.querySelectorAll('.shop-card');

    // 4. Duyệt qua từng thẻ để kiểm tra cả 2 điều kiện: Đúng danh mục VÀ Đúng khoảng giá
    danhSachSanPham.forEach(function (the) {
        // Lấy danh mục của thẻ sản phẩm
        const loaiThe = the.getAttribute('data-category');
        // Lấy giá bán được lưu trong thuộc tính data-price của thẻ giá
        const gia = the.querySelector('.shop-card__current-price').getAttribute('data-price');

        // Điều kiện 1: Đúng danh mục hoặc đang hiển thị tất cả
        const dungLoai = (loai === '' || loaiThe === loai);
        // Điều kiện 2: Giá nằm trong khoảng đã chọn
        const dungGia = kiemTraGia(gia, mucGia);

        // Nếu thỏa mãn đồng thời cả 2 điều kiện thì hiển thị, ngược lại thì ẩn đi
        if (dungLoai && dungGia) {
            the.classList.remove('hidden');
        } else {
            the.classList.add('hidden');
        }
    });
}

/**
 * HÀM 6: nuReset()
 * - Nhiệm vụ: Đặt lại toàn bộ bộ lọc về trạng thái ban đầu (xóa từ khóa tìm kiếm, đặt mức giá về mặc định).
 * - Kích hoạt khi: Người dùng click vào nút 'Đặt lại' (#reset).
 */
function nuReset() {
    // 1. Đặt dropdown mức giá về lựa chọn đầu tiên (index 0 - Tất cả mức giá)
    oLocGia.selectedIndex = 0;
    // 2. Xóa trắng nội dung trong ô tìm kiếm
    oTimKiem.value = '';
    // 3. Gọi lại hàm lọc theo giá để cập nhật lại danh sách hiển thị
    locTheoGia();
}

/**
 * HÀM 7: timKiemSanPham()
 * - Nhiệm vụ: Tìm kiếm sản phẩm theo từ khóa nhập vào ô input (lọc realtime theo tên).
 * - Kết hợp đồng thời 3 điều kiện: Đúng danh mục + Đúng khoảng giá + Tên chứa từ khóa tìm kiếm.
 * - Kích hoạt khi: Người dùng gõ phím vào ô <input id="search"> (sự kiện 'input').
 */
function timKiemSanPham() {
    // 1. Lấy danh mục hiện tại từ URL
    const loai = layDanhMucURL();
    // 2. Lấy mức giá đang chọn
    const mucGia = oLocGia.value;
    // 3. Lấy từ khóa tìm kiếm, loại bỏ khoảng trắng 2 đầu và chuyển sang chữ thường (để tìm kiếm không phân biệt hoa/thường)
    const tuKhoa = oTimKiem.value.trim().toLowerCase();
    // 4. Lấy tất cả các thẻ sản phẩm trong khung lưới
    const dsThe = khungSanPham.querySelectorAll('.shop-card');

    // 5. Duyệt qua từng sản phẩm để kiểm tra
    dsThe.forEach(function (the) {
        // Lấy danh mục của sản phẩm
        const loaiThe = the.getAttribute('data-category');
        // Lấy giá sản phẩm
        const giaThe = the.querySelector('.shop-card__current-price').getAttribute('data-price');
        // Lấy tên sản phẩm và chuyển về chữ thường
        const tenThe = the.querySelector('.shop-card__title').textContent.trim().toLowerCase();

        // Kiểm tra 3 điều kiện:
        const dungLoai = (loai === '' || loaiThe === loai);
        const dungGia = kiemTraGia(giaThe, mucGia);
        const dungTen = tenThe.includes(tuKhoa); // Kiểm tra tên có chứa chuỗi từ khóa không

        // Nếu thỏa mãn cả 3 điều kiện thì hiển thị, ngược lại thì ẩn
        if (dungLoai && dungGia && dungTen) {
            the.classList.remove('hidden');
        } else {
            the.classList.add('hidden');
        }
    });
}

/**
 * HÀM 8: docThongTinThe(the)
 * - Nhiệm vụ: Đọc và trích xuất dữ liệu của 1 thẻ sản phẩm (.shop-card) từ các thuộc tính HTML.
 * - Tham số:
 *     + the: Thẻ DOM đại diện cho 1 sản phẩm (.shop-card)
 * - Trả về: Đối tượng (Object) chứa đầy đủ thông tin {id, category, name, price, image}.
 */
function docThongTinThe(the) {
    return {
        id: the.getAttribute('data-id'),                                                              // Lấy mã sản phẩm
        category: the.getAttribute('data-category'),                                                 // Lấy mã danh mục
        name: the.querySelector('.shop-card__title').textContent.trim(),                             // Lấy tên sản phẩm
        price: Number(the.querySelector('.shop-card__current-price').getAttribute('data-price')),     // Lấy đơn giá dạng số
        image: the.querySelector('.shop-card__img').getAttribute('src')                              // Lấy đường dẫn ảnh
    };
}

// ====================================================================================================
// KHỐI 9: XỬ LÝ SỰ KIỆN CLICK NÚT 'THÊM VÀO GIỎ' NHANH TRÊN MỖI THẺ SẢN PHẨM
// ====================================================================================================
dsNutThemGio.forEach(function (nutGio) {
    nutGio.addEventListener('click', function (suKien) {
        // 1. Ngăn chặn sự kiện nổi bọt (event bubbling): vì nút thêm giỏ nằm trong thẻ .shop-card,
        // nếu không stopPropagation thì khi bấm nút thêm giỏ sẽ kích hoạt luôn cả sự kiện click vào thẻ chuyển sang trang chi tiết
        suKien.stopPropagation();

        // 2. Kiểm tra thông tin tài khoản đăng nhập từ localStorage
        const account = JSON.parse(localStorage.getItem('account'));

        // 3. Nếu chưa đăng nhập thì không cho thêm sản phẩm vào giỏ
        if (account == null || account.isLoggedIn !== true) {
            alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
            // Điều hướng người dùng sang trang đăng nhập
            location.href = 'login.html';
            return;
        }

        // 4. Tìm thẻ cha ông (thẻ .shop-card chứa nút này) để trích xuất dữ liệu sản phẩm
        const theSanPham = nutGio.parentElement.parentElement;
        const sanPhamMoi = docThongTinThe(theSanPham);

        // 5. Lấy giỏ hàng hiện tại từ localStorage
        const gioHang = JSON.parse(localStorage.getItem('cart')) || [];

        // 6. Kiểm tra xem sản phẩm đã có sẵn trong giỏ hàng hay chưa
        const sanPhamCoSan = gioHang.find(function (monHang) {
            return monHang.id === sanPhamMoi.id;
        });

        // 7. Nếu sản phẩm đã tồn tại thì chỉ tăng số lượng thêm 1
        if (sanPhamCoSan) {
            sanPhamCoSan.sl += 1;
        } else {
            // Nếu chưa có thì khởi tạo số lượng = 1 và thêm sản phẩm vào mảng giỏ hàng
            sanPhamMoi.sl = 1;
            gioHang.push(sanPhamMoi);
        }

        // 8. Lưu mảng giỏ hàng đã cập nhật trở lại localStorage
        localStorage.setItem('cart', JSON.stringify(gioHang));

        // 9. Cập nhật lại số lượng hàng hiển thị trên badge ở thanh header (từ main.js)
        capNhatSoGioHang();

        // 10. Thông báo cho người dùng đã thêm sản phẩm thành công
        alert('Đã thêm "' + sanPhamMoi.name + '" vào giỏ hàng!');
    });
});

// ====================================================================================================
// KHỐI 10: XỬ LÝ SỰ KIỆN CLICK VÀO THẺ SẢN PHẨM ĐỂ XEM CHI TIẾT
// ====================================================================================================
dsTheShop.forEach(function (the) {
    the.addEventListener('click', function () {
        // 1. Đọc thông tin sản phẩm của thẻ vừa click
        const spChon = docThongTinThe(the);
        // 2. Gọi hàm chuyenTrangChiTiet (được định nghĩa trong main.js) để chuyển sang detail.html kèm query string
        chuyenTrangChiTiet(spChon);
    });
});

// ====================================================================================================
// KHỐI 11: ĐĂNG KÝ CÁC SỰ KIỆN CHO BỘ LỌC VÀ TÌM KIẾM
// ====================================================================================================
// 1. Bấm nút 'Đặt lại' -> gọi hàm nuReset()
nutDatLai.addEventListener('click', nuReset);

// 2. Thay đổi lựa chọn mức giá -> gọi hàm locTheoGia()
oLocGia.addEventListener('change', locTheoGia);

// 3. Nhập từ khóa vào ô tìm kiếm -> gọi hàm timKiemSanPham()
oTimKiem.addEventListener('input', timKiemSanPham);

// ====================================================================================================
// KHỐI 12: KHỞI ĐỘNG KHI TẢI TRANG
// ====================================================================================================
// Tự động gọi locSanPham() ngay khi vào trang shop.html để lọc sản phẩm theo đúng danh mục trên URL
locSanPham();
