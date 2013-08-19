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

    // $(document.window).bind(
    //     "keypress",
    //     function() {
    //       console.log("here");
    //     })

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
    };

    $scope.removeStudent = function( student ) {
      for (var i = 0, ii = students.length; i < ii; i++) {
        if (student.id === students[i].id) {
          students.splice(i, 1);
        }
      }
    };

    $scope.cssRefresh = function(){
      var a=document.getElementsByTagName('link');
      var z=/stylesheet/i;var x=/[?&]cssrefresh=\d+/;
      var y=/cssrefresh=\d+/;
      var w=/[?]/;var n=(new Date().valueOf());
      for(var i=0;i<a.length;i++){
        var s=a[i];
        if(!s.href||!z.test(s.rel)){
          continue;
        }
        s.href=x.test(s.href)
          ? s.href.replace(y,"cssrefresh="+n)
          : (w.test(s.href)?s.href+"&cssrefresh="+n:s.href+"?cssrefresh="+n);
      }
    };

  }]);
