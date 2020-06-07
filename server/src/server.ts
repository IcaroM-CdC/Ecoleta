import Express from "express"
import Cors from "cors"
import Path from "path"
import Routes from "./routes"

const app = Express()
const porta = 3003

app.use(Cors())

// Nescessario para entender o corpo da requisição em formato JSON
app.use(Express.json())
app.use("/uploads", Express.static(Path.resolve(__dirname, "..", "uploads")))
app.use(Routes)



app.listen(porta, function(){
    console.log("Servidor rodando na URL http://localhost:3003")
})