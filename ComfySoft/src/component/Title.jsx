import React from 'react';

const Title = ({location}) => {
  return <div className='title  py-5'>
    <h3 className='fs-2 container mb-0 px-4 fw-bold'><a href="#" className='text-decoration-none me-2'>Home</a> {location}</h3>
  </div>;
};

export default Title;
