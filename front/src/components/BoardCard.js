import React, { Component } from 'react';

class BoardCard extends Component {
    render() {
        return (
            <div>
                <div className="card" style={{width: "18rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">Task Title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary mr-2">In Progress</a>
                            <a href="#" className="btn btn-primary">Done</a>
                        </div>
                </div>
                </div>
        );
    }
}

export default BoardCard;