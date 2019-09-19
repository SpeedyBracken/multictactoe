const router = require("express").Router()


router.get("/api", (req, res, next) => {
    res.send("API is working properly")
})

module.exports = router