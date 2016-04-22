"use strict";!function(){angular.module("qm-angular-formly-templates-ionic-card",["formly","qm-angular-formly-templates-ionic-card-templates"],["formlyConfigProvider",function(e){e.setWrapper({name:"card",templateUrl:"card.html"}),e.setWrapper({name:"rangeWrapper",templateUrl:"rangeWrapper.html"});var t=[];t.push({name:"multiCheckbox",templateUrl:"multiCheckbox.html",wrapper:"card",defaultOptions:{noFormControl:!1,ngModelAttrs:{required:{attribute:"",bound:""}}},controller:["$scope",function(e){function t(t){var o;e.to.required&&(o=angular.isArray(e.model[r.key])&&e.model[r.key].length>0&&t,e.fc.$setValidity("required",o))}function o(){e.model[r.key]=[],angular.forEach(e.multiCheckbox.checked,function(t,o){t&&e.model[r.key].push(a.options[o][a.valueProp||"value"])}),e.fc.$setTouched(),e.fc.$setDirty(),e.fc.$modelValue=e.model[r.key].join(","),t(!0)}var a=e.to,r=e.options;if(e.$watch("model",function(t){var o,i;Object.keys(t).length&&(o=t[r.key],e.$watch("to.options",function(t){if(t&&Array.isArray(t)&&Array.isArray(o)){i=a.valueProp||"value";for(var r=0;r<t.length;r++)e.multiCheckbox.checked[r]=-1!==o.indexOf(t[r][i])}}))},!0),r.expressionProperties&&r.expressionProperties["templateOptions.required"]&&e.$watch(function(){return e.to.required},function(e){t(e)}),e.to.required)var i=e.$watch("fc",function(e){e&&(t(!0),i())});e.multiCheckbox={checked:[],change:o}}]}),t.push({name:"input",templateUrl:"input.html",wrapper:"card"}),t.push({name:"textarea",templateUrl:"textarea.html",wrapper:"card"}),t.push({name:"select",templateUrl:"select.html",wrapper:"card"}),t.push({name:"radio",templateUrl:"radio.html",wrapper:"card",defaultOptions:{noFormControl:!1},controller:["$scope",function(e){var t=function(){e.fc.$setDirty(),e.fc.$setTouched()};e.radio={change:t}}]}),t.push({name:"datum",templateUrl:"datum.html",wrapper:"card",defaultOptions:{noFormControl:!1},controller:["$scope",function(e){function t(){var t;e.to.required&&(t=e.datepickerObject.inputDate instanceof Date,console.log(t),e.fc.$setValidity("required",t))}var o=e.options,a=function(a){if(e.fc.$setDirty(),e.fc.$setTouched(),"undefined"==typeof a)delete e.model[o.key],e.datepickerObject.inputDate=!1;else{e.datepickerObject.inputDate=a;var r=new moment(a);e.model[o.key]=r.format("YYYY-MM-DD")}t()},r=!1;e.model[o.key]&&(r=moment(e.model[o.key],"YYYY-MM-DD").toDate()),e.datepickerObject={titleLabel:e.to.label,todayLabel:"Today",closeLabel:"Close",setLabel:"Set",setButtonType:"button-positive",todayButtonType:"button-calm",closeButtonType:"button-stable",inputDate:r,mondayFirst:!0,templateType:"modal",showTodayButton:"true",modalHeaderColor:"bar-stable",modalFooterColor:"bar-stable",callback:function(e){a(e)}}}]}),t.push({name:"time",templateUrl:"time.html",wrapper:"card",defaultOptions:{noFormControl:!1},controller:["$scope",function(e){function t(){var t;e.to.required&&(t="undefined"!==e.timePickerObject.inputEpochTime,e.fc.$setValidity("required",t))}var o=e.options,a=function(a){if(e.fc.$setDirty(),e.fc.$setTouched(),"undefined"==typeof a)delete e.model[o.key],e.timePickerObject.inputEpochTime=void 0;else{e.timePickerObject.inputEpochTime=a;var r=parseInt(a/3600),i=a/60%60;String(r).length<2&&(r="0"+r),String(i).length<2&&(i="0"+i),e.model[o.key]=r+":"+i}t()},r=!1;if(e.model[o.key]){var i=e.model[o.key],n=i.substr(11,2),l=i.substr(14,2);r=60*n*60+60*parseInt(l)}e.timePickerObject={inputEpochTime:r,step:1,format:12,titleLabel:e.to.label,setLabel:"Set",closeLabel:"Close",setButtonType:"button-positive",closeButtonType:"button-stable",callback:function(e){a(e)}}}]}),t.push({name:"datumtime",templateUrl:"datumtime.html",wrapper:"card",defaultOptions:{noFormControl:!1},controller:["$scope",function(e){function t(){var t;e.to.required&&(t="undefined"!==e.timePickerObject.inputEpochTime,e.fc.$setValidity("required",t))}var o=e.options,a=function(){if(e.datepickerObject.inputDate instanceof Date&&e.timePickerObject.inputEpochTime){var t=parseInt(e.timePickerObject.inputEpochTime/3600),a=e.timePickerObject.inputEpochTime/60%60,r=moment(e.datepickerObject.inputDate);r.hour(t),r.minute(a),e.model[o.key]=r.format("YYYY-MM-DD HH:mm")}else delete e.model[o.key]},r=function(r){e.fc.$setDirty(),e.fc.$setTouched(),"undefined"==typeof r?(delete e.model[o.key],e.datepickerObject.inputDate=!1):(e.datepickerObject.inputDate=r,a()),t()},i=function(r){e.fc.$setDirty(),e.fc.$setTouched(),"undefined"==typeof r?(delete e.model[o.key],e.timePickerObject.inputEpochTime=void 0):(e.timePickerObject.inputEpochTime=r,a()),t()},n=!1;e.model[o.key]&&(n=moment(e.model[o.key],"YYYY-MM-DD").toDate());var l=!1;if(e.model[o.key]){var c=e.model[o.key],p=c.substr(11,2),u=c.substr(14,2);l=60*p*60+60*parseInt(u)}e.timePickerObject={inputEpochTime:l,step:1,format:12,titleLabel:e.to.label,setLabel:"Set",closeLabel:"Close",setButtonType:"button-positive",closeButtonType:"button-stable",callback:function(e){i(e)}},e.datepickerObject={titleLabel:e.to.label,todayLabel:"Today",closeLabel:"Close",setLabel:"Set",setButtonType:"button-positive",todayButtonType:"button-calm",closeButtonType:"button-stable",inputDate:n,mondayFirst:!0,templateType:"modal",showTodayButton:"true",modalHeaderColor:"bar-stable",modalFooterColor:"bar-stable",callback:function(e){r(e)}}}]}),t.push({name:"image",templateUrl:"image.html",wrapper:"card",controller:["$scope",function(e){function t(){var t;e.to.required&&(t=angular.isDefined(e.model[o.key])&&e.model[o.key].length>0,e.fc.$setValidity("required",t))}var o=e.options;e.resizedSrc="",$("body").on("change","#"+e.options.key,function(a){var r=a.dataTransfer||a.target,i=r&&r.files&&r.files[0],n={canvas:!0,maxWidth:1024};loadImage.parseMetaData(i,function(a){a.exif&&(n.orientation=a.exif.get("Orientation")),loadImage(i,function(a){e.$apply(function(){e.resizedSrc=a.toDataURL("image/jpeg",.8),e.model[o.key]=a.toDataURL("image/jpeg",.8)}),t()},n)})}),e.openFileDlg=function(){$("#"+e.options.key).click(),e.fc.$setDirty(),e.fc.$setTouched()}}]}),t.push({name:"freehand",templateUrl:"freehand.html",wrapper:"card",controller:["$scope",function(e){var t=e.options;e.resizedSrc="",e.checkValidity=function(){e.fc.$setDirty(),e.fc.$setTouched();var o;e.to.required&&(o=angular.isDefined(e.model[t.key])&&e.model[t.key].length>0,e.fc.$setValidity("required",o))}}]}),t.push({name:"range",templateUrl:"range.html",wrapper:"rangeWrapper"}),t.push({name:"toggle",templateUrl:"toggle.html",wrapper:"card"}),e.setType(t)}])}();
"use strict";!function(t){try{t=angular.module("qm-angular-formly-templates-ionic-card-templates")}catch(e){t=angular.module("qm-angular-formly-templates-ionic-card-templates",[])}t.run(["$templateCache",function(t){t.put("card.html",'<div class="card">\n    <label class="item item-divider" for="{{model[options.key]}}"  ng-if="options.templateOptions.label" >\n        {{options.templateOptions.label}}\n    </label>\n    <div class="item item-text-wrap card-body">\n        <div class="card-description" ng-if="options.templateOptions.description" ng-bind-html="options.templateOptions.description"></div>\n        <formly-transclude></formly-transclude>\n        <div class="validation" ng-if="options.validation.errorExistsAndShouldBeVisible" ng-messages="options.formControl.$error">\n           <div ng-messages-include="validation.html"></div> \n           <div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">\n            {{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}   \n           </div>\n        </div>\n    </div>\n\n</div>\n<script type="text/ng-template" id="validation.html">\n      <div ng-message="required">This field is required!</div>\n      <div ng-message="minlength">Too short!</div>\n      <div ng-message="maxlength">Too long!</div>\n      <div ng-message="email">Invalid email address!</div>\n    </script>')}])}(),function(t){try{t=angular.module("qm-angular-formly-templates-ionic-card-templates")}catch(e){t=angular.module("qm-angular-formly-templates-ionic-card-templates",[])}t.run(["$templateCache",function(t){t.put("datum.html",' \n<ionic-datepicker ng-model="model[options.key]" input-obj="datepickerObject" id="model[options.key]">\n    <button class="button button-light" type="button">\n        <i class="ion ion-android-calendar"></i>\n        <span ng-show="datepickerObject.inputDate"> {{datepickerObject.inputDate| date:\'MM/dd/yyyy\'}} </span>\n        <span ng-hide="datepickerObject.inputDate">\n            Select a date \n        </span>\n    </button>\n</ionic-datepicker>')}])}(),function(t){try{t=angular.module("qm-angular-formly-templates-ionic-card-templates")}catch(e){t=angular.module("qm-angular-formly-templates-ionic-card-templates",[])}t.run(["$templateCache",function(t){t.put("datumtime.html",'\n<div  ng-model="model[options.key]"  id="model[options.key]" class="datumtime">\n    <ionic-datepicker input-obj="datepickerObject">\n        <button class="button button-light" type="button">\n            <i class="ion ion-android-calendar"></i>\n            <span ng-show="datepickerObject.inputDate"> {{datepickerObject.inputDate| date:\'MM/dd/yyyy\'}} </span>\n            <span ng-hide="datepickerObject.inputDate">\n                Select a Date\n            </span>\n        </button>\n    </ionic-datepicker>\n    \n    <ionic-timepicker   input-obj="timePickerObject" >\n      <button class="button button-light" type="button">\n        <i class="ion ion-clock"></i>\n        <standard-time-meridian  ng-show="timePickerObject.inputEpochTime" etime=\'timePickerObject.inputEpochTime\'></standard-time-meridian>\n        <span ng-hide="timePickerObject.inputEpochTime">\n                Select a Time\n            </span>\n      </button>\n    </ionic-timepicker>\n</div>\n')}])}(),function(t){try{t=angular.module("qm-angular-formly-templates-ionic-card-templates")}catch(e){t=angular.module("qm-angular-formly-templates-ionic-card-templates",[])}t.run(["$templateCache",function(t){t.put("freehand.html",'<signature-pad ng-model="model[options.key]" ng-change="checkValidity()" ></signature-pad>')}])}(),function(t){try{t=angular.module("qm-angular-formly-templates-ionic-card-templates")}catch(e){t=angular.module("qm-angular-formly-templates-ionic-card-templates",[])}t.run(["$templateCache",function(t){t.put("image.html",'<button class="button  button-block button-light" ng-click="openFileDlg()" type="button">\n    <i class="ion ion-ios-camera"></i> Take a Photo\n</button>\n<input type="file" id="{{options.key}}"  accept="image/*" style="display:none" capture="camera">\n<input type="hidden"  ng-model="model[options.key]"/>\n<div class="item item-image">\n<img  ng-src="{{resizedSrc}}" ng-show="resizedSrc" class="full-image" id="{{options.key}}Resized" />\n</div>\n')}])}(),function(t){try{t=angular.module("qm-angular-formly-templates-ionic-card-templates")}catch(e){t=angular.module("qm-angular-formly-templates-ionic-card-templates",[])}t.run(["$templateCache",function(t){t.put("input.html",' \n    <input ng-model="model[options.key]" placeholder="{{options.templateOptions.placeholder}}"\n           type="{{options.templateOptions.type}}" id="{{model[options.key]}}">\n \n')}])}(),function(t){try{t=angular.module("qm-angular-formly-templates-ionic-card-templates")}catch(e){t=angular.module("qm-angular-formly-templates-ionic-card-templates",[])}t.run(["$templateCache",function(t){t.put("multiCheckbox.html",'<div class="radio-group">\n    <div class="checkbox-list-wrapper">\n        <ion-checkbox ng-repeat="(key, option) in to.options"  ng-model="multiCheckbox.checked[$index]"  ng-change="multiCheckbox.change()">{{option[to.labelProp || \'name\']}}</ion-checkbox>\n    </div>   \n</div>')}])}(),function(t){try{t=angular.module("qm-angular-formly-templates-ionic-card-templates")}catch(e){t=angular.module("qm-angular-formly-templates-ionic-card-templates",[])}t.run(["$templateCache",function(t){t.put("radio.html",'<div class="radio-group">\n    <div class="list">\n        <ion-radio ng-repeat="(key, option) in to.options"  tabindex="0"  ng-model="model[options.key]" ng-change="radio.change()"  ng-value="option[to.valueProp || \'value\']">{{option[to.labelProp || \'name\']}}</ion-radio>\n    </div>   \n</div>')}])}(),function(t){try{t=angular.module("qm-angular-formly-templates-ionic-card-templates")}catch(e){t=angular.module("qm-angular-formly-templates-ionic-card-templates",[])}t.run(["$templateCache",function(t){t.put("range.html",'<div class="item range" ng-class="\'range-\' + options.templateOptions.rangeClass">\n  <i class="icon" ng-if="options.templateOptions.minIcon" ng-class="options.templateOptions.minIcon"></i>\n  {{options.templateOptions.min}}\n  <input type="range" min="{{options.templateOptions.min}}" max="{{options.templateOptions.max}}" step="{{options.templateOptions.step}}" value="{{options.templateOptions.value}}" ng-model="model[options.key]">\n  <i class="icon" ng-if="options.templateOptions.maxIcon" ng-class="options.templateOptions.maxIcon"></i>\n  {{options.templateOptions.max}}\n</div>')}])}(),function(t){try{t=angular.module("qm-angular-formly-templates-ionic-card-templates")}catch(e){t=angular.module("qm-angular-formly-templates-ionic-card-templates",[])}t.run(["$templateCache",function(t){t.put("rangeWrapper.html",'<div class="card rangeWrapper">\n    <label class="item item-divider" for="{{model[options.key]}}"  ng-if="options.templateOptions.label" >\n        {{options.templateOptions.label}}<span class="badge badge-positive">{{model[options.key]?model[options.key]:\'-\'}}</span>\n    </label>\n    <div class="item item-text-wrap card-body">\n        <div class="card-description" ng-if="options.templateOptions.description" ng-bind-html="options.templateOptions.description"></div>\n        <formly-transclude></formly-transclude>\n        <div class="validation" ng-if="options.validation.errorExistsAndShouldBeVisible" ng-messages="options.formControl.$error">\n           <div ng-messages-include="validation.html"></div> \n           <div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">\n            {{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}   \n           </div>\n        </div>\n    </div>\n\n</div>\n<script type="text/ng-template" id="validation.html">\n      <div ng-message="required">This field is required!</div>\n      <div ng-message="minlength">Too short!</div>\n      <div ng-message="maxlength">Too long!</div>\n      <div ng-message="email">Invalid email address!</div>\n    </script>')}])}(),function(t){try{t=angular.module("qm-angular-formly-templates-ionic-card-templates")}catch(e){t=angular.module("qm-angular-formly-templates-ionic-card-templates",[])}t.run(["$templateCache",function(t){t.put("select.html","<select ng-model=\"model[options.key]\" \n          ng-options=\"option[to.valueProp || 'value'] as option[to.labelProp || 'name'] group by option[to.groupProp || 'group'] for option in to.options\">\n  </select>")}])}(),function(t){try{t=angular.module("qm-angular-formly-templates-ionic-card-templates")}catch(e){t=angular.module("qm-angular-formly-templates-ionic-card-templates",[])}t.run(["$templateCache",function(t){t.put("textarea.html",' \n    <textarea ng-model="model[options.key]" placeholder="{{options.templateOptions.placeholder}}"\n           type="{{options.templateOptions.type}}" id="{{model[options.key]}}"></textarea>\n \n')}])}(),function(t){try{t=angular.module("qm-angular-formly-templates-ionic-card-templates")}catch(e){t=angular.module("qm-angular-formly-templates-ionic-card-templates",[])}t.run(["$templateCache",function(t){t.put("time.html",'<ionic-timepicker  ng-model="model[options.key]"  input-obj="timePickerObject" id="model[options.key]">\n  <button class="button button-light" type="button">\n    <i class="ion ion-clock"></i>\n    <standard-time-meridian ng-show="timePickerObject.inputEpochTime" etime=\'timePickerObject.inputEpochTime\'></standard-time-meridian>\n    <span ng-hide="timePickerObject.inputEpochTime">\n             Select a Time\n        </span>\n  </button>\n</ionic-timepicker>')}])}(),function(t){try{t=angular.module("qm-angular-formly-templates-ionic-card-templates")}catch(e){t=angular.module("qm-angular-formly-templates-ionic-card-templates",[])}t.run(["$templateCache",function(t){t.put("toggle.html",'<ion-toggle ng-model="model[options.key]" toggle-class="toggle-{{options.templateOptions.toggleClass}}">\n   <span ng-bind-html="options.templateOptions.accept"></span>\n</ion-toggle>')}])}();