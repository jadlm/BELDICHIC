// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Force hide admin buttons first (security measure)
    forceHideAdminButtons();
    
    initializeApp();
    // Delay checkAdminStatus to ensure DOM is fully loaded
    setTimeout(checkAdminStatus, 100);
});

// Check admin status and show/hide admin buttons
function checkAdminStatus() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    
    console.log('Checking admin status:', isLoggedIn); // Debug log
    
    // Remove existing admin buttons first
    removeAdminButtons();
    
    // Create admin buttons only if logged in
    if (isLoggedIn) {
        createAdminButtons();
        console.log('Admin buttons created');
    } else {
        console.log('Admin buttons removed');
    }
}

// Create admin buttons dynamically
function createAdminButtons() {
    // Create admin nav link
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        const adminLi = document.createElement('li');
        adminLi.innerHTML = `
            <a href="admin.html" class="nav-link admin-link">
                <i class="fas fa-user-shield"></i> Admin
            </a>
        `;
        navMenu.appendChild(adminLi);
    }
    
    // Create floating admin button
    const floatingBtn = document.createElement('a');
    floatingBtn.href = 'admin.html';
    floatingBtn.className = 'floating-admin-btn';
    floatingBtn.title = 'Administration';
    floatingBtn.innerHTML = '<i class="fas fa-user-shield"></i>';
    document.body.appendChild(floatingBtn);
}

// Remove admin buttons
function removeAdminButtons() {
    // Remove admin nav link
    const adminNavLink = document.querySelector('.admin-link');
    if (adminNavLink) {
        adminNavLink.parentElement.remove();
    }
    
    // Remove floating admin button
    const floatingBtn = document.querySelector('.floating-admin-btn');
    if (floatingBtn) {
        floatingBtn.remove();
    }
}

// Force hide admin buttons immediately (for security)
function forceHideAdminButtons() {
    removeAdminButtons();
}

// Initialize products and cart
function initializeApp() {
    initializeProducts();
    loadCart();
    updateCartUI();
    displayProducts();
}

// Initialize default products if none exist
function initializeProducts() {
    if (!localStorage.getItem('products')) {
        const defaultProducts = [
            {
                id: 1,
                name: "Caftan Marrakech",
                description: "Caftan traditionnel en soie avec broderies fines",
                price: 2500,
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
                category: "caftan",
                stock: 5,
                dateAdded: new Date().toISOString()
            },
            {
                id: 2,
                name: "Djellaba Moderne",
                description: "Djellaba contemporaine en coton bio",
                price: 800,
                image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
                category: "djellaba",
                stock: 10,
                dateAdded: new Date().toISOString()
            },
            {
                id: 3,
                name: "Ceinture Berbère",
                description: "Ceinture artisanale en argent et cuir",
                price: 450,
                image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=400",
                category: "accessories",
                stock: 15,
                dateAdded: new Date().toISOString()
            },
            {
                id: 4,
                name: "Caftan Fès",
                description: "Caftan royal en velours avec fils d'or",
                price: 3500,
                image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400",
                category: "caftan",
                stock: 3,
                dateAdded: new Date().toISOString()
            },
            {
                id: 5,
                name: "Djellaba Soirée",
                description: "Djellaba élégante pour occasions spéciales",
                price: 1200,
                image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400",
                category: "djellaba",
                stock: 7,
                dateAdded: new Date().toISOString()
            },
            {
                id: 6,
                name: "Bijoux Traditionnels",
                description: "Collier artisanal en argent et pierres précieuses",
                price: 650,
                image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400",
                category: "accessories",
                stock: 12,
                dateAdded: new Date().toISOString()
            }
        ];
        localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
}

// Get products from localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('products') || '[]');
}

// Save products to localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart on page load
function loadCart() {
    const cart = getCart();
    updateCartUI();
}

