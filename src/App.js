// src/App.js

import React, { useState } from 'react';
import './App.css';
import logo from './assets/ic_logo_norphe.png';
import DeviceItem from './components/DeviceItem';
import batteryIcon from './assets/battery_icon.png';
import backgroundImage from './assets/background_device_image.avif';
import pingImage from './assets/light_off.png';

function App() {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'NORPHE 1',
      address: '00:11:22:33:44:55',
      batteryLevel: 80, // 80%
      batteryIcon: batteryIcon,
      backgroundImage: backgroundImage,
      statusBadge: 'disponible', // 'disponible', 'a_jour', 'en_cours', 'en_attente'
      pingImage: pingImage,
    },
    {
      id: 2,
      name: 'NORPHE 2',
      address: '00:11:22:33:44:56',
      batteryLevel: 60, // 60%
      batteryIcon: batteryIcon,
      backgroundImage: backgroundImage,
      statusBadge: 'a_jour',
      pingImage: pingImage,
    },
    {
      id: 3,
      name: 'NORPHE 3',
      address: '00:11:22:33:44:57',
      batteryLevel: 40, // 40%
      batteryIcon: batteryIcon,
      backgroundImage: backgroundImage,
      statusBadge: 'en_cours',
      pingImage: pingImage,
    },
  ]);

  const handleUpdateAll = () => {
    // Votre logique pour mettre à jour tous les appareils
    alert('Tous les appareils sont mis à jour !');
  };

  const handleDeviceClick = (device) => {
    // Votre logique pour l'appareil sélectionné
    alert(`Appareil sélectionné : ${device.name}`);
  };

  return (
    <div className="main">
      {/* En-tête */}
      <div className="header-section">
        <img src={logo} alt="Logo" className="logo-image" />
        <div className="spacer"></div>
        <button className="button-update-all" onClick={handleUpdateAll}>
          Tout mettre à jour
        </button>
      </div>

      {/* Sous-titre */}
      <h2 className="subheader-text">Vos produits</h2>

      {/* Conteneur principal pour la liste et la barre de navigation */}
      <div className="content-container">
        {/* Liste des appareils */}
        <div className="devices-list">
          {devices.map((device) => (
            <DeviceItem
              key={device.id}
              deviceName={device.name}
              deviceAddress={device.address}
              batteryLevel={device.batteryLevel}
              batteryIcon={device.batteryIcon}
              backgroundImage={device.backgroundImage}
              statusBadge={device.statusBadge}
              pingImage={device.pingImage}
              onClick={() => handleDeviceClick(device)}
            />
          ))}
        </div>
      </div>

      {/* Barre de navigation inférieure */}
      <nav className="bottom-navigation">
        <ul>
          <li>
            <a href="#home">Accueil</a>
          </li>
          <li>
            <a href="#search">Recherche</a>
          </li>
          <li>
            <a href="#settings">Paramètres</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
