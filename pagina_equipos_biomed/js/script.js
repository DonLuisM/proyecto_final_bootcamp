// Función para validar contenido en el input de búsqueda
function buscarVacio(){
    var buscar = document.getElementById('buscar').value;
    var resultadosDiv = document.getElementById('resultados_busq');

    if(buscar === ""){
        resultadosDiv.innerHTML = "<p style='color: red'>Por favor, ingrese el nombre de un equipo</p>";
    } else {
        resultadosDiv.innerHTML = `<p>Resultados encontrados para: <b>${buscar}</b></p>`;
        localStorage.setItem('busqueda', buscar);
        return true;
    }
}
// ? Me falta revisar bien la parte de almacenamiento de resultados, para pasar de inicio a búsqueda con el input del usuario y las validaciones previas en inicio

// Función para la clasificación seleccionada y mostrar botones ocultos
function elegirClasif(clasificacion) {
    document.getElementById('clasificacion_eq').innerText = clasificacion;

    // Acciones de botones ocultos al seleccionar la clasificación
}


// Función para realizar la solicitud y mostrar en la búsqueda


// Función para color en los botones activos