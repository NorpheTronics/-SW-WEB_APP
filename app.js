// Select the HTML elements we will interact with
const scanButton = document.getElementById('scan-button');
const progressBar = document.getElementById('progress-bar');
const devicesList = document.getElementById('devices-list');
const uploadFirmwareButton = document.getElementById('upload-firmware-button');
const textPercentage = document.getElementById('text-percentage');

// Event listener for scanning devices
scanButton.addEventListener('click', () => {
  // Show the progress bar to simulate scanning
  progressBar.style.display = 'inline-block';
  devicesList.innerHTML = '<li>Scanning for devices...</li>';

  // Simulate a device scan by adding devices after a short delay
  setTimeout(() => {
    // Hide progress bar after scanning
    progressBar.style.display = 'none';
    
    // Populate the devices list with some simulated devices
    devicesList.innerHTML = `
      <li class="device-item">Device 1</li>
      <li class="device-item">Device 2</li>
      <li class="device-item">Device 3</li>
    `;

    // Show the upload firmware button
    uploadFirmwareButton.style.display = 'block';

  }, 2000); // Simulate a 2-second scan delay
});

// Event listener for uploading firmware
uploadFirmwareButton.addEventListener('click', () => {
  // Show the percentage progress and simulate upload
  textPercentage.style.display = 'block';
  let percentage = 0;

  // Simulate firmware upload progress
  const interval = setInterval(() => {
    if (percentage >= 100) {
      clearInterval(interval);
    } else {
      percentage += 10;
      textPercentage.textContent = `${percentage}%`;
    }
  }, 500); // Increase percentage every 0.5 seconds
});
