'use strict';
/* globals moment: true */
/* globals $: true */

(function () {

  angular.module('qm-angular-formly-templates-ionic-card', ['formly', 'qm-angular-formly-templates-ionic-card-templates'], ["formlyConfigProvider", function (formlyConfigProvider) {
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
      controller: /* @ngInject */["$scope", function controller($scope) {
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

        function checkValidity(expressionValue) {
          var valid;
          if ($scope.to.required) {
            valid = angular.isArray($scope.model[opts.key]) && $scope.model[opts.key].length > 0 && expressionValue;

            $scope.fc.$setValidity('required', valid);
          }
        }

        function setModel() {
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
      }]
    });
    //input
    types.push({
      name: 'input',
      templateUrl: 'input.html',
      wrapper: 'card'
    });
    types.push({
      name: 'number',
      templateUrl: 'number.html',
      wrapper: 'card'
    });
    //textarea
    types.push({
      name: 'textarea',
      templateUrl: 'textarea.html',
      wrapper: 'card'
    });
    //select
    types.push({
      name: 'select',
      templateUrl: 'select.html',
      wrapper: 'card'
    });
    //radio
    types.push({
      name: 'radio',
      templateUrl: 'radio.html',
      wrapper: 'card',
      defaultOptions: {
        noFormControl: false
      },
      controller: /* @ngInject */["$scope", function controller($scope) {

        var change = function change() {
          $scope.fc.$setDirty();
          $scope.fc.$setTouched();
        };

        $scope.radio = {
          change: change
        };
      }]
    });

    //datum
    types.push({
      name: 'datum',
      templateUrl: 'datum.html',
      wrapper: 'card',
      defaultOptions: {
        noFormControl: false
      },
      controller: /* @ngInject */["$scope", function controller($scope) {
        var opts = $scope.options;
        var datePickerCallback = function datePickerCallback(val) {
          $scope.fc.$setDirty();
          $scope.fc.$setTouched();
          if (typeof val === 'undefined') {
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
          callback: function callback(val) {
            //Mandatory
            datePickerCallback(val);
          }
        };

        function checkValidity() {
          var valid;
          if ($scope.to.required) {
            valid = $scope.datepickerObject.inputDate instanceof Date;
            console.log(valid);
            $scope.fc.$setValidity('required', valid);
          }
        }
      }]
    });
    //time
    types.push({
      name: 'time',
      templateUrl: 'time.html',
      wrapper: 'card',
      defaultOptions: {
        noFormControl: false
      },
      controller: /* @ngInject */["$scope", function controller($scope) {
        var opts = $scope.options;
        var timePickerCallback = function timePickerCallback(val) {
          $scope.fc.$setDirty();
          $scope.fc.$setTouched();
          if (typeof val === 'undefined') {
            delete $scope.model[opts.key];
            $scope.timePickerObject.inputEpochTime = undefined;
          } else {
            $scope.timePickerObject.inputEpochTime = val;
            var hours = parseInt(val / 3600);
            var minutes = val / 60 % 60;
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
          initTime = hour * 60 * 60 + parseInt(min) * 60;
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
          callback: function callback(val) {
            //Mandatory
            timePickerCallback(val);
          }
        };

        function checkValidity() {
          var valid;
          if ($scope.to.required) {
            valid = $scope.timePickerObject.inputEpochTime !== 'undefined';
            $scope.fc.$setValidity('required', valid);
          }
        }
      }]
    });
    //datumtime
    types.push({
      name: 'datumtime',
      templateUrl: 'datumtime.html',
      wrapper: 'card',
      defaultOptions: {
        noFormControl: false
      },
      controller: /* @ngInject */["$scope", function controller($scope) {
        var opts = $scope.options;

        var setModel = function setModel() {
          if ($scope.datepickerObject.inputDate instanceof Date && $scope.timePickerObject.inputEpochTime) {
            var hours = parseInt($scope.timePickerObject.inputEpochTime / 3600);
            var minutes = $scope.timePickerObject.inputEpochTime / 60 % 60;

            var m = moment($scope.datepickerObject.inputDate);
            m.hour(hours);
            m.minute(minutes);
            $scope.model[opts.key] = m.format('YYYY-MM-DD HH:mm');
          } else {
            delete $scope.model[opts.key];
          }
        };
        var datePickerCallback = function datePickerCallback(val) {
          $scope.fc.$setDirty();
          $scope.fc.$setTouched();
          if (typeof val === 'undefined') {
            delete $scope.model[opts.key];
            $scope.datepickerObject.inputDate = false;
          } else {
            $scope.datepickerObject.inputDate = val;
            setModel();
          }
          checkValidity();
        };
        var timePickerCallback = function timePickerCallback(val) {
          $scope.fc.$setDirty();
          $scope.fc.$setTouched();
          if (typeof val === 'undefined') {
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
          initTime = hour * 60 * 60 + parseInt(min) * 60;
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
          callback: function callback(val) {
            //Mandatory
            timePickerCallback(val);
          }
        };

        function checkValidity() {
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
          callback: function callback(val) {
            //Mandatory
            datePickerCallback(val);
          }
        };
      }]
    });
    //input image and resize
    types.push({
      name: 'image',
      templateUrl: 'image.html',
      wrapper: 'card',
      controller: /* @ngInject */["$scope", function controller($scope) {
        var opts = $scope.options;
        $scope.resizedSrc = '';
        //event listener for file input
        $('body').on('change', '#' + $scope.options.key, function (evt) {

          var target = evt.dataTransfer || evt.target;
          var file = target && target.files && target.files[0];
          var options = { canvas: true, maxWidth: 1024 };
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

        function checkValidity() {
          var valid;

          if ($scope.to.required) {
            valid = angular.isDefined($scope.model[opts.key]) && $scope.model[opts.key].length > 0;
            $scope.fc.$setValidity('required', valid);
          }
        }
      }]
    });
    //Freehand
    types.push({
      name: 'freehand',
      templateUrl: 'freehand.html',
      wrapper: 'card',
      controller: /* @ngInject */["$scope", function controller($scope) {
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
      }]
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
      controller: /* @ngInject */["$scope", function controller($scope) {
        var opts = $scope.options;

        var checkValidity = function checkValidity() {
          var valid;
          $scope.fc.$setDirty();
          $scope.fc.$setTouched();
          if ($scope.to.required) {
            valid = $scope.model[opts.key] ? true : false;
            $scope.fc.$setValidity('required', valid);
          }
        };

        var captureSuccess = function captureSuccess(mediaFiles) {
          var i, path, len;
          for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            $scope.model[opts.key] = mediaFiles[i];
            console.log(mediaFiles[i], $scope.model);
            var v = "<video controls='controls'>";
            v += "<source src='" + $scope.model[opts.key].fullPath + " '" + $scope.model[opts.key].type + "'>";
            v += "</video>";
            document.querySelector("#" + opts.key).innerHTML = v;

            checkValidity(true);
            $scope.$apply();
          }
        };
        // capture error callback
        var captureError = function captureError(error) {
          navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
          $scope.model[opts.key] = null;
          checkValidity();
        };
        $scope.start = function () {
          navigator.device.capture.captureVideo(captureSuccess, captureError, { limit: 1, duration: parseInt(opts.templateOptions.videolength) });
        };
      }]
    });

    formlyConfigProvider.setType(types);
  }]);
})();
'use strict';

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('card.html', '<div class="card">\n' + '    <label class="item item-divider" for="{{model[options.key]}}"  ng-if="options.templateOptions.label" >\n' + '        {{options.templateOptions.label}}\n' + '    </label>\n' + '    <div class="item item-text-wrap card-body">\n' + '        <div class="card-description" ng-if="options.templateOptions.description" ng-bind-html="options.templateOptions.description"></div>\n' + '        <formly-transclude></formly-transclude>\n' + '        <div class="validation" ng-if="options.validation.errorExistsAndShouldBeVisible" ng-messages="options.formControl.$error">\n' + '           <div ng-messages-include="validation.html"></div> \n' + '           <div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">\n' + '            {{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}   \n' + '           </div>\n' + '        </div>\n' + '    </div>\n' + '\n' + '</div>\n' + '<script type="text/ng-template" id="validation.html">\n' + '      <div ng-message="required">This field is required!</div>\n' + '      <div ng-message="minlength">Too short!</div>\n' + '      <div ng-message="maxlength">Too long!</div>\n' + '      <div ng-message="email">Invalid email address!</div>\n' + '    </script>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('datum.html', ' \n' + '<ionic-datepicker ng-model="model[options.key]" input-obj="datepickerObject" id="model[options.key]">\n' + '    <button class="button button-light" type="button">\n' + '        <i class="ion ion-android-calendar"></i>\n' + '        <span ng-show="datepickerObject.inputDate"> {{datepickerObject.inputDate| date:\'MM/dd/yyyy\'}} </span>\n' + '        <span ng-hide="datepickerObject.inputDate">\n' + '            Select a date \n' + '        </span>\n' + '    </button>\n' + '</ionic-datepicker>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('datumtime.html', '\n' + '<div  ng-model="model[options.key]"  id="model[options.key]" class="datumtime">\n' + '    <ionic-datepicker input-obj="datepickerObject">\n' + '        <button class="button button-light" type="button">\n' + '            <i class="ion ion-android-calendar"></i>\n' + '            <span ng-show="datepickerObject.inputDate"> {{datepickerObject.inputDate| date:\'MM/dd/yyyy\'}} </span>\n' + '            <span ng-hide="datepickerObject.inputDate">\n' + '                Select a Date\n' + '            </span>\n' + '        </button>\n' + '    </ionic-datepicker>\n' + '    \n' + '    <ionic-timepicker   input-obj="timePickerObject" >\n' + '      <button class="button button-light" type="button">\n' + '        <i class="ion ion-clock"></i>\n' + '        <standard-time-meridian  ng-show="timePickerObject.inputEpochTime" etime=\'timePickerObject.inputEpochTime\'></standard-time-meridian>\n' + '        <span ng-hide="timePickerObject.inputEpochTime">\n' + '                Select a Time\n' + '            </span>\n' + '      </button>\n' + '    </ionic-timepicker>\n' + '</div>\n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('freehand.html', '<signature-pad ng-model="model[options.key]" ng-change="checkValidity()" ></signature-pad>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('image.html', '<button class="button  button-block button-light" ng-click="openFileDlg()" type="button">\n' + '    <i class="ion ion-ios-camera"></i> Take a Photo\n' + '</button>\n' + '<input type="file" id="{{options.key}}"  accept="image/*" style="display:none" capture="camera">\n' + '<input type="hidden"  ng-model="model[options.key]"/>\n' + '<div class="item item-image">\n' + '<img  ng-src="{{resizedSrc}}" ng-show="resizedSrc" class="full-image" id="{{options.key}}Resized" />\n' + '</div>\n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('input.html', ' \n' + '    <input ng-model="model[options.key]" placeholder="{{options.templateOptions.placeholder}}"\n' + '           type="{{options.templateOptions.type}}" id="{{model[options.key]}}">\n' + ' \n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('multiCheckbox.html', '<div class="radio-group">\n' + '    <div class="checkbox-list-wrapper">\n' + '        <ion-checkbox ng-repeat="(key, option) in to.options"  ng-model="multiCheckbox.checked[$index]"  ng-change="multiCheckbox.change()">{{option[to.labelProp || \'name\']}}</ion-checkbox>\n' + '    </div>   \n' + '</div>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('number.html', ' \n' + '    <input ng-model="model[options.key]" placeholder="{{options.templateOptions.placeholder}}"\n' + '           type="number"  id="{{model[options.key]}}" pattern="\\d*">\n' + ' \n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('radio.html', '<div class="radio-group">\n' + '    <div class="list">\n' + '        <ion-radio ng-repeat="(key, option) in to.options"  tabindex="0"  ng-model="model[options.key]" ng-change="radio.change()"  ng-value="option[to.valueProp || \'value\']">{{option[to.labelProp || \'name\']}}</ion-radio>\n' + '    </div>   \n' + '</div>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('range.html', '<div class="item range" ng-class="\'range-\' + options.templateOptions.rangeClass">\n' + '  <i class="icon" ng-if="options.templateOptions.minIcon" ng-class="options.templateOptions.minIcon"></i>\n' + '  {{options.templateOptions.min}}\n' + '  <input type="range" min="{{options.templateOptions.min}}" max="{{options.templateOptions.max}}" step="{{options.templateOptions.step}}" value="{{options.templateOptions.value}}" ng-model="model[options.key]">\n' + '  <i class="icon" ng-if="options.templateOptions.maxIcon" ng-class="options.templateOptions.maxIcon"></i>\n' + '  {{options.templateOptions.max}}\n' + '</div>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('rangeWrapper.html', '<div class="card rangeWrapper">\n' + '    <label class="item item-divider" for="{{model[options.key]}}"  ng-if="options.templateOptions.label" >\n' + '        {{options.templateOptions.label}}<span class="badge badge-positive">{{model[options.key]?model[options.key]:\'-\'}}</span>\n' + '    </label>\n' + '    <div class="item item-text-wrap card-body">\n' + '        <div class="card-description" ng-if="options.templateOptions.description" ng-bind-html="options.templateOptions.description"></div>\n' + '        <formly-transclude></formly-transclude>\n' + '        <div class="validation" ng-if="options.validation.errorExistsAndShouldBeVisible" ng-messages="options.formControl.$error">\n' + '           <div ng-messages-include="validation.html"></div> \n' + '           <div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">\n' + '            {{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}   \n' + '           </div>\n' + '        </div>\n' + '    </div>\n' + '\n' + '</div>\n' + '<script type="text/ng-template" id="validation.html">\n' + '      <div ng-message="required">This field is required!</div>\n' + '      <div ng-message="minlength">Too short!</div>\n' + '      <div ng-message="maxlength">Too long!</div>\n' + '      <div ng-message="email">Invalid email address!</div>\n' + '    </script>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('select.html', '<select ng-model="model[options.key]" \n' + '          ng-options="option[to.valueProp || \'value\'] as option[to.labelProp || \'name\'] group by option[to.groupProp || \'group\'] for option in to.options">\n' + '  </select>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('textarea.html', ' \n' + '    <textarea ng-model="model[options.key]" placeholder="{{options.templateOptions.placeholder}}"\n' + '           type="{{options.templateOptions.type}}" id="{{model[options.key]}}"></textarea>\n' + ' \n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('time.html', '<ionic-timepicker  ng-model="model[options.key]"  input-obj="timePickerObject" id="model[options.key]">\n' + '  <button class="button button-light" type="button">\n' + '    <i class="ion ion-clock"></i>\n' + '    <standard-time-meridian ng-show="timePickerObject.inputEpochTime" etime=\'timePickerObject.inputEpochTime\'></standard-time-meridian>\n' + '    <span ng-hide="timePickerObject.inputEpochTime">\n' + '             Select a Time\n' + '        </span>\n' + '  </button>\n' + '</ionic-timepicker>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('toggle.html', '<ion-toggle ng-model="model[options.key]" toggle-class="toggle-{{options.templateOptions.toggleClass}}">\n' + '   <span ng-bind-html="options.templateOptions.accept"></span>\n' + '</ion-toggle>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('video.html', '\n' + '<div class="videoArea" id="{{options.key}}"></div>\n' + '<input type="hidden"  ng-model="model[options.key]"/>\n' + '<button ng-click="start()" class="button button-block button-assertive icon-left ion-record" type="button">\n' + '    Start recording\n' + '</button>');
  }]);
})();