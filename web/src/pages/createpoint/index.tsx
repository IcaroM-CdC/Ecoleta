import React, {useEffect, useState, ChangeEvent} from "react"
import "./Styles.css"
import logo from "../../assets/logo.svg"
import {  Link  } from "react-router-dom"
import {  Map, TileLayer, Marker} from "react-leaflet"
import Api from "../../services/api"
import Axios from "axios"
// Importando o modulo do feather icons
import {  FiArrowLeft  } from "react-icons/fi"


// Interface para os itens retornados da nossa API
interface Item {
    id: number
    title: string
    image_url: string
}

interface IBGEUFresponse {
    sigla: string
}

interface IBGECityresponse {
    nome: string
}


function CreatePoint() {

    const [items, setItems] = useState<Item[]>([])
    const [ufs, setUfs] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])
    
    // Estado que armazena qual UF o usuário selecionou
    const [selectedUF , setSelectedUF] = useState("0")

    // Função para armazenar o estado
    useEffect(() => {
        Api.get("items").then(response => {
            
            // Setando o estado com os dados da resposta da requisição
            setItems(response.data)

        })
    }, [])

    useEffect(() => {

        // API do IBGE para listar os estados
        Axios.get<IBGEUFresponse[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(response => {

            const ufInitials = response.data.map(uf => uf.sigla)

            // Setando o estado dos UFs com os dados a API do IBGE
            setUfs(ufInitials)
        })
    }, [])

    // Carregar as cidades sempre que a UF mudar
    useEffect(() => {

        if(selectedUF === "0") {
            return
        }

        // API do IBGE para listar as cidades por estado
        Axios.get<IBGECityresponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`).then(response => {

            const cityNames = response.data.map(city => city.nome)
        
            // Setando o estado dos UFs com os dados a API do IBGE
            setCities(cityNames)
        })
    }, [selectedUF])

    // <HTMLSelectElement> informa a alteração de um evento HTML select event
    function handleSelectedUF(event: ChangeEvent<HTMLSelectElement>) {
        
        const uf = event.target.value
        setSelectedUF(uf)

    }


    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>
                <Link to="/" >
                    Voltar para home
                    <FiArrowLeft/>
                </Link>
            </header>
            <form action="">
                <h1>Cadastro do ponto de coleta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input type="text" name="name" id="name"/>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" name="email" id="email"/>
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input type="text" name="whatsapp" id="whatsapp"/>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                    <Map center={[-27.2092052, -49.6401092]} zoom={15}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-27.2092052, -49.6401092]}></Marker>
                    </Map>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select name="uf" id="uf" value={selectedUF} onChange={handleSelectedUF}>
                                <option value="0">Selecione um estado</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>  
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>                      
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Itens de coletas</h2>
                        <span>Selecione um ou mais elementos abaixo</span>
                    </legend>
                    <ul className="items-grid">
                        {items.map(item => {
                            return (
                                <li key={item.id}>
                                    <img src={item.image_url} alt={item.title}/>
                                    <span>{item.title}</span>
                                </li>   
                            )
                        })}
                    </ul>
                </fieldset>
                <button type="submit">Cadastrar ponto de coleta</button>
            </form>
        </div>
    )
}

export default CreatePoint