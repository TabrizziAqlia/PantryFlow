// ===================================================
//  GLOBAL DATA & CONFIGURATION
// ===================================================

let pantryItems = [
    // Data stok awal untuk demo
    { name: "Bayam Segar", expDate: "2025-12-03", qty: 1, estimatedPrice: 5000, category: "Sayur Segar Kulkas" },    
    { name: "Telur Ayam", expDate: "2025-12-08", qty: 10, estimatedPrice: 24000, category: "Susu/Telur Kulkas" }, 
    { name: "Susu UHT Kotak", expDate: "2025-12-05", qty: 2, estimatedPrice: 15000, category: "Susu/Telur Kulkas" }, 
    { name: "Keju Cheddar", expDate: "2025-12-18", qty: 1, estimatedPrice: 15000, category: "Bahan Kering" },   
    { name: "Beras 5kg", expDate: "2026-06-15", qty: 1, estimatedPrice: 65000, category: "Bahan Kering" }      
];

let itemsSaved = 0; 
const ITEM_PRICE_AVG = 10000; 
let currentFilter = 'all'; 
let userName = localStorage.getItem('pantryflowUserName');


// --- DATABASE RESEP DUMMY (tetap sama) ---
const recipeDatabase = [
    { 
        name: "Omelet Sayur Bumbu Dasar", 
        ingredients: ["Telur Ayam", "Bayam Segar"], 
        tags: ["quick", "kost"], 
        cookpadLink: "https://cookpad.com/id/resep/23940635" 
    },
    { 
        name: "Nasi Goreng Sederhana", 
        ingredients: ["Telur Ayam", "Beras 5kg"], 
        tags: ["quick", "kost"], 
        cookpadLink: "https://cookpad.com/id/resep/25185952" 
    },
    { 
        name: "Susu Keju Panggang", 
        ingredients: ["Susu UHT Kotak", "Keju Cheddar"], 
        tags: ["kost"], 
        cookpadLink: "https://cookpad.com/id/resep/24736305" 
    },
    { 
        name: "Tumis Kangkung Pedas", 
        ingredients: ["Kangkung", "Bayam Segar"], 
        tags: ["quick"], 
        cookpadLink: "https://cookpad.com/id/resep/11223344" 
    },
    { 
        name: "Nasi Gila Anak Kost", 
        ingredients: ["Telur Ayam", "Beras 5kg", "Keju Cheddar"], 
        tags: ["kost", "quick"], 
        cookpadLink: "https://cookpad.com/id/resep/15656236" 
    },
    { 
        name: "Sup Ayam Rempah", 
        ingredients: ["Keju Cheddar", "Beras 5kg"], 
        tags: ["all"], 
        cookpadLink: "https://cookpad.com/id/resep/55667788" 
    },
    { 
        name: "Salad Sayur Segar", 
        ingredients: ["Bayam Segar", "Keju Cheddar"], 
        tags: ["all"], 
        cookpadLink: "https://cookpad.com/id/resep/25176969" 
    },
];

// --- DATABASE LOKASI REKOMENDASI (tetap sama) ---
const locationDatabase = [
    {
        name: "Pasar Karah",
        address: "Jl. Karah Agung No.Raya, Karah",
        description: "Pasar tradisional. Sumber terbaik bahan lokal, musiman, dan minim waste.",
        mapsLink: "https://maps.google.com/?cid=436200006626735641&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ"
    },
    {
        name: "Prima Freshmart Bibis Karah",
        address: "Jl. Bibis Karah No.5, Karah",
        description: "Menyediakan produk segar dan beku untuk stok harian.",
        mapsLink: "https://maps.google.com/?cid=9398199938376400228&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ"
    },
    {
        name: "Sakinah Minimarket (Gg. Lebar)",
        address: "Gg. Lebar No.51, Kendangsari (Dekat Karah)",
        description: "Toko kebutuhan harian, mudah dijangkau di sekitar Karah.",
        mapsLink: "https://maps.google.com/?cid=14838424046285164046&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ"
    }
];

