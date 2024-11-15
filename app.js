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
  
  //inicio de sesión
  function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('menu-section').style.display = 'block';
      })
      .catch(error => {
        document.getElementById('login-error').textContent = "Error al iniciar sesión. Revisa tus datos.";
      });
  }
  
  //cierre de sesión
  function logout() {
    auth.signOut().then(() => {
      document.getElementById('login-section').style.display = 'block';
      document.getElementById('menu-section').style.display = 'none';
      hideSections();
    });
  }
  
  //para mostrar una sección específica
  function showSection(section) {
    hideSections();
    document.getElementById(${section}-section).style.display = 'block';
    
    if (section === 'estudiantes') {
      loadEstudiantes();
    }
  }
  
  //ocultar todas las secciones
  function hideSections() {
    document.querySelectorAll('.content-section').forEach(section => section.style.display = 'none');
  }
  
  //cargar los estudiantes desde Firestore
  function loadEstudiantes() {
    const estudiantesList = document.getElementById('estudiantes-list');
    estudiantesList.innerHTML = '';
    
    db.collection('Estudiantes').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const estudiante = doc.data();
        const li = document.createElement('li');
        li.textContent = ${estudiante.nombre} - ${estudiante.codigo};
        estudiantesList.appendChild(li);
      });
    });
  }
  
  //volver al menú principal
  function goBack() {
    hideSections();
    document.getElementById('menu-section').style.display = 'block';
  }
  
  //guardar horario de entrada
  function saveHorario() {
    const horario = document.getElementById('horario-entrada').value;
    alert(Horario guardado: ${horario});
  }
  
  //mostrar una sección específica y ocultar el menú
function showSection(section) {
    hideSections(); 
    document.getElementById(${section}-section).style.display = 'block';
    document.getElementById('menu-section').style.display = 'none'; 
    
    if (section === 'estudiantes') {
      loadEstudiantes();
    }
  }
  
  // volver al menú principal
  function goBack() {
    hideSections(); 
    document.getElementById('menu-section').style.display = 'block'; 
  }


