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

  crearDB.onupgradeneeded = function(e){
      let db = e.target.result;
      console.log(db);
      
  }


});
