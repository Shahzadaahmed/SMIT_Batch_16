// Home Screen...!

'use client';

import React, { useEffect } from 'react';
import Header from '../src/components/header/header';

const Home = () => {

  const apiCall = async () => {
    console.log('console is working!');
    
    const apiUrl = "http://192.168.24.200:3000/";

    try {
      const res = await fetch(apiUrl);
      const jsonData = await res?.json();
      console.log('Api res: ', jsonData);
    }

    catch (error) {
      console.log('Err in api integration: ', error);
    }
  }

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <div>
      <Header screenName='Home' />
    </div>
  );
};

export default Home;