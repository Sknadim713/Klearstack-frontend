import { Component, OnInit, signal } from '@angular/core';
import { ServiceService } from '../Core/service.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-viewuser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewuser.component.html',
  styleUrl: './viewuser.component.css'
})
export class ViewuserComponent implements OnInit {
  user$!: Observable<any>;
  userId: any;

  constructor(private _Service: ServiceService) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    if (this.userId) {
      this.user$ = this._Service.UserViewById(this.userId);
    } else {
      console.error('User ID not found ');
    }
  }

  goBack() {
    history.back();
  }
}