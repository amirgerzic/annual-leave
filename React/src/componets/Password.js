import React from 'react';

function Password(){
    return (
        <div>
            <div className="input-div pass">
           		   <div className="i"> 
           		    	<i className="fas fa-lock"></i>
           		   </div>
           		   <div className="div">
           		    	<h5>Password</h5>
           		    	<input type="password" className="input"></input>
            	   </div>
            	</div>
            	<a href="www.example.com">Forgot Password?</a>
        </div>
    )
} 

export default Password