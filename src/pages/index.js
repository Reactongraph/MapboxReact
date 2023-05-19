import React, { useState } from 'react';
import Map from '../components/map'
import SearchAppBar from '../components/search';


function Home() {
  const [selectedRent, setSelectedRent] = useState('');
  const [selectedprice, setSelectedPrice] = useState('');
  const [selectedcity, setSelectedCity] = useState('');
  const [selectedstate, setSelectedState] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleRentChange = (value) => {
    setSelectedRent(value);
  };
  const handlePriceChange = (value) => {
    setSelectedPrice(value)
  }
  const handleCityChange = (value) => {
    setSelectedCity(value)
  }
  const handleStateChange = (value) => {
    setSelectedState(value)
  }
  return (
    <>
      <SearchAppBar onRentChange={handleRentChange} onPriceChange={handlePriceChange} onCityChange={handleCityChange} onStateChange={handleStateChange} setSearchQuery={setSearchQuery} searchQuery={searchQuery}></SearchAppBar>
      <Map selectedRent={selectedRent} selectedprice={selectedprice} selectedcity={selectedcity} selectedstate={selectedstate} searchQuery={searchQuery}></Map>
    </>
  );
}

export default Home;
