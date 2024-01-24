const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://datos_nf4r_user:F0UCioJs60QYobtLbDY7Xded7VkhYRYy@dpg-cl24k68p2gis7381s7bg-a/datos_nf4r',
});

const mostrarFormulario = (req, res) => {
  res.render('formulario');
};

const guardarDatos = (req, res) => {
  const {
    operador,
    tramite,
    turno,
    edad,
    sicaSolicitud,
    sicamFecha,
    sicamDatos,
    otroBeneficio,
    empresasEnRiesgo,
    aut1,
    desempleo,
    programasSociales,
    otrosExpedientes,
    serviciosSICA,
    fip,
    observaciones,
    estado // Nueva columna 'datos' añadida
  } = req.body;

  const query = `
    INSERT INTO supervision (
      operador,
      tramite,
      turno,
      edad,
      sica_solicitud,
      sicam_fecha,
      sicam_datos,
      otro_beneficio,
      empresas_en_riesgo,
      aut1,
      desempleo,
      programas_sociales,
      otros_expedientes,
      servicios_sica,
      fip,
      observaciones,
      estado
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
  `;

  const values = [
    operador,
    tramite,
    turno,
    edad ,
    sicaSolicitud ,
    sicamFecha,
    sicamDatos ,
    otroBeneficio ,
    empresasEnRiesgo ,
    aut1 ,
    desempleo ,
    programasSociales ,
    otrosExpedientes ,
    serviciosSICA ,
    fip,
    observaciones,
    estado, // Agregar el valor de 'datos' aquí
  ];

  pool.query(query, values, (err, result) => {
    if (err) {
      res.send('Error al guardar los datos.');
    } else {
      res.redirect('/supervisiones/tabla');
    }
  });
};

const obtenerSupervisionDesdeLaBaseDeDatos = async () => {
  try {
    const result = await pool.query('SELECT * FROM supervision');
    return result.rows;
  } catch (error) {
    console.error('Error al obtener supervisiones desde la base de datos:', error);
    return [];
  }
};

const mostrarTablaSupervisiones = async (req, res) => {
  const supervisions = await obtenerSupervisionDesdeLaBaseDeDatos();
  res.render('tablaSupervisiones', { supervisions });
};

const actualizarSupervisionEnBaseDeDatos = async (idSupervision, nuevosDatos) => {
  try {
    const {
      operador,
      tramite,
      turno,
      edad,
      sicaSolicitud,
      sicamFecha,
      sicamDatos,
      otroBeneficio,
      empresasEnRiesgo,
      aut1,
      desempleo,
      programasSociales,
      otrosExpedientes,
      serviciosSICA,
      fip,
      observaciones,
      estado, // Nueva columna 'datos' añadida
    } = nuevosDatos;

    const query = `
      UPDATE supervision
      SET operador = $1, tramite = $2, turno = $3, edad = $4, sica_solicitud = $5, sicam_fecha = $6, sicam_datos = $7, otro_beneficio = $8, empresas_en_riesgo = $9, aut1 = $10, desempleo = $11, programas_sociales = $12, otros_expedientes = $13, servicios_sica = $14, fip = $15, observaciones = $16, estado = $17
      WHERE id = $18
    `;

    const values = [
      operador,
      tramite,
      turno,
      edad ,
      sicaSolicitud ,
      sicamFecha,
      sicamDatos ,
      otroBeneficio ,
      empresasEnRiesgo,
      aut1 ,
      desempleo,
      programasSociales,
      otrosExpedientes ,
      serviciosSICA ,
      fip,
      observaciones,
      estado, // Agregar el valor de 'datos' aquí
      idSupervision,
    ];

    const client = await pool.connect();
    await client.query(query, values);
    client.release();
  } catch (error) {
    console.error('Error al actualizar supervisión en la base de datos:', error);
    throw error;
  }
};

const mostrarFormularioEdicion = async (req, res) => {
  try {
    const idSupervision = req.params.id;
    const supervisions = await obtenerSupervisionDesdeLaBaseDeDatos();
    
    const supervision = supervisions.find((s) => s.id === parseInt(idSupervision));

    console.log('Supervisión:', supervision);

    res.render('formularioEdicion', { supervision:supervision });
  } catch (error) {
    console.error('Error al mostrar formulario de edición:', error);
    res.status(500).send('Error interno del servidor');
  }
};

const actualizarSupervision = async (req, res) => {
  try {
    const idSupervision = req.params.id;
    const {
      operador,
      tramite,
      turno,
      edad,
      sicaSolicitud,
      sicamFecha,
      sicamDatos,
      otroBeneficio,
      empresasEnRiesgo,
      aut1,
      desempleo,
      programasSociales,
      otrosExpedientes,
      serviciosSICA,
      fip,
      observaciones,
      estado, // Nueva columna 'datos' añadida
    } = req.body;

    await actualizarSupervisionEnBaseDeDatos(idSupervision, {
      operador,
      tramite,
      turno,
      edad,
      sicaSolicitud,
      sicamFecha,
      sicamDatos,
      otroBeneficio,
      empresasEnRiesgo,
      aut1,
      desempleo,
      programasSociales,
      otrosExpedientes,
      serviciosSICA,
      fip,
      observaciones,
      estado, // Agregar el valor de 'datos' aquí
    });

    res.redirect('/supervisiones/tabla');
  } catch (error) {
    console.error('Error al actualizar supervisión:', error);
    res.status(500).send('Error interno del servidor');
  }
};

const mostrarDetalleSupervision = async (req, res) => {
  try {
    const idSupervision = req.params.id;
    const supervision = await obtenerSupervisionDesdeLaBaseDeDatosPorId(idSupervision);

    if (!supervision) {
      return res.status(404).send('Supervisión no encontrada');
    }

    res.render('detalleSupervision', { supervision });
  } catch (error) {
    console.error('Error al mostrar detalle de supervisión:', error);
    res.status(500).send('Error interno del servidor');
  }
};

const obtenerSupervisionDesdeLaBaseDeDatosPorId = async (idSupervision) => {
  try {
    const result = await pool.query('SELECT * FROM supervision WHERE id = $1', [idSupervision]);
    return result.rows[0]; // Se asume que el ID es único, por lo tanto, toma solo el primer resultado.
  } catch (error) {
    console.error('Error al obtener supervisión por ID desde la base de datos:', error);
    return null;
  }
};



module.exports = {
  mostrarFormulario,
  guardarDatos,
  mostrarTablaSupervisiones,
  mostrarFormularioEdicion,
  actualizarSupervision,
  obtenerSupervisionDesdeLaBaseDeDatosPorId ,
  mostrarDetalleSupervision,
};
