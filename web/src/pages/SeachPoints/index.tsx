import React, { useEffect, ChangeEvent, useState } from 'react';
import {Link} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import axios from 'axios';
import api from '../../services/api';
import Swal from 'sweetalert2'

import './styles.css'

interface Point{
  id: number,
  name: string,
  image: string,
  image_url: string,
  latitude: number,
  longitude: number,
}

interface Params{
  selectedUf: string,
  selectedCity: string
}

interface Data{
  point: {
    id: number,
    image: string,
    image_url: string,
    name: string,
    email: string,
    whatsapp: string,
    city: string,
    uf: string 
  },
  items: {
    title: string,
  }[]
}

const SearchPoints = () => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  var data: Data;

  
  

  const routeParams = {selectedUf, selectedCity} as Params;

  interface IBGEUFResponse {
    sigla: string
  }

  interface IBGECityResponse {
    nome: string
  }

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);

      setUfs(ufInitials);
    })

  }, []);

  //Carregar as cidades sempre que a UF mudar
  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames);
      })

  }, [selectedUf]);

  useEffect(() => {
    async function load() {
    await api.get('points', {
      params: {
        city: routeParams.selectedCity,
        uf: routeParams.selectedUf,
        items: [1,2,3,4,5,6]
      }
    }).then(response => {
      setPoints(response.data);
      console.log(response.data);
    })
   
  }
  load();
  },[selectedCity]);//Sempre que o valor da cidade selecionada mudar, irá renderizar novamente

  
   

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    

    setSelectedUf(uf);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;

    setSelectedCity(city);
  }

  async function handleSeach(id: number){

    await api.get(`points/${id}`).then(response => {
      data = response.data;
    })
  

    Swal.fire({
      title: `${data.point.name}`,
      html:`
      <br><br> ${data.items.map(item => item.title).join(', ')} <br>
      Email: ${data.point.email} <br>
      Whatsapp: ${data.point.whatsapp} <br><br>

      <br><br>


      ${data.point.city},${data.point.uf}
      
      
      `,
      imageUrl: `${data.point.image_url}`,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      showCloseButton: true,
      showConfirmButton: false,
      



    })

  }

  
 
  return(
   
       <div id="page-create-point">


      <header>
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>

        <div className="field-group">
          <div className="field">
          <label htmlFor="uf">Estado(UF)</label>
              
              <select name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectUf}
              >
                <option value="0">Selecione uma UF</option>
                {ufs.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
          </div>

          <div className="field">
          <label htmlFor="cidade">Cidade</label>
              <select 
              name="city" 
              id="city"
              value={selectedCity}
              onChange={handleSelectCity}
              >
                <option value="0">Selecione uma cidade</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
          </div>


          
        </div>
      </header>

      <p>Foram encontrados  {points.length} resultado</p>
      <hr/>

      <div className="card-group">

        {points.map(point =>(
          
          <a href="#" key={point.id} onClick={()=>{handleSeach(point.id)}}>
          <div className="card">
            <img src={point.image_url} alt={point.name}/>
            <h1>{point.name}</h1>
            
        <span>Cidade: {selectedCity}</span>
        <span>Uf: {selectedUf}</span>
            
          </div>
          </a>
        
        ))}
    
      
      </div>
      

      </div>
  
  )
}





export default SearchPoints;