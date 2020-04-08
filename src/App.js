import React from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [newRepository, setNewRepository] = React.useState({})
  const [repositories, setRepositories] = React.useState([])

  React.useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('/repositories');
      setRepositories(response.data);
    }
    loadRepositories();
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', newRepository)
    
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
            <li key={repository?.id}>
              {repository?.title}
              <button onClick={() => handleRemoveRepository(repository?.id)}>
                Remover
              </button>
            </li>
          )}
      </ul>
      <form > 
        <input type="text" 
        placeholder="URL" 
        value={newRepository?.url} 
        onChange={e => setNewRepository({...newRepository, url: e.target.value})} 
        />
        <input type="text" placeholder="Title" 
        value={newRepository?.title} 
        onChange={e => setNewRepository({...newRepository, title: e.target.value})} 
        />
        <input type="text" placeholder="Techs" 
        value={newRepository?.techs?.join(', ')} 
        onChange={e => setNewRepository({...newRepository, techs: e.target.value.split(', ')})} 
        />
        
      </form>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
