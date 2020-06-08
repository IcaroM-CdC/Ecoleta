import React from "react"
import "./Styles.css"
import logo from "../../assets/logo.svg"
import {  Link  } from "react-router-dom"
import {  Map, TileLayer, Marker} from "react-leaflet"

// Importando o modulo do feather icons
import {  FiArrowLeft  } from "react-icons/fi"


function createPoint() {
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
                    </Map>


                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select name="uf" id="uf">
                                <option value="0">Selecione um estado</option>
                            </select>
                        </div>  
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Selecione uma cidade</option>
                            </select>
                        </div>                      
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Itens de coletas</h2>
                        <span>Selecione um ou mais elementos no mapa</span>
                    </legend>
                    <ul className="items-grid">
                        <li>
                            <img src="" alt=""/>
                            <span>Teste</span>
                        </li>
                        <li>
                            <img src="" alt=""/>
                            <span>Teste</span>
                        </li>
                        <li>
                            <img src="" alt=""/>
                            <span>Teste</span>
                        </li>
                        <li>
                            <img src="" alt=""/>
                            <span>Teste</span>
                        </li>
                        <li>
                            <img src="" alt=""/>
                            <span>Teste</span>
                        </li>
                        <li>
                            <img src="" alt=""/>
                            <span>Teste</span>
                        </li>
                    </ul>
                </fieldset>
                <button type="submit">Cadastrar ponto de coleta</button>
            </form>
        </div>
    )
}

export default createPoint