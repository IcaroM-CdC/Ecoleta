import Knex from "knex"

// Cria uma tabela
export async function up(knex:Knex) {

    return knex.schema.createTable("point_items", table => {

        // Increments funciona como o auto incremento do campo
        // id será a chave primaria da tabela
        table.increments("id").primary()

        table.integer("point_id").notNullable().references("id").inTable("points")
        table.integer("item_id").notNullable().references("id").inTable("items")

    })

}

// Deleta uma tabela
export async function down(knex:Knex) {

    return knex.schema.dropTable("point_items")

}