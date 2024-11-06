// Select form and resume display elements
var form = document.getElementById('resume-form');
var resumeBuilder = document.getElementById('resume-builder');
var generateEditableResumeHTML = function (data) {
    return "\n        <div id=\"resume-display\">\n            <h2>".concat(data.name, "'s Resume</h2>\n            <p><strong>Email:</strong><span contenteditable=\"true\"> ").concat(data.email, "</span></p>\n            <p><strong>Phone:</strong> <span contenteditable=\"true\">").concat(data.phone, "</span></p>\n            <h3>Education</h3>\n            <p contenteditable=\"true\">").concat(data.education, "</p>\n            <h3>Experience</h3>\n            <p contenteditable=\"true\">").concat(data.experience, "</p>\n            <h3>Skills</h3>\n            <p contenteditable=\"true\">").concat(data.skills, "</p>\n        </div>\n    ");
};
// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    // Gather form data
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('Education').value;
    var experience = document.getElementById(' Work Experience').value;
    var skills = document.getElementById(' Skills').value;
    // Build the resume data object
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };
    // Generate the resume and insert into the resumeBuilder div
    resumeBuilder.innerHTML = generateEditableResumeHTML(resumeData);
});
