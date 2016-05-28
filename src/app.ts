/// <reference path="../typings/index.d.ts" />
import 'angular';
import 'ol';

import { MapController } from './map.controller';
import { MapService } from './map.service';

angular.module('app', [])
.controller('MapController', MapController)
.service('MapService', MapService);
