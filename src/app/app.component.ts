import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Gold", weight:	196.966, symbol: 'Au' },
  { position: 2, name: "Helium", weight: 4.0026, symbol: 'He' },
  { position: 3, name: "Beryllium", weight: 9.0122, symbol: 'Be' },
  { position: 4, name: "Lithium", weight: 6.941, symbol: 'Li' },
  { position: 5, name: "Silicon", weight: 28.084, symbol: 'Si' },
  { position: 6, name: "Carbon", weight: 12.0117, symbol: 'C' },
  { position: 7, name: "Magnesium", weight: 24.307, symbol: 'Mg' },
  { position: 8, name: "Argon", weight: 39.792, symbol: 'Ar' },
  { position: 9, name: "Lead", weight: 206.14, symbol: 'Pb' },
  { position: 10, name: "Chlorine", weight: 35.446, symbol: 'Ci' },
  { position: 11, name: "Hydrogen", weight: 1.0079, symbol: 'H' },
  { position: 12, name: "Nitrogen", weight: 14.006, symbol: 'N' },
  { position: 13, name: "Sulfur", weight: 32.059, symbol: 'S' },
  { position: 14, name: "Oxygen", weight: 15.999, symbol: 'O' },
  { position: 15, name: "Boron", weight: 10.811, symbol: 'B' },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatSlideToggleModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'angular-material-demo';
  fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    FavoriteFood: [''],
    dateofBirth: [''],
  });

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  private _liveAnnouncer = inject(LiveAnnouncer);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting removed');
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
 
