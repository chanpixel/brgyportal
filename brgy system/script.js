document.addEventListener('DOMContentLoaded', function() {
    // Populate services, documents, and announcements based on the current page
    const page = window.location.pathname.split('/').pop();

    if (page === 'services.html') {
        populateServices();
    }

    if (page === 'documents.html') {
        populateDocuments();
    }

    if (page === 'announcements.html') {
        populateAnnouncements();
    }

    // Handle new announcement modal
    const newAnnouncementBtn = document.getElementById('new-announcement-btn');
    const announcementModal = document.getElementById('announcement-modal');
    const closeModalBtn = announcementModal.querySelector('[data-hs-overlay="#announcement-modal"]');
    const submitAnnouncementBtn = document.getElementById('submit-announcement');

    newAnnouncementBtn.addEventListener('click', function() {
        announcementModal.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', function() {
        announcementModal.classList.add('hidden');
    });

    submitAnnouncementBtn.addEventListener('click', function() {
        const title = document.getElementById('announcement-title').value;
        const content = document.getElementById('announcement-content').value;
        const date = document.getElementById('announcement-date').value;

        if (title && content && date) {
            // Here you would typically send the data to the server
            // For demonstration, we will just log it to the console
            console.log('New Announcement:', { title, content, date });

            // Optionally, you can add the new announcement to the page
            addAnnouncement(title, content, date);

            // Clear the form
            document.getElementById('announcement-form').reset();
            announcementModal.classList.add('hidden');
        } else {
            alert('Please fill in all fields.');
        }
    });
});

// Function to populate services
function populateServices() {
    const services = [
        { title: "Barangay Clearance", description: "Request a barangay clearance for various purposes." },
        { title: "Business Permit", description: "Apply for a business permit." },
        { title: "Residency Certificate", description: "Obtain a certificate proving your residency." },
        { title: "Indigency Certificate", description: "Request a certificate for government assistance." },
        { title: "Complaint Submission", description: "File complaints regarding barangay concerns." },
        { title: "Health Services", description: "Access barangay health services." }
    ];
    const servicesList = document.getElementById('services-list');
    services.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6';
        serviceItem.innerHTML = `
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">${service.title}</h3>
            <p class="text-gray-600 dark:text-gray-300">${service.description}</p>
            <button class="text-primary-600 hover:text-primary-800 dark:hover:text-primary-400 text-sm font-medium transition">
                Request Service <i class="fas fa-arrow-right ml-1"></i>
            </button>
        `;
        servicesList.appendChild(serviceItem);
    });
}

// Function to populate documents
function populateDocuments() {
    const documents = [
        { title: "Barangay Clearance", description: "Required for various transactions." },
        { title: "Certificate of Residency", description: "Proof of residence." },
        { title: "Indigency Certificate", description: "For availing government assistance." }
    ];
    const documentsList = document.getElementById('documents-list');
    documents.forEach(doc => {
        const docItem = document.createElement('div');
        docItem.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6';
        docItem.innerHTML = `
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">${doc.title}</h3>
            <p class="text-gray-600 dark:text-gray-300">${doc.description}</p>
            <button class="text-primary-600 hover:text-primary-800 dark:hover:text-primary-400 text-sm font-medium transition">
                Request Document <i class="fas fa-arrow-right ml-1"></i>
            </button>
        `;
        documentsList.appendChild(docItem);
    });
}

// Function to populate announcements
function populateAnnouncements() {
    const announcements = [
        { title: "Community Clean-up Drive", content: "Join us for a community clean-up drive on Saturday, March 25, 2023.", date: "March 20, 2023" },
        { title: "Free Medical Check-up", content: "We are offering free medical check-ups on March 30, 2023.", date: "March 18, 2023" },
        { title: "Barangay Assembly", content: "The next barangay assembly will be held on April 5, 2023.", date: "March 15, 2023" }
    ];
    const announcementsList = document.querySelector('.space-y-4');
    announcements.forEach(announcement => {
        const announcementItem = document.createElement('div');
        announcementItem.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6';
        announcementItem.innerHTML = `
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">${announcement.title}</h3>
            <p class="text-gray-600 dark:text-gray-300">${announcement.content}</p>
            <span class="text-sm text-gray-500 dark:text-gray-400">Posted on: ${announcement.date}</span>
        `;
        announcementsList.appendChild(announcementItem);
    });
}

