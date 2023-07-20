// Get references to the necessary HTML elements
const inputField = document.getElementById('inputField');
const generateButton = document.getElementById('generateButton');
const qrcodeContainer = document.getElementById('qrcode');
const downloadButton = document.getElementById('downloadButton');

// Create a QR code instance
const qrcode = new QRCode(qrcodeContainer, {
  width: 200,
  height: 200,
});

// Function to generate and display the QR code
function generateQRCode() {
  const inputValue = inputField.value;

  if (inputValue) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    qrcode.clear();
    qrcode.makeCode(inputValue);

    // Set canvas dimensions
    const qrCodeWidth = qrcodeContainer.firstChild.offsetWidth;
    const qrCodeHeight = qrcodeContainer.firstChild.offsetHeight;
    const padding = 10;
    canvas.width = qrCodeWidth + 2 * padding;
    canvas.height = qrCodeHeight + 2 * padding;

    // Draw white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw QR code with padding
    const qrCodeX = padding;
    const qrCodeY = padding;
    const qrCodeImg = new Image();
    qrCodeImg.src = qrcodeContainer.firstChild.toDataURL('image/png');
    qrCodeImg.onload = function () {
      ctx.drawImage(qrCodeImg, qrCodeX, qrCodeY);

      // Create download button click event
      const downloadURL = canvas.toDataURL('image/png');
      downloadButton.addEventListener('click', function () {
        const a = document.createElement('a');
        a.href = downloadURL;
        a.download = 'qrcode.png';
        a.click();
      });
      downloadButton.disabled = false;
    };
  }
}

// Add event listener to the generate button
generateButton.addEventListener('click', generateQRCode);
