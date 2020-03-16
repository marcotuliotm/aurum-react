import api from "./api";

const configure = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;',
  },
};


const URI_API = '/cases';


export class CasesApi {
  static getAll = (page = 0, pageSize = 5) => api.get(`${URI_API}?page=${page}&size=${pageSize}`, configure);
  static find = (filter='', page = 0, pageSize = 5) => api.get(`${URI_API}?search=${filter}&page=${page}&size=${pageSize}`, configure);
  static create = aCase => api.post(`${URI_API}`, aCase, configure);
  static remove = id => api.delete(`${URI_API}/${id}`, configure);
  static update = aCase => api.put(`${URI_API}/${aCase.id}`, aCase, configure);
}

export default CasesApi;