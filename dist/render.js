export const setActiveButton = (year, buttons) => {
    buttons.forEach(b => {
        var _a;
        const btnYear = b.dataset.year || ((_a = b.textContent) === null || _a === void 0 ? void 0 : _a.trim());
        b.classList.toggle("active", btnYear === year);
    });
};
export const renderDefaultCard = (container, html) => {
    container.innerHTML = html;
};
export const renderEvent = (container, ev) => {
    container.innerHTML = `
    <article>
      <h2><time datetime="${ev.year}">${ev.year}</time></h2>
      <h3>${ev.title}</h3>
      <figure>
        <img src="${ev.image}" alt="${ev.title}" width="600">
        <figcaption><p>${ev.description}</p></figcaption>
      </figure>
      <footer>
        <button class="toggle-btn" 
                data-more="${ev.moreInfo || "No additional details available."}">
          Learn More
        </button>
      </footer>
    </article>
  `;
};
export const renderNoEvent = (container, year) => {
    container.innerHTML = `
    <article>
      <h2><time datetime="${year}">${year}</time></h2>
      <p>No event found for this year.</p>
    </article>
  `;
};
//# sourceMappingURL=render.js.map