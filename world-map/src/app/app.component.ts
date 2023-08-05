import { Component, OnChanges, OnInit } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private sharedService: SharedService) { }
  title = 'hello-world';
  countryName = '';
  countryCap = '';
  countryLongLat = '';
  countryIncome = '';
  countryRegion = '';

  getCountryApiData() {
    // need -> name, capitol, region, income, two addtl properties




    console.log(this.sharedService.countryApiData)
    const country = this.sharedService.countryApiData[1][0];
    console.log(country);
    this.countryName = country['name'];
    this.countryCap = country['capitalCity'];
    this.countryLongLat = `(${country['latitude']}, ${country['longitude']})`;
    this.countryIncome = country['incomeLevel']['value'];
    this.countryRegion = country['region']['value'];
  }

}


