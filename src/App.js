import './App.css';
import freeCodeCampLogo from './imagenes/freecodecamp-logo.png';
import Boton from './componentes/Boton';
import Pantalla from './componentes/Pantalla';
import BotonClear from './componentes/BotonClear';
import { useState } from 'react';
import { evaluate } from 'mathjs';
import MostrarPasos from './componentes/MostrarPasos';

function App() {

  const [input, setInput] = useState('');
  const [operacion, setOperacion] = useState('');
  const [resultado, setResultado] = useState('');
  const [desarrollo, setDesarrollo] = useState('');

  const agregarInput = val => {
    let v = input + val
    setInput(v)
    setOperacion(v)
  };

  const calcularResultado = () => {
    if (input) {
      let r = evaluate(input)
      setInput(r)
      setResultado(r)
    } else {
      alert("Por favor ingrese valores para realizar los cálculos.");
    }
  }

  const borrarTodo = () => {
    setInput('')
    setOperacion('')
    setResultado('')
  }

  const mostrarDesarrollo = (desarrollo) => {
    setDesarrollo(desarrollo)
  }

  return (
    <div className='App'>
      <div className='contenedor-calculadora'>
        <Pantalla input={input}/>
        <div className='fila'>
          <Boton manejarClic={agregarInput}>1</Boton>
          <Boton manejarClic={agregarInput}>2</Boton>
          <Boton manejarClic={agregarInput}>3</Boton>
          <Boton manejarClic={agregarInput}>+</Boton>
        </div>
        <div className='fila'>
          <Boton manejarClic={agregarInput}>4</Boton>
          <Boton manejarClic={agregarInput}>5</Boton>
          <Boton manejarClic={agregarInput}>6</Boton>
          <Boton manejarClic={agregarInput}>-</Boton>
        </div>
        <div className='fila'>
          <Boton manejarClic={agregarInput}>7</Boton>
          <Boton manejarClic={agregarInput}>8</Boton>
          <Boton manejarClic={agregarInput}>9</Boton>
          <Boton manejarClic={agregarInput}>*</Boton>
        </div>
        <div className='fila'>
          <Boton manejarClic={calcularResultado}>=</Boton>
          <Boton manejarClic={agregarInput}>0</Boton>
          <Boton manejarClic={agregarInput}>.</Boton>
          <Boton manejarClic={agregarInput}>/</Boton>
        </div>
        <div className='fila'>
          <BotonClear manejarClear={() => borrarTodo()}>
            Borrar todo
          </BotonClear>

          <MostrarPasos operacion={ operacion } resultado={ resultado } setDesarrollo={ mostrarDesarrollo }></MostrarPasos>
        </div>
      </div>

      <div className='resultados-chatgpt'>
        <h3>Desarrollo de la operación:</h3>
        { desarrollo }
      </div>
    </div>
  );
}

export default App;
