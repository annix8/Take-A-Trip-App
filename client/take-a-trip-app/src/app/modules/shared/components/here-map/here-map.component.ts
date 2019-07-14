import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

declare var H: any;

@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements OnInit {

  @ViewChild("map") public mapElement: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  public ngAfterViewInit() {
    let platform = new H.service.Platform({
      "apikey": "M00YI3E6cEVA4sMcOBo7LZXPwWMuzenfsU0JcB7QqmU"
    });
    let defaultLayers = platform.createDefaultLayers();
    let map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        zoom: 10,
        center: { lat: 42.695808, lng: 23.332794 }
      }
    );
  }

}
