// ===================================================
//  GLOBAL DATA & CONFIGURATION (Lengkap)
// ===================================================

let pantryItems = [
    // Data stok awal untuk demo
    { name: "Bayam Segar", expDate: "2025-12-03", qty: 1, estimatedPrice: 5000, category: "Sayur Segar Kulkas" },    
    { name: "Telur Ayam Ras", expDate: "2025-12-08", qty: 10, estimatedPrice: 24000, category: "Susu/Telur Kulkas" }, 
    { name: "Susu Kental Manis", expDate: "2025-12-05", qty: 2, estimatedPrice: 15000, category: "Susu/Telur Kulkas" }, 
    { name: "Keju Cheddar", expDate: "2025-12-18", qty: 1, estimatedPrice: 15000, category: "Bahan Kering" },   
    { name: "Beras Medium", expDate: "2026-06-15", qty: 1, estimatedPrice: 65000, category: "Bahan Kering" },
    // Bahan tambahan untuk demo resep baru
    { name: "Wortel", expDate: "2025-12-07", qty: 2, estimatedPrice: 10000, category: "Sayur Segar Kulkas" },
    { name: "Tempe", expDate: "2025-12-04", qty: 1, estimatedPrice: 6000, category: "Sayur Segar Kulkas" },
];

let itemsSaved = 0; 
const ITEM_PRICE_AVG = 10000; 
let currentFilter = 'all'; 
let userName = localStorage.getItem('pantryflowUserName');


// --- DATABASE RESEP DUMMY (15 Resep) ---
const recipeDatabase = [
    { 
        name: "Omelet Sayur Bumbu Dasar", 
        ingredients: ["Telur Ayam Ras", "Bayam Segar"], 
        tags: ["quick", "kost"], 
        cookpadLink: "https://cookpad.com/id/resep/23940635" 
    },
    { 
        name: "Nasi Goreng Sederhana", 
        ingredients: ["Telur Ayam Ras", "Beras Medium"], 
        tags: ["quick", "kost"], 
        cookpadLink: "https://cookpad.com/id/resep/25185952" 
    },
    { 
        name: "Susu Keju Panggang", 
        ingredients: ["Susu Kental Manis", "Keju Cheddar"], 
        tags: ["kost"], 
        cookpadLink: "https://cookpad.com/id/resep/24736305" 
    },
    { 
        name: "Tumis Kangkung Pedas", 
        ingredients: ["Kangkung", "Bawang Putih", "Cabai Rawit Merah"], 
        tags: ["quick"], 
        cookpadLink: "https://cookpad.com/id/resep/11223344" 
    },
    { 
        name: "Nasi Gila Anak Kost", 
        ingredients: ["Telur Ayam Ras", "Beras Medium", "Sosis Ayam"], 
        tags: ["kost", "quick"], 
        cookpadLink: "https://cookpad.com/id/resep/15656236" 
    },
    { 
        name: "Sup Ayam Rempah", 
        ingredients: ["Daging Ayam Ras", "Wortel", "Kentang"], 
        tags: ["all", "local"], 
        cookpadLink: "https://cookpad.com/id/resep/55667788" 
    },
    { 
        name: "Salad Sayur Segar", 
        ingredients: ["Bayam Segar", "Kol/Kubis", "Tomat"], 
        tags: ["all"], 
        cookpadLink: "https://cookpad.com/id/resep/25176969" 
    },
    { 
        name: "Sayur Sop Komplit", 
        ingredients: ["Wortel", "Kentang", "Kol/Kubis", "Daging Ayam Ras"], 
        tags: ["local"], 
        cookpadLink: "https://cookpad.com/id/resep/15414341" 
    },
    { 
        name: "Tumis Tempe Kecap", 
        ingredients: ["Tempe", "Bawang Merah", "Kecap Manis"], 
        tags: ["quick", "kost"], 
        cookpadLink: "https://cookpad.com/id/resep/25686523" 
    },
    { 
        name: "Telur Ceplok Balado", 
        ingredients: ["Telur Ayam Ras", "Cabai Merah Keriting", "Bawang Putih"], 
        tags: ["quick", "kost"], 
        cookpadLink: "https://cookpad.com/id/resep/24646549" 
    },
    { 
        name: "Opor Ayam Sederhana", 
        ingredients: ["Daging Ayam Ras", "Santan Instan", "Bawang Merah"], 
        tags: ["all", "local"], 
        cookpadLink: "https://cookpad.com/id/resep/24584218" 
    },
    { 
        name: "Pecel Lele Sambal Terasi", 
        ingredients: ["Ikan Lele", "Cabai Rawit Merah", "Tomat"], 
        tags: ["local"], 
        cookpadLink: "https://cookpad.com/id/resep/12345678" 
    },
    { 
        name: "Sayur Bening Bayam Jagung", 
        ingredients: ["Bayam Segar", "Jagung Pipilan Kering", "Garam Beryodium"], 
        tags: ["local", "quick"], 
        cookpadLink: "https://cookpad.com/id/resep/25232323" 
    },
    { 
        name: "Nasi Uduk Magic Com", 
        ingredients: ["Beras Medium", "Garam Beryodium", "Santan Instan"], 
        tags: ["kost"], 
        cookpadLink: "https://cookpad.com/id/resep/18181818" 
    },
    { 
        name: "Gulai Ikan Tongkol", 
        ingredients: ["Ikan Tongkol Segar", "Santan Instan", "Bawang Merah"], 
        tags: ["all"], 
        cookpadLink: "https://cookpad.com/id/resep/19191919" 
    },
];

