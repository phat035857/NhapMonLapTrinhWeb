/*
 * @File: detail.js - Product Detail & Add to Cart using URL Query Strings & localStorage
 * @Module: CT188 - Nhập môn Lập trình Web
 * Trường Công nghệ Thông tin & Truyền thông - Đại học Cần Thơ (CTU)
 * Giảng viên hướng dẫn: ThS. GVC. Vũ Duy Linh
 * Đồ án: Website Cửa hàng Mắt kính An Phát
 */

// ///// 1. DOM Traversal: Lấy các phần tử hiển thị /////
const linkDanhMuc = document.querySelector('#WebCategory'); // Breadcrumb category link
const detailCurrent = document.querySelector('.detail__current'); // Breadcrumb current item
const khungChiTiet = document.querySelector('.detail-box'); // Container chính

// ///// 2. Hàm tiện ích: Chuyển đổi mã danh mục thành tên tiếng Việt /////
function doiTenDanhMuc(maLoai) {
    if (maLoai === 'gong-kinh') return 'Gọng kính';
    if (maLoai === 'trong-kinh') return 'Tròng kính';
    if (maLoai === 'kinh-mat') return 'Kính mát';
    if (maLoai === 'ap-trong') return 'Kính áp tròng';
    return 'Sản phẩm';
}

// ///// 3. Hàm hiển thị chi tiết sản phẩm (Client-Side Rendering từ URL) /////
function showDetail() {
    // Trích xuất tham số từ URL Query String (URL API / window.location.search)
    const thamSoURL = new URLSearchParams(window.location.search);

    const sp = {
        id: thamSoURL.get('id'),
        category: thamSoURL.get('category'),
        name: thamSoURL.get('name'),
        price: Number(thamSoURL.get('price')),
        image: thamSoURL.get('image')
    };

    // Kiểm tra tính hợp lệ của tham số URL
    if (sp == null || !sp.id) {
        alert('Không tìm thấy sản phẩm.');
        location.href = 'shop.html';
        return;
    }

    const tenLoai = doiTenDanhMuc(sp.category);
    const giaChuoi = sp.price.toLocaleString('vi-VN') + 'đ'; // Format tiền tệ

    // Cập nhật breadcrumb navigation
    linkDanhMuc.textContent = tenLoai;
    linkDanhMuc.href = 'shop.html?category=' + encodeURIComponent(sp.category);
    detailCurrent.textContent = sp.name;

    // ///// DOM Manipulation: Tạo cột bên trái (Hình ảnh sản phẩm) /////
    const cotTrai = document.createElement('div');
    cotTrai.classList.add('detail-left');

    const img = document.createElement('img');
    img.src = sp.image;
    img.alt = sp.name;
    img.classList.add('detail-img');
    cotTrai.appendChild(img);

    // ///// DOM Manipulation: Tạo cột bên phải (Thông tin chi tiết) /////
    const cotPhai = document.createElement('div');
    cotPhai.classList.add('detail-right');

    // Tên danh mục
    const nhanLoai = document.createElement('span');
    nhanLoai.classList.add('info-category');
    nhanLoai.textContent = tenLoai;
    cotPhai.appendChild(nhanLoai);

    // Tên sản phẩm
    const tenSP = document.createElement('h1');
    tenSP.classList.add('detail-name');
    tenSP.textContent = sp.name;
    cotPhai.appendChild(tenSP);

    // Mã sản phẩm
    const maSP = document.createElement('p');
    maSP.classList.add('detail-code');
    maSP.textContent = 'Mã sản phẩm: ' + sp.id;
    cotPhai.appendChild(maSP);

    // Giá bán
    const giaSP = document.createElement('p');
    giaSP.classList.add('detail-price');
    giaSP.textContent = giaChuoi;
    cotPhai.appendChild(giaSP);

    // Bảng thông số sản phẩm (Table Component)
    const bangThongTin = document.createElement('table');
    bangThongTin.classList.add('info-table');
    const tbody = document.createElement('tbody');

    const dsDong = [
        ['Mã sản phẩm', sp.id],
        ['Tên sản phẩm', sp.name],
        ['Danh mục', tenLoai],
        ['Giá bán', giaChuoi]
    ];

    dsDong.forEach(dong => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.textContent = dong[0];
        const td2 = document.createElement('td');
        td2.textContent = dong[1];
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
    });
    bangThongTin.appendChild(tbody);
    cotPhai.appendChild(bangThongTin);

    // Điều khiển số lượng mua (+/-)
    let soLuong = 1;
    const dongSoLuong = document.createElement('div');
    dongSoLuong.classList.add('sell-row');

    const nhanSL = document.createElement('span');
    nhanSL.textContent = 'Số lượng:';
    dongSoLuong.appendChild(nhanSL);

    const divSoLuong = document.createElement('div');
    divSoLuong.classList.add('qlsl');

    const nutTru = document.createElement('button');
    nutTru.type = 'button';
    nutTru.textContent = '-';

    const spanSL = document.createElement('span');
    spanSL.textContent = soLuong;

    const nutCong = document.createElement('button');
    nutCong.type = 'button';
    nutCong.textContent = '+';

    // Event listener: Giảm số lượng (tối thiểu 1)
    nutTru.onclick = function () {
        if (soLuong > 1) {
            soLuong--;
            spanSL.textContent = soLuong;
        }
    };

    // Event listener: Tăng số lượng
    nutCong.onclick = function () {
        soLuong++;
        spanSL.textContent = soLuong;
    };

    divSoLuong.appendChild(nutTru);
    divSoLuong.appendChild(spanSL);
    divSoLuong.appendChild(nutCong);
    dongSoLuong.appendChild(divSoLuong);
    cotPhai.appendChild(dongSoLuong);

    // Nhóm nút hành động: Thêm vào giỏ hàng & Mua ngay
    const nhomNut = document.createElement('div');
    nhomNut.classList.add('detail-actions');

    const nutThemGio = document.createElement('button');
    nutThemGio.type = 'button';
    nutThemGio.classList.add('btn-add-cart');
    nutThemGio.textContent = 'Thêm vào giỏ hàng';
    nutThemGio.onclick = function () {
        if (themVaoGioHang(sp, soLuong)) {
            alert('Đã thêm "' + sp.name + '" vào giỏ hàng!');
        }
    };

    const nutMuaNgay = document.createElement('button');
    nutMuaNgay.type = 'button';
    nutMuaNgay.classList.add('btn-buy-now');
    nutMuaNgay.textContent = 'Mua ngay';
    nutMuaNgay.onclick = function () {
        if (themVaoGioHang(sp, soLuong)) {
            location.href = 'cart.html'; // Chuyển thẳng sang trang giỏ hàng
        }
    };

    nhomNut.appendChild(nutThemGio);
    nhomNut.appendChild(nutMuaNgay);
    cotPhai.appendChild(nhomNut);

    // Gắn 2 cột vào container chính
    khungChiTiet.appendChild(cotTrai);
    khungChiTiet.appendChild(cotPhai);
}

