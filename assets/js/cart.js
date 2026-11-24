/*
 * @File: cart.js - Shopping Cart using localStorage & DOM Manipulation
 * @Module: CT188 - Nhập môn Lập trình Web
 * Trường Công nghệ Thông tin & Truyền thông - Đại học Cần Thơ (CTU)
 * Giảng viên hướng dẫn: ThS. GVC. Vũ Duy Linh
 * Đồ án: Website Cửa hàng Mắt kính An Phát
 * Ghi chú: Sử dụng DOM createElement thay cho innerHTML để tối ưu hiệu năng và an toàn mã nguồn
 */

// ///// 1. Hàm hiển thị giỏ hàng (Client-Side Rendering) /////
function showcart() { // được gọi khi nạp trang cart.html
    // Lấy dữ liệu từ Web Storage (localStorage)
    let gioHangHienTai = JSON.parse(localStorage.getItem('cart'));

    // Kiểm tra nếu giỏ hàng rỗng (null hoặc length === 0)
    if (gioHangHienTai == null || gioHangHienTai.length === 0) {
        alert("Giỏ hàng hiện tại đang trống.");
        return; // Dừng thực thi
    }

    // DOM Traversal: Lấy các nút đích trong bảng
    const tlhead = document.querySelector('.list-head'); // <thead>
    const tlbody = document.querySelector('.list-body'); // <tbody>
    const tlfooter = document.querySelector('.list-foot'); // <tfoot>

    // DOM Manipulation: Tạo hàng tiêu đề bảng
    const trhead = document.createElement('tr');
    const dsCot = ['STT', 'Hình ảnh', 'Tên sản phẩm', 'Số lượng', 'Thành tiền', 'Xóa'];

    dsCot.forEach(tungCot => {
        const th = document.createElement('th');
        th.textContent = tungCot;
        trhead.appendChild(th);
    });
    tlhead.appendChild(trhead);

    let tong = 0, so = 0;

    // Duyệt mảng giỏ hàng để tạo các dòng sản phẩm trong tbody
    gioHangHienTai.forEach(i => {
        const thanhTien = i.sl * i.price; // Thành tiền = số lượng * đơn giá
        tong += thanhTien; // Cộng dồn tổng tiền

        const tr = document.createElement('tr'); // Tạo row mới

        // Cột 1: STT
        const tdso = document.createElement('td');
        tdso.textContent = ++so;
        tr.appendChild(tdso);

        // Cột 2: Hình ảnh sản phẩm
        const tdHA = document.createElement('td');
        const img = document.createElement('img');
        img.src = i.image;
        img.alt = i.name;
        img.classList.add('cart-img');
        tdHA.appendChild(img);
        tr.appendChild(tdHA);

        // Cột 3: Tên sản phẩm
        const tdten = document.createElement('td');
        tdten.textContent = i.name;
        tr.appendChild(tdten);

        // Cột 4: Số lượng (quản lý số lượng với nút +/-)
        const tdsl = document.createElement('td');
        const divqsl = document.createElement('div');
        divqsl.classList.add('qlsl');

        const sl = document.createElement('span');
        sl.textContent = i.sl;

        // Cột 5: Thành tiền (tạo trước để truyền vào callback của nút +/-)
        const tdTien = document.createElement('td');
        tdTien.textContent = thanhTien.toLocaleString('vi-VN') + 'đ'; // Format tiền tệ VNĐ

        // Nút trừ (-)
        const nutTru = document.createElement('button');
        nutTru.type = 'button';
        nutTru.textContent = '-';
        // Callback function: cập nhật DOM trực tiếp không reload
        nutTru.onclick = function () {
            doiSoLuong(i.id, -1, sl, tdTien);
        };

        // Nút cộng (+)
        const nutCong = document.createElement('button');
        nutCong.type = 'button';
        nutCong.textContent = '+';
        // Callback function: cập nhật DOM trực tiếp không reload
        nutCong.onclick = function () {
            doiSoLuong(i.id, 1, sl, tdTien);
        };

        divqsl.appendChild(nutTru);
        divqsl.appendChild(sl);
        divqsl.appendChild(nutCong);
        tdsl.appendChild(divqsl);
        tr.appendChild(tdsl);

        tr.appendChild(tdTien);

        // Cột 6: Nút Xóa sản phẩm
        const tdDele = document.createElement('td');
        const Dele = document.createElement('button');
        Dele.classList.add('btn-dele');
        Dele.type = 'button';
        Dele.textContent = 'Xóa';
        // Callback function: xóa row tương ứng khỏi DOM Tree
        Dele.onclick = function () {
            xoaSanPham(i.id, tr);
        };
        tdDele.appendChild(Dele);
        tr.appendChild(tdDele);

        // Thêm row vào tbody
        tlbody.appendChild(tr);
    });

    // ///// DOM Manipulation: Tạo các hàng tổng kết ở tfoot /////
    // Dòng Tổng cộng
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.colSpan = 4;
    td1.classList.add('total-label');
    td1.textContent = 'Tổng cộng:';

    const td2 = document.createElement('td');
    td2.classList.add('total-value');
    td2.textContent = tong.toLocaleString('vi-VN') + 'đ';

    const td3 = document.createElement('td');
    td3.rowSpan = 3; // Gộp 3 hàng ở cột Xóa

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tlfooter.appendChild(tr);

    // Tính thuế VAT (10%)
    const thueVAT = Math.floor(tong * 0.1);
    const tongThanhToan = tong + thueVAT;

    // Dòng VAT
    const trThue = document.createElement('tr');
    const tdThueLabel = document.createElement('td');
    tdThueLabel.colSpan = 4;
    tdThueLabel.classList.add('total-label');
    tdThueLabel.textContent = 'VAT (10%):';

    const tdThueValue = document.createElement('td');
    tdThueValue.classList.add('total-value');
    tdThueValue.textContent = thueVAT.toLocaleString('vi-VN') + 'đ';

    trThue.appendChild(tdThueLabel);
    trThue.appendChild(tdThueValue);
    tlfooter.appendChild(trThue);

    // Dòng Thành tiền (Tổng thanh toán)
    const trThanhTien = document.createElement('tr');
    const tdThanhTienLabel = document.createElement('td');
    tdThanhTienLabel.colSpan = 4;
    tdThanhTienLabel.classList.add('total-label');
    tdThanhTienLabel.textContent = 'Thành tiền:';

    const tdThanhTienValue = document.createElement('td');
    tdThanhTienValue.classList.add('total-value');
    tdThanhTienValue.textContent = tongThanhToan.toLocaleString('vi-VN') + 'đ';

    trThanhTien.appendChild(tdThanhTienLabel);
    trThanhTien.appendChild(tdThanhTienValue);
    tlfooter.appendChild(trThanhTien);
}

