document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];

    let students = JSON.parse(localStorage.getItem('students')) || [];

    function saveToLocalStorage() {
        localStorage.setItem('students', JSON.stringify(students));
    }

    function renderStudents() {

        //Xử lý sự kiện click add student
        studentTable.innerHTML = '';
        students.forEach((student, index) => {
            const row = studentTable.insertRow();
            row.insertCell(0).textContent = student.name;
            row.insertCell(1).textContent = student.studentId;
            row.insertCell(2).textContent = student.dob;
            row.insertCell(3).textContent = student.class;
            const actionsCell = row.insertCell(4);

            //Xử lý sự kiện click sửa student
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editStudent(index));
            actionsCell.appendChild(editButton);

            //Xử lý sự kiện click delete student
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteStudent(index));
            actionsCell.appendChild(deleteButton);
        });
    }

    function addStudent(student) {
        students.push(student);
        saveToLocalStorage();
        renderStudents();
    }

    function deleteStudent(index) {
        students.splice(index, 1);
        saveToLocalStorage();
        renderStudents();
    }

    function editStudent(index) {
        const student = students[index];
        document.getElementById('name').value = student.name;
        document.getElementById('studentId').value = student.studentId;
        document.getElementById('dob').value = student.dob;
        document.getElementById('class').value = student.class;

        deleteStudent(index);
    }

    studentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newStudent = {
            name: studentForm.name.value,
            studentId: studentForm.studentId.value,
            dob: studentForm.dob.value,
            class: studentForm.class.value
        };
        addStudent(newStudent);
        studentForm.reset();
    });

    renderStudents();
});
