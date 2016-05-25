'use strict';
/* globals moment: true */
/* globals $: true */
(function () {


  angular.module('qm-angular-formly-templates-ionic-card', ['formly', 'qm-angular-formly-templates-ionic-card-templates'], function (formlyConfigProvider) {
    formlyConfigProvider.setWrapper({
      name: 'card',
      templateUrl: 'card.html'
    });

    formlyConfigProvider.setWrapper({
      name: 'rangeWrapper',
      templateUrl: 'rangeWrapper.html'
    });

    var types = [];
    /**
     * Multicheckbox
     */
    types.push({
      name: 'multiCheckbox',
      templateUrl: 'multiCheckbox.html',
      wrapper: 'card',
      defaultOptions: {
        noFormControl: false,
        ngModelAttrs: {
          required: {
            attribute: '',
            bound: ''
          }
        }
      },
      controller: /* @ngInject */ function ($scope) {
        var to = $scope.to;
        var opts = $scope.options;

        // initialize the checkboxes check property
        $scope.$watch('model', function (newModelValue) {
          var modelValue, valueProp;

          if (Object.keys(newModelValue).length) {
            modelValue = newModelValue[opts.key];

            $scope.$watch('to.options', function (newOptionsValues) {
              if (newOptionsValues && Array.isArray(newOptionsValues) && Array.isArray(modelValue)) {
                valueProp = to.valueProp || 'value';
                for (var index = 0; index < newOptionsValues.length; index++) {
                  $scope.multiCheckbox.checked[index] = modelValue.indexOf(newOptionsValues[index][valueProp]) !== -1;
                }
              }
            });
          }
        }, true);

        function checkValidity (expressionValue) {
          var valid;
          if ($scope.to.required) {
            valid = angular.isArray($scope.model[opts.key]) &&
                    $scope.model[opts.key].length > 0 &&
                    expressionValue;

            $scope.fc.$setValidity('required', valid);
          }
        }

        function setModel () {
          $scope.model[opts.key] = [];
          angular.forEach($scope.multiCheckbox.checked, function (checkbox, index) {
            if (checkbox) {
              $scope.model[opts.key].push(to.options[index][to.valueProp || 'value']);
            }
          });
          // Must make sure we mark as touched because only the last checkbox due to a bug in angular.
          $scope.fc.$setTouched();
          $scope.fc.$setDirty();
          $scope.fc.$modelValue = $scope.model[opts.key].join(',');
          checkValidity(true);
        }

        if (opts.expressionProperties && opts.expressionProperties['templateOptions.required']) {
          $scope.$watch(function () {
            return $scope.to.required;
          }, function (newValue) {
            checkValidity(newValue);
          });
        }

        if ($scope.to.required) {
          var unwatchFormControl = $scope.$watch('fc', function (newValue) {
            if (!newValue) {
              return;
            }
            checkValidity(true);
            unwatchFormControl();
          });
        }
        $scope.multiCheckbox = {
          checked: [],
          change: setModel
        };
      }
    });
    //input
    types.push({
      name: 'input',
      templateUrl: 'input.html',
      wrapper: 'card',
    });
    types.push({
      name: 'number',
      templateUrl: 'number.html',
      wrapper: 'card',
    });
    //textarea
    types.push({
      name: 'textarea',
      templateUrl: 'textarea.html',
      wrapper: 'card',
    });
    //select
    types.push({
      name: 'select',
      templateUrl: 'select.html',
      wrapper: 'card',
    });
    //radio
    types.push({
      name: 'radio',
      templateUrl: 'radio.html',
      wrapper: 'card',
      defaultOptions: {
        noFormControl: false
      },
      controller: /* @ngInject */ function ($scope) {

        var change = function () {
          $scope.fc.$setDirty();
          $scope.fc.$setTouched();
        };

        $scope.radio = {
          change: change
        };
      }
    });

    //datum
    types.push({
      name: 'datum',
      templateUrl: 'datum.html',
      wrapper: 'card',
      defaultOptions: {
        noFormControl: false
      },
      controller: /* @ngInject */ function ($scope) {
        var opts = $scope.options;
        var datePickerCallback = function (val) {
          $scope.fc.$setDirty();
          $scope.fc.$setTouched();
          if (typeof (val) === 'undefined') {
            delete $scope.model[opts.key];
            $scope.datepickerObject.inputDate = false;

          } else {
            $scope.datepickerObject.inputDate = val;
            var datum = new moment(val);
            $scope.model[opts.key] = datum.format('YYYY-MM-DD');

          }
          checkValidity();
        };
        var initDate = false;
        if ($scope.model[opts.key]) {
          initDate = moment($scope.model[opts.key], 'YYYY-MM-DD').toDate();
        }
        $scope.datepickerObject = {
          titleLabel: $scope.to.label, //Optional
          todayLabel: 'Today', //Optional
          closeLabel: 'Close', //Optional
          setLabel: 'Set', //Optional
          setButtonType: 'button-positive', //Optional
          todayButtonType: 'button-calm', //Optional
          closeButtonType: 'button-stable', //Optional
          inputDate: initDate, //Optional
          mondayFirst: true, //Optional
//                        disabledDates: disabledDates, //Optional
//                        weekDaysList: weekDaysList, //Optional
//                        monthList: monthList, //Optional
          templateType: 'modal', //Optional
          showTodayButton: 'true', //Optional
          modalHeaderColor: 'bar-stable', //Optional
          modalFooterColor: 'bar-stable', //Optional
          callback: function (val) {    //Mandatory
            datePickerCallback(val);
          }
        };

        function checkValidity () {
          var valid;
          if ($scope.to.required) {
            valid = $scope.datepickerObject.inputDate instanceof Date;
            console.log(valid);
            $scope.fc.$setValidity('required', valid);
          }
        }
      }
    });
//time
    types.push({
      name: 'time',
      templateUrl: 'time.html',
      wrapper: 'card',
      defaultOptions: {
        noFormControl: false
      },
      controller: /* @ngInject */ function ($scope) {
        var opts = $scope.options;
        var timePickerCallback = function (val) {
          $scope.fc.$setDirty();
          $scope.fc.$setTouched();
          if (typeof (val) === 'undefined') {
            delete $scope.model[opts.key];
            $scope.timePickerObject.inputEpochTime = undefined;
          } else {
            $scope.timePickerObject.inputEpochTime = val;
            var hours = parseInt(val / 3600);
            var minutes = (val / 60) % 60;
            if (String(hours).length < 2) {
              hours = '0' + hours;
            }
            if (String(minutes).length < 2) {
              minutes = '0' + minutes;
            }
            $scope.model[opts.key] = hours + ':' + minutes;

          }
          checkValidity();
        };
        var initTime = false;
        if ($scope.model[opts.key]) {
          var time = $scope.model[opts.key];
          var hour = time.substr(11, 2);
          var min = time.substr(14, 2);
          initTime = (hour * 60 * 60 + parseInt(min) * 60)
        }
        $scope.timePickerObject = {
          inputEpochTime: initTime, //Optional
          step: 1, //Optional
          format: 12, //Optional
          titleLabel: $scope.to.label, //Optional
          setLabel: 'Set', //Optional
          closeLabel: 'Close', //Optional
          setButtonType: 'button-positive', //Optional
          closeButtonType: 'button-stable', //Optional
          callback: function (val) {    //Mandatory
            timePickerCallback(val);
          }
        };

        function checkValidity () {
          var valid;
          if ($scope.to.required) {
            valid = $scope.timePickerObject.inputEpochTime !== 'undefined';
            $scope.fc.$setValidity('required', valid);
          }
        }
      }
    });
    //datumtime
    types.push({
      name: 'datumtime',
      templateUrl: 'datumtime.html',
      wrapper: 'card',
      defaultOptions: {
        noFormControl: false
      },
      controller: /* @ngInject */ function ($scope) {
        var opts = $scope.options;

        var setModel = function () {
          if ($scope.datepickerObject.inputDate instanceof Date && $scope.timePickerObject.inputEpochTime) {
            var hours = parseInt($scope.timePickerObject.inputEpochTime / 3600);
            var minutes = ($scope.timePickerObject.inputEpochTime / 60) % 60;

            var m = moment($scope.datepickerObject.inputDate);
            m.hour(hours);
            m.minute(minutes);
            $scope.model[opts.key] = m.format('YYYY-MM-DD HH:mm');
          } else {
            delete $scope.model[opts.key];
          }
        };
        var datePickerCallback = function (val) {
          $scope.fc.$setDirty();
          $scope.fc.$setTouched();
          if (typeof (val) === 'undefined') {
            delete $scope.model[opts.key];
            $scope.datepickerObject.inputDate = false;

          } else {
            $scope.datepickerObject.inputDate = val;
            setModel();
          }
          checkValidity();
        };
        var timePickerCallback = function (val) {
          $scope.fc.$setDirty();
          $scope.fc.$setTouched();
          if (typeof (val) === 'undefined') {
            delete $scope.model[opts.key];
            $scope.timePickerObject.inputEpochTime = undefined;
          } else {
            $scope.timePickerObject.inputEpochTime = val;
            setModel();

          }
          checkValidity();
        };
        var initDate = false;
        if ($scope.model[opts.key]) {
          initDate = moment($scope.model[opts.key], 'YYYY-MM-DD').toDate();
        }
        var initTime = false;
        if ($scope.model[opts.key]) {
          var time = $scope.model[opts.key];
          var hour = time.substr(11, 2);
          var min = time.substr(14, 2);
          initTime = (hour * 60 * 60 + parseInt(min) * 60)
        }
        $scope.timePickerObject = {
          inputEpochTime: initTime, //Optional
          step: 1, //Optional
          format: 12, //Optional
          titleLabel: $scope.to.label, //Optional
          setLabel: 'Set', //Optional
          closeLabel: 'Close', //Optional
          setButtonType: 'button-positive', //Optional
          closeButtonType: 'button-stable', //Optional
          callback: function (val) {    //Mandatory
            timePickerCallback(val);
          }
        };

        function checkValidity () {
          var valid;
          if ($scope.to.required) {
            valid = $scope.timePickerObject.inputEpochTime !== 'undefined';
            $scope.fc.$setValidity('required', valid);
          }
        }

        $scope.datepickerObject = {
          titleLabel: $scope.to.label, //Optional
          todayLabel: 'Today', //Optional
          closeLabel: 'Close', //Optional
          setLabel: 'Set', //Optional
          setButtonType: 'button-positive', //Optional
          todayButtonType: 'button-calm', //Optional
          closeButtonType: 'button-stable', //Optional
          inputDate: initDate, //Optional
          mondayFirst: true, //Optional
//                        disabledDates: disabledDates, //Optional
//                        weekDaysList: weekDaysList, //Optional
//                        monthList: monthList, //Optional
          templateType: 'modal', //Optional
          showTodayButton: 'true', //Optional
          modalHeaderColor: 'bar-stable', //Optional
          modalFooterColor: 'bar-stable', //Optional
          callback: function (val) {    //Mandatory
            datePickerCallback(val);
          }
        };
      }
    });
    //input image and resize
    types.push({
      name: 'image',
      templateUrl: 'image.html',
      wrapper: 'card',
      controller: /* @ngInject */ function ($scope) {
        var opts = $scope.options;
        $scope.resizedSrc = '';
        //event listener for file input
        $('body').on('change', '#' + $scope.options.key, function (evt) {

          var target = evt.dataTransfer || evt.target;
          var file = target && target.files && target.files[0];
          var options = {canvas: true, maxWidth: 1024};
          /*globals loadImage */
          loadImage.parseMetaData(file, function (data) {
            if (data.exif) {
              options.orientation = data.exif.get('Orientation');
            }
            loadImage(file, function (img) {

              $scope.$apply(function () {
                $scope.resizedSrc = img.toDataURL('image/jpeg', 0.8);
                $scope.model[opts.key] = img.toDataURL('image/jpeg', 0.8);
              });

              checkValidity();

            }, options);
          });

        });
        //event listener for click button
        $scope.openFileDlg = function () {
          $('#' + $scope.options.key).click();
          $scope.fc.$setDirty();
          $scope.fc.$setTouched();
        };


        function checkValidity () {
          var valid;

          if ($scope.to.required) {
            valid = angular.isDefined($scope.model[opts.key]) && $scope.model[opts.key].length > 0;
            $scope.fc.$setValidity('required', valid);
          }
        }
      }
    });
    //Freehand
    types.push({
      name: 'freehand',
      templateUrl: 'freehand.html',
      wrapper: 'card',
      controller: /* @ngInject */ function ($scope) {
        var opts = $scope.options;
        $scope.resizedSrc = '';

        $scope.checkValidity = function () {
          $scope.fc.$setDirty();
          $scope.fc.$setTouched();
          var valid;
          if ($scope.to.required) {
            valid = angular.isDefined($scope.model[opts.key]) && $scope.model[opts.key].length > 0;
            $scope.fc.$setValidity('required', valid);
          }
        };
      }
    });
    //range
    types.push({
      name: 'range',
      templateUrl: 'range.html',
      wrapper: 'rangeWrapper'
    });
//toggle
    types.push({
      name: 'toggle',
      templateUrl: 'toggle.html',
      wrapper: 'card'
    });

    types.push({
      name: 'video',
      templateUrl: 'video.html',
      wrapper: 'card',
      controller: /* @ngInject */ function ($scope) {
        var opts = $scope.options;

        var checkValidity = function () {
          var valid;
          $scope.fc.$setDirty();
          $scope.fc.$setTouched();
          if ($scope.to.required) {
            valid = $scope.model[opts.key] ? true : false;
            $scope.fc.$setValidity('required', valid);
          }
        };

        var captureSuccess = function (mediaFiles) {
          var i, path, len;
          for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            $scope.model[opts.key] = mediaFiles[i];
            console.log(mediaFiles[i], $scope.model);
            var v = "<video controls='controls'>";
            v += "<source src='" + $scope.model[opts.key].fullPath + "' >";
            v += "</video>";
            document.querySelector("#q" + opts.key).innerHTML = v;
            
            checkValidity(true);
            $scope.$apply();
          }
        };
// capture error callback
        var captureError = function (error) {
          navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
          $scope.model[opts.key] = null;
          checkValidity();
        };
        $scope.start = function () {
          navigator.device.capture.captureVideo(captureSuccess, captureError, {limit: 1, duration: parseInt(opts.templateOptions.videolength)});
        };

      }
    });
    
    formlyConfigProvider.setType(types);


  });
})();


