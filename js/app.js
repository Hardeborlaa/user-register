var selectedRow = null;

// User representation
class User {
    constructor(firstName, lastName, phoneNo, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNo = phoneNo;
        this.email = email;
    }
}
class REG {
    static addUserToList(user) {
        const list = document.querySelector("#user-list");
        const row = document.createElement("tr");

        row.innerHTML = `
             <td>${user.firstName}</td>
             <td>${user.lastName}</td>
             <td>${user.phoneNo}</td>
             <td>${user.email}</td>
             <td><a href="#" class="btn btn-warning btn-sm edit">Edit</a>
             <a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
             `;
        list.appendChild(row);
    }
    // Show Alerts
    static showAlert(message, className){
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector("#notice");
        const form = document.querySelector("#user-form");
        container.insertBefore(div,form);
    
        setTimeout(() => document.querySelector(".alert").remove(), 3000);
    }
    // Clear All Fields 
    static clearFields() {
        document.querySelector("#firstName").value ="";
        document.querySelector("#lastName").value ="";
        document.querySelector("#phoneNo").value ="";
        document.querySelector("#email").value ="";
    }
}
    //Display User
    document.addEventListener('DOMContentLoaded', REG.displayUsers);
    //Add Data
    document.querySelector("#user-form").addEventListener("submit", (e) => {
        e.preventDefault();

    //  Get Form Values
        const firstName = document.querySelector("#firstName").value;
        const lastName = document.querySelector("#lastName").value;
        const phoneNo = document.querySelector("#phoneNo").value;
        const email = document.querySelector("#email").value;

    // validate 
        if (firstName === "" || lastName === "" || phoneNo === "" || email === ""){
            REG.showAlert("Please fill in all fields", "danger");
        } else if (selectedRow == null) {
            const user = new User(firstName, lastName, phoneNo, email);
            // Add User to Register
            REG.addUserToList(user);
            // Show success message
            REG.showAlert("User Added", "success");
            // Clear fields
            REG.clearFields();
        } else {
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = phoneNo;
            selectedRow.children[3].textContent = email;
            selectedRow=null;
            REG.showAlert("User Info Edited", "info");
            REG.clearFields();
        }
    });
    //Edit User Data
    document.querySelector("#user-list").addEventListener("click",(e) => {
        target = e.target;
        if(target.classList.contains("edit")){
            selectedRow = target.parentElement.parentElement;
            document.querySelector("#firstName").value = selectedRow.children[0].textContent;
            document.querySelector("#lastName").value = selectedRow.children[1].textContent;
            document.querySelector("#phoneNo").value = selectedRow.children[2].textContent;
            document.querySelector("#email").value = selectedRow.children[3].textContent;
    }
});


    // Delete User Data
    document.querySelector("#user-list").addEventListener("click",(e) => {
        target = e.target;
        if (target.classList.contains("delete")){
            target.parentElement.parentElement.remove();
            REG.showAlert("User Data Deleted","danger");
        }
});