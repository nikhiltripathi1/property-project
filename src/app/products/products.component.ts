import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  properties: any[] = [];
  closeResult = '';
  clickProperty: any = {};
  constructor(
    private modalService: NgbModal,
    public propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.propertyService.getProperties().subscribe((props: any) => {
      if (props) {
        props.forEach((x: any) => {
          this.properties.push(x);
        });
      }
    });
  }
  open(propDetails: any, content: any) {
    this.clickProperty = propDetails;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
