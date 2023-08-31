import { Component } from '@angular/core';
import * as L from 'leaflet';
import {environment} from "../../../environments/environment.development";
import { ActivatedRoute } from '@angular/router';

interface BookShop {
  latitude: number;
  longitude: number;
  name: string;
  id: string;
}



@Component({
  selector: 'app-bookshop-geolocation',
  templateUrl: './bookshop-geolocation.component.html',
  styleUrls: ['./bookshop-geolocation.component.scss']
})
export class BookshopGeolocationComponent {
  baseUrl: string = `${environment.apiUrl}`;
  selectedStoreName: string = "No store selected";
  selectedStore!: L.Marker;
  map!: L.Map;
  myPosition!: L.Marker;
  bookicon: L.Icon;
  bookId: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.bookicon = L.icon({
      iconUrl: '/assets/bookstore_1.png',
      iconSize: [70, 70],
      iconAnchor: [19, 40],
      popupAnchor: [0, -40]
    });
  }

  ngOnInit() {
    this.initializeMap();
    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('bookId');
      this.loadBookshops();
    });
  }

  initializeMap() {
    this.map = L.map('map').setView([41.621, 21.690], 8);
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(this.map);
  }

  geolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.markPosition.bind(this));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  markPosition(position: GeolocationPosition) {
    if (this.myPosition) {
      this.map.removeLayer(this.myPosition);
    }
    this.myPosition = L.marker([position.coords.latitude, position.coords.longitude]).addTo(this.map);
    this.getMapInfo(this.myPosition, this.selectedStore);
  }

  async getMapInfo(start: L.Marker, end: L.Marker) {
    console.log("success map info");
    const url = "https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248995993511b5947b081e0eedbc69cb402&start=" + start.getLatLng().lng + "," + start.getLatLng().lat +  "&end=" + end.getLatLng().lng + "," + end.getLatLng().lat;
    let info = await fetch(url);
    let data = await info.json();
    let points = data.features[0].geometry.coordinates.map((x: number[]) => x.reverse());
    L.polyline(points, { color: '#b41238', opacity: 1, weight: 5 }).addTo(this.map);
    let distance = data.features[0].properties.summary.distance;
    let duration = data.features[0].properties.summary.duration;

    const informationElement = document.getElementById("information")
    const distanceElement = document.getElementById("distance");
    const durationElement = document.getElementById("duration");

    if (informationElement && distanceElement && durationElement) {
      distanceElement.innerHTML = "The distance from your location to " + this.selectedStoreName + " is <strong>" + (distance / 1000).toFixed(1) + " kilometers</strong>.";
      durationElement.innerHTML = "The time to arrive at " + this.selectedStoreName + " with a car is <strong>" + (duration / 60).toFixed(0) + " minutes</strong>.";
      informationElement.hidden = false;
    } else {
      console.error("Element not found: distanceElement or durationElement");
    }
  }

  async loadBookshops() {
    let bookId = this.bookId;
    const url = this.baseUrl + "/bookshops/book/" + bookId;
    let items = await fetch(url);
    let parsed = await items.json() as BookShop[];
    for (let item of parsed) {
      console.log("Adding bookshop: " + item.latitude + " " + item.longitude + " name: " + item.name);
      let marker = L.marker([item.latitude, item.longitude], { icon: this.bookicon }).addTo(this.map).bindPopup("<h3>" + item.name + "</h3><br><a style='width: 290px' class='btn btn-outline-dark' href=/bookshops/details/" + item.id + ">Detailed view</a>");
      marker.on('click', () => {
        this.selectedStore = marker;
        this.selectedStoreName = item.name;
        this.geolocation();
      });
    }

    //41.99646 21.43141

    // let marker = L.marker([41.99646, 21.43141], { icon: this.bookicon }).addTo(this.map).bindPopup("<h3></h3><br><a style='width: 290px' class='btn btn-outline-dark' href=/bookshops/details/>Detailed view</a>");
    // marker.on('click', () => {
    //   this.selectedStoreName = "dsaffdsa";
    //   this.geolocation();
    // });






  }
}
