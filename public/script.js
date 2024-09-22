// Function to fetch and display uploaded notes
function loadUploadedNotes() {
    // Fetch the list of uploaded files from the server
    fetch('/notes')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();  // Parse the JSON response
      })
      .then(files => {
        const notesGrid = document.getElementById('notesGrid');
        notesGrid.innerHTML = '';  // Clear previous content
        
        if (files.length === 0) {
          notesGrid.innerHTML = '<p>No notes uploaded yet.</p>';
          return;
        }

        // Loop through the files and create a card for each
        files.forEach(file => {
          const fileCard = document.createElement('div');
          fileCard.classList.add('note-card');
          
          // Create a link to download or view the file
          const fileLink = document.createElement('a');
          fileLink.href = `/uploads/${file}`;
          fileLink.target = '_blank';  // Opens in a new tab
          fileLink.textContent = file;  // Display the file name
          
          // Append the link to the card and the card to the grid
          fileCard.appendChild(fileLink);
          notesGrid.appendChild(fileCard);
        });
      })
      .catch(error => {
        console.error('Error loading notes:', error);  // Log any errors to the console
        const notesGrid = document.getElementById('notesGrid');
        notesGrid.innerHTML = '<p>Error loading notes. Please try again later.</p>';  // Show error on UI
      });
}

// Call the function when the page loads
window.onload = loadUploadedNotes;
