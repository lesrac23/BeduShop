const router = require("express").Router();

router.get('/', (req, res) => {
    res.send("Bienvenido al Sistema Drones")
})

router.use('/elements', require('./element'));
router.use('/flightlogs', require('./flightlog'));
module.exports = router;