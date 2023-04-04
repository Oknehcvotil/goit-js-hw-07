import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");

let instance;

gallery.addEventListener("click", onGalleryClick);
gallery.insertAdjacentHTML("afterbegin", createImagesItems(galleryItems));

function createImagesItems(items) {
  return items
    .map(
      ({ preview, original, description }) => `  <li class="gallery__item">
                    <a class="gallery__link" href="${original}">
                        <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                        />
                    </a>
                </li>`
    )
    .join("");
}

function onGalleryClick(e) {
  e.preventDefault();

  const isGalleryImg = e.target.classList.contains("gallery__image");

  if (!isGalleryImg) {
    return;
  }

  openModalImg(e);
}

function openModalImg(e) {
  instance = basicLightbox.create(`
    <img src="${e.target.dataset.source}" width="800" height="600">
`);

  instance.show();

  document.addEventListener("keydown", onEscapeClose);
}

function onEscapeClose(e) {
  console.log(e);
  if (e.code === "Escape") {
    instance.close();
    document.removeEventListener("keydown", onEscapeClose);
  }
}
