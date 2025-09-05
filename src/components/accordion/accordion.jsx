import React, { useState } from 'react';
import "./accordion.css";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <div className="accordion-item">
      <button className="accordion-btn" onClick={toggleAccordion}>
        <div className="accordion-btn-content">
        <span>{title}</span>
        <span className={`accordion-icon ${isOpen ? "open" : ""}`}>
             {isOpen ? "−" : "+"}
        </span>
        </div>
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default Accordion;