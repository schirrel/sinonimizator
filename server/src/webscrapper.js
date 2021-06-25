const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.sinonimos.com.br/';

require('./polyfill');

var iso88592 = require('iso-8859-2');

const requisitarPagina = async (palavra) => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: url + palavra,
            responseType: 'arraybuffer',
            responseEncoding: 'binary'
        });

        let html = iso88592.decode(response.data.toString('binary'));
        const $ = cheerio.load(html);
        const sinonimosElementos = Array.from($('.sinonimos'));
        return new Promise((resolve) => {
            let sinonimos = new Array();
            sinonimosElementos.forEach((sinonimo) => {
                sinonimos.push(sinonimo.children.filter(palavraElemento => palavraElemento.name === 'a').map((item) => {
                    return cheerio.load(item, { decodeEntities: false }).text()
                }))
            })
            resolve(sinonimos.flat(Infinity))
        })
    } catch (err) {
        console.log("------ ERRO DE REQUISIÇÃO COM A PALAVRA "+palavra+" ----")
    }
}

const sinonimosPorPalavra = async (palavra) => {
    let sinonimos = await requisitarPagina(palavra) || []
    return {
        palavra,
        sinonimos
    }
}

const removerCaracteres =(sentenca) => {
    sentenca=  sentenca.replace(/\(/g, "");
    sentenca=  sentenca.replace(/\)/g, "");
    sentenca=  sentenca.replace(/,/g, "");
    sentenca= sentenca.replace(/\./g, "");
    sentenca=  sentenca.replace(/:/g, "");
    return sentenca;
}

const texto = async (sentenca) => {
    sentenca = removerCaracteres(sentenca)
    let palavras = sentenca.split(" ").filter(palavra => palavra.length > 1)
    const promises = await palavras.map(async palavra => {
        return await sinonimosPorPalavra(palavra);
    })
    return await Promise.all(promises);
}
const palavra = async (palavra) => {
    return await sinonimosPorPalavra(palavra);
}

module.exports = {
    texto, palavra
}