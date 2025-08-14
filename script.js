document.addEventListener("DOMContentLoaded", () => {
  const yearButtons = document.querySelectorAll(".year-btn, nav.year button");
  const flashcardContainer = document.querySelector("#timeline");
  const defaultCardHTML = document.querySelector("#default-card").innerHTML;
  const defaultYear = "1977";
  
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modal-text");
  let events = [];

  const closeModal = () => modal.classList.remove("show");

  modal.querySelector(".close").addEventListener("click", closeModal);
  window.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  flashcardContainer.addEventListener("click", e => {
    const btn = e.target.closest(".toggle-btn");
    if (!btn) return;
    modalText.textContent = btn.dataset.more || "No additional details available.";
    modal.classList.add("show");
  });

  const loadEvents = async () => {
    try {
      const response = await fetch("data/events.json");
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      events = Array.isArray(data) ? data : [];
    } catch (err) {
      console.error(err);
    } finally {
      flashcardContainer.innerHTML = defaultCardHTML;
    }
  };

  const setActiveButton = year => {
    yearButtons.forEach(b => {
      const btnYear = b.dataset.year || b.textContent.trim();
      b.classList.toggle("active", btnYear === year);
    });
  };

  const displayEvent = ev => {
    flashcardContainer.innerHTML = `
      <article>
        <h2><time datetime="${ev.year}">${ev.year}</time></h2>
        <h3>${ev.title}</h3>
        <figure>
          <img src="${ev.image}" alt="${ev.title}" width="600">
          <figcaption><p>${ev.description}</p></figcaption>
        </figure>
        <footer>
          <button class="toggle-btn" 
                  data-more="${ev.moreInfo || 'No additional details available.'}">
            Learn More
          </button>
        </footer>
      </article>
    `;
  };

  const displayNoEvent = year => {
    flashcardContainer.innerHTML = `
      <article>
        <h2><time datetime="${year}">${year}</time></h2>
        <p>No event found for this year.</p>
      </article>
    `;
  };

  const handleYearClick = btn => {
    const year = (btn.dataset.year || btn.textContent).trim();
    setActiveButton(year);

    if (year === defaultYear) {
      flashcardContainer.innerHTML = defaultCardHTML;
      return;
    }

    const eventData = events.find(e => String(e.year) === year);
    eventData ? displayEvent(eventData) : displayNoEvent(year);
  };

  yearButtons.forEach(btn => {
    btn.addEventListener("click", () => handleYearClick(btn));
  });

  document.getElementById("theme-switch")?.addEventListener("change", () => {
    document.body.classList.toggle("dark-theme");
  });

  loadEvents();
});
