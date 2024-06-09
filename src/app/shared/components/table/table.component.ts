import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges, AfterViewInit {

  dataSource: any = new MatTableDataSource([]);
  currentPage = 1;
  rows = 5;
  @Input() data: any[] = [];
  @Input() tableColumns: string[] = [];
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(e: any) {    
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    const data = this.dataSource.data.slice();
    
    // if no column is being sorted
    if (!sortState.active || sortState.direction === '') {
      this.dataSource.data = data;
      return;
    }    

    // handle sort by active column
    this.dataSource.data = data.sort((a: any, b: any) => {
      const isAsc = sortState.direction === 'asc';
      return this.compare(a[sortState.active], b[sortState.active], isAsc);
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  // get view name from object key: customerName => Customer Name
  getColDisplayName(key: string): string {
    let keyArr = key.trim().split('');
    let newArr = [...keyArr];
    keyArr.forEach((char, i) => {
      if (char === char.toUpperCase() && i != 0) {
        newArr.splice(i, 0, ' ')
      }
    });
    return newArr.join('');
  }

}
