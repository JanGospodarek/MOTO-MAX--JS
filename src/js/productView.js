import { View } from "./View.js";
class productView extends View {
  data;
  parentElement = document.querySelector(".contentMain");
  products = document.querySelectorAll(".product");
  window = document.querySelector(".productModal");
  btnOpen;

  generateMarkup() {
    let markup = "";

    this.data.forEach((product, i) => {
      markup += `
          <button data-id="${product.id}" href="" class="product">
          <div class="preview flexCenter">
            <img src="./src/img/products/${product.fileName}.png" alt="produkt${i}" />
          </div>
          <p>${product.describtion}</p>
          <p class="cena">${product.price}zł</p>
        </button>`;
    });
    return markup;
  }
}

export const products = new productView();
class productPreviewView extends View {
  parentElement = document.querySelector(".contentMain");
  window = document.querySelector(".productModal");
  data;

  formData;
  addHandlerProductMenu(handler) {
    this.parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      const btn = e.target.closest(".product");
      if (!btn) return;
      const dataset = btn.dataset.id;
      handler(dataset);
    });
  }
  addHandlerSubmit(handler) {
    const form = document.querySelector(".productForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);

      document.querySelector("#succesMsg").classList.remove("hidden");
      setTimeout(() => {
        document.querySelector("#succesMsg").classList.add("hidden");
      }, 2000);
    });
  }
  renderFormSelect() {
    if (this.data.type === "manetki") {
      return " ";
    } else {
      return `
      <p class="rozmiary">
              Wybierz rozmiar:
              <select name="rozmiar">
                <option value="L">L</option>
                <option value="M">M</option>
                <option value="S">S</option>
                <option value="XS">XS</option>
              </select>
            </p>
      `;
    }
  }
  generateMarkup() {
    let markup = `
    <div class="imgPrev flexCenter">
          <img src="./src/img/products/${this.data.fileName}.png" alt="" />
        </div>
        <div class="describtionPrev">
          <p>${this.data.describtion}</p>
           <p class="cena">${this.data.price} zł</p>
          <p class="opis">${this.data.additionalDesc}</p>
          <form class="productForm">
            ${this.renderFormSelect()}
            <button class="dodaj" type="submit"  >Dodaj do koszyka</button
          </form>
        </div>
    `;
    return markup;
  }
}
export const productsPrevs = new productPreviewView();
