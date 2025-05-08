document.getElementById('calculateBtn').addEventListener('click', calculateROI);

function calculateROI() {
    // Get input values
    const campaignCost = parseFloat(document.getElementById('campaignCost').value) || 0;
    const conversionRate = parseFloat(document.getElementById('conversionRate').value) || 0;
    const avgOrderValue = parseFloat(document.getElementById('avgOrderValue').value) || 0;
    const visitors = parseInt(document.getElementById('visitors').value) || 0;
    const productCostPercent = parseFloat(document.getElementById('productCost').value) || 0;
    const otherCostsPercent = parseFloat(document.getElementById('otherCosts').value) || 0;
    
    // Calculations
    const conversions = visitors * (conversionRate / 100);
    const totalRevenue = conversions * avgOrderValue;
    const productCost = totalRevenue * (productCostPercent / 100);
    const otherCosts = totalRevenue * (otherCostsPercent / 100);
    const totalCosts = campaignCost + productCost + otherCosts;
    const netProfit = totalRevenue - totalCosts;
    const roiPercentage = (netProfit / campaignCost) * 100;
    const roiMultiple = netProfit / campaignCost;
    
    // Display results
    document.getElementById('totalRevenue').textContent = `₹${totalRevenue.toFixed(2)}`;
    document.getElementById('totalCosts').textContent = `₹${totalCosts.toFixed(2)}`;
    
    const netProfitElement = document.getElementById('netProfit');
    netProfitElement.textContent = `₹${netProfit.toFixed(2)}`;
    netProfitElement.className = netProfit >= 0 ? 'result-value profit' : 'result-value loss';
    
    const roiPercentageElement = document.getElementById('roiPercentage');
    roiPercentageElement.textContent = `${roiPercentage.toFixed(2)}%`;
    roiPercentageElement.className = roiPercentage >= 0 ? 'result-value profit' : 'result-value loss';
    
    document.getElementById('roiMultiple').textContent = `${roiMultiple.toFixed(2)}x`;
    document.getElementById('results').style.display = 'block';
}