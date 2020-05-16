'use strict';

module.exports = function(app) {
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);

    app.route('/tampilmontir')
        .get(jsonku.tampilsemuamontir);

    app.route('/tampilsparepart')
        .get(jsonku.tampilsemuasparepart);

    app.route('/tampilmontir/:id')
        .get(jsonku.tampilberdasarkanidmontir);

    app.route('/tampilsparepart/:id')
        .get(jsonku.tampilberdasarkanidsparepart);

    app.route('/tambahmontir')
        .post(jsonku.tambahMontir);

    app.route('/tambahsparepart')
        .post(jsonku.tambahSparepart);

    app.route('/ubahmontir')
        .put(jsonku.ubahMontir);
 
    app.route('/ubahsparepart')
        .put(jsonku.ubahSparepart);
} 
