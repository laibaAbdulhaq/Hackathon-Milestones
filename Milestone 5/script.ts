declare const html2pdf: any;
// Select form, resume builder, and link elements
document.addEventListener('DOMContentLoaded', () => {
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeBuilder = document.getElementById('resume-builder') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLink = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfBtn = document.getElementById('download-pdf') as HTMLButtonElement;

interface ResumeData {
    username: string;
    name: string;
    email: string;
    phone: string;
    education: string;
    experience: string;
    skills: string;
}
let resumeData: ResumeData = {
    username: '',
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    skills: ''
};

// Handle form submission and generate the resume
form.addEventListener('submit', function (event: Event) {
    event.preventDefault();
    console.log("Form submission triggered"); // Prevent form submission
    // Gather form data into resumeData object
    resumeData = {
        username: (document.getElementById('Username') as HTMLInputElement).value,
        name: (document.getElementById('name') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        phone: (document.getElementById('phone') as HTMLInputElement).value,
        education: (document.getElementById('Education') as HTMLTextAreaElement).value,
        experience: (document.getElementById('WorkExperience') as HTMLTextAreaElement).value,
        skills: (document.getElementById('Skills') as HTMLTextAreaElement).value,
    };
    // Generate the resume HTML
    resumeBuilder.innerHTML = `
        <h2>${resumeData.name}</h2>
        <p><strong>Email:</strong> ${resumeData.email}</p>
        <p><strong>Phone:</strong> ${resumeData.phone}</p>
        <h3>Education</h3>
        <p>${resumeData.education}</p>
        <h3>Experience</h3>
        <p>${resumeData.experience}</p>
        <h3>Skills</h3>
        <p>${resumeData.skills}</p>
    `;
    // Show the shareable link section
    generateShareableLink();
    shareableLinkContainer.style.display = 'block';
});

// Function to generate a shareable link
const generateShareableLink = () => {
    // Convert resume data to a JSON string and encode it in the URL
    const resumeJson = encodeURIComponent(JSON.stringify(resumeData));
    const shareableUrl = `${window.location.origin}?resume=${resumeJson}`;
    // Update the link element with the new URL
    shareableLink.href = shareableUrl;
    shareableLink.textContent = shareableUrl;
};
// Function to download the resume as a PDF
const downloadPdf = () => {
    const element = resumeBuilder; // Target the resume section for PDF
    // Use html2pdf library to generate and download PDF
    const options = {
        margin: 1,
        filename: `${resumeData.username}_resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
// Generate the PDF 
    html2pdf().from(element).set(options).save();
};
// Attach event listener to download PDF button
downloadPdfBtn.addEventListener('click', downloadPdf);
// Function to load resume from URL query (for shareable link)
const loadResumeFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const resumeJson = params.get('resume');
    if (resumeJson) {
        const loadedResumeData: ResumeData = JSON.parse(decodeURIComponent(resumeJson));
        
        // Populate the form and resumeBuilder with loaded data
        (document.getElementById('Username') as HTMLInputElement).value = loadedResumeData.username;
        (document.getElementById('name') as HTMLInputElement).value = loadedResumeData.name;
        (document.getElementById('email') as HTMLInputElement).value = loadedResumeData.email;
        (document.getElementById('phone') as HTMLInputElement).value = loadedResumeData.phone;
        (document.getElementById('Education') as HTMLTextAreaElement).value = loadedResumeData.education;
        (document.getElementById('WorkExperience') as HTMLTextAreaElement).value = loadedResumeData.experience;
        (document.getElementById('Skills') as HTMLTextAreaElement).value = loadedResumeData.skills;
        // Update the resume display
        resumeBuilder.innerHTML = `
            <h2>${loadedResumeData.name}</h2>
            <p><strong>Email:</strong> ${loadedResumeData.email}</p>
            <p><strong>Phone:</strong> ${loadedResumeData.phone}</p>
            <h3>Education</h3>
            <p>${loadedResumeData.education}</p>
            <h3>Experience</h3>
            <p>${loadedResumeData.experience}</p>
            <h3>Skills</h3>
            <p>${loadedResumeData.skills}</p>
        `;
        // Show the shareable link
        generateShareableLink();
        shareableLinkContainer.style.display = 'block';
    }
};

// Call loadResumeFromUrl on page load to check if resume data exists in URL
loadResumeFromUrl();
});
