import { FiSearch } from 'react-icons/fi';
import { useState} from 'react';
import './styles.css'
import api from './services/api'

function App() {
  const [input, setInput] = useState('')
  const [cep,setCep] = useState({});

  async function handleSearch() {
    if(input === ''){
      alert("preencha algum cep!")
      return;
    } 

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Ops, erro ao buscar CEP!");
      setInput("");
    }
  }
  return (
    <div className="container">
      <h1 className = "title">Buscador CEP</h1> 
      <div className ="containerInput">
        <input type="text" 
        placeholder="Digite seu cep ..." 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

      <button className= "buttonSearch" onClick={handleSearch}>
        <FiSearch size={25} color="#FFFFFF"/>
      </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main"> 
        <h2>CEP: {cep.cep}</h2>
        <span>{cep.logradouro} </span>
        <span> Complemento: {cep.complemento} </span>
        <span> {cep.bairro}</span>
        <span> {cep.localidade} </span>

      </main>
      )}
     
    </div>
    

  );
}

export default App;
