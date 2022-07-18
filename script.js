const loadBtn = document.getElementById("load-btn");
var usersData;

fetch("./data.json")
  .then((Response) => Response.json())
  .then((data) => (usersData = data));

loadBtn.addEventListener("click", function () {
  if (loadBtn.innerHTML === "Load Data") {
    loadBtn.innerHTML = "Refresh Data";
  }
  return fetchData();
});

var headings = [
  "First Name",
  "Middle Name",
  "Last Name",
  "Email",
  "Phone",
  "Role",
  "Address",
];
function fetchData() {
  var tableData = document.createElement("table");

  var tr = tableData.insertRow(-1);

  for (let i = 0; i < headings.length; i++) {
    let th = document.createElement("th");
    th.innerHTML = headings[i];
    tr.appendChild(th);
  }

  let th = document.createElement("th");
  th.innerHTML = "Buttons";
  tr.appendChild(th);

  // Adding JSON data in table
  for (let i = 0; i < usersData.length; i++) {
    tr = tableData.insertRow(-1);
    for (let j = 0; j <= headings.length; j++) {
      let td = tr.insertCell(-1);
      if (headings[j] !== undefined) {
        td.innerHTML = usersData[i][headings[j]];
      } else {
        let editBtn = document.createElement("button");
        let deleteBtn = document.createElement("button");
        let saveBtn = document.createElement("button");
        let cancelBtn = document.createElement("button");

        editBtn.innerHTML = "Edit";
        deleteBtn.innerHTML = "Delete";
        saveBtn.innerHTML = "Save";
        cancelBtn.innerHTML = "Cancel";

        editBtn.id = `edit-btn${i}`;
        deleteBtn.id = `delete-btn${i}`;
        saveBtn.id = `save-btn${i}`;
        cancelBtn.id = `cancel-btn${i}`;

        saveBtn.style.display = "none";
        cancelBtn.style.display = "none";

        editBtn.addEventListener("click", function () {
          editRow(event, i);
        });

        deleteBtn.addEventListener("click", function () {
          deleteRow(event, i);
        });

        saveBtn.addEventListener("click", function () {
          saveRow(event, i);
        });

        cancelBtn.addEventListener("click", function () {
          cancelRow(event, i);
        });

        td.appendChild(editBtn);
        td.appendChild(deleteBtn);
        td.appendChild(saveBtn);
        td.appendChild(cancelBtn);
      }
    }
  }

  var tableContainer = document.getElementById("table-container");
  tableContainer.innerHTML = "";
  tableContainer.appendChild(tableData);
}

function editRow(event, ind) {
  let tr = event.target.parentElement.parentElement;
  tr.contentEditable = true;
  event.target.parentElement.contentEditable = false;

  event.target.style.display = "none";

  document.getElementById(`delete-btn${ind}`).style.display = "none";

  document.getElementById(`save-btn${ind}`).style.display = "inline";

  document.getElementById(`cancel-btn${ind}`).style.display = "inline";
}

function saveRow(event, ind) {
  let tr = event.target.parentElement.parentElement;
  tr.contentEditable = false;
  let index = tr.rowIndex;
  for (let i = 0; i < tr.children.length - 1; i++) {
    usersData[index - 1][headings[i]] = tr.children[i].innerHTML;
  }

  event.target.style.display = "none";

  document.getElementById(`cancel-btn${ind}`).style.display = "none";

  document.getElementById(`edit-btn${ind}`).style.display = "inline";

  document.getElementById(`delete-btn${ind}`).style.display = "inline";
}

function deleteRow(event) {
  let tr = event.target.parentElement.parentElement;
  let index = tr.rowIndex;
  tr.parentElement.removeChild(tr);
  usersData.splice(index - 1, 1);
}

function cancelRow(event, ind) {
  let tr = event.target.parentElement.parentElement;
  tr.contentEditable = false;
  let index = tr.rowIndex;
  for (let i = 0; i < tr.children.length - 1; i++) {
    tr.children[i].innerHTML = usersData[index - 1][headings[i]];
  }

  event.target.style.display = "none";

  document.getElementById(`save-btn${ind}`).style.display = "none";

  document.getElementById(`edit-btn${ind}`).style.display = "inline";

  document.getElementById(`delete-btn${ind}`).style.display = "inline";
}
