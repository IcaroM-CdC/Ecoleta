import Express from "express"
import Knex from "./database/connection"

const routes = Express.Router()


//  Request PARAM: Parâmetros que vem na própria rota que identifica um recurso
//  Query PARAM: Parâmetros que vem na própria rota que, geralmente opcionais para filtro, paginação
// Request BODY: Parâmetros para criação/atualização de informações

const users = [
    "icaro",
    "rafael"
]

// ################## ROTAS DO USUÁRIO ######################

routes.get("/users", function(request, response) {

    // QUERY PARAMS SÃO PARAMETROS OPCIONAIS 
    const search = String(request.query.search)

    // VERIFICA SE O QUERY PARAM FOI PASSADO
    if (search){
        
        // REALIZA A FILTRAGEM DOS ELEMENTOS PELO PARAMETRO
        const filteredUsers = users.filter(function(user) {
            user.includes(search)
        })
    
    }
    else {

        const filteredUsers = users
    
    }

    response.json(users)
})

routes.get("/users/:id", function(request, response) {
    
    const id = Number(request.params.id)
    const user = users[id]

    return response.json(user)
})

routes.post("/users", function(request, response) {

    const user = {
        nome: request.body.nome,
        email: request.body.email
    }
    
    return response.json(user)

})

// ####################### ROTAS DOS ITENS ########################

routes.get("/items", async function(request, response) {

    // Conexão com o SQLite
    const items = await Knex("items").select("*")

    // Transformação de dados para um formato mais acessivel 
    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3003/uploads/${item.image}`,
        }
    })

    return response.json(serializedItems)

})

// ######################### ROTAS DOS PONTOS #############################

routes.post("/pontos", async function(request, response) {

    const name = request.body.name
    const email = request.body.email
    const whatsapp = request.body.name
    const city = request.body.city
    const uf = request.body.uf
    const latitude = request.body.latitude
    const longitude = request.body.longitude
    const items = request.body.items

    // Caso a segunda query não funcione/ contenha um erro, a primeira será descartada
    // ou seja, não irá persistir no banco de dados
    const trx = await Knex.transaction( )

    const point = {

        image: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
        name: name,
        email: email,
        whatsapp: whatsapp, 
        city: city,
        uf: uf,
        latitude: latitude,
        longitude: longitude
        
    }

    const insertedIds = await trx("points").insert(point)

    const pointItems = items.map((item_id: Number) => {
        return {
            item_id,
            point_id: insertedIds[0]
        }
    })

    await trx("point_items").insert(pointItems)
    
    // Consolida os inserts no banco de dados
    await trx.commit()


    return response.json({
        id: insertedIds[0],
        ...point
    })
})

routes.get("/pontos/:id", async function(request, response){

    const id = request.params.id

    // Buscando o ponto dentro do banco de dados
    const point = await Knex("points").where("id", id).first()

    if(!point) {
        return response.status(404).json({message: "Ponto não encontrado"})
    }

    const items = await Knex("items")
        .join("point_items", "items.id", "=", "point_items.item_id")
        .where("point_items.point_id", id)

    return response.status(200).json({point, items})

})

routes.get("/pontos", async function(request, response){

    const city = request.query.city
    const uf = request.query.uf
    const items = request.query.items

    // Separando os items nas virgulas e retirando os espaços
    const parsedItems = String(items).split(",").map(item => Number(item.trim()))

    console.log(request.query);
    console.log(parsedItems);

    // Aplicando os filtros do query
    const points = await Knex("points")
        .join("point_items", "points.id", "=", "point_items.point_id")
        .whereIn("point_items.item_id", parsedItems)    // filtro dos items


        // ########################## Problema #########################

        //.where("points.uf", String(uf))    // Filtro das unidades federativas(estados)
        //.where("points.city", String(city))   // Filtro das cidades

        // #############################################################

        .distinct()     // Impede a repetição de um ponto
        .select("points.*")

    console.log(points);
    

    return response.status(200).json(points)

})

export default routes