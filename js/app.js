var selectedRow = null;

// Show Alerts 
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div,main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}
// Clear All Fields 
function clearFields(){
    document.querySelector("#firstName").value ="";
    document.querySelector("#lastName").value ="";
    document.querySelector("#phoneNo").value ="";
    document.querySelector("#email").value ="";
}
// Add Data
document.querySelector("#user-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get Form Values
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const phoneNo = document.querySelector("#phoneNo").value;
    const email = document.querySelector("#email").value;

    // validate 
    if (firstName == "" || lastName =="" || phoneNo == "" || email ==""){
        showAlert("Please fill in all fields", "danger");
    }
    else {
        if(selectedRow == null) {
            const list = document.querySelector("#user-list");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${phoneNo}</td>
            <td>${email}</td>
            <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
            <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("User Added", "success");
        }
        else {
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = phoneNo;
            selectedRow.children[3].textContent = email;
            selectedRow=null;
            showAlert("User Info Edited", "info");
        }
        clearFields();
    }
});

// Edit Data
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
// Delete Data
document.querySelector("#user-list").addEventListener("click",(e) => {
    target = e.target;
    if (target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("User Data Deleted","danger");
    }
});