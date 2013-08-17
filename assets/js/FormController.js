angular
  .module('App', ['gradingFilters']);

function FormController($scope) {
  var ids = 0;
  var persist = new Persist.Store("grades")
  
  var scoring = $scope.scoring = {
    max:100,
    extra:0,
    assignment:"Homework 1"
  };

  function newId() {
    return "id-" + (String(++ids));
  };

  function createInitialStudents() {
    var id = newId();
    var students = {};
    students[id] = {
      id: newId(),
      name: 'John Smith',
      score: 98
    };
    return students;
  };

  var students = $scope.students = createInitialStudents();

  $scope.addStudent = function() {
   var newStudent = {
      id:newId(),
      name:"New Student",
      score:0
    };
    students[newStudent.id] = newStudent;
  };

  $scope.removeStudent = function(id) {
    delete $scope.students[id]
  };
};
