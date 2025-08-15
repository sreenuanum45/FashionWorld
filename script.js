// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Search Toggle
const searchToggle = document.querySelector('.search-toggle');
const searchContainer = document.querySelector('.search-container');

searchToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    searchContainer.classList.toggle('active');
});

// Close search when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-bar') && searchContainer.classList.contains('active')) {
        searchContainer.classList.remove('active');
    }
});

// Live Chat Toggle
const chatToggle = document.querySelector('.chat-toggle');
const chatWindow = document.querySelector('.chat-window');
const chatClose = document.querySelector('.chat-close');

chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
});

chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Age Verification Modal
const ageModal = document.getElementById('ageVerificationModal');
const confirmAge = document.getElementById('confirmAge');
const declineAge = document.getElementById('declineAge');

// Check if age verification is needed (only show once per session)
if (!sessionStorage.getItem('ageVerified')) {
    setTimeout(() => {
        ageModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }, 2000);
}

confirmAge.addEventListener('click', () => {
    ageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    sessionStorage.setItem('ageVerified', 'true');
});

declineAge.addEventListener('click', () => {
    window.location.href = 'https://www.google.com';
});

// Announcement Bar Close
const announcementClose = document.querySelector('.announcement-close');
const announcementBar = document.querySelector('.announcement-bar');

announcementClose.addEventListener('click', () => {
    announcementBar.style.display = 'none';
    document.cookie = "announcementClosed=true; max-age=86400"; // Hide for 24 hours
});

// Check if announcement was closed
if (document.cookie.includes('announcementClosed=true')) {
    announcementBar.style.display = 'none';
}

// Product Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const filterDropdowns = document.querySelectorAll('.filter-dropdown');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProducts();
    });
});

filterDropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.filter-dropdown-btn');
    
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.filter-dropdown')) {
        filterDropdowns.forEach(dropdown => {
            dropdown.classList.remove('open');
        });
    }
});

// Price Range Slider
const priceMin = document.getElementById('price-min');
const priceMax = document.getElementById('price-max');
const minPriceValue = document.getElementById('min-price-value');
const maxPriceValue = document.getElementById('max-price-value');

function updatePriceValues() {
    minPriceValue.textContent = `₹${parseInt(priceMin.value).toLocaleString()}`;
    maxPriceValue.textContent = `₹${parseInt(priceMax.value).toLocaleString()}`;
    filterProducts();
}

priceMin.addEventListener('input', updatePriceValues);
priceMax.addEventListener('input', updatePriceValues);

// Sort By Functionality
const sortBy = document.getElementById('sort-by');

sortBy.addEventListener('change', () => {
    filterProducts();
});

// Filter and sort products
function filterProducts() {
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    const minPrice = parseInt(priceMin.value);
    const maxPrice = parseInt(priceMax.value);
    const sortValue = sortBy.value;
    
    // In a real implementation, you would fetch filtered/sorted products from the server
    // This is a simplified client-side implementation
    console.log(`Filter: ${activeFilter}, Price: ${minPrice}-${maxPrice}, Sort: ${sortValue}`);
    
    // Here you would typically make an AJAX request to get filtered products
    // For now, we'll just log the filter criteria
}

// Testimonial Slider
let currentTestimonial = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.dot');
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');

function showTestimonial(n) {
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    currentTestimonial = (n + testimonialSlides.length) % testimonialSlides.length;
    
    testimonialSlides[currentTestimonial].classList.add('active');
    testimonialDots[currentTestimonial].classList.add('active');
}

testimonialPrev.addEventListener('click', () => {
    showTestimonial(currentTestimonial - 1);
});

testimonialNext.addEventListener('click', () => {
    showTestimonial(currentTestimonial + 1);
});

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

// Auto-rotate testimonials
let testimonialInterval = setInterval(() => {
    showTestimonial(currentTestimonial + 1);
}, 5000);

// Pause on hover
const testimonialSlider = document.querySelector('.testimonial-slider');
testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(() => {
        showTestimonial(currentTestimonial + 1);
    }, 5000);
});

// Video Modal
const videoModal = document.getElementById('videoModal');
const videoClose = videoModal.querySelector('.close-modal');
const videoIframe = videoModal.querySelector('iframe');
const tipCards = document.querySelectorAll('.tip-card');

