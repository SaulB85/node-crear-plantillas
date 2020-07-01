const fs = require('fs');
const { codigo } = require('../codigo-archivos/codigo');
const colors = require('colors');

const existeArchivo = (path) => {
    try {
        return fs.statSync(path).isFile();
    } catch (e) {
        return false;
    }
};

const crearCarpetas = (path) => {
    fs.mkdir(path, { recursive: true }, (err) => {
        if (err) throw err;
    });
};

const crearArchivo = (path, datos, mensaje = 'Se creo el archivo') => {
    fs.writeFile(path, datos, (err) => {
        if (err) throw err;
        console.log(`${mensaje} ${path}`.green);
    });
}

const actualizarArchivo = (path, actualizarDatos) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) throw err;
        let archivo = data;
        archivo += actualizarDatos;

        crearArchivo(path, archivo, 'Se actualizo el archivo');
    });
};

const crearArchivos = (path, file, type = 'plantilla') => {

    let data = '';

    switch (type) {
        case 'plantilla':
            data = codigo.template;

            if (!existeArchivo('server.js')) {

                let server = codigo.server.data;
                server += codigo.server.getRender(file);

                crearArchivo(`server.js`, server);

            } else {

                let actualizarDatos = codigo.server.getRender(file, true);

                actualizarArchivo('server.js', actualizarDatos);

            }
            break;

        default:
            return console.log('Comando no reconocido'.red);

    }

    crearCarpetas('views');

    crearCarpetas('views/partials');

    if (!existeArchivo('views/partials/head.hbs')) {
        crearArchivo('views/partials/head.hbs', codigo.head);
    }

    if (!existeArchivo('views/partials/footer.hbs')) {
        crearArchivo('views/partials/footer.hbs', codigo.footer);
    }

    crearArchivo(`${path}/${file}.hbs`, data);

}

module.exports = { crearArchivos }