
fetch('../json/datos.json')
    .then(response => response.json())
    .then(data => {
        let resultados = document.getElementById('resultados');
        data.forEach(usuario => {
            resultados.innerHTML += `<p>Edad: ${usuario.descripcion}, Ciudad:
${usuario.precio}</p>`;
        });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));