tipCards.forEach(card => {
    card.addEventListener('click', () => {
        const videoUrl = card.dataset.video;
        videoIframe.src = videoUrl;
        videoModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

videoClose.addEventListener('click', () => {
    videoIframe.src = '';
    videoModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoIframe.src = '';
        videoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Virtual Try-On Functionality
const virtualTryOnBtn = document.getElementById('virtualTryOnBtn');
const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
const useCameraBtn = document.getElementById('useCameraBtn');
const tryOnPreview = document.getElementById('tryOnPreview');
const tryOnOverlay = document.getElementById('tryOnOverlay');
const rotateLeftBtn = document.getElementById('rotateLeftBtn');
const rotateRightBtn = document.getElementById('rotateRightBtn');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const tryOnProducts = document.querySelectorAll('.try-on-product');

let currentRotation = 0;
let currentScale = 1;

virtualTryOnBtn.addEventListener('click', () => {
    // In a real implementation, this would open the virtual try-on modal
    alert('Virtual Try-On feature would open here');
});

uploadPhotoBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                tryOnPreview.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
});

useCameraBtn.addEventListener('click', () => {
    // This would access the device camera in a real implementation
    alert('Camera access would be requested here');
});

// Try-on product selection
tryOnProducts.forEach(product => {
    product.addEventListener('click', () => {
        const productImage = product.querySelector('img').src;
        tryOnOverlay.style.backgroundImage = `url(${productImage})`;
        tryOnOverlay.style.backgroundSize = 'cover';
        tryOnOverlay.style.opacity = '0.8';
    });
});

// Try-on controls
rotateLeftBtn.addEventListener('click', () => {
    currentRotation -= 15;
    tryOnOverlay.style.transform = `rotate(${currentRotation}deg) scale(${currentScale})`;
});

rotateRightBtn.addEventListener('click', () => {
    currentRotation += 15;
    tryOnOverlay.style.transform = `rotate(${currentRotation}deg) scale(${currentScale})`;
});

zoomInBtn.addEventListener('click', () => {
    currentScale += 0.1;
    tryOnOverlay.style.transform = `rotate(${currentRotation}deg) scale(${currentScale})`;
});

zoomOutBtn.addEventListener('click', () => {
    currentScale = Math.max(0.5, currentScale - 0.1);
    tryOnOverlay.style.transform = `rotate(${currentRotation}deg) scale(${currentScale})`;
});

// Product Quick View
const productCards = document.querySelectorAll('.product-card');
const quickViewModal = document.getElementById('quickViewModal');
const quickViewClose = quickViewModal.querySelector('.close-modal');

productCards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.product-image-actions')) {
            // In a real implementation, this would fetch product details and populate the modal
            quickViewModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

quickViewClose.addEventListener('click', () => {
    quickViewModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === quickViewModal) {
        quickViewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
const newsletterInput = newsletterForm.querySelector('input[type="email"]');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (newsletterInput.value) {
        // In a real implementation, this would submit to a server
        alert('Thank you for subscribing!');
        newsletterInput.value = '';
    } else {
        alert('Please enter your email address');
    }
});

// Initialize Lazy Loading
const lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy",
    threshold: 100
});

// Show notification
function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// Example usage:
// showNotification('Product added to cart!');

// Initialize product grid (in a real app, this would come from an API)
function initializeProductGrid() {
    const productGrid = document.querySelector('.product-grid');
    
    // Sample product data
    const products = [
        {
            id: 1,
            title: 'Banarasi Silk Saree',
            price: 4999,
            originalPrice: 7999,
            image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            description: 'Handwoven Banarasi silk saree with intricate zari work',
            category: 'sarees',
            fabric: 'silk',
            color: 'red',
            occasion: 'wedding'
        },
        {
            id: 2,
            title: 'Punjabi Suit Set',
            price: 2999,
            originalPrice: 3999,
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80',
            description: 'Traditional Punjabi suit with phulkari embroidery',
            category: 'punjabi',
            fabric: 'cotton',
            color: 'blue',
            occasion: 'festive'
        },
        {
            id: 3,
            title: 'Bridal Lehenga',
            price: 19999,
            originalPrice: 29999,
            image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80',
            description: 'Exquisite bridal lehenga with heavy embroidery',
            category: 'bridal',
            fabric: 'silk',
            color: 'red',
            occasion: 'wedding'
        },
        {
            id: 4,
            title: 'Chanderi Cotton Saree',
            price: 3499,
            originalPrice: 4999,
            image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
            description: 'Lightweight Chanderi cotton saree for summer wear',
            category: 'sarees',
            fabric: 'cotton',
            color: 'green',
            occasion: 'casual'
        },
        {
            id: 5,
            title: 'Designer Anarkali Suit',
            price: 5999,
            originalPrice: 8999,
            image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80',
            description: 'Designer Anarkali suit with intricate detailing',
            category: 'punjabi',
            fabric: 'georgette',
            color: 'purple',
            occasion: 'festive'
        },
        {
            id: 6,
            title: 'Kanjivaram Silk Saree',
            price: 8999,
            originalPrice: 12999,
            image: 'https://images.unsplash.com/photo-1561526116-e2460f4d40a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80',
            description: 'Authentic Kanjivaram silk saree from Tamil Nadu',
            category: 'sarees',
            fabric: 'silk',
            color: 'gold',
            occasion: 'wedding'
        }
    ];
    
    // Clear existing products
    productGrid.innerHTML = '';
    
    // Add products to the grid
    products.forEach(product => {
        const discount = Math.round((1 - (product.price / product.originalPrice)) * 100;
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.category = product.category;
        productCard.dataset.fabric = product.fabric;
        productCard.dataset.color = product.color;
        productCard.dataset.occasion = product.occasion;
        productCard.dataset.price = product.price;
        
        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
                <span class="product-image-badge">${discount}% OFF</span>
                <div class="product-image-actions">
                    <button class="quick-view-btn" aria-label="Quick view">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="zoom-btn" aria-label="Zoom">
                        <i class="fas fa-search-plus"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    ₹${product.price.toLocaleString()}
                    <span class="product-original-price">₹${product.originalPrice.toLocaleString()}</span>
                    <span class="product-discount">${discount}% OFF</span>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-features">
                    <span class="feature-tag">${product.fabric}</span>
                    <span class="feature-tag">${product.color}</span>
                    <span class="feature-tag">${product.occasion}</span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="wishlist-btn" aria-label="Add to wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to the new product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.product-image-actions')) {
                // In a real implementation, this would fetch product details and populate the modal
                quickViewModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Add event listeners to quick view buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            // In a real implementation, this would fetch product details and populate the modal
            quickViewModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Add event listeners to wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.classList.toggle('active');
            const action = btn.classList.contains('active') ? 'added to' : 'removed from';
            showNotification(`Product ${action} wishlist!`);
        });
    });
    
    // Add event listeners to add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            showNotification('Product added to cart!');
        });
    });
}

// Initialize the product grid when the page loads
document.addEventListener('DOMContentLoaded', initializeProductGrid);

// Initialize Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');