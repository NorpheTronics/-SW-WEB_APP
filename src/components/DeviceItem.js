// src/components/DeviceItem.js

import React from 'react';
import './DeviceItem.css';

function DeviceItem(props) {
  const {
    deviceName,
    deviceAddress,
    batteryLevel,
    batteryIcon,
    backgroundImage,
    statusBadge,
    pingImage,
    onClick,
  } = props;

  return (
    <div className="device-item" onClick={onClick}>
      {/* Image de fond */}
      <img src={backgroundImage} alt="Background" className="background-image" />

      {/* Contenu principal */}
      <div className="content">
        {/* Informations sur l'appareil */}
        <div className="device-info">
          <h3 className="device-name">{deviceName}</h3>
          <p className="device-address">{deviceAddress}</p>
        </div>

        {/* Icône de batterie et niveau */}
        <div className="battery-info">
          <img src={batteryIcon} alt="Battery Icon" className="battery-icon" />
          <span className="battery-level">{batteryLevel}%</span>
        </div>

        {/* Badge de statut */}
        {statusBadge && (
          <div className={`status-badge ${statusBadge}`}>
            {statusBadge === 'disponible' && <span>Mise à jour disponible</span>}
            {statusBadge === 'a_jour' && <span>Appareil à jour</span>}
            {statusBadge === 'en_cours' && <span>Mise à jour en cours</span>}
            {statusBadge === 'en_attente' && <span>Mise à jour en attente</span>}
          </div>
        )}

        {/* Image pour l'animation */}
        <img src={pingImage} alt="Ping" className="ping-image" />
      </div>
    </div>
  );
}

export default DeviceItem;
