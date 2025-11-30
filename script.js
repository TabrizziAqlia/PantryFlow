// Data lokal untuk menyimpan daftar item pantry
let pantryItems = JSON.parse(localStorage.getItem('pantryItems')) || [];

// Data dummy resep (Disimpan di sini agar tidak hilang saat refresh)
const RECIPES_DATA = [
    { name: "Sayur Sop Ayam", required: ["ayam", "wortel", "kentang", "buncis"], type: "Daging & Sayur" },
    { name: "Nasi Goreng Sederhana", required: ["nasi", "telur", "bawang merah", "kecap"], type: "Nasi & Mie" },
    { name: "Tumis Kangkung Bawang Putih", required: ["kangkung", "bawang putih", "cabai"], type: "Sayuran" },
    { name: "Sandwich Keju Panggang", required: ["roti", "keju", "mentega"], type: "Roti & Cemilan" }
];
let activeFilter = 'all';


// ---------------------------------------------------
// UTILITY FUNCTIONS
// ---------------------------------------------------

/**
 * Menghitung sisa hari kedaluwarsa.
 * @param {string} dateString - Tanggal kedaluwarsa dalam format YYYY-MM-DD.
 * @returns {number} Sisa hari. (Negatif jika sudah kedaluwarsa)
 */
function calculateDaysRemaining(dateString) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const expiryDate = new Date(dateString);
    expiryDate.setHours(0, 0, 0, 0); 

    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

/**
 * Menentukan kelas CSS (warna) berdasarkan sisa hari.
 * @param {number} daysLeft - Sisa hari.
 * @returns {string} Nama kelas CSS.
 */
function getStatusClass(daysLeft) {
    if (daysLeft <= 0) {
        return 'status-merah';     // Kedaluwarsa
    } else if (daysLeft <= 7) {
        return 'status-kuning';    // Segera habis/warning (1 minggu)
    } else {
        return 'status-hijau';     // Aman
    }
}

// ---------------------------------------------------
// MANAJEMEN DATA & PENYIMPANAN
// ---------------------------------------------------

/**
 * Menyimpan array pantryItems ke Local Storage.
 */
function savePantry() {
    localStorage.setItem('pantryItems', JSON.stringify(pantryItems));
}

// ---------------------------------------------------
// FUNGSI UTAMA PANTRY
// ---------------------------------------------------

/**
 * Menambahkan item baru dari form.
 */
function addItem(event) {
    event.preventDefault();  
    
    const name = document.getElementById('item-name').value.toLowerCase().trim();
    const expDate = document.getElementById('exp-date').value;
    const qty = parseInt(document.getElementById('item-qty').value, 10);
    const unit = document.getElementById('item-unit').value;

    if (!name || !expDate || isNaN(qty) || qty <= 0) {
        alert('Mohon lengkapi semua data dengan benar.');
        return;
    }
    
    const newItem = {
        id: Date.now(), 
        name: name,
        expDate: expDate,
        qty: qty,
        unit: unit
    };
    
    pantryItems.push(newItem);
    savePantry();
    renderPantry();
    document.getElementById('add-item-form').reset();
}

/**
 * Menghapus item dari daftar pantry.
 * @param {number} id - ID unik item.
 */
function deleteItem(id) {
    pantryItems = pantryItems.filter(item => item.id !== id);
    savePantry();
    renderPantry();
}

/**
 * Mengupdate metrik Dampak (Total Item & Item Kedaluwarsa).
 */
function updateImpactMetrics() {
    const totalItems = pantryItems.reduce((sum, item) => sum + item.qty, 0);
    const expiredCount = pantryItems.filter(item => calculateDaysRemaining(item.expDate) <= 0).length;
    const totalJenisItem = pantryItems.length;

    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('expired-count').textContent = expiredCount;
    document.getElementById('total-unique-items').textContent = totalJenisItem;
}


// ---------------------------------------------------
// FUNGSI RENDERING & DISPLAY (TERMASUK FIX)
// ---------------------------------------------------

/**
 * Merender daftar item pantry ke UI.
 */
