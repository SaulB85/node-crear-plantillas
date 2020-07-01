const template = {
    alias: 't',
    desc: 'Comando para crear plantillas'
};

const partial = {
    alias: 'p',
    desc: 'Comando para crear parciales'
};

const argv = require('yargs').options({ template, partial }).help().argv;

module.exports = { argv }