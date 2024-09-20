document.getElementById('scan-button').addEventListener('click', async () => {
  try {
    // Request Bluetooth devices
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: ['battery_service'] // Replace or add service UUIDs as needed
    });

    // Connect to the GATT server
    const server = await device.gatt.connect();

    // Display device information
    document.getElementById('device-info').style.display = 'block';
    document.getElementById('device-name').textContent = device.name || 'Unknown';
    document.getElementById('device-id').textContent = device.id;

    console.log(`Connected to ${device.name} (${device.id})`);

    // Example: Read Battery Level (if available)
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
    console.error('Error during Bluetooth scan or connection:', error);
  }
});