function renderPantry() {
    const sortBy = document.getElementById('sort-by').value;

    // FIX 1: Logika Sorting yang Benar
    if (sortBy === 'exp-asc') {
        // Mengurutkan berdasarkan tanggal kedaluwarsa (dari yang paling dekat ke yang paling jauh)
        pantryItems.sort((a, b) => new Date(a.expDate) - new Date(b.expDate));
    } else if (sortBy === 'name-asc') {
        // Mengurutkan berdasarkan nama (A-Z)
        pantryItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    const listContainer = document.getElementById('item-list');
    listContainer.innerHTML = '';
    
    // Penanganan Empty State
    if (pantryItems.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-message">
                <h3>Pantry Digital Anda Kosong 🗑️</h3>
                <p>Ayo input data stok baru Anda di atas untuk mulai membuat resep minimum-waste!</p>
            </div>
        `;
        renderRecipes(); 
        updateImpactMetrics();
        return; 
    }

    pantryItems.forEach((item) => {
        const daysLeft = calculateDaysRemaining(item.expDate);
        const statusClass = getStatusClass(daysLeft);
        const daysText = daysLeft <= 0 ? 'KEDALUWARSA!' : `Sisa Hari: ${daysLeft}`;

        // FIX 2: Pemformatan Tanggal yang Rapi (DD/MM/YYYY)
        const formattedDate = new Date(item.expDate).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const itemCard = document.createElement('div');
        // Kelas status-merah/kuning/hijau yang memberikan border-color (FIX CSS sebelumnya)
        itemCard.className = `item-card ${statusClass}`;
        itemCard.setAttribute('data-id', item.id);
        
        itemCard.innerHTML = `
            <strong>${item.name} (${item.qty} ${item.unit})</strong><br>
            <small>ED: ${formattedDate}</small><br> 
            <span class="days-left">${daysText}</span>
            <button class="action-button" style="background-color: #e74c3c; margin-top: 10px;" onclick="deleteItem(${item.id})">Hapus</button>
        `;
        listContainer.appendChild(itemCard);
    });
    
    // Panggil fungsi lain setelah pantry dirender
    renderRecipes(); 
    updateImpactMetrics();
}


// ---------------------------------------------------
// FUNGSI RESEP MINIMUM-WASTE
// ---------------------------------------------------

/**
 * Mengubah array pantry menjadi daftar bahan yang tersedia.
 * @returns {string[]} Daftar nama bahan unik yang ada di pantry.
 */
function getAvailableIngredients() {
    const ingredients = pantryItems.map(item => item.name);
    return [...new Set(ingredients)]; // Mengembalikan daftar unik
}

/**
 * Memfilter resep berdasarkan bahan yang tersedia dan filter kategori aktif.
 */
function renderRecipes() {
    const availableIngredients = getAvailableIngredients();
    const recipeContainer = document.getElementById('recipe-output');
    recipeContainer.innerHTML = '';
    let foundRecipes = false;

    // Filter resep berdasarkan kategori aktif
    const filteredRecipes = RECIPES_DATA.filter(recipe => {
        if (activeFilter === 'all') return true;
        return recipe.type === activeFilter;
    });

    filteredRecipes.forEach(recipe => {
        // Cek bahan yang ada (available) dan bahan yang kurang (missing)
        const availableCount = recipe.required.filter(ing => availableIngredients.includes(ing)).length;
        const missingIngredients = recipe.required.filter(ing => !availableIngredients.includes(ing));

        // Jika semua bahan tersedia
        if (availableCount === recipe.required.length) {
            foundRecipes = true;
            const card = document.createElement('div');
            card.className = 'recipe-card';
            card.innerHTML = `
                <h3>${recipe.name}</h3>
                <p><strong>Bahan Tersedia:</strong> ${recipe.required.join(', ')}</p>
                <button class="action-button" style="background-color: var(--color-primary);">Lihat Resep (Semua Bahan Ada!)</button>
            `;
            recipeContainer.appendChild(card);
        } 
        // Jika hanya beberapa bahan yang kurang
        else if (availableCount > 0) {
            foundRecipes = true;
            const card = document.createElement('div');
            card.className = 'recipe-card';
            card.innerHTML = `
                <h3>${recipe.name}</h3>
                <p><strong>Bahan Ada (${availableCount}/${recipe.required.length}):</strong> ${recipe.required.filter(ing => availableIngredients.includes(ing)).join(', ')}</p>
                <p style="color: #e74c3c;"><strong>Bahan Kurang:</strong> ${missingIngredients.join(', ')}</p>
                <button class="action-button" style="background-color: #3498db;">Lihat Resep (Beli yang Kurang)</button>
            `;
            recipeContainer.appendChild(card);
        }
    });

    // Penanganan Empty State Resep
    if (!foundRecipes) {
        recipeContainer.innerHTML = `
            <div class="empty-message-recipe">
                <h3>Tidak Ada Ide Resep Saat Ini 🧐</h3>
                <p>Coba tambahkan lebih banyak bahan ke Pantry Digital Anda atau ubah filter resep.</p>
            </div>
        `;
    }
}

/**
 * Mengganti filter kategori resep yang aktif.
 * @param {string} filter - Kategori yang difilter.
 * @param {HTMLElement} element - Tombol yang diklik.
 */
function filterRecipes(filter, element) {
    activeFilter = filter;
    
    // Logika untuk menandai tombol aktif
    document.querySelectorAll('.filter-button').forEach(btn => {
        btn.classList.remove('active');
    });
    element.classList.add('active');

    renderRecipes();
}

// ---------------------------------------------------
// EVENT LISTENERS & INISIALISASI
// ---------------------------------------------------

// Saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Menghubungkan form submit dengan fungsi addItem
    document.getElementById('add-item-form').addEventListener('submit', addItem);
    
    // Menghubungkan dropdown sortir dengan fungsi renderPantry
    document.getElementById('sort-by').addEventListener('change', renderPantry);

    // Render data saat halaman dimuat
    renderPantry();
});
