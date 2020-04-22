import React, { Component } from 'react';
import '../App';


class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <p className="text-center text-muted pt-2">&copy; Bartas, Auksė, Irmantas, Kęstutis</p>
                <p className="text-center text-muted">Vilniaus technologijų mokymo centras</p>
                <p className="text-center text-muted pb-2">2019-2020 m.m.</p>
            </div>
        );
    }
}

export default Footer;