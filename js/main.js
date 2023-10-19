import '../scss/main.scss'

const selectedDesignNeeds = [];
const contactDetails = [];

const dynamicForm = document.getElementById('dynamic-form');
const formContent = document.getElementById('form-content');
const btnContainer = document.getElementById('btn-container');
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

    // Remove the checkbox and replace it with a text input
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
    nameLabel.textContent = 'Your name';
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

    const btnSecondary = document.createElement('button');
    btnSecondary.type = 'button';
    btnSecondary.id = 'btn-back';
    btnSecondary.className = 'btn-secondary';
    btnSecondary.textContent = 'Back';
    btnSecondary.style.order = '1';

    // Delete all element inside form-content
    formContent.innerHTML = '';

    formContent.appendChild(contactP);
    btnContainer.append(btnSecondary);

    formContent.appendChild(emailLabel);
    emailLabel.appendChild(emailInput);

    formContent.appendChild(nameLabel);
    nameLabel.appendChild(nameInput);

    formContent.appendChild(textLabel);
    textLabel.appendChild(textInput);

    formContent.style.height= '100%';
    formContent.style.width= '100%';

    // Update the button text and event handler
    validateButton.textContent = 'Send Us A Request';

    validateButton.removeEventListener('click', showContactDetailsForm);
    validateButton.addEventListener('click', handleContactDetailsSubmit);
    btnSecondary.addEventListener('click', recreateDesignNeedsForm);
}

// Function to handle contact details submission
function handleContactDetailsSubmit() {
    console.log("second click");

    const emailDetails = document.getElementById('email-details');
    const nameDetails = document.getElementById('name-details');
    const textDetails = document.getElementById('text-details');

    contactDetails.push(emailDetails.value);
    contactDetails.push(nameDetails.value);
    contactDetails.push(textDetails.value);

    // Remove everything inside the form
    dynamicForm.innerHTML = '';

    // const thanksContainer = document.createElement('div');
    // thanksContainer.className = 'gap'

    const thanksTitle = document.createElement('h4');
    thanksTitle.textContent = "Thank you!";
    thanksTitle.style.textAlign = 'center';
    thanksTitle.style.width = '100%';

    dynamicForm.style.justifyContent = 'center';


    const thanksP = document.createElement('p');
    thanksP.className = 'caption';
    thanksP.textContent = "Your message has been sent successfully. We'll get back to you as soon as possible. In the meantime, feel free to explore more of our work and services.";
    thanksP.style.textAlign = 'center';

    dynamicForm.appendChild(thanksTitle);
    dynamicForm.appendChild(thanksP);

}

// Function to re-create the checkboxes and other elements from the previous form
function recreateDesignNeedsForm() {
    // Reset the selectedDesignNeeds array
    selectedDesignNeeds.length = 0;

    // Change the main title back to the original text
    document.querySelector('#dynamic-form .sticky-header h4').textContent = 'Your Wish List';

    // Remove the contact details form elements
    formContent.innerHTML = '';

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
        
        // Append the checkbox to the formContent
        formContent.appendChild(label);
    });

    // Update the button text and event handler to return to the contact details form
    const validateButton = document.getElementById('validate-wishlist-button');
    validateButton.textContent = 'Validate My Wishlist';
    validateButton.removeEventListener('click', handleContactDetailsSubmit);
    validateButton.addEventListener('click', showContactDetailsForm);

    const btnSecondary = document.getElementById('btn-back');
    btnSecondary.removeEventListener('click', recreateDesignNeedsForm);
    btnContainer.removeChild(btnSecondary);

}


// Attach a click event listener to the "Validate My Wishlist" button
document.getElementById('validate-wishlist-button').addEventListener('click', showContactDetailsForm);

console.log(selectedDesignNeeds);
console.log(contactDetails);