import Knex from "knex"

// Cria uma tabela
export async function up(knex:Knex) {

    return knex.schema.createTable("points", table => {

        // Increments funciona como o auto incremento do campo
        // id será a chave primaria da tabela
        table.increments("id").primary()

        table.string("image").notNullable()
        table.string("name").notNullable()
        table.string("email").notNullable()
        table.string("whatsapp").notNullable()
        table.string("city").notNullable()
        table.string("uf").notNullable()
        table.decimal("latitude").notNullable()
        table.decimal("longitude", 2).notNullable()

    })

}

// Deleta uma tabela
export async function down(knex:Knex) {

    return knex.schema.dropTable("points")

}