angular
  .module('App', ['gradingFilters']);

function FormController($scope) {
  var ids = 0;
  //var persist = new Persist.Store("grades")
  var students = $scope.students = createInitialStudents();

  var scoring = $scope.scoring = {
    max:100,
    extra:0,
    assignment:"Homework 1"
  };

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

  $scope.removeStudent = function( student ) {
    for (var i = 0, ii = students.length; i < ii; i++) {
      if (student.id === students[i].id) {
        $scope.students.splice(i, 1);
      }
    }
  };
};
