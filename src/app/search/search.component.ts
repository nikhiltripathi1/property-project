import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public SearchTerm: any = '';
  properties: any[] = [];
  closeResult = '';
  clickProperty: any = {};
  constructor(
    private modalService: NgbModal,
    public propertyService: PropertyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.SearchTerm = params.get('query');
      this.properties = [];
      this.propertyService
        .searchProperty(this.SearchTerm.toString())
        .subscribe((res: any) => {
          console.log(res);
          res.prop.forEach((x: any) => {
            if (res.saved_prop[0].saved_property.includes(x._id)) {
              this.properties.push({ ...x, saved: true });
            } else {
              this.properties.push({ ...x, saved: false });
            }
          });
        });
      console.log(this.SearchTerm);
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
}
