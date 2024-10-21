// src/App.js

import React, { useState, useEffect } from 'react';
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

  const [bluetoothSupported, setBluetoothSupported] = useState(true);
  const [scanStarted, setScanStarted] = useState(false);
  const [scannedDevices, setScannedDevices] = useState([]); // Devices discovered during the scan

  useEffect(() => {
    if (!navigator.bluetooth) {
      setBluetoothSupported(false);
      console.log('API Web Bluetooth non supportée par ce navigateur.');
    } else {
      console.log('API Web Bluetooth supportée.');
      // Ne lancez pas le scan ici
    }

    // Clear paired devices every time the app reloads or starts
    setScannedDevices([]);

  }, []);

const startBluetoothScan = async () => {
  if (scanStarted) return; // Prevent multiple scans
  setScanStarted(true);
  console.log('Starting Bluetooth scan...');

  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: 'NORPHE' }],
      optionalServices: ['battery_service', 'device_information'],
    });

    device.addEventListener('gattserverdisconnected', onDisconnected);

    console.log(`Device detected: ${device.name}`);

    const server = await device.gatt.connect();
    console.log(`Connected to GATT server of device: ${device.name}`);

    const batteryLevel = await readBatteryLevel(server);
    console.log(`Battery level of ${device.name}: ${batteryLevel}%`);

    const firmwareVersion = await readFirmwareVersion(server);
    console.log(`Firmware version of ${device.name}: ${firmwareVersion}`);

    const statusBadge = getStatusBadge(firmwareVersion);

    setDevices((prevDevices) => {
      const deviceExists = prevDevices.some((d) => d.address === device.id);
      if (deviceExists) {
        console.log('Device already present in the list.');
        return prevDevices;
      }

      return [
        ...prevDevices,
        {
          id: `bt-${device.id}`,
          name: device.name || 'Unknown Device',
          address: device.id,
          batteryLevel: batteryLevel || 'N/A',
          firmwareVersion: firmwareVersion || 'Unknown',
          statusBadge: statusBadge, // Pass the status badge based on firmware
          batteryIcon: batteryIcon,
          backgroundImage: backgroundImage,
          pingImage: pingImage,
        },
      ];
    });
  } catch (error) {
    console.error('Error during Bluetooth scan:', error);
  } finally {
    setScanStarted(false);
  }
};

const readBatteryLevel = async (server) => {
  try {
    const service = await server.getPrimaryService('battery_service');
    const characteristic = await service.getCharacteristic('battery_level');
    const value = await characteristic.readValue();
    return value.getUint8(0);
  } catch (error) {
    console.error('Error reading battery level:', error);
    return null;
  }
};

const readFirmwareVersion = async (server) => {
  try {
    const service = await server.getPrimaryService('device_information');
    const characteristic = await service.getCharacteristic('firmware_revision_string');
    const value = await characteristic.readValue();
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(value);
  } catch (error) {
    console.error('Error reading firmware version:', error);
    return null;
  }
};

const getStatusBadge = (firmwareVersion) => {
  const latestFirmware = '1.2.0'; // Example latest firmware version
  console.log(`Firmware version : ${firmwareVersion}`);
  if (!firmwareVersion) return 'unknown';
  return firmwareVersion === latestFirmware ? 'a_jour' : 'disponible';
};

  const onDisconnected = (event) => {
    const device = event.target;
    console.log(`Appareil ${device.name} déconnecté.`);
    // Vous pouvez mettre à jour l'état ici si nécessaire
  };

  const handleUpdateAll = () => {
    // Votre logique pour mettre à jour tous les appareils
    //alert('Tous les appareils sont mis à jour !');
  };

  const handleDeviceClick = (device) => {
    // Votre logique pour l'appareil sélectionné
    //alert(`Appareil sélectionné : ${device.name}`);
  };

  return (
    
    <div className="main">
      {/* En-tête */}
      <div className="header-section">
        <img src={logo} alt="Logo" className="logo-image" />

        {/* Bouton "Scanner" ajouté à gauche du bouton "Tout mettre à jour" */}
        {bluetoothSupported && !scanStarted && (
          <button className="button-scan-bluetooth" onClick={startBluetoothScan}>
            Scanner
          </button>
        )}

        <div className="spacer"></div>
        <button className="button-update-all" onClick={handleUpdateAll}>
          Tout mettre à jour
        </button>
      </div>

      {/* Sous-titre */}
      <h2 className="subheader-text">Vos produits</h2>

      {!bluetoothSupported && (
        <p>L'API Web Bluetooth n'est pas supportée par ce navigateur.</p>
      )}

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
