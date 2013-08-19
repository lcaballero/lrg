angular.module('App', ['gradingFilters', 'ngStorage'])
.directive("focusNewStudent",
  function($timeout) {
    return {
      link: function(scope, element, attr) {

        if (!scope.isAddingStudents) {
          return;
        }

        // unless this is the last student in the list aka. just added, or on
        // page load the last student in the list, then we can skip trying to
        // obtain focus for that student.
        if (!scope.student.isLast) {
          return;
        }

        $timeout(
          function() {
            if (scope.student.isLast) {
              element[0].focus();
            }        
          })
      }
    }
  })
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

    $scope.isAddingStudents = false;
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
      $scope.isAddingStudents = true;
      var newStudent = {
        id:newId(),
        name:"",
        score:"100"
      };
      $scope.$storage.students.push(newStudent);
      $scope.clonedStudents = cloneStudents($scope.$storage.students);
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
          name: students[i].name || "",
          score: students[i].score
        })
      }
      return clone;
    };

    $scope.saveOnBlur = function() {
      $scope.$storage.students = cloneStudents($scope.clonedStudents);
    };

    $scope.saveOnEnter = function( event ) {
      if (event.keyCode == 13) {
        $scope.$storage.students = cloneStudents($scope.clonedStudents);
      }
    }

  }]);
