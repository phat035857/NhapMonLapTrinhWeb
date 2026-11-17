function showcart() {
    //Lấy dữ liệu từ localStorage
    let gioHangHienTai = JSON.parse(localStorage.getItem('cart'));
    //Nếu chưa có(NULL) hoặc rỗng (độ dài = 0) thì ghi ra giỏ hàng trống và chuyển về index
    if (gioHangHienTai == null || gioHangHienTai.length === 0) {
        alert("Giỏ hàng hiện tại đang trống.");
        return;
    }

    const tlhead = document.querySelector('.list-head');
    const tlbody = document.querySelector('.list-body');
    const tlfooter = document.querySelector('.list-foot');

    const trhead = document.createElement('tr');
    //Tạo mảng cách cái cột cần thiết
    const dsCot = ['STT', 'Hình ảnh', 'Tên sản phẩm', 'Số lượng', 'Thành tiền', 'Xóa'];
    //tạo từng cột
    dsCot.forEach(tungCot => {
        const th = document.createElement('th');
        th.textContent = tungCot;
        trhead.appendChild(th);
    });
    tlhead.appendChild(trhead);

    //Tạo biến tổng để tính tổng tiền và số để biết số thứ tự
    let tong = 0, so = 0;
    //Duyệt tất cả sản phẩm được khách hàng thêm vào localstorage 
    gioHangHienTai.forEach(i => {
        //Tính tổng số tiền của sản phẩm thứ i
        const thanhTien = i.sl * i.price;
        tong += thanhTien;

        const tr = document.createElement('tr');

        //Tạo cột STT cho sản phẩm thứ i
        const tdso = document.createElement('td');
        tdso.textContent = ++so;
        tr.appendChild(tdso);

        //Tạo cột hỉnh ảnh cho sản phẩm thứ i
        const tdHA = document.createElement('td');
        const img = document.createElement('img');
        img.src = i.image;
        img.alt = i.name;
        img.classList.add('cart-img');
        tdHA.appendChild(img);
        tr.appendChild(tdHA);

        //Tạo cột tên cho sản phầm thứ i
        const tdten = document.createElement('td');
        tdten.textContent = i.name;
        tr.appendChild(tdten);

        //Tạo cột số lượng cho sản phẩm thứ i
        const tdsl = document.createElement('td');
        const divqsl = document.createElement('div');
        divqsl.classList.add('qlsl');

        //Tạo các nút cộng,trừ 
        const nutTru = document.createElement('button');
        nutTru.type = 'button';
        nutTru.textContent = '-';
        nutTru.onclick = function () {
            doiSoLuong(i.id, -1);
        };
        const sl = document.createElement('span');
        sl.textContent = i.sl;
        const nutCong = document.createElement('button');
        nutCong.type = 'button';
        nutCong.textContent = '+';
        nutCong.onclick = function () {
            doiSoLuong(i.id, 1);
        };

        divqsl.appendChild(nutTru);
        divqsl.appendChild(sl);
        divqsl.appendChild(nutCong);
        tdsl.appendChild(divqsl);
        tr.appendChild(tdsl);

        //tạo cột thành tiền và dùng hàm có sẵn toLocaleString() để định dạng về Việt Nam
        const tdTien = document.createElement('td');
        tdTien.textContent = thanhTien.toLocaleString('vi-VN') + 'đ';
        tr.appendChild(tdTien);

        //Tạo cột xóa 
        const tdDele = document.createElement('td');
        const Dele = document.createElement('button');
        Dele.classList.add('btn-dele');
        Dele.type = 'button';
        Dele.textContent = 'Xóa';
        Dele.onclick = function () {
            xoaSanPham(i.id);
        };
        tdDele.appendChild(Dele);
        tr.appendChild(tdDele);
        //Thêm các vừa tạo vào tbody để hiện thị
        tlbody.appendChild(tr);
    });

    const tr = document.createElement('tr');

    //tạo cột tổng tiền
    const td1 = document.createElement('td');
    td1.colSpan = 4;
    td1.classList.add('total-label');
    td1.textContent = 'Tổng cộng:';

    const td2 = document.createElement('td');
    td2.classList.add('total-value');
    td2.textContent = tong.toLocaleString('vi-VN') + 'đ';

    const td3 = document.createElement('td');
    td3.rowSpan = 3;

    //thêm vào tlfooter để hiện thị
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tlfooter.appendChild(tr);

    const thueVAT = Math.floor(tong * 0.1);
    const tongThanhToan = tong + thueVAT;

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

//hàm tẳng giảm số lượng sản phẩm
function doiSoLuong(idSanPham, thayDoi) {
    //Lấy tất cả sản phẩm
    let gioHangHienTai = JSON.parse(localStorage.getItem('cart')) || [];
    //Duyệt hết tất cả sản phẩm để tìm sản phẩm cần thay đổi
    gioHangHienTai.forEach(item => {
        if (item.id === idSanPham) {
            if (item.sl + thayDoi >= 1) {
                item.sl += thayDoi;
            }
        }
    });
    //Đặt lại vào localstorage để hiện thị lại lên màng hình của khách hàng
    localStorage.setItem('cart', JSON.stringify(gioHangHienTai));
    location.reload();
}

//hàm xóa sản phẩm cho nút dele đã tạo ở trên
function xoaSanPham(idSanPham) {
    //tạo mảng mới rỗng
    let dsMoi = [];
    let gioHangHienTai = JSON.parse(localStorage.getItem('cart')) || [];
    //duyệt hết tất cả sản phẩm và thêm tất cả sản phầm KHÔNG bị xóa mảng mới
    gioHangHienTai.forEach(item => {
        if (item.id !== idSanPham) {
            dsMoi.push(item);
        }
    });
    //đặt lại vào localstorage để hiện thị
    localStorage.setItem('cart', JSON.stringify(dsMoi));
    //reload để chạy lại trang ko gọi làm hàm showcart là vì nó sẽ tạo thêm 1 cái tlhead 
    location.reload();
}
//Tìm tới nút đặt hàng
const nutDatHang = document.querySelector('#btnOrder');
if (nutDatHang) {
    nutDatHang.addEventListener('click', function () {
        if (localStorage.getItem('currentUser') == null) {
            alert('Vui lòng đăng nhập để đặt hàng!');
            location.href = 'login.html';
            return;
        }

        const gioHang = JSON.parse(localStorage.getItem('cart')) || [];

        if (gioHang.length === 0) {
            alert('Giỏ hàng của bạn đang trống, vui lòng chọn sản phẩm trước khi đặt hàng!');
            return;
        }
        //nếu được click vào thì xóa khỏi localstorage coi như đặt hàng thành côngvaf
        alert('Đặt hàng thành công!');
        localStorage.removeItem('cart');
        location.href = 'index.html';
    });
}
//Chạy hàm này lần đầu vào web để hiện thị các sản phẩm khách hàng đã thêm vào cart
showcart();