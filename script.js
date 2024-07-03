document.getElementById('distribution').addEventListener('change', updateDistParams);
document.getElementById('generateDist').addEventListener('click', generateDistribution);
document.getElementById('runSimulation').addEventListener('click', runSimulation);

let distributionChart;
let simulationHistogram;

function updateDistParams() {
    const dist = document.getElementById('distribution').value;
    const distParams = document.getElementById('distParams');
    distParams.innerHTML = '';

    if (dist === 'normal') {
        distParams.innerHTML = `
            <label>Mean: <input type="number" id="mean" value="0"></label>
            <label>Standard Deviation: <input type="number" id="stdDev" value="1"></label>
        `;
    } else if (dist === 'binomial') {
        distParams.innerHTML = `
            <label>Number of Trials (n): <input type="number" id="n" value="10"></label>
            <label>Probability of Success (p): <input type="number" step="0.01" id="p" value="0.5"></label>
        `;
    } else if (dist === 'poisson') {
        distParams.innerHTML = `
            <label>Lambda (λ): <input type="number" id="lambda" value="4"></label>
        `;
    } else if (dist === 'exponential') {
        distParams.innerHTML = `
            <label>Lambda (λ): <input type="number" id="lambdaExp" value="1"></label>
        `;
    } else if (dist === 'gamma') {
        distParams.innerHTML = `
            <label>Shape (k): <input type="number" id="shape" value="2"></label>
            <label>Scale (θ): <input type="number" id="scale" value="2"></label>
        `;
    } else if (dist === 'uniform') {
        distParams.innerHTML = `
            <label>Min: <input type="number" id="min" value="0"></label>
            <label>Max: <input type="number" id="max" value="1"></label>
        `;
    } else if (dist === 'beta') {
        distParams.innerHTML = `
            <label>Alpha (α): <input type="number" id="alpha" value="2"></label>
            <label>Beta (β): <input type="number" id="beta" value="2"></label>
        `;
    } else if (dist === 'chiSquare') {
        distParams.innerHTML = `
            <label>Degrees of Freedom (df): <input type="number" id="dfChiSquare" value="2"></label>
        `;
    } else if (dist === 'lognormal') {
        distParams.innerHTML = `
            <label>Log Mean: <input type="number" id="logMean" value="0"></label>
            <label>Log Std Dev: <input type="number" id="logStdDev" value="1"></label>
        `;
    } else if (dist === 'weibull') {
        distParams.innerHTML = `
            <label>Scale: <input type="number" id="scaleWeibull" value="1"></label>
            <label>Shape: <input type="number" id="shapeWeibull" value="1.5"></label>
        `;
    } else if (dist === 'cauchy') {
        distParams.innerHTML = `
            <label>Location: <input type="number" id="locationCauchy" value="0"></label>
            <label>Scale: <input type="number" id="scaleCauchy" value="1"></label>
        `;
    } else if (dist === 'studentT') {
        distParams.innerHTML = `
            <label>Degrees of Freedom (df): <input type="number" id="dfStudentT" value="10"></label>
        `;
    } else if (dist === 'geometric') {
        distParams.innerHTML = `
            <label>Probability of Success (p): <input type="number" step="0.01" id="probGeometric" value="0.5"></label>
        `;
    } else if (dist === 'pareto') {
        distParams.innerHTML = `
            <label>Shape (α): <input type="number" id="alphaPareto" value="2"></label>
            <label>Scale (xm): <input type="number" id="scalePareto" value="1"></label>
        `;
    } else if (dist === 'gumbel') {
        distParams.innerHTML = `
            <label>Location: <input type="number" id="locationGumbel" value="0"></label>
            <label>Scale: <input type="number" id="scaleGumbel" value="1"></label>
        `;
    } else if (dist === 'triangular') {
        distParams.innerHTML = `
            <label>Min: <input type="number" id="minTriangular" value="0"></label>
            <label>Max: <input type="number" id="maxTriangular" value="1"></label>
            <label>Mode: <input type="number" id="modeTriangular" value="0.5"></label>
        `;
    } else if (dist === 'fDistribution') {
        distParams.innerHTML = `
            <label>Degrees of Freedom 1 (df1): <input type="number" id="df1" value="5"></label>
            <label>Degrees of Freedom 2 (df2): <input type="number" id="df2" value="10"></label>
        `;
    }
}

