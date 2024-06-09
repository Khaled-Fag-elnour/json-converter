import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  jsonInputPlaceholder: string = `Paste Json data here
  example: [
    {
      "id": "#1",
      "name": "Name"
    }
  ]`
  jsonData: string = '';
  isValidJsonArray = false;
  errorMessage: string | null = null;

  data: any[] = [];
  filteredData: any[] = [];
  jsonKeys: string[] = [];
  filtersForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService) {}

  onChange(event: any): void {
    this.validateJsonArray(this.jsonData);
    this.filtersForm.reset();
  }

  validateJsonArray(text: string): void {
    try {
      const jsonArray = JSON.parse(text);
      if (Array.isArray(jsonArray)) {
        this.isValidJsonArray = true;
        this.errorMessage = null;
        this.data = jsonArray;
        this.filteredData = jsonArray;
        this.createFiltersForm(jsonArray);
      } else {
        this.isValidJsonArray = false;
        this.errorMessage = 'Please paste a valid json array';
        throw new Error('Not a JSON array');
      }
    } catch (err) {
      this.isValidJsonArray = false;
      this.errorMessage = 'Please paste a valid json array';
    }
  }

  createFiltersForm(jsonArray: any[]) {
    this.jsonKeys = Object.keys(jsonArray[0]);
    Object.keys(jsonArray[0]).forEach(key => {
      this.filtersForm.addControl(key, new FormControl(''));
    })
  }

  onSearch() {
    this.filterData();
  }

  filterData() {
    this.filteredData = this.data.filter((item, i) => {
      // there are two approaches depending on the specific requirement of the application
      // 1) searching for items that match all the filters
      return Object.keys(this.filtersForm.controls).every(key => {
        const controlValue = this.filtersForm.controls[key].value;
        return controlValue ? String(item[key]).toLowerCase().includes(controlValue.toLowerCase()) : true;
      })

      // 2) searching for items that match any of the filters
      // return Object.keys(this.filtersForm.controls).some(key => {
      //   const controlValue = this.filtersForm.controls[key].value;
      //   return controlValue !== '' && String(item[key]).toLowerCase().includes(controlValue.toLowerCase());
      // })
    });
  }

  clearFilters() {
    this.filteredData = this.data;
  }

  logout() {
    this.authService.logout();
  }

}
