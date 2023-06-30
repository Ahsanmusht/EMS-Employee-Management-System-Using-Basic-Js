    // Define an array to store employee records
    var employees = [];

    // Function to add an employee record
    function addEmployee(event) {
      event.preventDefault();
      var nameInput = document.getElementById("name");
      var dateOfJoiningInput = document.getElementById("dateOfJoining");
      var positionInput = document.getElementById("position");

      // Create a new employee object
      var employee = {
        name: nameInput.value,
        dateOfJoining: dateOfJoiningInput.value,
        position: positionInput.value
      };

      // Add the employee to the employees array
      employees.push(employee);

      // Clear the input fields
      nameInput.value = "";
      dateOfJoiningInput.value = "";
      positionInput.value = "";

      // Update the employee table
      updateEmployeeTable();

      // Close the modal
      var modal = document.getElementById("addEmployeeModal");
      var modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();

      // Save the data to localStorage
      saveDataToLocalStorage();
    }

    // Function to update an employee record
    function updateEmployee(index) {
      var employee = employees[index];
      var editNameInput = document.getElementById("editName");
      var editDateOfJoiningInput = document.getElementById("editDateOfJoining");
      var editPositionInput = document.getElementById("editPosition");

      // Set the input field values to the employee's data
      editNameInput.value = employee.name;
      editDateOfJoiningInput.value = employee.dateOfJoining;
      editPositionInput.value = employee.position;

      // Open the edit employee modal
      var editModal = document.getElementById("editEmployeeModal");
      var editModalInstance = bootstrap.Modal.getInstance(editModal);
      editModalInstance.show();

      // Add event listener to the edit employee form
      var editEmployeeForm = document.getElementById("editEmployeeForm");
      editEmployeeForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Update the employee object with the new values
        employee.name = editNameInput.value;
        employee.dateOfJoining = editDateOfJoiningInput.value;
        employee.position = editPositionInput.value;

        // Update the employee table
        updateEmployeeTable();

        // Close the modal
        editModalInstance.hide();

        // Save the data to localStorage
        saveDataToLocalStorage();
      });
    }

    // Function to delete an employee record
    function deleteEmployee(index) {
      // Remove the employee from the employees array
      employees.splice(index, 1);

      // Update the employee table
      updateEmployeeTable();

      // Save the data to localStorage
      saveDataToLocalStorage();
    }

    // Function to update the employee table
    function updateEmployeeTable() {
      var employeeTable = document.querySelector(".employee-table tbody");
      employeeTable.innerHTML = "";

      // Loop through the employees array and add rows to the table
      employees.forEach(function (employee, index) {
        var row = document.createElement("tr");
        row.innerHTML = `
          <td>${employee.name}</td>
          <td>${employee.dateOfJoining}</td>
          <td>${employee.position}</td>
          <td>
            <button class="btn btn-primary btn-sm" onclick="updateEmployee(${index})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})">Delete</button>
          </td>
        `;

        employeeTable.appendChild(row);
      });
    }

    // Function to search for an employee by name using the finding segment approach
    function searchEmployee(event) {
      event.preventDefault();
      var searchInput = document.getElementById("search");
      var searchValue = searchInput.value.toLowerCase();

      // Filter employees based on the search value using the finding segment approach
      var filteredEmployees = employees.filter(function (employee) {
        var name = employee.name.toLowerCase();
        for (var i = 0; i <= name.length - searchValue.length; i++) {
          if (name.substring(i, i + searchValue.length) === searchValue) {
            return true;
          }
        }
        return false;
      });

      // Update the employee table with the filtered employees
      var employeeTable = document.querySelector(".employee-table tbody");
      employeeTable.innerHTML = "";

      filteredEmployees.forEach(function (employee, index) {
        var row = document.createElement("tr");
        row.innerHTML = `
          <td>${employee.name}</td>
          <td>${employee.dateOfJoining}</td>
          <td>${employee.position}</td>
          <td>
            <button class="btn btn-primary btn-sm" onclick="updateEmployee(${index})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})">Delete</button>
          </td>
        `;

        employeeTable.appendChild(row);
      });
    }

    // Load data from localStorage on page load
    function loadDataFromLocalStorage() {
      var savedEmployees = localStorage.getItem("employees");
      if (savedEmployees) {
        employees = JSON.parse(savedEmployees);
        updateEmployeeTable();
      }
    }

    // Save data to localStorage
    function saveDataToLocalStorage() {
      localStorage.setItem("employees", JSON.stringify(employees));
    }

    // Add event listener to the add employee form
    var addEmployeeForm = document.getElementById("addEmployeeForm");
    addEmployeeForm.addEventListener("submit", addEmployee);

    // Add event listener to the search form
    var searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", searchEmployee);

    // Load data from localStorage on page load
    loadDataFromLocalStorage();