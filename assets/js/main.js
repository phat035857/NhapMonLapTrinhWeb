const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.header__navform');
const container = document.querySelector('#product-list');
const paginationBox = document.querySelector('#pagination');
const carousel = document.querySelector('.carousel');
const sortSelect = document.querySelector('#sortSelect');
const categoryLinks = document.querySelectorAll('.header__nav-link[data-category]');
const pageTitle = document.querySelector('#pageTitle');
const resultCount = document.querySelector('#resultCount');

let curpage = 1;
const itemperpage = 9;

hamburger.addEventListener('click', mobileMenu);

function mobileMenu() {
    nav.classList.toggle('active--ham');
}

if (carousel) {
    const items = carousel.querySelectorAll('.carousel__item');
    
    const navDiv = document.createElement('div');
    navDiv.className = 'carousel__nav';
    
    for (let i = 0; i < items.length; i++) {
        const span = document.createElement('span');
        span.className = 'carousel__button';
        navDiv.appendChild(span);
    }
    carousel.appendChild(navDiv);

    const buttons = carousel.querySelectorAll('.carousel__button');

    items[0].classList.add('carousel__item--selected');
    buttons[0].classList.add('carousel__item--selected');

    let currentIndex = 0;

    function chuyenSlide(index) {
        for (let j = 0; j < items.length; j++) {
            items[j].classList.remove('carousel__item--selected');
            buttons[j].classList.remove('carousel__button--selected');
        }
        items[index].classList.add('carousel__item--selected');
        buttons[index].classList.add('carousel__button--selected');
    }

    buttons.forEach((nutHienTai, viTri) => {
        nutHienTai.addEventListener('click', function(e) {
            currentIndex = viTri; 
            chuyenSlide(currentIndex);
        });
    });

    setInterval(function() {
        currentIndex++;
        if (currentIndex >= items.length) {
            currentIndex = 0;
        }
        chuyenSlide(currentIndex);
    }, 5000);
}

let bProducts = baseProducts.filter(product => product.category == 'gong-kinh');
let originalOrder = [...bProducts];

categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (container) {
            e.preventDefault();
            
            categoryLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            
            const category = link.getAttribute('data-category');
            if (pageTitle) pageTitle.textContent = link.textContent;

            bProducts = baseProducts.filter(product => product.category == category);
            originalOrder = [...bProducts];
            
            if (sortSelect) {
                sortSelect.value = 'default';
            }
            
            curpage = 1;
            veSanPham(curpage);
            veTungTrang();
        }
    });
});

if (sortSelect) {
    sortSelect.addEventListener('change', function(e) {
        const sortType = e.target.value;
        
        if (sortType === 'price-asc') {
            bProducts.sort((a, b) => a.price - b.price);
        } else if (sortType === 'price-desc') {
            bProducts.sort((a, b) => b.price - a.price);
        } else {
            bProducts = [...originalOrder];
        }
        
        curpage = 1;
        veSanPham(curpage);
        veTungTrang();
    });
}

function veSanPham(page) {
    const bd = (page - 1) * itemperpage;
    const kt = bd + itemperpage;
    const curitem = bProducts.slice(bd, kt);
    
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    if (resultCount) {
        resultCount.textContent = `Hiển thị ${bProducts.length} kết quả.`;
    }
    
    curitem.forEach(product => {
        const card = document.createElement('div');
        card.className = 'shop-card';

        const imgBox = document.createElement('div');
        
        const img = document.createElement('img');
        img.src = product.imageUrl;
        img.alt = product.name;
        img.className = 'shop-card__img';
        
        const contactBtn = document.createElement('a');
        contactBtn.href = '#';
        contactBtn.className = 'shop-card__contact-btn';
        contactBtn.textContent = 'Liên hệ';
        
        imgBox.appendChild(img);
        imgBox.appendChild(contactBtn);
        
        const title = document.createElement('h3');
        title.className = 'shop-card__title';
        title.textContent = product.name;
        
        const price = document.createElement('div');
        price.className = 'shop-card__price';
        price.textContent = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ';
        
        card.appendChild(imgBox);
        card.appendChild(title);
        card.appendChild(price);
        
        container.appendChild(card);
    });
}

function veTungTrang() {
    const sonut = Math.ceil(bProducts.length / itemperpage);
    
    while (paginationBox.firstChild) {
        paginationBox.removeChild(paginationBox.firstChild);
    }
    
    for(let i = 1; i <= sonut; i++) {
        const button = document.createElement('button');
        button.className = 'page-btn';
        if (i === curpage) {
            button.classList.add('active');
        }
        button.setAttribute('data-page', i);
        button.textContent = i;
        
        button.addEventListener('click', function(e) {
            curpage = Number(e.target.getAttribute('data-page'));
            veSanPham(curpage);
            veTungTrang();
            
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        
        paginationBox.appendChild(button);
    }
}

if (container) {
    veSanPham(curpage);
    veTungTrang();
}