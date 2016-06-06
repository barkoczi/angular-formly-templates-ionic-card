(function(module) {
try {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates');
} catch (e) {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('card.html',
    '<div class="card" id="card{{options.key}}">\n' +
    '    <label class="item item-divider" for="q{{options.key}}"  ng-if="options.templateOptions.label" >\n' +
    '        {{options.templateOptions.label}}\n' +
    '    </label>\n' +
    '    <div class="item item-text-wrap card-body">\n' +
    '        <div class="card-description" ng-if="options.templateOptions.description" ng-bind-html="options.templateOptions.description"></div>\n' +
    '        <formly-transclude></formly-transclude>\n' +
    '        <div class="validation" ng-if="options.validation.errorExistsAndShouldBeVisible" ng-messages="options.formControl.$error">\n' +
    '           <div ng-messages-include="validation.html"></div> \n' +
    '           <div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">\n' +
    '            {{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}   \n' +
    '           </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '</div>\n' +
    '<script type="text/ng-template" id="validation.html">\n' +
    '      <div ng-message="required">This field is required!</div>\n' +
    '      <div ng-message="minlength">Too short!</div>\n' +
    '      <div ng-message="maxlength">Too long!</div>\n' +
    '      <div ng-message="email">Invalid email address!</div>\n' +
    '    </script>');
}]);
})();

(function(module) {
try {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates');
} catch (e) {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('datum.html',
    ' \n' +
    '<ionic-datepicker ng-model="model[options.key]" input-obj="datepickerObject" id="q{{options.key}}">\n' +
    '    <button class="button button-light" type="button">\n' +
    '        <i class="ion ion-android-calendar"></i>\n' +
    '        <span ng-show="datepickerObject.inputDate"> {{datepickerObject.inputDate| date:\'MM/dd/yyyy\'}} </span>\n' +
    '        <span ng-hide="datepickerObject.inputDate">\n' +
    '            Select a date \n' +
    '        </span>\n' +
    '    </button>\n' +
    '</ionic-datepicker>');
}]);
})();

(function(module) {
try {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates');
} catch (e) {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('datumtime.html',
    '\n' +
    '<div  ng-model="model[options.key]"  id="q{{options.key}}" class="datumtime">\n' +
    '    <ionic-datepicker input-obj="datepickerObject">\n' +
    '        <button class="button button-light" type="button">\n' +
    '            <i class="ion ion-android-calendar"></i>\n' +
    '            <span ng-show="datepickerObject.inputDate"> {{datepickerObject.inputDate| date:\'MM/dd/yyyy\'}} </span>\n' +
    '            <span ng-hide="datepickerObject.inputDate">\n' +
    '                Select a Date\n' +
    '            </span>\n' +
    '        </button>\n' +
    '    </ionic-datepicker>\n' +
    '    \n' +
    '    <ionic-timepicker   input-obj="timePickerObject" >\n' +
    '      <button class="button button-light" type="button">\n' +
    '        <i class="ion ion-clock"></i>\n' +
    '        <standard-time-meridian  ng-show="timePickerObject.inputEpochTime" etime=\'timePickerObject.inputEpochTime\'></standard-time-meridian>\n' +
    '        <span ng-hide="timePickerObject.inputEpochTime">\n' +
    '                Select a Time\n' +
    '            </span>\n' +
    '      </button>\n' +
    '    </ionic-timepicker>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates');
} catch (e) {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('freehand.html',
    '<signature-pad ng-model="model[options.key]" ng-change="checkValidity()" ></signature-pad>');
}]);
})();