// Function to add a new announcement to the page
function addAnnouncement(title, content, date) {
    const announcementsList = document.querySelector('.space-y-4');
    const announcementItem = document.createElement('div');
    announcementItem.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6';
    announcementItem.innerHTML = `
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">${title}</h3>
        <p class="text-gray-600 dark:text-gray-300">${content}</p>
        <span class="text-sm text-gray-500 dark:text-gray-400">Posted on: ${date}</span>
    `;
    announcementsList.prepend(announcementItem); // Add to the top of the list
    const service = urlParams.get('service');
console.log('Service parameter:', service);
}
// Preview helper function
function previewImage(input, previewId) {
  const preview = document.getElementById(previewId);
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      preview.src = e.target.result;
      preview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  } else {
    preview.src = '';
    preview.classList.add('hidden');
  }
}

// Event listeners for preview
document.getElementById('barangay-clearance-id').addEventListener('change', function() {
  previewImage(this, 'barangay-clearance-id-preview');
});
document.getElementById('residency-proof').addEventListener('change', function() {
  previewImage(this, 'residency-proof-preview');
});

// Function to create request card and append
function createRequestCard(serviceName, purposeText, durationText, imgSrc) {
  const container = document.createElement('div');
  container.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center gap-6';

  const img = document.createElement('img');
  img.src = imgSrc;
  img.alt = `${serviceName} submitted image`;
  img.className = 'max-w-xs rounded-md';

  const details = document.createElement('div');
  details.className = 'text-gray-800 dark:text-white';

  const title = document.createElement('h3');
  title.className = 'text-xl font-semibold mb-2';
  title.textContent = serviceName;

  const purpose = document.createElement('p');
  purpose.innerHTML = `<strong>Purpose:</strong> ${purposeText}`;

  details.appendChild(title);
  details.appendChild(purpose);

  if (durationText) {
    const duration = document.createElement('p');
    duration.innerHTML = `<strong>Duration of Residency:</strong> ${durationText}`;
    details.appendChild(duration);
  }

  container.appendChild(img);
  container.appendChild(details);

  return container;
}

// Handle Barangay Clearance form submission
// Select form and requests list container
const barangayClearanceForm = document.querySelector('form#barangay-clearance-form');
const requestsList = document.getElementById('requests-list');

// If you have multiple forms, handle accordingly, this is an example for one form only
barangayClearanceForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get input values
  const purpose = this.querySelector('#barangay-clearance-purpose').value;
  const fileInput = this.querySelector('#barangay-clearance-id');
  const file = fileInput.files[0];

  if (!file) {
    alert("Please upload a valid ID picture");
    return;
  }

  // Create a FileReader to read the image file as Data URL
  const reader = new FileReader();
  reader.onload = function(e) {
    const imageURL = e.target.result;

    // Create a card element for the submitted request
    const card = document.createElement('div');
    card.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center space-x-4';

    card.innerHTML = `
      <img src="${imageURL}" alt="Uploaded ID" class="w-24 h-24 object-cover rounded-md border border-gray-300" />
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Barangay Clearance Request</h3>
        <p class="text-gray-600 dark:text-gray-300"><strong>Purpose:</strong> ${purpose}</p>
      </div>
    `;

    // Append card to the requests list
    requestsList.appendChild(card);

    // Reset the form after submit
    barangayClearanceForm.reset();
  };

  reader.readAsDataURL(file);
});
