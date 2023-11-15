"use client"
import { useEffect, useState } from 'react';
import { UserAuth } from './context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import useGeoLocation from './components/useGeoLocation';

export default function Home() {
  const {user} = UserAuth()
  const [testfield, setTestfield] = useState(null);
  const location = useGeoLocation()

  useEffect(() => {
    const fetchTestField = async () => {
      if (user) {
        // Assuming that user.uid is the unique identifier for the user document
        const docRef = doc(db, 'users', user.uid);

        try {
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            setTestfield(userData.testfield || 'No testfield data available');
          } else {
            setTestfield('No testfield data available');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setTestfield('Error fetching user data');
        }
      }
    };
    fetchTestField()
  }, [user]);

  return (
    <main className='p-4'>
      <h1>Home</h1>
      <p>Testfield Value: {testfield}</p>
    </main>
  );
}
