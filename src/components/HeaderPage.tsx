import React, { useState } from 'react';
import "./Global.css"
import Logo from '../Pictures/Logos/Logo.png'
import { Link } from 'react-router-dom';

function HeaderPage() {
  return (
    <div id="header">
	    <Link to="/"><img id="logo" src={Logo} alt="image"/></Link>
    </div>
  );
}

export default HeaderPage;
