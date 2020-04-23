import React from 'react';
import './App.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Main from './components/Main.js'

function App() {
  return (
<div>
        <div className="main-container">
                    <Header />
                    <Main />
                    </div>
           
            <Footer />
            </div>
       

    );
}

export default App;
