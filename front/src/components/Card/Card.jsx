import React from 'react';
import './Card.css';
import {FaTrashAlt} from 'react-icons/fa';
import {FaEdit} from 'react-icons/fa';

const Card = (props) => {
return (
    <div className="container border m-2">
        <h3>{props.name}</h3>
        <p>{props.description}</p>
        <table className="table bordered  table-sm">
  <tbody>
    <tr>
    <td ></td>
      <td className="columNames">Status</td>
      <td className="columNames">Tasks</td>
      <td className="columNames">Edit</td>
      <td className="columNames">Delete</td>
    </tr>
    <tr>
    <td></td>
      <td>Not Started</td>
      <td><a href="/tasks">20/20</a></td>
      <td><button className="buttonEdit" ><FaEdit /></button></td>
      <td><button className="buttonDel" ><FaTrashAlt /></button></td>
    </tr>
    </tbody>
    </table>
    </div>
    );
}

export default Card;