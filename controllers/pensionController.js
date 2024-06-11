const { asPDFName } = require("pdf-lib");

const pensionController = {
    inicioPension: (req, res) => {
        res.render('pensionCarga', { nuevosMesesAguinaldo: [], mesesCortados: [], datos: [], retroHaberFinal: 0, retroOsFinal: 0, retroDevOsFinal: 0, aguinaldo: 0, aguinaldoOs: 0, aguinaldoDevOs: 0, neto: 0 })
    },
    calcularPension: (req, res) => {

        const meses = [
            {
                "desde": { dia: 1, mes: 1, anio: 2021 },
                "hasta": { dia: 31, mes: 3, anio: 2021 },
                "proporcionalMeses": 3,
                "aumento": 1,
                "minima": 19035.29,
                "os": 571.06,
            },
            {
                "desde": { dia: 1, mes: 3, anio: 2021 },
                "hasta": { dia: 31, mes: 5, anio: 2021 },
                "proporcionalMeses": 3,
                "aumento": 1.0807,
                "minima": 20571.44,
                "os": 617.14,
            },
            {
                "desde": { dia: 1, mes: 6, anio: 2021 },
                "hasta": { dia: 31, mes: 8, anio: 2021 },
                "proporcionalMeses": 3,
                "aumento": 1.1212,
                "minima": 23064.70,
                "os": 691.94,
            },
            {
                "desde": { dia: 1, mes: 9, anio: 2021 },
                "hasta": { dia: 30, mes: 11, anio: 2021 },
                "proporcionalMeses": 3,
                "aumento": 1.1239,
                "minima": 25922.42,
                "os": 777.67,
            },
            {
                "desde": { dia: 1, mes: 12, anio: 2021 },
                "hasta": { dia: 28, mes: 2, anio: 2022 },
                "proporcionalMeses": 3,
                "aumento": 1.1211,
                "minima": 29061.63,
                "os": 871.85,
            },
            {
                "desde": { dia: 1, mes: 3, anio: 2022 },
                "hasta": { dia: 31, mes: 5, anio: 2022 },
                "proporcionalMeses": 3,
                "aumento": 1.1228,
                "minima": 32630.40,
                "os": 978.91,
            },
            {
                "desde": { dia: 1, mes: 6, anio: 2022 },
                "hasta": { dia: 31, mes: 8, anio: 2022 },
                "proporcionalMeses": 3,
                "aumento": 1.15,
                "minima": 37524.96,
                "os": 1125.75,
            },
            {
                "desde": { dia: 1, mes: 9, anio: 2022 },
                "hasta": { dia: 30, mes: 11, anio: 2022 },
                "proporcionalMeses": 3,
                "aumento": 1.1553,
                "minima": 43352.59,
                "os": 1300.58,
            },
            {
                "desde": { dia: 1, mes: 12, anio: 2022 },
                "hasta": { dia: 28, mes: 02, anio: 2023 },
                "proporcionalMeses": 3,
                "aumento": 1.1562,
                "minima": 50124.26,
                "os": 1503.73,
            },
            {
                "desde": { dia: 1, mes: 3, anio: 2023 },
                "hasta": { dia: 31, mes: 5, anio: 2023 },
                "proporcionalMeses": 3,
                "aumento": 1.1704,
                "minima": 58665.43,
                "os": 1759.97,
            },
            {
                "desde": { dia: 1, mes: 6, anio: 2023 },
                "hasta": { dia: 31, mes: 8, anio: 2023 },
                "proporcionalMeses": 3,
                "aumento": 1.2092,
                "minima": 70938.24,
                "os": 2128.15,
            },
            {
                "desde": { dia: 1, mes: 9, anio: 2023 },
                "hasta": { dia: 30, mes: 11, anio: 2023 },
                "proporcionalMeses": 3,
                "aumento": 1.2329,
                "minima": 87459.76,
                "os": 2623.80,
            },
            {
                "desde": { dia: 1, mes: 12, anio: 2023 },
                "hasta": { dia: 28, mes: 02, anio: 2024 },
                "proporcionalMeses": 3,
                "aumento": 1.2087,
                "minima": 105712.61,
                "os": 3171.38,
            },
            {
                "desde": { dia: 1, mes: 03, anio: 2024 },
                "hasta": { dia: 31, mes: 03, anio: 2024 },
                "proporcionalMeses": 1,
                "aumento": 1.2718,
                "minima":134445.30,
                "os": 4033.36,
            },
            {
                "desde": { dia: 1, mes: 04, anio: 2024 },
                "hasta": { dia: 30, mes: 04, anio: 2024 },
                "proporcionalMeses": 1,
                "aumento": 1.2740,
                "minima":171283.31,
                "os": 5138.50,
            },
            {
                "desde": { dia: 1, mes: 05, anio: 2024 },
                "hasta": { dia: 31, mes: 05, anio: 2024 },
                "proporcionalMeses": 1,
                "aumento": 1.1101,
                "minima": 190141.60,
                "os": 5704.25,
            },
                 {
                "desde": { dia: 1, mes: 6, anio: 2024 },
                "hasta": { dia: 31, mes: 7, anio: 2024 },
                "proporcionalMeses": 2,
                "aumento": 1.0883,
                "minima": 206931.10,
                "os": 6207.93,
            },
        ];

        const mesesAguinaldo = [
            {
                "desde": { dia: 1, mes: 1, anio: 2021 },
                "hasta": { dia: 30, mes: 6, anio: 2021 },
                "tiempo": 0.5,
            },
            {
                "desde": { dia: 1, mes: 7, anio: 2021 },
                "hasta": { dia: 31, mes: 12, anio: 2021 },
                "tiempo": 0.5,
            },
            {
                "desde": { dia: 1, mes: 1, anio: 2022 },
                "hasta": { dia: 30, mes: 6, anio: 2022 },
                "tiempo": 0.5,
            },
            {
                "desde": { dia: 1, mes: 7, anio: 2022 },
                "hasta": { dia: 31, mes: 12, anio: 2022 },
                "tiempo": 0.5,
            },
            {
                "desde": { dia: 1, mes: 1, anio: 2023 },
                "hasta": { dia: 30, mes: 6, anio: 2023 },
                "tiempo": 0.5,
            },
            {
                "desde": { dia: 1, mes: 7, anio: 2023 },
                "hasta": { dia: 31, mes: 12, anio: 2023 },
                "tiempo": 0.5,
            },
            {
                "desde": { dia: 1, mes: 1, anio: 2024 },
                "hasta": { dia: 30, mes: 6, anio: 2024 },
                "tiempo": 0.5,
            },
        ];

        const datos = {
            nombre: req.body.titular, cuil: req.body.cuil, expediente: req.body.expediente, beneficio: req.body.beneficio,
            fechaInicial: req.body.dia + "/" + req.body.mes + "/" + req.body.anio, causante: req.body.causante, cuilcausante: req.body.cuilcausante, fechaFallecimiento: req.body.diaF + "/" + req.body.mesF + "/" + req.body.anioF,
        }
        const dia = parseInt(req.body.dia);
        const mes = parseInt(req.body.mes);
        const anio = parseInt(req.body.anio);
        let diaF = parseInt(req.body.diaF);

        const fipDias = [{ dia: dia, mes: mes, anio: anio }];
        const fip = [{ dia: dia, mes: mes, anio: anio }];

        //Formulas para crear nuevo array que comience desde la Fecha Inicial de Pago
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
        };

//        if (mesesCortados[0].desde.mes === 12 && mesesCortados[0].desde.anio === 2023) {
//            mesesCortados[0].proporcionalMeses = 3 + ((31 - mesesCortados[0].desde.dia) / 30)
//        };
    

        const datosHaberDevengado = {
            'PBU': parseFloat(req.body.PBU.replace(',', '.')),
            'PBUSentencia': parseFloat(req.body.PBUS.replace(',', '.')),
            'PC': parseFloat(req.body.PC.replace(',', '.')),
            'PAP': parseFloat(req.body.PAP.replace(',', '.')),
            'Complemento al minimo': parseFloat(req.body.minimo.replace(',', '.')),
            'Reparación Histórica': parseFloat(req.body.rh.replace(',', '.')),
            'Suplemento Dinerario': parseFloat(req.body.suplementoDinerario.replace(',', '.')),
            'OS': parseFloat(req.body.os.replace(',', '.')),
        };

        const datosFiltradosHaberDevengado = Object.fromEntries(
            Object.entries(datosHaberDevengado).filter(([key, value]) => value > 0 && key !== 'OS')
        );

        //Sumatoria de haber bruto del causante
        let brutoCausante = 0;

        for (const key in datosFiltradosHaberDevengado) {
            brutoCausante += datosFiltradosHaberDevengado[key];

        }

        //Haber real
        let pmr = 0;

        for (const key in datosFiltradosHaberDevengado) {
            if (key == 'PBU' || key == 'PC' || key == 'PAP' || key == 'PBUSentencia') {
                pmr += datosFiltradosHaberDevengado[key];
            }
        }

        //Asignación descuentos del haber
        let descuentoCausante = parseFloat(req.body.os.replace(',', '.'));


        let diaFA = 0;


        
        //Devengados

        if (req.body.devengados) {

            if (req.body.mesF == 12 || req.body.mesF == 6) {

                brutoCausante = ((brutoCausante / 30) * (diaF)) + (brutoCausante / 360) * (150 + diaF);
                descuentoCausante = (descuentoCausante / 30) * (diaF) + (descuentoCausante / 360) * (150 + diaF);
            } else {           
                    
            if (req.body.mesF == 2 || req.body.mesF == 8) {
              diaFA = 30;
            } 
            
            if (req.body.mesF == 3 || req.body.mesF == 9) {
              diaFA = 60;
            } 
            
             if (req.body.mesF == 4 || req.body.mesF == 10) {
              diaFA = 90;
            } 
            
            if (req.body.mesF == 5 || req.body.mesF == 11) {
              diaFA = 120;
            }
        
            brutoCausante = ((brutoCausante / 30) * (diaF)) + (brutoCausante * ((diaFA+diaF)/30/12))
            descuentoCausante = (descuentoCausante / 30) * (diaF) + (descuentoCausante * (diaFA+diaF)/30/12)
            
            }
        
}
    

        
        
        
        //Indebidos

        let indebidosCausante = 0;

        if (req.body.indebidos) {

            if (mes == 12 | mes == 6) {
                indebidosCausante = (((brutoCausante - descuentoCausante) / 30) * (31 - dia)) + ((brutoCausante - descuentoCausante) * ((31 - dia) / 30 / 12))
            } else {
                indebidosCausante = ((brutoCausante - descuentoCausante) / 30) * (31 - dia)
            }
        }

        // SCF
        let scf = 0;

        if (req.body.scf) {
            scf = 15000;
        }

        // Adquiere datos a través del body
        const datosIngresados = {
            'PBU': parseFloat(req.body.PBU.replace(',', '.')) * 0.7,
            'PBUSentencia': parseFloat(req.body.PBUS.replace(',', '.')) * 0.7,
            'PC': parseFloat(req.body.PC.replace(',', '.')) * 0.7,
            'PAP': parseFloat(req.body.PAP.replace(',', '.')) * 0.7,
        };

        // Se filtran datos mayor a cero
        const datosFiltrados = Object.fromEntries(
            Object.entries(datosIngresados).filter(([key, value]) => value > 0)
        );

        const valoresFiltrados = Object.values(datosFiltrados);

        let sumatoria = 0;
        let complementoAlMinimo = 0;
        let haberBruto = 0;
        let obraSocial = 0;

        for (let i = 0; i < valoresFiltrados.length; i++) {
            sumatoria += valoresFiltrados[i];
        }

        // If Para ver si es menor a la minima, en caso afirmativo la iguala.
        if (sumatoria < mesesCortados[0].minima) {
            complementoAlMinimo = mesesCortados[0].minima - sumatoria
            datosFiltrados.complementoAlMinimo = complementoAlMinimo;
        }
        haberBruto = sumatoria + parseFloat(complementoAlMinimo);
        obraSocial = (((haberBruto * 0.06) - mesesCortados[0].os));

        datosFiltrados.haberBruto = haberBruto
        datosFiltrados.ObraSocial = obraSocial

        // Fx para verificar conceptos
        function verificacionDeConceptos(anterior, actual, propiedad, aumento) {
            if (propiedad in anterior && anterior[propiedad] > 0) {
                actual[propiedad] = (anterior[propiedad] * aumento);
            }
        }

        // Con esto se edita mesesCortados y se introducen los nuevos datos del req.body
        const nuevoValor = {
            'desde': mesesCortados[0].desde,
            'hasta': mesesCortados[0].hasta,
            'proporcionalMeses': mesesCortados[0].proporcionalMeses,
            'minima': mesesCortados[0].minima,
            'os': mesesCortados[0].os,
            ...datosFiltrados,
        };

        mesesCortados[0] = nuevoValor;

        // Verifica mensuales y aplica aumentos 
        for (let i = 1; i < mesesCortados.length; i++) {
            const nuevoValor = {
                'desde': mesesCortados[i].desde,
                'hasta': mesesCortados[i].hasta,
                'proporcionalMeses': mesesCortados[i].proporcionalMeses,
                'minima': mesesCortados[i].minima,
                'os': mesesCortados[i].os,
            };

            verificacionDeConceptos(mesesCortados[i - 1], nuevoValor, 'PBU', mesesCortados[i].aumento);
            verificacionDeConceptos(mesesCortados[i - 1], nuevoValor, 'PBUSentencia', mesesCortados[i].aumento);
            verificacionDeConceptos(mesesCortados[i - 1], nuevoValor, 'PC', mesesCortados[i].aumento);
            verificacionDeConceptos(mesesCortados[i - 1], nuevoValor, 'PAP', mesesCortados[i].aumento);
            verificacionDeConceptos(mesesCortados[i - 1], nuevoValor, 'Complemento al minimo', mesesCortados[i].aumento);
            verificacionDeConceptos(mesesCortados[i - 1], nuevoValor, 'Reparación Histórica', mesesCortados[i].aumento);
            verificacionDeConceptos(mesesCortados[i - 1], nuevoValor, 'suplemento Dinerario', mesesCortados[i].aumento);
            verificacionDeConceptos(mesesCortados[i - 1], nuevoValor, 'complementoAlMinimo', mesesCortados[i].aumento);
            verificacionDeConceptos(mesesCortados[i - 1], nuevoValor, 'ObraSocial', mesesCortados[i].aumento);
            verificacionDeConceptos(mesesCortados[i - 1], nuevoValor, 'haberBruto', mesesCortados[i].aumento);
            mesesCortados[i] = nuevoValor;
        }

        const ultimoHaber = mesesCortados[mesesCortados.length - 1];

        let haberReal = 0;

        for (let key in ultimoHaber) {
            if (key === 'PBU' || key === 'PC' || key === 'PAP' || key === 'PBUSentencia') {
                haberReal.toFixed(2)
                haberReal += ultimoHaber[key];
            }
        }

        // Cálculo de retroactivos  
        for (let i = 0; i < mesesCortados.length; i++) {
            for (const key in mesesCortados[0]) {
                if (mesesCortados[i].hasOwnProperty(key) && datosFiltrados.hasOwnProperty(key)) {
                    const retroKey = key + 'Retro';
                    if (!(retroKey in mesesCortados[i])) {
                        const valorPropiedadActual = mesesCortados[i][key];
                        mesesCortados[i][retroKey] = (mesesCortados[i]['proporcionalMeses'] * valorPropiedadActual).toFixed(2);
                    }
                }
            }
        }

        // Objeto para almacenar sumatorias por tipo de propiedad
        const sumatoriasRetroactivos = {};

        // Sumatoria de retroactivos y discriminación por tipo de propiedad
        for (let i = 0; i < mesesCortados.length; i++) {
            for (const key in mesesCortados[i]) {
                if (key.endsWith('Retro')) {
                    const tipoPropiedad = key.slice(0, -5); // Elimina 'Retro' para obtener el tipo de propiedad
                    if (!(tipoPropiedad in sumatoriasRetroactivos)) {
                        sumatoriasRetroactivos[tipoPropiedad] = 0;
                    }
                    sumatoriasRetroactivos[tipoPropiedad] += parseFloat(mesesCortados[i][key]);
                }
            }
        }

        //Calculo de meses aguinaldo
        let indice;

        for (let i = 0; i < mesesAguinaldo.length; i++) {
            if (mesesAguinaldo[i].desde.anio == fipDias[0].anio && fipDias[0].mes >= mesesAguinaldo[i].desde.mes && fipDias[0].mes <= mesesAguinaldo[i].hasta.mes) {
                mesesAguinaldo[i].desde.dia = fipDias[0].dia;
                mesesAguinaldo[i].desde.mes = fipDias[0].mes;
                mesesAguinaldo[i].tiempo = (((((mesesAguinaldo[i].hasta.mes - mesesAguinaldo[i].desde.mes) * 30) + (31 - mesesAguinaldo[i].desde.dia)) / 30 / 12));
                indice = i;
            }
        }
        const nuevosMesesAguinaldo = mesesAguinaldo.slice(indice);

        

        //Acumuladores
        let aguinaldoTotal = 0;
        let aguinaldoOsTotal = 0;
        let aguinaldo2024 = 0;

        // Cruzo los dos objetos, aguinaldo con meses, a fin de encontrar el haber que se toma para el cálculo del aguinaldo

        if (mesesCortados[0].desde.anio != 2024) {
            for (let i = 0; i < nuevosMesesAguinaldo.length; i++) {
            for (let t = 0; t < mesesCortados.length; t++) {
                if (nuevosMesesAguinaldo[i].hasta.mes == mesesCortados[t].desde.mes && nuevosMesesAguinaldo[i].hasta.anio == mesesCortados[t].desde.anio) {
                    nuevosMesesAguinaldo[i].haberBruto = (mesesCortados[t].haberBruto * nuevosMesesAguinaldo[i].tiempo);
                    nuevosMesesAguinaldo[i].ObraSocial = (mesesCortados[t].ObraSocial * nuevosMesesAguinaldo[i].tiempo)
                } 
                }
        }        
}

        //Cálculo totales de aguinaldo
        for (let i = 0; i < nuevosMesesAguinaldo.length; i++) {
            aguinaldoTotal = (aguinaldoTotal + nuevosMesesAguinaldo[i].haberBruto)
            aguinaldoOsTotal = (aguinaldoOsTotal + nuevosMesesAguinaldo[i].ObraSocial)
        }



        

        res.render('pension', { datosIngresados, brutoCausante, descuentoCausante, pmr, indebidosCausante, scf, ultimoHaber, haberReal, nuevosMesesAguinaldo, mesesCortados, datos, aguinaldoTotal, aguinaldoOsTotal, sumatoriasRetroactivos, req });
    },
}


module.exports = pensionController;
