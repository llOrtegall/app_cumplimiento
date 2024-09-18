import { useState, useEffect } from 'react';
import { URL_API } from '../utils/contants';
import { Persona } from '../types/Persona';
import axios from 'axios';

export function usePersonas() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`${URL_API}/personas`)
      .then((response) => {
        setPersonas(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const personasFiltered = personas.filter((p) => {
    if (!search) return personas;
    return p.identificacion.includes(search) || p.nombres.toLowerCase().includes(search.toLowerCase());
  });

  return { personas: personasFiltered, search, setSearch, loading, error };
}