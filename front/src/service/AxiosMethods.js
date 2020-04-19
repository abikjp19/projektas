import axios from 'axios'

class AxiosFunctions {

    getAll() {
        return axios.get(`http://localhost:8080/api/project/`,
        {headers: {
            "Content-Type": "application/json"}
        })
   }

    findById(id) {   
        return axios.get(`http://localhost:8080/api/project/id/${id}`, 
        {headers: {
            "Content-Type": "application/json"}
        })
   }


    deleteById(id){
       return axios.delete(`http://localhost:8080/api/project/id/${id}`, {headers: {
             "Content-Type": "application/json"}
         })
    }

    updateProject(id, project) {
        return axios.put(`http://localhost:8080/api/project/id/${id}`, project, {headers: {
            "Content-Type": "application/json"}
        })
   }

    addProject(project) {
      return axios.post(`http://localhost:8080/api/project/`, project,
      {headers: {
        "Content-Type": "application/json"}
    })
}

}

export default new AxiosFunctions();