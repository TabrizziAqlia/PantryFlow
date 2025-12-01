// ===================================================
//  GLOBAL DATA & CONFIGURATION
// ===================================================

let pantryItems = [
    // Data stok awal untuk demo
    { name: "Bayam Segar", expDate: "2025-12-03", qty: 1, category: "Sayur Segar Kulkas" },    
    { name: "Telur Ayam Ras", expDate: "2025-12-08", qty: 10, category: "Susu/Telur Kulkas" }, 
    { name: "Susu Kental Manis", expDate: "2025-12-05", qty: 2, category: "Susu/Telur Kulkas" }, 
    { name: "Keju Cheddar", expDate: "2025-12-18", qty: 1, category: "Bahan Kering" },   
    { name: "Beras Medium", expDate: "2026-06-15", qty: 1, category: "Bahan Kering" },
    { name: "Wortel", expDate: "2025-12-07", qty: 2, category: "Sayur Segar Kulkas" },
    { name: "Tempe", expDate: "2025-12-04", qty: 1, category: "Sayur Segar Kulkas" },
];

let itemsSaved = 0; 
const ITEM_PRICE_AVG = 10000; // Harga rata-rata per item yang diselamatkan
let currentFilter = 'all'; 
let userName = localStorage.getItem('pantryflowUserName');


// --- DATABASE RESEP (TOTAL 15 Resep) ---
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
    // --- 8 Resep Baru Tambahan ---
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

