import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

function Accordian({ options = [] }) {
  const [open, setOpen] = useState(null); // Initially no item is open
  const toggle = (id) => {
    setOpen(open === id ? null : id); // Toggle the open state
  };

  return (
    <div>
      <Accordion open={open} toggle={toggle}>
        {options.map((option, index) => (
          <AccordionItem key={`${option.title}-${index}`}>
            <AccordionHeader targetId={index}>{option.title}</AccordionHeader>
            <AccordionBody accordionId={index}>
              {option.description}
            </AccordionBody>
          </AccordionItem>
        ))}
      </Accordion>

    </div>
  );
}

export default Accordian;