function generateDistribution() {
    const dist = document.getElementById('distribution').value;
    let labels = [];
    let data = [];
    const ctx = document.getElementById('distributionChart').getContext('2d');

    if (distributionChart) {
        distributionChart.destroy();
    }

    if (dist === 'normal') {
        let mean = parseFloat(document.getElementById('mean').value);
        let stdDev = parseFloat(document.getElementById('stdDev').value);
        for (let i = -50; i <= 50; i++) {
            labels.push(i);
            data.push(jStat.normal.pdf(i, mean, stdDev));
        }
    } else if (dist === 'binomial') {
        let n = parseInt(document.getElementById('n').value);
        let p = parseFloat(document.getElementById('p').value);
        for (let i = 0; i <= n; i++) {
            labels.push(i);
            data.push(jStat.binomial.pdf(i, n, p));
        }
    } else if (dist === 'poisson') {
        let lambda = parseFloat(document.getElementById('lambda').value);
        for (let i = 0; i <= 20; i++) {
            labels.push(i);
            data.push(jStat.poisson.pdf(i, lambda));
        }
    } else if (dist === 'exponential') {
        let lambda = parseFloat(document.getElementById('lambdaExp').value);
        for (let i = 0; i <= 10; i += 0.1) {
            labels.push(i.toFixed(1));
            data.push(jStat.exponential.pdf(i, lambda));
        }
    } else if (dist === 'gamma') {
        let shape = parseFloat(document.getElementById('shape').value);
        let scale = parseFloat(document.getElementById('scale').value);
        for (let i = 0; i <= 20; i += 0.1) {
            labels.push(i.toFixed(1));
            data.push(jStat.gamma.pdf(i, shape, scale));
        }
    } else if (dist === 'uniform') {
        let min = parseFloat(document.getElementById('min').value);
        let max = parseFloat(document.getElementById('max').value);
        for (let i = min - 1; i <= max + 1; i += 0.1) {
            labels.push(i.toFixed(1));
            data.push(jStat.uniform.pdf(i, min, max));
        }
    } else if (dist === 'beta') {
        let alpha = parseFloat(document.getElementById('alpha').value);
        let beta = parseFloat(document.getElementById('beta').value);
        for (let i = 0; i <= 1; i += 0.01) {
            labels.push(i.toFixed(2));
            data.push(jStat.beta.pdf(i, alpha, beta));
        }
    } else if (dist === 'chiSquare') {
        let df = parseFloat(document.getElementById('dfChiSquare').value);
        for (let i = 0; i <= 20; i += 0.1) {
            labels.push(i.toFixed(1));
            data.push(jStat.chisquare.pdf(i, df));
        }
    } else if (dist === 'lognormal') {
        let logMean = parseFloat(document.getElementById('logMean').value);
        let logStdDev = parseFloat(document.getElementById('logStdDev').value);
        for (let i = 0; i <= 10; i += 0.1) {
            labels.push(i.toFixed(1));
            data.push(jStat.lognormal.pdf(i, logMean, logStdDev));
        }
    } else if (dist === 'weibull') {
        let scaleWeibull = parseFloat(document.getElementById('scaleWeibull').value);
        let shapeWeibull = parseFloat(document.getElementById('shapeWeibull').value);
        for (let i = 0; i <= 5; i += 0.1) {
            labels.push(i.toFixed(1));
            data.push(jStat.weibull.pdf(i, scaleWeibull, shapeWeibull));
        }
    } else if (dist === 'cauchy') {
        let locationCauchy = parseFloat(document.getElementById('locationCauchy').value);
        let scaleCauchy = parseFloat(document.getElementById('scaleCauchy').value);
        for (let i = -10; i <= 10; i += 0.1) {
            labels.push(i.toFixed(1));
            data.push(jStat.cauchy.pdf(i, locationCauchy, scaleCauchy));
        }
    } else if (dist === 'studentT') {
        let dfStudentT = parseInt(document.getElementById('dfStudentT').value);
        for (let i = -10; i <= 10; i += 0.1) {
            labels.push(i.toFixed(1));
            data.push(jStat.studentt.pdf(i, dfStudentT));
        }
    } else if (dist === 'geometric') {
        let probGeometric = parseFloat(document.getElementById('probGeometric').value);
        for (let i = 0; i <= 20; i++) {
            labels.push(i);
            data.push(jStat.geometric.pdf(i, probGeometric));
        }
    } else if (dist === 'pareto') {
        let alphaPareto = parseFloat(document.getElementById('alphaPareto').value);
        let scalePareto = parseFloat(document.getElementById('scalePareto').value);
        for (let i = 0; i <= 5; i += 0.1) {
            labels.push(i.toFixed(1));
            data.push(jStat.pareto.pdf(i, scalePareto, alphaPareto));
        }
    } else if (dist === 'gumbel') {
        let locationGumbel = parseFloat(document.getElementById('locationGumbel').value);
        let scaleGumbel = parseFloat(document.getElementById('scaleGumbel').value);
        for (let i = -5; i <= 10; i += 0.1) {
            labels.push(i.toFixed(1));
            data.push(jStat.gumbel.pdf(i, locationGumbel, scaleGumbel));
        }
    } else if (dist === 'triangular') {
        let minTriangular = parseFloat(document.getElementById('minTriangular').value);
        let maxTriangular = parseFloat(document.getElementById('maxTriangular').value);
        let modeTriangular = parseFloat(document.getElementById('modeTriangular').value);
        for (let i = minTriangular - 1; i <= maxTriangular + 1; i += 0.1) {
            labels.push(i.toFixed(1));
            data.push(jStat.triangular.pdf(i, minTriangular, modeTriangular, maxTriangular));
        }
    } else if (dist === 'fDistribution') {
        let df1 = parseFloat(document.getElementById('df1').value);
        let df2 = parseFloat(document.getElementById('df2').value);
        for (let i = 0; i <= 5; i += 0.1) {
            labels.push(i.toFixed(1));
            data.push(jStat.centralF.pdf(i, df1, df2));
        }
    }

    distributionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${dist.charAt(0).toUpperCase() + dist.slice(1)} Distribution`,
                data: data,
                borderColor: 'rgba(0, 123, 255, 1)',
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function runSimulation() {
    const dist = document.getElementById('distribution').value;
    const simulations = parseInt(document.getElementById('simulations').value);
    let results = [];
    let sum = 0;
    let sumSquared = 0;
    const ctx = document.getElementById('simulationHistogram').getContext('2d');

    if (simulationHistogram) {
        simulationHistogram.destroy();
    }

    if (dist === 'normal') {
        let mean = parseFloat(document.getElementById('mean').value);
        let stdDev = parseFloat(document.getElementById('stdDev').value);
        for (let i = 0; i < simulations; i++) {
            let value = jStat.normal.sample(mean, stdDev);
            results.push(value);
            sum += value;
            sumSquared += value * value;
        }
    } else if (dist === 'binomial') {
        let n = parseInt(document.getElementById('n').value);
        let p = parseFloat(document.getElementById('p').value);
        for (let i = 0; i < simulations; i++) {
            let value = jStat.binomial.sample(n, p);
            results.push(value);
            sum += value;
            sumSquared += value * value;
        }
    } else if (dist === 'poisson') {
        let lambda = parseFloat(document.getElementById('lambda').value);
        for (let i = 0; i < simulations; i++) {
            let value = jStat.poisson.sample(lambda);
            results.push(value);
            sum += value;
            sumSquared += value * value;
        }
    } else if (dist === 'exponential') {
        let lambda = parseFloat(document.getElementById('lambdaExp').value);
        for (let i = 0; i < simulations; i++) {
            let value = jStat.exponential.sample(lambda);
            results.push(value);
            sum += value;
            sumSquared += value * value;
        }
    } else if (dist === 'gamma') {
        let shape = parseFloat(document.getElementById('shape').value);
        let scale = parseFloat(document.getElementById('scale').value);
        for (let i = 0; i < simulations; i++) {
            let value = jStat.gamma.sample(shape, scale);
            results.push(value);
            sum += value;
            sumSquared += value * value;
        }
    } else if (dist === 'uniform') {
        let min = parseFloat(document.getElementById('min').value);
        let max = parseFloat(document.getElementById('max').value);
        for (let i = 0; i < simulations; i++) {
            let value = jStat.uniform.sample(min, max);
            results.push(value);
            sum += value;
            sumSquared += value * value;
        }
    } else if (dist === 'beta') {
        let alpha = parseFloat(document.getElementById('alpha').value);
        let beta = parseFloat(document.getElementById('beta').value);
        for (let i = 0; i < simulations; i++) {
            let value = jStat.beta.sample(alpha, beta);
            results.push(value);
            sum += value;
            sumSquared += value * value;
        }
    } else if (dist === 'chiSquare') {
        let df = parseFloat(document.getElementById('dfChiSquare').value);
        for (let i = 0; i < simulations; i++) {
            let value = jStat.chisquare.sample(df);
            results.push(value);
            sum += value;
            sumSquared += value * value;
        }
    } else if (dist === 'lognormal') {
        let logMean = parseFloat(document.getElementById('logMean').value);
        let logStdDev = parseFloat(document.getElementById('logStdDev').value);
        for (let i = 0; i < simulations; i++) {
            let value = jStat.lognormal.sample(logMean, logStdDev);
            results.push(value);
            sum += value;
            sumSquared += value * value;
        }
    } else if (dist === 'weibull') {
        let scaleWeibull = parseFloat(document.getElementById('scaleWeibull').value);
        let shapeWeibull = parseFloat(document.getElementById('shapeWeibull').value);
        for (let i = 0; i < simulations; i++) {
            let value = jStat.weibull.sample(scaleWeibull, shapeWeibull);
            results.push(value);
            sum += value;
            sumSquared += value * value;
        }
    } else if (dist === 'cauchy') {
        let locationCauchy = parseFloat(document.getElementById('locationCauchy').value);
        let scaleCauchy = parseFloat(document.getElementById('scaleCauchy').value);
        for (let i = 0; i < simulations; i++) {
            let value = jStat.cauchy.sample(locationCauchy, scaleCauchy);
            results.push(value);
            sum += value;
            sumSquared += value * value;
        }
    } else if (dist === 'studentT') {
        let dfStudentT = parseInt(document.getElementById('dfStudentT').value);
        for (let i = 0; i < simulations; i++) {
            let value = jStat.studentt.sample(dfStudentT);
            results.push(value);
            sum += value;
            sumSquared += value * value;
        }
    } else if (dist === 'geometric') {
        let probGeometric = parseFloat(document.getElementById('probGeometric').value);
        for (let i = 0; i < simulations; i++) {
            let value = jStat.geometric.sample(probGeometric);
            results.push(value);
            sum += value;
            sumSquared += value * value;
        }
    } else if (dist === 'pareto') {
        let alphaPareto = parseFloat(document.getElementById('alphaPareto').value);
        let scalePareto = parseFloat(document.getElementById('scalePareto').value);
        for (let i = 0; i < simulations; i++) {
            let value = jStat.pareto.sample(scalePareto, alphaPareto);
            results.push(value);
            sum += value;
            sumSquared += value * value;
        }
    } else if (dist === 'gumbel') {
        let locationGumbel = parseFloat(document.getElementById('locationGumbel').value);
        let scaleGumbel = parseFloat(document.getElementById('scaleGumbel').value);
        for (let i = 0; i < simulations; i++) {
            let value = jStat.gumbel.sample(locationGumbel, scaleGumbel);
            results.push(value);
            sum += value;
            sumSquared += value * value;
        }
    } else if (dist === 'triangular') {
        let minTriangular = parseFloat(document.getElementById('minTriangular').value);
        let maxTriangular = parseFloat(document.getElementById('maxTriangular').value);
        let modeTriangular = parseFloat(document.getElementById('modeTriangular').value);
        for (let i = 0; i < simulations; i++) {
            let value = jStat.triangular.sample(minTriangular, modeTriangular, maxTriangular);
            results.push(value);
            sum += value;
            sumSquared += value * value;
        }
    } else if (dist === 'fDistribution') {
        let df1 = parseFloat(document.getElementById('df1').value);
        let df2 = parseFloat(document.getElementById('df2').value);
        for (let i = 0; i < simulations; i++) {
            let value = jStat.centralF.sample(df1, df2);
            results.push(value);
            sum += value;
            sumSquared += value * value;
        }
    }

    let mean = sum / simulations;
    let variance = (sumSquared / simulations) - (mean * mean);
    let stdDev = Math.sqrt(variance);

    const bins = 20;
    let histoData = Array(bins).fill(0);
    let min = Math.min(...results);
    let max = Math.max(...results);
    let binWidth = (max - min) / bins;

    results.forEach(value => {
        let bin = Math.floor((value - min) / binWidth);
        if (bin >= bins) bin = bins - 1;
        histoData[bin]++;
    });

    simulationHistogram = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({ length: bins }, (_, i) => (min + i * binWidth).toFixed(1)),
            datasets: [{
                label: 'Simulation Results',
                data: histoData,
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    document.getElementById('simulationResult').innerHTML = `
        <p>Mean: ${mean.toFixed(2)}</p>
        <p>Standard Deviation: ${stdDev.toFixed(2)}</p>
    `;
}
