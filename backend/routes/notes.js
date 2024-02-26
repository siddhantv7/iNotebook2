const express = require('express');
const router = express.Router();


router.get('/', (req, res)=>{
    obj = {username: "rawadc",emial: "skjdncj@hkdsnc.com", password: "lkjascn"}
    res.json(obj);
});

module.exports = router;