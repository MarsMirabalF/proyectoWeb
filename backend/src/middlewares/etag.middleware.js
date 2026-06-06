const crypto = require('crypto');

function generarEtag(datos) {

    const cuerpito = JSON.stringify(datos);

    const hashEtagsito = crypto.createHash('md5');

    hashEtagsito.update(cuerpito);

    return '"' + hashEtagsito.digest('hex') + '"';
}

const manejarEtag = (req, res, next) => {
    const jsonOriginal = res.json.bind(res);
    const respuestaJsonOriginal = res.json.bind(res);

    res.json = (datos) => {

        const etagGenerado = generarEtag(datos);

        const etagCliente = req.headers['if-none-match'];

        if (etagCliente === etagGenerado) {
            return res.status(304).end();
        }

        res.setHeader('ETag', etagGenerado);

        return respuestaJsonOriginal(datos);
    };

    next();
};

module.exports = { manejarEtag };