import React, { Component } from 'react';
import '../App';

class Header extends Component {
    render() {
        return (
            <div>
                <div className="row d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-header-color border-bottom shadow-sm header">
                    <h2 className="col-4 my-0 mr-md-auto font-weight-normal">Project management system </h2>
                    {/* <h5 className="col-5 mt-2 ml-5 slogan">make it easy!</h5> */}
                    <a className="col-1 btn btn-outline-dark" href="/">Home</a>
                </div>
            </div>
        );
    }
}

export default Header;