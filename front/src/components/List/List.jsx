import React, { Component } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

function List(props) {
  return (
    <div className="border p-3">
      <h3>Projects list</h3>

      <ul className="list-group list-group-flush">
        {props.projects.map((proj) => {
          return (
            <li className="list-group-item" key={proj.id}>
              <div className="container border m-2">
                <h3>{proj.projectTitle}</h3>
                <p>{proj.projectDescription}</p>
                <table className="table bordered  table-sm">
                  <tbody>
                    <tr>
                      <td></td>
                      <td className="columNames">Status</td>
                      <td className="columNames">Tasks</td>
                      <td className="columNames">Edit</td>
                      <td className="columNames">Delete</td>
                    </tr>
                    <tr>
                      <td></td>
                        <td>{proj.isFinished}</td>
                      <td>
                        <a href="/tasks">{proj.unfinishedTasks}/{proj.totalTasks}</a>
                      </td>
                      <td>
                        <button className="btn btn-success buttonEdit" onClick={() => props.editProject(proj)}>
                          <FaEdit />
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-danger buttonDel" onClick={() => props.deleteProject(proj.id)}>
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default List;
