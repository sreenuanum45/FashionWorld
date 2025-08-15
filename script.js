// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Product Card Click (to open modal)
const productCards = document.querySelectorAll('.product-card');
const productModal = document.getElementById('productModal');
const closeModal = document.querySelector('.close-modal');

productCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't open modal if clicking on buttons inside card
        if (!e.target.closest('.add-to-cart') && !e.target.closest('.wishlist-btn') &&
            !e.target.closest('.quick-view-btn') && !e.target.closest('.zoom-btn')) {
            productModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

closeModal.addEventListener('click', () => {
    productModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === productModal) {
        productModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Thumbnail image selection
const thumbnails = document.querySelectorAll('.product-thumbnail');
const mainProductImage = document.querySelector('.main-product-image');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));
        // Add active class to clicked thumbnail
        thumbnail.classList.add('active');
        // Change main image
        mainProductImage.src = thumbnail.src;
    });
});

// Size Guide Modal
const sizeGuideModal = document.querySelector('.size-guide-modal');
const sizeGuideBtn = document.querySelector('.size-guide-btn');
const sizeGuideClose = document.querySelector('.size-guide-close');

sizeGuideBtn.addEventListener('click', () => {
    sizeGuideModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

sizeGuideClose.addEventListener('click', () => {
    sizeGuideModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === sizeGuideModal) {
        sizeGuideModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Color and Size Selection
const colorOptions = document.querySelectorAll('.product-option-color');
const sizeOptions = document.querySelectorAll('.product-option-value');

colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        colorOptions.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
    });
});

sizeOptions.forEach(option => {
    option.addEventListener('click', () => {
        sizeOptions.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
    });
});

// Quantity Selector
const minusBtn = document.querySelector('.quantity-btn.minus');
const plusBtn = document.querySelector('.quantity-btn.plus');
const quantityInput = document.querySelector('.quantity-input');

minusBtn.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    if (value > 1) {
        quantityInput.value = value - 1;
    }
});

plusBtn.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    quantityInput.value = value + 1;
});

// Add to Cart Functionality
const notification = document.querySelector('.notification');
const cartCount = document.querySelector('.cart-count');
let count = 0;

document.addEventListener('click', function(e) {
    if (e.target.closest('.add-to-cart') || e.target.closest('.product-modal-add-to-cart')) {
        e.stopPropagation();
        count++;
        cartCount.textContent = count;
        // Show notification
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
});

// Wishlist Toggle
const wishlistBtns = document.querySelectorAll('.wishlist-btn, .product-modal-wishlist');

wishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering product card click
        btn.classList.toggle('active');
        const icon = btn.querySelector('i');
        if (btn.classList.contains('active')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            notification.innerHTML = '<i class="fas fa-heart"></i> Added to wishlist!';
            notification.classList.add('show');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            notification.innerHTML = '<i class="fas fa-heart-broken"></i> Removed from wishlist!';
            notification.classList.add('show');
        }
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    });
});

// Filter Buttons
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Quick View Button
const quickViewBtns = document.querySelectorAll('.quick-view-btn');

quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        productModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Image Zoom Functionality
const zoomBtns = document.querySelectorAll('.zoom-btn');
const zoomModal = document.querySelector('.image-zoom-modal');
const zoomedImage = document.querySelector('.zoomed-image');
const zoomClose = document.querySelector('.zoom-close');
const zoomPrev = document.querySelector('.zoom-prev');
const zoomNext = document.querySelector('.zoom-next');

// Array of all product images for zoom
const productImages = [
    'https://i.ibb.co/5KxY2J1/banarasi-saree.jpg',
    'https://i.ibb.co/4W4j1V1/banarasi-saree-2.jpg',
    'https://i.ibb.co/7yJ7Q1y/banarasi-saree-3.jpg',
    'https://i.ibb.co/0jQ7ZJx/banarasi-saree-4.jpg',
    'https://i.ibb.co/5KxY2J1/banarasi-saree-5.jpg'
];

let currentImageIndex = 0;

zoomBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        zoomedImage.src = productImages[currentImageIndex];
        zoomModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

zoomClose.addEventListener('click', () => {
    zoomModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

zoomPrev.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
    zoomedImage.src = productImages[currentImageIndex];
});

zoomNext.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % productImages.length;
    zoomedImage.src = productImages[currentImageIndex];
});

window.addEventListener('click', (e) => {
    if (e.target === zoomModal) {
        zoomModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Keyboard navigation for zoom modal
document.addEventListener('keydown', (e) => {
    if (zoomModal.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
            zoomedImage.src = productImages[currentImageIndex];
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % productImages.length;
            zoomedImage.src = productImages[currentImageIndex];
        } else if (e.key === 'Escape') {
            zoomModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});

// Animation on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroTitle = document.querySelector('.hero-title');

    // Parallax effect for hero title
    heroTitle.style.transform = `perspective(800px) rotateX(20deg) rotateY(-5deg) translateY(${scrollPosition * 0.2}px)`;
});