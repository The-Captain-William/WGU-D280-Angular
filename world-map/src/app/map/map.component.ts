import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SharedService } from '../shared.service'
import { AppComponent } from '../app.component'



// need decorator w/ metadata to export 
// class as component, so angular can recognize it.
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  // constructor is like init in a python class
  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private app: AppComponent) { }

  clickCountry(event: MouseEvent) { // type hint MouseEvent, like python type hints
    // grabbing the html element that was clicked
    const clickedElement = event.target as SVGPathElement; // 'as ...' is the alternate type hint
    const idName = clickedElement.id;
    console.log(idName);

    // 👀 note the `this` reference, to reference the class method of the class you're in. 
    // api call example https://api.worldbank.org/v2/country/br?format=json

    const url = `https://api.worldbank.org/v2/country/${idName}?format=json`;

    const response: any = this.http.get(url).subscribe(response => {
      this.sharedService.countryApiData = response;
      this.app.getCountryApiData();
    })


  }


}