// ///// 4. Hàm nghiệp vụ: Thêm sản phẩm vào giỏ hàng (Web Storage API) /////
function themVaoGioHang(sanPham, soLuong) {
    // Authentication check: Kiểm tra đăng nhập
    const account = JSON.parse(localStorage.getItem('account'));

    if (account == null || account.isLoggedIn !== true) {
        alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
        location.href = 'login.html'; // Chuyển trang đăng nhập
        return false;
    }

    // Lấy giỏ hàng từ localStorage
    let gioHangHienTai = JSON.parse(localStorage.getItem('cart')) || [];
    let daCo = false;

    // trh 1: Sản phẩm đã tồn tại trong giỏ -> cập nhật số lượng
    gioHangHienTai.forEach(item => {
        if (item.id === sanPham.id) {
            item.sl += soLuong;
            daCo = true;
        }
    });

    // trh 2: Sản phẩm chưa tồn tại trong giỏ -> thêm mới vào mảng
    if (!daCo) {
        gioHangHienTai.push({
            id: sanPham.id,
            name: sanPham.name,
            price: Number(sanPham.price),
            image: sanPham.image,
            sl: soLuong
        });
    }

    // Lưu mảng giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(gioHangHienTai));
    capNhatSoGioHang(); // Đồng bộ badge giỏ hàng ở header
    return true;
}

// ///// Khởi chạy khi nạp trang /////
showDetail();
