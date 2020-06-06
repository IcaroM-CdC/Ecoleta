import Express from "express"

const app = Express()
const porta = 3003

// Nescessario para entender o corpo da requisição em formato JSON
app.use(Express.json())

//  Request PARAM: Parâmetros que vem na própria rota que identifica um recurso
//  Query PARAM: Parâmetros que vem na própria rota que, geralmente opcionais para filtro, paginação
// Request BODY: Parâmetros para criação/atualização de informações

const users = [
    "icaro",
    "rafael"
]

app.get("/users", function(request, response) {

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

app.get("/users/:id", function(request, response) {
    
    const id = Number(request.params.id)
    const user = users[id]

    return response.json(user)
})

app.post("/users", function(request, response) {

    const user = {
        nome: request.body.nome,
        email: request.body.email
    }
    
    return response.json(user)

})

app.listen(porta, function(){
    console.log("Servidor rodando na porta http://localhost:3003")
})