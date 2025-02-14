import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

export interface iPerson {
  id: number;
  name: string;
  number: string;
}

const getAll = () => {
  const request = axios.get<iPerson[]>(baseUrl)
  return request.then(response => {
    return response
  })
  // ou só o seguinte
  // return axios.get<iPerson[]>(baseUrl);
};

const create = (newObject: iPerson) => {
  return axios.post<iPerson>(baseUrl, newObject);
};

const update = (id: number, newObject: iPerson) => {
  return axios.put<iPerson>(`${baseUrl}/${id}`, newObject);
};

export default {
  getAll,
  create,
  update,
};
