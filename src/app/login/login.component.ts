
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
// import { ServiceService } from '../Core/service.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { ServiceService } from '../Core/service.service';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;
  message = signal<string>('');

  constructor(private ApiService: ServiceService, private route: Router, private cd: ChangeDetectorRef) { }

  ngOnInit(): void { }

  onSubmit(form: NgForm) {

    if (form.valid) {
      this.ApiService.userLogin(this.email, this.password).subscribe(
        (response: any) => {
          sessionStorage.setItem("userID", response.data._id);
          sessionStorage.setItem("role", response.data.role);
          sessionStorage.setItem("permission", response.data.permission);
          sessionStorage.setItem("username", response.data.fname);
          sessionStorage.setItem("userfname", response.data.lname);
          this.route.navigate(['/users']);
        },
        (error) => {
          console.error('Login error:', error);
          if (error.status == 403) {
            console.log('Permission not approved');
            this.message.set('Permission not approved');
          } else {
            console.error('Login error:', error);
            this.message.set('User Not Found');
          }
          console.log('Message:', this.message);
          this.cd.detectChanges();
        }
      );
    }
  }


}
