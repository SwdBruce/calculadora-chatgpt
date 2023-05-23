import './App.css';
import Boton from './componentes/Boton';
import Pantalla from './componentes/Pantalla';
import BotonClear from './componentes/BotonClear';
import { useEffect, useState } from 'react';
import { evaluate } from 'mathjs';
import MostrarPasos from './componentes/MostrarPasos';

function App() {

  const [input, setInput] = useState('');
  const [operacion, setOperacion] = useState('');
  const [resultado, setResultado] = useState('');
  const [desarrollo, setDesarrollo] = useState('');
  const [listaResultados, setListaResultados] = useState(false);

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

  

  useEffect(() => {
    
    listarResultados()
  }, [])

  const listarResultados = () => {
    // cominucarse con el api http://localhost:8888/ por get
    fetch('http://localhost:8888?listar=1')
    .then(response => response.json())
    .then(data => {
      setListaResultados(data)
      console.log(data);
    })
  }

  const guardarResultados = () => {
    // cominucarse con el api http://localhost:8888/ por post
    fetch('http://localhost:8888/', {
      method: 'POST',
      body: JSON.stringify({usuario: 'admin', resultado: desarrollo})
    })
    .then(response => response.json())
    .then(data => {
      let message = data.message
      listarResultados()
      alert(message)
    })
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

        <br />
        <br />
        <button className='boton-guardar' onClick={ guardarResultados }>Guardar Resultados</button>

        <br />
        <br />

        <div>
          <h3 style={{'color': 'white'}}>Resultados guardados</h3>
          <ul>
            {
              listaResultados && listaResultados.map((item, index) => {
                return <li key={ index } className='historial-item'>{ item.resultado }</li>
              })
            }
          </ul>
        </div>

      </div>

      <div className='resultados-chatgpt'>
        <h3>Desarrollo de la operación:</h3>
        <pre>{ desarrollo }</pre>
        
      </div>
    </div>
  );
}

export default App;
