import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// const clinicIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/1483/1483336.png",
//   iconSize: [35, 35],
// });

const Emergency = ({ onBookEmergency }) => {
  const [, setUserPosition] = useState([28.6139, 77.209]); // default: Delhi

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {
          console.warn("Could not get user location, using default.");
        }
      );
    }
  }, []);

  return (
    <>
      <div className="flex flex-col flex-1">
        <Header />
      </div>

      <div className="flex flex-col items-center justify-center h-full p-6 text-center rounded-xl shadow-lg text-slate-100">
        <h1 className="text-5xl font-bold text-red-500 mb-4">Emergency Help</h1>
        <p className="text-lg text-slate-300 mb-8">
          Click on the buttons below for immediate assistance.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-md">
          <a
            href="tel:+1234567890"
            className="w-full py-4 px-6 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg animate-pulse"
          >
            Call Ambulance
          </a>
          <button
            onClick={onBookEmergency}
            className="w-full py-4 px-6 rounded-xl font-bold text-white bg-violet-600 hover:bg-violet-700 transition-colors shadow-lg"
          >
            Book Emergency Appointment
          </button>
        </div>

        {/* Emergency Tips */}
        <div className="mt-12 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-left text-violet-400">
            Emergency Tips
          </h2>
          <ul className="text-left space-y-3 text-slate-300">
            <li>
              <span className="font-bold text-red-400">→</span> Stay calm and
              try to find a comfortable position.
            </li>
            <li>
              <span className="font-bold text-red-400">→</span> Describe your
              symptoms clearly to the emergency operator or AI.
            </li>
            <li>
              <span className="font-bold text-red-400">→</span> Do not move an
              injured person unless they are in immediate danger.
            </li>
            <li>
              <span className="font-bold text-red-400">→</span> If you have
              severe bleeding, apply pressure to the wound with a clean cloth.
            </li>
          </ul>
        </div>

        {/* Map + Clinics */}
        {/* <div className="mt-12 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-left text-violet-400">
            Nearby Clinics
          </h2>
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
            <MapContainer
              center={userPosition}
              zoom={14}
              scrollWheelZoom={true}
              className="w-full h-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              />

              <Marker position={userPosition}>
                <Popup>You are here</Popup>
              </Marker>

              <Marker position={[userPosition[0] + 0.005, userPosition[1]]} icon={clinicIcon}>
                <Popup>City Hospital</Popup>
              </Marker>
              <Marker position={[userPosition[0] - 0.004, userPosition[1] + 0.002]} icon={clinicIcon}>
                <Popup>Shree Clinic</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Emergency;