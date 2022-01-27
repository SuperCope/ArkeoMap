import { Router } from 'https://deno.land/x/oak/mod.ts'
import { DataParties } from '../data/Parties.js'

class Parties {
    constructor(router) {
        this.routerParties = router
        this.Parties = new DataParties().getData()



        this.routerParties
            .get('/api', (ctx) => {
                ctx.response.body = "API WORKING"
            })
            .get('/api/parties', (ctx) => {
                ctx.response.body = Array.from(this.Parties.values())
            })
            .get('/api/parties/:id', (ctx) => {
                if (ctx.params && ctx.params.id && this.Parties.has(ctx.params.id)) {
                    ctx.response.body = this.Parties.get(ctx.params.id)
                }
            })
            .post("/api/parties", async({ response, request }) => {
                const values = await (request.body().value)
                let val = values;
                if (request.body().type == "text") {
                    val = JSON.parse(values)
                }
                this.Parties.set(String(this.Parties.size + 1), {
                    id: (this.Parties.size + 1),
                    joueurs: val.joueurs,
                    nbJoueurs: val.nbJoueurs,
		            phase: val.phase,
                    pieces: val.pieces,
                    points: val.points,
                    nbTraits: val.nbTraits
                })
                response.body = Array.from(this.Parties.values())
                // return response
            })
            
            .patch("/api/parties/:id", async({ response, request, params }) => {
                const values = await request.body().value
                let val = values;
                if (request.body().type == "text") {
                    val = JSON.parse(values)
                }
                const id = await params

                if (this.Parties.has(String(id.id))) {

                    this.Parties.set(id.id, {
                        id: val.id,
                        joueurs: val.joueurs,
                        nbJoueurs: val.nbJoueurs,
                        phase: val.phase,
                        pieces: val.pieces,
                        points: val.points,
                        nbTraits: val.nbTraits
                    })

                    response.body = this.Parties.get(id.id)
                }

            })
            .delete("/api/parties/:id", async({ response, request, params }) => {
                const id = await params
                if (this.Parties.has(String(id.id))) {
                    this.Parties.delete(id.id)
                }
                response.body = Array.from(this.Parties.values())
            })

    }
    getRouter() {
        return this.routerParties
    }
}
export { Parties }
