export class MapService {
    
    static $inject = ['$http', '$q'];
    constructor(
        private $http: ng.IHttpService,
        private $q: ng.IQService
    ) { }
    
    createTileLayer(serviceUrl: string, title: string) : ng.IPromise<ol.layer.Tile> {
        var deferred = this.$q.defer<ol.layer.Tile>();
        // get service info;
        this.$http.get(serviceUrl, { params: { f: 'pjson' } }).then(
            response => {
                var info: any = response.data;
                var tileGrid = this.buildTileGrid(info);
                var source = new ol.source.XYZ({
                    tileGrid: tileGrid,
                    attributions: [
                        new ol.Attribution({
                            html: `<a href="${serviceUrl}" target="_blank">${title}</a>`
                        })
                    ],
                    minZoom: info.tileInfo.lods[0].level,
                    maxZoom: info.tileInfo.lods[info.tileInfo.lods.length - 1].level,
                    tileSize: [info.tileInfo.cols, info.tileInfo.rows],
                    projection: 'EPSG:' + info.spatialReference.wkid,
                    url: serviceUrl + '/tile/{z}/{y}/{x}'
                });
                
                var tileLayer = new ol.layer.Tile({
                    source: source
                });
                
                deferred.resolve(tileLayer);
            },
            error => {
                deferred.reject(error);
            }
        );
        return deferred.promise;
    }
    
    private buildTileGrid(serviceInfo: any): ol.tilegrid.TileGrid {
        var fullExtent: ol.Extent = [
            serviceInfo.fullExtent.xmin,
            serviceInfo.fullExtent.ymin,
            serviceInfo.fullExtent.xmax,
            serviceInfo.fullExtent.ymax
        ];
        var minZoom = serviceInfo.tileInfo.lods[0].level;
        var maxZoom = serviceInfo.tileInfo.lods[serviceInfo.tileInfo.lods.length - 1].level;
        var tileSize: ol.Size = [serviceInfo.tileInfo.cols, serviceInfo.tileInfo.rows];
        
        var tileGrid = ol.tilegrid.createXYZ({
            extent: fullExtent,
            minZoom: minZoom,
            maxZoom: maxZoom,
            tileSize: tileSize,
        });
        return tileGrid;
    }
}