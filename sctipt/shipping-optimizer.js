// Sample shipping providers data
const shippingProviders = [
    { 
        name: "Delhivery", 
        rates: [
            { type: "standard", base: 35, perKg: 25, volumetricDivisor: 5000 },
            { type: "express", base: 70, perKg: 40, volumetricDivisor: 5000 },
            { type: "nextday", base: 120, perKg: 60, volumetricDivisor: 5000 }
        ]
    },
    { 
        name: "Blue Dart", 
        rates: [
            { type: "standard", base: 50, perKg: 30, volumetricDivisor: 4000 },
            { type: "express", base: 90, perKg: 50, volumetricDivisor: 4000 },
            { type: "nextday", base: 150, perKg: 70, volumetricDivisor: 4000 }
        ]
    },
    { 
        name: "Ecom Express", 
        rates: [
            { type: "standard", base: 30, perKg: 20, volumetricDivisor: 6000 },
            { type: "express", base: 60, perKg: 35, volumetricDivisor: 6000 },
            { type: "nextday", base: 100, perKg: 50, volumetricDivisor: 6000 }
        ]
    }
];

document.getElementById('calculateShippingBtn').addEventListener('click', calculateShipping);

function calculateShipping() {
    // Get input values
    const weight = parseFloat(document.getElementById('packageWeight').value) || 0.5;
    const length = parseFloat(document.getElementById('packageLength').value) || 20;
    const width = parseFloat(document.getElementById('packageWidth').value) || 15;
    const height = parseFloat(document.getElementById('packageHeight').value) || 10;
    const deliverySpeed = document.getElementById('deliverySpeed').value;
    
    // Calculate volumetric weight
    const volumetricWeight = (length * width * height) / 5000; // Standard divisor for India
    
    // Chargeable weight is the greater of actual or volumetric
    const chargeableWeight = Math.max(weight, volumetricWeight);
    
    // Calculate rates for each provider
    const results = shippingProviders.map(provider => {
        const rate = provider.rates.find(r => r.type === deliverySpeed) || provider.rates[0];
        const shippingCost = rate.base + (Math.max(1, Math.ceil(chargeableWeight)) - 1) * rate.perKg;
        
        return {
            provider: provider.name,
            deliveryDays: getDeliveryDays(deliverySpeed),
            cost: shippingCost,
            chargeableWeight: chargeableWeight.toFixed(2)
        };
    });
    
    // Sort by lowest cost
    results.sort((a, b) => a.cost - b.cost);
    
    // Display results
    const resultsContainer = document.getElementById('shippingOptions');
    resultsContainer.innerHTML = '';
    
    results.forEach(result => {
        const option = document.createElement('div');
        option.className = 'shipping-option';
        option.innerHTML = `
            <h4>${result.provider}</h4>
            <div class="option-details">
                <span>Estimated Delivery: ${result.deliveryDays}</span>
                <span>Chargeable Weight: ${result.chargeableWeight} kg</span>
                <span class="shipping-cost">₹${result.cost.toFixed(2)}</span>
            </div>
        `;
        resultsContainer.appendChild(option);
    });
    
    document.getElementById('results').style.display = 'block';
}

function getDeliveryDays(type) {
    switch(type) {
        case 'express': return '2-3 days';
        case 'nextday': return '1 day';
        default: return '4-7 days';
    }
}