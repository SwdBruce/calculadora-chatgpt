import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css'

export default function Login() {
    let [usuario, setUsuario] = useState('')
    let [contrasena, setContrasena] = useState('')
    let navigate = useNavigate();
    let login = () => {
        if (usuario == 'admin' && contrasena == 'admin') {
            alert('Bienvenido')
            navigate('/calculadora');
        } else {
            alert('Usuario o contraseña incorrectos')
        }
    }

    const handleChangeUsuario = event => {
        setUsuario(event.target.value);
    }

    const handleChangeContrasena = event => {
        setContrasena(event.target.value);
    }
    
    return (<div className="container">
	<div className="screen">
		<div className="screen__content">
			<div className="login">
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input type="text" className="login__input" placeholder="Usuario" onChange={ handleChangeUsuario }/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className="login__input" placeholder="Contraseña" onChange={ handleChangeContrasena }/>
				</div>
				<button className="button login__submit" onClick={(login)}>
					<span className="button__text">Iniciar Sesión</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</div>
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>)
}
