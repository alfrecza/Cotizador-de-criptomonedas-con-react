import styled from "@emotion/styled"
import useSelectMonedas from "../hooks/useSelectMonedas"
import monedas from "../data/monedas"
import Error from "./Error"
import { useEffect, useState } from "react"


const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color .3s ease;
    margin-top: 20px;
    &:hover {
        background-color: #7A7DFE;
    }
`

const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([])

    const [moneda ,SelectMonedas] = useSelectMonedas('Selecciona tu moneda', monedas)
    const [criptomoneda ,SelectCriptoMonedas] = useSelectMonedas('Selecciona la criptomoneda a convertir', criptos)
    const [error, setError] = useState(false)

    useEffect(() => {
        
        const cunsularAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
            const respuesta = await fetch(url)
            
            const resultado = await respuesta.json()

            const arrayCriptos = resultado.Data.map(cripto => {
                
                const objetoCripto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }

                return objetoCripto
                
            })

            setCriptos(arrayCriptos)
        }

        cunsularAPI()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        if([moneda, criptomoneda].includes('')){
            setError(true)

            setTimeout(() => {
                setError(false)
            }, 5000);
            return
        }

        setError(false)

        setMonedas({
            moneda,
            criptomoneda
        })
    }

    return(
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}

            <form action="" onSubmit={handleSubmit}>
                
                <SelectMonedas/>
                <SelectCriptoMonedas/>
                    
                <InputSubmit 
                    type="submit"
                    value='Cotizar'/>
            </form>
        </>
    )
}

export default Formulario