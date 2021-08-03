import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];
  constructor(public propertyService: PropertyService) {}

  ngOnInit(): void {
    document.body.style.overflow = 'auto';
    this.propertyService.getAppointments().subscribe((res: any) => {
      console.log(res);
      res.appointment.forEach((x: any) => {
        const property = res.prop.find((ele: any) => {
          return ele._id == x.property_id;
        });
        this.appointments.push({ ...x, property });
      });
    });
    console.log(this.appointments);
  }
}