// ///// 2. Hàm nghiệp vụ: Cập nhật cụm tổng tiền ở tfoot /////
function capNhatTongTien() {
    const gioHangHienTai = JSON.parse(localStorage.getItem('cart')) || [];
    let tong = 0;

    // Tính lại tổng tiền từ mảng giỏ hàng
    gioHangHienTai.forEach(item => {
        tong += item.sl * item.price;
    });

    const thueVAT = Math.floor(tong * 0.1);
    const tongThanhToan = tong + thueVAT;

    // Cập nhật textContent trực tiếp vào 3 ô .total-value trong tfoot (không cần id thừa, không reload trang)
    const cacO = document.querySelectorAll('.list-foot .total-value');
    if (cacO.length >= 3) {
        cacO[0].textContent = tong.toLocaleString('vi-VN') + 'đ';
        cacO[1].textContent = thueVAT.toLocaleString('vi-VN') + 'đ';
        cacO[2].textContent = tongThanhToan.toLocaleString('vi-VN') + 'đ';
    }

    // Đồng bộ số lượng trên icon giỏ hàng ở header
    capNhatSoGioHang();
}

// ///// 3. Hàm nghiệp vụ: Thay đổi số lượng sản phẩm (+/-) /////
function doiSoLuong(idSanPham, thayDoi, slEl, tdTienEl) {
    let gioHangHienTai = JSON.parse(localStorage.getItem('cart')) || [];

    gioHangHienTai.forEach(item => {
        if (item.id === idSanPham) {
            // Điều kiện biên: số lượng tối thiểu là 1
            if (item.sl + thayDoi >= 1) {
                item.sl += thayDoi;
                // Cập nhật DOM trực tiếp tại node đích
                slEl.textContent = item.sl;
                tdTienEl.textContent = (item.sl * item.price).toLocaleString('vi-VN') + 'đ';
            }
        }
    });

    // Cập nhật dữ liệu vào localStorage
    localStorage.setItem('cart', JSON.stringify(gioHangHienTai));
    capNhatTongTien(); // Tính lại tổng tiền
}

// ///// 4. Hàm nghiệp vụ: Xóa sản phẩm khỏi giỏ hàng /////
function xoaSanPham(idSanPham, trEl) {
    let dsMoi = [];
    let gioHangHienTai = JSON.parse(localStorage.getItem('cart')) || [];

    // Lọc loại bỏ sản phẩm có id tương ứng
    gioHangHienTai.forEach(item => {
        if (item.id !== idSanPham) {
            dsMoi.push(item);
        }
    });

    // Cập nhật localStorage
    localStorage.setItem('cart', JSON.stringify(dsMoi));

    // Thao tác DOM: Xóa dòng tr tương ứng khỏi cây DOM
    trEl.remove();

    // trh 1: Giỏ hàng trống sau khi xóa
    if (dsMoi.length === 0) {
        document.querySelector('.list-head').textContent = '';
        document.querySelector('.list-body').textContent = '';
        document.querySelector('.list-foot').textContent = '';
        capNhatSoGioHang();
        alert("Giỏ hàng hiện tại đang trống.");
        return;
    }

    // trh 2: Cập nhật lại STT cho các dòng còn lại trong tbody
    const cacDong = document.querySelectorAll('.list-body tr');
    cacDong.forEach((dong, idx) => {
        dong.children[0].textContent = idx + 1; // Nút đích: td đầu tiên
    });

    capNhatTongTien(); // Tính lại tổng tiền
}

// ///// 5. Event Listener: Xử lý nút Đặt hàng (#btnOrder) /////
const nutDatHang = document.querySelector('#btnOrder');
if (nutDatHang) {
    nutDatHang.addEventListener('click', function () {
        // Kiểm tra xác thực người dùng (Authentication check)
        const account = JSON.parse(localStorage.getItem('account'));

        if (account == null || account.isLoggedIn !== true) {
            alert('Vui lòng đăng nhập để đặt hàng!');
            location.href = 'login.html'; // Chuyển hướng trang
            return;
        }

        const gioHang = JSON.parse(localStorage.getItem('cart')) || [];

        if (gioHang.length === 0) {
            alert('Giỏ hàng của bạn đang trống, vui lòng chọn sản phẩm trước khi đặt hàng!');
            return;
        }

        // Đặt hàng thành công: xóa dữ liệu giỏ hàng và điều hướng
        alert('Đặt hàng thành công!');
        localStorage.removeItem('cart'); // Xóa giỏ hàng
        location.href = 'index.html'; // Chuyển về trang chủ
    });
}

// ///// Khởi chạy hàm showcart() lần đầu khi tải trang /////
showcart();
