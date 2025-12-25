// document.addEventListener('DOMContentLoaded', () => {
//     const hoverImage = document.getElementById('hover-image');
//     const links = document.querySelectorAll('.link-list a');
  
//     links.forEach(link => {
//       link.addEventListener('mouseover', () => {
//         const newImage = link.getAttribute('data-image');
//         hoverImage.src = newImage;
//         hoverImage.classList.add('fade-in');
//       });
  
//       // Reset the image and remove the fade-in class on mouseout
//     //   link.addEventListener('mouseout', () => {
//     //     hoverImage.src = 'default-image.jpg'; // Replace with your default image URL
//     //     hoverImage.classList.remove('fade-in');
//     //   });
//     });
//   });

// Assuming you have sketch1.js, sketch2.js, and sketch3.js


const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQAUDd1-782iIhp_Boe-Y8rWs8W8gh8zCPSXh3btDZQHX2Wi1uAGtIKRWvWe03C6KInGUrgzYZM3-nL/pub?output=csv'

const workList = document.getElementById('work-list');

document.addEventListener('DOMContentLoaded', () => {
  const sketchContainer = document.getElementById('sketch-container');
  const hoverImage = document.getElementById('hover-image');
  const containerWidth = sketchContainer.clientWidth;
  const containerHeight = sketchContainer.clientHeight;
  console.log(containerHeight)
  console.log(containerWidth)
  const links = document.querySelectorAll('.link-list a');
  let currentScript;

  links.forEach(link => {
    link.addEventListener('mouseover', () => {
      const sketchSrc = link.getAttribute('data-sketch');
      const script = document.createElement('script');
      const newImage = link.getAttribute('data-image');
      hoverImage.src = newImage;
      hoverImage.classList.add('fade-in');
      script.src = sketchSrc;
      document.body.appendChild(script);

      // Remove the previous script and trigger fade-out
      if (currentScript) {
        currentScript.parentNode.removeChild(currentScript);
        sketchContainer.classList.remove('fade-in');
        sketchContainer.classList.add('fade-out');
        hoverImage.classList.remove('fade-in');
        hoverImage.classList.add('fade-out');
      }

      // Trigger fade-in for the new sketch
      setTimeout(() => {
        sketchContainer.classList.remove('fade-out');
        sketchContainer.classList.add('fade-in');
        hoverImage.classList.remove('fade-out');
        hoverImage.classList.add('fade-in');
      }, 20); // Adjust the timeout as needed

      currentScript = script;
    });
  });
});

document.getElementById('grades').addEventListener('mouseover', function () {
  this.remove(); // Removes the element from the DOM
});

