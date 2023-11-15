"use client"
import React from 'react';
import useGeoLocation from '../components/useGeoLocation';
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button';


const CourtsPage = () => {
  const location = useGeoLocation();
  
  const tennisCourtsLondon = [
    {
    name: 'Ambleside Park',
    coordinates: {
      lat: 43.0171994,
      lng: -81.2922602,
    },
    courtType: 'Concrete',
    googleMapsLink: 'https://www.google.com/maps/place/Tennis+Courts/@43.0175446,-81.2925177,16z/data=!4m6!3m5!1s0x882eef074074f989:0x4fce1cc7c0edce2f!8m2!3d43.0179434!4d-81.2930172!16s%2Fg%2F11rxjsv5lg?entry=ttu',
    distance: '',
    },
    {
      name: 'Gibbons Park',
      coordinates: {
        lat:43.001341,
        lng:-81.2712662,
      },
      courtType: 'Concrete',
      googleMapsLink: 'https://www.google.com/maps/place/%E2%80%8BGibbons+Park/@43.001341,-81.2712662,15.52z/data=!4m6!3m5!1s0x882eee1ceaeee5a5:0x9810a1c5a240d421!8m2!3d42.9983605!4d-81.2606828!16s%2Fg%2F1td4kr_j?entry=ttu',
      distance: ''
    },
    {
      name: 'Hastings Park',
      coordinates: {
        lat:43.024892,
        lng:-81.3051375,
      },
      courtType: 'Concrete',
      googleMapsLink: 'https://www.google.com/maps/place/Hastings+Park+Tennis+Courts/@43.024892,-81.3051375,13.57z/data=!4m10!1m2!2m1!1stennis!3m6!1s0x882eee6535c24305:0x9cc71ea20bcc893c!8m2!3d43.0262718!4d-81.263977!15sCgZ0ZW5uaXNaCCIGdGVubmlzkgEMdGVubmlzX2NvdXJ0mgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJoT1hReVdVaDNFQUXgAQA!16s%2Fg%2F11fy_4cwwd?entry=ttu',
      distance: ''
    },
    {
      name: 'University Tennis Centre',
      coordinates: {
        lat:43.0045373,
        lng:-81.2664412,
      },
      courtType: 'Rubberized',
      googleMapsLink: 'https://www.google.com/maps/place/University+Tennis+Centre/@43.0045373,-81.2664412,13.57z/data=!3m1!5s0x882eee175d557031:0xfbd66e55b5771baf!4m10!1m2!2m1!1stennis!3m6!1s0x882eee176f58e7a5:0xf0fdecb3baf354d9!8m2!3d43.0064829!4d-81.2696729!15sCgZ0ZW5uaXNaCCIGdGVubmlzkgELdGVubmlzX2NsdWKaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVUnBhazAzVG01M1JSQULgAQA!16s%2Fg%2F11c2mdfl7n?entry=ttu',
      distance: ''
    },
    {
      name: 'Picadilly Park',
      coordinates: {
        lat:42.994423,
        lng:-81.3096668,
      },
      googleMapsLink: 'https://www.google.com/maps/place/Picadilly+Tennis+Courts/@42.994423,-81.3096668,13z/data=!4m10!1m2!2m1!1stennis!3m6!1s0x882ef2009f7d2929:0x92a7ade942a8f382!8m2!3d42.9944257!4d-81.2477626!15sCgZ0ZW5uaXNaCCIGdGVubmlzkgEMdGVubmlzX2NvdXJ0mgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVF5YkhaRVdrbEJFQUXgAQA!16s%2Fg%2F11f1p174ng?entry=ttu',
      distance: ''
    },
    {
      name: 'Mornington Park',
      coordinates: {
        lat:43.0032505,
        lng:-81.2917364,
      },
      googleMapsLink: 'https://www.google.com/maps/place/Mornington+Park+Tennis+Court/@43.0032505,-81.2917364,13z/data=!4m10!1m2!2m1!1stennis!3m6!1s0x882eed021a14b0e3:0x249a71e5283b1473!8m2!3d43.0032532!4d-81.2155173!15sCgZ0ZW5uaXOSAQx0ZW5uaXNfY291cnTgAQA!16s%2Fg%2F11h_10spb9?entry=ttu',
      distance: ''
    },
    {
      name: 'Knights Tennis Court',
      coordinates: {
        lat:42.9508551,
        lng:-81.3340781,
      },
      googleMapsLink: 'https://www.google.com/maps/place/Knight%E2%80%99s+Tennis+Court/@42.9508551,-81.3340781,13z/data=!4m10!1m2!2m1!1stennis!3m6!1s0x882ef19328f6e8a3:0x7fc19bc63697844b!8m2!3d42.9508585!4d-81.2695005!15sCgZ0ZW5uaXOSAQx0ZW5uaXNfY291cnTgAQA!16s%2Fg%2F11vbqc_hy6?entry=ttu',
      distance: ''
    },
  ]

  //calc distances of all courts
  tennisCourtsLondon.forEach((court) =>{
    const distance = getDistance(location.coordinates, court.coordinates);
    court.distance = distance
  })
  //locate closest
  const closestCourt = tennisCourtsLondon.reduce((prev, current) =>
    prev.distance < current.distance ? prev : current
  ); 

  //gets three next closest courts
  const otherCourts = tennisCourtsLondon.filter((court) => court !== closestCourt).slice(0,3);
  
  return (
    <div className='p-4 h-screen bg-green-100'>
      <div className='flex items-center justify-between flex-col'>
        <h1 className='text-3xl font-sans py-2'>Closest Court to You</h1>
      </div>
      {closestCourt && (
          <div className='border p-4 mb-4 bg-green-200 '>
              <p>Closest Court: {closestCourt.name}</p>
              <p>Distance: {closestCourt.distance.toFixed(2)} km</p>
              <p className=''>Surface type: {closestCourt.courtType}</p>
            <Link className={buttonVariants({ variant: "default" })} 
            href = {closestCourt.googleMapsLink} 
            target='_blank'
            rel = 'noopener noreferrer'>
              View on Google Maps
            </Link>
          </div>
        )} 
        <div className='flex items-center justify-between flex-col'>
          <h1 className='font-sans text-3xl'>Other Courts Near You</h1>
        </div>
        {otherCourts.map((court, index) => (
        <div key={index} className='border p-4 mb-4 bg-green-200 '>
          <p>Court Name: {court.name}</p>
          <p>Distance: {court.distance.toFixed(2)} km</p>
          <p className=''>Surface type: {court.courtType}</p>
          <Link
            className={buttonVariants({ variant: "default" })}
            href={court.googleMapsLink}
            target='_blank'
            rel='noopener noreferrer'
          >
            View on Google Maps
          </Link>
        </div>
      ))}
    </div>
  );  
};

//Finds nearest court to user
// Finds nearest court to user
function getDistance(coord1, coord2) {
  const lat1 = coord1.lat;
  const lng1 = coord1.lng;
  const lat2 = coord2.lat;
  const lng2 = coord2.lng;
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lng1 - lng2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344; // Convert miles to kilometers
  return dist;
}




export default CourtsPage;
