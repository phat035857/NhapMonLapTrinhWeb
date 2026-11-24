// ====================================================================================================
// TẬP TIN: detail.js
// DỰ ÁN: Website Cửa hàng Mắt kính An Phát (Môn Nhập môn Lập trình Web)
// MỤC ĐÍCH: Xử lý hiển thị thông tin chi tiết của 1 sản phẩm (detail.html), 
//           quản lý số lượng mua, chức năng 'Thêm vào giỏ hàng' và 'Mua ngay'
// ====================================================================================================

// 1. Lấy tham chiếu đến thẻ liên kết danh mục trên thanh điều hướng breadcrumb (để quay lại trang shop)
const linkDanhMuc = document.querySelector('#WebCategory');

// 2. Lấy tham chiếu đến thẻ hiển thị tên sản phẩm hiện tại trên thanh breadcrumb
const detailCurrent = document.querySelector('.detail__current');

// 3. Lấy tham chiếu đến khung container chứa nội dung chi tiết sản phẩm (.detail-box)
const khungChiTiet = document.querySelector('.detail-box');

/**
 * HÀM 1: doiTenDanhMuc(maLoai)
 * - Nhiệm vụ: Chuyển đổi mã định danh danh mục (slug) thành tên tiếng Việt có dấu để hiển thị lên giao diện.
 * - Tham số:
 *     + maLoai: Mã danh mục dạng chuỗi (VD: 'gong-kinh', 'trong-kinh', ...)
 * - Trả về: Tên hiển thị tương ứng bằng tiếng Việt.
 */
function doiTenDanhMuc(maLoai) {
    if (maLoai === 'gong-kinh') return 'Gọng kính';
    if (maLoai === 'trong-kinh') return 'Tròng kính';
    if (maLoai === 'kinh-mat') return 'Kính mát';
    if (maLoai === 'ap-trong') return 'Kính áp tròng';
    return 'Sản phẩm'; // Giá trị mặc định nếu mã không khớp các loại trên
}

/**
 * HÀM 2: showDetail()
 * - Nhiệm vụ: Đọc các tham số của sản phẩm được truyền qua URL query string (?id=...&name=...),
 *             kiểm tra tính hợp lệ và dựng giao diện chi tiết bằng DOM.
 * - Tham số: Không có.
 */
