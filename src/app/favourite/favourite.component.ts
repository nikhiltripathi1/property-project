import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css'],
})
export class FavouriteComponent implements OnInit {
  properties: any[] = [];
  closeResult = '';
  clickProperty: any = {};
  message: string = '';
  constructor(
    private modalService: NgbModal,
    public propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    document.body.style.overflow = 'auto';
    this.propertyService.getSavedProperties().subscribe((res: any) => {
      console.log(res);
      res.forEach((x: any) => {
        this.properties.push({ ...x, saved: true });
      });
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

  saveProperty(id: any, flag: any) {
    this.propertyService
      .saveProperty({ id: id, flag: flag })
      .subscribe((props: any) => {
        for (let i = 0; i < this.properties.length; ++i) {
          if (this.properties[i]._id == id) {
            this.properties[i].saved = !this.properties[i].saved;
            break;
          }
        }
      });
  }
  bookAppointment(id: any) {
    const date = (<HTMLInputElement>document.getElementById('date')).value;
    const time = (<HTMLInputElement>document.getElementById('time')).value;
    if (date && time) {
      this.propertyService
        .bookAppointment({ date, time, property_id: id })
        .subscribe((booked: any) => {
          this.message = booked.msg;
        });
    } else {
      this.message = 'Require All Fields';
    }
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
