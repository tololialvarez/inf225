const express =require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Petición backend");
})

module.exports = router;