// Medical Store JavaScript - Fixed Version

// Application Data
const appData = {
    medicines: [
        {
            id: 1,
            name: "Paracetamol 500mg",
            category: "Pain Relief",
            price: 12.99,
            description: "Effective pain relief and fever reducer",
            dosage: "500mg tablets",
            prescription: false,
            inStock: true
        },
        {
            id: 2,
            name: "Amoxicillin 250mg",
            category: "Antibiotics",
            price: 24.99,
            description: "Antibiotic for bacterial infections",
            dosage: "250mg capsules",
            prescription: true,
            inStock: true
        },
        {
            id: 3,
            name: "Vitamin D3 1000 IU",
            category: "Vitamins",
            price: 18.99,
            description: "Bone health and immune support",
            dosage: "1000 IU tablets",
            prescription: false,
            inStock: true
        },
        {
            id: 4,
            name: "Aspirin 75mg",
            category: "Cardiovascular",
            price: 8.99,
            description: "Low-dose aspirin for heart health",
            dosage: "75mg tablets",
            prescription: false,
            inStock: true
        },
        {
            id: 5,
            name: "Omeprazole 20mg",
            category: "Digestive Health",
            price: 16.99,
            description: "Acid reflux and heartburn relief",
            dosage: "20mg capsules",
            prescription: true,
            inStock: true
        },
        {
            id: 6,
            name: "Multivitamin Complex",
            category: "Vitamins",
            price: 22.99,
            description: "Complete daily vitamin supplement",
            dosage: "Daily tablets",
            prescription: false,
            inStock: true
        },
        {
            id: 7,
            name: "Ibuprofen 400mg",
            category: "Pain Relief",
            price: 14.99,
            description: "Anti-inflammatory pain reliever",
            dosage: "400mg tablets",
            prescription: false,
            inStock: true
        },
        {
            id: 8,
            name: "First Aid Kit",
            category: "First Aid",
            price: 35.99,
            description: "Complete emergency first aid kit",
            dosage: "Kit contains bandages, antiseptic, etc.",
            prescription: false,
            inStock: true
        }
    ],
    categories: [
        "Pain Relief",
        "Antibiotics", 
        "Vitamins",
        "Cardiovascular",
        "Digestive Health",
        "First Aid",
        "Skincare",
        "Cold & Flu"
    ],
    services: [
        {
            title: "Prescription Upload",
            description: "Upload your prescription securely and get your medicines delivered",
            icon: "📋"
        },
        {
            title: "Home Delivery", 
            description: "Fast and secure delivery to your doorstep",
            icon: "🚚"
        },
        {
            title: "Licensed Pharmacists",
            description: "Professional consultation from qualified pharmacists",
            icon: "👨‍⚕️"
        },
        {
            title: "24/7 Support",
            description: "Round-the-clock customer support for your needs",
            icon: "📞"
        }
    ]
};

// Shopping Cart
let cart = [];

// Current filters
let currentFilters = {
    searchTerm: '',
    category: '',
    prescriptionOnly: false
};

// Category Icons Mapping
const categoryIcons = {
    'Pain Relief': 'fas fa-pills',
    'Antibiotics': 'fas fa-prescription-bottle-alt',
    'Vitamins': 'fas fa-leaf',
    'Cardiovascular': 'fas fa-heart',
    'Digestive Health': 'fas fa-stomach',
    'First Aid': 'fas fa-first-aid',
    'Skincare': 'fas fa-hand-holding-water',
    'Cold & Flu': 'fas fa-thermometer-half'
};

// Global functions for HTML onclick handlers
window.scrollToSection = scrollToSection;
window.openPrescriptionModal = openPrescriptionModal;
window.openModal = openModal;
window.closeModal = closeModal;
window.switchModal = switchModal;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.filterByCategory = filterByCategory;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    try {
        initializeApp();
        setupEventListeners();
        console.log('App initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
});

function initializeApp() {
    renderCategories();
    renderProducts();
    renderServices();
    populateCategoryFilter();
    updateCartDisplay();
}

