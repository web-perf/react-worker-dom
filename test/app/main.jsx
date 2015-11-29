import React from 'react';
import DBMon from './app.jsx'
//import DBMon from './testApp.jsx'

onmessage = (e => {
	const env = e.data;
	if (env.start === true){
   	const reactDom = require(env.worker ? './../../' : 'react-dom'); 
   	reactDom.render(<DBMon timeout={env.timeout} rows={env.rows}/>, env.el);
	}
});
