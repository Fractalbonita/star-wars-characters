import React from 'react';

export default function VehicleList({ vehicles, item }) {
  return (
    <ul>
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
