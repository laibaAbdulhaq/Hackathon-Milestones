// Select form and resume display elements
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeBuilder = document.getElementById('resume-builder') as HTMLDivElement;

interface ResumeData {
    name: string;
    email: string;
    phone: string;
    education: string;
    experience: string;
    skills: string;
}

const generateEditableResumeHTML = (data: ResumeData): string => {
    return `
        <div id="resume-display">
            <h2>${data.name}'s Resume</h2>
            <p><strong>Email:</strong><span contenteditable="true"> ${data.email}</span></p>
            <p><strong>Phone:</strong> <span contenteditable="true">${data.phone}</span></p>
            <h3>Education</h3>
            <p contenteditable="true">${data.education}</p>
            <h3>Experience</h3>
            <p contenteditable="true">${data.experience}</p>
            <h3>Skills</h3>
            <p contenteditable="true">${data.skills}</p>
        </div>
    `;
};

// Handle form submission
form.addEventListener('submit', function (event: Event) {
    event.preventDefault(); // Prevent default form submission

    // Gather form data
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('Education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById(' Work Experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById(' Skills') as HTMLTextAreaElement).value;

    // Build the resume data object
    const resumeData: ResumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills
    };

    // Generate the resume and insert into the resumeBuilder div
    resumeBuilder.innerHTML = generateEditableResumeHTML(resumeData);
});