function setupEventListeners() {
    try {
        // Get DOM elements with error checking
        const searchInput = document.getElementById('searchInput');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileNav = document.getElementById('mobileNav');
        const loginBtn = document.getElementById('loginBtn');
        const cartBtn = document.getElementById('cartBtn');
        const categoryFilter = document.getElementById('categoryFilter');
        const prescriptionFilter = document.getElementById('prescriptionFilter');

        // Mobile menu toggle
        if (mobileMenuBtn && mobileNav) {
            mobileMenuBtn.addEventListener('click', function() {
                mobileNav.classList.toggle('open');
            });
        }
        
        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', handleSearch);
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleSearch();
                }
            });
        }

        // Search button
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', handleSearch);
        }
        
        // Login button
        if (loginBtn) {
            loginBtn.addEventListener('click', function() {
                openModal('loginModal');
            });
        }
        
        // Cart button
        if (cartBtn) {
            cartBtn.addEventListener('click', function() {
                openModal('cartModal');
            });
        }
        
        // Category filter
        if (categoryFilter) {
            categoryFilter.addEventListener('change', function() {
                currentFilters.category = this.value;
                applyFilters();
            });
        }
        
        if (prescriptionFilter) {
            prescriptionFilter.addEventListener('change', function() {
                currentFilters.prescriptionOnly = this.checked;
                applyFilters();
            });
        }
        
        // Form submissions
        setupFormHandlers();
        
        // Navigation links
        setupNavigationLinks();
        
        // Close modals when clicking outside
        setupModalCloseHandlers();

        console.log('Event listeners set up successfully');
    } catch (error) {
        console.error('Error setting up event listeners:', error);
    }
}

function setupNavigationLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                scrollToSection(targetId);
                
                // Close mobile menu if open
                const mobileNav = document.getElementById('mobileNav');
                if (mobileNav) {
                    mobileNav.classList.remove('open');
                }
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = 80;
        const targetPosition = section.offsetTop - headerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Render Functions
function renderCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (!categoriesGrid) return;

    const categoriesHTML = appData.categories.map(category => {
        const icon = categoryIcons[category] || 'fas fa-capsules';
        return `
            <div class="category-card" onclick="filterByCategory('${category}')">
                <i class="${icon}"></i>
                <h3>${category}</h3>
                <p>Browse ${category.toLowerCase()} products</p>
            </div>
        `;
    }).join('');
    
    categoriesGrid.innerHTML = categoriesHTML;
}

