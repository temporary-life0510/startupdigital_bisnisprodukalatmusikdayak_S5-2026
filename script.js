// Data Produk Alat Musik Dayak Sampit
const products = [
    {
        id: 1,
        name: "Sampe",
        price: 300000,
        formattedPrice: "Rp 300.000",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw6673s5cA5h9mFLZ_SZZKq9Qmzab19VBH5-iAFoVqpw&s=10" // Ilustrasi alat musik petik
    },
    {
        id: 2,
        name: "Suling Balawung",
        price: 150000,
        formattedPrice: "Rp 150.000",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMewg2OFnW1pLaTS2TJwMMLUtx10ult_LYyHH_p400Rg&s=10" // Ilustrasi alat musik tiup
    },
    {
        id: 3,
        name: "Antoneng",
        price: 250000,
        formattedPrice: "Rp 250.000",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBLknDdjI1Lpm1djJIg1ZJ9jqwpLfOtqNyvVAFysuHrg&s=10" // Ilustrasi alat musik tradisional
    },
    {
        id: 4,
        name: "Garantung",
        price: 350000,
        formattedPrice: "Rp 350.000",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmjxzDM4htAZ9tZFzQxk8b5sjoPAU11P3PDK826J9zTg&s=10" // Ilustrasi gong/perkusi
    },
    {
        id: 5,
        name: "Kangkuang",
        price: 300000,
        formattedPrice: "Rp 300.000",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8kH3PkCx8T00MLDQj5JmY6UlLrbPxZfxa212Gb_AWyA&s=10" // Ilustrasi alat musik tradisional
    }
];

// Nomor WhatsApp Pemilik Toko
const ownerWhatsApp = "6282255886736";

// Elemen DOM
const productGrid = document.getElementById('productGrid');
const orderModal = document.getElementById('orderModal');
const closeModal = document.getElementById('closeModal');
const orderForm = document.getElementById('orderForm');
const modalProductName = document.getElementById('modalProductName');
const inputProduct = document.getElementById('inputProduct');
const inputPrice = document.getElementById('inputPrice');
const summaryPriceText = document.getElementById('summaryPriceText');

// Fungsi Render Katalog Produk ke HTML
function renderProducts() {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h4 class="product-title">${product.name}</h4>
                <div class="product-price">${product.formattedPrice}</div>
                <button class="btn-buy" onclick="openOrderModal(${product.id})">
                    <i class="fa-solid fa-cart-shopping"></i> Beli Sekarang
                </button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// Buka Modal Pemesanan
window.openOrderModal = function(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        modalProductName.textContent = `Beli ${product.name}`;
        inputProduct.value = product.name;
        inputPrice.value = product.price;
        summaryPriceText.textContent = product.formattedPrice;
        orderModal.classList.add('active');
    }
};

// Tutup Modal
closeModal.addEventListener('click', () => {
    orderModal.classList.remove('active');
    orderForm.reset();
});

// Tutup modal jika klik di luar kotak modal
window.addEventListener('click', (e) => {
    if (e.target === orderModal) {
        orderModal.classList.remove('active');
        orderForm.reset();
    }
});

// Aksi Submit Form -> Redirect ke WhatsApp Pemilik Toko
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const productName = inputProduct.value;
    const productPrice = inputPrice.value;
    const namaLengkap = document.getElementById('namaLengkap').value.trim();
    const nomorHp = document.getElementById('nomorHp').value.trim();
    const alamat = document.getElementById('alamat').value.trim();

    // Format Pesan WhatsApp
    const message = `Halo Admin Toko Alat Musik Dayak Sampit (Kelompok 1 Startup Digital),\n\nSaya ingin memesan alat musik berikut:\n\n*Nama Produk:* ${productName}\n*Harga:* Rp ${parseInt(productPrice).toLocaleString('id-ID')}\n\n*Data Pemesan:*\n- Nama Lengkap: ${namaLengkap}\n- No. HP/WA: ${nomorHp}\n- Alamat: ${alamat}\n\nMohon proses pesanan saya. Terima kasih!`;

    // Encode pesan untuk URL WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${ownerWhatsApp}?text=${encodedMessage}`;

    // Buka WhatsApp di tab baru
    window.open(whatsappURL, '_blank');

    // Tutup modal dan reset form
    orderModal.classList.remove('active');
    orderForm.reset();
});

// Jalankan saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});