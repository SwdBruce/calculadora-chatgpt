import React from 'react';
import main from '../servicios/chatgpt';


const MostrarPasos = ({ operacion, resultado, setDesarrollo }) => {
    let fn = () => {
        let response = main(operacion, resultado) // Es una promesa, por lo que hay que esperar a que se resuelva
        response.then((respuesta) => {
            respuesta = respuesta.replace(/\\n/g, '\n')
            setDesarrollo(respuesta)
        })
        .catch((error) => {
            setDesarrollo('Error al llamar a la API de OpenAI')
            console.log(error);
        })
    }

    return (
        <button onClick={ fn } className='boton-pasos'>
            Pasos
        </button>
    )
}

export default MostrarPasos