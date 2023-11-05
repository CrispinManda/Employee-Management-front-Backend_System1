interface Project {
    name: string;
    description: string;
    startdate:'';
    enddate:'';
    priority: '';
    assigned_to: '' ;
    // Add other properties you expect to receive from your API if needed
  }
  
  // ...
  
  // Inside the `getProjects` function
  const getProjects = (user_token: string) => {
    fetch('http://localhost:9000/project/allProjects', {
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'token': user_token,
      },
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data: Project[]) => {
        all_user.innerHTML = data.length;
  
        data.forEach((project: Project) => {
          const element_row = `
            <tr>
              <td>1</td>
              <td>${project.name}</td>
              <td><span class="badge badge-success">${project.status}</span></td>
              <td>User 1</td>
              <td>
                <a href="project_edit.html?project=${project.project_id}" class="edit-button btn">Edit</a>
                <a href="project.html?project=${project.project_id}" class="view-button btn">View</a>
                <button class="delete-button btn">Delete</button>
              </td>
            </tr>
          `;
          all_tbody.innerHTML += element_row;
        });
      })
      .catch((error) => {
        console.error('Failed to fetch projects:', error);
      });
  };
  