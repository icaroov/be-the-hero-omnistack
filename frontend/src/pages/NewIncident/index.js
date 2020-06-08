import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Import API
import api from '../../services/api';

// Styles
import './styles.css';

// Import Icons
import { FiArrowLeft} from 'react-icons/fi';

// Import assets
import logoImg from '../../assets/logo.svg';

export default function NewIncident () {

  const history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(event) {
    event.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Auth: ongId,
        }
      })

      history.push('/profile');
    } catch (error) {
      alert('Erro ao cadastrar caso, tente novamente.');
      
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso com máximo de detalhes possíveis para achar o Herói adequado que esteja disposto a ajudar.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input 
          placeholder="Título do caso"
          value={title}
          onChange={event => setTitle(event.target.value)}
          />

          <textarea 
          placeholder="Descrição"
          value={description}
          onChange={event => setDescription(event.target.value)}
          />

          <input 
          placeholder="Valor em reais"
          value={value}
          onChange={event => setValue(event.target.value)}
          />

          <button className="button" type="submit" >Cadastrar</button>
        </form>
      </div>
    </div>
  );
}