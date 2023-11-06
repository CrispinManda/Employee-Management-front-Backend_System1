"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const addProjectButton = document.querySelector('#addProjectButton');
    const projectModal = document.querySelector('#projectModal');
    const closeModalButton = document.querySelector('#closeModalButton');
    const saveProjectButton = document.querySelector('#saveProjectButton');
    const projosDiv = document.querySelector('.projos');
    addProjectButton.addEventListener('click', () => {
        projectModal.style.display = 'block';
    });
    closeModalButton.addEventListener('click', () => {
        projectModal.style.display = 'none';
    });
    saveProjectButton.addEventListener('click', () => {
        const projectNameInput = document.querySelector('#projectNameInput');
        const projectDescriptionInput = document.querySelector('#projectDescriptionInput');
        const completionDateInput = document.querySelector('#completionDateInput');
        const projectName = projectNameInput.value;
        const projectDescription = projectDescriptionInput.value;
        const completionDate = completionDateInput.value;
        if (projectName.trim() !== '') {
            const projectElement = document.createElement('div');
            projectElement.className = 'project';
            projectElement.innerHTML = `<strong>${projectName}</strong><br>${projectDescription}<br>Completion Date: ${completionDate}`;
            projosDiv.appendChild(projectElement);
            projectModal.style.display = 'none';
        }
        else {
            alert('Please enter a project name.');
        }
    });
});
