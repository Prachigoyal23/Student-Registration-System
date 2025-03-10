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
    // Loop through each student and dispplay their information
    students.forEach((student, index) => {
        const studentDiv = document.createElement("div");
        studentDiv.classList.add("student-item");

         // Create the HTML structure for each student item with Edit and Delete buttons
        studentDiv.innerHTML = `
            <span>${student.name} - ${student.studentId}</span>
            <div>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </div>
        `;
        studentList.appendChild(studentDiv);
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
