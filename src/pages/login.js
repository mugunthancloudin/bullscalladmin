import React, { useEffect, useState } from 'react';
import { determineLoginSource } from '../services/blockchain'; // Import the determineLoginSource function
import ClassicData from './classicData';
import Mobile from '../../src/pages/mobile';

function Login() {
  const [loginSource, setLoginSource] = useState(null);

  useEffect(() => {
    determineLoginSource()
      .then(result => {
        setLoginSource(result);
      })
      .catch(error => {
        // Handle errors if the promise rejects
        console.error(error);
      });
  }, []);

  if (loginSource === null) {
    // Handle loading or initial state
    return <div>Loading...</div>;
  }

  return (
    <div>
      {loginSource === 'true' ? <Mobile /> : <ClassicData />}
    </div>
  );
}

export default Login;