function renderProducts(products = appData.medicines) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    if (products.length === 0) {
        productsGrid.innerHTML = '<div class="no-products">No products found matching your criteria.</div>';
        return;
    }

    const productsHTML = products.map(product => {
        const prescriptionBadge = product.prescription ? 
            '<span class="product-category prescription-required">Prescription Required</span>' : 
            `<span class="product-category">${product.category}</span>`;
        
        return `
            <div class="product-card" data-category="${product.category}" data-prescription="${product.prescription}">
                <div class="product-header">
                    ${prescriptionBadge}
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-dosage">${product.dosage}</p>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="btn btn--primary add-to-cart-btn" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    productsGrid.innerHTML = productsHTML;
}

function renderServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;

    const servicesHTML = appData.services.map(service => `
        <div class="service-card">
            <div class="service-icon">${service.icon}</div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>
    `).join('');
    
    servicesGrid.innerHTML = servicesHTML;
}

function populateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (!categoryFilter) return;

    const categoriesHTML = appData.categories.map(category => 
        `<option value="${category}">${category}</option>`
    ).join('');
    
    categoryFilter.innerHTML = '<option value="">All Categories</option>' + categoriesHTML;
}

// Search and Filter Functions
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    currentFilters.searchTerm = searchInput.value.toLowerCase();
    applyFilters();
    
    // Scroll to products section if search has results
    if (currentFilters.searchTerm) {
        scrollToSection('medicines');
    }
}

function applyFilters() {
    let filteredProducts = appData.medicines;
    
    // Apply search filter
    if (currentFilters.searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(currentFilters.searchTerm) ||
            product.description.toLowerCase().includes(currentFilters.searchTerm) ||
            product.category.toLowerCase().includes(currentFilters.searchTerm)
        );
    }
    
    // Apply category filter
    if (currentFilters.category) {
        filteredProducts = filteredProducts.filter(product => 
            product.category === currentFilters.category
        );
    }
    
    // Apply prescription filter
    if (currentFilters.prescriptionOnly) {
        filteredProducts = filteredProducts.filter(product => 
            product.prescription === true
        );
    }
    
    renderProducts(filteredProducts);
}

function filterByCategory(category) {
    currentFilters.category = category;
    currentFilters.searchTerm = '';
    currentFilters.prescriptionOnly = false;
    
    // Update UI elements
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.value = category;
    }
    
    const prescriptionFilter = document.getElementById('prescriptionFilter');
    if (prescriptionFilter) {
        prescriptionFilter.checked = false;
    }
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    applyFilters();
    scrollToSection('medicines');
}

// Shopping Cart Functions
function addToCart(productId) {
    const product = appData.medicines.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showNotification(`${product.name} added to cart!`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    renderCartItems();
    showNotification('Item removed from cart', 'info');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    updateCartDisplay();
    renderCartItems();
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    if (!cartCount) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'block' : 'none';
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    if (!cartItemsContainer || !cartTotalElement) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotalElement.textContent = '0.00';
        return;
    }
    
    const cartItemsHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="btn btn--outline btn--sm" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');
    
    cartItemsContainer.innerHTML = cartItemsHTML;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = total.toFixed(2);
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Special handling for cart modal
        if (modalId === 'cartModal') {
            renderCartItems();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function switchModal(currentModalId, newModalId) {
    closeModal(currentModalId);
    setTimeout(() => openModal(newModalId), 150);
}

function openPrescriptionModal() {
    openModal('prescriptionModal');
}

function setupModalCloseHandlers() {
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal:not(.hidden)');
            if (openModal) {
                openModal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        }
    });
}

// Form Handlers
function setupFormHandlers() {
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            //e.preventDefault();
            showNotification('Login functionality would be implemented here', 'info');
            closeModal('loginModal');
        });
    }
    
    // Register Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
           // e.preventDefault();
            showNotification('Registration functionality would be implemented here', 'info');
            closeModal('registerModal');
        });
    }
    
    // Prescription Form
    const prescriptionForm = document.getElementById('prescriptionForm');
    if (prescriptionForm) {
        prescriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Prescription uploaded successfully! We will contact you soon.', 'success');
            closeModal('prescriptionModal');
            prescriptionForm.reset();
        });
    }
    
    // Contact Form
    const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault(); // stop page reload

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("/mail/sendMessage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          showNotification(
            "Message sent successfully! We will get back to you soon.",
            "success"
          );
          contactForm.reset();
        } else {
          showNotification("Failed to send message. Please try again.", "error");
        }
      } catch (err) {
        console.error("Error:", err);
        showNotification("Something went wrong. Try again later.", "error");
      }
    });
  }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Successfully subscribed to newsletter!', 'success');
            newsletterForm.reset();
        });
    }
    
    // Checkout Button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                showNotification('Your cart is empty!', 'error');
                return;
            }
            showNotification('Redirecting to secure checkout...', 'success');
            closeModal('cartModal');
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 3000;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Set notification colors based on type
    const colors = {
        success: { bg: '#d1fae5', color: '#065f46', border: '#10b981' },
        error: { bg: '#fee2e2', color: '#991b1b', border: '#ef4444' },
        warning: { bg: '#fef3c7', color: '#92400e', border: '#f59e0b' },
        info: { bg: '#dbeafe', color: '#1e40af', border: '#3b82f6' }
    };
    
    const colorScheme = colors[type] || colors.info;
    notification.style.background = colorScheme.bg;
    notification.style.color = colorScheme.color;
    notification.style.border = `1px solid ${colorScheme.border}`;
    
    // Add notification content styles
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: inherit;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add animation styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Update active navigation link based on scroll position
window.addEventListener('scroll', function() {
    const sections = ['home', 'medicines', 'health-products', 'about', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section && scrollPosition >= section.offsetTop) {
            currentSection = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});