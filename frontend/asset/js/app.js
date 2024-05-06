function select() {
  var selected = document.getElementById("employee-role").value;
}

function saveEmployee() {
  let requestBody = mapRequest();
  if (
    requestBody.name == "" ||
    requestBody.age == "" ||
    requestBody.address == "" ||
    requestBody.role == "Employee Roles"
  ) {
    Swal.fire({
      title: "Something Missing!",
      text: "Opps, something Missing. Please check your registration form",
      icon: "error",
    });
  } else {
    fetch("http://localhost:8080/employee", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    Swal.fire({
      title: "Success!",
      text: "The Employee have been saved. Thank you!",
      icon: "success",
    });
    clear();
  }
}

function mapRequest() {
  let requestBody = {
    name: undefined,
    age: undefined,
    address: undefined,
    role: undefined,
  };

  requestBody.name = document.getElementById("txt-employee-name").value;
  requestBody.age = document.getElementById("txt-employee-age").value;
  requestBody.address = document.getElementById("txt-employee-adderss").value;
  requestBody.role = document.getElementById("employee-role").value;

  return requestBody;
}

function clear() {
  document.getElementById("txt-employee-name").value = "";
  document.getElementById("txt-employee-age").value = "";
  document.getElementById("txt-employee-adderss").value = "";
  document.getElementById("employee-role").value = "Employee Roles";
}

function viewEmployee() {
  fetch("http://localhost:8080/employee")
    .then((res) => res.json())
    .then((data) => {
      for (let index = 0; index < data.length; index++) {
        addTableData(data, index);
      }
    });
}

function addTableData(data, x) {
  let tr = document.createElement("tr");

  if (x % 2 == 0) {
    tr.className = "table-active";
  }

  let nameTd = tr.appendChild(document.createElement("td"));
  let ageTd = tr.appendChild(document.createElement("td"));
  let roleTd = tr.appendChild(document.createElement("td"));
  let addressTd = tr.appendChild(document.createElement("td"));
  let actionTd = tr.appendChild(document.createElement("td"));

  let updateBtn = document.createElement("button");
  updateBtn.className = "btn btn-success mb-2";
  updateBtn.style.marginRight = "10px";

  let updateIcon = document.createElement("i");
  updateIcon.className = "fa fa-wrench";

  updateBtn.appendChild(updateIcon);

  let deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger mb-2";

  let deleteIcon = document.createElement("i");
  deleteIcon.className = "fa fa-trash";

  deleteBtn.appendChild(deleteIcon);

  let id = data[x].id;

  deleteBtn.addEventListener("click", function () {
    deleteEmployee(id);
  });
  updateBtn.addEventListener("click", async function () {
    updateEmployee(id);
  });

  nameTd.innerHTML = data[x].name;
  ageTd.innerHTML = data[x].age;
  roleTd.innerHTML = data[x].role;
  addressTd.innerHTML = data[x].address;
  actionTd.appendChild(updateBtn);
  actionTd.appendChild(deleteBtn);

  document.getElementById("tBody").appendChild(tr);
}

function deleteEmployee(id) {
  let url = `http://localhost:8080/employee/${id}`;

  Swal.fire({
    title: "Are you sure want to delete?",
    text: "Once deleted, you will not be able to recover this details!",
    icon: "warning",
    showCancelButton: true,
    preConfirm: () => {
      fetch(url, {
        method: "DELETE",
      });
      Swal.fire({
        title: "Deleted!",
        text: "Employee Deleted Successfully!",
        icon: "success",
        preConfirm: () => {
          window.location.reload();
        },
      });
    },
  });
}

async function updateEmployee(id) {
  let updateUrl = `http://localhost:8080/employee/${id}`;
  await Swal.fire({
    title: "Update Details",
    html: `
          <input id="swal-name" class="swal2-input" placeholder="Name">
          <input id="swal-age" class="swal2-input" placeholder="Age">
          <input id="swal-address" class="swal2-input" placeholder="Address">
          <select class="swal2-select" id="swal-select">
                        <option selected>Employee Roles</option>
                        <option value="Manager">Manager</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Secretary">Secretary</option>
                        <option value="Worker">Worker</option>
                      </select>
        `,
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
      let requestBody2 = {
        name: document.getElementById("swal-name").value,
        age: document.getElementById("swal-age").value,
        address: document.getElementById("swal-address").value,
        role: document.getElementById("swal-select").value,
      };
      if (
        requestBody2.name == "" ||
        requestBody2.age == "" ||
        requestBody2.address == "" ||
        requestBody2.role == "Employee Roles"
      ) {
        Swal.fire({
          title: "Something Missing!",
          text: "Opps, something Missing. Please check your registration form",
          icon: "error",
          preConfirm: () => {
            updateEmployee(id);
          },
        });
      } else {
        fetch(updateUrl, {
          method: "PUT",
          body: JSON.stringify(requestBody2),
          headers: {
            "Content-type": "application/json",
          },
        });
        Swal.fire({
          title: "Updated!",
          text: "Employee Details Updated!",
          icon: "success",
          preConfirm: () => {
            window.location.reload();
          },
        });
      }
    },
  });
}

function searchEmployee(id) {
  let searhUrl = `http://localhost:8080/employee/${id}`;

  fetch(searhUrl)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("txt-employee-name").value = data.name;
      document.getElementById("txt-employee-age").value = data.age;
      document.getElementById("txt-employee-address").value = data.address;
      document.getElementById("txt-employee-role").value = data.role;

      errorMsg(data.status);
    });
}

document.getElementById("btn-search").addEventListener("click", function () {
  let id = document.getElementById("txt-employee-id").value;
  searchEmployee(id);
  document.getElementById("txt-employee-id").value="";
});

function errorMsg(status) {
  if (status == 500) {
    Swal.fire({
      title: "Opps!",
      text: "Sorry, The Employee is not exist",
      icon: "error",
      preConfirm: () => {
        document.getElementById("txt-employee-id").value = "";
        document.getElementById("txt-employee-name").value = "";
      document.getElementById("txt-employee-age").value = "";
      document.getElementById("txt-employee-address").value = "";
      document.getElementById("txt-employee-role").value = "";
      },
    });
  }
}
