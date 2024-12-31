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
    var resultadosDrop = document.getElementById('resultados_drop');
    var resultadosButtons = document.getElementById("resultados_final")
    
    document.getElementById('clasificacion_eq').innerText = clasificacion;

    if (clasificacion === "Clasificación por Riesgo"){
        resultadosDrop.innerHTML = "<button id='riesgo1'>Riesgo I</button> <button id='riesgo2a'>Riesgo IIa</button> <button id='riesgo2b'>Riesgo IIb</button> <button id='riesgo3'>Riesgo III</button>";
        resultadosButtons.innerHTML = "";
        var riesgo1 = document.getElementById('riesgo1');
        var riesgo2a = document.getElementById('riesgo2a');
        var riesgo2b = document.getElementById('riesgo2b');
        var riesgo3 = document.getElementById('riesgo3');

        riesgo1.addEventListener('click', function(){
            resultadosButtons.innerHTML = "<p>Resultados Riesgo I</p>";
        });
        riesgo2a.addEventListener('click', function(){
            resultadosButtons.innerHTML = "<p>Resultados Riesgo IIa</p>";
        });
        riesgo2b.addEventListener('click', function(){
            resultadosButtons.innerHTML = "<p>Resultados Riesgo IIb</p>";
        });
        riesgo3.addEventListener('click', function(){
            resultadosButtons.innerHTML = "<p>Resultados Riesgo III</p>";
        });

    } else if (clasificacion === "Clasificación por Funcionalidad"){
        resultadosDrop.innerHTML = "<button id='terapia'>Terapia</button> <button id='diagnostico'>Diagnóstico</button> <button id='soporte'>Soporte Vital</button>";
        resultadosButtons.innerHTML = "";
        var terapia = document.getElementById('terapia');
        var diagnostico = document.getElementById('diagnostico');
        var soporte = document.getElementById('soporte');

        terapia.addEventListener('click', function(){
            resultadosButtons.innerHTML = "<p>Resultados Terapia</p>";
        });
        diagnostico.addEventListener('click', function(){
            resultadosButtons.innerHTML = "<p>Resultados Diagnóstico</p>";
        });
        soporte.addEventListener('click', function(){
            resultadosButtons.innerHTML = "<p>Resultados Soporte Vital</p>";
        });
    } else {
        resultadosDrop.innerHTML = "";
    }
}


// Función para realizar la solicitud y mostrar en la búsqueda


// Función para color en los botones activos