// --- DATABASE HARGA BAHAN POKOK (Rata-rata Harga Pasar Jatim) ---
const PRICE_GUIDE = [
    // PROTEIN & OLAHAN
    { name: "Daging Ayam Ras", unit: "kg", price: 36000, color: "#e74c3c" },
    { name: "Telur Ayam Ras", unit: "kg", price: 28000, color: "#f39c12" },
    { name: "Ikan Bandeng", unit: "kg", price: 34000, color: "#3498db" },
    { name: "Ikan Lele", unit: "kg", price: 26000, color: "#3498db" },
    { name: "Ikan Tongkol Segar", unit: "kg", price: 36000, color: "#3498db" },
    { name: "Ikan Asin Teri", unit: "kg", price: 77000, color: "#3498db" },
    { name: "Susu Kental Manis", unit: "370 gr/kl", price: 12500, color: "#9b59b6" },
    { name: "Daging Sapi (Paha)", unit: "kg", price: 119000, color: "#e74c3c" },

    // KARBOHIDRAT & POKOK
    { name: "Beras Medium", unit: "kg", price: 12850, color: "#27ae60" },
    { name: "Tepung Terigu", unit: "kg", price: 11500, color: "#27ae60" },
    { name: "Jagung Pipilan Kering", unit: "kg", price: 7650, color: "#27ae60" },
    { name: "Ketela Pohon", unit: "kg", price: 5000, color: "#27ae60" },
    { name: "Indomie Kari Ayam", unit: "bungkus", price: 3600, color: "#f39c12" },

    // MINYAK & GULA
    { name: "Minyak Goreng Curah", unit: "liter", price: 18700, color: "#f39c12" },
    { name: "Minyakita", unit: "liter", price: 16700, color: "#27ae60" },
    { name: "Gula Kristal Putih", unit: "kg", price: 16400, color: "#f39c12" },

    // BUMBU & REMPAH
    { name: "Bawang Putih", unit: "kg", price: 30200, color: "#9b59b6" },
    { name: "Bawang Merah", unit: "kg", price: 40100, color: "#9b59b6" },
    { name: "Cabai Rawit Merah", unit: "kg", price: 45800, color: "#e74c3c" },
    { name: "Cabai Merah Keriting", unit: "kg", price: 48400, color: "#e74c3c" },
    { name: "Garam Beryodium", unit: "kg", price: 9400, color: "#9b59b6" },

    // SAYURAN
    { name: "Tomat", unit: "kg", price: 11650, color: "#27ae60" },
    { name: "Kol/Kubis", unit: "kg", price: 7150, color: "#27ae60" },
    { name: "Kentang", unit: "kg", price: 15000, color: "#27ae60" },
    { name: "Wortel", unit: "kg", price: 14200, color: "#27ae60" },
    { name: "Buncis", unit: "kg", price: 12150, color: "#27ae60" },

    // KACANG-KACANGAN
    { name: "Kacang Kedelai Impor", unit: "kg", price: 12550, color: "#9b59b6" },
    { name: "Kacang Hijau", unit: "kg", price: 23350, color: "#9b59b6" },
    { name: "Kacang Tanah", unit: "kg", price: 29250, color: "#9b59b6" },
];


// ===================================================
//  UTILITY FUNCTIONS
// ===================================================

/** Menghitung sisa hari hingga kedaluwarsa */
function calculateDaysRemaining(expDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const expiry = new Date(expDate);
    const timeDiff = expiry.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
}

/** Menentukan kelas warna berdasarkan sisa hari */
function getStatusClass(days) {
    if (days <= 0) { 
        return 'status-merah'; 
    } else if (days <= 7) {
        return 'status-merah'; 
    } else if (days <= 14) {
        return 'status-kuning'; 
    } else {
        return 'status-hijau'; 
    }
}


// ===================================================
//  IMPACT & COOKING LOGIC
// ===================================================

/** Memperbarui metrik Dampak Saya */
function updateImpactMetrics() {
    // Diasumsikan rata-rata item terselamatkan 50% dari harga rata-rata
    const totalSavedValue = itemsSaved * ITEM_PRICE_AVG; 
    document.getElementById('total-saved').textContent = `Rp ${totalSavedValue.toLocaleString('id-ID')}`;
    document.getElementById('items-saved').textContent = itemsSaved;
}

/** Mensimulasikan dampak saat pengguna 'memasak' resep */
function simulateCookingAndImpact(itemCount = 1) {
    itemsSaved += itemCount; 
    updateImpactMetrics(); 
}

// Event listener untuk tombol 'Masak Resep Ini'
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('action-button')) {
        // Hanya memicu simulasi jika tombol masak
        if (e.target.textContent.indexOf('Masak Resep Ini') !== -1) {
             // Simulasi item yang dimasak (misalnya 2 item)
             simulateCookingAndImpact(2); 
             // Opsi: Tambahkan feedback visual bahwa item telah digunakan
        }
    }
});


