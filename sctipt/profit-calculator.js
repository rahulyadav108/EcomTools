document.getElementById('calculateBtn').addEventListener('click', calculateProfit);

function calculateProfit() {
    // Get input values
    const productCost = parseFloat(document.getElementById('productCost').value) || 0;
    const sellingPrice = parseFloat(document.getElementById('sellingPrice').value) || 0;
    const customerShipping = parseFloat(document.getElementById('customerShipping').value) || 0;
    const actualShipping = parseFloat(document.getElementById('actualShipping').value) || 0;
    const rtoProbability = parseFloat(document.getElementById('rtoProbability').value) || 0;
    const rtoShippingCost = parseFloat(document.getElementById('rtoShippingCost').value) || 0;
    const marketplaceFee = parseFloat(document.getElementById('marketplaceFee').value) || 0;
    const paymentGatewayFee = parseFloat(document.getElementById('paymentGatewayFee').value) || 0;
    const packagingCost = parseFloat(document.getElementById('packagingCost').value) || 0;
    const otherCosts = parseFloat(document.getElementById('otherCosts').value) || 0;
    
    // Calculations
    const marketplaceCharges = sellingPrice * marketplaceFee / 100;
    const paymentCharges = sellingPrice * paymentGatewayFee / 100;
    const shippingLoss = Math.max(0, actualShipping - customerShipping);
    const rtoLoss = (rtoProbability / 100) * (productCost + rtoShippingCost);
    
    const totalCosts = productCost + shippingLoss + packagingCost + otherCosts;
    const grossRevenue = sellingPrice;
    const netProfit = (sellingPrice - totalCosts - marketplaceCharges - paymentCharges) - rtoLoss;
    const profitMargin = (netProfit / sellingPrice) * 100;
    
    // Display results
    document.getElementById('grossRevenue').textContent = `₹${grossRevenue.toFixed(2)}`;
    document.getElementById('totalCosts').textContent = `₹${totalCosts.toFixed(2)}`;
    document.getElementById('marketplaceFees').textContent = `₹${marketplaceCharges.toFixed(2)}`;
    document.getElementById('paymentFees').textContent = `₹${paymentCharges.toFixed(2)}`;
    document.getElementById('rtoLoss').textContent = `₹${rtoLoss.toFixed(2)}`;
    
    const netProfitElement = document.getElementById('netProfit');
    netProfitElement.textContent = `₹${netProfit.toFixed(2)}`;
    netProfitElement.className = netProfit >= 0 ? 'result-value profit' : 'result-value loss';
    
    const profitMarginElement = document.getElementById('profitMargin');
    profitMarginElement.textContent = `${profitMargin.toFixed(2)}%`;
    profitMarginElement.className = profitMargin >= 0 ? 'result-value profit' : 'result-value loss';
    
    document.getElementById('results').style.display = 'block';
}