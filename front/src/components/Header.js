import React, { Component } from 'react';
import '../App';
import logo from '../images/abiklogo.jpg';

class Header extends Component {
    render() {
        return (
            <div>
                <div className="row d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-header-color border-bottom shadow-sm header">
  {/* <img className="logo" src={logo} alt="logo"></img> */}
  <h2 className="col-4 my-0 mr-md-auto font-weight-normal">Project management system </h2>
  <h5 className="col-5 mt-2 ml-5 slogan">make it easy!</h5>
  {/* <nav className="my-2 my-md-0 mr-md-3">
    <a className="p-2 text-dark" href="#">Features</a>
    <a className="p-2 text-dark" href="#">Enterprise</a>
    <a className="p-2 text-dark" href="#">Support</a>
    <a className="p-2 text-dark" href="#">Pricing</a>
  </nav> */}
  <a className="col-1 btn btn-outline-light" href="/">Home</a>
</div>
            </div>
        );
    }
}

export default Header;