(function(module) {
try {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates');
} catch (e) {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('image.html',
    '<button class="button  button-block button-light" ng-click="openFileDlg()" type="button">\n' +
    '    <i class="ion ion-ios-camera"></i> Take a Photo\n' +
    '</button>\n' +
    '<input type="file" id="q{{options.key}}"  accept="image/*" style="display:none" capture="camera">\n' +
    '<input type="hidden"  ng-model="model[options.key]"/>\n' +
    '<div class="item item-image">\n' +
    '<img  ng-src="{{resizedSrc}}" ng-show="resizedSrc" class="full-image" id="q{{options.key}}Resized" />\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates');
} catch (e) {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('input.html',
    ' \n' +
    '    <input ng-model="model[options.key]" placeholder="{{options.templateOptions.placeholder}}"\n' +
    '           type="{{options.templateOptions.type}}" id="q{{options.key}}">\n' +
    ' \n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates');
} catch (e) {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('multiCheckbox.html',
    '<div class="radio-group">\n' +
    '    <div class="checkbox-list-wrapper">\n' +
    '        <ion-checkbox ng-repeat="(key, option) in to.options"  ng-model="multiCheckbox.checked[$index]"  ng-change="multiCheckbox.change()">{{option[to.labelProp || \'name\']}}</ion-checkbox>\n' +
    '    </div>   \n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates');
} catch (e) {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('number.html',
    ' \n' +
    '    <input ng-model="model[options.key]" placeholder="{{options.templateOptions.placeholder}}"\n' +
    '           type="number"  id="q{{options.key}}" pattern="\\d*">\n' +
    ' \n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates');
} catch (e) {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('radio.html',
    '<div class="radio-group">\n' +
    '    <div class="list">\n' +
    '        <ion-radio ng-repeat="(key, option) in to.options"  tabindex="0"  ng-model="model[options.key]" ng-change="radio.change()"  ng-value="option[to.valueProp || \'value\']">{{option[to.labelProp || \'name\']}}</ion-radio>\n' +
    '    </div>   \n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates');
} catch (e) {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('range.html',
    '<div class="item range range-positive" >\n' +
    '  <i class="icon" ng-if="options.templateOptions.minIcon" ng-class="options.templateOptions.minIcon"></i>\n' +
    '  {{options.templateOptions.min}}\n' +
    '  <input type="range" min="{{options.templateOptions.min}}" max="{{options.templateOptions.max}}" step="{{options.templateOptions.step}}" value="{{options.templateOptions.value}}" ng-model="model[options.key]" blockslide=\'1\'>\n' +
    '  <i class="icon" ng-if="options.templateOptions.maxIcon" ng-class="options.templateOptions.maxIcon"></i>\n' +
    '  {{options.templateOptions.max}}\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates');
} catch (e) {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('rangeWrapper.html',
    '<div class="card rangeWrapper">\n' +
    '    <label class="item item-divider" for="q{{options.key}}"  ng-if="options.templateOptions.label" >\n' +
    '        {{options.templateOptions.label}}<span class="badge badge-positive">{{model[options.key]?model[options.key]:\'-\'}}</span>\n' +
    '    </label>\n' +
    '    <div class="item item-text-wrap card-body">\n' +
    '        <div class="card-description" ng-if="options.templateOptions.description" ng-bind-html="options.templateOptions.description"></div>\n' +
    '        <formly-transclude></formly-transclude>\n' +
    '        <div class="validation" ng-if="options.validation.errorExistsAndShouldBeVisible" ng-messages="options.formControl.$error">\n' +
    '           <div ng-messages-include="validation.html"></div> \n' +
    '           <div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">\n' +
    '            {{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}   \n' +
    '           </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '</div>\n' +
    '<script type="text/ng-template" id="validation.html">\n' +
    '      <div ng-message="required">This field is required!</div>\n' +
    '      <div ng-message="minlength">Too short!</div>\n' +
    '      <div ng-message="maxlength">Too long!</div>\n' +
    '      <div ng-message="email">Invalid email address!</div>\n' +
    '    </script>');
}]);
})();

(function(module) {
try {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates');
} catch (e) {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('select.html',
    '<select ng-model="model[options.key]" \n' +
    '          ng-options="option[to.valueProp || \'value\'] as option[to.labelProp || \'name\'] group by option[to.groupProp || \'group\'] for option in to.options">\n' +
    '  </select>');
}]);
})();

(function(module) {
try {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates');
} catch (e) {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('textarea.html',
    ' \n' +
    '    <textarea ng-model="model[options.key]" placeholder="{{options.templateOptions.placeholder}}"\n' +
    '           type="{{options.templateOptions.type}}" id="q{{options.key}}"></textarea>\n' +
    ' \n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates');
} catch (e) {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('time.html',
    '<ionic-timepicker  ng-model="model[options.key]"  input-obj="timePickerObject" id="q{{options.key}}">\n' +
    '  <button class="button button-light" type="button">\n' +
    '    <i class="ion ion-clock"></i>\n' +
    '    <standard-time-meridian ng-show="timePickerObject.inputEpochTime" etime=\'timePickerObject.inputEpochTime\'></standard-time-meridian>\n' +
    '    <span ng-hide="timePickerObject.inputEpochTime">\n' +
    '             Select a Time\n' +
    '        </span>\n' +
    '  </button>\n' +
    '</ionic-timepicker>');
}]);
})();

(function(module) {
try {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates');
} catch (e) {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('toggle.html',
    '<ion-toggle ng-model="model[options.key]" toggle-class="toggle-{{options.templateOptions.toggleClass}}">\n' +
    '   <span ng-bind-html="options.templateOptions.accept"></span>\n' +
    '</ion-toggle>');
}]);
})();

(function(module) {
try {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates');
} catch (e) {
  module = angular.module('qm-angular-formly-templates-ionic-card-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('video.html',
    '\n' +
    '<div class="videoArea" id="q{{options.key}}"></div>\n' +
    '<input type="hidden"  ng-model="model[options.key]"/>\n' +
    '<button ng-click="start()" class="button button-block button-assertive icon-left ion-record" type="button">\n' +
    '    Start recording\n' +
    '</button>');
}]);
})();
