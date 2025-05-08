document.getElementById('calculateBtn').addEventListener('click', calculateGST);
document.getElementById('gstRate').addEventListener('change', updateGSTRates);

function updateGSTRates() {
    const gstRate = parseFloat(document.getElementById('gstRate').value);
    const cgstInput = document.getElementById('cgstRate');
    const sgstInput = document.getElementById('sgstRate');
    const igstInput = document.getElementById('igstRate');
    
    if (gstRate === 0) {
        cgstInput.value = 0;
        sgstInput.value = 0;
        igstInput.value = 0;
    } else {
        // For intra-state (CGST + SGST)
        if (igstInput.value === "0") {
            cgstInput.value = gstRate / 2;
            sgstInput.value = gstRate / 2;
        }
    }
}

function calculateGST() {
    // Get input values
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const gstRate = parseFloat(document.getElementById('gstRate').value) || 0;
    const calculationType = document.getElementById('calculationType').value;
    const cgstRate = parseFloat(document.getElementById('cgstRate').value) || 0;
    const sgstRate = parseFloat(document.getElementById('sgstRate').value) || 0;
    const igstRate = parseFloat(document.getElementById('igstRate').value) || 0;
    
    let originalAmount, gstAmount, totalAmount;
    let cgstAmount = 0, sgstAmount = 0, igstAmount = 0;
    
    if (calculationType === 'exclusive') {
        originalAmount = amount;
        gstAmount = amount * gstRate / 100;
        totalAmount = amount + gstAmount;
        
        if (igstRate > 0) {
            igstAmount = gstAmount;
        } else {
            cgstAmount = amount * cgstRate / 100;
            sgstAmount = amount * sgstRate / 100;
        }
    } else {
        totalAmount = amount;
        originalAmount = amount / (1 + gstRate / 100);
        gstAmount = totalAmount - originalAmount;
        
        if (igstRate > 0) {
            igstAmount = gstAmount;
        } else {
            cgstAmount = originalAmount * cgstRate / 100;
            sgstAmount = originalAmount * sgstRate / 100;
        }
    }
    
    // Display results
    document.getElementById('originalAmount').textContent = `₹${originalAmount.toFixed(2)}`;
    document.getElementById('gstAmount').textContent = `₹${gstAmount.toFixed(2)}`;
    document.getElementById('cgstAmount').textContent = `₹${cgstAmount.toFixed(2)}`;
    document.getElementById('sgstAmount').textContent = `₹${sgstAmount.toFixed(2)}`;
    document.getElementById('igstAmount').textContent = `₹${igstAmount.toFixed(2)}`;
    document.getElementById('totalAmount').textContent = `₹${totalAmount.toFixed(2)}`;
    
    document.getElementById('results').style.display = 'block';
}

// Initialize
updateGSTRates();