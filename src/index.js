import { ApiService } from './js/Api';
import { getRefs } from './js/getRef';
import { renderMarkup } from './js/renderingMarkup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './style.css';

const { formRef, containerRef, btnRef } = getRefs();

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const apiService = new ApiService();

btnRef.classList.add('is-hidden');
formRef.addEventListener('submit', e => {
  e.preventDefault();

  apiService.query = e.currentTarget.searchQuery.value.trim();

  if (apiService.query === '') {
    return;
  }
  clearGallery();
  apiService.resetPage();
  checkRequest();
});

function createGallery(data) {
  containerRef.insertAdjacentHTML('beforeend', renderMarkup(data));

  lightbox.refresh();
}

async function checkRequest() {
  const response = await apiService.axios();

  if (response.hits.length === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }

  Notify.success(`Hooray! We found ${response.totalHits} totalHits images.`);

  axiosImg();
}

async function axiosImg() {
  const response = await apiService.axios();
  createGallery(response.hits);
  btnRef.classList.remove('is-hidden');
}

function clearGallery() {
  getRefs.innerHTML = '';
}

btnRef.addEventListener('click', onClickLoadMoreBtn);

async function onClickLoadMoreBtn() {
  const response = await apiService.axios();
  const max_page = response.totalHits;
  const per_page = response.per_page;
  if (max_page) {
    apiService.incrementPage();
    axiosImg();
  }
  btnRef.classList.add('is-hidden');
  //Notify.failure('the end');
}
