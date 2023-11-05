document.addEventListener('DOMContentLoaded', function () {
  const addProjectButton = document.querySelector('#addProjectButton') as HTMLElement;
  const projectModal = document.querySelector('#projectModal') as HTMLElement;
  const closeModalButton = document.querySelector('#closeModalButton') as HTMLElement;
  const saveProjectButton = document.querySelector('#saveProjectButton') as HTMLElement;
  const projosDiv = document.querySelector('.projos') as HTMLElement;

  addProjectButton.addEventListener('click', () => {
    projectModal.style.display = 'block';
  });

  closeModalButton.addEventListener('click', () => {
    projectModal.style.display = 'none';
  });

  saveProjectButton.addEventListener('click', () => {
    const projectNameInput = document.querySelector('#projectNameInput') as HTMLInputElement;
    const projectDescriptionInput = document.querySelector('#projectDescriptionInput') as HTMLTextAreaElement;
    const completionDateInput = document.querySelector('#completionDateInput') as HTMLInputElement;

    const projectName = projectNameInput.value;
    const projectDescription = projectDescriptionInput.value;
    const completionDate = completionDateInput.value;

    if (projectName.trim() !== '') {
   
      const projectElement = document.createElement('div');
      projectElement.className = 'project';
      projectElement.innerHTML = `<strong>${projectName}</strong><br>${projectDescription}<br>Completion Date: ${completionDate}`;

      projosDiv.appendChild(projectElement);

      projectModal.style.display = 'none';
    } else {
      alert('Please enter a project name.');
    }
  });
});
