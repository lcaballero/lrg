angular.module('gradingFilters', []).filter('averageScore',
  function() {
    return function(students) {
      var total = 0;
      var counted = 0;

      for (var id in students) {

        var score = Number(students[id].score);

        if (!isNaN(score)) {
          total += score;
          counted++;
        }
      }

      return total / counted;
    }
  })
.filter('highlightLowScore',
  function() {
    return function(student) {
      return student.score < 65 ? "low-score" : "";
    }
  })
.filter('percentScore',
  function() {
    return function(assignment, student) {
      if (isNaN(Number(assignment.max))) {
        return "";
      }
      if (isNaN(Number(student.score))) {
        return "";
      }

      return student.score / assignment.max;
    }
  });