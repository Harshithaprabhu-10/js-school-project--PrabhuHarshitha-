import type { TimelineEvent } from "./types.js";

export const setActiveButton = (year: string, buttons: NodeListOf<Element>) => {
  buttons.forEach(b => {
    const btnYear = (b as HTMLElement).dataset.year || b.textContent?.trim();
    (b as HTMLElement).classList.toggle("active", btnYear === year);
  });
};

export const renderDefaultCard = (container: HTMLElement, html: string) => {
  container.innerHTML = html;
};

export const renderEvent = (container: HTMLElement, ev: TimelineEvent) => {
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

export const renderNoEvent = (container: HTMLElement, year: string) => {
  container.innerHTML = `
    <article>
      <h2><time datetime="${year}">${year}</time></h2>
      <p>No event found for this year.</p>
    </article>
  `;
};
