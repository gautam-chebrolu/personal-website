// Only run this code on the work.html page, as the script is only included there

// Example: Populating work experiences dynamically
const workList = document.getElementById('work-list');

const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQAUDd1-782iIhp_Boe-Y8rWs8W8gh8zCPSXh3btDZQHX2Wi1uAGtIKRWvWe03C6KInGUrgzYZM3-nL/pub?gid=0&single=true&output=tsv'

fetch(sheetURL)
.then(response => response.text())
.then(csvText => {
  const rows = csvText.split('\n'); // Split rows
  rows.shift(); // Remove the header row

  console.log(rows)

  rows.forEach(row => {
    // const columns = row.split(','); // Split columns
    const columns = row.split('\t');

    if (columns.length < 2) return;

    // Map data to variables
    const title = columns[0];
    console.log(title)

    const company = columns[1];
    const location = columns[2];
    const dates = columns[3];
    const logo = columns[4];
    const description = columns[5];
    const link = columns[6];
    console.log(description)

    // Create list item
    const listItem = document.createElement('li');
    listItem.classList.add('work-item');
    listItem.innerHTML = `
      <div class="work-entry">
        <a href="${link}"> <img src="${logo}" alt="${company} Logo" class="company-logo"> </a>
        <div class="work-details">
          <h2>${title}</h2>
          <b>${company}</b>
          <p>${dates} | ${location}</p>
          <p>${description}</p>
        </div>
      </div>
    `;

    // Append to the list
    workList.appendChild(listItem);
  });
})
.catch(error => console.error('Error loading data:', error));

