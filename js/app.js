let DB;

// selectores de la interfaz
const form = document.querySelector("form"),
  nombreMascota = document.querySelector("#mascota"),
  nombreCliente = document.querySelector("#cliente"),
  telefono = document.querySelector("#telefono"),
  fecha = document.querySelector("#fecha"),
  hora = document.querySelector("#hora"),
  sintomas = document.querySelector("#sintomas"),
  citas = document.querySelector("#citas"),
  headingAdministra = document.querySelector("#administra");

// esperamos al DOM ready
document.addEventListener("DOMContentLoaded", () => {
  let crearDB = window.indexedDB.open("citas", 1);

  crearDB.onerror = function() {
    console.log("Hubo un error");
  };

  crearDB.onsuccess = function() {
    DB = crearDB.result;
  };
  // este método sólo corre una vez
  crearDB.onupgradeneeded = function(e) {
    // el evento es la misma bbdd
    let db = e.target.result;
    // definimos el objectstore
    let objectStore = db.createObjectStore("citas", {
      keyPath: "key",
      autoIncrement: true
    });
    objectStore.createIndex("mascota", "mascota", { unique: false });
    objectStore.createIndex("cliente", "mascota", { unique: false });
    objectStore.createIndex("telefono", "telefono", { unique: false });
    objectStore.createIndex("fecha", "fecha", { unique: false });
    objectStore.createIndex("hora", "hora", { unique: false });
    objectStore.createIndex("sintomas", "sintomas", { unique: false });
    console.log("Base de datos creada y lista");
  };
  // Cuando se envía el formulario
  form.addEventListener("submit", agregarDatos);

  function agregarDatos(e) {
    e.preventDefault();
    const nuevaCita = {
      mascota: nombreMascota.value,
      cliente: nombreMascota.value,
      telefono: telefono.value,
      fecha: fecha.value,
      hora: hora.value,
      sintomas: sintomas.value
    };
    let transaction = DB.transaction(["citas"], "readwrite");
    let objectStore = transaction.objectStore("citas");
    let peticion = objectStore.add(nuevaCita);
    peticion.onsuccess = () => {
      form.reset();
    };
    transaction.oncomplete = () => {
      console.log("Cita agregada");
    };
    transaction.onerror = () => {
      console.log("HUBO UN ERROR");
    };
    console.log(peticion);
  }
});
