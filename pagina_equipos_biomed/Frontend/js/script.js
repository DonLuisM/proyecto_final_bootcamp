// Constantes 
const languageButts = document.getElementById('idioma');
const textChange = document.querySelectorAll("[data-section]");

const filterButtons = document.querySelectorAll('.bots_filt');
const cards = document.querySelectorAll('.card');

const modals = document.querySelectorAll('.modal');
const btnAbrirModal = document.querySelectorAll('.boton_modal');
const btnCerrarModal = document.querySelectorAll('.cerrar_modal');

// Constantes LogIn
const cuadro_logins = document.querySelector('.cuadro_login');
const loginSect = document.querySelector('.login_link');
const registerSect = document.querySelector('.register_link');
const newPass = document.querySelector('.new_pass');
const backLogin = document.querySelector('.back_login');
const borderAlert = document.querySelector('.input_box');


// Función para cambiar el idioma de la página
function cambiarIdioma() {
    const idiomaSeleccionado = languageButts.value;

    fetch(`/data/idioma/${idiomaSeleccionado}.json`)


        .then(res => res.json())
        .then(data => {
            // Actualizar los elementos con los datos del JSON
            textChange.forEach((elemento) => {
                const section = elemento.dataset.section;
                const value = elemento.dataset.value;
                elemento.innerHTML = data[section][value];

            });
        })
}
languageButts.addEventListener("change", cambiarIdioma);

// Función para validar contenido en el input de búsqueda (en index.html, y Busqueda.html)
// Para el index.html
function busquedaHome() {
    const primerBuscar = document.getElementById('buscar')
    const btnBuscar = document.getElementById('btn_buscar');
    const resultadosDiv = document.getElementById('resultados');

    if (!btnBuscar || !primerBuscar) return;

    btnBuscar.addEventListener('click', () => {
        const buscar = primerBuscar.value.trim();
        resultadosDiv.innerHTML = '';

        if (buscar === "") {
            resultadosDiv.innerHTML = "<p style='color: red; margin-top: 1em; margin-bottom: -5px'>Por favor, ingrese el nombre de un equipo</p>";
            primerBuscar.classList.add('error_borde');
        } else {
            localStorage.setItem('busqueda', buscar);
            window.location.href = 'pages/busqueda.html';
        }
    })
}

// Para el busqueda.html
function manejarBusquedaResultados() {
    const buscarPage = document.getElementById('buscar');
    const btnBuscar = document.getElementById('btn_buscar');
    const resultadosDiv = document.getElementById('resultados_busq');
    const equipoBuscado = localStorage.getItem('busqueda');
    const resultadosBD = document.getElementById('resultados_equipos_busq');

    if (!resultadosDiv || !buscarPage || !btnBuscar) return;

    // Manejo de búsquedas almacenadas
    if (equipoBuscado) {
        resultadosDiv.innerHTML = `<p>Resultados encontrados para: <b>${equipoBuscado}</b></p>`;
        buscarPage.value = equipoBuscado; // Mostrar el término anterior
        // ! Llamar a la API y ponerlo en resultadosBD
        realizarBusquedaEquipo(equipoBuscado);
    } else {
        resultadosDiv.innerHTML = "<p style='color: red'>No se ingresó ningún término de búsqueda.</p>";
        buscarPage.classList.add('error_borde');
        resultadosBD.innerHTML = '';
    }

    // Manejar nuevas búsquedas
    btnBuscar.addEventListener('click', () => {
        const buscar = buscarPage.value.trim();
        resultadosDiv.innerHTML = "";
        resultadosBD.innerHTML = '';

        if (buscar === "") {
            resultadosDiv.innerHTML = "<p style='color: red'>Por favor, ingrese el nombre de un equipo</p>";
            buscarPage.classList.add('error_borde');
            resultadosBD.innerHTML = '';

        } else {
            buscarPage.classList.remove('error_borde');
            localStorage.setItem('busqueda', buscar); // Actualizar localStorage
            resultadosDiv.innerHTML = `<p>Resultados encontrados para: <b>${buscar}</b></p>`;
            // ! Llamar a la API y ponerlo en resultadosBD
            realizarBusquedaEquipo(buscar);
        }
    });
}

