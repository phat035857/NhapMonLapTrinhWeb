const thanhDieuHuong = document.querySelector('.header__navform');
const nutMenu = document.querySelector('.hamburger');
const cacLinkWeb = document.querySelectorAll('a[data-category]');
const cacLinkWebHinh = document.querySelectorAll('#danh-muc article img');
const nutKhamPham = document.querySelector('.kham-pha');
const oSoLuongGio = document.querySelector('#cartCount');
const dsBestSeller = document.querySelectorAll('#san-pham article');

//Hàm bật tắt hamberger ở màn hình điện thoại
function batTatMenuDienThoai() {
    thanhDieuHuong.classList.toggle('active--ham');
    nutMenu.classList.toggle('active');
}

//Hàm cập nhật số lượng hàng ở gốc trên bên phải
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

//hàm kiểm tra xem đã đăng nhập hay chưa nếu đã đăng nhập thì "Xin chào," + tên tài khoản
//nếu chưa đặng nhập thì hiện nút đăng nhập và đăng ký
function checkAuthentication() {
    const authBox = document.querySelector('#authentication');
    const userInfoBox = document.querySelector('#user-info');
    const principal = document.querySelector('#principal');
    const logoutBtn = document.querySelector('#logout');

    const account = JSON.parse(localStorage.getItem('account'));

    if (authBox && userInfoBox && principal) {
        if (account != null && account.isLoggedIn === true) {
            authBox.classList.add('hidden');
            userInfoBox.classList.remove('hidden');
            principal.textContent = 'Xin chào, ' + account.username;
        } else {
            authBox.classList.remove('hidden');
            userInfoBox.classList.add('hidden');
        }
    }
    //hàm sử lý khi bấm nút đăng xuất và giỏ hàng
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();

            const account = JSON.parse(localStorage.getItem('account'));

            if (account != null) {
                account.isLoggedIn = false;
                localStorage.setItem('account', JSON.stringify(account));
            }

            localStorage.removeItem('cart');

            alert('Đã đăng xuất!');
            location.href = 'index.html';
        });
    }
}

// Chuyển đến trang sản phẩm theo danh mục
function chuyenTrangShop(loai) {
    if (loai === '') {
        window.location.href = 'shop.html';
    } else {
        window.location.href = 'shop.html?category=' + encodeURIComponent(loai);
    }
}

// Chuyển đến trang chi tiết sản phẩm
function chuyenTrangChiTiet(sp) {
    const url = 'detail.html?' +
        'id=' + encodeURIComponent(sp.id) +
        '&category=' + encodeURIComponent(sp.category) +
        '&name=' + encodeURIComponent(sp.name) +
        '&price=' + encodeURIComponent(sp.price) +
        '&image=' + encodeURIComponent(sp.image);

    window.location.href = url;
}

//hàm xử lý khi bấm vào nút khám phá hiện thị tất cả sản phầm ở shop.html
if (nutKhamPham) {
    nutKhamPham.addEventListener('click', function (e) {
        e.preventDefault();
        chuyenTrangShop('');
    });
}

//xử lý khi bấm BestSeller hiện thị chi tiết sản phầm
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

// xử lý khi bấm các hình ở index.html
cacLinkWebHinh.forEach((e) => {
    e.addEventListener('click', function () {
        const loai = e.getAttribute('data-category');
        chuyenTrangShop(loai);
    });
});

cacLinkWeb.forEach((e) => {
    e.addEventListener('click', function (evt) {
        evt.preventDefault();

        const loai = e.getAttribute('data-category');
        chuyenTrangShop(loai);
    });
});


//chạy hàm 1 lần khi mở web
checkAuthentication();
capNhatSoGioHang();
if (nutMenu) {
    nutMenu.addEventListener('click', batTatMenuDienThoai);
}