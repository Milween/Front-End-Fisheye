/**
 * Fonction qui crée et intègre le contenu de la lightbox
 * @param {string} title - titre de l'image à afficher
 * @param {string} source - source de l'image à afficher
 * @param {string} type - type de l'image à afficher
 * @param {string} id - identifiant de l'image à afficher
 * @param {object} lightbox - lightbox
 * @param {string} option - une string "next" ou "prev"
 */
 
function lightboxContent(title, source, type, id, lightbox) {
  
  //Création de la div de la lightbox de fermeture
  const close = document.createElement("button");
  close.setAttribute("aria-label", "close");
  close.classList.add("lightbox__close");
  close.addEventListener("click", () => closeLightbox());
  
  //Création de la div de la lightbox suivant
  const next = document.createElement("button");
  next.setAttribute("aria-label", "next");
  next.classList.add("lightbox__next");
  next.addEventListener("click", () => nextLightbox(source, id));
  
  //Création de la div de la lightbox précédent
  const prev = document.createElement("button");
  prev.setAttribute("aria-label", "prev");
  prev.classList.add("lightbox__prev");
  prev.addEventListener("click", () => prevLightbox(source, id));
  

  //Écouteur d'événement pour les touches claviers
  document.addEventListener("keydown", keydown, false);
  function keydown(e) {
    if (e.code == "ArrowRight") {
      nextLightbox(source, id);
    } else if (e.code == "ArrowLeft") {
      prevLightbox(source, id);
    } else if (e.code == "Escape") {
      closeLightbox();
    }
    document.removeEventListener("keydown", keydown, false); //évite la redondance
  }

  //Création de la div de la lightbox de l'image
  const container = document.createElement("div");
  container.classList.add("lightbox__container");
  
  //Création de l'image ou la vidéo
  const content =
    type == "image"
      ? document.createElement("img")
      : document.createElement("video");

  type == "video" && content.setAttribute("controls", true);
  
  type == "video" && content.setAttribute("autoplay", true);
  content.setAttribute("src", source);
  content.classList.add("thumbnail");
  content.setAttribute("alt", "image");
  //Création du titre de l'image
  const titleText = document.createElement("h2");
  titleText.textContent = title;

  // Création des sous titres, si c'est une vidéo :
  if (type == 'video') {
    const subtitle = document.createElement('track');
    subtitle.setAttribute('kind', 'subtitles');
    subtitle.setAttribute('label', 'English');
    subtitle.setAttribute('srclang', 'en');
    subtitle.setAttribute('src', 'chrome-subtitles-zh.vtt');
    const paragraph = document.createElement('h3');
    paragraph.textContent = "Ce navigateur ne prend pas en en charge l'élément vidéo.";
    content.appendChild(subtitle);
    content.appendChild(paragraph);

  }
  // Accroche les éléments créés
  lightbox.appendChild(close);
  lightbox.appendChild(next);
  lightbox.appendChild(prev);
  lightbox.appendChild(container);
  container.appendChild(content);
  container.appendChild(titleText);
}

/**
 * Fonction qui retourne la lightbox en objet HTML
 * @param {string} title - titre de l'image à afficher
 * @param {string} source - source de l'image à afficher
 * @param {string} type - type de l'image à afficher
 * @param {string} id - identifiant de l'image à afficher
 * @return {HTML} lightbox [HTML object]
 */

function lightbox(title, source, type, id) {
  
  //Crée la div global de la lightbox
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");
  lightbox.setAttribute("alt", "image closeup view");
  
  // Crée et ajoute le contenu de la lightbox
  lightboxContent(title, source, type, id, lightbox);
  return lightbox;
}

/**
 * Fonction qui affiche la lightbox dans le DOM
 * @param {string} title - titre de l'image à afficher
 * @param {string} source - source de l'image à afficher
 * @param {string} type - type de l'image à afficher
 * @param {string} id - identifiant de l'image à afficher
 */

function showLightbox(title, source, type, id) {
  document
    .getElementById("main")
    .appendChild(lightbox(title, source, type, id));
  }

/* BOUTONS */

/**
 *  Function qui ferme la lightbox
 */
function closeLightbox() {
  document.querySelector(".lightbox").remove();
}

/**
 *  Function qui affiche l'image suivante dans la lightbox
 * @param {string} source - source de l'image affichée
 * @param {string} id - identifiant de l'image affichée
 */
function nextLightbox(source, id) {
  lightboxNextPrev(source, id, "next");
}

/**
 *  Function qui affiche l'image précédente dans la lightbox
 * @param {string} source - source de l'image affichée
 * @param {string} id - identifiant de l'image affichée
 */
function prevLightbox(source, id) {
  lightboxNextPrev(source, id, "prev");
}

/**
 * Function qui affiche l'image suivante ou précédente dans la lightbox
 * @param {string} source - source de l'image affichée
 * @param {string} id - identifiant de l'image affichée
 * @param {string} option - une string "next" ou "prev"
 */

async function lightboxNextPrev(source, id, option) {
  
  // Récupère un tableau de tous les médias (objets)
  const { mediaFiltered } = await getPhotographer();
  
  // Sélectionne l'index du média qui est affiché
  let mediaIndex = await mediaFiltered.findIndex((media) => media.id == id);
  
  // Incrémente ou Décrémente mediaIndex
  option == "next" ? mediaIndex++ : mediaIndex--;
  
  // Vérifie que nous ne sommes pas en début ou en fin de tableau
  const max = mediaFiltered.length;
  const min = -1;
  if (mediaIndex == min) {
    mediaIndex = max - 1;
  } else if (mediaIndex == max) {
    mediaIndex = 0;
  }
  
  // Récupère le nouveau media avec tous ses attributs
  const newMedia = mediaFiltered[mediaIndex];
  
  // * Récupère le type du nouveau media
  const newMediaType = newMedia.image ? "image" : "video";
  
  // * Récupère la source du nouveau media
  const newMediaName =
    newMediaType == "image" ? newMedia.image : newMedia.video;
  const newMediaSource = "assets/" + source.split("/")[1] + "/" + newMediaName;
  
  // * Récupère le titre du nouveau media
  const newMediaTitle = newMedia.title;
  
  // * Récupère l'id du nouveau media
  const newMediaId = newMedia.id;
  
  // Récupère l'élément DOM lightbox
  const recupLightbox = document.querySelector(".lightbox");
  
  // ! Vide la lightbox
  document.querySelector(".lightbox").innerHTML = "";
  // Crée et ajoute le nouveau contenu de la lightbox
  lightboxContent(
    newMediaTitle,
    newMediaSource,
    newMediaType,
    newMediaId,
    recupLightbox
  );
}