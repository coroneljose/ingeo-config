import { Component, OnInit, ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  action: string;
  description: string;
  description2: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    action: '',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
    description2: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
            atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    action: '',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
    description2: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
            atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    action: '',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
    description2: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
            atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    action: '',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`,
    description2: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
            atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    action: '',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
    description2: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
            atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    action: '',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,
    description2: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
            atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    action: '',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`,
    description2: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
            atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    action: '',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`,
    description2: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
             atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    action: '',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`,
    description2: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
            atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    action: '',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`,
    description2: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
            atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  },
];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class MainComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  columnsToDisplay = ['name', 'weight', 'symbol', 'position', 'action'];
  expandedElement: PeriodicElement | null;

  dataSource: MatTableDataSource<PeriodicElement>;

  expandAccordion = false;
  textAccordionBtn = 'Expandir Todo';

  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  constructor(
    private formBuilder: FormBuilder
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit() {

    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  updateAccordion() {
    this.expandAccordion = !this.expandAccordion;
    if (this.expandAccordion) {
      this.accordion.openAll();
      this.textAccordionBtn = 'Contraer Todo';
    } else {
      this.accordion.closeAll();
      this.textAccordionBtn = 'Expandir Todo';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  alertFcn(text) {
    alert(`Accion: ${text}`);
  }

}


// Ejemplo para agrupar filas por columna X
// https://stackblitz.com/edit/angular-material-table-row-grouping
// ver compatibilidad con ampliar descripcion de la fila... o bien como aislar el evento
// https://stackblitz.com/edit/angular-mattable-with-collapsible-groupheader