function showDetail() {
    // 1. Lấy chuỗi query string từ URL hiện tại (window.location.search)
    const thamSoURL = new URLSearchParams(window.location.search);

    // 2. Trích xuất từng thông số của sản phẩm từ URL và đóng gói thành một đối tượng (Object) 'sp'
    const sp = {
        id: thamSoURL.get('id'),                       // Lấy mã sản phẩm
        category: thamSoURL.get('category'),           // Lấy mã danh mục sản phẩm
        name: thamSoURL.get('name'),                   // Lấy tên sản phẩm
        price: Number(thamSoURL.get('price')),         // Lấy giá sản phẩm và ép kiểu sang Number
        image: thamSoURL.get('image')                  // Lấy đường dẫn hình ảnh sản phẩm
    };

    // 3. Kiểm tra an toàn: Nếu đối tượng không hợp lệ hoặc thiếu id
    if (sp == null || !sp.id) {
        // Thông báo lỗi cho người dùng
        alert('Không tìm thấy sản phẩm.');
        // Chuyển hướng người dùng quay trở lại trang danh sách sản phẩm (shop.html)
        location.href = 'shop.html';
        // Dừng thực thi hàm
        return;
    }

    // 4. Lấy tên hiển thị danh mục sản phẩm bằng hàm doiTenDanhMuc
    const tenLoai = doiTenDanhMuc(sp.category);
    // 5. Định dạng giá bán sang chuẩn tiền tệ Việt Nam (VD: 350.000đ)
    const giaChuoi = sp.price.toLocaleString('vi-VN') + 'đ';

    // 6. Hiển thị tên danh mục lên thanh điều hướng breadcrumb
    linkDanhMuc.textContent = tenLoai;
    // 7. Gán đường link cho danh mục để khi người dùng click sẽ lọc các sản phẩm cùng loại trên shop.html
    linkDanhMuc.href = 'shop.html?category=' + encodeURIComponent(sp.category);

    // 8. Hiển thị tên sản phẩm hiện tại vào vị trí cuối của thanh breadcrumb
    detailCurrent.textContent = sp.name;

    // --- BƯỚC A: TẠO CỘT TRÁI (HIỂN THỊ HÌNH ẢNH SẢN PHẨM) ---
    // Tạo thẻ div bao bọc cột hình ảnh bên trái
    const cotTrai = document.createElement('div');
    // Thêm class 'detail-left' theo stylesheet
    cotTrai.classList.add('detail-left');

    // Tạo thẻ <img> hiển thị ảnh sản phẩm
    const img = document.createElement('img');
    // Gán thuộc tính đường dẫn ảnh
    img.src = sp.image;
    // Gán thuộc tính văn bản thay thế
    img.alt = sp.name;
    // Thêm class 'detail-img' định dạng kích thước ảnh chi tiết
    img.classList.add('detail-img');
    // Gắn thẻ <img> vào cột trái
    cotTrai.appendChild(img);

    // --- BƯỚC B: TẠO CỘT PHẢI (HIỂN THỊ THÔNG TIN CHI TIẾT SẢN PHẨM) ---
    // Tạo thẻ div bao bọc cột thông tin bên phải
    const cotPhai = document.createElement('div');
    // Thêm class 'detail-right' theo stylesheet
    cotPhai.classList.add('detail-right');

    // 1. Tạo thẻ nhãn hiển thị danh mục sản phẩm
    const nhanLoai = document.createElement('span');
    nhanLoai.classList.add('info-category');
    nhanLoai.textContent = tenLoai;
    cotPhai.appendChild(nhanLoai);

    // 2. Tạo thẻ tiêu đề <h1> hiển thị tên sản phẩm
    const tenSP = document.createElement('h1');
    tenSP.classList.add('detail-name');
    tenSP.textContent = sp.name;
    cotPhai.appendChild(tenSP);

    // 3. Tạo thẻ đoạn văn <p> hiển thị mã sản phẩm
    const maSP = document.createElement('p');
    maSP.classList.add('detail-code');
    maSP.textContent = 'Mã sản phẩm: ' + sp.id;
    cotPhai.appendChild(maSP);

    // 4. Tạo thẻ đoạn văn <p> hiển thị giá bán nổi bật
    const giaSP = document.createElement('p');
    giaSP.classList.add('detail-price');
    giaSP.textContent = giaChuoi;
    cotPhai.appendChild(giaSP);

    // 5. Tạo bảng (table) tóm tắt các thông số của sản phẩm
    const bangThongTin = document.createElement('table');
    bangThongTin.classList.add('info-table');
    // Tạo phần thân bảng <tbody>
    const tbody = document.createElement('tbody');

    // Mảng 2 chiều chứa các cặp thông tin [Tiêu đề, Giá trị]
    const dsDong = [
        ['Mã sản phẩm', sp.id],
        ['Tên sản phẩm', sp.name],
        ['Danh mục', tenLoai],
        ['Giá bán', giaChuoi]
    ];

    // Lặp qua từng phần tử để tạo các hàng <tr> tương ứng trong bảng
    dsDong.forEach(dong => {
        // Tạo thẻ dòng <tr>
        const tr = document.createElement('tr');
        // Tạo ô cột 1 chứa nhãn thông số
        const td1 = document.createElement('td');
        td1.textContent = dong[0];
        // Tạo ô cột 2 chứa giá trị thông số
        const td2 = document.createElement('td');
        td2.textContent = dong[1];
        // Gắn 2 ô vào dòng tr
        tr.appendChild(td1);
        tr.appendChild(td2);
        // Gắn dòng tr vào thân bảng tbody
        tbody.appendChild(tr);
    });
    // Gắn tbody vào bảng thông tin
    bangThongTin.appendChild(tbody);
    // Gắn bảng thông tin vào cột phải
    cotPhai.appendChild(bangThongTin);

    // --- BƯỚC C: TẠO KHỐI CHỌN SỐ LƯỢNG MUA (+ / -) ---
    // Khởi tạo biến lưu số lượng sản phẩm khách chọn mua (mặc định = 1)
    let soLuong = 1;
    // Tạo thẻ div bao bọc toàn bộ hàng chọn số lượng
    const dongSoLuong = document.createElement('div');
    dongSoLuong.classList.add('sell-row');

    // Tạo nhãn chữ 'Số lượng:'
    const nhanSL = document.createElement('span');
    nhanSL.textContent = 'Số lượng:';
    dongSoLuong.appendChild(nhanSL);

    // Tạo khung điều khiển số lượng (nút trừ, số lượng, nút cộng)
    const divSoLuong = document.createElement('div');
    divSoLuong.classList.add('qlsl');

    // Tạo nút Giảm (-)
    const nutTru = document.createElement('button');
    nutTru.type = 'button';
    nutTru.textContent = '-';

    // Tạo thẻ span hiển thị con số số lượng
    const spanSL = document.createElement('span');
    spanSL.textContent = soLuong;

    // Tạo nút Tăng (+)
    const nutCong = document.createElement('button');
    nutCong.type = 'button';
    nutCong.textContent = '+';

    // Sự kiện khi click nút trừ: chỉ giảm nếu số lượng hiện tại > 1 (không cho mua số lượng 0 hoặc âm)
    nutTru.onclick = function () {
        if (soLuong > 1) {
            soLuong--;
            spanSL.textContent = soLuong; // Cập nhật lại số lượng hiển thị trên thẻ span
        }
    };

    // Sự kiện khi click nút cộng: tăng số lượng lên 1
    nutCong.onclick = function () {
        soLuong++;
        spanSL.textContent = soLuong; // Cập nhật lại số lượng hiển thị trên thẻ span
    };

    // Gắn các nút và thẻ span vào khung quản lý số lượng
    divSoLuong.appendChild(nutTru);
    divSoLuong.appendChild(spanSL);
    divSoLuong.appendChild(nutCong);
    dongSoLuong.appendChild(divSoLuong);
    // Gắn hàng số lượng vào cột phải
    cotPhai.appendChild(dongSoLuong);

    // --- BƯỚC D: TẠO KHỐI NÚT HÀNH ĐỘNG ('Thêm vào giỏ hàng' & 'Mua ngay') ---
    const nhomNut = document.createElement('div');
    nhomNut.classList.add('detail-actions');

    // 1. Nút 'Thêm vào giỏ hàng'
    const nutThemGio = document.createElement('button');
    nutThemGio.type = 'button';
    nutThemGio.classList.add('btn-add-cart');
    nutThemGio.textContent = 'Thêm vào giỏ hàng';
    // Xử lý khi click: gọi hàm themVaoGioHang(), nếu thành công thì hiện alert thông báo
    nutThemGio.onclick = function () {
        if (themVaoGioHang(sp, soLuong)) {
            alert('Đã thêm "' + sp.name + '" vào giỏ hàng!');
        }
    };

    // 2. Nút 'Mua ngay'
    const nutMuaNgay = document.createElement('button');
    nutMuaNgay.type = 'button';
    nutMuaNgay.classList.add('btn-buy-now');
    nutMuaNgay.textContent = 'Mua ngay';
    // Xử lý khi click: thêm vào giỏ hàng và chuyển hướng ngay sang trang giỏ hàng (cart.html)
    nutMuaNgay.onclick = function () {
        if (themVaoGioHang(sp, soLuong)) {
            location.href = 'cart.html';
        }
    };

    // Gắn các nút vào nhóm nút hành động
    nhomNut.appendChild(nutThemGio);
    nhomNut.appendChild(nutMuaNgay);
    cotPhai.appendChild(nhomNut);

    // --- BƯỚC E: GẮN CẢ CỘT TRÁI VÀ CỘT PHẢI VÀO KHUNG CHI TIẾT CHÍNH ---
    khungChiTiet.appendChild(cotTrai);
    khungChiTiet.appendChild(cotPhai);
}

