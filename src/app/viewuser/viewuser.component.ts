import { Component, OnInit, signal } from '@angular/core';
import { ServiceService } from '../Core/service.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-viewuser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewuser.component.html',
  styleUrl: './viewuser.component.css'
})
export class ViewuserComponent implements OnInit {
  // user$!: Observable<any>;
  user:any;
  userId: any;
  documentpath =environment
  constructor(private _Service: ServiceService) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.userId = sessionStorage.getItem('userId');
      this.GetUserById();
    }
  }
  

  goBack() {
    history.back();
  }

  GetUserById() {
    this._Service.UserViewById(this.userId).subscribe({
      next: (resp: any) => {
        this.user = resp.data;
        console.log("details", this.user);
        console.log("path ", this.documentpath);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  
}