const express = require('express');
const path = require('path');
const blog = require('./views/blog.json'); 
const fs = require('fs');


const puerto = process.env.PORT || 3000;

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Configura el motor de vistas y la ubicación de archivos estáticos
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Configura express.json() y express.urlencoded() para analizar datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/afip', (req, res) => {
  res.render('afip');
});

app.get('/blog', (req, res) => {
  res.render('blog', { blog });
});

app.get('/puam', (req, res) => {
  res.render('puam',  { nuevosMesesAguinaldo: [], mesesCortados: [], datos: [], retroHaberFinal: 0, retroOsFinal : 0, retroDevOsFinal: 0, aguinaldo: 0, aguinaldoOs: 0, aguinaldoDevOs : 0, neto:0 })
});

// Ruta para manejar el formulario
app.post('/puam', (req, res) => {
  const datos = { nombre: req.body.titular, cuil: req.body.cuil, expediente: req.body.expediente, beneficio: req.body.beneficio,
                  fechaInicial: req.body.dia + "/" + req.body.mes + "/" + req.body.anio}


  

  // Realiza el cálculo y crea un array con los resultados
  const meses = [
    { "desde": { dia: 1, mes: 1, anio: 2021 },
        "hasta": { dia: 28, mes: 02, anio: 2021 },
        "proporcionalMeses": 3,
        "haber": 15228.24,
        "os": 571.06,
        "devOs": 114.21,
        "retroHaber": 0,
        "retroOs": 0,
        "retroDevOs": 0,
    },
    {
        "desde": { dia: 1, mes: 3, anio: 2021 },
        "hasta": { dia: 31, mes: 5, anio: 2021 },
        "proporcionalMeses": 3,
        "haber": 16457.16,
        "os": 617.14,
        "devOs": 123.43,
        "retroHaber": 0,
        "retroOs": 0,
        "retroDevOs": 0,
    },
    {
        "desde": { dia: 1, mes: 6, anio: 2021 },
        "hasta": { dia: 31, mes: 8, anio: 2021 },
        "proporcionalMeses": 3,
        "haber": 18451.76,
        "os": 691.94,
        "devOs": 138.39,
        "retroHaber": 0,
        "retroOs": 0,
        "retroDevOs": 0,
    },
    {
        "desde": { dia: 1, mes: 9, anio: 2021 },
        "hasta": { dia: 30, mes: 11, anio: 2021 },
        "proporcionalMeses": 3,
        "haber": 20737.94,
        "os": 777.67,
        "devOs": 155.53,
        "retroHaber": 0,
        "retroOs": 0,
        "retroDevOs": 0,
    },
    {
        "desde": { dia: 1, mes: 12, anio: 2021 },
        "hasta": { dia: 28, mes: 2, anio: 2022 },
        "proporcionalMeses": 3,
        "haber": 23249.30,
        "os": 871.85,
        "devOs": 174.37,
        "retroHaber": 0,
        "retroOs": 0,
        "retroDevOs": 0,
    },
    {
        "desde": { dia: 1, mes: 3, anio: 2022 },
        "hasta": { dia: 31, mes: 5, anio: 2022 },
        "proporcionalMeses": 3,
        "haber": 26104.32,
        "os": 978.91,
        "devOs": 195.78,
        "retroHaber": 0,
        "retroOs": 0,
        "retroDevOs": 0,
    },
    {
        "desde": { dia: 1, mes: 6, anio: 2022 },
        "hasta": { dia: 31, mes: 8, anio: 2022 },
        "proporcionalMeses": 3,
        "haber": 30019.96,
        "os": 1125.75,
        "devOs": 225.15,
        "retroHaber": 0,
        "retroOs": 0,
        "retroDevOs": 0,
    },
    {
        "desde": { dia: 1, mes: 9, anio: 2022 },
        "hasta": { dia: 30, mes: 11, anio: 2022 },
        "proporcionalMeses": 3,
        "haber": 34682.06,
        "os": 1300.58, 
        "devOs": 260.11,
        "retroHaber": 0,
        "retroOs": 0,
        "retroDevOs": 0,
    },
    {
        "desde": { dia: 1, mes: 12, anio: 2022 },
        "hasta": { dia: 28, mes: 02, anio: 2023 },
        "proporcionalMeses": 3,
        "haber": 40099.40,
        "os": 1503.73,
        "devOs": 300.74,
        "retroHaber": 0,
        "retroOs": 0,
        "retroDevOs": 0,
    },
    {
        "desde": { dia: 1, mes: 3, anio: 2023 },
        "hasta": { dia: 31, mes: 5, anio: 2023 },
        "proporcionalMeses": 3,
        "haber": 46932.34,
        "os": 1759.96,
        "devOs": 351.99,
        "retroHaber": 0,
        "retroOs": 0,
        "retroDevOs": 0,
    },
    {
        "desde": { dia: 1, mes: 6, anio: 2023 },
        "hasta": { dia: 31, mes: 8, anio: 2023 },
        "proporcionalMeses": 3,
        "haber": 56750.59,
        "os": 2128.15,
        "devOs": 425.63,
        "retroHaber": 0,
        "retroOs": 0,
        "retroDevOs": 0,
    },
    {
        "desde": { dia: 1, mes: 9, anio: 2023 },
        "hasta": { dia: 30, mes: 11, anio: 2023 },
        "proporcionalMeses": 3,
        "haber": 69967.81,
        "os": 2623.79,
        "devOs": 524.76,
        "retroHaber": 0,
        "retroOs": 0,
        "retroDevOs": 0,
    },
    {
        "desde": { dia: 1, mes: 12, anio: 2023 },
        "hasta": { dia: 31, mes: 12, anio: 2023 },
        "proporcionalMeses": 1,
        "haber": 84570.09,
        "os": 3171.38,
        "devOs": 634.28,
        "retroHaber": 0,
        "retroOs": 0,
        "retroDevOs": 0,
    },
]

// Requiero datos de los inputs iniciales

const dia = parseInt(req.body.dia);
const mes = parseInt(req.body.mes);
const anio = parseInt(req.body.anio);


const fipDias = [{ dia: dia, mes: mes, anio: anio}];
const fip = [{ dia: dia, mes: mes, anio: anio}];


const indiceInicio = meses.findIndex(mes => {
    if (fip[0].mes === 5 || fip[0].mes === 4) {
        fip[0].mes = 3;
    }

    if (fip[0].mes === 7 || fip[0].mes === 8) {
        fip[0].mes = 6;
    }

    if (fip[0].mes === 10 || fip[0].mes === 11) {
        fip[0].mes = 9;
    }

    if (fip[0].mes === 1 || fip[0].mes === 2) {
        fip[0].mes = 12;
        fip[0].anio = fip[0].anio - 1
    }
    
    return (mes.desde.anio === fip[0].anio) && (mes.desde.mes === fip[0].mes);
});

// Cortar el array desde el índice encontrado
const mesesCortados = indiceInicio !== -1 ? meses.slice(indiceInicio) : [];

mesesCortados[0].desde.dia = fipDias[0].dia;
mesesCortados[0].desde.mes = fipDias[0].mes;
mesesCortados[0].desde.anio = fipDias[0].anio;

const contarDias = mesesCortados[0].hasta.mes - mesesCortados[0].desde.mes + ((31 - mesesCortados[0].desde.dia) / 30)

mesesCortados[0].proporcionalMeses= contarDias;

if (mesesCortados[0].desde.mes === 12) {
    mesesCortados[0].proporcionalMeses = 2 + ((31 - mesesCortados[0].desde.dia) / 30)
}

//calculo de retro
//Acumuladores
let retroHaberFinal = 0;
let retroOsFinal = 0;
let retroDevOsFinal = 0;

for (let i = 0; i < mesesCortados.length; i++) {
    retroHaberFinal = mesesCortados[i].haber * mesesCortados[i].proporcionalMeses + retroHaberFinal;
    retroOsFinal = mesesCortados[i].os * mesesCortados[i].proporcionalMeses + retroOsFinal;
    retroDevOsFinal = mesesCortados[i].devOs * mesesCortados[i].proporcionalMeses + retroDevOsFinal;    
}

for (let i = 0; i < mesesCortados.length; i++) {
    mesesCortados[i].retroHaber = mesesCortados[i].proporcionalMeses*mesesCortados[i].haber;
    mesesCortados[i].retroOs = mesesCortados[i].proporcionalMeses*mesesCortados[i].os;
    mesesCortados[i].retroDevOs = mesesCortados[i].proporcionalMeses*mesesCortados[i].devOs;

}


//mostrar todo
console.log("Períodos")

for (let index = 0; index < mesesCortados.length; index++) {
    console.log(JSON.stringify(mesesCortados[index].desde.dia + "/" + mesesCortados[index].desde.mes + "/" + mesesCortados[index].desde.anio + " al " + mesesCortados[index].hasta.dia + "/" +  mesesCortados[index].hasta.mes + "/" +mesesCortados[index].hasta.anio + ": $"  +   mesesCortados[index].haber.toFixed(2) + " - OS: " + mesesCortados[index].os.toFixed(2) + " - Dev OS: $ "+ mesesCortados[index].devOs.toFixed(2) + " -  Tiempo: " + mesesCortados[index].proporcionalMeses.toFixed(4)  
    
    ));
}
    console.log("---------------------------------------------------------------------")
    console.log("Retro haber: $" + retroHaberFinal.toFixed(2)) 
    console.log("Retro OS: $" + retroOsFinal.toFixed(2))    
    console.log("Retro Devolucion OS: $" + retroDevOsFinal.toFixed(2))    

// calculo de aguinaldo

const mesesAguinaldo = [
    {
        "desde": { dia: 1, mes: 1, anio: 2021 },
        "hasta": { dia: 30, mes: 6, anio: 2021 },
        "tiempo": 0.5,
        "haber": 0,
        "os": 0,
        "devOs": 0,
        "retroHaber": 0,
        "retroOs": 0,
        "retroDevOs": 0,
    },
    {
        "desde": { dia: 1, mes: 7, anio: 2021 },
        "hasta": { dia: 31, mes: 12, anio: 2021 },
        "tiempo": 0.5,
        "haber": 0,
        "os": 0,
        "devOs": 0,

    },
    {
        "desde": { dia: 1, mes: 1, anio: 2022 },
        "hasta": { dia: 30, mes: 6, anio: 2022 },
        "tiempo": 0.5,
        "haber": 0,
        "os": 0,
        "devOs": 0,
        "retroHaber": 0,
        "retroOs": 0,
        "retroDevOs": 0,
    },
    {
        "desde": { dia: 1, mes: 7, anio: 2022 },
        "hasta": { dia: 31, mes: 12, anio: 2022 },
        "tiempo": 0.5,
        "haber": 0,
        "os": 0,
        "devOs": 0,
        "retroHaber": 0,
        "retroOs": 0,
        "retroDevOs": 0,

    },
    {
        "desde": { dia: 1, mes: 1, anio: 2023 },
        "hasta": { dia: 30, mes: 6, anio: 2023 },
        "tiempo": 0.5,
        "haber": 0,
        "os": 0,
        "devOs": 0,
        "retroHaber": 0,
        "retroOs": 0,
        "retroDevOs": 0,

    },
    {
        "desde": { dia: 1, mes: 7, anio: 2023 },
        "hasta": { dia: 31, mes: 12, anio: 2023 },
        "tiempo": 0.5,
        "haber": 0,
        "os": 0,
        "devOs": 0,
        "retroHaber": 0,
        "retroOs": 0,
        "retroDevOs": 0,
    }
]


let indice;

//Calculo de meses aguinaldo

for (let i = 0; i < mesesAguinaldo.length; i++ ) {
    if (mesesAguinaldo[i].desde.anio == fipDias[0].anio && fipDias[0].mes >= mesesAguinaldo[i].desde.mes && fipDias[0].mes<=mesesAguinaldo[i].hasta.mes  ) {
        mesesAguinaldo[i].desde.dia = fipDias[0].dia;
        mesesAguinaldo[i].desde.mes = fipDias[0].mes;
        mesesAguinaldo[i].tiempo = ((((mesesAguinaldo[i].hasta.mes - mesesAguinaldo[i].desde.mes)*30) + (31 - mesesAguinaldo[i].desde.dia))/30/12);
        indice = i;
    }
}
    const nuevosMesesAguinaldo = mesesAguinaldo.slice(indice);
console.log(JSON.stringify(nuevosMesesAguinaldo))

// Calculo haber aguinaldo
console.log("---------------------------------------------------------------------")

console.log("Calculo de aguinaldo")

//Acumuladores
let aguinaldo = 0;
let aguinaldoOs = 0;
let aguinaldoDevOs = 0;




for (let i = 0; i < nuevosMesesAguinaldo.length; i++) {
    for (let t = 0; t < mesesCortados.length; t++) {
       if (nuevosMesesAguinaldo[i].hasta.mes == mesesCortados[t].desde.mes &&  nuevosMesesAguinaldo[i].hasta.anio == mesesCortados[t].desde.anio) {
        nuevosMesesAguinaldo[i].haber = (mesesCortados[t].haber * nuevosMesesAguinaldo[i].tiempo);
        nuevosMesesAguinaldo[i].os = (mesesCortados[t].os * nuevosMesesAguinaldo[i].tiempo)
        nuevosMesesAguinaldo[i].devOs = (mesesCortados[t].devOs * nuevosMesesAguinaldo[i].tiempo)
        
        aguinaldo =  nuevosMesesAguinaldo[i].haber + aguinaldo
        aguinaldoOs = nuevosMesesAguinaldo[i].os + aguinaldoOs
        aguinaldoDevOs = nuevosMesesAguinaldo[i].devOs + aguinaldoDevOs
       }
    }
}



for (let i = 0; i < nuevosMesesAguinaldo.length; i++ ) {
console.log(JSON.stringify(nuevosMesesAguinaldo[i].desde.dia + "/" + nuevosMesesAguinaldo[i].desde.mes +  "/" +nuevosMesesAguinaldo[i].desde.anio + " al " + nuevosMesesAguinaldo[i].hasta.dia + "/" + nuevosMesesAguinaldo[i].hasta.mes +  "/" + nuevosMesesAguinaldo[i].hasta.anio + ": $" + nuevosMesesAguinaldo[i].haber.toFixed(2) + " - OS: $" + nuevosMesesAguinaldo[i].os.toFixed(2) + " - Dev Os: $" + nuevosMesesAguinaldo[i].devOs.toFixed(2)))}


const neto = (retroHaberFinal + aguinaldo) - (retroOsFinal + retroDevOsFinal + aguinaldoOs + aguinaldoDevOs)

  res.render('puam', { nuevosMesesAguinaldo, mesesCortados, datos, retroHaberFinal, aguinaldo, retroOsFinal, retroDevOsFinal, aguinaldoOs, aguinaldoDevOs, neto });
});















app.get('/blog/newarticle', (req, res) => {
  res.render('newarticle');
});

app.post('/blog/newarticle', (req, res) => {
  // Buscamos contenido de JSON
  const blog = './views/blog.json'; 
  const jsonData = fs.readFileSync(blog, 'utf-8');
  //Pasamos el JSON a JS
  const articulos = JSON.parse(jsonData);

console.log(jsonData)

  //Obtener hora y fecha
  const fechaActual = new Date();
  const formattedDate = fechaActual.toISOString().split('T')[0]; // Obtiene la fecha sin la hora
  
  const nuevoArticulo = {
    title: req.body.title,
    text: req.body.text,
    date: formattedDate
  };

  try {
    articulos.push(nuevoArticulo);
    const blogActualizado = JSON.stringify(articulos);
    fs.writeFileSync(blog, blogActualizado, 'utf-8');
    res.redirect('/blog');
  } catch (error) {
    console.error("Error al escribir el archivo JSON:", error);
    res.status(500).send("Error al actualizar el archivo JSON");
  }

});

// Inicia el servidor en el puerto especificado
app.listen(puerto, () => {
  console.log(`Servidor Express - puerto ${puerto}`);
});
