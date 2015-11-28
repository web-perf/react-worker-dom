import React from 'react';
import DBMon from './app.jsx'
import Com from './testApp.jsx'

onmessage = (e => {
	const env = e.data;
   const reactDom = require(env.worker ? './../../' : 'react-dom'); 
   reactDom.render(<DBMon timeout={env.timeout} rows={env.rows}/>, env.el);
});
