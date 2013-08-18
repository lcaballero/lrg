angular.module('gradingFilters', [])
.filter('highlightLowScore',
  function() {
    return function(student) {
      return student.score < 65 ? "low-score" : "";
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
    return function(assignment) {
      return jsStats.mean(assignment.scores());
    }
  })
.filter('median',
  function() {
    return function(assignment) {
      return jsStats.median(assignment.scores());
    }
  })
.filter('mode',
  function() {
    return function(assignment) {
      return jsStats.mode(assignment.scores());
    }
  })
.filter('min',
  function() {
    return function(assignment) {
      return jsStats.min(assignment.scores());
    }
  })
.filter('max',
  function() {
    return function(assignment) {
      return jsStats.min(assignment.scores());
    }
  })
.filter('variance',
  function() {
    return function(assignment) {
      return jsStats.variance(assignment.scores());
    }
  })
.filter('variance',
  function() {
    return function(assignment) {
      return jsStats.variance(assignment.scores());
    }
  })
.filter('standardDeviation',
  function() {
    return function(assignment) {
      return jsStats.standardDeviation(assignment.scores());
    }
  });