// Display products on the page
function displayProducts(productsToDisplay = null) {
    const productsGrid = document.getElementById('productsGrid');
    const products = productsToDisplay || getProducts();
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">Aucun produit trouvé</p>';
        return;
    }
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${product.price} MAD</div>
                <div class="product-stock ${product.stock === 0 ? 'out-of-stock' : ''}">
                    ${product.stock > 0 ? `En stock: ${product.stock} pièces` : 'Rupture de stock'}
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})" 
                        ${product.stock === 0 ? 'disabled' : ''}>
                    ${product.stock === 0 ? 'Indisponible' : 'Ajouter au panier'}
                </button>
            </div>
        </div>
    `).join('');
}

// Add product to cart
function addToCart(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        showToast('Produit non trouvé', 'error');
        return;
    }
    
    if (product.stock === 0) {
        showToast('Ce produit est en rupture de stock', 'error');
        return;
    }
    
    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity >= product.stock) {
            showToast('Stock insuffisant', 'error');
            return;
        }
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart(cart);
    updateCartUI();
    showToast('Produit ajouté au panier', 'success');
}

// Update cart UI
function updateCartUI() {
    const cart = getCart();
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem;">Votre panier est vide</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price} MAD</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Supprimer</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total;
}

// Update item quantity in cart
function updateQuantity(productId, change) {
    const cart = getCart();
    const products = getProducts();
    const item = cart.find(item => item.id === productId);
    const product = products.find(p => p.id === productId);
    
    if (!item || !product) return;
    
    const newQuantity = item.quantity + change;
    
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    if (newQuantity > product.stock) {
        showToast('Stock insuffisant', 'error');
        return;
    }
    
    item.quantity = newQuantity;
    saveCart(cart);
    updateCartUI();
}

// Remove item from cart
function removeFromCart(productId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
    updateCartUI();
    showToast('Produit retiré du panier', 'success');
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
}

// Toggle mobile menu
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Filter products
function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const products = getProducts();
    
    let filteredProducts = products;
    if (category) {
        filteredProducts = products.filter(p => p.category === category);
    }
    
    displayProducts(filteredProducts);
}

// Sort products
function sortProducts() {
    const sortBy = document.getElementById('sortFilter').value;
    const products = getProducts();
    
    let sortedProducts = [...products];
    
    switch(sortBy) {
        case 'newest':
            sortedProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            break;
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
    }
    
    displayProducts(sortedProducts);
}

// Checkout via WhatsApp
function checkoutWhatsApp() {
    const cart = getCart();
    
    if (cart.length === 0) {
        showToast('Votre panier est vide', 'error');
        return;
    }
    
    const phoneNumber = '+212612345678'; // Replace with actual WhatsApp number
    let message = '🌸 *Nouvelle commande Beldi Chic* 🌸\n\n';
    message += '*Détails de la commande:*\n\n';
    
    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `${index + 1}. *${item.name}*\n`;
        message += `   Quantité: ${item.quantity}\n`;
        message += `   Prix unitaire: ${item.price} MAD\n`;
        message += `   Sous-total: ${itemTotal} MAD\n\n`;
    });
    
    message += `*Total général: ${total} MAD*\n\n`;
    message += 'Merci de confirmer la disponibilité et les modalités de livraison. 🚚';
    
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Show toast notification
function showToast(message, type = 'success') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close cart when clicking outside
document.addEventListener('click', function(e) {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
        cartSidebar.classList.remove('active');
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--bg-white)';
        navbar.style.backdropFilter = 'none';
    }
});

// Image Upload Functions
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            document.getElementById('productImage').value = imageUrl;
            showImagePreview('productImagePreview', 'previewImg', imageUrl);
            showToast('Image uploadée avec succès', 'success');
        };
        reader.readAsDataURL(file);
    } else {
        showToast('Veuillez sélectionner une image valide', 'error');
    }
}

function handleEditImageUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            document.getElementById('editProductImage').value = imageUrl;
            showImagePreview('editProductImagePreview', 'editPreviewImg', imageUrl);
            showToast('Image uploadée avec succès', 'success');
        };
        reader.readAsDataURL(file);
    } else {
        showToast('Veuillez sélectionner une image valide', 'error');
    }
}

function showImagePreview(previewId, imgId, imageUrl) {
    const preview = document.getElementById(previewId);
    const img = document.getElementById(imgId);
    const uploadArea = preview.previousElementSibling;
    
    img.src = imageUrl;
    preview.style.display = 'block';
    uploadArea.style.display = 'none';
}

function removeImage() {
    document.getElementById('productImage').value = '';
    document.getElementById('productImagePreview').style.display = 'none';
    document.querySelector('.image-upload-area').style.display = 'block';
    document.getElementById('productImageFile').value = '';
}

function removeEditImage() {
    document.getElementById('editProductImage').value = '';
    document.getElementById('editProductImagePreview').style.display = 'none';
    document.querySelector('#editProductForm .image-upload-area').style.display = 'block';
    document.getElementById('editProductImageFile').value = '';
}

function toggleUrlInput() {
    const urlInput = document.getElementById('productImage');
    const uploadArea = document.querySelector('.image-upload-area');
    
    if (urlInput.style.display === 'none') {
        urlInput.style.display = 'block';
        urlInput.required = true;
        uploadArea.style.display = 'none';
    } else {
        urlInput.style.display = 'none';
        urlInput.required = false;
        uploadArea.style.display = 'block';
    }
}

function toggleEditUrlInput() {
    const urlInput = document.getElementById('editProductImage');
    const uploadArea = document.querySelector('#editProductForm .image-upload-area');
    
    if (urlInput.style.display === 'none') {
        urlInput.style.display = 'block';
        urlInput.required = true;
        uploadArea.style.display = 'none';
    } else {
        urlInput.style.display = 'none';
        urlInput.required = false;
        uploadArea.style.display = 'block';
    }
}

// Initialize admin functionality if on admin page
if (window.location.pathname.includes('admin.html')) {
    initializeAdmin();
}

// Also check admin status when window gains focus (for tab switching)
window.addEventListener('focus', function() {
    setTimeout(checkAdminStatus, 100);
});

// Check admin status periodically (every 5 seconds) as a fallback
setInterval(checkAdminStatus, 5000);

// Admin functions
function initializeAdmin() {
    checkAdminAuth();
    // Only display products if user is logged in
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn) {
        displayAdminProducts();
    }
}

function checkAdminAuth() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    const loginSection = document.getElementById('loginSection');
    const adminSection = document.getElementById('adminSection');
    
    if (!isLoggedIn) {
        // Show login section, hide admin section
        if (loginSection) loginSection.style.display = 'block';
        if (adminSection) adminSection.style.display = 'none';
    } else {
        // Show admin section, hide login section
        if (loginSection) loginSection.style.display = 'none';
        if (adminSection) adminSection.style.display = 'block';
    }
}

function adminLogin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    // Simple hardcoded credentials (in production, use proper authentication)
    if (username === 'admin' && password === 'beldi123') {
        sessionStorage.setItem('adminLoggedIn', 'true');
        checkAdminAuth(); // Use the unified function instead of manual display control
        displayAdminProducts();
        showToast('Connexion réussie', 'success');
        
        // Redirect to main page after successful login
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showToast('Identifiants incorrects', 'error');
    }
}

function adminLogout() {
    sessionStorage.removeItem('adminLoggedIn');
    checkAdminAuth(); // Use the unified function
    showToast('Déconnexion réussie', 'success');
    
    // Check admin status immediately after logout
    setTimeout(checkAdminStatus, 100);
    
    // Redirect to admin login page
    setTimeout(() => {
        window.location.href = 'admin.html';
    }, 1500);
}

function displayAdminProducts() {
    const products = getProducts();
    const adminProductsGrid = document.getElementById('adminProductsGrid');
    
    if (!adminProductsGrid) return;
    
    adminProductsGrid.innerHTML = products.map(product => `
        <div class="admin-product-card">
            <img src="${product.image}" alt="${product.name}" class="admin-product-image">
            <div class="admin-product-info">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <div class="admin-product-details">
                    <span>Prix: ${product.price} MAD</span>
                    <span>Stock: ${product.stock}</span>
                    <span>Catégorie: ${product.category}</span>
                </div>
                <div class="admin-product-actions">
                    <button onclick="editProduct(${product.id})">Modifier</button>
                    <button onclick="deleteProduct(${product.id})" class="delete-btn">Supprimer</button>
                </div>
            </div>
        </div>
    `).join('');
}

function showAddProductForm() {
    document.getElementById('addProductForm').style.display = 'block';
}

function hideAddProductForm() {
    document.getElementById('addProductForm').style.display = 'none';
    document.getElementById('productForm').reset();
    
    // Reset image upload area
    document.getElementById('productImage').value = '';
    document.getElementById('productImagePreview').style.display = 'none';
    document.querySelector('#addProductForm .image-upload-area').style.display = 'block';
    document.getElementById('productImageFile').value = '';
    
    // Reset URL input visibility
    document.getElementById('productImage').style.display = 'none';
    document.getElementById('productImage').required = false;
}

function addProduct() {
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const image = document.getElementById('productImage').value;
    const category = document.getElementById('productCategory').value;
    const stock = parseInt(document.getElementById('productStock').value);
    
    if (!name || !description || !price || !category || isNaN(stock)) {
        showToast('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }
    
    if (!image) {
        showToast('Veuillez ajouter une image ou fournir une URL', 'error');
        return;
    }
    
    const products = getProducts();
    const newProduct = {
        id: Date.now(),
        name,
        description,
        price,
        image,
        category,
        stock,
        dateAdded: new Date().toISOString()
    };
    
    products.push(newProduct);
    saveProducts(products);
    displayAdminProducts();
    hideAddProductForm();
    showToast('Produit ajouté avec succès', 'success');
}

function editProduct(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    document.getElementById('editProductId').value = product.id;
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductDescription').value = product.description;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductImage').value = product.image;
    document.getElementById('editProductCategory').value = product.category;
    document.getElementById('editProductStock').value = product.stock;
    
    // Show existing image in preview
    showImagePreview('editProductImagePreview', 'editPreviewImg', product.image);
    
    document.getElementById('editProductForm').style.display = 'block';
}

function updateProduct() {
    const id = parseInt(document.getElementById('editProductId').value);
    const name = document.getElementById('editProductName').value;
    const description = document.getElementById('editProductDescription').value;
    const price = parseFloat(document.getElementById('editProductPrice').value);
    const image = document.getElementById('editProductImage').value;
    const category = document.getElementById('editProductCategory').value;
    const stock = parseInt(document.getElementById('editProductStock').value);
    
    if (!name || !description || !price || !category || isNaN(stock)) {
        showToast('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }
    
    if (!image) {
        showToast('Veuillez ajouter une image ou fournir une URL', 'error');
        return;
    }
    
    const products = getProducts();
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) return;
    
    products[productIndex] = {
        ...products[productIndex],
        name,
        description,
        price,
        image,
        category,
        stock
    };
    
    saveProducts(products);
    displayAdminProducts();
    hideEditProductForm();
    showToast('Produit modifié avec succès', 'success');
}

function hideEditProductForm() {
    document.getElementById('editProductForm').style.display = 'none';
    document.getElementById('editProductFormElement').reset();
    
    // Reset image upload area
    document.getElementById('editProductImage').value = '';
    document.getElementById('editProductImagePreview').style.display = 'none';
    document.querySelector('#editProductForm .image-upload-area').style.display = 'block';
    document.getElementById('editProductImageFile').value = '';
    
    // Reset URL input visibility
    document.getElementById('editProductImage').style.display = 'none';
    document.getElementById('editProductImage').required = false;
}

function deleteProduct(productId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;
    
    const products = getProducts();
    const updatedProducts = products.filter(p => p.id !== productId);
    saveProducts(updatedProducts);
    displayAdminProducts();
    showToast('Produit supprimé avec succès', 'success');
}
