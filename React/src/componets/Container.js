import React from 'react';
import Form from './Form.js';

function Container() {
    return (
        <div>
        <img className="wave" src={require("../img/wave.png")} alt="wave"></img>
        <div className="container">  
        <div className="img">
			<img src={require("../img/bg.svg")} alt="phone"></img>
		</div>
        <div class="login-content">
            <Form />
        </div>
         </div>
        </div>
    )
}
export default Container