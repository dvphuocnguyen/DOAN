import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import axios from 'axios';

const Place = ({ placeId }) => {
  const [placeData, setPlaceData] = useState(null);

  useEffect(() => {
    // Function to fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/get-place/${placeId}`);
        setPlaceData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call fetchData function
    fetchData();
  }, [placeId]); // Now this effect runs whenever placeId changes

  return (
    <div>
      {placeData ? (
        <div>
          <h2>{placeData.place_name}</h2>
          <p>{placeData.description}</p>
          <p>{placeData.address}</p>
          <p>{placeData.cost}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

// Define propTypes
Place.propTypes = {
  placeId: PropTypes.string.isRequired // Ensure placeId is a required string
};

export default Place;
