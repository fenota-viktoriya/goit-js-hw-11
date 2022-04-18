import { ApiService } from './js/Api';
import { getRefs } from './js/getRef';
import { fullGallery } from './js/full-Gallery';
import { checkRequest } from './js/check-request';
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
  clearGallery(containerRef, btnRef);
  apiService.resetPage();

  axiosImg()
    .then(response => checkRequest(response))
    .then(response => createGallery(response.hits))
    .catch(() => {
      btnRef.classList.add('is-hidden');
      Notify.failure("We're sorry, but you've reached the end of search results.");
    });
});

function createGallery(response) {
  containerRef.insertAdjacentHTML('beforeend', renderMarkup(response));
  lightbox.refresh();
}

async function axiosImg() {
  const response = await apiService.axios().then();
  btnRef.classList.remove('is-hidden');
  return response;
}

function clearGallery(refs) {
  refs.innerHTML = '';
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
