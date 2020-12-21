/*
 * Profile page
 */

// firebase configuration

var firebaseConfig = {
  apiKey: "AIzaSyCEpCp5GE-5cio7ZzBZ5QQ4Mu837HGisHo",
  authDomain: "bitrupt-module-2.firebaseapp.com",
  databaseURL: "https://bitrupt-module-2-default-rtdb.firebaseio.com",
  projectId: "bitrupt-module-2",
  storageBucket: "bitrupt-module-2.appspot.com",
  messagingSenderId: "389014818585",
  appId: "1:389014818585:web:9d8d6ac38d221ec1e73f88",
  measurementId: "G-7BG3PWSCXT",
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
var uid;

auth.onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
  }
});

function signOut() {
  auth.signOut();
  console.log("SIGNED OUT");
  location.replace("./index.html");
}

// navigation starts here
$("#toggle").click(function () {
  $(this).toggleClass("on");
  $("#resize").toggleClass("active");
});

$("#resize ul li a").click(function () {
  $(this).toggleClass("on");
  $("#resize").toggleClass("active");
});
$(".close-btn").click(function () {
  $(this).toggleClass("on");
  $("#resize").toggleClass("active");
});

//TABLE REFERENCE
var empRef = firebase.database().ref("tasks");
var new_html = "";
window.onload = function () {
  initApp();
  displayEmpData();
};
//BUTTONS OR ACTIONS
function initApp() {
  document
    .getElementById("add_emp")
    .addEventListener("click", addNewEmp, false);
}

// INSERT DATA
function addNewEmp() {
  var name = document.getElementById("name").value;
  var description = document.getElementById("description").value;
  var status = document.getElementById("status").value;
  var userId = uid;

  var timeStamp = new Date().getTime();
  var empID = "EMP_" + timeStamp;

  empRef.child(empID).set({
    name: name,
    description: description,
    status: status,
    userId: userId,
  });

  $("#name").val("");
  $("#description").val("");
  $("#status").val("");
}

//Display Data

function displayEmpData() {
  empRef.on("child_added", function (empData) {
    console.log(empData.val());

    new_html += '<tr id="' + empData.val().emp_id + '">';
    new_html +=
      '<td id="name_' +
      empData.val().emp_id +
      '">' +
      empData.val().name +
      "</td>";
    new_html +=
      '<td id="description_' +
      empData.val().emp_id +
      '">' +
      empData.val().description +
      "</td>";
    new_html +=
      '<td id="status_' +
      empData.val().emp_id +
      '">' +
      empData.val().status +
      "</td>";

    new_html +=
      '<td><a  class="edit" data-toggle="modal"><i class="material-icons editEmp"';
    new_html +=
      'data-toggle="tooltip" data-emp-id="' +
      empData.val().emp_id +
      '" title="Edit">&#xE254;</i></a>';
    new_html +=
      '<a class="" data-toggle="modal"><i class="material-icons delete"';
    new_html +=
      'data-toggle="tooltip"  data-emp-id="' +
      empData.val().emp_id +
      '" title="Delete">&#xE872;</i></a>';
    new_html += "</td>";
    new_html += "</tr>";

    $("#emp-table").html(new_html);
  });
}

$(document).on("click", ".delete", function () {
  var emp_id = $(this).attr("data-emp-id");

  empRef.child(emp_id).once("value", function (emp) {
    var modal_header = "";

    modal_header +=
      '<h4 class="modal-title">Delete ' + emp.val().name + "</h4>";
    modal_header +=
      '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';

    var modal_body = "";
    modal_body += "<p>Are you sure you want to delete these Records?</p>";
    modal_body +=
      '<p class="text-warning"><small>This action cannot be undone.</small></p>';
    var modal_footer = "";
    modal_footer +=
      '<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">';
    modal_footer +=
      '<input type="submit" data-dismiss="modal" data-emp-id="' +
      emp_id +
      '" class="btn btn-danger deleteEmpData" value="Delete">';
    $("#deleteEmployeeModal").find(".modal-header").html(modal_header);
    $("#deleteEmployeeModal").find(".modal-body").html(modal_body);
    $("#deleteEmployeeModal").find(".modal-footer").html(modal_footer);
    $("#deleteEmployeeModal").modal();
  });
});

$(document).on("click", ".editEmp", function () {
  var emp_id = $(this).attr("data-emp-id");

  empRef.child(emp_id).once("value", function (emp) {
    var modal_header = "";

    modal_header += '<h4 class="modal-title">Add ' + emp.val().name + "</h4>";
    modal_header +=
      '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';

    var modal_body = "";

    modal_body += '<div class="form-group">';
    modal_body += "<label>Name</label>";
    modal_body +=
      '<input id="edit-name" type="text" value="' +
      emp.val().name +
      '" class="form-control" required>';
    modal_body += "</div>";

    modal_body += '<div class="form-group">';
    modal_body += "<label>Description</label>";
    modal_body +=
      '<input type="text" id="edit-description" value="' +
      emp.val().description +
      '" class="form-control" required>';
    modal_body += "</div>";

    modal_body += '<div class="form-group">';
    modal_body += "<label>Status</label>";
    modal_body +=
      '<input type="text" id="edit-status" value="' +
      emp.val().status +
      '" class="form-control" required>';
    modal_body += "</div>";

    var modal_footer = "";
    modal_footer +=
      '<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">';
    modal_footer +=
      '<input type="submit" data-dismiss="modal" data-emp-id="' +
      emp_id +
      '"  class="btn btn-danger updateEmpData" value="Save">';
    $("#editEmployeeModal").find(".modal-header").html(modal_header);
    $("#editEmployeeModal").find(".modal-body").html(modal_body);
    $("#editEmployeeModal").find(".modal-footer").html(modal_footer);
    $("#editEmployeeModal").modal();
  });
});

$(document).on("click", ".deleteEmpData", function () {
  var emp_id = $(this).attr("data-emp-id");

  empRef.child(emp_id).remove();

  $("#" + emp_id).remove();
});

$(document).on("click", ".updateEmpData", function () {
  var emp_id = $(this).attr("data-emp-id");

  var name = document.getElementById("edit-name").value;
  var description = document.getElementById("edit-description").value;
  var status = document.getElementById("edit-status").value;

  empRef.child(emp_id).update({
    name: name,
    description: description,
    status: status,
  });

  $("#name_" + emp_id).html(name);
  $("#description_" + emp_id).html(description);
  $("#status_" + emp_id).html(status);
});

$(document).on("click", ".dltAllData", function () {
  var emp_id = $(this).attr("data-emp-id");

  empRef.remove();

  $("#emp-table").remove();
});