// ===================================================
//  RENDER FUNCTIONS
// ===================================================

/** Merender daftar item di Pantry Digital */
function renderPantry() {
    const sortBy = document.getElementById('sort-by').value;
    // Sorting Logic
    if (sortBy === 'exp-asc') {
        pantryItems.sort((a, b) => new Date(a.expDate) - new Date(b.expDate));
    } else if (sortBy === 'name-asc') {
        pantryItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    const listContainer = document.getElementById('item-list');
    listContainer.innerHTML = '';
    
    pantryItems.forEach((item, index) => {
        const daysLeft = calculateDaysRemaining(item.expDate);
        const statusClass = getStatusClass(daysLeft);
        const daysText = daysLeft <= 0 ? 'KEDALUWARSA!' : `Sisa Hari: ${daysLeft}`;
        
        const itemCard = document.createElement('div');
        itemCard.className = `item-card ${statusClass}`;
        itemCard.setAttribute('data-index', index);
        itemCard.innerHTML = `
            <strong>${item.name} (${item.qty})</strong><br>
            <small>Kategori: ${item.category}</small><br>
            <small>ED: ${item.expDate}</small><br>
            <span class="days-left">${daysText}</span>
        `;
        listContainer.appendChild(itemCard);
    });
    renderRecipes(); 
    updateImpactMetrics();
}

/** Merender daftar Resep Rekomendasi Minimum-Waste (Logika tetap sama) */
function renderRecipes() {
    const outputContainer = document.getElementById('recipe-output');
    outputContainer.innerHTML = '';
    
    // 1. Tentukan bahan yang mendesak (Stok Merah dan Kuning)
    const urgentItems = pantryItems.filter(item => {
        const status = getStatusClass(calculateDaysRemaining(item.expDate));
        return status === 'status-merah' || status === 'status-kuning';
    });
    const urgentNames = urgentItems.map(item => item.name);
    
    // 2. Daftar semua bahan yang dimiliki pengguna
    const allPantryNames = pantryItems.map(item => item.name);

    // 3. Filter: Resep harus memiliki SEMUA bahan yang tersedia di pantry.
    let filteredRecipes = recipeDatabase.filter(recipe => {
        return recipe.ingredients.every(ing => allPantryNames.includes(ing));
    });

    // 4. Terapkan Filter Kategori (kost, quick, local) dan Prioritas
    if (currentFilter !== 'all') {
        // Hanya tampilkan resep yang sesuai dengan tag dan menggunakan bahan mendesak
        filteredRecipes = filteredRecipes.filter(recipe => {
            const matchesTag = recipe.tags.includes(currentFilter);
            const usesUrgentItem = recipe.ingredients.some(ing => urgentNames.includes(ing));
            return matchesTag && usesUrgentItem;
        });
    }

    // 5. Urutkan berdasarkan penggunaan stok mendesak (prioritas)
    if (urgentNames.length > 0) {
        filteredRecipes.sort((a, b) => {
             const aUrgent = a.ingredients.some(ing => urgentNames.includes(ing));
             const bUrgent = b.ingredients.some(ing => urgentNames.includes(ing));
             // Pindah resep dengan bahan mendesak ke atas
             return (bUrgent === aUrgent) ? 0 : (bUrgent ? -1 : 1); 
        });
    }

    // 6. Rendering Hasil
    const gridContainer = document.createElement('div');
    gridContainer.className = 'recipe-output-grid';

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            
            const savedIngredients = recipe.ingredients.filter(ing => urgentNames.includes(ing)).join(', ');
            const urgentText = savedIngredients ? 
                                `<strong>Bahan Mendesak:</strong> ${savedIngredients}` : 
                                `<em>Bahan Tersedia: Stok Aman</em>`;

            recipeCard.innerHTML = `
                <h3>${recipe.name}</h3>
                <p>${urgentText}</p>
                <p><small>Tags: ${recipe.tags.join(', ')}</small></p>
                <a href="${recipe.cookpadLink}" target="_blank" class="action-button">Masak Resep Ini</a>
            `;
            gridContainer.appendChild(recipeCard);
        });
        outputContainer.appendChild(gridContainer);
    } else {
        const filterName = currentFilter === 'all' ? 'Semua Kategori' : `Kategori ${currentFilter}`;
        outputContainer.innerHTML = `<div class="recipe-card span-full"><p>Tidak ada resep yang semua bahannya tersedia di Pantry Anda pada ${filterName}, atau tidak ada yang menggunakan stok mendesak.</p></div>`;
    }
}

