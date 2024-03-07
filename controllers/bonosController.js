const bonosController = {
    mostrarBonos(req, res) {
        const bonos = [
            { Mes: "ago-21", Concepto: "2-735-364", Monto: 5000, Circular: "DP Nº 29/21", Abonar: false },
            { Mes: "dic-21", Concepto: "2-735-365", Monto: 8000, Circular: "DP Nº 51/21", Abonar: false },
            { Mes: "abr-22", Concepto: "2-735-366", Monto: 6000, Circular: "DP Nº 12/22", Abonar: false },
            { Mes: "may-22", Concepto: "2-735-367", Monto: 12000, Circular: "DP Nº 13/22", Abonar: "on" },
            { Mes: "sep-22", Concepto: "2-735-368", Monto: 7000, Circular: "DP N º 32/22", Abonar: false },
            { Mes: "oct-22", Concepto: "2-735-368", Monto: 7000, Circular: "DP N º 32/22", Abonar: false },
            { Mes: "nov-22", Concepto: "2-735-368", Monto: 7000, Circular: "DP N º 32/22", Abonar: false },
            { Mes: "dic-22", Concepto: "2-735-369", Monto: 10000, Circular: "DP Nº 52/22", Abonar: false },
            { Mes: "ene-23", Concepto: "2-735-369", Monto: 10000, Circular: "DP Nº 52/22", Abonar: false },
            { Mes: "feb-23", Concepto: "2-735-369", Monto: 10000, Circular: "DP Nº 52/22", Abonar: false },
            { Mes: "mar-23", Concepto: "2-735-370", Monto: 15000, Circular: "DP Nº 12/23", Abonar: false },
            { Mes: "abr-23", Concepto: "2-735-370", Monto: 15000, Circular: "DP Nº 12/23", Abonar: false },
            { Mes: "may-23", Concepto: "2-735-370", Monto: 15000, Circular: "DP Nº 12/23", Abonar: false },
            { Mes: "jun-23", Concepto: "2-735-371", Monto: 15000, Circular: "DP Nº 31/23", Abonar: false },
            { Mes: "jul-23", Concepto: "2-735-371", Monto: 17000, Circular: "DP Nº 35/23", Abonar: false },
            { Mes: "ago-23", Concepto: "2-735-371", Monto: 20000, Circular: "DP Nº 44/23", Abonar: false },
            { Mes: "sep-23", Concepto: "2-735-372", Monto: 37000, Circular: "DP N º 54/23", Abonar: false },
            { Mes: "oct-23", Concepto: "2-735-372", Monto: 37000, Circular: "DP N º 54/23", Abonar: false },
            { Mes: "nov-23", Concepto: "2-735-372", Monto: 37000, Circular: "DP N º 54/23", Abonar: false },
            { Mes: "dic-23", Concepto: "2-135-374", Monto: 55000, Circular: "DP Nº 71/23", Abonar: false },
            { Mes: "ene-24", Concepto: "2-135-376", Monto: 55000, Circular: "DP N° 01/24", Abonar: false },
            { Mes: "feb-24", Concepto: "2-135-377", Monto: 55000, Circular: "DP N° 03/24", Abonar: false },
            { Mes: "mar-24", Concepto: "2-135-378", Monto: 70000, Circular: "DP N° 13/24", Abonar: false }
        ];


        res.render('bonos', { bonos: bonos });
    },

    calcularTotal(req, res) {

        const datos = {
            nombre: req.body.titular, cuil: req.body.cuil, expediente: req.body.expediente, beneficio: req.body.beneficio
        }

        const indiceBonos = []
        for (let i = 0; i < 30; i++) {
            if (req.body[`Bono${i}`] !== undefined) {
                indiceBonos.push(i)
            }
        }

        const bonos1 = [
            { Mes: "ago-21", Concepto: "2-735-364", Monto: 5000, Circular: "DP Nº 29/21" },
            { Mes: "dic-21", Concepto: "2-735-365", Monto: 8000, Circular: "DP Nº 51/21" },
            { Mes: "abr-22", Concepto: "2-735-366", Monto: 6000, Circular: "DP Nº 12/22" },
            { Mes: "may-22", Concepto: "2-735-367", Monto: 12000, Circular: "DP Nº 13/22" },
            { Mes: "sep-22", Concepto: "2-735-368", Monto: 7000, Circular: "DP N º 32/22", bono: "368" },
            { Mes: "oct-22", Concepto: "2-735-368", Monto: 7000, Circular: "DP N º 32/22", bono: "368" },
            { Mes: "nov-22", Concepto: "2-735-368", Monto: 7000, Circular: "DP N º 32/22", bono: "368" },
            { Mes: "dic-22", Concepto: "2-735-369", Monto: 10000, Circular: "DP Nº 52/22", bono: "369" },
            { Mes: "ene-23", Concepto: "2-735-369", Monto: 10000, Circular: "DP Nº 52/22", bono: "369" },
            { Mes: "feb-23", Concepto: "2-735-369", Monto: 10000, Circular: "DP Nº 52/22", bono: "369" },
            { Mes: "mar-23", Concepto: "2-735-370", Monto: 15000, Circular: "DP Nº 12/23", bono: "370" },
            { Mes: "abr-23", Concepto: "2-735-370", Monto: 15000, Circular: "DP Nº 12/23", bono: "370" },
            { Mes: "may-23", Concepto: "2-735-370", Monto: 15000, Circular: "DP Nº 12/23", bono: "370" },
            { Mes: "jun-23", Concepto: "2-735-371", Monto: 15000, Circular: "DP Nº 31/23", Abonar: false },
            { Mes: "jul-23", Concepto: "2-735-371", Monto: 17000, Circular: "DP Nº 35/23", Abonar: false },
            { Mes: "ago-23", Concepto: "2-735-371", Monto: 20000, Circular: "DP Nº 44/23", Abonar: false },
            { Mes: "sep-23", Concepto: "2-735-372", Monto: 37000, Circular: "DP N º 54/23", Abonar: false },
            { Mes: "oct-23", Concepto: "2-735-372", Monto: 37000, Circular: "DP N º 54/23", Abonar: false },
            { Mes: "nov-23", Concepto: "2-735-372", Monto: 37000, Circular: "DP N º 54/23", Abonar: false },
            { Mes: "dic-23", Concepto: "2-135-374", Monto: 55000, Circular: "DP Nº 71/23", Abonar: false },
            { Mes: "ene-24", Concepto: "2-135-376", Monto: 55000, Circular: "DP N° 01/24", Abonar: false },
            { Mes: "feb-24", Concepto: "2-135-377", Monto: 55000, Circular: "DP N° 03/24", Abonar: false },
            { Mes: "mar-24", Concepto: "2-135-378", Monto: 70000, Circular: "DP N° 13/24", Abonar: false }
        ];

       

        const bonos = indiceBonos.map(indiceBonos => bonos1[indiceBonos]);

        for (let i = 0; i < bonos.length - 1; i++) {
            if (bonos[i].Concepto === bonos[i + 1].Concepto) {
                bonos[i+1].Monto = bonos[i+1].Monto + bonos[i].Monto
                bonos.splice(i, 1);
            }
        }

        for (let i = 0; i < bonos.length - 1; i++) {
            if (bonos[i].Concepto === bonos[i + 1].Concepto) {
                bonos[i+1].Monto = bonos[i+1].Monto + bonos[i].Monto
                bonos.splice(i, 1);
            }
        }



        console.log(bonos)


        res.render('bonosResult', { bonos: bonos, datos } );
    }

}

module.exports = bonosController;
