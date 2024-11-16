const firebaseConfig = {
    apiKey: "AIzaSyAs9p5O1xIMr9xhjZtstlNZXvjT5b3W08o",
    authDomain: "esp32cam-e79b2.firebaseapp.com",
    projectId: "esp32cam-e79b2",
    storageBucket: "esp32cam-e79b2.appspot.com",
    messagingSenderId: "73119737410",
    appId: "1:73119737410:web:320905d6a60b01ad43efdb"
  };
  
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  // inicio de sesión
  function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        document.getElementById('login-seccion').style.display = 'none';
        document.getElementById('menu-seccion').style.display = 'block';
      })
      .catch(error => {
        document.getElementById('login-error').textContent = "Error al iniciar sesión. Revisa tus datos.";
      });
  }
  
  // cierre de sesión
  function cerrarSesion() {
    auth.signOut().then(() => {
      document.getElementById('login-seccion').style.display = 'block';
      document.getElementById('menu-seccion').style.display = 'none';
      ocultarSecciones();
    });
  }
  
  // mostrar una sección específica
  function mostrarSeccion(seccion) {
    ocultarSecciones();
    document.getElementById(`${seccion}-seccion`).style.display = 'block';
    
    if (seccion === 'estudiantes') {
      cargarEstudiantes();
    }
  }
  
  // ocultar todas las secciones
  function ocultarSecciones() {
    document.querySelectorAll('.contenido-seccion').forEach(seccion => seccion.style.display = 'none');
  }
  
  // cargar los estudiantes
  function cargarEstudiantes() {
    const listaEstudiantes = document.getElementById('estudiantes-lista');
    listaEstudiantes.innerHTML = '';
  
    db.collection('Estudiantes').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const estudiante = doc.data();
        const li = document.createElement('li');
        li.textContent = `${estudiante.apellidos} ${estudiante.nombres} - ${estudiante.codigo}`;
        listaEstudiantes.appendChild(li);
      });
    });
  }

  // Registrar un nuevo estudiante en Firestore
function registrarEstudiante() {
  const nombres = document.getElementById('nombres').value;
  const apellidos = document.getElementById('apellidos').value;
  const codigo = document.getElementById('codigo').value;

  if (nombres && apellidos && codigo) {
    db.collection('Estudiantes').add({
      nombres,
      apellidos,
      codigo
    }).then(() => {
      document.getElementById('registro-mensaje').textContent = "Estudiante registrado con éxito.";
      setTimeout(() => document.getElementById('registro-mensaje').textContent = "", 3000);
    }).catch(() => {
      document.getElementById('registro-mensaje').textContent = "Error al registrar el estudiante.";
    });
  } else {
    document.getElementById('registro-mensaje').textContent = "Por favor, completa todos los campos.";
  }
}

// buscar estudiante por código
function buscarEstudiante() {
  const codigoBuscado = document.getElementById('buscador-codigo').value.trim();
  const listaEstudiantes = document.getElementById('estudiantes-lista');
  listaEstudiantes.innerHTML = ''; // Limpiar resultados anteriores

  if (codigoBuscado) {
    // Buscar en Firestore el estudiante con el código específico
    db.collection('Estudiantes').where('codigo', '==', codigoBuscado).get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          const li = document.createElement('li');
          li.textContent = `No se encontró ningún estudiante con el código: ${codigoBuscado}`;
          listaEstudiantes.appendChild(li);
        } else {
          querySnapshot.forEach((doc) => {
            const estudiante = doc.data();
            const li = document.createElement('li');
            li.textContent = `${estudiante.apellidos} ${estudiante.nombres} - ${estudiante.codigo}`;
            listaEstudiantes.appendChild(li);
          });
        }
      })
      .catch(error => {
        console.error("Error al buscar el estudiante: ", error);
      });
  } else {
    alert("Por favor, ingresa un código para buscar.");
  }
}

  // volver al menú principal
  function regresar() {
    ocultarSecciones();
    document.getElementById('menu-seccion').style.display = 'block';
  } 
  
  // Guardar horario de entrada
  function guardarHorario() {
    const horario = document.getElementById('horario-entrada').value;
    alert(`Horario guardado: ${horario}`);
  }
  
  // mostrar una sección específica y ocultar el menú
function mostrarSeccion(seccion) {
  ocultarSecciones();
    document.getElementById(`${seccion}-seccion`).style.display = 'block'; 
    document.getElementById('menu-seccion').style.display = 'none';
    
    if (seccion === 'estudiantes') {
      cargarEstudiantes(); 
    }
  }
  
  // Volver al menú principal
  function regresar() {
    ocultarSecciones(); 
    document.getElementById('menu-seccion').style.display = 'block'; 
  }
