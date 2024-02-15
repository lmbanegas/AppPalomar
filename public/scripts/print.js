
var calcularBtn = document.getElementById('calcularBtn');
var contenidoParaImpirmir = document.getElementById('contenidoParaImpirmir');

// Agregar un evento de clic al botón
calcularBtn.addEventListener('click', function () {
    // Cambiar el estilo del div para hacerlo visible
    contenidoParaImpirmir.style.display = 'block';
});



function imprimirContenido() {
    var contenidoParaImprimir = document.getElementById('contenidoParaImprimir').outerHTML;
    var ventanaImpresion = window.open('', '_blank');
    ventanaImpresion.document.write('<html><head><title>' + ' </title><style>' + obtenerEstilosCSS() + '</style></head><body>' + contenidoParaImprimir + '</body></html>');
    ventanaImpresion.document.close();
    ventanaImpresion.print();
    ventanaImpresion.close();
}

function obtenerEstilosCSS() {
    return `
    @media print {
        body {
            font-family: 'Segoe UI';
            margin: 0;
            padding: 0;
        }

        header {
            background-color: #37BBED;
            color: #fff;
            padding: 20px;
            text-align: center;
        }

        header h1 {
            font-size: 2rem;
        }

        nav ul {
            list-style: none;
            padding: 0;
        }

        nav ul li {
            display: inline;
            margin: 0 20px;
        }

        nav a {
            text-decoration: none;
            color: #fff;
            font-weight: bold;
            transition: color 0.3s;
        }

        nav a:hover {
            color: #202020;
        }

        main {
            padding: 20px;
        }

        article {
            background-color: #222;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 5px;
        }

        article h2 {
            color: #ff5733;
        }

        article p {
            line-height: 1.6;
        }

        footer {
            background-color: #37BBED;
            color: #fff;
            text-align: center;
            padding: 10px;
            margin-top: 600px;
        }

        .blog-item {
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 10px;
            margin-bottom: 15px;
            list-style: none;
        }

        table {
            border-collapse: collapse;
            width: 100%;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }
    }
`;
}

