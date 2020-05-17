'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function(req,res){
    response.ok('APlikasi REST API berjalan',res)
}; 

//menampilkan semua data montir
exports.tampilsemuamontir = function(req, res){
    connection.query('SELECT * FROM t_montir', function(error, rows, fields){
        if(error){
            console.log(error);

        } else {
            response.ok(rows, res)
        }
    });
};
//menampilkan semua data sparepart
exports.tampilsemuasparepart = function(req, res){
    connection.query('SELECT * FROM t_sparepart', function(error, rows, fields){
        if(error){
            console.log(error);

        } else {
            response.ok(rows, res)
        }
    });
}; 

//menampilkan semua data montir berdasarkan id
exports.tampilberdasarkanidmontir = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM t_montir WHERE id_montir = ?', [id],
        function(error, rows, fields) {
            if(error) {
                console.log(error);
            } else {
                response.ok(rows, res)
            }
        });
};

//menampilkan semua data sparepart berdasarkan id
exports.tampilberdasarkanidsparepart = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM t_sparepart WHERE id_sparepart = ?', [id],
        function(error, rows, fields) {
            if(error) {
                console.log(error);
            } else {
                response.ok(rows, res)
            }
        });
};

//menambahkan data montir
exports.tambahMontir = function(req, res){
    var nama_montir = req.body.nama_montir;
    var harga_perjam = req.body.harga_perjam;

    connection.query('INSERT INTO t_montir (nama_montir,harga_perjam) VALUES(?,?)',
        [nama_montir, harga_perjam],
        function (error, rows, fields){
            if(error) {
                console.log(error);
            } else {
                response.ok("berhasil menambahkan data!",res)
            }  
        });
};

//menambahkan data sparepart
exports.tambahSparepart = function(req, res){
    var nama_sparepart = req.body.nama_sparepart;
    var harga_sparepart = req.body.harga_sparepart;
    var satuan = req.body.satuan;

    connection.query('INSERT INTO t_sparepart (nama_sparepart,harga_sparepart,satuan) VALUES(?,?,?)',
        [nama_sparepart, harga_sparepart, satuan],
        function (error, rows, fields){
            if(error) {
                console.log(error);
            } else {
                response.ok("berhasil menambahkan data!",res)
            }  
        });
};

//mengubah data montir berdasarkan id
exports.ubahMontir = function(req,res){
    var id_montir = req.body.id_montir;
    var nama_montir = req.body.nama_montir;
    var harga_perjam = req.body.harga_perjam;

    connection.query('UPDATE t_montir SET nama_montir=?, harga_perjam=? WHERE id_montir=?', [nama_montir,harga_perjam,id_montir],
    function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok("Berhasil ubah data",res)
        }
    });
};

//mengubah data sparepart berdasarkan id
exports.ubahSparepart = function(req,res){
    var id_sparepart = req.body.id_sparepart;
    var nama_sparepart = req.body.nama_sparepart;
    var harga_sparepart = req.body.harga_sparepart;
    var satuan = req.body.satuan;

    connection.query('UPDATE t_sparepart SET nama_sparepart=?, harga_sparepart=?, satuan=? WHERE id_sparepart=?', [nama_sparepart,harga_sparepart,satuan,id_sparepart],
    function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok("Berhasil ubah data",res)
        }
    });
};

//Menghapus data montir berdasarkan id
exports.hapusMontir = function (req, res) {
    var id = req.body.id_montir;

     connection.query('DELETE FROM t_montir WHERE id_montir=?',[id],
         function (error, rows, fields) {
             if (error) {
                 console.log(error);
             } else {
                 response.ok("Berhasil hapus data",res)
             }
         });
 };

 //Menghapus data sparepart berdasarkan id
exports.hapusSparepart = function (req, res) {
    var id = req.body.id_sparepart;

     connection.query('DELETE FROM t_sparepart WHERE id_sparepart=?',[id],
         function (error, rows, fields) {
             if (error) {
                 console.log(error);
             } else {
                 response.ok("Berhasil hapus data",res)
             }
         });
 };

 //menambahkan data service
exports.tambahservice = function (req, res) {
    var tgl_service = new Date();
    var id_user = req.body.id_user;
    var id_montir = req.body.id_montir;
    var jumlah_sparepart = req.body.jumlah_sparepart;
    var id_sparepart = req.body.id_sparepart;
    var jam_service = req.body.jam_service;
    var total_service = req.body.total_service;
    
    connection.query('INSERT INTO t_service (tgl_service, id_user, id_montir, jumlah_sparepart, id_sparepart, jam_service, total_service) VALUES(?,?,?,?,?,?,?)',
        [tgl_service, id_user, id_montir, jumlah_sparepart, id_sparepart, jam_service, total_service], 
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menambahkan Data", res)
            }
        });
};

//menambahkan data level
exports.tambahlevel = function (req, res) {
    var id_level = req.body.id_level;
    var nama_level = req.body.nama_level;



    connection.query('INSERT INTO t_level (id_level, nama_level) VALUES(?,?)',
        [id_level, nama_level], 
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menambahkan Data", res)
            }
        });
};