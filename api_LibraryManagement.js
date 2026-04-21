const API_URL = '';

// Función para obtener datos reales de Google Sheets
async function obtenerLibros() {
    try {
        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();
        console.log("Datos recibidos de SheetDB:", datos);
        return datos;
    } catch (error) {
        console.error("Error al conectar con la API:", error);
    }
}

// Función para cargar libros desde la SheetDB al HTML
async function tabla_libros() {
    const libros = await obtenerLibros();
    const tabla = document.getElementById('lista-libros');

    // Limpiamos la tabla antes de agregar más datos
    tabla.innerHTML = '';

    libros.forEach(libro => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td>${libro.genero}</td>
        <td>${String(libro.disponible).toUpperCase() === 'TRUE' ? '✅' : '❌' }</td>
        `;
        tabla.appendChild(fila);
    });

}



// Ejecutar al cargar la página
tabla_libros();