import axios from 'axios';
import { iPerson } from '../compoents/Phonebook';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get<iPerson[]>(baseUrl)
  return request.then(response => {
    return response
  })
  // ou só o seguinte
  // return axios.get<iPerson[]>(baseUrl);
};

const create = (person: iPerson) => {
  return axios.post<iPerson>(baseUrl, person);
};

const update = (id: string, person: iPerson) => {
  return axios.put(`${baseUrl}/${id}`, person);
};

const deleteById = (id: string) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll,
  create,
  update,
  deleteById,
};
