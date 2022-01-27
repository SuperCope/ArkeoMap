import { Router } from 'https://deno.land/x/oak/mod.ts'
import { DataJoueurs } from '../data/Joueurs.js'

class Joueurs {
    constructor(router) {
        this.routerJoueurs = router
        this.Joueurs = new DataJoueurs().getData()



        this.routerJoueurs
            .get('/api', (ctx) => {
                ctx.response.body = "API WORKING"
            })
            .get('/api/joueurs', (ctx) => {

                ctx.response.body = Array.from(this.Joueurs.values())

            })
            .get('/api/joueurs/:id', (ctx) => {
                if (ctx.params && ctx.params.id && this.Joueurs.has(ctx.params.id)) {
                    ctx.response.body = this.Joueurs.get(ctx.params.id)

                }
            })
            .post("/api/joueurs", async({ response, request }) => {

                const values = await (request.body().value)
                let val = values;
                if (request.body().type == "text") {
                    val = JSON.parse(values)
                }
                this.Joueurs.set(String(this.Joueurs.size + 1), {
                    id: (this.Joueurs.size + 1),
                    x: val.x,
                    y: val.y,
                    pseudo: val.pseudo,
                    password: val.password,
                    nbSpts: val.nbSpts,
                    idPartie: val.idPartie,
                    pieces: val.pieces
                })

                response.body = Array.from(this.Joueurs.values())

            })
            .patch("/api/joueurs/:id", async({ response, request, params }) => {
                const values = await request.body().value
                let val = values;
                if (request.body().type == "text") {
                    val = JSON.parse(values)
                }
                const id = await params

                if (this.Joueurs.has(String(id.id))) {

                    this.Joueurs.set(id.id, {
                        id: val.id,
                        x: val.x,
                        y: val.y,
                        nbSpts: val.nbSpts,
                        pseudo: val.pseudo,
                        password: val.password,
                        idPartie: val.idPartie,
                        pieces: val.pieces
                    })

                    response.body = this.Joueurs.get(id.id)
                }

            })
            .delete("/api/joueurs/:id", async({ response, request, params }) => {
                const id = await params
                if (this.Joueurs.has(String(id.id))) {

                    this.Joueurs.delete(id.id)
                }
                response.body = Array.from(this.Joueurs.values())
            })

    }
    getRouter() {
        return this.routerJoueurs
    }
}
export { Joueurs }