interface ProjectData {
    projectName: string;
    description: string;
    deadline: string;
    priority: string;
  }
   
  interface ServerResponse {
    status: number;
    message: string;
  }
   
  const projectNameInput = document.getElementById('projectName') as HTMLInputElement;
  const descriptionInput = document.getElementById('description') as HTMLTextAreaElement;
  const deadlineInput = document.getElementById('deadline') as HTMLInputElement;
  const priorityInput = document.getElementById('priority') as HTMLInputElement;
  const submitButton = document.getElementById('submitBtn') as HTMLButtonElement;
   
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
   
    const projectData: ProjectData = {
      projectName,
      description,
      deadline,
      priority,
    };
   
    submitProjectData(projectData);
  };
   
  function isValidDateFormat(dateString: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(dateString);
  }
   
  const submitProjectData = async (projectData: ProjectData) => {
    try {
      const response = await fetch('http://localhost:4400/projects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });
   
      handleResponse(response);
    } catch (error) {
      alert('An error occurred');
    }
  };
   
  const handleResponse = async (response: Response) => {
    const responseData: ServerResponse = await response.json();
   
    if (response.ok) {
      alert('Project added successfully');
    } else {
      alert('Failed to add the project');
    }
  };
   
  if (submitButton) {
    submitButton.addEventListener('click', createProject);
  }