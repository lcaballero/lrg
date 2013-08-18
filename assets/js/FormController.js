angular
  .module('App', ['gradingFilters']);

function FormController($scope) {
  var DEFAULT_LOCAL_STORE_KEY = 'assignments';
  var DEFAULT_ASSIGNMENT_NAME = "Homework 1";
  var DEFAULT_MAX_SCORE = 100;
  var DEFAULT_EXTRA_CREDIT = 0;
  var persist = null; // Lazily created with dataStore(key)

  var assignment = loadAssignments(
    DEFAULT_LOCAL_STORE_KEY, DEFAULT_ASSIGNMENT_NAME);

  console.log({
    persist:persist,
    assignment:assignment
  });

  var ids = 0;
  $scope.assignment = assignment;
  var students = $scope.assignment.students;
  var scoring = $scope.assignment.scoring;
  var uri = new Uri(location.href);
  var debug = uri.getQueryParamValue("..debug..");
  $scope.debug = !!({"1":1, "on":1, "true":1, "y":1, "yes":1}[debug]);

  function dataStore(key) {
    var key = key || DEFAULT_LOCAL_STORE_KEY;
    persist = persist || (new Persist.Store(key));
    return persist;
  };

  function loadAssignments(key, name) {
    var name = name || DEFAULT_ASSIGNMENT_NAME;
    var data = dataStore(key).get(name);

    // TODO: add ability to reset the data store.
    data = data || createDefaultAssignment(key, name);

    // TODO: change addScoresFn to a filter
    data = addScoresFn(data);

    return data;
  };

  function createDefaultAssignment(key, name) {
    var defaults = {
      students: createInitialStudents(),
      max:100,
      extra:0,
      name: DEFAULT_ASSIGNMENT_NAME
    };

    var json = angular.toJson(defaults);
    dataStore(key).set(name, json);
    var data = null;
    dataStore(key).get(name, function(ok, val) {
      if (ok) {
        data = angular.fromJson(val);
      } else {
        console.log(ok, val);
      }
    });
    console.log({ key:key, name:name, data:data, json:json, defaults:defaults });
    return data;
  };

  // TODO: change this to a filter.
  function addScoresFn( assignments ) {
      var scores = function() {
        var s = [];
        var students = this.students;
        for (var i = 0, n = students.length; i < n; i++) {
          var score = Number(students[i].score); 
          if (!isNaN(score)) {
            s.push(score);
          }
        }
        return s;
      };

      assignments.scores = scores;
      return assignments;
  };
  
  function newId() {
    return "id-" + (String(++ids));
  };

  function createInitialStudents() {
    return [{
      id: newId(),
      name: 'John Smith',
      score: "98"
    }];
  };

  $scope.addStudent = function() {
    students.push({
      id:newId(),
      name:"New Student",
      score:"0"
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
