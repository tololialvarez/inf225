const express=require("express");
const { Op } = require("sequelize");
const router = express.Router();
const {Usuario}=require("../models");

router.get("/", async (req, res) => {
    try {
        const allUsers = await Usuario.findAll({
            where: {
                esVendedor: false
            }
        });; //retorna users en .json
        res.send(allUsers);
    } catch (error) {
        res.status(400).send("Error al hacer una query a la db.");
    }
})

router.get("/all", async (req, res) => {
    try {
        const allUsers = await Usuario.findAll(
        );//retorna users en .json
        res.send(allUsers);
    } catch (error) {
        res.status(400).send("Error al hacer una query a la db.");
    }
})

//ruta dinamica
router.get("/:parametro", async (req, res) => {
    try {
        const parametro = req.params.parametro;

        // Verificar si el parámetro es un rut (números)
        const esRut = /^[0-9]+$/.test(parametro);

        let whereClause;
        if (esRut) {
            whereClause = {
                rut: parametro,
                esVendedor: false
            };
        } else {
            whereClause = {
                nombre: {
                    [Op.iLike]: `%${parametro}%`
                },
                esVendedor: false
            };
        }

        const allUsers = await Usuario.findAll({
            where: whereClause
        }); //retorna users en .json
        console.log(req.params);
        res.send(allUsers);
    } catch (error) {
        res.status(400).send("Error al hacer una query a la db.");
    }
})

router.post("/", async (req, res) => {
    try {
        const createUser = await Usuario.create(req.body);
        res.send(createUser);
    } catch (error){
        res.status(400).send("Error al crear un usuario.");
    }
})


module.exports = router;