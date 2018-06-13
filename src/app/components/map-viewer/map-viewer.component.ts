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
    // convert image to base64 using any tool like : https://www.base64-image.de/
    const markerIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=';
    const shadowIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC';
    const DefaultIcon = leaflet.icon({
      iconUrl: markerIcon,
      shadowUrl: shadowIcon,
      iconAnchor:   [13, 41],
    });
    // set leaflet default icon 
    leaflet.Marker.prototype.options.icon = DefaultIcon;
    this.Map = leaflet.map('map').setView([30.04, 31.23], 7);
    this.BaseMap = leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    {
        attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '
        + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }).addTo(this.Map);
    // add marker with default icon
    leaflet.marker([30.04, 31.23]).addTo(this.Map);
    // add marker with custom icon
    const customIconBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA0lBMVEUAAADSAC3YACfXACjXACjYACfZACbYACfZACbcACPZACbXACjZACbYACfTACzYACfYACfXACjXACjYACfYACfVACvjABzYACfYACfYACfZACbZACbaACbYACfbACTMADPbACTYACfYACfZACbaACXZACbYACfXACjZACbYACffACDYACfVACvaACbYACfYACfYACfYACfYACfYACfYACfaACXZACa/AEDYACfYACfXACjYACfYACfZACbZACbXACj/AADYACfZACbYACfYACcAAAARfl9OAAAARHRSTlMAEU+BtOZY61cWrSC6Yhfv7WZT2Z4eCcqd2i8UIuQjChzyqqYws7Y5PKQQ4xJE/kiRldc0+zd+BMnLJvX2KGttAbkb7sd9ezgAAAABYktHRACIBR1IAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4gYLFyUldYfT3QAAARFJREFUOMt9k+lCgkAUha8iIOKCYqiU4VKWmrZo2e427/9MSXeAWS6eX5z5PmZgGACyFIpGyTRLRrEAZCyb8dhlAjsVJqTiqNy1mRTbVYQqU1KVeY1pqYm83tCFRp2YwGu6TssnpmhzfhGXoIOtKwg9HGpiC7H5wh7wSZNX87BepsIVF5Ld6WO9ToWICy2sA16jbI0hXzX4byNsQ/0hWSc83c856wnCON0er59ejgUhZERuxL2+1flE+lh3unAvf86pykfKeZjNZW4+qEdqsZSER/1QPon8mTi1wUvG/YgQYLVO+PoVyLwlgkFz2Lwj/9jkCPD5FfPvH8jNbyxs8zns9qc/ZndGgMPxeICzsSxl4A9K4W0WSwFZAgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNi0xMVQyMzozNzozNyswMjowMLGTDPMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDYtMTFUMjM6Mzc6MzcrMDI6MDDAzrRPAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==';
    const  customIcon = leaflet.icon({
      iconUrl: customIconBase64,

      iconAnchor:   [16, 32], // point of the icon which will correspond to marker's location
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  leaflet.marker([30.39, 31.39], {icon: customIcon}).addTo(this.Map);
  // add marker on click event
  this.Map.on('click', (e) => {
    // alert(e.latlng.lat + ', ' + e.latlng.lng);
    leaflet.marker([e.latlng.lat, e.latlng.lng]).addTo(this.Map);
  } );
  }

}