// --- DATABASE LOKASI REKOMENDASI ---
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


// --- DATABASE HARGA BAHAN POKOK (40 Item) ---
const PRICE_GUIDE = [
    // PROTEIN & OLAHAN (14 Item)
    { name: "Daging Ayam Ras", unit: "kg", price: 36000, color: "#e74c3c", shopLink: "https://shopee.co.id/Daging-Ayam-Segar-termurah" },
    { name: "Telur Ayam Ras", unit: "kg", price: 28000, color: "#f39c12", shopLink: "https://tokopedia.com/telur-ayam-ras-murah-jatim" },
    { name: "Ikan Bandeng", unit: "kg", price: 34000, color: "#3498db", shopLink: "https://lazada.co.id/ikan-bandeng-segar" },
    { name: "Ikan Lele", unit: "kg", price: 26000, color: "#3498db", shopLink: "https://shopee.co.id/lele-segar-peternak-lokal" },
    { name: "Ikan Tongkol Segar", unit: "kg", price: 36000, color: "#3498db", shopLink: "https://tokopedia.com/ikan-tongkol-murah" },
    { name: "Ikan Asin Teri", unit: "kg", price: 77000, color: "#3498db", shopLink: "https://lazada.co.id/ikan-asin-teri-premium" },
    { name: "Susu Kental Manis", unit: "370 gr/kl", price: 12500, color: "#9b59b6", shopLink: "https://shopee.co.id/susu-kental-manis-ekonomis" },
    { name: "Daging Sapi (Paha)", unit: "kg", price: 119000, color: "#e74c3c", shopLink: "https://tokopedia.com/daging-sapi-paha-murah" },
    { name: "Tahu Putih", unit: "10 pcs", price: 7500, color: "#27ae60", shopLink: "https://shopee.co.id/tahu-putih-mentah-murah" },
    { name: "Tempe", unit: "Papan besar", price: 6000, color: "#27ae60", shopLink: "https://tokopedia.com/tempe-mentah-papan-besar" },
    { name: "Sosis Ayam", unit: "500 gr", price: 18000, color: "#f39c12", shopLink: "https://lazada.co.id/sosis-ayam-frozen-murah" },
    { name: "Kornet Sapi Kaleng", unit: "198 gr", price: 23000, color: "#f39c12", shopLink: "https://shopee.co.id/kornet-sapi-kaleng-promo" },
    { name: "Susu UHT Kotak", unit: "1L", price: 18000, color: "#9b59b6", shopLink: "https://tokopedia.com/susu-uht-1l-murah" },
    { name: "Keju Cheddar", unit: "200 gr", price: 22000, color: "#f39c12", shopLink: "https://lazada.co.id/keju-cheddar-batang" },


    // KARBOHIDRAT & POKOK (9 Item)
    { name: "Beras Medium", unit: "kg", price: 12850, color: "#27ae60", shopLink: "https://tokopedia.com/beras-medium-curah-jatim" },
    { name: "Tepung Terigu", unit: "kg", price: 11500, color: "#27ae60", shopLink: "https://lazada.co.id/tepung-terigu-serbaguna-1kg" },
    { name: "Jagung Pipilan Kering", unit: "kg", price: 7650, color: "#27ae60", shopLink: "https://shopee.co.id/jagung-pipilan-kering" },
    { name: "Ketela Pohon", unit: "kg", price: 5000, color: "#27ae60", shopLink: "https://tokopedia.com/ketela-pohon-singkong-murah" },
    { name: "Indomie Kari Ayam", unit: "bungkus", price: 3600, color: "#f39c12", shopLink: "https://lazada.co.id/indomie-kari-ayam-grosir" },
    { name: "Mie Telur Kering", unit: "500 gr", price: 13000, color: "#f39c12", shopLink: "https://shopee.co.id/mie-telur-kering-grosir" },
    { name: "Roti Tawar", unit: "bungkus", price: 15000, color: "#9b59b6", shopLink: "https://tokopedia.com/roti-tawar-fresh" },
    { name: "Gandum Utuh", unit: "kg", price: 18000, color: "#27ae60", shopLink: "https://lazada.co.id/gandum-utuh-1kg" },
    { name: "Oatmeal Instan", unit: "200 gr", price: 12000, color: "#f39c12", shopLink: "https://shopee.co.id/oatmeal-instan-murah" },

    // MINYAK & GULA (3 Item)
    { name: "Minyak Goreng Curah", unit: "liter", price: 18700, color: "#f39c12", shopLink: "https://tokopedia.com/minyak-goreng-curah-termurah" },
    { name: "Minyakita", unit: "liter", price: 16700, color: "#27ae60", shopLink: "https://lazada.co.id/minyakita-1l" },
    { name: "Gula Kristal Putih", unit: "kg", price: 16400, color: "#f39c12", shopLink: "https://shopee.co.id/gula-pasir-termurah-1kg" },

    // BUMBU & REMPAH (10 Item)
    { name: "Bawang Putih", unit: "kg", price: 30200, color: "#9b59b6", shopLink: "https://tokopedia.com/bawang-putih-kiloan" },
    { name: "Bawang Merah", unit: "kg", price: 40100, color: "#9b59b6", shopLink: "https://lazada.co.id/bawang-merah-fresh-1kg" },
    { name: "Cabai Rawit Merah", unit: "kg", price: 45800, color: "#e74c3c", shopLink: "https://shopee.co.id/cabe-rawit-merah-pasar" },
    { name: "Cabai Merah Keriting", unit: "kg", price: 48400, color: "#e74c3c", shopLink: "https://tokopedia.com/cabe-merah-keriting" },
    { name: "Garam Beryodium", unit: "kg", price: 9400, color: "#9b59b6", shopLink: "https://lazada.co.id/garam-beryodium-termurah" },
    { name: "Kecap Manis", unit: "600 ml", price: 23000, color: "#f39c12", shopLink: "https://shopee.co.id/kecap-manis-refill-besar" },
    { name: "Saus Sambal", unit: "340 ml", price: 10500, color: "#e74c3c", shopLink: "https://tokopedia.com/saus-sambal-murah" },
    { name: "Lada Bubuk", unit: "sachet", price: 500, color: "#9b59b6", shopLink: "https://lazada.co.id/lada-bubuk-sachet-grosir" },
    { name: "Kaldu Ayam Bubuk", unit: "sachet", price: 800, color: "#9b59b6", shopLink: "https://shopee.co.id/kaldu-ayam-sachet-ekonomis" },
    { name: "Gula Merah", unit: "kg", price: 18000, color: "#f39c12", shopLink: "https://tokopedia.com/gula-merah-batok-1kg" },

    // SAYURAN & PELENGKAP (10 Item)
    { name: "Tomat", unit: "kg", price: 11650, color: "#27ae60", shopLink: "https://tokopedia.com/tomat-sayur-segar" },
    { name: "Kol/Kubis", unit: "kg", price: 7150, color: "#27ae60", shopLink: "https://lazada.co.id/kol-kubis-murah" },
    { name: "Kentang", unit: "kg", price: 15000, color: "#27ae60", shopLink: "https://shopee.co.id/kentang-kiloan-sayur" },
    { name: "Wortel", unit: "kg", price: 14200, color: "#27ae60", shopLink: "https://tokopedia.com/wortel-sayur-murah" },
    { name: "Buncis", unit: "kg", price: 12150, color: "#27ae60", shopLink: "https://lazada.co.id/buncis-segar-1kg" },
    { name: "Sawi Hijau", unit: "ikat", price: 4000, color: "#27ae60", shopLink: "https://shopee.co.id/sawi-hijau-pasar-lokal" },
    { name: "Kangkung", unit: "ikat", price: 4000, color: "#27ae60", shopLink: "https://tokopedia.com/kangkung-ikat-segar" },
    { name: "Daun Bawang", unit: "ikat", price: 6000, color: "#27ae60", shopLink: "https://lazada.co.id/daun-bawang-fresh" },
    { name: "Santan Instan", unit: "65 ml", price: 3500, color: "#9b59b6", shopLink: "https://shopee.co.id/santan-instan-kecil" },
    { name: "Bayam Segar", unit: "ikat", price: 5000, color: "#27ae60", shopLink: "https://tokopedia.com/bayam-segar-murah" },

    // KACANG-KACANGAN (4 Item)
    { name: "Kacang Kedelai Impor", unit: "kg", price: 12550, color: "#9b59b6", shopLink: "https://shopee.co.id/kacang-kedelai-impor-murah" },
    { name: "Kacang Hijau", unit: "kg", price: 23350, color: "#9b59b6", shopLink: "https://tokopedia.com/kacang-hijau-1kg" },
    { name: "Kacang Tanah", unit: "kg", price: 29250, color: "#9b59b6", shopLink: "https://lazada.co.id/kacang-tanah-grosir" },
    { name: "Kacang Panjang", unit: "kg", price: 16000, color: "#27ae60", shopLink: "https://shopee.co.id/kacang-panjang-segar-murah" },
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

/** Merender daftar Resep Rekomendasi Minimum-Waste */
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
    let displayedRecipes = filteredRecipes.filter(recipe => {
        const matchesTag = currentFilter === 'all' || recipe.tags.includes(currentFilter);
        // Jika filter spesifik, harus sesuai tag
        return matchesTag; 
    });

    // 5. Urutkan: PRIORITASKAN resep yang menggunakan stok mendesak (urgentItems)
    if (urgentNames.length > 0) {
        displayedRecipes.sort((a, b) => {
             const aUrgentScore = a.ingredients.filter(ing => urgentNames.includes(ing)).length;
             const bUrgentScore = b.ingredients.filter(ing => urgentNames.includes(ing)).length;
             // Urutkan dari skor mendesak tertinggi
             return bUrgentScore - aUrgentScore; 
        });
    }

    // 6. Batasi hingga 15 resep
    displayedRecipes = displayedRecipes.slice(0, 15);

    // 7. Rendering Hasil
    const gridContainer = document.createElement('div');
    gridContainer.className = 'recipe-output-grid';

    if (displayedRecipes.length > 0) {
        displayedRecipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            
            const savedIngredients = recipe.ingredients.filter(ing => urgentNames.includes(ing));
            const savedCount = savedIngredients.length;
            
            let urgentText;
            if (savedCount > 0) {
                urgentText = `⭐ **${savedCount} Bahan Mendesak** akan terselamatkan: ${savedIngredients.join(', ')}`;
            } else {
                urgentText = `<em>Bahan Tersedia: Stok Aman</em>`;
            }

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
        const filterName = currentFilter === 'all' ? 'Semua Kategori' : `Kategori **${currentFilter.toUpperCase()}**`;
        outputContainer.innerHTML = `<div class="recipe-card span-full"><p>Tidak ada resep yang semua bahannya tersedia di Pantry Anda pada ${filterName}. Tambahkan stok bahan untuk mendapatkan rekomendasi!</p></div>`;
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

/** Merender daftar harga bahan makanan */
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
                    <th class="text-right">Harga Rata-rata</th>
                    <th class="text-center">Toko Online Termurah</th>
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
                <td class="text-right"><strong>${formattedPrice}</strong></td>
                <td class="text-center">
                    <a href="${item.shopLink}" target="_blank" class="shop-link">Cek Harga 🛒</a>
                </td>
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

/** Menampilkan form nama atau pesan motivasi */
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


// Event listener untuk pengiriman form input nama
document.getElementById('name-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const nameInput = document.getElementById('user-name-input').value.trim();
    if (nameInput) {
        userName = nameInput;
        localStorage.setItem('pantryflowUserName', userName);
        displayWelcomeMessage(userName);
    }
});

// Event listener untuk pengiriman form input item
document.getElementById('add-item-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('item-name').value;
    const date = document.getElementById('exp-date').value;
    const qty = parseInt(document.getElementById('quantity').value);
    const category = document.getElementById('item-category').value; 
    const estimatedPrice = Math.floor(Math.random() * 50000) + 5000; 

    if (name && date && qty > 0 && category) {
        pantryItems.push({ 
            name: name, 
            expDate: date, 
            qty: qty,
            estimatedPrice: estimatedPrice,
            category: category
        });
        renderPantry();
        this.reset();
    } else {
        alert("Mohon isi semua data dengan benar.");
    }
});

// Event listener untuk filter resep
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
    renderPriceList();              
});
