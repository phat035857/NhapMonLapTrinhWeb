const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.header__navform');
const container = document.querySelector('#product-list');
const paginationBox = document.querySelector('#pagination');
const carousel = document.querySelector('.carousel');
const sortSelect = document.querySelector('#sortSelect');
const categoryLinks = document.querySelectorAll('.header__nav-link[data-category]');

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
    buttons[0].classList.add('carousel__button--selected');

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
            e.target.classList.add('active');
            
            const category = e.target.getAttribute('data-category');

            bProducts = baseProducts.filter(product => product.category == category);
            originalOrder = [...bProducts];
            
            if (sortSelect) {
                sortSelect.value = 'default';
            }
            
            curpage = 1;
            veSanPham(curpage);
            veTungTrang();

            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

if (sortSelect) {
    sortSelect.addEventListener('change', function(e) {
        const sortType = e.target.value;
        
        if (sortType === 'asc') {
            bProducts.sort((a, b) => a.price - b.price);
        } else if (sortType === 'desc') {
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
    
    const existingCards = container.children;
    
    curitem.forEach((product, index) => {
        if (index < existingCards.length) {
            const card = existingCards[index];
            const img = card.querySelector('.shop-card__img');
            const title = card.querySelector('.shop-card__title');
            const price = card.querySelector('.shop-card__price');
            
            img.src = product.imageUrl;
            img.alt = product.name;
            title.textContent = product.name;
            price.textContent = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ';
        } else {
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
        }
    });
    
    while (existingCards.length > curitem.length) {
        container.removeChild(container.lastChild);
    }
}

function veTungTrang() {
    const sonut = Math.ceil(bProducts.length / itemperpage);
    const existingBtns = paginationBox.children;
    
    for (let i = 1; i <= sonut; i++) {
        if (i - 1 < existingBtns.length) {
            const button = existingBtns[i - 1];
            if (i === curpage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
            button.setAttribute('data-page', i);
            button.textContent = i;
        } else {
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
            });
            
            paginationBox.appendChild(button);
        }
    }
    
    while (existingBtns.length > sonut) {
        paginationBox.removeChild(paginationBox.lastChild);
    }
}

if (container) {
    veSanPham(curpage);
    veTungTrang();
}