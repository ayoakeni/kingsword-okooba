const imageInput = document.getElementById('imageInput');
const fileElement = document.querySelector('.custom-file-input');
const processButton = document.getElementById('processButton');
const previewBox = document.getElementById('previewBox');
const errorImage = document.getElementById('error-image');
const downloadButton = document.getElementById('downloadButton');

imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  if (file) {
    fileElement.textContent = `${file.name}`; // Set the file name
  } else {
    fileElement.textContent = 'Choose Image'; // Reset the label text if no file is selected
  }
  errorImage.textContent = ''; // Clear any previous error messages
});

processButton.addEventListener('click', () => {
  const file = imageInput.files[0];
  // Preview box
  if (!file) {
    errorImage.textContent = 'Please choose an image';
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 495; // Set the canvas size to match the template size
      canvas.height = 495;

      // Draw the template image
      const templateImg = new Image();
      templateImg.onload = function () {
        ctx.drawImage(templateImg, 0, 0, 495, 495);
        // image
        const imageURL = canvas.toDataURL('image/png');
        // Update the preview with the modified canvas
        document.getElementById('imageContainer').innerHTML = `<img src="${imageURL}" class="preview-image">`;
        // Show the download button
        downloadButton.style.display = 'inline';
        downloadButton.onclick = function () {
          const link = document.createElement('a');
          link.href = imageURL;
          link.download = 'template.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
      };
      templateImg.src = 'image/sampart.png'; // Path to your template image
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
});