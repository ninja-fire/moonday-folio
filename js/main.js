import '../scss/main.scss'

const contactData = {
    needs: [],
};

const dynamicForm = document.getElementById('dynamic-form');
const formContentNeeds = document.getElementById('form-content-needs');
const formContentContact = document.getElementById('form-content-contact');
const validateButton = document.getElementById('validate-wishlist-button');
const btnBack = document.getElementById('btn-back');

let state = 1;
function submitButtonListener(e) {
    e.preventDefault(); // Prevent the default form submission

    if (state === 1) {
        state = 2;
        showContactDetailsForm();
    } else if (state === 2) {
        handleContactDetailsSubmit();
    }

}

// Function to update the form to display contact details
function showContactDetailsForm() {
    const checkboxes = document.querySelectorAll('input[name="design-needs"]:checked');

    contactData.needs = Array.from(checkboxes).map((checkbox) => checkbox.value);

    // Change the main title
    document.querySelector('#dynamic-form .sticky-header h4').textContent = 'Contact Details';

    formContentNeeds.classList.toggle("hidden");
    formContentContact.classList.toggle("hidden");
    btnBack.classList.toggle('hidden');

    // Update the button text and event handler
    validateButton.textContent = 'Send A Request';
}

// Function to handle contact details submission
function handleContactDetailsSubmit() {

    const emailDetails = document.getElementById('email-details');
    const emailError = document.getElementById('email-error');
    const nameDetails = document.getElementById('name-details');
    const textDetails = document.getElementById('text-details');

    const emailPatternStr = ".+@.+\..+";

    // Create a RegExp object from the pattern string
    const emailPattern = new RegExp(emailPatternStr);

    // Check if the email is in a valid format
    if (!emailPattern.test(emailDetails.value)) {
        // Display the error message below the email input
        emailError.style.display = 'flex';
        emailDetails.style.borderColor = '#FF8A7A';
        return;
    } else {
        // Clear the error message when the input is valid
        emailError.style.display = 'none';
    }

    contactData.email = emailDetails.value;
    if (nameDetails.value) {
        contactData.name = nameDetails.value.trim();
    }

    if (textDetails.value) {
        contactData.text = textDetails.value.trim();
    }

    btnBack.disabled = true;
    validateButton.disabled = true;

    console.log(contactData);

   fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(contactData),
    }).then(resRaw => resRaw.json()).then((res) => {
        console.info('res', res);
        // Remove everything inside the form
        dynamicForm.innerHTML = '';
        dynamicForm.style.justifyContent = 'center';

        const thanksContainer = document.getElementById('thank-you-container');
        dynamicForm.appendChild(thanksContainer);
        thanksContainer.classList.toggle('hidden');
    }).catch(error => {
        console.info('error req contact', error);
    })

  
}

// Function to re-create the checkboxes and other elements from the previous form
function recreateDesignNeedsForm() {

    state = 1;
    // Change the main title back to the original text
    document.querySelector('#dynamic-form .sticky-header h4').textContent = 'Your Wish List';

    // Remove the contact details form elements
    formContentNeeds.classList.toggle("hidden");
    formContentContact.classList.toggle("hidden");
    btnBack.classList.toggle('hidden');

    // Update the button text and event handler to return to the contact details form
    const validateButton = document.getElementById('validate-wishlist-button');
    validateButton.textContent = 'Validate My Wishlist';
}


// Attach a click event listener to the "Validate My Wishlist" button
validateButton.addEventListener('click', submitButtonListener);
btnBack.addEventListener('click', recreateDesignNeedsForm);