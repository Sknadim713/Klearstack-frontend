import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Core/service.service';
import { FormGroup, Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  register!: FormGroup
  constructor(private ApiService: ServiceService, private route: Router, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.register = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      role: ['', Validators.required],
      permission: [false],
    });

    this.register.get('role')?.valueChanges.subscribe(role => {
      if (role == 'admin') {
        this.register.get('permission')?.setValue(true);
        console.log("true");
      } else {
        this.register.get('permission')?.setValue(false);
        console.log('false');
      }
    });
  }

  SignUpOptions = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];


  // OnSubmit() {
  //   console.log(this.register.value);
  //   if(this.register.valid){
  //     this.ApiService.Register(this.register.value).subscribe((response: any) => {
  //       console.log(response);
  //       this.route.navigate(['/login'])
  //     },
  //       error => (console.log(error)
  //       )
  //     )
  //   }
  //  else{
  //   console.log("please fill form ");

  //  }
  // }

  OnSubmit() {
    console.log(this.register.value);
    if (this.register.valid) {
      this.ApiService.Register(this.register.value).subscribe({
        next: (response: any) => {
          console.log(response);
          this.route.navigate(['/login']);
          this.register.reset()
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    } else {
      console.log("please fill form");
    }
  }



}
