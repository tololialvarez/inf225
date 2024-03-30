const express= require("express");
require("dotenv").config();
const cors = require("cors"); 

const app=express();
// Permite todas las solicitudes CORS desde cualquier origen
app.use(cors());
const db = require('./models');
db.sequelize.sync().then(() => {
    console.log('Database synced.');
  });

const routerBack = require("./routes/routerBack")
const routerUsers = require("./routes/routerUsers")
const routerAuth = require("./routes/routerAuth")
const routerPrestamos = require("./routes/routerPrestamos");

// middleware
const PORT = process.env.PORT || 3000;
const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';
app.use(express.json());
app.use("/back", routerBack);
app.use("/Users", routerUsers);
app.use("/auth", routerAuth);
app.use("/solicitudes", routerPrestamos);

// rutas
app.get("/", (req, resp) => {
    resp.send("ay");
});


// servidor
app.get("/api", (req, res) => {
    res.json({ message: "Hola desde el servidor!" });
  });

app.listen(PORT, ()=>{
    console.log("Server activo");
});