function realizarBusquedaEquipo(buscar) {
    const resultadosBD = document.getElementById('resultados_equipos_busq');
    const resultadosDiv = document.getElementById('resultados_busq');

    fetch(`/equipos/buscar?equipo=${encodeURIComponent(buscar)}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                resultadosBD.innerHTML = '';
                data.forEach(equipo => {
                    // const manualServicio = equipo.doc_tecnica.manualServicio;
                    // const manualUsuario = equipo.doc_tecnica.manualUsuario;
                    // const guiaRapida = equipo.doc_tecnica.guiaRapida;
                    resultadosBD.innerHTML += `
                        <div class="equipment_cards">
                            <div class="card_busqueda">
                            <h3>${equipo.equipo}</h3>
                                <img src="${equipo.image_equipo}" alt="Imagen ${equipo.marca}" class="img_busqueda"/>
                                <p><strong>Marca:</strong> ${equipo.marca}</p>
                                <p><strong>Modelo:</strong> ${equipo.modelo}</p>
                                <p><strong>Descripción:</strong> ${equipo.descripcion}</p>
                                <p><strong>Categoría:</strong> ${equipo.categoria}</p>
                                <p><strong>Clasificación de Riesgo:</strong> ${equipo.clasificacion_riesgo}</p>
                                <p><strong>Parámetros de medición:</strong> ${equipo.parametros_med}</p>
                                <p><strong>Aplicaciones Clínicas:</strong> ${equipo.aplicaciones_clinicas}</p>
                                <p><strong>Vida útil estimada:</strong> ${equipo.vida_util_est}</p>
                                <p><strong>Documentación:</strong> ${equipo.doc_tecnica}</p>
                            </div>
                        </div>
                    `
                });
            } else {
                resultadosDiv.innerHTML = '<p>No se encontró ningún equipo con ese nombre.</p>';
                resultadosBD.innerHTML = '';
            }
        })
        .catch(err => {
            console.error('Error:', err);
            resultadosDiv.innerHTML = '<p>Hubo un error al buscar el equipo.</p>';
            resultadosBD.innerHTML = '';
        })
}


// Evento para actuar dependiendo la página
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname; // Me sirve para devolver la ruta del archivo que está siendo mostrando en el navegador

    if (path.includes('index.html')) {
        busquedaHome();
    } else if (path.includes('busqueda.html')) {
        manejarBusquedaResultados();
    }
})

// Función de Filtrado
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(`Botón de filtro presionado: ${button.getAttribute('data-filter')}`);
        filterButtons.forEach(btn => btn.classList.remove('active')); // Remover clase active de todos los botones
        button.classList.add('active'); // Agregar clase active al botón clickeado

        const filterValue = button.getAttribute('data-filter');

        cards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');

            if (filterValue === 'todos' || categories.includes(filterValue)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Funciones del Modal
btnAbrirModal.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        modals[index].showModal();
    })
})

btnCerrarModal.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        modals[index].close();
    })
})

// Eventos click registrar, iniciar sesión, cambio contraseña
document.addEventListener('DOMContentLoaded', () => {
    if (registerSect) {
        registerSect.addEventListener('click', () => {
            cuadro_logins.classList.add('active_user');
            cuadro_logins.classList.remove('active_forgot');
        });
    }

    if (loginSect) {
        loginSect.addEventListener('click', () => {
            cuadro_logins.classList.remove('active_user');
            cuadro_logins.classList.remove('active_forgot');
        });
    }

    if (newPass) {
        newPass.addEventListener('click', () => {
            cuadro_logins.classList.add('active_forgot');
            cuadro_logins.classList.remove('active_user');
        });
    }

    if (backLogin) {
        backLogin.addEventListener('click', () => {
            cuadro_logins.classList.remove('active_forgot');
            cuadro_logins.classList.remove('active_user');
        });
    }
})

// Capturar el evento submit del formulario de login
document.getElementById("login_form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (response.ok) {
            Swal.fire({
                title: 'Bienvenido!',
                text: 'Has iniciado sesión correctamente.',
                icon: 'success',
                confirmButtonText: 'Continuar',
                timer: 1500,
                timerProgressBar: true,
                customClass: {
                    title: 'title_alert',
                    text: 'text_alert'
                },
            }).then((result) => {
                if (result.isConfirmed || result.dismiss) {
                    window.location.href = '/index.html';
                }
            });
        } else {
            Swal.fire({
                title: '¡Oops!',
                text: 'El correo o la contraseña son incorrectos.',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo',
                timer: 1500,
                timerProgressBar: true,
                customClass: {
                    title: 'title_alert',
                    text: 'text_alert'
                }
            })
        }

    } catch (error) {
        console.error(error);
        alert('Error al iniciar sesión');
    }
});

document.getElementById("register_form").addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const languageUser = document.getElementById('languageUser').value;
    const email = document.getElementById('registerCorreo').value;
    const password = document.getElementById('registerPassword').value;

    console.log(username, languageUser, email, password);

    try {
        const response = await fetch('/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                languageUser,
                email,
                password
            })
        });

        if (response.ok) {
            Swal.fire({
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                icon: 'success',
                title: 'Felicidades!',
                text: 'Te has registrado correctamente',
                customClass: {
                    title: 'title_alert',
                    text: 'text_alert'
                }
            }).then((result) => {
                if (result.isConfirmed || result.dismiss) {
                    window.location.href = '/index.html';
                }
            });
        } else {
            Swal.fire({
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                icon: 'error',
                title: '¡Oops!',
                text: 'Hubo un problema al registrar el usuario.',
                customClass: {
                    title: 'title_alert',
                    text: 'text_alert'
                }
            });
        }

    } catch (error) {
        console.error('Error al registrarse', error);
        alert('Error al registrarse');
    }
});

document.getElementById("newPass_form").addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('forgotCorreo').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmNewPassword').value;

    try {
        if (newPassword !== confirmPassword) {
            Swal.fire({
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                icon: 'error',
                title: 'Oops!',
                text: 'Parece que las contraseñas no coinciden',
                customClass: {
                    title: 'title_alert',
                    text: 'text_alert'
                }
            });
            return;
        }
        const response = await fetch('/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                newPassword
            })
        });

        if (response.ok) {
            Swal.fire({
                showConfirmButton: true,
                timer: 1500,
                timerProgressBar: true,
                icon: 'success',
                title: '¡Éxito!',
                text: 'El cambio de contraseña ha sido actualizado correctamente.',
                customClass: {
                    title: 'title_alert',
                    text: 'text_alert'
                }
            }).then((result) => {
                if (result.isConfirmed || result.dismiss) {
                    window.location.href = '/index.html';
                }
            });
        } else {
            Swal.fire({
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                icon: 'error',
                title: '¡Oops!',
                text: 'El correo no se encuentra en la base de datos.',
                customClass: {
                    title: 'title_alert',
                    text: 'text_alert'
                }
            });
        }
    } catch (err) {
        console.error(err);
        alert('Error al actualizar la contraseña');
    }
})


