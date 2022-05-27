const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
}

const chartLabels = ['Dec', 'Jan', 'Feb']

const chartTestData = {
    labels: chartLabels,
    datasets: [
        {
            label: 'Net worth',
            data: [10000000, 20000000, 5000000],
            borderColor: '#f8e949',
            backgroundColor: '#f8e949',
        },
    ],
}

export {chartOptions, chartTestData}
