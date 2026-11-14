const nutMenu = document.querySelector('.hamburger');
const thanhDieuHuong = document.querySelector('.header__navform');
const khungSanPham = document.querySelector('#product-list');
const khungTrinhChieu = document.querySelector('.carousel');
const cacLienKetDanhMuc = document.querySelectorAll('a[data-category]');
const tieuDeTrang = document.querySelector('#pageTitle');

const danhMucDaLuu = localStorage.getItem('selectedCategory') || '';
let danhSachSanPham = [];
let viTriSlideHienTai = 0;
let danhSachSlide = [];
let danhSachNutSlide = [];


function batTatMenuDienThoai() {
    thanhDieuHuong.classList.toggle('active--ham');
}

function chuyenSlide(viTri) {
    for (let i = 0; i < danhSachSlide.length; i++) {
        danhSachSlide[i].classList.remove('carousel__item--selected');
        danhSachNutSlide[i].classList.remove('carousel__button--selected');
    }
    danhSachSlide[viTri].classList.add('carousel__item--selected');
    danhSachNutSlide[viTri].classList.add('carousel__button--selected');
}

function xuLyBamNutSlide(suKien) {
    viTriSlideHienTai = Number(suKien.currentTarget.getAttribute('data-index'));
    chuyenSlide(viTriSlideHienTai);
}

function tuDongChuyenSlide() {
    viTriSlideHienTai++;
    if (viTriSlideHienTai >= danhSachSlide.length) {
        viTriSlideHienTai = 0;
    }
    chuyenSlide(viTriSlideHienTai);
}

function khoiTaoTrinhChieu() {
    if (!khungTrinhChieu) return;

    danhSachSlide = khungTrinhChieu.querySelectorAll('.carousel__item');
    const hopNutDieuHuong = document.createElement('div');
    hopNutDieuHuong.className = 'carousel__nav';

    for (let i = 0; i < danhSachSlide.length; i++) {
        const nutTron = document.createElement('span');
        nutTron.className = 'carousel__button';
        nutTron.setAttribute('data-index', i);
        nutTron.addEventListener('click', xuLyBamNutSlide);
        hopNutDieuHuong.appendChild(nutTron);
    }

    khungTrinhChieu.appendChild(hopNutDieuHuong);
    danhSachNutSlide = khungTrinhChieu.querySelectorAll('.carousel__button');

    chuyenSlide(0);
    setInterval(tuDongChuyenSlide, 5000);
}

function khoiTaoDuLieuSanPham() {
    if (danhMucDaLuu === '') {
        danhSachSanPham = [...danhSachSanPhamGoc];
    } else {
        danhSachSanPham = danhSachSanPhamGoc.filter(sanPham => sanPham.danhMuc === danhMucDaLuu);
    }

    if (tieuDeTrang) {
        if (danhMucDaLuu !== '') {
            const lienKetDangChon = document.querySelector(`a[data-category="${danhMucDaLuu}"]`);
            if (lienKetDangChon) {
                tieuDeTrang.textContent = lienKetDangChon.textContent;
            }
        } else {
            tieuDeTrang.textContent = "Tất cả sản phẩm";
        }
    }
}

function dinhDangGiaTien(giaTien) {
    return giaTien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ';
}

function xuLyChonSanPham(suKien) {
    const maSanPham = suKien.currentTarget.getAttribute('data-id');
}

function xuLyThemGioHang(suKien) {
    suKien.stopPropagation();
}

function taoTheSanPham(sanPham) {
    const theSanPham = document.createElement('div');
    theSanPham.className = 'shop-card';
    theSanPham.style.cursor = 'pointer';
    theSanPham.setAttribute('data-id', sanPham.ma);
    theSanPham.addEventListener('click', xuLyChonSanPham);

    const khungAnh = document.createElement('div');
    khungAnh.className = 'shop-card__img-box';

    const hinhAnh = document.createElement('img');
    hinhAnh.src = sanPham.hinhAnh;
    hinhAnh.alt = sanPham.ten;
    hinhAnh.className = 'shop-card__img';

    const nutGioHang = document.createElement('button');
    nutGioHang.className = 'shop-card__cart-btn';
    nutGioHang.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>';
    nutGioHang.addEventListener('click', xuLyThemGioHang);

    khungAnh.appendChild(hinhAnh);
    khungAnh.appendChild(nutGioHang);

    const khungThongTin = document.createElement('div');
    khungThongTin.className = 'shop-card__info';

    const tenSanPham = document.createElement('h3');
    tenSanPham.className = 'shop-card__title';
    tenSanPham.textContent = sanPham.ten;

    const khungGia = document.createElement('div');
    khungGia.className = 'shop-card__price-box';

    const giaHienTai = document.createElement('span');
    giaHienTai.className = 'shop-card__current-price';
    giaHienTai.textContent = dinhDangGiaTien(sanPham.gia);

    khungGia.appendChild(giaHienTai);
    khungThongTin.appendChild(tenSanPham);
    khungThongTin.appendChild(khungGia);

    theSanPham.appendChild(khungAnh);
    theSanPham.appendChild(khungThongTin);

    return theSanPham;
}

function veSanPham() {
    while (khungSanPham.firstChild) {
        khungSanPham.removeChild(khungSanPham.firstChild);
    }

    danhSachSanPham.forEach(sanPham => {
        const theSanPham = taoTheSanPham(sanPham);
        khungSanPham.appendChild(theSanPham);
    });
}

function xuLyLocDanhMuc(suKien) {
    const lienKet = suKien.currentTarget;
    const danhMuc = lienKet.getAttribute('data-category');
    localStorage.setItem('selectedCategory', danhMuc);

    if (khungSanPham) {
        suKien.preventDefault();
        if (tieuDeTrang) {
            tieuDeTrang.textContent = lienKet.textContent;
        }

        danhSachSanPham = danhSachSanPhamGoc.filter(sanPham => sanPham.danhMuc === danhMuc);
        veSanPham();
    }
}


if (nutMenu) {
    nutMenu.addEventListener('click', batTatMenuDienThoai);
}

khoiTaoTrinhChieu();
khoiTaoDuLieuSanPham();

cacLienKetDanhMuc.forEach(lienKet => {
    lienKet.addEventListener('click', xuLyLocDanhMuc);
});

if (khungSanPham) {
    veSanPham();
}