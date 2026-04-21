// Datos iniciales de libros en formato JSON
let biblioteca = {
  libros: [
    {
      titulo: "Cien años de soledad",
      autor: "Gabriel García Márquez",
      genero: "Realismo mágico",
      disponible: true,
    },
    {
      titulo: "1984",
      autor: "George Orwell",
      genero: "Distopía",
      disponible: true,
    },
  ],
};

// Función para simular la lectura de datos (asimilar la lectura de un archivo JSON)
function leerDatos(callback) {
  setTimeout(() => {
    // Aquí simulas leer el JSON con un retraso de 1 segundo
    callback(biblioteca);
  }, 1000);
}

// Función para mostrar todos los libros en consola
function mostrarLibros() {
  leerDatos((datos) => {
    console.log("Inventario de libros:");
    datos.libros.forEach((libro, index) => {
      console.log(
        `${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.disponible ? "Disponible" : "Prestado"})`,
      );
    });
  });
}

// Función para agregar un nuevo libro
function agregarLibro(titulo, autor, genero, disponible, callback) {
  const nuevoLibro = { titulo, autor, genero, disponible };

  setTimeout(() => {
    biblioteca.libros.push(nuevoLibro);
    callback(`Éxito: El libro "${titulo}" ha sido agregado.`);
  }, 1000);
}

// Función para cambiar la disponibilidad de un libro
function actualizarDisponibilidad(titulo, nuevoEstado, callback) {
  // Simula un retraso antes de actualizar la disponibilidad
  setTimeout(() => {
    const libro = biblioteca.libros.find((libro) => libro.titulo === titulo);
    if (libro) {
        libro.disponible = nuevoEstado;
        callback(`Estado de "${titulo}" actualizado.`);
    } else{
        callback(`Error: El libro "${titulo}" no se encontró.`);
    }
  }, 1000);
}

// Ejemplo de cómo ejecutar la aplicación
// mostrarLibros();
// agregarLibro("El principito", "Antoine de Saint-Exupéry", "Fábula", true);
// actualizarDisponibilidad("1984", false);



// ***** Ejemplo de ejecución ******

// 1. Agregamos un libro
agregarLibro("El principito", "Antoine de Saint-Exupéry", "Fábula", true, (mensaje) => {
    console.log(mensaje);

    // 2. CUANDO se termine de agregar, actualizamos otro
    actualizarDisponibilidad("1984", false, (msjActualizacion) => {
        console.log(msjActualizacion);

        // 3. FINALMENTE, mostramos el inventario completo para ver los cambios
        mostrarLibros();
    });
});