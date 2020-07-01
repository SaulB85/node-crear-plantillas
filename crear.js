const { crearArchivos } = require('./fs/fs');
const argv = require('./comandos/yargs').argv;
const colors = require('colors');

const comando = argv._[0];

if (comando == 'ar') {

    if (typeof argv.template === 'string' && argv.template.trim() !== '') {
        crearArchivos('views', argv.template);
    }

    if (typeof argv.partial === 'string' && argv.partial.trim() !== '') {
        crearArchivos('views/partials', argv.partial, argv.partial);
    }

} else {
    console.log('Comando no reconocido'.red);
}