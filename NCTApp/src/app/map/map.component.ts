import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';
import { ReportService } from '../report.service';
import { VillainLocation } from '../location';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{
  private map!: L.Map
  private activeCircleMarker:L.CircleMarker<any> | null;
  @Output() mapClick = new EventEmitter();

  constructor(private reportService: ReportService) {
    this.activeCircleMarker = null;
  }

  showMap() {
    this.map = L.map('mapid').setView([49.27, -123], 11);
    this.map.addEventListener('click', (e: L.LeafletMouseEvent) => this.onMapClick(e));

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',

    }).addTo(this.map);
  }

  onMapClick(event:any) {
    if (this.activeCircleMarker !== null) {
      this.map.removeLayer(this.activeCircleMarker);
    }

    this.activeCircleMarker = L.circleMarker(event.latlng);
    this.activeCircleMarker.addTo(this.map);
    this.activeCircleMarker.setStyle({
      color: 'red',
      fillColor: 'red', 
      radius: 5
    });

    this.mapClick.emit(event.latlng);
  }

  putLabels() {
    const locations:VillainLocation[] = this.reportService.getLocations();

    locations.forEach((l) => {
      const locationName:string = l.getLocation();
      const reportCount:number = l.getCount();
      const {x, y} = l.getCoordinates();

      L.marker([x, y]).addTo(this.map)
  		.bindPopup(`<b>${locationName}</b><br />${reportCount} nuisance reports`)
    });
  }

  ngOnInit(): void {
    this.showMap()
    this.putLabels()
  }
}
