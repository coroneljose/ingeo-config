import { Component, OnInit, ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})




export class MainComponent implements OnInit {

  constructor() { }

  expandAccordion = false;
  textAccordionBtn = 'Expandir Todo';

  @ViewChild(MatAccordion) accordion: MatAccordion;

  ngOnInit() {
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

}
