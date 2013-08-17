angular
  .module('App', ['gradingFilters']);

function FormController($scope) {
  var ids = 0;

  var assignments = $scope.assignment = {
    students: createInitialStudents(),
    max:100,
    extra:0,
    name  :"Homework 1"
  };

  //var persist = new Persist.Store("grades")
  var students = $scope.assignment.students;
  var scoring = $scope.assignment.scoring;
  var uri = new Uri(location.href);

  var debug = uri.getQueryParamValue("..debug..");

  $scope.debug = (debug == "1" ||
    debug == "on" ||
    debug == "true" ||
    debug == "y" ||
    debug == "yes");
  
  function newId() {
    return "id-" + (String(++ids));
  };

  function createInitialStudents() {
    return [{
      id: newId(),
      name: 'John Smith',
      score: 98
    }];
  };

  $scope.addStudent = function() {
    students.push({
      id:newId(),
      name:"New Student",
      score:0
    });
  };

  $scope.percentScore = function( score ) {
    console.log("percentScore", score)
    if (isNaN(Number(score)) || isNaN(Number(assignments.max))) {
      return "";
    }

    var ratio = score / assignments.max;
    var pct = numeral(ratio).format("0.00%")

    return pct;
  }

  $scope.removeStudent = function( student ) {
    for (var i = 0, ii = students.length; i < ii; i++) {
      if (student.id === students[i].id) {
        students.splice(i, 1);
      }
    }
  };
};
