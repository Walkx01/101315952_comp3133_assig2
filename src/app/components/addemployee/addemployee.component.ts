import { Gender } from './../../model/Employee';
import { Component } from '@angular/core';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css'],
})
export class AddemployeeComponent {
  genders = ['male', 'female', 'other'];
}
