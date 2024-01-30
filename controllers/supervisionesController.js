const { Pool } = require('pg');

const pool = new Pool({
  // connectionString: 'postgres://datos_nf4r_user:F0UCioJs60QYobtLbDY7Xded7VkhYRYy@dpg-cl24k68p2gis7381s7bg-a/datos_nf4r',
  connectionString: 'postgres://datos_nf4r_user:F0UCioJs60QYobtLbDY7Xded7VkhYRYy@dpg-cl24k68p2gis7381s7bg-a.oregon-postgres.render.com/datos_nf4r',
  ssl: true,

});



const mostrarFormulario = (req, res) => {


  res.render('formulario');
};

const mostrarFormularioRapido = (req, res) => {
  res.render('formularioRapido');
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
    estado
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
  ];

  console.log('Supervisión:', req.body.turno);



  pool.query(query, values, (err, result) => {
    if (err) {
      res.send('Error al guardar los datos.');
    } else {
      res.redirect('/supervisiones/tabla');
    }
  });
};

const cerradosDiaAnterior = async (req, res) => {
  const hoy = new Date();
  const ayer = new Date(hoy);
  ayer.setDate(hoy.getDate() - 1);

  // Formatear la fecha de ayer en el formato de la base de datos "YYYY-MM-DD"
  const fechaAyer = ayer.toISOString().split('T')[0];

  try {
    const supervisionsResult = await pool.query('SELECT * FROM supervision WHERE turno = $1 AND estado = $2', [fechaAyer, 'Cerrado']);

    // Extraer el array de supervisions de supervisionsResult.rows
    const supervisions = supervisionsResult.rows;

    // Renderizar la vista con las supervisions
    res.render('cerradosDiaAnterior', { supervisions });
  } catch (error) {
    console.error('Error al obtener supervisiones:', error);
    // Renderizar una vista de error en caso de un error
    res.render('error', { message: 'Error al obtener supervisiones' });
  }
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

const obtenerSupervisionesPorEstado = async (estado) => {
  try {
    const supervisions = await pool.query('SELECT * FROM supervision WHERE estado = $1', [estado]);
    return supervisions.rows; // Retornar solo las filas de resultados
  } catch (error) {
    console.error('Error al obtener supervisiones por estado:', error);
    throw error;
  }
};

const mostrarTablaSupervisiones = async (req, res) => {
  try {
    const devueltos = await obtenerSupervisionesPorEstado('Devuelto');
    const paraCerrar = await obtenerSupervisionesPorEstado('Ok - Para cerrar');
    const pendienteSupervision = await obtenerSupervisionesPorEstado('Pendiente supervisión');
    const cerrado = await obtenerSupervisionesPorEstado('Cerrado');

    res.render('tablaSupervisiones', { devueltos, paraCerrar, pendienteSupervision, cerrado });
  } catch (error) {
    console.error('Error al mostrar tabla de supervisiones:', error);
    res.status(500).send('Error interno del servidor');
  }
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

    console.log(supervision.turno)


    res.render('formularioEdicion', { supervision: supervision });
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
  obtenerSupervisionDesdeLaBaseDeDatosPorId,
  mostrarDetalleSupervision,
  obtenerSupervisionesPorEstado,
  mostrarFormularioRapido,
  cerradosDiaAnterior,
};
