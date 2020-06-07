import Knex from "knex"


export async function seed(knex: Knex){

    await knex("items").insert([
        { title: "Lâmpadas", image: "lampadas.svg"},
        { title: "Pilhas e baterias", image: "baterias.svg"},
        { title: "Papéis", image: "papeis-papelao.svg"},
        { title: "Eletrônicos", image: "eletronicos.svg"},
        { title: "Orgânicos", image: "organicos.svg"},
        { title: "Óleo de cozinha", image: "oleo.svg"},
    ])

}   