// 1. Sambungan ke data Pertemuan 3
const localProductList = ProductDataset;

// 2. Helper Arrow Functions (BARU)
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
};

// Total nilai stok
const getStockValue = (products) => {
    let total = 0;
    for (const product of products) {
        total += product.price * product.stock;
    }
    return total;
};

// Filter kategori untuk tabel ("Semua" menampilkan semua produk)
const filterByCategory = (products, category) => {
    return category === "Semua" ? products : products.filter((product) => product.category === category);
};

// Menampilkan feedback visual di halaman (tanpa alert)
const showFeedback = (element, message, type) => {
    element.textContent = message;
    element.className = `feedback-msg ${type}`;
};

// Membaca dan membersihkan isi form menjadi satu objek
const getFormValues = () => {
    return {
        name: document.getElementById('product-name').value.trim(),
        category: document.getElementById('product-category').value,
        price: parseFloat(document.getElementById('product-price').value),
        stock: parseInt(document.getElementById('product-stock').value, 10)
    };
};

// Validasi sederhana client-side, mengembalikan pesan error atau null jika valid
const validateProduct = (data) => {
    if (!data.name) return "Nama produk wajib diisi!";
    if (data.category === "") return "Silakan pilih kategori produk!";
    if (isNaN(data.price) || data.price <= 0) return "Harga harus berupa angka lebih dari 0!";
    if (isNaN(data.stock) || data.stock < 0) return "Stok harus berupa angka 0 atau lebih!";
    return null;
};

// Live preview data yang sedang diketik
const renderPreview = (container) => {
    const data = getFormValues();
    const hasPrice = !isNaN(data.price) && data.price > 0;
    const hasStock = !isNaN(data.stock) && data.stock >= 0;

    if (!data.name && data.category === "" && !hasPrice && !hasStock) {
        container.textContent = "Belum ada data. Mulai isi form di samping.";
        container.className = "preview-box empty";
        return;
    }

    const lines = [
        `Name: ${data.name || "-"}`,
        `Categori: ${data.category || "-"}`,
        `Price: ${hasPrice ? formatRupiah(data.price) : "-"}`,
        `Stok: ${hasStock ? data.stock : "-"}`,
        `Nilai stok: ${hasPrice && hasStock ? formatRupiah(data.price * data.stock) : "-"}`
    ];

    container.textContent = "";
    for (const line of lines) {
        const p = document.createElement('p');
        p.textContent = line;
        container.appendChild(p);
    }
    container.className = "preview-box";
};

// Menampilkan daftar produk ke tabel (mengikuti filter yang dipilih)
const renderTable = (tbody, summary, category) => {
    const products = filterByCategory(localProductList, category);
    tbody.textContent = "";

    for (const product of products) {
        const row = document.createElement('tr');
        const cells = [product.id, product.name, product.category, formatRupiah(product.price), product.stock];
        for (const value of cells) {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        }
        tbody.appendChild(row);
    }

    summary.textContent = `Menampilkan ${products.length} produk | Total nilai stok: ${formatRupiah(getStockValue(products))}`;
};

// 3. Inisialisasi Event Listener setelah halaman siap (BARU)
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('product-form');
    const feedback = document.getElementById('form-feedback');
    const preview = document.getElementById('live-preview');
    const tbody = document.getElementById('product-table-body');
    const summary = document.getElementById('stock-summary');
    const filterSelect = document.getElementById('filter-category');
    const clearButton = document.getElementById('btn-clear');

    renderPreview(preview);
    renderTable(tbody, summary, filterSelect.value);

    // Event 'input': live preview saat mengetik
    form.addEventListener('input', () => {
        renderPreview(preview);
    });

    // Event 'change': live preview saat dropdown kategori berubah
    form.addEventListener('change', () => {
        renderPreview(preview);
    });

    // Event 'click': tombol kosongkan form
    clearButton.addEventListener('click', () => {
        form.reset();
        renderPreview(preview);
        showFeedback(feedback, "", "");
    });

    // Event 'change': filter daftar produk berdasarkan kategori
    filterSelect.addEventListener('change', () => {
        renderTable(tbody, summary, filterSelect.value);
    });

    // Event 'submit': tangkap form dan cegah reload halaman
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = getFormValues();
        const errorMessage = validateProduct(data);

        if (errorMessage) {
            showFeedback(feedback, errorMessage, "error");
            return;
        }

        // Konstruksi objek baru selaras dengan struktur data Pertemuan 3
        const newProduct = {
            id: localProductList.length + 1,
            name: data.name,
            category: data.category,
            price: data.price,
            stock: data.stock
        };

        localProductList.push(newProduct);
        console.log("Data produk berhasil ditambahkan:", newProduct);

        showFeedback(feedback, `Sukses! Produk '${newProduct.name}' (${formatRupiah(newProduct.price)}, stok ${newProduct.stock}) tersimpan.`, "success");

        form.reset();
        renderPreview(preview);
        renderTable(tbody, summary, filterSelect.value);
    });
});