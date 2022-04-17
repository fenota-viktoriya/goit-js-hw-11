import { getImg } from './js/Api';
import { getRefs } from './js/getRef';
import { renderMarkup } from './js/renderingMarkup';

const { formRef, containerRef } = getRefs();

formRef.addEventListener('submit', onSubmit);
onSubmit();

function onSubmit(e) {
  e.preventDefault();
  let input;
  let page = 1;
  input = e.currentTarget.searchQuery.value.trim();
  if (!input) {
    return;
  }
  try {
    getImg(input, page).then(response => {
      renderMarkup(containerRef, response);
    });
  } catch (error) {
    console.error(error);
  }
}
