import Path from "path"


module.exports = {

    client: "sqlite3",
    connection: {      // Caminho para o arquivo do database
        filename: Path.resolve(__dirname, "src", "database", "database.sqlite"),
    },
    migrations: {       // Caminho para as migrations
        directory: Path.resolve(__dirname, "src", "database", "migrations")
    },
    seeds: {       // Caminho para as seeds(arquivos default da aplicação)
        directory: Path.resolve(__dirname, "src", "database", "seeds")
    },
    useNullAsDefault: true

}