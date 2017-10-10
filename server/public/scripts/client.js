console.log('js sourced');
$(document).ready(readyNow);
//perams for new employee object
var Employee = function(firstName, lastName, idNumber, jobTitle, annualSalary) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.idNumber = idNumber;
  this.jobTitle = jobTitle;
  this.annualSalary = annualSalary;
  this.monthlySalary = parseFloat((annualSalary / 12).toFixed(2), 10);
};

var employee = [];

function readyNow(){
  //Can press "return" to submit
  $('.submit').on('click', function(event) {
      event.preventDefault();
      var firstName = $('input[name=firstName]').val();
      var lastName = $('input[name=lastName]').val();
      var idNumber = $('input[name=idNumber]').val();
      var jobTitle = $('input[name=jobTitle]').val();
      var annualSalary = parseInt($('input[name=annualSalary]').val(), 10);
      var allFieldAreSet = firstName && lastName && idNumber && jobTitle && annualSalary;
      if (allFieldAreSet) {
        employee.push(new Employee(firstName, lastName, idNumber, jobTitle, annualSalary));

        // clears the form
        $('input').val('');

        renderRows();
        }

});

  //to delete the employee from list
$('table').on('click', 'button', function () {
      var index = $(this).parents('tr').data('index');
      console.log(index);
      employee.splice(index, 1);
      renderRows();
});

}//End of readyNow

function renderRows() {
  var rows = '';
  var totalMontlySalary = 0;
  var totalYearlySalary = 0;
  for (var i = 0; i < employee.length; i++) {
    // calculate total of all employee
    totalMontlySalary += employee[i].monthlySalary;
    totalYearlySalary += employee[i].annualSalary;

    //for each employee, this creates a table row/record
    rows +='<tr data-index="'+ i +'"><td>' + employee[i].firstName + '</td><td>' + employee[i].lastName + '</td><td>' + employee[i].idNumber + '</td><td>' + employee[i].jobTitle + '</td><td>$' + employee[i].annualSalary + '</td><td>$'+ employee[i].monthlySalary +'</td><td><button class="btn btn-danger">X</button></td></tr>';
  }

  //Results of totalYearlySalary and totalMontlySalary
  rows += '<tr><td colspan="4">Total:</td><td>$' + totalYearlySalary +'</td><td>$' + totalMontlySalary + '</td><td></td>/tr>';


  $('#tableBody').html(rows);
}
