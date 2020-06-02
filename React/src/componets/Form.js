import React from 'react';
import Username from './Username.js';
import Password from './Password.js';

function Form() {
    return(
        <form action="index.html">
				<img src={require("../img/avatar.svg")} alt="avatar"></img>
				<h2 className="title">Welcome</h2>
                <Username />
                <Password />
            	<input type="submit" className="btn" value="Login"></input>
        </form>
    )
}
export default Form