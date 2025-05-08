document.getElementById('calculateBtn').addEventListener('click', calculateBreakEven);

function calculateBreakEven() {
    // Get input values
    const fixedCosts = parseFloat(document.getElementById('fixedCosts').value) || 0;
    const variableCost = parseFloat(document.getElementById('variableCost').value) || 0;
    const sellingPrice = parseFloat(document.getElementById('sellingPrice').value) || 0;
    const currentSales = parseInt(document.getElementById('currentSales').value) || 0;
    const growthRate = parseFloat(document.getElementById('growthRate').value) || 0;
    const timePeriod = parseInt(document.getElementById('timePeriod').value) || 12;
    
    // Validate inputs
    if (sellingPrice <= variableCost) {
        alert("Selling price must be greater than variable cost per unit");
        return;
    }
    
    // Calculate break-even point
    const breakEvenUnits = Math.ceil(fixedCosts / (sellingPrice - variableCost));
    const breakEvenRevenue = breakEvenUnits * sellingPrice;
    
    // Calculate projected break-even month
    let breakEvenMonth = "Never";
    let projectedSales = currentSales;
    let cumulativeProfit = -fixedCosts;
    
    for (let month = 1; month <= timePeriod; month++) {
        const monthlyProfit = projectedSales * (sellingPrice - variableCost);
        cumulativeProfit += monthlyProfit;
        
        if (cumulativeProfit >= 0) {
            breakEvenMonth = `Month ${month}`;
            break;
        }
        
        projectedSales *= (1 + growthRate / 100);
    }
    
    // Calculate current profit
    const currentProfit = (currentSales * (sellingPrice - variableCost)) - fixedCosts;
    
    // Display results
    document.getElementById('breakEvenUnits').textContent = breakEvenUnits;
    document.getElementById('breakEvenRevenue').textContent = `₹${breakEvenRevenue.toFixed(2)}`;
    document.getElementById('breakEvenMonth').textContent = breakEvenMonth;
    
    const currentProfitElement = document.getElementById('currentProfit');
    currentProfitElement.textContent = `₹${currentProfit.toFixed(2)}`;
    currentProfitElement.className = currentProfit >= 0 ? 'result-value profit' : 'result-value loss';
    
    // Create chart
    createProfitChart(fixedCosts, variableCost, sellingPrice, timePeriod, currentSales, growthRate);
    
    document.getElementById('results').style.display = 'block';
}

function createProfitChart(fixedCosts, variableCost, sellingPrice, months, currentSales, growthRate) {
    const ctx = document.getElementById('profitChart').getContext('2d');
    
    // Prepare data
    const labels = [];
    const revenueData = [];
    const costData = [];
    const profitData = [];
    let sales = currentSales;
    
    for (let i = 1; i <= months; i++) {
        labels.push(`Month ${i}`);
        const revenue = sales * sellingPrice;
        const cost = fixedCosts + (sales * variableCost);
        const profit = revenue - cost;
        
        revenueData.push(revenue);
        costData.push(cost);
        profitData.push(profit);
        
        sales *= (1 + growthRate / 100);
    }
    
    // Destroy previous chart if exists
    if (window.profitChart) {
        window.profitChart.destroy();
    }
    
    // Create new chart
    window.profitChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Revenue',
                    data: revenueData,
                    borderColor: '#4361ee',
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    tension: 0.3
                },
                {
                    label: 'Total Costs',
                    data: costData,
                    borderColor: '#f72585',
                    backgroundColor: 'rgba(247, 37, 133, 0.1)',
                    tension: 0.3
                },
                {
                    label: 'Profit',
                    data: profitData,
                    borderColor: '#4cc9f0',
                    backgroundColor: 'rgba(76, 201, 240, 0.1)',
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount (₹)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Months'
                    }
                }
            }
        }
    });
}