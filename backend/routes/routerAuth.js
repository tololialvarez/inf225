const express =require("express");
const {Usuario}=require("../models");
const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken");

const router = express.Router();
router.get("/register", async (req, res) =>{
    res.send("ruta encontrada");
})

router.post("/register", async (req, res) => {
   try {
        // Verificar si el email es nulo
        if (!req.body.email) {
            return res.status(400).json({ error: "El campo email no puede ser nulo" });
        }

        // Verificar si el rut es nulo
        if (!req.body.rut) {
            return res.status(400).json({ error: "El campo rut no puede ser nulo" });
        }
        
        // Verificar si el password es nulo
        if (!req.body.password) {
            return res.status(400).json({ error: "El campo password no puede ser nulo" });
        }

        const emailValid = await Usuario.findOne({
            where: {
                email: req.body.email,
            }
        });
        const rutValid = await Usuario.findOne({
            where: {
                rut: req.body.rut,
            }
        });
        if (emailValid) return res.status(400).json({ error: "Email ya existe" });
        if (rutValid) return res.status(400).json({ error: "Rut ya existe" });
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);
        const user = await Usuario.create({
            email: req.body.email,
            password: hashPass,
            rut: req.body.rut,
            nombre: req.body.nombre,
            esVendedor: req.body.esVendedor

        })
        return res.json({ message: "Registro exitoso" });
   } catch (error){
        return res.status(500).send(error);
   }
})
router.post("/login", async (req, res) => {
    try {
        const user = await Usuario.findOne({
            where: {
                email: req.body.email,
            }
        });
        if(!user) return res.status(400).json({ error: "Email incorrecto" });
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).json({ error: "Contraseña incorrecta" });
        const token =jwt.sign({rut:user.rut},process.env.SECRET_TOKEN)
        return res.header("auth-token",token).json({token:token ,message: "Login exitoso",user:user});
    } catch (error){
        return res.status(500).send(error); 
    }
})
module.exports = router;