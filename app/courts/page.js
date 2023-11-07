"use client"
import React from 'react';
import useGeoLocation from '../components/useGeoLocation';

const CourtsPage = () => {
  const location = useGeoLocation();

  return (
    <div>
      {location.loaded ? JSON.stringify(location.coordinates) : "Location not available"}
    </div>
  );  
};

export default CourtsPage;
