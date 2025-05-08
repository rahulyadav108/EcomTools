// Sample inventory data
let inventory = [
    { id: 1, name: "Wireless Earbuds", stock: 45, alertLevel: 10, costPrice: 800, sellingPrice: 1499 },
    { id: 2, name: "Smart Watch", stock: 12, alertLevel: 5, costPrice: 2500, sellingPrice: 3999 },
    { id: 3, name: "Phone Case", stock: 87, alertLevel: 20, costPrice: 150, sellingPrice: 399 }
];

const modal = document.getElementById('addProductModal');
const addProductBtn = document.getElementById('addProductBtn');
const closeModal = document.querySelector('.close-modal');
const addProductForm = document.getElementById('addProductForm');

// Initialize inventory table
function renderInventory() {
    const tbody = document.getElementById('inventoryTableBody');
    tbody.innerHTML = '';
    
    inventory.forEach(item => {
        const row = document.createElement('tr');
        if (item.stock <= item.alertLevel) {
            row.classList.add('low-stock');
        }
        
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.stock}</td>
            <td>${item.alertLevel}</td>
            <td>₹${item.costPrice.toFixed(2)}</td>
            <td>₹${item.sellingPrice.toFixed(2)}</td>
            <td>
                <button class="btn-small edit-btn" data-id="${item.id}">Edit</button>
                <button class="btn-small delete-btn" data-id="${item.id}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Add event listeners to buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => editProduct(parseInt(e.target.dataset.id)));
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => deleteProduct(parseInt(e.target.dataset.id)));
    });
}

// Modal controls
addProductBtn.addEventListener('click', () => modal.style.display = 'block');
closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// Add new product
addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newProduct = {
        id: inventory.length > 0 ? Math.max(...inventory.map(item => item.id)) + 1 : 1,
        name: document.getElementById('productName').value,
        stock: parseInt(document.getElementById('initialStock').value),
        alertLevel: parseInt(document.getElementById('alertLevel').value),
        costPrice: parseFloat(document.getElementById('costPrice').value),
        sellingPrice: parseFloat(document.getElementById('sellingPrice').value)
    };
    
    inventory.push(newProduct);
    renderInventory();
    addProductForm.reset();
    modal.style.display = 'none';
});

// Edit product
function editProduct(id) {
    const product = inventory.find(item => item.id === id);
    if (product) {
        document.getElementById('productName').value = product.name;
        document.getElementById('initialStock').value = product.stock;
        document.getElementById('alertLevel').value = product.alertLevel;
        document.getElementById('costPrice').value = product.costPrice;
        document.getElementById('sellingPrice').value = product.sellingPrice;
        
        // Change form to edit mode
        addProductForm.querySelector('button').textContent = 'Update Product';
        addProductForm.removeEventListener('submit', addProductForm._submitFn);
        
        addProductForm._submitFn = function(e) {
            e.preventDefault();
            product.name = document.getElementById('productName').value;
            product.stock = parseInt(document.getElementById('initialStock').value);
            product.alertLevel = parseInt(document.getElementById('alertLevel').value);
            product.costPrice = parseFloat(document.getElementById('costPrice').value);
            product.sellingPrice = parseFloat(document.getElementById('sellingPrice').value);
            
            renderInventory();
            addProductForm.reset();
            modal.style.display = 'none';
            addProductForm.querySelector('button').textContent = 'Add Product';
        };
        
        addProductForm.addEventListener('submit', addProductForm._submitFn);
        modal.style.display = 'block';
    }
}

// Delete product
function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        inventory = inventory.filter(item => item.id !== id);
        renderInventory();
    }
}

// Initialize
renderInventory();