const { asPDFName } = require("pdf-lib");


const inicioPNC = (req, res) => {
  res.render('pnc',  { nuevosMesesAguinaldo: [], mesesCortados: [], datos: [], retroHaberFinal: 0, retroOsFinal : 0, aguinaldo: 0, aguinaldoOs: 0, neto:0 })
});

const calcularPNC = (req, res) => {
      const datos = {
        nombre: req.body.titular, cuil: req.body.cuil, expediente: req.body.expediente, beneficio: req.body.beneficio,
        fechaInicial: req.body.dia + "/" + req.body.mes + "/" + req.body.anio
    }


const meses = [
    { "desde": { dia: 1, mes: 1, anio: 2021 },
        "hasta": { dia: 28, mes: 02, anio: 2021 },
        "proporcionalMeses": 3,
        "haber": 19035.30,
        "os": 571.06,
        "retroHaber": 0,
        "retroOs": 0,
    },
    {
        "desde": { dia: 1, mes: 3, anio: 2021 },
        "hasta": { dia: 31, mes: 5, anio: 2021 },
        "proporcionalMeses": 3,
        "haber": 20571.45,
        "os": 617.14,
        "retroHaber": 0,
        "retroOs": 0,
    },
    {
        "desde": { dia: 1, mes: 6, anio: 2021 },
        "hasta": { dia: 31, mes: 8, anio: 2021 },
        "proporcionalMeses": 3,
        "haber": 23064.71,
        "os": 691.94,
        "retroHaber": 0,
        "retroOs": 0,
    },
    {
        "desde": { dia: 1, mes: 9, anio: 2021 },
        "hasta": { dia: 30, mes: 11, anio: 2021 },
        "proporcionalMeses": 3,
        "haber": 25922.42,
        "os": 777.67,
        "retroHaber": 0,
        "retroOs": 0,
    },
    {
        "desde": { dia: 1, mes: 12, anio: 2021 },
        "hasta": { dia: 28, mes: 2, anio: 2022 },
        "proporcionalMeses": 3,
        "haber": 29061.63,
        "os": 871.85,
        "retroHaber": 0,
        "retroOs": 0,
    },
    {
        "desde": { dia: 1, mes: 3, anio: 2022 },
        "hasta": { dia: 31, mes: 5, anio: 2022 },
        "proporcionalMeses": 3,
        "haber": 32630.40,
        "os": 978.91,
        "retroHaber": 0,
        "retroOs": 0,
    },
    {
        "desde": { dia: 1, mes: 6, anio: 2022 },
        "hasta": { dia: 31, mes: 8, anio: 2022 },
        "proporcionalMeses": 3,
        "haber": 37524.96,
        "os": 1125.75,
        "retroHaber": 0,
        "retroOs": 0,
    },
    {
        "desde": { dia: 1, mes: 9, anio: 2022 },
        "hasta": { dia: 30, mes: 11, anio: 2022 },
        "proporcionalMeses": 3,
        "haber": 43352.58,
        "os": 1300.58, 
        "retroHaber": 0,
        "retroOs": 0,
    },
    {
        "desde": { dia: 1, mes: 12, anio: 2022 },
        "hasta": { dia: 28, mes: 02, anio: 2023 },
        "proporcionalMeses": 3,
        "haber": 50124.26,
        "os": 1503.73,
        "retroHaber": 0,
        "retroOs": 0,
    },
    {
        "desde": { dia: 1, mes: 3, anio: 2023 },
        "hasta": { dia: 31, mes: 5, anio: 2023 },
        "proporcionalMeses": 3,
        "haber": 58665.43,
        "os": 1759.96,
        "retroHaber": 0,
        "retroOs": 0,
    },
    {
        "desde": { dia: 1, mes: 6, anio: 2023 },
        "hasta": { dia: 31, mes: 8, anio: 2023 },
        "proporcionalMeses": 3,
        "haber": 70938.24,
        "os": 2128.15,
        "retroHaber": 0,
        "retroOs": 0,
    },
    {
        "desde": { dia: 1, mes: 9, anio: 2023 },
        "hasta": { dia: 30, mes: 11, anio: 2023 },
        "proporcionalMeses": 3,
        "haber": 87459.76,
        "os": 2623.79,
        "retroHaber": 0,
        "retroOs": 0,
    },
    {
        "desde": { dia: 1, mes: 12, anio: 2023 },
        "hasta": { dia: 28, mes: 02, anio: 2024 },
        "proporcionalMeses": 3,
        "haber": 105712.61,
        "os": 3171.38,
        "retroHaber": 0,
        "retroOs": 0,
    },
      {
        "desde": { dia: 1, mes: 3, anio: 2024 },
        "hasta": { dia: 31, mes: 3, anio: 2024 },
        "proporcionalMeses": 1,
        "haber": 134445.30,
        "os": 4033.36,
        "retroHaber": 0,
        "retroOs": 0,
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

for (let i = 0; i < mesesCortados.length; i++) {
    retroHaberFinal = mesesCortados[i].haber * mesesCortados[i].proporcionalMeses + retroHaberFinal;
    retroOsFinal = mesesCortados[i].os * mesesCortados[i].proporcionalMeses + retroOsFinal;

}

for (let i = 0; i < mesesCortados.length; i++) {
    mesesCortados[i].retroHaber = mesesCortados[i].proporcionalMeses*mesesCortados[i].haber;
    mesesCortados[i].retroOs = mesesCortados[i].proporcionalMeses*mesesCortados[i].os;


}




const mesesAguinaldo = [
    {
        "desde": { dia: 1, mes: 1, anio: 2021 },
        "hasta": { dia: 30, mes: 6, anio: 2021 },
        "tiempo": 0.5,
        "haber": 0,
        "os": 0,
        "retroHaber": 0,
        "retroOs": 0,
    },
    {
        "desde": { dia: 1, mes: 7, anio: 2021 },
        "hasta": { dia: 31, mes: 12, anio: 2021 },
        "tiempo": 0.5,
        "haber": 0,
        "os": 0,


    },
    {
        "desde": { dia: 1, mes: 1, anio: 2022 },
        "hasta": { dia: 30, mes: 6, anio: 2022 },
        "tiempo": 0.5,
        "haber": 0,
        "os": 0,
        "retroHaber": 0,
        "retroOs": 0,
    },
    {
        "desde": { dia: 1, mes: 7, anio: 2022 },
        "hasta": { dia: 31, mes: 12, anio: 2022 },
        "tiempo": 0.5,
        "haber": 0,
        "os": 0,
        "retroHaber": 0,
        "retroOs": 0,

    },
    {
        "desde": { dia: 1, mes: 1, anio: 2023 },
        "hasta": { dia: 30, mes: 6, anio: 2023 },
        "tiempo": 0.5,
        "haber": 0,
        "os": 0,
        "retroHaber": 0,
        "retroOs": 0,

    },
    {
        "desde": { dia: 1, mes: 7, anio: 2023 },
        "hasta": { dia: 31, mes: 12, anio: 2023 },
        "tiempo": 0.5,
        "haber": 0,
        "os": 0,
        "retroHaber": 0,
        "retroOs": 0,
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


//Acumuladores
let aguinaldo = 0;
let aguinaldoOs = 0;




for (let i = 0; i < nuevosMesesAguinaldo.length; i++) {
    for (let t = 0; t < mesesCortados.length; t++) {
       if (nuevosMesesAguinaldo[i].hasta.mes == mesesCortados[t].desde.mes &&  nuevosMesesAguinaldo[i].hasta.anio == mesesCortados[t].desde.anio) {
        nuevosMesesAguinaldo[i].haber = (mesesCortados[t].haber * nuevosMesesAguinaldo[i].tiempo);
        nuevosMesesAguinaldo[i].os = (mesesCortados[t].os * nuevosMesesAguinaldo[i].tiempo)

        aguinaldo =  nuevosMesesAguinaldo[i].haber + aguinaldo
        aguinaldoOs = nuevosMesesAguinaldo[i].os + aguinaldoOs
       }
    }
}



for (let i = 0; i < nuevosMesesAguinaldo.length; i++ ) {

const neto = (retroHaberFinal + aguinaldo) - (retroOsFinal +  + aguinaldoOs)


  res.render('pncResult', { nuevosMesesAguinaldo, mesesCortados, datos, retroHaberFinal, aguinaldo, retroOsFinal,  aguinaldoOs, neto });
});



  module.exports = {
    inicioPNC,
    calcularPNC,
};
  
