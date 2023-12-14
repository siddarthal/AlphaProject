// EventMapComponent.jsx
import React from "react";
import Iframe from "react-iframe";

const EventMapComponent = ({ latitude, longitude }) => {
    console.log('lATT',latitude,'LONG',longitude);
  const googleMapsUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&output=embed`;

  return (
    <Iframe url={googleMapsUrl} width="100%" height="100%" frameBorder="0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
  );
};

export default EventMapComponent;
