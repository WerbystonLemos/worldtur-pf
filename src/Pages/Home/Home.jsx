import geoapi from "../../../services/geoapi";
import { useState, useEffect } from "react";
import './home.css';

function Home() {

    const [countries, setCountries] = useState([]);
    const [flags, setFlags]         = useState([]);

    useEffect( () => {
        async function loadCountries()
        {
            try {
                const response = await geoapi.get('countries?limit=9000')
                const countriesWithFlags = response.data.countries.map(country => ({
                    ...country,
                    flag: `https://data.geoapi.info/flags/1x1/${country.code.toLowerCase()}.svg`
                }))
               
                setCountries(countriesWithFlags)
            }
            catch (err) {
                console.log('Erro ao carregar paises!')
                console.log(err)
            }
        }
        loadCountries()
    },[] )

    return(

        <div className="container">

            <div className="countryInfoSelected">
                <div className="title">
                    <h1>Selecione o país desejado</h1>
                </div>
                <div className="sideContainer">
                    <div className="sideLeft">A</div>
                    <div className="sideRight">B</div>
                </div>
            </div>

            <div className="teste">
                {
                    countries.map( (country, idx) => {
                        return(
                            <div className="containerCard" key={idx}>
                                <div className="flag">
                                    <img src={country.flag} alt={country.code} title={country.name} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Home;