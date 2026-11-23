const tieuDeShop = document.querySelector('#pageTitle');
const oLocGia = document.querySelector('#price');
const khungSanPham = document.querySelector('.shop-grid');
const nutDatLai = document.querySelector('#reset');
const oTimKiem = document.querySelector('#search');
const dsNutThemGio = document.querySelectorAll('.add-cart-btn');
const dsTheShop = document.querySelectorAll('.shop-card');


// Lấy danh mục từ URL
function layDanhMucURL() {
    const thamSoURL = new URLSearchParams(window.location.search);
    return thamSoURL.get('category') || '';
}

//Làm đổi tiêu đề để hiện thị ra web
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

//hàm lọc sản phẩm them danh mục đã chọn
function locSanPham() {
    const loai = layDanhMucURL();
    //chọn tất cả sản phẩm
    const data = document.querySelectorAll('.shop-card');
    doiTieuDe(loai);
    //duyệt hết tất cả phẩm sản xem sản phầm nào cùng loại(tròng kính,gọng kính,...) thì hiện thị không thì ẩn
    data.forEach((e) => {
        const currloai = e.getAttribute('data-category');
        if (currloai === loai || loai === '') {
            e.classList.remove('hidden');
        } else {
            e.classList.add('hidden');
        }
    });
}
// hàm phân loại các mức giá cho sản phẩm
function kiemTraGia(gia, mucGia) {
    if (mucGia === 'duoi1') return gia < 1000000;
    if (mucGia === '1-3') return gia >= 1000000 && gia <= 3000000;
    if (mucGia === '3-10') return gia > 3000000 && gia <= 10000000;
    return true;
}
//hàm xử lý khi người dùng lọc theo giá bán
function locTheoGia() {
    const loai = layDanhMucURL();
    const mucGia = oLocGia.value;
    const danhSachSanPham = document.querySelectorAll('.shop-card');

    //duyệt hết tất cả các sản phẩm
    danhSachSanPham.forEach(function (the) {
        const loaiThe = the.getAttribute('data-category');
        const gia = the.querySelector('.shop-card__current-price').getAttribute('data-price');

        const dungLoai = (loai === '' || loaiThe === loai);
        const dungGia = kiemTraGia(gia, mucGia);
        //nếu sản phầm đúng loại đang hiện và đúng giá lọc thì hiện thị không thì ẩn
        if (dungLoai && dungGia) {
            the.classList.remove('hidden');
        } else {
            the.classList.add('hidden');
        }
    });
}

//Hàm xử lý khi bấm vào nút reset lọc lại tất cả thêm mặc định
function nuReset() {
    oLocGia.selectedIndex = 0;
    oTimKiem.value = '';
    locTheoGia();
}

//hàm xử lý khi khách hàng dùng tính năng tìm kiếm
function timKiemSanPham() {
    const loai = layDanhMucURL();
    const mucGia = oLocGia.value;
    const tuKhoa = oTimKiem.value.trim().toLowerCase();
    const dsThe = khungSanPham.querySelectorAll('.shop-card');
    //duyệt qua tất cả các sản phẩm
    dsThe.forEach(function (the) {
        const loaiThe = the.getAttribute('data-category');
        const giaThe = the.querySelector('.shop-card__current-price').getAttribute('data-price');
        const tenThe = the.querySelector('.shop-card__title').textContent.trim().toLowerCase();

        const dungLoai = (loai === '' || loaiThe === loai);
        const dungGia = kiemTraGia(giaThe, mucGia);
        const dungTen = tenThe.includes(tuKhoa);
        //nếu đúng loại đúng giá và tìm kiến nằm trong tên thì hiện thị không thì ẩn
        if (dungLoai && dungGia && dungTen) {
            the.classList.remove('hidden');
        } else {
            the.classList.add('hidden');
        }
    });
}

//đọc dữ liệu của sản phẩm để truyền vào local
function docThongTinThe(the) {
    return {
        id: the.getAttribute('data-id'),
        category: the.getAttribute('data-category'),
        name: the.querySelector('.shop-card__title').textContent.trim(),
        price: Number(the.querySelector('.shop-card__current-price').getAttribute('data-price')),
        image: the.querySelector('.shop-card__img').getAttribute('src')
    };
}

//xử lý các nút thêm vào giỏ hàng
dsNutThemGio.forEach(function (nutGio) {
    nutGio.addEventListener('click', function (suKien) {
        suKien.stopPropagation(); //ngăn chặn lan truyền sự vì dsNut[i] là cỏn của shop-card nên khi bấm nó sẽ kích hoạt 2 cái even 1 lúc nên phải thêm stopPropagation(); 
        //nếu account == null hay chưa đặng nhập thì ko thêm vào giỏ hàng được
        const account = JSON.parse(localStorage.getItem('account'));

        if (account == null || account.isLoggedIn !== true) {
            alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
            location.href = 'login.html';
            return;
        }
        //tìm ngược lại thẻ ông nội của nút để đọc dữ liệu rồi lưu dữ liệu đó vào local
        const theSanPham = nutGio.parentElement.parentElement;
        const sanPhamMoi = docThongTinThe(theSanPham);
        const gioHang = JSON.parse(localStorage.getItem('cart')) || [];
        //tìm xem sản phẩm được thêm có trong giỏ hàng chưa
        const sanPhamCoSan = gioHang.find(function (monHang) {
            return monHang.id === sanPhamMoi.id;
        });
        //nếu có rồi thì chỉ cần cộng sl lên 1
        // nếu chưa thì thêm vào mảng gioHang
        if (sanPhamCoSan) {
            sanPhamCoSan.sl += 1;
        } else {
            sanPhamMoi.sl = 1;
            gioHang.push(sanPhamMoi);
        }
        //đưa dữ liệu lại vào local
        localStorage.setItem('cart', JSON.stringify(gioHang));
        capNhatSoGioHang();
        alert('Đã thêm "' + sanPhamMoi.name + '" vào giỏ hàng!');
    });
});

//gắn sự kiện cho tất cả các sản phẩm khí bấm vào chuyển sang trang sản phẩm chi tiết
dsTheShop.forEach(function (the) {
    the.addEventListener('click', function () {
        const spChon = docThongTinThe(the);
        chuyenTrangChiTiet(spChon);
    });
});
//gắn sự kiện cho các nút
nutDatLai.addEventListener('click', nuReset);
oLocGia.addEventListener('change', locTheoGia);
oTimKiem.addEventListener('input', timKiemSanPham);
//chạy lọc sản phẩm 1 lần khi vào web để hiện thị sản phẩm đúng danh mục
locSanPham();