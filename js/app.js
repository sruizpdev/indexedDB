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
    mostarCitas();
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
      mostarCitas();
    };
    transaction.onerror = () => {
      console.log("HUBO UN ERROR");
    };
    console.log(peticion);
  }
  function mostarCitas() {
    // Eliminamos las citas anteriores
    while (citas.firstChild) {
      citas.removeChild(citas.firstChild);
    }
    let objectStore = DB.transaction("citas").objectStore("citas");

    objectStore.openCursor().onsuccess = function(e) {
      let cursor = e.target.result;
      if (cursor) {
        let citaHTML = document.createElement("li");
        citaHTML.setAttribute("data-cita-id", cursor.value.key);
        citaHTML.classList.add("list-group-item");
        citaHTML.innerHTML = `
          <p class="font-weight-bold">Mascota: <span class="font-weight-normal">${cursor.value.mascota}</span></p>
          <p class="font-weight-bold">Cliente: <span class="font-weight-normal">${cursor.value.cliente}</span></p>
          <p class="font-weight-bold">Teléfono: <span class="font-weight-normal">${cursor.value.telefono}</span></p>
          <p class="font-weight-bold">Fecha: <span class="font-weight-normal">${cursor.value.fecha}</span></p>
          <p class="font-weight-bold">Hora: <span class="font-weight-normal">${cursor.value.hora}</span></p>
          <p class="font-weight-bold">Sintomas: <span class="font-weight-normal">${cursor.value.sintomas}</span></p>
        `;
        citas.appendChild(citaHTML);
        cursor.continue();
      } else {
        if(!citas.firstChild){
          headingAdministra.textContent = 'Agrega citas para comenzar';
          let listado = document.createElement('p');
          listado.classList.add('text-center');
          listado.textContent = 'No hay registros';
          citas.appendChild(listado);
        } else {
          headingAdministra.textContent = 'Administra tus citas';
        }
      }
    };
  }
});
