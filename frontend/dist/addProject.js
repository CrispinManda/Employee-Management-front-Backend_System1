"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const projectNameInput = document.getElementById('projectName');
const descriptionInput = document.getElementById('description');
const deadlineInput = document.getElementById('deadline');
const priorityInput = document.getElementById('priority');
const submitButton = document.getElementById('submitBtn');
console.log(submitButton);
const createProject = () => {
    const projectName = projectNameInput.value;
    const description = descriptionInput.value;
    const deadline = deadlineInput.value;
    const priority = priorityInput.value;
    if (!projectName || !deadline || !priority) {
        alert('Please fill in all required fields');
        return;
    }
    // Additional front-end validation for deadline format
    if (!isValidDateFormat(deadline)) {
        alert('Please enter a valid date for the deadline (YYYY-MM-DD)');
        return;
    }
    const projectData = {
        projectName,
        description,
        deadline,
        priority,
    };
    submitProjectData(projectData);
};
function isValidDateFormat(dateString) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(dateString);
}
const submitProjectData = (projectData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost:4400/projects/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
        });
        handleResponse(response);
    }
    catch (error) {
        alert('An error occurred');
    }
});
const handleResponse = (response) => __awaiter(void 0, void 0, void 0, function* () {
    const responseData = yield response.json();
    if (response.ok) {
        alert('Project added successfully');
    }
    else {
        alert('Failed to add the project');
    }
});
if (submitButton) {
    submitButton.addEventListener('click', createProject);
}
