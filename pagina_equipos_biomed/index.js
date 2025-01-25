// const express = require("express");
// const mysql = require("mysql2/promise");
// const bodyParser = require("body-parser");

// const app = express();
// const port = 3000;

// // Middleware para parsear el cuerpo de la solicitud como JSON
// app.use(bodyParser.json());

// // Configura la conexión a la base de datos
// const db = mysql.createPool({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "",
//     database: "proyecto_bootcamp"
// });


// app.post("/registro", async (req, res) => {
//     const { username, languageUser, email, password } = req.body;

//     try {
//         const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email])
//         const [row] = await db.query("SELECT * FROM usuarios WHERE username = ?", [username])
//         if (rows.length > 0){
//             return res.status(400).send("El email ya está registrado.")
//         } else if (row.length > 0){
//             return res.status(400).send("El nombre de usuario ya está registrado.")
//         }
//         await db.query("INSERT INTO usuarios (username, languageUser, email, password) VALUES (?, ?, ?, ?)", [username, languageUser, email, password]);
//         console.table(result);
//         console.log("Lenguaje agregado correctamente");
//         res.status(201).send("Usuario registrado correctamente.");
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Error al registrar al usuario.");
//     }

// })

// const getUsers = async () => {
//     try {
//         const [result] = await db.query("SELECt id, username, languageUser, email, password FROM usuarios")
//         console.table(result);
//         console.log("Usuarios obtenidos correctamente");
//     } catch (error) {
//         console.error(error);
//     }
// }

// getUsers();

// // Inicia el servidor
// app.listen(port, () => {
//     console.log(`Servidor corriendo en http://localhost:${port}`);
// });

const express = require("express");
const path = require("path");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 3001;

// Middleware para parsear el cuerpo de la solicitud como JSON y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta "Frontend"
app.use(express.static(path.join(__dirname, 'Frontend')));

// Configuración de la base de datos
const db = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "proyecto_bootcamp"
});

// Ruta para cargar la página principal
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'Frontend/pages/ingresa.html'));
});

// Ruta para la búsqueda de equipos
app.get('/equipos/buscar', async (req, res) => {
    try {
        const equipo = req.query.equipo;

        if (!equipo || equipo.trim() === '') {
            return res.status(400).send("Debe ingresar un nombre de equipo.");
        }

        const [rows] = await db.query("SELECT * FROM equipos WHERE equipo LIKE ?", [`%${equipo}%`]);

        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).send("No se encontraron equipos.");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al buscar equipos.");
    }
})

// Ruta para el registro
app.post('/registro', async (req, res) => {
    const { username, languageUser, email, password } = req.body;

    try {
        // Verificar si ya existe el correo o el nombre de usuario
        const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        const [row] = await db.query("SELECT * FROM usuarios WHERE username = ?", [username]);

        if (rows.length > 0) {
            return res.status(400).send("El email ya está registrado.");
        } else if (row.length > 0) {
            return res.status(400).send("El nombre de usuario ya está registrado.");
        }

        // Insertar nuevo usuario
        const [result] = await db.query("INSERT INTO usuarios (username, languageUser, email, password) VALUES (?, ?, ?, ?)", [username, languageUser, email, password]);
        res.status(201).send("Usuario registrado correctamente.");
        console.table(result);
        getUsers();
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al registrar al usuario.");
    }
});


// Ruta para el inicio de sesión
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe y la contraseña es correcta
        const [rows] = await db.query("SELECT * FROM usuarios WHERE email =? AND password =?", [email, password]);

        if (rows.length === 0) {
            return res.status(401).send("Contraseña o correo incorrecto.");
        }

        res.status(200).send("Sesión iniciada correctamente.");
        console.table("Inicio de sesión usuario", rows)
        getUsers();
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al iniciar sesión.");
    }
});

app.put("/update", async (req, res) => {
    const { email, newPassword } = req.body;  // Cambié "password" por "newPassword"

    try {
        const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(404).send("El usuario no existe.");
        }

        // Aquí actualizamos la contraseña con el valor de "newPassword"
        await db.query("UPDATE usuarios SET password = ? WHERE email = ?", [newPassword, email]);

        res.status(200).send("Contraseña actualizada correctamente.");
        console.log("Usuario actualizado correctamente.");
        getUsers();
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al actualizar al usuario.");
    }
});

app.get('/equipos/:equipo', (req, res) => {

})

const getUsers = async () => {
    try {
        const [result] = await db.query("SELECt id, username, languageUser, email, password FROM usuarios")
        console.table(result);
    } catch (error) {
        console.error(error);
    }
}

app.listen(PORT, function () {
    console.log(`Servidor creado http://localhost:${PORT}`);
});