/**
 * HÀM 3: themVaoGioHang(sanPham, soLuong)
 * - Nhiệm vụ: Kiểm tra quyền đăng nhập, đọc/ghi giỏ hàng trong localStorage để thêm sản phẩm.
 * - Tham số:
 *     + sanPham: Đối tượng chứa thông tin sản phẩm (id, name, price, image)
 *     + soLuong: Số lượng muốn thêm vào giỏ
 * - Trả về: true nếu thêm thành công, false nếu thất bại (chưa đăng nhập)
 */
function themVaoGioHang(sanPham, soLuong) {
    // 1. Kiểm tra trạng thái đăng nhập từ localStorage
    const account = JSON.parse(localStorage.getItem('account'));

    // Nếu chưa có tài khoản hoặc chưa đăng nhập thành công (isLoggedIn !== true)
    if (account == null || account.isLoggedIn !== true) {
        // Thông báo yêu cầu đăng nhập
        alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
        // Chuyển hướng người dùng sang trang đăng nhập (login.html)
        location.href = 'login.html';
        // Trả về false báo hiệu thất bại
        return false;
    }

    // 2. Lấy dữ liệu giỏ hàng hiện tại từ localStorage (nếu chưa có thì tạo mảng rỗng [])
    let gioHangHienTai = JSON.parse(localStorage.getItem('cart')) || [];

    // 3. Khởi tạo cờ kiểm tra xem sản phẩm đã có sẵn trong giỏ hay chưa
    let daCo = false;

    // 4. Duyệt qua mảng giỏ hàng để tìm sản phẩm có ID trùng khớp
    gioHangHienTai.forEach(item => {
        if (item.id === sanPham.id) {
            // Nếu đã tồn tại: chỉ cần tăng thêm số lượng mới vào số lượng cũ
            item.sl += soLuong;
            // Đánh dấu cờ là đã có
            daCo = true;
        }
    });

    // 5. Nếu sản phẩm chưa có trong giỏ hàng (daCo === false): thêm mới một phần tử vào mảng
    if (!daCo) {
        gioHangHienTai.push({
            id: sanPham.id,
            name: sanPham.name,
            price: Number(sanPham.price),
            image: sanPham.image,
            sl: soLuong
        });
    }

    // 6. Lưu mảng giỏ hàng mới vào localStorage dưới dạng chuỗi JSON
    localStorage.setItem('cart', JSON.stringify(gioHangHienTai));

    // 7. Gọi hàm capNhatSoGioHang() (từ main.js) để cập nhật số lượng hiển thị trên icon giỏ hàng ở header
    capNhatSoGioHang();

    // 8. Trả về true báo hiệu thêm thành công
    return true;
}

// ====================================================================================================
// KHỐI KHỞI CHẠY KHI VỪA TẢI TRANG
// ====================================================================================================
// Tự động gọi showDetail() khi trang detail.html được nạp để vẽ toàn bộ thông tin sản phẩm lên màn hình
showDetail();
