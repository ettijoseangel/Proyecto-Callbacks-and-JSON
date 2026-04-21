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
        <td><button onclick="eliminarLibro('${libro.titulo}')">🗑️</button></td>
        `;
        tabla.appendChild(fila);
    });

}

//Para capturar el botón de envío
const btnAgregar = document.getElementById('btnAgregar');

btnAgregar.addEventListener('click', () => {
    //Creamos el objeto con los datos agregados
    const nuevoLibro = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        genero: document.getElementById('genero').value,
        disponible: true // Por defecto estará disponible
    };

    // Validamos que no envie campos vacios
    if (nuevoLibro.titulo && nuevoLibro.autor) {
        agregarLibro(nuevoLibro);

        //Limpiamos los inputs para el siguiente libro
        document.getElementById('titulo').value = '';
        document.getElementById('autor').value = '';
        document.getElementById('genero').value = '';
    } else {
        alert("Por favor, llena al menos el título y el autor.");
    }
});


// Función para agregar libros a SheetDB
async function agregarLibro(libro) {
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: [libro] }) // SheetDB requiere este formato { data: [...] }
        });

        if (respuesta.ok) {
            alert("Nuevo libro agregado!!!");
            tabla_libros(); //Recargamos la tabla para ver el cambio
        }
    } catch (error) {
        console.log("Error al guardar el libro:", error);
    }
    
}

// Funcion extra: Borrar libro
async function eliminarLibro(titulo) {
    try {
        const respuesta = await fetch (`${API_URL}/titulo/${titulo}`, {
            method: 'DELETE',
        });

        if (respuesta.ok) {
            alert(`"${titulo}" ha sido removido de la estantería.`);
            tabla_libros(); //Recargamos la tabla
        }
    } catch (error) {
        console.error("Error al eliminar:", error);
    }
}


// Ejecutar al cargar la página
tabla_libros();