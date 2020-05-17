var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

//controller untuk register
exports.registrasi = function(req,res){
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }

    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["t_user","email", post.email];

    query = mysql.format(query,table);

    connection.query(query, function(error, rows) {
        if(error){
            console.log(error);

        }else {
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["t_user"];
                query = mysql.format(query,table);
                connection.query(query, post, function(error, rows){
                    if(error){
                        console.log(error);
                        
                    }else {
                        response.ok("Berhasil Menambahkan data user baru",res);

                    }
                });
            }else {
                response.ok("Email sudah tedaftar!",res);
            }
        }
    })
}

//controller untuk login
exports.login = function (req, res) {
    var post = {
        password: req.body.password,
        email: req.body.email
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["t_user", "password", md5(post.password), "email", post.email];

    query = mysql.format(query, table);
    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 1) {
                var token = jwt.sign({ rows }, config.secret, {
                    expiresIn: 1440
                });
                id_user = rows[0].id_user;

                var data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }

                var query = "INSERT INTO ?? SET ?";
                var table = ["access_token"];

                query = mysql.format(query, table);
                connection.query(query, data, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json({
                            success: true,
                            message: "Token JWT Tergenerate!",
                            token: token,
                            currUser: data.id_user
                        });
                    }
                });
            } else {
                res.json({ "Error": true, "Message": "Email atau password salah!" });
            }
        }
    });
}

exports.halamanrahasia = function(req,res){
    response.ok("Access Denied! Halaman ini hanya untuk user  dengan role 2",res);
}

//mengehitung harga total service
exports.totalservis = function (req, res) {
    connection.query('SELECT t_user.nama_user, t_servis.tgl_servis, t_montir.nama_montir, t_sparepart.nama_sparepart, t_sparepart.harga_sparepart, t_servis.jumlah_sparepart, (harga_perjam + jumlah_sparepart * harga_sparepart) AS total_harga FROM t_servis JOIN t_user JOIN t_montir JOIN t_sparepart WHERE t_servis.id_user = t_user.id_user AND t_servis.id_montir = t_montir.id_montir AND t_servis.id_sparepart = t_sparepart.id_sparepart ORDER BY t_user.id_user ',
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.oknested(rows, res);
            }
        }
    )

}  

//controller untuk input data user
exports.inputuser = function(req, res) {
    var post = {
        nama_user: req.body.nama_user,
        email: req.body.email,
        password: req.body.password
    }

    var query = "SELECT nama_user FROM ?? WHERE ??=?";
    var table = ["t_user", "nama_user", post.nama_user];

    query = mysql.format(query,table);

    connection.query(query, function(error,rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["t_user"];
                query = mysql.format(query,table);
                connection.query(query, post, function(error, rows){
                    if(error){
                        console.log(error);
                    }else{
                        response.ok("Berhasil menambahkan data User baru", res);
                    }
                });
            }else{
                response.ok("User sudah terdaftar!",res);
            }
        }
    });
};  

//mengubah data di tabel montir
exports.ubahmontir = function (req, res) {
    var id_montir = req.body.id_montir;
    var nama_montir = req.body.nama_montir;
    var harga_perjam = req.body.harga_perjam;

    connection.query('UPDATE t_montir SET nama_montir=?, harga_perjam=? WHERE id_montir=?', 
    [nama_montir, harga_perjam,id_montir],
        function (error) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Ubah Data Montir", res)
            }
        });
};

//mengubah data di tabel sparepart
exports.ubahsparepart = function (req, res) {
    var id_sparepart = req.body.id_sparepart;
    var nama_sparepart = req.body.nama_sparepart;
    var harga_sparepart = req.body.harga_sparepart;
    var satuan = req.body.satuan;

    connection.query('UPDATE t_sparepart SET nama_sparepart=?, harga_sparepart=?, satuan=? WHERE id_sparepart=?', 
    [nama_sparepart, harga_sparepart,satuan,id_sparepart],
        function (error) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Ubah Data Sparepart", res)
            }
        });
};

//ubah level
exports.ubahlevel = function (req, res) {
    var id_level = req.body.id_level;
    var nama_level = req.body.nama_level;    

    connection.query('UPDATE t_level SET nama_level=? WHERE id_level=?',
    [nama_level,id_level],

        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Level Berhasil Diubah", res);
            }
        });
};

//ubah servis
exports.ubahservis = function (req, res) {
    var id_servis = req.body.id_servis;
    var tgl_servis = req.body.tgl_servis;
    var id_user = req.body.id_user;
    var id_montir = req.body.id_montir;
    var jumlah_sparepart = req.body.jumlah_sparepart;
    var id_sparepart = req.body.id_sparepart;

    connection.query('UPDATE t_servis SET tgl_servis=?,id_user=?,id_montir=?,jumlah_sparepart=?,id_sparepart=? WHERE id_servis=?',
    [tgl_servis,id_user,id_montir,jumlah_sparepart,id_sparepart,id_servis],

        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Data Servis Berhasil Diubah", res);
            }
        });
};  

//ubah user
exports.ubahuser = function (req, res) {
    var id_user = req.body.id_user;
    var nama_user = req.body.nama_user;
    var email = req.body.email;    
    var password = req.body.password;
    var level = req.body.level;

    connection.query('UPDATE t_user SET nama_user=?,email=?,password=?,level=? WHERE id_user=?',
    [nama_user,email,password,level,id_user],

        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Data User Berhasil Diubah", res);
            }
        });
};