document.getElementById('scan-button').addEventListener('click', async () => {
  try {
    // Request Bluetooth devices
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true, // Scan for all devices
      optionalServices: ['battery_service'] // Add services to connect to later
    });

    // Display the device in the list
    displayDevice(device);
  } catch (error) {
    console.error('Error during Bluetooth scan or connection:', error);
  }
});

// Function to add the discovered device to the list
function displayDevice(device) {
  const deviceList = document.getElementById('device-list');
  const deviceItem = document.createElement('div');
  deviceItem.className = 'device-item';

  // Create content for the device item
  const deviceName = document.createElement('p');
  deviceName.textContent = `Device Name: ${device.name || 'Unknown'}`;
  
  const deviceId = document.createElement('p');
  deviceId.textContent = `Device ID: ${device.id}`;

  // Create connect button for each device
  const connectButton = document.createElement('button');
  connectButton.className = 'connect-button';
  connectButton.textContent = 'Connect';
  connectButton.addEventListener('click', () => connectToDevice(device));

  // Append details and button to the device item
  deviceItem.appendChild(deviceName);
  deviceItem.appendChild(deviceId);
  deviceItem.appendChild(connectButton);

  // Append the device item to the device list
  deviceList.appendChild(deviceItem);
}

// Function to connect to the device when the "Connect" button is clicked
async function connectToDevice(device) {
  try {
    const server = await device.gatt.connect();

    // Display connected device info
    document.getElementById('device-info').style.display = 'block';
    document.getElementById('device-name').textContent = device.name || 'Unknown';
    document.getElementById('device-id').textContent = device.id;

    console.log(`Connected to ${device.name} (${device.id})`);

    // Example: Reading battery level if available
    try {
      const batteryService = await server.getPrimaryService('battery_service');
      const batteryLevelCharacteristic = await batteryService.getCharacteristic('battery_level');
      const batteryLevel = await batteryLevelCharacteristic.readValue();
      const batteryPercent = batteryLevel.getUint8(0);

      console.log('Battery Level is ' + batteryPercent + '%');
    } catch (error) {
      console.log('Battery service not found on this device.');
    }

  } catch (error) {
    console.error('Failed to connect:', error);
  }
}
