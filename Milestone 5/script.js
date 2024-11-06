// Select form, resume builder, and link elements
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resumeBuilder = document.getElementById('resume-builder');
    var shareableLinkContainer = document.getElementById('shareable-link-container');
    var shareableLink = document.getElementById('shareable-link');
    var downloadPdfBtn = document.getElementById('download-pdf');
    var resumeData = {
        username: '',
        name: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
        skills: ''
    };
    // Handle form submission and generate the resume
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log("Form submission triggered"); // Prevent form submission
        // Gather form data into resumeData object
        resumeData = {
            username: document.getElementById('Username').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            education: document.getElementById('Education').value,
            experience: document.getElementById('WorkExperience').value,
            skills: document.getElementById('Skills').value,
        };
        // Generate the resume HTML
        resumeBuilder.innerHTML = "\n        <h2>".concat(resumeData.name, "</h2>\n        <p><strong>Email:</strong> ").concat(resumeData.email, "</p>\n        <p><strong>Phone:</strong> ").concat(resumeData.phone, "</p>\n        <h3>Education</h3>\n        <p>").concat(resumeData.education, "</p>\n        <h3>Experience</h3>\n        <p>").concat(resumeData.experience, "</p>\n        <h3>Skills</h3>\n        <p>").concat(resumeData.skills, "</p>\n    ");
        // Show the shareable link section
        generateShareableLink();
        shareableLinkContainer.style.display = 'block';
    });
    // Function to generate a shareable link
    var generateShareableLink = function () {
        // Convert resume data to a JSON string and encode it in the URL
        var resumeJson = encodeURIComponent(JSON.stringify(resumeData));
        var shareableUrl = "".concat(window.location.origin, "?resume=").concat(resumeJson);
        // Update the link element with the new URL
        shareableLink.href = shareableUrl;
        shareableLink.textContent = shareableUrl;
    };
    // Function to download the resume as a PDF
    var downloadPdf = function () {
        var element = resumeBuilder; // Target the resume section for PDF
        // Use html2pdf library to generate and download PDF
        var options = {
            margin: 1,
            filename: "".concat(resumeData.username, "_resume.pdf"),
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
    var loadResumeFromUrl = function () {
        var params = new URLSearchParams(window.location.search);
        var resumeJson = params.get('resume');
        if (resumeJson) {
            var loadedResumeData = JSON.parse(decodeURIComponent(resumeJson));
            // Populate the form and resumeBuilder with loaded data
            document.getElementById('Username').value = loadedResumeData.username;
            document.getElementById('name').value = loadedResumeData.name;
            document.getElementById('email').value = loadedResumeData.email;
            document.getElementById('phone').value = loadedResumeData.phone;
            document.getElementById('Education').value = loadedResumeData.education;
            document.getElementById('WorkExperience').value = loadedResumeData.experience;
            document.getElementById('Skills').value = loadedResumeData.skills;
            // Update the resume display
            resumeBuilder.innerHTML = "\n            <h2>".concat(loadedResumeData.name, "</h2>\n            <p><strong>Email:</strong> ").concat(loadedResumeData.email, "</p>\n            <p><strong>Phone:</strong> ").concat(loadedResumeData.phone, "</p>\n            <h3>Education</h3>\n            <p>").concat(loadedResumeData.education, "</p>\n            <h3>Experience</h3>\n            <p>").concat(loadedResumeData.experience, "</p>\n            <h3>Skills</h3>\n            <p>").concat(loadedResumeData.skills, "</p>\n        ");
            // Show the shareable link
            generateShareableLink();
            shareableLinkContainer.style.display = 'block';
        }
    };
    // Call loadResumeFromUrl on page load to check if resume data exists in URL
    loadResumeFromUrl();
});
