import '../scss/main.scss'

const selectedDesignNeeds = [];
const contactDetails = [];

const dynamicForm = document.getElementById('dynamic-form');
const formContentNeeds = document.getElementById('form-content-needs');
const formContentContact = document.getElementById('form-content-contact');
const btnContainer = document.getElementById('btn-container');
const btnSecondary = document.getElementById('btn-back');
const validateButton = document.getElementById('validate-wishlist-button');
const wishlistBtn = document.getElementById('btn-wishlist');
const btnBack = document.getElementById('btn-back');


// Function to update the form to display contact details
function showContactDetailsForm() {

    const checkboxes = document.querySelectorAll('input[name="design-needs"]:checked');
    
    checkboxes.forEach((checkbox) => {
        selectedDesignNeeds.push(checkbox.value);
    });

    // Change the main title
    document.querySelector('#dynamic-form .sticky-header h4').textContent = 'Contact Details';

    formContentNeeds.classList.toggle("hidden");
    formContentContact.classList.toggle("hidden");

    btnSecondary.classList.toggle('hidden');

    // Update the button text and event handler
    validateButton.textContent = 'Send Us A Request';
    validateButton.type = 'submit';

    validateButton.removeEventListener('click', showContactDetailsForm);
    validateButton.addEventListener('click', handleContactDetailsSubmit);
    btnSecondary.addEventListener('click', recreateDesignNeedsForm);
}

// Function to handle contact details submission
function handleContactDetailsSubmit(e) {

    e.preventDefault(); // Prevent the default form submission

    console.log("second click");

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

    contactDetails.push(emailDetails.value);
    contactDetails.push(nameDetails.value);
    contactDetails.push(textDetails.value);

    // Remove everything inside the form
    dynamicForm.innerHTML = '';
    dynamicForm.style.justifyContent = 'center';

    const thanksContainer = document.getElementById('thank-you-container');
    dynamicForm.appendChild(thanksContainer);
    thanksContainer.classList.toggle('hidden');

}

// Function to re-create the checkboxes and other elements from the previous form
function recreateDesignNeedsForm() {
    // Reset the selectedDesignNeeds array
    selectedDesignNeeds.length = 0;

    // Change the main title back to the original text
    document.querySelector('#dynamic-form .sticky-header h4').textContent = 'Your Wish List';

    // Remove the contact details form elements
    formContentNeeds.classList.toggle("hidden");
    formContentContact.classList.toggle("hidden");

    // Create checkboxes for design needs
    const designNeeds = [
        { value: 'branding', label: 'Branding and Identity Design', text: "Crafting unique visual identities that represent your brand's values and resonate with your target audience."},
        { value: 'print', label: 'Print Design', text: "Creating compelling designs for print materials such as brochures, business cards, posters, and more."},
        { value: 'social', label: 'Social Media Graphics', text: "Crafting eye-catching graphics optimized for social media platforms to boost your online presence."},
        { value: 'app', label: 'Blockchain Interface Design', text: "Crafting user-friendly and visually appealing interfaces for blockchain platforms, wallets, and decentralized applications."},
        { value: 'website', label: 'Web3 Website Design', text: "Designing immersive websites that seamlessly integrate blockchain technology, providing interactive and engaging experiences."},
        { value: 'metaverse', label: 'Brand Integration into Metaverse', text: "Crafting user-friendly and visually appealing interfaces for blockchain platforms, wallets, and decentralized applications."},
        { value: 'consulting', label: 'Consultation and Ideation', text: "Collaborating with you to brainstorm, conceptualize, and refine design ideas tailored to your specific project."}
    ];

    designNeeds.forEach((need) => {
        const label = document.createElement('label');
        label.className = 'form-control gap-1-row';
        label.setAttribute('for', need.value);

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = need.value;
        input.name = 'design-needs';
        input.value = need.value;

        const caption = document.createElement('div');
        caption.className = 'gap-1-2';
        caption.innerHTML = `
        <p class="subtitle">${need.label}</p>
        <p class="caption">${need.text}</p>
        `;

        label.appendChild(input);
        label.appendChild(caption);
        
        // Append the checkbox to the formContentNeeds
        formContentNeeds.appendChild(label);
    });

    btnSecondary.classList.toggle('hidden');


    // Update the button text and event handler to return to the contact details form
    const validateButton = document.getElementById('validate-wishlist-button');
    validateButton.textContent = 'Validate My Wishlist';
    validateButton.removeEventListener('click', handleContactDetailsSubmit);
    validateButton.addEventListener('click', showContactDetailsForm);

    // btnSecondary.removeEventListener('click', recreateDesignNeedsForm);

}


// Attach a click event listener to the "Validate My Wishlist" button
document.getElementById('validate-wishlist-button').addEventListener('click', showContactDetailsForm);

console.log(selectedDesignNeeds);
console.log(contactDetails);