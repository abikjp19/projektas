import React, { Component } from 'react';
import '../App';
import logo from '../images/abiklogo.jpg';


class Footer extends Component {
    render() {
        return (
           
            <div className="container-fluid footer ">
                <div className="row justify-content-between">
                <div className="col-4 ml-3">
                <p className="footer-spaces pt-2">&copy; Bartas, Auksė, Irmantas, Kęstutis</p>
                <p className=" footer-spaces">Vilniaus technologijų mokymo centras</p>
                <p className=" ">2019-2020 m.m.</p>
                 </div>
                 
                <div className="col-3 text-right">
                <img className=" logo mt-3 " src={logo} alt="logo"></img>
                </div>
                </div>
            </div>

        );
    }
}

export default Footer;