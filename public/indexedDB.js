// Abrir la base de datos
const request = indexedDB.open('miBaseDeDatos', 1);

request.onerror = function(event) {
  console.log('Error al abrir la base de datos');
};

request.onupgradeneeded = function(event) {
  // Configurar la estructura del almacén de objetos
  const db = event.target.result;
  const objectStore = db.createObjectStore('miAlmacen', { keyPath: 'id' });

  // Puedes agregar un índice si es necesario
  // objectStore.createIndex('nombreIndice', 'campoIndexado', { unique: false });

  // Agregar datos al almacén de objetos
  objectStore.put({ id: 1, nombre: 'Ejemplo', edad: 30 });
  objectStore.put({ id: 2, nombre: 'Otro Ejemplo', edad: 25 });
};

request.onsuccess = function(event) {
  console.log('Base de datos abierta con éxito');
};
