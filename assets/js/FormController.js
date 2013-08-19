angular.module('App', ['gradingFilters', 'ngStorage'])
.config(
  function($locationProvider) {
    $locationProvider.html5Mode(true);
  })
.controller('FormController', [
  '$scope', '$location', '$localStorage',
  /**
   * Begin Controller
   */
  function($scope, $location, $localStorage) {
    var DEFAULT_LOCAL_STORE_KEY = 'assignments';
    var DEFAULT_ASSIGNMENT_NAME = "Homework 1";
    var DEFAULT_MAX_SCORE = 100;
    var DEFAULT_EXTRA_CREDIT = 0;
    var DEFAULT_INITIAL_ID = 1;  // 0 is falsy -- don't use that.

    var ids = DEFAULT_INITIAL_ID;
    var defaults = {
      students: [{
        id: newId(DEFAULT_INITIAL_ID),
        name: 'John Smith',
        score: "98"
      }],
      max: 100,
      extra: 0,
      lastId: DEFAULT_INITIAL_ID,
      name: DEFAULT_ASSIGNMENT_NAME
    };

    $scope.$storage = $localStorage.$default(defaults);
    $scope.clonedStudents = cloneStudents();

    // TODO: make this into a service/filter
    var search = $location.search()
    var debug = search["..debug.."]
    $scope.debug = !!({"1":1, "on":1, "true":1, "y":1, "yes":1}[debug]);
    
    function newId( initial ) {
      var id = initial || (++$scope.$storage.lastId);
      return "id-" + (String(id));
    };

    $scope.addStudent = function() {
      $scope.$storage.students.push({
        id:newId(),
        name:"New Student",
        score:"0"
      });
      $scope.clonedStudents = cloneStudents();
    };

    $scope.removeStudent = function( student ) {
      var students = $scope.$storage.students;
 
      for (var i = 0, ii = students.length; i < ii; i++) {
        if (student.id === students[i].id) {
          students.splice(i, 1);
          break;
        }
      }
      $scope.clonedStudents = cloneStudents(students);
    };

    function cloneStudents(students) {
      var clone = [];
      students = students || $scope.$storage.students;

      for (var i = 0, n = students.length; i < n; i++) {
        clone.push({
          id: students[i].id,
          name: students[i].name || "New Student",
          score: students[i].score
        })
      }
      return clone;
    };

    $scope.blurStudent = function() {
      console.log("blur student");
      console.log($scope.clonedStudents);
      $scope.$storage.students = cloneStudents($scope.clonedStudents);
    }

  }]);
