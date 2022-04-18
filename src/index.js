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
  axiosImg()
    .then(response => checkRequest(response))
    .then(response => createGallery(response.hits))
    .catch(() => Notify.info("We're sorry, but you've reached the end of search results."));
});

function createGallery(data) {
  containerRef.insertAdjacentHTML('beforeend', renderMarkup(data));

  lightbox.refresh();
}

function checkRequest(response) {
  if (response.hits.length === 0) {
    return;
  }

  Notify.success(`Hooray! We found ${response.totalHits} totalHits images.`);

  return response;
}

async function axiosImg() {
  const response = await apiService.axios().then();
  btnRef.classList.remove('is-hidden');
  return response;
}

function clearGallery() {
  getRefs.innerHTML = '';
}

btnRef.addEventListener('click', onClickLoadMoreBtn);

async function onClickLoadMoreBtn() {
  apiService.incrementPage();
  axiosImg()
    .then(response => fullGallery(response))
    .then(response => createGallery(response.hits))
    .catch(() => {
      btnRef.classList.add('is-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    });
}

function fullGallery(response) {
  if (response.hits.length === 0) {
    return;
  }
  return response;
}
