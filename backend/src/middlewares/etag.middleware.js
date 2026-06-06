const crypto = require('crypto');

const manejarEtag = (req, res, next) => {
    const jsonOriginal = res.json.bind(res);

    res.json = (datos) => {
        const cuerpo = JSON.stringify(datos);

        const etagGenerado = `"${crypto.createHash('md5').update(cuerpo).digest('hex')}"`;

        res.setHeader('ETag', etagGenerado);
    
        const etagCliente = req.headers['if-none-match'];
        if (etagCliente && etagCliente === etagGenerado) {
            return res.status(304).end();
        }

        return jsonOriginal(datos);
    };

    next();
};

module.exports = { manejarEtag };