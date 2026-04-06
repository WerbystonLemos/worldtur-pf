import geoapi, { getFlagUrl } from "../../../services/geoapi";
import { useState, useEffect } from "react";
import './home.css';
import { RxLetterCaseUppercase } from "react-icons/rx";
import { SiUnitednations } from "react-icons/si";
import { MdOutlinePlace, MdAttachMoney } from "react-icons/md";
import { IoEarthSharp } from "react-icons/io5";
import { FaRegMoneyBill1 } from "react-icons/fa6";

function Home() {

    const [countries, setCountries]             = useState([]);
    const [countrySelected, setCountrySelected] = useState({})
    const [title, setTitle]                     = useState('Selecione o país desejado')

    useEffect( () => {
        async function loadCountries()
        {
            try {
                const response = await geoapi.get('countries?limit=9000')
                const countriesWithFlags = response.data.countries.map(country => ({
                    ...country,
                    flag: getFlagUrl(country.code.toLowerCase())
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

    async function selectCountry(name, code)
    {
        const response = await geoapi.get(`countries/search?q=${name}`)
        setCountrySelected({
            code: response.data.results[0].code,
            name: response.data.results[0].name,
            capitalName: response.data.results[0].capitalCity,
            continent: response.data.results[0].continent,
            currentCode: response.data.results[0].currencyCode,
            currentName: response.data.results[0].currencyName,
            flag: getFlagUrl(response.data.results[0].code),
        })

        setTitle(`${response.data.results[0].name} - ${response.data.results[0].code}`)
    }

    return(

        <div className="container">

            <div className="countryInfoSelected">
                <div className="sideContainer">
                    <div className="title">
                        <h1>{title}</h1>
                    </div>
                    
                    <div className="aside">
                        <div className="sideLeft">
                            {countrySelected.code ? <span> <RxLetterCaseUppercase /><p>{countrySelected.code}</p></span> : ''}
                            {countrySelected.name ? <span> <SiUnitednations /><p>{countrySelected.name}</p></span> : ''}
                            {countrySelected.capitalName ? <span> <MdOutlinePlace /><p>{countrySelected.capitalName}</p></span> : ''}
                            {countrySelected.continent ? <span> <IoEarthSharp /><p>{countrySelected.continent}</p></span> : ''}
                            {countrySelected.currentCode ? <span> <MdAttachMoney /><p>{countrySelected.currentCode}</p></span> : ''}
                            {countrySelected.currentName ? <span> <FaRegMoneyBill1 /><p>{countrySelected.currentName}</p></span> : ''}
                        </div>
                        
                        <div className="sideRight">
                            <img src={countrySelected.flag} alt="" />
                            <p>{countrySelected.name} - {countrySelected.code}</p>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className="mainFlags">
                <div className="contaienrFlags">
                {
                    countries.map( (country, idx) => {
                        return(
                            <div className="containerCard" key={idx}>
                                <div className="flag" onClick={ () => selectCountry(country.name, country.code) }>
                                    <img src={country.flag} alt={country.code} title={country.name} />
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>

        </div>
    )
}

export default Home;