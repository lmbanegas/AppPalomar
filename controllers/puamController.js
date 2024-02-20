const { asPDFName } = require("pdf-lib");
const meses = require('../data/mesesPuam');
const mesesAguinaldo = require('../data/aguinaldoPuam');




const puamController = {


inicioPuam: (req, res) => {
    res.render('puam', { nuevosMesesAguinaldo: [], mesesCortados: [], datos: [], retroHaberFinal: 0, retroOsFinal: 0, retroDevOsFinal: 0, aguinaldo: 0, aguinaldoOs: 0, aguinaldoDevOs: 0, neto: 0 })
},



calcularPuam: (req, res) => {

    const datos = {
        nombre: req.body.titular, cuil: req.body.cuil, expediente: req.body.expediente, beneficio: req.body.beneficio,
        fechaInicial: req.body.dia + "/" + req.body.mes + "/" + req.body.anio
    }

 

    // Requiero datos de los inputs iniciales

    const dia = parseInt(req.body.dia);
    const mes = parseInt(req.body.mes);
    const anio = parseInt(req.body.anio);


    const fipDias = [{ dia: dia, mes: mes, anio: anio }];
    const fip = [{ dia: dia, mes: mes, anio: anio }];


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

    mesesCortados[0].proporcionalMeses = contarDias;

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
        mesesCortados[i].retroHaber = mesesCortados[i].proporcionalMeses * mesesCortados[i].haber;
        mesesCortados[i].retroOs = mesesCortados[i].proporcionalMeses * mesesCortados[i].os;
        mesesCortados[i].retroDevOs = mesesCortados[i].proporcionalMeses * mesesCortados[i].devOs;

    }



    // calculo de aguinaldo

    


    let indice;

    //Calculo de meses aguinaldo

    for (let i = 0; i < mesesAguinaldo.length; i++) {
        if (mesesAguinaldo[i].desde.anio == fipDias[0].anio && fipDias[0].mes >= mesesAguinaldo[i].desde.mes && fipDias[0].mes <= mesesAguinaldo[i].hasta.mes) {
            mesesAguinaldo[i].desde.dia = fipDias[0].dia;
            mesesAguinaldo[i].desde.mes = fipDias[0].mes;
            mesesAguinaldo[i].tiempo = ((((mesesAguinaldo[i].hasta.mes - mesesAguinaldo[i].desde.mes) * 30) + (31 - mesesAguinaldo[i].desde.dia)) / 30 / 12);
            indice = i;
        }
    }
    const nuevosMesesAguinaldo = mesesAguinaldo.slice(indice);


    //Acumuladores
    let aguinaldo = 0;
    let aguinaldoOs = 0;
    let aguinaldoDevOs = 0;




    for (let i = 0; i < nuevosMesesAguinaldo.length; i++) {
        for (let t = 0; t < mesesCortados.length; t++) {
            if (nuevosMesesAguinaldo[i].hasta.mes == mesesCortados[t].desde.mes && nuevosMesesAguinaldo[i].hasta.anio == mesesCortados[t].desde.anio) {
                nuevosMesesAguinaldo[i].haber = (mesesCortados[t].haber * nuevosMesesAguinaldo[i].tiempo);
                nuevosMesesAguinaldo[i].os = (mesesCortados[t].os * nuevosMesesAguinaldo[i].tiempo)
                nuevosMesesAguinaldo[i].devOs = (mesesCortados[t].devOs * nuevosMesesAguinaldo[i].tiempo)

                aguinaldo = nuevosMesesAguinaldo[i].haber + aguinaldo
                aguinaldoOs = nuevosMesesAguinaldo[i].os + aguinaldoOs
                aguinaldoDevOs = nuevosMesesAguinaldo[i].devOs + aguinaldoDevOs
            }
        }
    }

    const neto = (retroHaberFinal + aguinaldo) - (retroOsFinal + retroDevOsFinal + aguinaldoOs + aguinaldoDevOs)

    res.render('puamResult', { nuevosMesesAguinaldo, mesesCortados, datos, retroHaberFinal, aguinaldo, retroOsFinal, retroDevOsFinal, aguinaldoOs, aguinaldoDevOs, neto });
},

}

module.exports = puamController;
