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
            controller: /* @ngInject */["$scope", "$timeout", function controller($scope, $timeout) {
                var opts = $scope.options;
                $scope.resizedSrc = '';
                //event listener for file input
                $('body').on('change', '#q' + $scope.options.key, function (evt) {

                    var target = evt.dataTransfer || evt.target;
                    var file = target && target.files && target.files[0];
                    var options = { canvas: true, maxWidth: 1024 };
                    /*globals loadImage */
                    loadImage.parseMetaData(file, function (data) {
                        if (data.exif) {
                            options.orientation = data.exif.get('Orientation');
                        }
                        loadImage(file, function (img) {

                            $timeout(function () {
                                $scope.resizedSrc = img.toDataURL('image/jpeg', 0.8);
                                $scope.model[opts.key] = img.toDataURL('image/jpeg', 0.8);
                            });

                            checkValidity();
                        }, options);
                    });
                });
                //event listener for click button
                $scope.openFileDlg = function () {
                    $scope.fc.$setDirty();
                    $scope.fc.$setTouched();
                    if (navigator.camera) {
                        debugger;
                        navigator.camera.getPicture(captureSuccess, captureError, {
                            quality: 30,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.CAMERA,

                            encodingType: Camera.EncodingType.JPEG,
                            popoverOptions: CameraPopoverOptions,
                            saveToPhotoAlbum: false,
                            correctOrientation: true

                        });
                    } else {
                        $('#q' + $scope.options.key).click();
                    }
                };

                var captureSuccess = function captureSuccess(imageData) {
                    $timeout(function () {
                        $scope.resizedSrc = "data:image/jpeg;base64," + imageData;
                        $scope.model[opts.key] = "data:image/jpeg;base64," + imageData;
                    });
                    checkValidity();
                };
                // capture error callback
                var captureError = function captureError(error) {
                    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
                    $scope.model[opts.key] = null;
                    checkValidity();
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
            controller: /* @ngInject */["$scope", "$timeout", function controller($scope, $timeout) {
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
                    $timeout(function () {
                        var i, path, len;
                        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                            $scope.model[opts.key] = mediaFiles[i];
                            console.log(mediaFiles[i], $scope.model);
                            var v = "<video controls='controls'>";
                            v += "<source src='" + $scope.model[opts.key].fullPath + "' >";
                            v += "</video>";
                            document.querySelector("#q" + opts.key).innerHTML = v;

                            checkValidity(true);
                        }
                    });
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

        types.push({
            name: 'audio',
            templateUrl: 'audio.html',
            wrapper: 'card',
            controller: /* @ngInject */["$scope", "$timeout", function controller($scope, $timeout) {
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
                    $timeout(function () {
                        var i, path, len;
                        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                            mediaFiles[i].type = 'audio/wav';
                            $scope.model[opts.key] = mediaFiles[i];

                            console.log(mediaFiles[i], $scope.model);
                            var v = "<audio controls='controls'>";
                            v += "<source src='" + $scope.model[opts.key].fullPath + "' >";
                            v += "</audio>";
                            document.querySelector("#q" + opts.key).innerHTML = v;

                            checkValidity(true);
                        }
                    });
                };
                // capture error callback
                var captureError = function captureError(error) {
                    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
                    $scope.model[opts.key] = null;
                    checkValidity();
                };
                $scope.start = function () {
                    navigator.device.capture.captureAudio(captureSuccess, captureError, { limit: 1, duration: parseInt(opts.templateOptions.audiolength) });
                };
            }]
        });

        types.push({
            name: 'stripe',
            templateUrl: 'stripe.html',
            wrapper: 'card',
            controller: /* @ngInject */["$scope", "$timeout", function controller($scope, $timeout) {
                var opts = $scope.options;

                var checkValidity = function checkValidity() {
                    var valid;
                    $scope.fc[0].$setDirty();
                    $scope.fc[0].$setTouched();
                    if ($scope.to.required) {
                        valid = $scope.model[opts.key] ? true : false;
                        $scope.fc[0].$setValidity('required', valid);
                    }
                };

                var stripeResponseHandler = function stripeResponseHandler(status, response) {
                    $timeout(function () {
                        if (response.error) {
                            $scope.stripeErrorMessage = response.error.message;

                            $scope.model[opts.key] = "";
                        } else {
                            $scope.stripeErrorMessage = "";
                            $scope.model[opts.key] = response.id;
                        }
                        checkValidity();
                    });
                };

                $scope.submitStripe = function () {
                    if (typeof $scope.cardNumber !== 'undefined' && typeof $scope.cvc !== 'undefined' && typeof $scope.expMonth !== 'undefined' && typeof $scope.expYear !== 'undefined' && typeof $scope.zip !== 'undefined' && $scope.zip.length > 3) {
                        Stripe.card.createToken({
                            number: $scope.cardNumber,
                            cvc: $scope.cvc,
                            exp_month: $scope.expMonth,
                            exp_year: $scope.expYear,
                            address_zip: $scope.zip
                        }, stripeResponseHandler);
                    }
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
    $templateCache.put('audio.html', '<div class="audioArea" id="q{{options.key}}"></div>\n' + '<input type="hidden"  ng-model="model[options.key]"/>\n' + '<button ng-click="start()" class="button button-block button-assertive icon-left ion-record" type="button">\n' + '    Start recording\n' + '</button>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('card.html', '<div class="card" id="card{{options.key}}">\n' + '    <label class="item item-divider" for="q{{options.key}}"  ng-if="options.templateOptions.label" >\n' + '        {{options.templateOptions.label}}\n' + '    </label>\n' + '    <div class="item item-text-wrap card-body">\n' + '        <div class="card-description" ng-if="options.templateOptions.description" ng-bind-html="options.templateOptions.description"></div>\n' + '        <formly-transclude></formly-transclude>\n' + '        <div class="validation" ng-if="options.validation.errorExistsAndShouldBeVisible" ng-messages="options.formControl.$error">\n' + '           <div ng-messages-include="validation.html"></div> \n' + '           <div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">\n' + '            {{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}   \n' + '           </div>\n' + '        </div>\n' + '    </div>\n' + '\n' + '</div>\n' + '<script type="text/ng-template" id="validation.html">\n' + '      <div ng-message="required">This field is required!</div>\n' + '      <div ng-message="minlength">Too short!</div>\n' + '      <div ng-message="maxlength">Too long!</div>\n' + '      <div ng-message="email">Invalid email address!</div>\n' + '    </script>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('datum.html', ' \n' + '<ionic-datepicker ng-model="model[options.key]" input-obj="datepickerObject" id="q{{options.key}}">\n' + '    <button class="button button-light" type="button">\n' + '        <i class="ion ion-android-calendar"></i>\n' + '        <span ng-show="datepickerObject.inputDate"> {{datepickerObject.inputDate| date:\'MM/dd/yyyy\'}} </span>\n' + '        <span ng-hide="datepickerObject.inputDate">\n' + '            Select a date \n' + '        </span>\n' + '    </button>\n' + '</ionic-datepicker>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('datumtime.html', '\n' + '<div  ng-model="model[options.key]"  id="q{{options.key}}" class="datumtime">\n' + '    <ionic-datepicker input-obj="datepickerObject">\n' + '        <button class="button button-light" type="button">\n' + '            <i class="ion ion-android-calendar"></i>\n' + '            <span ng-show="datepickerObject.inputDate"> {{datepickerObject.inputDate| date:\'MM/dd/yyyy\'}} </span>\n' + '            <span ng-hide="datepickerObject.inputDate">\n' + '                Select a Date\n' + '            </span>\n' + '        </button>\n' + '    </ionic-datepicker>\n' + '    \n' + '    <ionic-timepicker   input-obj="timePickerObject" >\n' + '      <button class="button button-light" type="button">\n' + '        <i class="ion ion-clock"></i>\n' + '        <standard-time-meridian  ng-show="timePickerObject.inputEpochTime" etime=\'timePickerObject.inputEpochTime\'></standard-time-meridian>\n' + '        <span ng-hide="timePickerObject.inputEpochTime">\n' + '                Select a Time\n' + '            </span>\n' + '      </button>\n' + '    </ionic-timepicker>\n' + '</div>\n' + '');
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
    $templateCache.put('image.html', '<button class="button  button-block button-light" ng-click="openFileDlg()" type="button">\n' + '    <i class="ion ion-ios-camera"></i> Take a Photo\n' + '</button>\n' + '<input type="file" id="q{{options.key}}"  accept="image/*" style="display:none" capture="camera">\n' + '<input type="hidden"  ng-model="model[options.key]"/>\n' + '<div class="item item-image">\n' + '<img  ng-src="{{resizedSrc}}" ng-show="resizedSrc" class="full-image" id="q{{options.key}}Resized" />\n' + '</div>\n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('input.html', ' \n' + '    <input ng-model="model[options.key]" placeholder="{{options.templateOptions.placeholder}}"\n' + '           type="{{options.templateOptions.type}}" id="q{{options.key}}">\n' + ' \n' + '');
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
    $templateCache.put('number.html', ' \n' + '    <input ng-model="model[options.key]" placeholder="{{options.templateOptions.placeholder}}"\n' + '           type="number"  id="q{{options.key}}" pattern="\\d*">\n' + ' \n' + '');
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
    $templateCache.put('range.html', '<div class="item range range-positive" >\n' + '  <i class="icon" ng-if="options.templateOptions.minIcon" ng-class="options.templateOptions.minIcon"></i>\n' + '  {{options.templateOptions.min}}\n' + '  <input type="range" min="{{options.templateOptions.min}}" max="{{options.templateOptions.max}}" step="{{options.templateOptions.step}}" value="{{options.templateOptions.value}}" ng-model="model[options.key]" blockslide=\'1\'>\n' + '  <i class="icon" ng-if="options.templateOptions.maxIcon" ng-class="options.templateOptions.maxIcon"></i>\n' + '  {{options.templateOptions.max}}\n' + '</div>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('rangeWrapper.html', '<div class="card rangeWrapper">\n' + '    <label class="item item-divider" for="q{{options.key}}"  ng-if="options.templateOptions.label" >\n' + '        {{options.templateOptions.label}}<span class="badge badge-positive">{{model[options.key]?model[options.key]:\'-\'}}</span>\n' + '    </label>\n' + '    <div class="item item-text-wrap card-body">\n' + '        <div class="card-description" ng-if="options.templateOptions.description" ng-bind-html="options.templateOptions.description"></div>\n' + '        <formly-transclude></formly-transclude>\n' + '        <div class="validation" ng-if="options.validation.errorExistsAndShouldBeVisible" ng-messages="options.formControl.$error">\n' + '           <div ng-messages-include="validation.html"></div> \n' + '           <div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">\n' + '            {{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}   \n' + '           </div>\n' + '        </div>\n' + '    </div>\n' + '\n' + '</div>\n' + '<script type="text/ng-template" id="validation.html">\n' + '      <div ng-message="required">This field is required!</div>\n' + '      <div ng-message="minlength">Too short!</div>\n' + '      <div ng-message="maxlength">Too long!</div>\n' + '      <div ng-message="email">Invalid email address!</div>\n' + '    </script>');
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
    $templateCache.put('stripe.html', '<input ng-model="model[options.key]" type="hidden" id="q{{options.key}}">\n' + '<div class="stripe-card">\n' + '    <div class="row">\n' + '        <div class="col">\n' + '            <label>\n' + '                <span>Credit Card Number</span>\n' + '                <input ng-model="cardNumber" placeholder="Card Number" cc-format cc-number type="text" class="cc-number" id="cardNumber{{options.key}}" name="cardNumber{{options.key}}" ng-change="submitStripe()">\n' + '            </label>\n' + '        </div>\n' + '    </div>\n' + '    <div class="row">\n' + '        <div class="col col-67">\n' + '            <label>\n' + '                <span>Expiration</span></label>\n' + '            <input ng-model="expMonth" placeholder="MM" cc-exp-month class="cc-month" ng-change="submitStripe()" type="text" id="expMonth{{options.key}}" name="expMonth{{options.key}}">\n' + '            <input ng-model="expYear" placeholder="YYYY" class="cc-year" ng-change="submitStripe()" cc-exp-year full-year type="text" id="expYear{{options.key}}" name="expYear{{options.key}}">\n' + '        </div>\n' + '        <div class="col col-33">\n' + '            <label>\n' + '                <span>CVC</span>\n' + '                <input ng-model="cvc" cc-cvc placeholder="CVC" class="cvc" type="text" ng-change="submitStripe()" id="cvc{{options.key}}" name="cvc{{options.key}}">\n' + '            </label>\n' + '        </div>\n' + '    </div>\n' + '    <div class="row">\n' + '        <div class="col col-50">\n' + '            <label>\n' + '                <span>ZIP/Postal Code</span>\n' + '                <input ng-model="zip" placeholder="ZIP/Postal Code" type="text"  id="zip{{options.key}}" name="zip{{options.key}}" ng-change="submitStripe()">\n' + '            </label>\n' + '        </div>\n' + ' \n' + '             \n' + ' \n' + '    </div>\n' + '    <div ng-show="stripeErrorMessage" class="row">\n' + '        <div class="col assertive text-center">\n' + '            <i class="ionicons ion-alert-circled"></i>{{stripeErrorMessage}}\n' + '        </div>\n' + '    </div>\n' + '    <i class="ionicons ion-checkmark-circled stripeChecked balanced" ng-show="model[options.key]"></i>\n' + '</div>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('textarea.html', ' \n' + '    <textarea ng-model="model[options.key]" placeholder="{{options.templateOptions.placeholder}}"\n' + '           type="{{options.templateOptions.type}}" id="q{{options.key}}"></textarea>\n' + ' \n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates');
  } catch (e) {
    module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('time.html', '<ionic-timepicker  ng-model="model[options.key]"  input-obj="timePickerObject" id="q{{options.key}}">\n' + '  <button class="button button-light" type="button">\n' + '    <i class="ion ion-clock"></i>\n' + '    <standard-time-meridian ng-show="timePickerObject.inputEpochTime" etime=\'timePickerObject.inputEpochTime\'></standard-time-meridian>\n' + '    <span ng-hide="timePickerObject.inputEpochTime">\n' + '             Select a Time\n' + '        </span>\n' + '  </button>\n' + '</ionic-timepicker>');
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
    $templateCache.put('video.html', '\n' + '<div class="videoArea" id="q{{options.key}}"></div>\n' + '<input type="hidden"  ng-model="model[options.key]"/>\n' + '<button ng-click="start()" class="button button-block button-assertive icon-left ion-record" type="button">\n' + '    Start recording\n' + '</button>');
  }]);
})();