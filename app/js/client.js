require('angular/angular');

var gymPassApp = angular.module('gymPassApp', []);
require('./services/services')(gymPassApp);
require('./directives/directives')(gymPassApp);
require('./notes/notes')(gymPassApp);