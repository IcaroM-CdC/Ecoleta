import Knex from "knex"
import Path from "path"

// __dirname retorna o caminho para o arquivo atual

const connection = Knex({
    client: "sqlite3",
    connection: {
        filename: Path.resolve(__dirname, "database.sqlite")
    },
    useNullAsDefault: true
})

export default connection   