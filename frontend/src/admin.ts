const all_user = document.querySelector('.all-user') as HTMLDivElement;
const all_tbody = document.querySelector('.user-tbody') as HTMLDivElement;
let logout = document.querySelector('.logout-btn') as HTMLButtonElement;


interface user {
    full_name:string
}
const token = localStorage.getItem('token') as string;
const user_email_logged_in = localStorage.getItem('user_email') as string;

if(!token || !user_email_logged_in){
    location.href  = "login.html"
}

const getAllUsers = (user_token:string)=>{
    console.log("users fetched");
    
    fetch('http://localhost:9000/user/allUsers',{
    headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'token':user_token
    },
    method: "GET",
  
}).then(res => res.json()
).then(data=>{
    all_user.innerHTML = data.length

    data.forEach(element => {
        const element_row = `
        <tr>
<td>#</td>
<td>${element.first_name} ${element.email}</td>

</tr>
        `
        all_tbody.innerHTML += element_row
    });
    console.log(data);
})
}


const getProjects = (user_token:string)=>{
    console.log("fethching all projects");
    
    fetch('http://localhost:9000/project/allProjects',{//change to our table name for our projects
    headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'token':user_token
    },
    method: "GET",
  
}).then(res => res.json()
).then(data=>{
    all_user.innerHTML = data.length

    data.forEach(element => {
        console.log(typeof(element));
        
        const element_row = `
        <tr>
        <td>1</td>
        <td>Project A</td>
        <td><span class="badge badge-success">${element.status}</span></td>
        <td>User 1</td>
        
        <td>
            <a href="project_edit.html?project=${element.project_id}" class="edit-button btn" >Edit</a>
            <a href="project.html?project=${element.project_id}" class="view-button btn">View</button>
            <button class="delete-button btn">Delete</button>
        </td>
    </tr>
        `
        all_tbody.innerHTML += element_row
    });
    console.log(data);
})
}



getProjects(token)
getAllUsers(token)

logout.addEventListener('click',()=>{
    console.log("gfdg");
    
    localStorage.removeItem('user_email')
    localStorage.removeItem('token')
    location.href = "login.html"
})