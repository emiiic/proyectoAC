const configuracionFirebase = {
    apiKey: "AIzaSyAs9p5O1xIMr9xhjZtstlNZXvjT5b3W08o",
    authDomain: "esp32cam-e79b2.firebaseapp.com",
    projectId: "esp32cam-e79b2",
    storageBucket: "esp32cam-e79b2.appspot.com",
    messagingSenderId: "73119737410",
    appId: "1:73119737410:web:320905d6a60b01ad43efdb"
};
  
firebase.initializeApp(configuracionFirebase);
const autenticacion = firebase.auth();
const baseDatos = firebase.firestore();

// Inicio de sesión
function iniciarSesion() {
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;
    
    autenticacion.signInWithEmailAndPassword(correo, contrasena)
      .then(() => {
        document.getElementById('seccion-inicio-sesion').style.display = 'none';
        document.getElementById('seccion-menu').style.display = 'block';
      })
      .catch(error => {
        document.getElementById('error-inicio-sesion').textContent = "Error al iniciar sesión. Revisa tus datos.";
      });
}

// Cierre de sesión
function cerrarSesion() {
    autenticacion.signOut().then(() => {
      document.getElementById('seccion-inicio-sesion').style.display = 'block';
      document.getElementById('seccion-menu').style.display = 'none';
      ocultarSecciones();
    });
}

// Mostrar una sección específica
function mostrarSeccion(seccion) {
    ocultarSecciones();
    document.getElementById(`seccion-${seccion}`).style.display = 'block';
    
    if (seccion === 'estudiantes') {
        cargarEstudiantes();
    }
}

// Ocultar todas las secciones
function ocultarSecciones() {
    document.querySelectorAll('.seccion-contenido').forEach(seccion => seccion.style.display = 'none');
}

// Cargar los estudiantes desde Firestore
function cargarEstudiantes() {
    const listaEstudiantes = document.getElementById('lista-estudiantes');
    listaEstudiantes.innerHTML = '';
    
    baseDatos.collection('Estudiantes').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const estudiante = doc.data();
            const li = document.createElement('li');
            li.textContent = `${estudiante.nombre} - ${estudiante.codigo}`;
            listaEstudiantes.appendChild(li);
        });
    });
}

// Volver al menú principal
function volver() {
    ocultarSecciones();
    document.getElementById('seccion-menu').style.display = 'block';
}

// Guardar horario de entrada
function guardarHorario() {
    const horario = document.getElementById('horario-entrada').value;
    alert(`Horario guardado: ${horario}`);
}