/** Merender daftar Lokasi Rekomendasi (tetap sama) */
function renderLocations() {
    const outputContainer = document.getElementById('location-output');
    outputContainer.innerHTML = '';
    
    outputContainer.className = 'recipe-output-grid'; 

    locationDatabase.forEach(location => {
        const locationCard = document.createElement('div');
        locationCard.className = 'recipe-card'; 
        
        locationCard.innerHTML = `
            <h3>${location.name}</h3>
            <p>${location.description}</p>
            <p><small>Alamat: ${location.address}</small></p>
            <a href="${location.mapsLink}" target="_blank" class="action-button map-button">Lihat di Maps 🗺️</a>
        `;
        outputContainer.appendChild(locationCard);
    });
}

/** Merender daftar harga bahan makanan (Fungsi Baru) */
function renderPriceList() {
    const outputContainer = document.getElementById('price-list-output');
    outputContainer.innerHTML = '';
    
    // Header tabel
    let tableHTML = `
        <table class="price-table">
            <thead>
                <tr>
                    <th>Bahan Makanan</th>
                    <th>Satuan</th>
                    <th>Harga Rata-rata</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Isi baris tabel
    PRICE_GUIDE.forEach(item => {
        // Menggunakan toLocaleString untuk format Rupiah yang rapi
        const formattedPrice = `Rp ${item.price.toLocaleString('id-ID')}`;
        tableHTML += `
            <tr>
                <td><span style="color: ${item.color};">•</span> ${item.name}</td>
                <td>${item.unit}</td>
                <td><strong>${formattedPrice}</strong></td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    outputContainer.innerHTML = tableHTML;
}


// ===================================================
//  USER INTERACTION HANDLERS (INPUT & WELCOME)
// ===================================================

/** Menampilkan form nama atau pesan motivasi (tetap sama) */
function displayWelcomeMessage(name) {
    const welcomeMessageDiv = document.getElementById('welcome-message');
    const nameForm = document.getElementById('name-form');
    
    if (name) {
        const messageHTML = `
            <h2>Selamat Datang, ${name}! 👋</h2>
            <p><strong>Motivasi Hari Ini:</strong> "Setiap bahan yang Anda catat hari ini, adalah satu langkah mengurangi jejak sampah. Lanjutkan konsistensi kecil ini, dampaknya besar!"</p>
            <p class="small-text"><a href="#" id="change-name-link">Bukan Anda? Ganti Nama.</a></p>
        `;
        nameForm.style.display = 'none';
        welcomeMessageDiv.style.display = 'block';
        welcomeMessageDiv.innerHTML = messageHTML;

        document.getElementById('change-name-link').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('pantryflowUserName');
            userName = null;
            displayWelcomeMessage(null); 
        });
    } else {
        nameForm.style.display = 'block';
        welcomeMessageDiv.style.display = 'none';
    }
}


// Event listener untuk pengiriman form input nama (tetap sama)
document.getElementById('name-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const nameInput = document.getElementById('user-name-input').value.trim();
    if (nameInput) {
        userName = nameInput;
        localStorage.setItem('pantryflowUserName', userName);
        displayWelcomeMessage(userName);
    }
});

// Event listener untuk pengiriman form input item (Diperbaiki)
document.getElementById('add-item-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('item-name').value;
    const date = document.getElementById('exp-date').value;
    const qty = parseInt(document.getElementById('quantity').value);
    // Ambil value category
    const category = document.getElementById('item-category').value; 
    const estimatedPrice = Math.floor(Math.random() * 50000) + 5000; 

    if (name && date && qty > 0 && category) {
        pantryItems.push({ 
            name: name, 
            expDate: date, 
            qty: qty,
            estimatedPrice: estimatedPrice,
            category: category // Ditambahkan properti category
        });
        renderPantry();
        this.reset();
    } else {
        alert("Mohon isi semua data dengan benar.");
    }
});

// Event listener untuk filter resep (tetap sama)
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.getAttribute('data-filter');
        renderRecipes(); 
    });
});


// ===================================================
//  INITIALIZATION
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
    displayWelcomeMessage(userName); 
    renderPantry();                 
    renderLocations();              
    renderPriceList();              // Dipanggil saat inisialisasi
});
