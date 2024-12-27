// Función para validar contenido en el input
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
// Función para realizar la solicitud y mostrar en la búsqueda


// Función para color en los botones activos