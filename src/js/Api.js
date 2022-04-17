import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
const API_KEY = '25182566-6d97045846fa1b6cae2a84492';

export const getImg = async (q, page) => {
  const data = await axios.get(
    `?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`,
  );

  return data;
};
