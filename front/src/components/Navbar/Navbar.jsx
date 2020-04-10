import React from 'react';
import './Navbar.css';

const Navbar = () => {
return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light nav">
<div className="collapse navbar-collapse" id="navbarTogglerDemo03">
  <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
    <li className="nav-item active">
      <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
    </li>
    <li className="nav-item active">
      <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
    </li>
    <li className="nav-item active">
      <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
    </li>
    <li className="nav-item active">
      <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
    </li>
  </ul>
  <form className="form-inline my-2 my-lg-0">
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    <button className="btn btn-outline-info my-2 my-sm-0 ml-2" type="submit"><a href="/form">Create</a></button>
  </form>
</div>
</nav>);
}

export default Navbar;