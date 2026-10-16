// 1. Dataset Produk UMKM
const ProductDataset = [
    {
        id: 1,
        name: "Laptop Thinkpad",
        category: "Elektronik",
        price: 12500000,
        stock: 20
    },
    {
        id: 2,
        name: "Mouse Wireless",
        category: "Elektronik",
        price: 250000,
        stock: 5
    },
    {
        id: 3,
        name: "Earbuds Bluetooth",
        category: "Audio",
        price: 300000,
        stock: 30
    },
    {
        id: 4,
        name: "Keyboard",
        category: "Aksesoris",
        price: 600000,
        stock: 25
    },
    {
        id: 5,
        name: "Flashdisk",
        category: "Penyimpanan",
        price: 95000,
        stock: 8
    },
    {
        id: 6,
        name: "RAM",
        category: "Komponen",
        price: 150000,
        stock: 15
    },
    {
        id: 7,
        name: "Casing vivo15",
        category: "Aksesoris",
        price: 10000,
        stock: 12
    },
    {
        id: 8,
        name: "Gantungan Hp",
        category: "Aksesoris",
        price: 15000,
        stock: 40
    }
];

console.log(ProductDataset);

// 2. Fungsi Filter Produk
function filterProducts(products, filterCategory, minPrice, maxPrice) {
    console.log(`=== Menjalankan Filter Kategori: ${filterCategory} | Harga: Rp${minPrice} - Rp${maxPrice} ===`);
 
    let totalPrice = 0;
    let matchCount = 0;
 
    for (const product of products) {
        // Evaluasi kategori (Strict Equality ===) dan rentang harga
        const isCategoryMatch = product.category === filterCategory;
        const isPriceMatch = product.price >= minPrice && product.price <= maxPrice;
 
        if (isCategoryMatch && isPriceMatch) {
            matchCount++;
            totalPrice += product.price;
 
            // Evaluasi kategori harga menggunakan Ternary
            const priceLabel = product.price >= 20000 ? "Harga Tinggi" : "Harga Terjangkau";
            console.log(`[ID: ${product.id}] ${product.name} - Harga: Rp${product.price} - Stok: ${product.stock} (${priceLabel})`);
            console.log('TotalPrice', totalPrice);
        }
    }
 
    const averagePrice = matchCount > 0 ? (totalPrice / matchCount).toFixed(2) : 0;
    return {
        category: filterCategory,
        minPrice: minPrice,
        maxPrice: maxPrice,
        totalProducts: matchCount,
        averagePrice: parseFloat(averagePrice)
    };
}
 
// 2b. Fungsi Menghitung Total Nilai Stok
function calculateTotalStockValue(products) {
    console.log("=== Menghitung Total Nilai Stok ===");
 
    let totalStockValue = 0;
 
    for (const product of products) {
        const stockValue = product.price * product.stock;
        totalStockValue += stockValue;
        console.log(`${product.name}: Rp${product.price} x ${product.stock} = Rp${stockValue}`);
    }
 
    return totalStockValue;
}
 
// 3. Eksekusi Fungsi
const result = filterProducts(ProductDataset, "Aksesoris", 10000, 15000);
console.log("Hasil Rekapitulasi:", result);
console.log(`Rata-rata Harga: Rp${result.averagePrice}`);
 
const totalStockValue = calculateTotalStockValue(ProductDataset);
console.log(`Total nilai stok: Rp${totalStockValue}`);