const fastify = require("fastify")({
    logger: false
});
const webscrapper = require('./src/webscrapper.js')

fastify.register(require("fastify-formbody"));
fastify.register(require('fastify-cors'))

fastify.get("/", async function (request, reply) {
    reply
    .code(200)
    .send("Não sei o que você esta fazendo aqui, mas acho que esse não é o lugar certo.")
})
fastify.post("/", async function (request, reply) {

    let response = null
    if (request.body.texto) {
        response = await webscrapper.texto(request.body.texto)

    }
    else if (request.body.palavra) {
        response = await webscrapper.palavra(request.body.palavra)
    }
    reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(response)
});

fastify.listen(3000, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
    fastify.log.info(`server listening on ${address}`);
});
