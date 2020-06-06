import Knex from "knex"

// Cria uma tabela
export async function up(knex:Knex) {

    return knex.schema.createTable("items", table => {

        // Increments funciona como o auto incremento do campo
        // id será a chave primaria da tabela
        table.increments("id").primary()

        table.string("image").notNullable()
        table.string("title").notNullable()

    })

}

// Deleta uma tabela
export async function down(knex:Knex) {

    return knex.schema.dropTable("items")

}