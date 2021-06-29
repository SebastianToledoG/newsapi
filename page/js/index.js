//Esta es la funcion principal para obtener las noticias. Recibe los datos de la noticia desde la pagina de serpwow y los maneja en un documento JSON, cuando recibe los datos los guarda en un mapa de datos en donde los acomoda en un HTML para dar formato a las fichas y que aparescan con los datos de cada noticia
const obtenerNoticias = async() => {
    //En esta parte se inicialisa el loader
    let divListadoNoticias = document.querySelector("#divListadoNoticias");
    divListadoNoticias.innerHTML = `<div style="text-align:center">
                                      <img src="assets/load.gif" width=300 height=300>
                                    </div>`;
    const url = `https://api.serpwow.com/live/search?api_key=&q=economía+digital&include_html=true&google_domain=google.com.mx&location=Mexico&gl=mx&hl=es&search_type=news&sort_by=relevance&num=30&output=json`;

    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    let noticias = resultado.news_results;

    let listadoNoticiasHTML = ``;

    //Este es el mapa de datos donde se van a acomodar y luego presentar las noticias
    noticias.map(noticia => {
        const { thumbnail, link, title, snippet, source, date } = noticia;
        //Aqui establesco el formato y el contenido de la imagen de la notcia
        let imagen = (thumbnail) ? `<div class="card-image">
                                 <img src="${thumbnail}" alt=${title}>
                                 <span class="text-muted fst-italic fs-6">${source}</span>
                                 </div>` : null;
        //Este va a ser el formato con el que se van a ir presentando las noticias
        listadoNoticiasHTML +=
            `
            <div class="card mb-4 rounded-3 shadow-sm" style="max-width: 30%; min-width: 350px">
              <div class="row">
              <div class="card-header py-3">
              <h4 class="">${imagen}</h4>
            </div>
                <div class="col-md">
                  <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text" style="max-height: 5%">${snippet}</p>
                    <p class="card-text"><small class="text-muted">${date}</small></p>
                    <div class="card-action">
                      <a
                        href="${link}"
                        target="_blank"
                        rel="nooper noreferrer"
                        class="btn btn-outline-info"
                        style="max-width: 310px; min-width: 300px">Ver noticia completa
                      </a>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div style="max-width: 5px; min-width: 5px"> </div>
          `;
    });
    //Esto es la transicion desde que que se reciben los documentos hasta que se muestran
    setTimeout(() => {
        divListadoNoticias.innerHTML = listadoNoticiasHTML;
    }, 2000);
}