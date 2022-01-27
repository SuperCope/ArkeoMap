import { Application, Router } from 'https://deno.land/x/oak/mod.ts'
import { Pieces } from '../controllers/piecesControllers.js'
import { Parties } from '../controllers/partieController.js'
import { Joueurs } from '../controllers/playersControllers.js'
import { oakCors } from "https://deno.land/x/cors/mod.ts";


let router = new Router()

let piecesController = new Pieces(router);
let partieController = new Parties(piecesController.getRouter());
let playersController = new Joueurs(partieController.getRouter());

router = playersController.getRouter()

const app = new Application();
const port = 3000;

app.use(async (ctx, next) => {
    await next();
})

app.use(
    oakCors({
        origin: '*',
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    }),
);


app.use(router.routes()).use(router.allowedMethods());


app.listen({ port })
console.log("*********SERVEUR LISTENING***********")