// --- DATABASE VIDEO RESEP ANAK KOST (TOTAL 10 Video) ---
const videoDatabase = [
    { 
        title: "5 Resep Olahan Telur Simple", 
        link: "https://youtu.be/Ef2JX3gbShM?si=LDnOM0nSqHoRMNSH", 
        source: "YouTube",
        embed: true, // Untuk YouTube, gunakan iframe embed
        desc: "Resep olahan telur cepat, cocok untuk menghemat stok telur mendekati kedaluwarsa."
    },
    { 
        title: "Masak Mie Instan Ala Carbonara", 
        link: "https://youtube.com/shorts/T9LnzWOWyVg?si=cinOIqRM1AmVocVu", 
        source: "YouTube",
        embed: true,
        desc: "Upgrade menu mie instan Anda! Cepat saji dan murah meriah."
    },
    { 
        title: "Tumis Sayur Cuma 10 Ribu", 
        link: "https://youtu.be/WlwRGi_0Y1E?si=Tj_OusUATbsDzt4Q", 
        source: "YouTube",
        embed: true,
        desc: "Cara mengolah sayur segar sebelum layu, modal sangat minim."
    },
    { 
        title: "Nasi Liwet Rice Cooker 1 Porsi", 
        link: "https://youtu.be/a70F8et7UIY?si=g-M9ski0iqm-Caqw", 
        source: "YouTube",
        embed: true,
        desc: "Memasak nasi liwet porsi anak kos dengan rice cooker."
    },
    { 
        title: "Resep Ayam Goreng Bumbu Instan", 
        link: "https://youtu.be/2mCOAp1Azps?si=Gnn1IOIPFKyCNOzb", 
        source: "YouTube",
        embed: true,
        desc: "Penyelamat daging ayam di kulkas dengan bumbu instan."
    },
    { 
        title: "Roti Tawar Siram Keju Praktis", 
        link: "https://youtube.com/shorts/19oqPA1cHPg?si=usg0YbVqzJPTMFfn", 
        source: "YouTube",
        embed: false, // Untuk TikTok/link eksternal, tidak menggunakan iframe
        desc: "Snack/sarapan cepat dari roti tawar dan keju sisa."
    },
    { 
        title: "Mie Kuah Cabai Merah Viral", 
        link: "https://youtube.com/shorts/FeuXFf0lCgc?si=rG_aCR3EHtvv21NP", 
        source: "YouTube",
        embed: false,
        desc: "Menu pedas cepat dari mie dan cabai rawit/keriting."
    },
    { 
        title: "Bikin Sambal Bawang Awet Seminggu", 
        link: "https://youtu.be/6vv6enFEVc4?si=faXvpq3fu2lRGOd9", 
        source: "YouTube",
        embed: false,
        desc: "Mengolah bawang dan cabai yang banyak agar tidak busuk."
    },
    { 
        title: "Telur Dadar Sayur Super Tebal", 
        link: "https://youtube.com/shorts/KQ7qFFPTlY8?si=QfCGQjU3aXv7NkGt", 
        source: "YouTube",
        embed: false,
        desc: "Telur dadar tebal, kenyang untuk menu sarapan atau makan malam."
    },
    { 
        title: "Nasi Orak-Arik Sayur Pedas", 
        link: "https://youtube.com/shorts/zmlh6wkoOP4?si=u1Nifpi-t3qe_eIP", 
        source: "YouTube",
        embed: false,
        desc: "Nasi sisa dicampur sayur dan telur agar tidak terbuang."
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
    { name: "Daging Ayam Ras", unit: "kg", price: 36000, color: "#e74c3c", shopLink: "https://id.shp.ee/nasyJGu" },
    { name: "Telur Ayam Ras", unit: "kg", price: 28000, color: "f39c12", shopLink: "https://id.shp.ee/Qoqyv1n" },
    { name: "Ikan Bandeng", unit: "kg", price: 34000, color: "#3498db", shopLink: "https://id.shp.ee/bvdtiWZ" },
    { name: "Ikan Lele", unit: "kg", price: 26000, color: "#3498db", shopLink: "https://id.shp.ee/LwJqHSk" },
    { name: "Ikan Tongkol Segar", unit: "kg", price: 36000, color: "#3498db", shopLink: "https://id.shp.ee/e4Hj7cz" },
    { name: "Ikan Asin Teri", unit: "kg", price: 77000, color: "#3498db", shopLink: "https://id.shp.ee/m4DuSF8" },
    { name: "Susu Kental Manis", unit: "370 gr/kl", price: 12500, color: "#9b59b6", shopLink: "https://id.shp.ee/q3daB8h" },
    { name: "Daging Sapi (Paha)", unit: "kg", price: 119000, color: "#e74c3c", shopLink: "https://id.shp.ee/pMcpNax" },
    { name: "Tahu Putih", unit: "10 pcs", price: 7500, color: "#27ae60", shopLink: "https://id.shp.ee/CyMoNnZ" },
    { name: "Tempe", unit: "Papan besar", price: 6000, color: "#27ae60", shopLink: "https://id.shp.ee/KACpbie" },
    { name: "Sosis Ayam", unit: "500 gr", price: 18000, color: "#f39c12", shopLink: "https://id.shp.ee/pFiyhV5" },
    { name: "Kornet Sapi Kaleng", unit: "198 gr", price: 23000, color: "#27ae60", shopLink: "https://id.shp.ee/1jbw24H" },
    { name: "Susu UHT Kotak", unit: "1L", price: 18000, color: "#9b59b6", shopLink: "https://id.shp.ee/AsA2Fhx" },
    { name: "Keju Cheddar", unit: "200 gr", price: 22000, color: "#f39c12", shopLink: "https://id.shp.ee/NjH75hk" },


    // KARBOHIDRAT & POKOK (9 Item)
    { name: "Beras Medium", unit: "kg", price: 12850, color: "#27ae60", shopLink: "https://id.shp.ee/EwNdJZb" },
    { name: "Tepung Terigu", unit: "kg", price: 11500, color: "#27ae60", shopLink: "https://id.shp.ee/jjBRAgA"  },
    { name: "Jagung Pipilan Kering", unit: "kg", price: 7650, color: "#27ae60", shopLink: "https://id.shp.ee/iHcgKtr" },
    { name: "Ketela Pohon", unit: "kg", price: 5000, color: "#27ae60", shopLink: "https://id.shp.ee/ACgnom5" },
    { name: "Indomie Kari Ayam", unit: "bungkus", price: 3600, color: "#f39c12", shopLink: "https://id.shp.ee/gofTkQs" },
    { name: "Mie Telur Kering", unit: "500 gr", price: 13000, color: "#f39c12", shopLink: "https://id.shp.ee/cMJgJN3" },
    { name: "Roti Tawar", unit: "bungkus", price: 15000, color: "#9b59b6", shopLink: "https://id.shp.ee/EgjRSyZ" },
    { name: "Gandum Utuh", unit: "kg", price: 18000, color: "#27ae60", shopLink: "https://id.shp.ee/kZvxBG5" },
    { name: "Oatmeal Instan", unit: "200 gr", price: 12000, color: "#f39c12", shopLink: "https://id.shp.ee/5CAhxi5"  },

    // MINYAK & GULA (3 Item)
    { name: "Minyak Goreng Curah", unit: "liter", price: 18700, color: "#f39c12", shopLink: "https://id.shp.ee/5CAhxi5" },
    { name: "Minyakita", unit: "liter", price: 16700, color: "#27ae60", shopLink: "https://id.shp.ee/NMoVXrs" },
    { name: "Gula Kristal Putih", unit: "kg", price: 16400, color: "#f39c12", shopLink: "https://id.shp.ee/a5W3UdT" },

    // BUMBU & REMPAH (10 Item)
    { name: "Bawang Putih", unit: "kg", price: 30200, color: "#9b59b6", shopLink: "https://id.shp.ee/cHbZ5aq" },
    { name: "Bawang Merah", unit: "kg", price: 40100, color: "#9b59b6", shopLink: "https://id.shp.ee/wXHnjqQ"  },
    { name: "Cabai Rawit Merah", unit: "kg", price: 45800, color: "#e74c3c", shopLink: "https://id.shp.ee/gkgmeyY" },
    { name: "Cabai Merah Keriting", unit: "kg", price: 48400, color: "#e74c3c", shopLink: "https://id.shp.ee/7XuFkTG"  },
    { name: "Garam Beryodium", unit: "kg", price: 9400, color: "#9b59b6", shopLink: "https://id.shp.ee/LvG9RRm" },
    { name: "Kecap Manis", unit: "600 ml", price: 23000, color: "#f39c12", shopLink: "https://id.shp.ee/vjeoGEN"  },
    { name: "Saus Sambal", unit: "340 ml", price: 10500, color: "#e74c3c", shopLink: "https://id.shp.ee/RNzTbHH"  },
    { name: "Lada Bubuk", unit: "sachet", price: 500, color: "#9b59b6", shopLink: "https://id.shp.ee/PbS5pY5" },
    { name: "Kaldu Ayam Bubuk", unit: "sachet", price: 800, color: "#9b59b6", shopLink: "https://id.shp.ee/JW7DayQ" },
    { name: "Gula Merah", unit: "kg", price: 18000, color: "#f39c12", shopLink: "https://id.shp.ee/F9kNig4" },

    // SAYURAN & PELENGKAP (10 Item)
    { name: "Tomat", unit: "kg", price: 11650, color: "#27ae60", shopLink: "https://id.shp.ee/UyrbGTK" },
    { name: "Kol/Kubis", unit: "kg", price: 7150, color: "#27ae60", shopLink: "https://id.shp.ee/XcdFWzm" },
    { name: "Kentang", unit: "kg", price: 15000, color: "#27ae60", shopLink: "https://id.shp.ee/kLXuBrf" },
    { name: "Wortel", unit: "kg", price: 14200, color: "#27ae60", shopLink: "https://id.shp.ee/WmjSCQV"  },
    { name: "Buncis", unit: "kg", price: 12150, color: "#27ae60", shopLink: "https://id.shp.ee/dzWHPyc" },
    { name: "Sawi Hijau", unit: "ikat", price: 4000, color: "#27ae60", shopLink: "https://id.shp.ee/7CxFBR2" },
    { name: "Kangkung", unit: "ikat", price: 4000, color: "#27ae60", shopLink: "https://id.shp.ee/5Tn7BoD" },
    { name: "Daun Bawang", unit: "ikat", price: 6000, color: "#27ae60", shopLink: "https://id.shp.ee/45CCuPQ"  },
    { name: "Santan Instan", unit: "65 ml", price: 3500, color: "#9b59b6", shopLink: "https://id.shp.ee/giFmc1v"  },
    { name: "Bayam Segar", unit: "ikat", price: 5000, color: "#27ae60", shopLink: "https://id.shp.ee/LRvrQG2" }, 

    // KACANG-KACANGAN (4 Item)
    { name: "Kacang Kedelai Impor", unit: "kg", price: 12550, color: "#9b59b6", shopLink: "https://id.shp.ee/BJNfeE7"  },
    { name: "Kacang Hijau", unit: "kg", price: 23350, color: "#9b59b6", shopLink: "https://id.shp.ee/BYYCvZs"  },
    { name: "Kacang Tanah", unit: "kg", price: 29250, color: "#9b59b6", shopLink: "https://id.shp.ee/QB1zqwg"  },
    { name: "Kacang Panjang", unit: "kg", price: 16000, color: "#27ae60", shopLink: "https://id.shp.ee/MiYt4YJ" },
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
        // Hanya trigger jika tombol bukan untuk link Maps atau Video
        if (!e.target.classList.contains('map-button') && !e.target.classList.contains('video-button')) {
             simulateCookingAndImpact(2); 
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
    renderVideos(); 
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

    // 4. Terapkan Filter Kategori (kost, quick, local)
    let displayedRecipes = filteredRecipes.filter(recipe => {
        const matchesTag = currentFilter === 'all' || recipe.tags.includes(currentFilter);
        return matchesTag;
    });

    // 5. Urutkan: PRIORITASKAN resep yang menggunakan stok mendesak
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
                // Menggunakan bold untuk menekankan jumlah bahan mendesak
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

/** MERENDER VIDEO REKOMENDASI */
function renderVideos() {
    const outputContainer = document.getElementById('video-output');
    outputContainer.innerHTML = '';
    
    const gridContainer = document.createElement('div');
    gridContainer.className = 'recipe-output-grid'; 

    videoDatabase.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'recipe-card video-card';
        
        let videoContent;
        const videoId = video.link.split('/').pop();
        
        if (video.embed) {
            // YouTube Embed
            videoContent = `<iframe width="100%" height="150" src="${video.link}" title="${video.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        } else {
            // Link Eksternal (TikTok)
            videoContent = `<div class="video-placeholder">
                                <span class="video-source">Platform: ${video.source}</span>
                                <p class="video-desc">Klik Tonton untuk melihat video resep</p>
                            </div>`;
        }

        const actionButtonText = video.embed ? 'Tonton di YouTube' : 'Lihat Video (Link)';
        const actionLink = video.embed ? `https://www.youtube.com/watch?v=${videoId}` : video.link;


        videoCard.innerHTML = `
            <h3>${video.title} (${video.source} 📌)</h3>
            ${videoContent}
            <p><small>${video.desc}</small></p>
            <a href="${actionLink}" target="_blank" class="action-button video-button">${actionButtonText}</a>
        `;
        gridContainer.appendChild(videoCard);
    });
    outputContainer.appendChild(gridContainer);
}


/** Merender daftar Lokasi Rekomendasi */
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

    PRICE_GUIDE.forEach(item => {
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

    if (name && date && qty > 0 && category) {
        pantryItems.push({ 
            name: name, 
            expDate: date, 
            qty: qty,
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
    renderVideos();                
});
