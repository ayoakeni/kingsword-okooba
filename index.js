const imageInput = document.getElementById('imageInput');
const fileElement = document.querySelector('.custom-file-input');
const processButton = document.getElementById('processButton');
const preBox = document.getElementById('previewBox');
const preview = document.getElementById('preview');
const errorImage = document.getElementById('error-image');
const downloadButton = document.getElementById('downloadButton');

imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  if (file) {
    fileElement.textContent = `${file.name}`; // Set the file name
  } else {
    fileElement.textContent = 'Choose Image'; // Reset the label text if no file is selected
  }
  errorImage.remove();
});

processButton.addEventListener('click', () => {
  const file = imageInput.files[0];
  // Preview box
  if (file) {
  preBox.style.display = 'flex';
  }else{
    errorImage.textContent = 'Please choose an image';
    return;    
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    // Draw the image
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image
      ctx.drawImage(img, 0, 0);
    };
    
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);

  // Add text
  const textElement = document.getElementById('text');
  textElement.innerText = 'I am attending Communion Service this sunday @kingsword okooba room 22 event center';
  textElement.classList.add('text');
  
  // Draw your logo
  const logoElement = document.getElementById('logo');
  logoElement.src = 'image/kingsword.png'; // Replace with your logo path
  logoElement.classList.add('logo');

  // Convert the canvas to a data URL
  const dataURL = canvas.toDataURL('image/png');

  // Update the preview with the modified canvas
  preview.src = dataURL;

  // Show the download button
  downloadButton.style.display = 'inline';
  downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'template.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});