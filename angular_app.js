/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var ang_app = angular.module('masterApp', []);
ang_app.controller('masterController', ['$scope','$http', function($scope,$http){
    $scope.app_name  = "From AnularJS- Master app  secttion";      
}]);

ang_app.controller('selectMultipleDataSplitController', ['$scope','$http', function($scope,$http){
    $scope.result = [];
    $scope.headers = [];
    $scope.headers_new = [];
    $scope.filename = "";
    $scope.file_ext = "";
    $scope.error = false;
    $scope.loading = false;
    
    $scope.selected_fields = [];
    $scope.fileSelect = function(files) {
       $scope.result = [];
       $scope.loading = true;
        var file = files[0];
        $scope.file_ext = ext = getExtensionFromFilename(file.name);
        //console.log(ext);
        if(ext=='csv'){
            Papa.parse(file, {
                header: true,
                worker: true,
                skipEmptyLines: true,
                complete: function(results) {
                      //console.log(results.data)
                      $scope.headers = results.meta.fields;
                      $scope.headers_new = results.meta.fields;;
                      $scope.result = results.data;
                      console.log($scope.result);
                      $scope.loading = false;
                      $scope.$apply();
                },
                error: function(){
                    alert("error");
                    $scope.error = false;
                    $scope.loading = false;
                    
                }
              });   
        }
        else{
            $scope.error = false;
            $scope.loading = false;
            
        }
        
    }
    
    
    
    $scope.final_array = [];
    $scope.generateCSV = function(){
        $scope.loading = true;
        generateNewHeader();
        $scope.final_array = [];
        var new_data = [];
        $scope.result.forEach(function(r){
            new_data = [];
            $scope.headers_new.forEach(function(h){
                if(typeof r[h] === 'undefined'){
                    var answer = h.slice((h.lastIndexOf("_") - 1 >>> 0) + 2);
                    var question = h.replace("_"+answer, '');
                    if(r[question].includes(answer)){
                        new_data[h] = 'TRUE';
                    }
                    else{
                        new_data[h] = 'FALSE';
                    }
                }
                else{
                    new_data[h] = r[h];
                }
                $scope.loading = true;
               
            })
            //console.log(new_data);
            $scope.final_array.push(new_data);
            $scope.loading = false;
        });
        //console.log($scope.final_array);
    }
    
    
    $scope.downloadCSV = function(){
        var csv = Papa.unparse(convertFinal($scope.final_array));
        console.log($scope.final_array);
        console.log(csv);
        var csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
        var csvURL =  null;
        if (navigator.msSaveBlob) {
            csvURL = navigator.msSaveBlob(csvData, 'download.csv');
        } else {
            csvURL = window.URL.createObjectURL(csvData);
        }
        var tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'download.csv');
        tempLink.click();
    }
    
    
    
    const convertFinal = function(arrOfArr) {
        return arrOfArr.map(function(arr) {
            var obj = {};
            for(var key in arr) {
                if(arr.hasOwnProperty(key)) {
                    obj[key] = arr[key];
                }
            }
            return obj;
        });
    }
    
    
    var generateNewHeader = function(){
        $scope.headers_new = [];
        $scope.headers.forEach(function(d) {
            $scope.headers_new.push(d);
         });
        $scope.selected_fields.forEach(function(column) {
            var uniques = getUniqueValuesOfselected(column);
            uniques.forEach(function(d){
                $scope.headers_new.push(column+"_"+d);
            });
        });
    }
    
    var getUniqueValuesOfselected = function(column){
        var partial_array = [];
        var unique_array = [];
        //console.log(column);
        $scope.result.forEach(function(data) {
            //console.log(data[column])
            values = data[column].split(" ");
            values.forEach(function(val){
                if(val!=" "&&val!=""){
                    partial_array.push(val);
                }
            })
        });
        
        //console.log(partial_array);
        unique_array = partial_array.filter(function(item, index){
                return partial_array.indexOf(item) >= index;
        });
        //console.log(unique_array);
        return unique_array;

    }
    
    $scope.toggleSelection = function toggleSelection(headerName) {
        var idx = $scope.selected_fields.indexOf(headerName);
        if (idx > -1) {
          $scope.selected_fields.splice(idx, 1);
        }
        else {
          $scope.selected_fields.push(headerName);
        }
      };
  
    var getExtensionFromFilename = function(filename) {
         return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    }
}]);





ang_app.directive('fileChange', function() {
    return {
     restrict: 'A',
     scope: {
       handler: '&'
     },
     link: function (scope, element) {
      element.on('change', function (event) {
        scope.$apply(function(){
          scope.handler({files: event.target.files});
        });
      });
     }
    };
});

