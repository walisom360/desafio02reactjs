import React,{useEffect, useState} from "react";

import "./styles.css";

import api from './services/api'

function App() {
 const [repositories,setRepositories] = useState([])



 useEffect(()=>{
  async function getRepositories(){
    const {data} = await api.get('/repositories') 
     
    console.log(data)
    setRepositories(data)
  }

  

  getRepositories()

 },[])
  
 


  async function handleAddRepository() {
    const repositorie = {
      title:`${Date.now()}`,
      url:"https://github.com/walisom360",
      techs:["teste","teste"]
    }

    const {data} = await api.post('/repositories',repositorie)
  
    setRepositories([...repositories,data]) 
  
  
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    
    const newRepositories = repositories.filter(repositorie => repositorie.id !== id)
    
    setRepositories(newRepositories) 
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie =>(
           <li key={repositorie.id}>
           {repositorie.title}
 
           <button onClick={() => handleRemoveRepository(repositorie.id)}>
             Remover
           </button>
         </li>
        ))}
       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
