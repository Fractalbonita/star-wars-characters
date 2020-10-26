import React from 'react';
import PropTypes from 'prop-types';

VehicleList.propTypes = {
  vehicles: PropTypes.array,
  item: PropTypes.object,
};

export default function VehicleList({ vehicles, item }) {
  return (
    <ul className="resources__list">
      {vehicles.length > 0 &&
        item.vehicles.map((url) => {
          const selectedVehicle = vehicles.find(
            (vehicle) => vehicle.url === url
          );
          return <li key={selectedVehicle.url}>{selectedVehicle.name}</li>;
        })}
    </ul>
  );
}
