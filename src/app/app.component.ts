import { AfterViewInit, Component } from '@angular/core';
import { CoordinateConverter, Geodetic } from './coord/coordinate-converter';

// var WorldWind: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  public utm: string = '';

  public shoes = ['Boots', 'Flops', 'Tennis'];

  public model: any;

  public ngAfterViewInit() {
    // Create the WorldWindow.
    var wwd = new WorldWind.WorldWindow("canvasOne");

    // Create and add layers to the WorldWindow.
    var layers = [
        // Imagery layers.
        {layer: new WorldWind.BMNGLayer(), enabled: true},
        {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
        {layer: new WorldWind.BingAerialLayer(null), enabled: false},
        {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
        {layer: new WorldWind.BingRoadsLayer(null), enabled: false},
        {layer: new WorldWind.OpenStreetMapImageLayer(null), enabled: false},
        // Add atmosphere layer on top of all base layers.
        {layer: new WorldWind.AtmosphereLayer(), enabled: true},
        // WorldWindow UI layers.
        {layer: new WorldWind.CompassLayer(), enabled: true},
        {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
        {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
    ];

    for (var l = 0; l < layers.length; l++) {
        layers[l].layer.enabled = layers[l].enabled;
        wwd.addLayer(layers[l].layer);
    }

    wwd.addEventListener("mousedown", (me: MouseEvent) => {
      let obj = wwd.pickTerrain(wwd.canvasCoordinates(me.clientX, me.clientY)).terrainObject();
      if (obj) {
        let pos = new WorldWind.Position(obj.position.latitude, obj.position.longitude, obj.position.altitude);
        console.info(pos);

        const latLo = new Geodetic();
        latLo.latitude = obj.position.latitude;
        latLo.longitude = obj.position.longitude;

        this.utm = CoordinateConverter.toUTM(latLo).toString();
      }
      else {
        console.warn('Unable to get position from terrain.');
      }
    });

    // Create a layer manager for controlling layer visibility.
    // var layerManager = new LayerManager(wwd);
  }

  public listSelectionChanged(evt: any) {
    console.info(this.model);
  }
}
