import React from 'react';

const EventStatus = ({ message, type }) => {
  const messageTypeClass = type === 'success' ? 'text-success' : 'text-danger';
  return <p className={messageTypeClass}>{message}</p>;
};

export default EventStatus;
