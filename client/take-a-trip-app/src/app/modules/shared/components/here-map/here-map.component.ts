import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

declare var H: any;

@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements OnInit {
  private ui: any;
  private map: any;
  @ViewChild("map") public mapElement: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  public ngAfterViewInit() {
    let platform = new H.service.Platform({
      "apikey": "M00YI3E6cEVA4sMcOBo7LZXPwWMuzenfsU0JcB7QqmU"
    });
    let defaultLayers = platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        zoom: 10,
        center: { lat: 37.7397, lng: -121.4252 }
      }
    );
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers);

    this.dropMarker({ "lat": 42.695808, "lng": 23.332794 }, "Saint Alexander Nevsky");
  }

  private dropMarker(coordinates: any, title: string) {
    let marker = new H.map.Marker(coordinates);
    marker.setData("<p>" + title + "</p>");
    marker.addEventListener('tap', event => {
      let bubble = new H.ui.InfoBubble(event.target.getPosition(), {
        content: event.target.getData()
      });
      this.ui.addBubble(bubble);
    }, false);
    this.map.addObject(marker);
  }

}
