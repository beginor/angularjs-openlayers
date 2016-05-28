/// <reference path="../typings/index.d.ts" />
import { MapService } from './map.service';

export class MapController {
    
    map: ol.Map;
    
    static $inject = ['$http', '$q', 'MapService'];
    constructor(
        private $http: ng.IHttpService,
        private $q: ng.IQService,
        private mapService: MapService
    ) {
        this.initMap();
        var serviceUrl = 'http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer';
        var title = '中国底图';
        this.mapService.createTileLayer(serviceUrl, title).then(tileLayer => {
            this.map.addLayer(tileLayer);
        });;
    }
    
    initMap() {
        this.map = new ol.Map({
            target: 'map',
            layers: [],
            view: new ol.View({
                center: ol.proj.fromLonLat([113, 23]),
                zoom: 7
            })
        });
    }
    
}
