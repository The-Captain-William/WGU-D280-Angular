import { registerLocaleData } from '@angular/common';
import { ArrayType } from '@angular/compiler';
import { Component } from '@angular/core';
import { count } from 'rxjs';

// need decorator w/ metadata to export 
// class as component, so angular can recognize it.
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  async clickCountry(event: MouseEvent) { // type hint MouseEvent, like python type hints
    // grabbing the html element that was clicked
    const clickedElement = event.target as SVGPathElement; // 'as ...' is the alternate type hint
    const idName = clickedElement.id;

    // 👀 note the `this` reference, to reference the class method of the class you're in. 
    const data = await this.collectData(idName);
    this.parseData(data);
  }

  async collectData(idName: string) {
    // api call example https://api.worldbank.org/v2/country/br?format=json

    // 📝 Note that typescript needs arrays to be of one type, and they must always be specified.

    const url = `https://api.worldbank.org/v2/country/${idName}?format=json`;
    const response: Promise<Array<Array<Object>>> = (await fetch(url)).json(); //  note the encapsulated await
    const data: Array<Array<Object>> = await response;
    return data;
  }

  parseData(data: Array<Array<Object>>) {
    // need -> name, capitol, region, income, two addtl properties


    // interface to give typescript ability to know what to expect
    interface countryObject {
      id: string;
      iso2code: string;
      name: string;
      // skipped admin
      region: { id: string, iso2code: string, value: string };
      incomeLevel: { id: string, iso2code: string, value: string };
      capitalCity: string;
      longitude: string;
      latitude: string;
    };

    const countryObject = data[1][0] as countryObject;
    // thanks to the power of shift + alt my fingers were saved.
    // in python I would run a loop, but I guess this is 'safe' for typescript

    const countryName = countryObject.name;
    const countryCapital = countryObject.capitalCity;
    const countryLongAndLat = `(${countryObject.longitude} ${countryObject.latitude})`;
    const countryRegion = countryObject.region.value;
    const countryIncome = countryObject.incomeLevel.value;
    const countryIso2 = countryObject.iso2code;
    console.log();

    console.log(countryObject);
    console.log(countryName);
  }



}








