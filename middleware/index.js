var express = require('express');
var auth = require("./auth");
var router = express.Router();




//daftarkan menu registrasi
router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);


router.get('/api/v1/totalservis', auth.totalservis);


//alamat yang perlu otorisasi
router.get('/api/v1/rahasia', verifikasi(), auth.halamanrahasia);
router.get('/api/v1/rahasia1', verifikasi(), auth.halamanrahasia1);

router.post('/api/v1/inputuser',verifikasi(), auth.registrasi);


router.put('/api/v1/ubahmontir',verifikasiadmin(), auth.ubahmontir);

module.exports = router;