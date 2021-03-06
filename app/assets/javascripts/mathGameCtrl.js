angular.module('appCtrl')

  .controller('mathGameCtrl', ['$scope', '$location', 'mathGameSvc', function($scope, $location, mathGameSvc) {

    $scope.finalScore = mathGameSvc.finalScore
    $scope.hello = mathGameSvc.hello;
    $scope.score = 0;
    $scope.index = 0;

    mathGameSvc.loadData().success(function(data) {

      $scope.data = data;
      $scope.questions = $scope.data.question
      $scope.user = $scope.data.user

      $scope.currentQuestion = $scope.questions[$scope.index];

      $scope.getPercentage = function () {
        return ($scope.score * 10);

        }

      $scope.getPercentWrong = function () {
        return (($scope.index - $scope.score) * 10);

        }

      $scope.nextQuestion = function(answer) {

        if (answer === $scope.currentQuestion.answer) {

          $scope.score += 1;

        } else if (answer !== $scope.currentQuestion.answer) {

        }

        $scope.index += 1;

        if ($scope.index === ($scope.questions.length)) {

            $scope.user.total_score += $scope.score
            if ($scope.user.high_score < $scope.score) {
              $scope.user.high_score = $scope.score
            }
            
            mathGameSvc.getFinalScore($scope.score);
            mathGameSvc.updateScore($scope.user);

            $location.path('/gameover');

        } else {

          $scope.currentQuestion = $scope.questions[$scope.index];
          $scope.answer = {};

        }

      };

    });

  }])
