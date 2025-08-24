// import { useState, useEffect } from 'react';
// import { eventData, TimelineEvent } from './types';
// import Header, { ThemeProvider } from './components/Header';
// import Timeline from './components/Timeline';
// import EventModal from './components/EventModal';

// const App = () => {
//   const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
//   const [currentYear, setCurrentYear] = useState<string>('1977');
//   const [showModal, setShowModal] = useState<boolean>(false);

//   useEffect(() => {
//     const defaultEvent =
//       eventData.find(e => String(e.year) === '1977') || eventData[0];
//     if (defaultEvent) {
//       setCurrentYear(String(defaultEvent.year));
//       setSelectedEvent(defaultEvent);
//     }
//   }, []);

//   const handleYearSelect = (year: string | number) => {
//     setCurrentYear(String(year));
//     const event = eventData.find(e => String(e.year) === String(year));
//     setSelectedEvent(event || null);
//     setShowModal(false); 
//   };

//   const handleOpenModal = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <ThemeProvider>
//       <div id="app-container">
//         <Header />
//         <Timeline onSelectYear={handleYearSelect} events={eventData} />
//         <main>
//           <section id="timeline" className="flashcard-container">
//             {selectedEvent ? (
//               <article>
//                 <h2>
//                   <time dateTime={String(selectedEvent.year)}>
//                     {selectedEvent.year}
//                   </time>
//                 </h2>
//                 <h3>{selectedEvent.title}</h3>
//                 <figure>
//                   <img
//                     src={selectedEvent.image}
//                     alt={selectedEvent.title}
//                     width="600"
//                   />
//                   <figcaption>
//                     <p>{selectedEvent.description}</p>
//                   </figcaption>
//                 </figure>
//                 <footer>
//                   <button className="toggle-btn" onClick={handleOpenModal}>
//                     Learn More
//                   </button>
//                 </footer>
//               </article>
//             ) : (
//               <article>
//                 <h2>
//                   <time dateTime={currentYear}>{currentYear}</time>
//                 </h2>
//                 <p>No event found for this year.</p>
//               </article>
//             )}
//           </section>
//         </main>
//         {showModal && selectedEvent && (
//           <EventModal event={selectedEvent} onClose={handleCloseModal} />
//         )}
//       </div>
//     </ThemeProvider>
//   );
// };

// export default App;


import { useState, useEffect, useRef } from 'react';
import { eventData, TimelineEvent } from './types';
import Header, { ThemeProvider } from './components/Header';
import Timeline from './components/Timeline';
import EventModal from './components/EventModal';

const App = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [currentYear, setCurrentYear] = useState('1977');
  const [showModal, setShowModal] = useState(false);
  const triggerBtnRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // This effect ensures the default card is rendered on initial load
    const defaultEvent = eventData.find(e => String(e.year) === '1977');
    if (defaultEvent) {
      setSelectedEvent(defaultEvent);
    }
  }, []);

  const handleYearSelect = (year: string | number) => {
    setCurrentYear(String(year));
    const event = eventData.find(e => String(e.year) === String(year));
    setSelectedEvent(event || null);
  };

  const handleOpenModal = (event: TimelineEvent, trigger: HTMLElement) => {
    setSelectedEvent(event);
    setShowModal(true);
    triggerBtnRef.current = trigger;
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // When the modal closes, re-select the current year's event to display the card again
    const event = eventData.find(e => String(e.year) === currentYear);
    setSelectedEvent(event || null);
  };

  return (
    <ThemeProvider>
      <div id="app-container">
        <Header />
        <Timeline onSelectYear={handleYearSelect} events={eventData} />
        <main>
          <section id="timeline" className="flashcard-container">
            {selectedEvent ? (
              <article>
                <h2><time dateTime={String(selectedEvent.year)}>{selectedEvent.year}</time></h2>
                <h3>{selectedEvent.title}</h3>
                <figure>
                  <img src={selectedEvent.image} alt={selectedEvent.title} width="600" />
                  <figcaption>
                    <p>{selectedEvent.description}</p>
                  </figcaption>
                </figure>
                <footer>
                  <button
                    className="toggle-btn"
                    onClick={(e) => handleOpenModal(selectedEvent, e.currentTarget)}
                    aria-controls="event-modal-dialog"
                  >
                    Learn More
                  </button>
                </footer>
              </article>
            ) : (
              <article>
                <h2><time dateTime={currentYear}>{currentYear}</time></h2>
                <p>No event found for this year.</p>
              </article>
            )}
          </section>
        </main>
        {showModal && selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={handleCloseModal}
            triggerElement={triggerBtnRef.current}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;

