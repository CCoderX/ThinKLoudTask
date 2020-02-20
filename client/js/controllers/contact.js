// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('contactController', ['$scope', '$state', 'contact', function($scope,
      $state, contact) {
    $scope.contacts = [];
    function getcontacts() {
      contact
        .find()
        .$promise
        .then(function(results) {
          $scope.contacts = results;
        });
    }
    getcontacts();

    $scope.addcontact = function() {
      contact
        .create($scope.newcontact)
        .$promise
        .then(function(contact) {
          $scope.newcontact = '';
          $scope.contactForm.content.$setPristine();
          $('.focus').focus();
          getcontacts();
        });
    };

    $scope.removecontact = function(item) {
      contact
        .deleteById(item)
        .$promise
        .then(function() {
          getcontacts();
        });
    };
    
    $scope.editcontact = function(item) {
      contact
        .upsert(item)
        .$promise
        .then(function() {
          getcontacts();
        });
    };
  
    $scope.searchcontact = function(item) {
      contact
        .findOne({Name : item.Name
        })
        .$promise
        .then(function(results) {
          $scope.contacts = results;
        });
    };
    
  }]);
