import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';

declare var H: any;

@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements OnInit {
  private platform: any;
  private ui: any;
  private map: any;

  @Input() latitute: number;
  @Input() longtitude: number;
  @ViewChild("map") public mapElement: ElementRef;

  constructor() { }

  ngOnInit() {
    this.platform = new H.service.Platform({
      "apikey": "M00YI3E6cEVA4sMcOBo7LZXPwWMuzenfsU0JcB7QqmU"
    });
  }

  public ngAfterViewInit() {
    this.initMap();
    this.dropMarker({ "lat": this.latitute, "lng": this.longtitude });    
  }

  private initMap() {
    let defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        zoom: 10,
        center: { lat: this.latitute, lng: this.longtitude }
      }
    );

    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
  }

  private dropMarker(coordinates: any) {
    this.map.removeObjects(this.map.getObjects());
    let marker = new H.map.Marker(coordinates);
    marker.addEventListener('tap', event => {
      let bubble = new H.ui.InfoBubble(event.target.getPosition(), {
        content: event.target.getData()
      });
      this.ui.addBubble(bubble);
    }, false);
    this.map.addObject(marker);
  }

}
