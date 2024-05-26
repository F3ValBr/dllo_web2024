document.addEventListener('DOMContentLoaded', () => {
    fetch('/estadisticas-productos')
        .then(response => response.json())
        .then(data => {
            Highcharts.chart('productsChart', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Cantidad de Productos por Tipo'
                },
                series: [{
                    name: 'Productos',
                    colorByPoint: true,
                    data: data
                }]
            });
        });

    fetch('/estadisticas-pedidos')
        .then(response => response.json())
        .then(data => {
            Highcharts.chart('ordersChart', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Cantidad de Pedidos por Comuna'
                },
                series: [{
                    name: 'Pedidos',
                    colorByPoint: true,
                    data: data
                }]
            });
        });
});
