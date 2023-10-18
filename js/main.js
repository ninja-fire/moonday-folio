import '../scss/main.scss'

// Function to update the form to display contact details
function showContactDetailsForm() {
    // Change the main title
    document.querySelector('#dynamic-form .sticky-header h4').textContent = 'Contact Details';

    // Remove the checkbox and replace it with a text input
    const formContent = document.getElementById('form-content');
    // const checkboxLabel = document.querySelector('label[for="branding"]');
    // const checkboxInput = document.getElementById('branding');

    // Create a new paragraph element
    const contactP = document.createElement('p');
    contactP.className = 'caption';
    contactP.textContent = 'Please provide your name and email so we can reach out to you. It is the first step to bringing your design project to life.';
    contactP.style.textAlign = 'start';

    // Create a new emailLabel & emailInput elements
    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Your email address *'
    emailLabel.className = 'gap-1-2';
    emailLabel.id = 'email-label';
    emailLabel.for = 'email-details';

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'email-details';
    emailInput.name = 'email-details';
    emailInput.placeholder = 'Enter your email';
    emailInput.pattern = '.+@globex\.com';
    emailInput.attributes.required = 'true';

    // Create a new nameLabel & nameInput elements
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Your name'
    nameLabel.className = 'gap-1-2';
    nameLabel.id = 'name-label';
    nameLabel.for = 'name-details';

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'name-details';
    nameInput.name = 'name-details';
    nameInput.placeholder = 'Name and Surname';

    // Create a new textLabel & textInput elements
    const textLabel = document.createElement('label');
    textLabel.textContent = 'Describe your needs'
    textLabel.className = 'gap-1-2';
    textLabel.id = 'text-label';
    textLabel.for = 'text-details';


    const textInput = document.createElement('textarea');
    textInput.type = 'text';
    textInput.id = 'text-details';
    textInput.name = 'text-details';
    textInput.placeholder = 'Tell us more about your project and your needs...';
    textInput.spellcheck = 'True';


    // Delete all element inside form-content
    formContent.innerHTML = '';

    formContent.appendChild(contactP);

    formContent.appendChild(emailLabel);
    emailLabel.appendChild(emailInput);

    formContent.appendChild(nameLabel);
    nameLabel.appendChild(nameInput);

    formContent.appendChild(textLabel);
    textLabel.appendChild(textInput);

    formContent.style.height= '100%';
    formContent.style.width= '100%';



    // Update the button text and event handler
    const validateButton = document.getElementById('validate-wishlist-button');
    validateButton.textContent = 'Send Us A Request';
    validateButton.removeEventListener('click', showContactDetailsForm);
    validateButton.addEventListener('click', handleContactDetailsSubmit);
}

// Function to handle contact details submission
function handleContactDetailsSubmit() {
    // Gather and process the contact details submitted
    // You can use JavaScript to handle form submission as needed
}

// Attach a click event listener to the "Validate My Wishlist" button
document.getElementById('validate-wishlist-button').addEventListener('click', showContactDetailsForm);
