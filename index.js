const imageInput = document.getElementById('imageInput');
const fileElement = document.querySelector('.custom-file-input');
const processButton = document.getElementById('processButton');
const preview = document.getElementById('preview');
const downloadButton = document.getElementById('downloadButton');

imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  if (file) {
    fileElement.textContent = `${file.name}`; // Set the file name
  } else {
    fileElement.textContent = 'Choose Image'; // Reset the label text if no file is selected
  }
});

processButton.addEventListener('click', () => {
  const file = imageInput.files[0];
  // Preview box
  const preBox = document.querySelector('.preview');
  if (file) {
  preBox.style.display = 'flex';
  }else{
    alert('Please choose an image');
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

      // Add text
      ctx.font = '20px Arial'; // Set font size and type
      ctx.fillStyle = 'black'; // Set text color
      ctx.fillText('I am attending Communion Service', 10, 100); // Replace 'Your Text Here' with desired text
      const textElement = document.createElement('div');
      textElement.innerText = 'I am attending Communion Service this sunday @kingsword okooba room 22 event center';
      textElement.classList.add('text');
      preBox.appendChild(textElement);

      // Draw your logo
      const logo = new Image();
      logo.src = 'image/kingsword.png'; // Replace with your logo path
      logo.onload = function () {
        ctx.drawImage(logo, 10, 10, 100, 50); // Adjust position and size of your logo
        const logoElement = document.createElement('img');
        logoElement.src = 'image/kingsword.png'; // Replace with your logo path
        logoElement.classList.add('logo');
        preBox.appendChild(logoElement);

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
      };
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
});