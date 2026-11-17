const linkDanhMuc = document.querySelector('#WebCategory');
const detailCurrent = document.querySelector('.detail__current');
const khungChiTiet = document.querySelector('.detail-box');

//Hàm trả về loại ở dạng chuỗi để in ra màn hình
function doiTenDanhMuc(maLoai) {
    if (maLoai === 'gong-kinh') return 'Gọng kính';
    if (maLoai === 'trong-kinh') return 'Tròng kính';
    if (maLoai === 'kinh-mat') return 'Kính mát';
    if (maLoai === 'ap-trong') return 'Kính áp tròng';
    return 'Sản phẩm';
}
//Hàm vẽ ra màng hình sản phẩm vừa bấm vào
function showDetail() {
    //lấy thông tin từ localstorage
    let sp = JSON.parse(localStorage.getItem('selectedProduct'));
    if (sp == null) {
        alert('Không tìm thấy sản phẩm.');
        location.href = 'shop.html';
        return;
    }
    //Lấy tên loại của sản phầm
    const tenLoai = doiTenDanhMuc(sp.category);
    //Định dạng lại giá để in ra màn hình
    const giaChuoi = sp.price.toLocaleString('vi-VN') + 'đ';

    //in tên loại ra màn hình
    linkDanhMuc.textContent = tenLoai;
    //Hàm click set lại loại sản phẩm để in ra đúng loại trong shop.html
    linkDanhMuc.onclick = function () {
        localStorage.setItem('selectedCategory', sp.category);
    };

    
    detailCurrent.textContent = sp.name;

    //tạo cột hình bên trái
    const cotTrai = document.createElement('div');
    cotTrai.classList.add('detail-left');

    const img = document.createElement('img');
    img.src = sp.image;
    img.alt = sp.name;
    img.classList.add('detail-img');
    cotTrai.appendChild(img);

    //tạo cột thông tin bên phải
    const cotPhai = document.createElement('div');
    cotPhai.classList.add('detail-right');

    //tạo tên loại 
    const nhanLoai = document.createElement('span');
    nhanLoai.classList.add('info-category');
    nhanLoai.textContent = tenLoai;
    cotPhai.appendChild(nhanLoai);

    //tạo tên sản phẩm
    const tenSP = document.createElement('h1');
    tenSP.classList.add('detail-name');
    tenSP.textContent = sp.name;
    cotPhai.appendChild(tenSP);

    //tạo mã sản phẩm
    const maSP = document.createElement('p');
    maSP.classList.add('detail-code');
    maSP.textContent = 'Mã sản phẩm: ' + sp.id;
    cotPhai.appendChild(maSP);

    //tạo giá sản phẩm
    const giaSP = document.createElement('p');
    giaSP.classList.add('detail-price');
    giaSP.textContent = giaChuoi;
    cotPhai.appendChild(giaSP);

    //tạo bảng thông tin của sản phẩm
    const bangThongTin = document.createElement('table');
    bangThongTin.classList.add('info-table');
    const tbody = document.createElement('tbody');

    //cột ds cách hàng của sản phẩm
    const dsDong = [
        ['Mã sản phẩm', sp.id],
        ['Tên sản phẩm', sp.name],
        ['Danh mục', tenLoai],
        ['Giá bán', giaChuoi]
    ];

    //duyệt hết để in ra các dòng ở trên
    dsDong.forEach(dong => {
        //gán giá trị cho từng dòng của sản phẩm
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.textContent = dong[0];
        const td2 = document.createElement('td');
        td2.textContent = dong[1];
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
    });
    //hiện thị bản đó ra ngoại màn hình
    bangThongTin.appendChild(tbody);
    cotPhai.appendChild(bangThongTin);

    //tạo nút số lượng
    let soLuong = 1;
    const dongSoLuong = document.createElement('div');
    dongSoLuong.classList.add('sell-row');
    //tạo chữ số lượng
    const nhanSL = document.createElement('span');
    nhanSL.textContent = 'Số lượng:';
    dongSoLuong.appendChild(nhanSL);

    //tạo các nút +,- số lượng
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

    //hàm để thực hiện thao tác - số lượng nếu = 1 ko cho trừ vì ko có số lượng âm
    nutTru.onclick = function () {
        if (soLuong > 1) {
            soLuong--;
            spanSL.textContent = soLuong;
        }
    };
    // hàm để thực hiện thao tác cộng
    nutCong.onclick = function () {
        soLuong++;
        spanSL.textContent = soLuong;
    };
    //hiện thị các nút ra màn hình
    divSoLuong.appendChild(nutTru);
    divSoLuong.appendChild(spanSL);
    divSoLuong.appendChild(nutCong);
    dongSoLuong.appendChild(divSoLuong);
    cotPhai.appendChild(dongSoLuong);

    //tạo các nút "thêm vào giỏ hàng/mua hàng"
    const nhomNut = document.createElement('div');
    nhomNut.classList.add('detail-actions');
    //nút them vào giỏ hàng
    const nutThemGio = document.createElement('button');
    nutThemGio.type = 'button';
    nutThemGio.classList.add('btn-add-cart');
    nutThemGio.textContent = 'Thêm vào giỏ hàng';
    //hàm thực hiện thao tác thêm vào giỏ hàng
    nutThemGio.onclick = function () {
        if (themVaoGioHang(sp, soLuong)) {
            alert('Đã thêm "' + sp.name + '" vào giỏ hàng!');
        }
    };
    //nút mua ngay
    const nutMuaNgay = document.createElement('button');
    nutMuaNgay.type = 'button';
    nutMuaNgay.classList.add('btn-buy-now');
    nutMuaNgay.textContent = 'Mua ngay';
    //hàm thực hiện thao tác mua ngay
    nutMuaNgay.onclick = function () {
        if(themVaoGioHang(sp, soLuong))
            location.href = 'cart.html';
    };
    //hiển thị các nút và 2 cột ra ngoài màn hình
    nhomNut.appendChild(nutThemGio);
    nhomNut.appendChild(nutMuaNgay);
    cotPhai.appendChild(nhomNut);
    khungChiTiet.appendChild(cotTrai);
    khungChiTiet.appendChild(cotPhai);
}
//hàm thêm sản phầm vào giỏ hàng
function themVaoGioHang(sanPham, soLuong) {
    //nếu chưa có currentUser(chưa đăng nhập) thì hiện vui lòng đăng nhập và chuyển khách hàng qua trang đăng nhập
    if (localStorage.getItem('currentUser') == null) {
        alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
        location.href = 'login.html';
        return false;
    }
    //lấy thông tin giỏ hàng 
    let gioHangHienTai = JSON.parse(localStorage.getItem('cart'))  || [];
    //hàm check xem sản phẩm đã có trong giỏ hàng chưa
    let daCo = false;
    //nếu sản phẩm đã có trong giỏ hàng thì chỉ cần tăng sl lên
    gioHangHienTai.forEach(item => {
        if (item.id === sanPham.id) {
            item.sl += soLuong;
            daCo = true;
        }
    });
    //nếu sản phẩm chưa có giỏ hàng thêm sản phẩm vào mảng giỏ hàng
    if (!daCo) {
        gioHangHienTai.push({
            id: sanPham.id,
            name: sanPham.name,
            price: Number(sanPham.price),
            image: sanPham.image,
            sl: soLuong
        });
    }
    //đặt giỏ hàng lại vào localStorage
    localStorage.setItem('cart', JSON.stringify(gioHangHienTai));
    //Cập nhật lại số lượng hàng ở gốc trên bên phải
    capNhatSoGioHang();
    return true;
}
//chạy hàm 1 lần khi vừa tải trang
showDetail();