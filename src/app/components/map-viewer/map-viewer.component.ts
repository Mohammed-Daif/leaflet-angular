import { Component, OnInit } from '@angular/core';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.css']
})
export class MapViewerComponent implements OnInit {
  public Map: any;
  public BaseMap: any;
  constructor() { }

  ngOnInit() {
    this.Map = leaflet.map('map').setView([30.04, 31.23], 7);
    this.BaseMap = leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    {
        attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '
        + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }).addTo(this.Map);
  }

}
