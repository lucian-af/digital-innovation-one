var lista = new Array();
const url = 'https://random.dog/';

$(document).ready(() => {
  loadImages();

  window.setInterval(() => {
    refresh();
  }, 60000);
});

function getImages() {
  return fetch(`${url}doggos`);
}

function getImage(id) {
  const hash = indexRandomico(lista);

  fetch(`${url}${hash}`)
    .then(response => response.body)
    .then(body => {
      const reader = body.getReader();

      return new ReadableStream({
        start(controller) {
          return pump();

          function pump() {
            return reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }

              controller.enqueue(value);
              return pump();
            });
          }
        }
      })
    })
    .then(stream => new Response(stream))
    .then(response => response.blob())
    .then(blob => URL.createObjectURL(blob))
    .then(url => attrImage(url, id))
    .catch(err => getImage(id));
}

function indexRandomico(array) {
  const keys = Object.keys(array);
  const len = keys.length;
  const rnd = Math.floor(Math.random() * len);

  return array[keys[rnd]];
}

function attrImage(url, id) {
  $(`img.${id}`).attr('src', url);
}

function loadImages() {
  getImages()
    .then(res => res.json())
    .then(tipo => tipo.filter(t => t.endsWith('.png') || t.endsWith('.jpg') || t.endsWith('.jpeg')))
    .then(r => lista = [...lista, r][0])
    .then(_ => refresh());
}

function refresh() {
  $('img[class^=box]').each(index => {
    getImage($($('img[class^=box]')[index])[0].className);
  });
}

function sobre() {
  $('#sobre').css('display', 'flex');
  $('.carrossel').css('display', 'none');
  $('.patinhas').css('display', 'none');
}

function inicio() {
  $('.carrossel').css('display', 'flex');
  $('#sobre').css('display', 'none');
  $('.patinhas').css('display', 'initial');
}
