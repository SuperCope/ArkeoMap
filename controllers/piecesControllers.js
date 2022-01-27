import { Router } from 'https://deno.land/x/oak/mod.ts'
import { DataPieces } from '../data/Pieces.js'

class Pieces {
    constructor(router) {
        this.routerPieces = router
        this.Pieces = new DataPieces().getData()

        this.routerPieces
            .get('/api', (ctx) => {
                ctx.response.body = "API WORKING"
            })
            .get('/api/pieces', (ctx) => {


                ctx.response.body = Array.from(this.Pieces.values())
                


            })
            .get('/api/pieces/:id', (ctx) => {
                if (ctx.params && ctx.params.id && this.Pieces.has(ctx.params.id)) {
                    ctx.response.body = this.Pieces.get(ctx.params.id)

                }
            })
            .post("/api/pieces", async({ response, request }) => {

                const values = await (request.body().value)
       
                let val = values;
                if (request.body().type == "text") {
                    val = JSON.parse(values)
                }
                this.Pieces.set(String(this.Pieces.size + 1), {
                    id: (this.Pieces.size + 1),
                    imageURL: val.imageURL,
                    idJoueur:val.idJoueur,
                    posImage:val.posImage,
                    trace:val.trace,
                    rotation:val.rotation
                })

                response.body = Array.from(this.Pieces.values())

            })
            .patch("/api/pieces/:id", async({ response, request, params }) => {
                const values = await request.body().value
                let val = values;
                if (request.body().type == "text") {
                    val = JSON.parse(values)
                }
                const id = await params

                if (this.Pieces.has(String(id.id))) {

                    this.Pieces.set(id.id, {
                        id: val.id,
                        imageURL: val.imageURL,
                        idJoueur: val.idJoueur,
                        posImage:val.posImage,
                        trace:val.trace,
                        rotation:val.rotation
                    })

                    response.body = this.Pieces.get(id.id)
                }

            })
            .delete("/api/pieces/:id", async({ response, request, params }) => {
                const id = await params
                if (this.Pieces.has(String(id.id))) {

                    this.Pieces.delete(id.id)
                }
                response.body = Array.from(this.Pieces.values())
            })

    }
    getRouter() {
        return this.routerPieces
    }
}
export { Pieces }