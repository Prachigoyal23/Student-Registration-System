// wait for the DOM content to be loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
    loadStudentRecords();

    // Get the Student form and add the event listener for form submission
    const studentForm = document.getElementById("studentForm");
    studentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        addStudent();
    });
});


// Function to load and display student records from local storage
function loadStudentRecords() {
    const studentList = document.getElementById("studentList");
    const students = JSON.parse(localStorage.getItem("students")) || [];

    studentList.innerHTML = "";
    // Loop through each student and display their information
    students.forEach((student, index) => {
        const row = document.createElement("tr");

         //Create table cells for each student properly
         row.innerHTML = `
         <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.emailId}</td>
            <td>${student.contactNumber}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
            `;

        studentList.appendChild(row);
    });
}

// Function to add a new student to the localStorage
function addStudent() {
    const studentName = document.getElementById("studentName").value;
    const studentId = document.getElementById("studentId").value;
    const emailId = document.getElementById("emailId").value;
    const contactNumber = document.getElementById("contactNumber").value;

    if (!studentName || !studentId || !emailId || !contactNumber) {
        alert("Please fill all fields.");
        return;
    }

    const students = JSON.parse(localStorage.getItem("students")) || [];

    // Check if the student ID already exists
    const studentExists = students.some(student => student.studentId === studentId);
    
    if (studentExists) {
        alert("Student ID already exists. Please use a different ID.");
        return;
    }

    
    students.push({ name: studentName, studentId, emailId, contactNumber });
    localStorage.setItem("students", JSON.stringify(students));

    document.getElementById("studentForm").reset();
    loadStudentRecords();
}

function editStudent(index) {
    const students = JSON.parse(localStorage.getItem("students"));
    const student = students[index];

    document.getElementById("studentName").value = student.name;
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("emailId").value = student.emailId;
    document.getElementById("contactNumber").value = student.contactNumber;

    deleteStudent(index);
}

function deleteStudent(index) {
    const students = JSON.parse(localStorage.getItem("students"));
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudentRecords();
}
