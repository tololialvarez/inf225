const express=require("express");
const router = express.Router();
const {prestamo, Usuario}=require("../models");
const verifySign=require("./verifyToken");
const bodyParser = require("body-parser");
const axios = require('axios');
const { all } = require("./routerBack");
const app=express();
app.use(bodyParser.json());


router.get("/test", async (req, res) => {
    try {
        const allPrestamos = await prestamo.findAll({
            attributes: [
                "id",
                "tasa",
                "valor_uf",
                "plazo",
                "cuota_uf",
                "total",
                "valor_credito",
                "rut_cliente",
                "createdAt",
                "updatedAt",
            ],
        });
        res.send(allPrestamos);
    } catch (error) {
        res.status(400).send("Error al hacer una query a la db."+error);
    }
})

router.get("/ver", async (req, res) => {
    const user=JSON.parse(req.query.user);
    const esVendedor=user.esVendedor;
    const rut=user.rut;
    try {
        if (esVendedor) {
            // Si es un vendedor, recupera todos los préstamos
            const allPrestamos = await prestamo.findAll({
                attributes: [
                    "id",
                    "tasa",
                    "valor_uf",
                    "plazo",
                    "cuota_uf",
                    "total",
                    "valor_credito",
                    "rut_cliente",
                    "createdAt",
                    "updatedAt",
                ],
            });
            res.send(allPrestamos);
        } else {
            // Si no es vendedor, filtra los préstamos por el RUT del usuario autenticado
            const userPrestamos = await prestamo.findAll({
                where: {
                    rut_cliente: rut // Filtra por el campo 'rut' en la tabla Prestamo
                },
                attributes: [
                    "id",
                    "tasa",
                    "valor_uf",
                    "plazo",
                    "cuota_uf",
                    "total",
                    "valor_credito",
                    "rut_cliente",
                    "createdAt",
                    "updatedAt",
                ],
            });
            res.send(userPrestamos);
        }
    } catch (error) {
        res.status(400).send("Error al hacer una query a la db.");
    }
})

//ruta dinamica
/*router.get("/:parametro", async (req, res) => {
    try {
        
    } catch (error) {
        res.status(400).send("Error al hacer una query a la db.");
    }
})*/

const APIkey = "b022097785bd0cdef5584ef20e77d252876995ea";

router.post("/generar", async (req, res) => {
    console.log(req.body);
    try {
        const clienteValid = await Usuario.findByPk(req.body.rut_cliente);
        if (!clienteValid) return res.status(400).json({error:"Cliente no existe."});

        const ufResponse = await axios.get("https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey="
        +APIkey+"&formato=json");
        //console.log(ufResponse);
        const valor_uf_s = ufResponse.data.UFs[0].Valor;
        
        // Eliminar el separador de miles y reemplazar la coma por un punto
        const valor_uf = parseFloat(valor_uf_s.replace(/\./g, '').replace(',', '.'));
        
        const tasa = parseFloat(req.body.tasa);
        const plazo = parseFloat(req.body.plazo);
        const valor_credito = parseFloat(req.body.valor_credito);
        const cuota_uf = calcularCuotaUF(tasa, plazo, valor_credito);
        const total = calcularTotal(cuota_uf, plazo);
        const rut = parseInt(req.body.rut_cliente);
        params = {
            tasa:tasa,
            valor_uf:valor_uf, // Calculado previamente
            plazo:plazo,
            cuota_uf:cuota_uf, // Calculado previamente
            total:total, // Calculado previamente
            valor_credito:valor_credito,
            rut_cliente:req.body.rut_cliente,
        }
        console.log(params);
        const createPrestamo = await prestamo.create(params,{
            returning: ["id", "tasa", "valor_uf", "plazo", "cuota_uf", "total", "valor_credito", "rut_cliente", "createdAt", "updatedAt"]
        }
            );
        return res.send(createPrestamo);
    } catch (error){
        return res.status(500).send(error);
    }
})

function calcularCuotaUF(tasa, plazo, valor_credito) {
    // Realizar el cálculo de la cuota_uf aquí
    var a = (1-(1+tasa)**(-plazo));
    var dem = a/tasa;
    return valor_credito/dem;
}

function calcularTotal(cuota_uf, plazo) {
    return cuota_uf*plazo;
}

module.exports = router;