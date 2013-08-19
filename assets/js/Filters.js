angular.module('gradingFilters', [])
.filter('highlightLowScore',
  function() {
    return function(student) {
      var score = Number(student.score);
      if (isNaN(score)) {
        return "";
      }
      return score < 65 ? "low-score" : "";
    }
  })
.filter('scores',
  function() {
    return function(assignment) {
      if (!assignment && !assignment.students && !assignment.students.length) {
        return [];
      }
      var rv = [];
      var students = assignment.students;
      for (var i = 0, n = students.length; i < n; i++) {
        var v = Number(students[i].score);
        if (!isNaN(v)) {
          rv.push(v);
        }
      }
      return rv;
    }
  })
.filter('scorePercent',
  function() {
    return function(student, assignment) {
      if (isNaN(Number(assignment.max))) {
        return "";
      }
      if (isNaN(Number(student.score))) {
        return "";
      }

      return student.score / assignment.max;
    }
  })
.filter('number',
  function() {
    return function(val) {
      val = Number(val)
      if (isNaN(val)) {
        return "";
      }
      return numeral(val).format("0.00");
    }
  })
.filter('pct',
  function() {
    return function(val) {
      val = Number(val)
      if (isNaN(val)) {
        return "";
      }
      return numeral(val).format("0.00%");
    }
  })
.filter('mean',
  function() {
    return function(scores) {
      return jsStats.mean(scores);
    }
  })
.filter('median',
  function() {
    return function(scores) {
      return jsStats.median(scores);
    }
  })
.filter('mode',
  function() {
    return function(scores) {
      return jsStats.mode(scores);
    }
  })
.filter('min',
  function() {
    return function(scores) {
      return jsStats.min(scores);
    }
  })
.filter('max',
  function() {
    return function(scores) {
      return jsStats.max(scores);
    }
  })
.filter('variance',
  function() {
    return function(scores) {
      return jsStats.variance(scores);
    }
  })
.filter('variance',
  function() {
    return function(scores) {
      console.log(scores);
      return jsStats.variance(scores);
    }
  })
.filter('standardDeviation',
  function() {
    return function(scores) {
      console.log(scores);
      return jsStats.standardDeviation(scores);
    }
  });






