import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
const API_KEY = '25182566-6d97045846fa1b6cae2a84492';

export class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async axios() {
    try {
      const response = await axios.get(
        `?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=100&image_type=photo&orientation=horizontal&safesearch=true`,
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
