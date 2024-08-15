import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class RegisterComponent implements OnInit, OnDestroy {
  register!: FormGroup
  proof: any;
  userId: any
  user: any
  constructor(
    private ApiService: ServiceService,
    private route: Router,
    private fb: FormBuilder
  ) {
   
  }
  
  
  ngOnDestroy() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
sessionStorage.removeItem("userId")
    }
  }
  


  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      this.userId = sessionStorage.getItem('userId');
      console.log("user id", this.userId);
  
      // Check if userId is available and has a length greater than 0
      if (this.userId && this.userId.length > 0) {
        this.GetUserById(); // Call API to get user details
      } else {
        console.log("No userId available, skipping API call.");
      }
    } else {
      console.log("Session storage is not available.");
    }


    this.register = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      role: ['', Validators.required],
      idproof: ['', Validators.required],
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

  UploadId(event: any) {
    this.proof = event.target.files[0];
    console.log(this.proof);

  }
  OnSubmit() {
    const formData = new FormData();

    // Correct the email field handling
    formData.append('email', this.register.value.email ? this.register.value.email : '');
    formData.append('password', this.register.value.password ? this.register.value.password : '');
    formData.append('fname', this.register.value.fname ? this.register.value.fname : '');
    formData.append('lname', this.register.value.lname ? this.register.value.lname : '');
    formData.append('role', this.register.value.role ? this.register.value.role : '');
    formData.append('permission', this.register.value.permission ? 'true' : 'false');
    if (this.proof) {
      formData.append('idproof', this.proof);
    }
    if(this.userId !==0 && this.userId !==null) {
      if(this.register.valid){
        this.ApiService.UpdateByid(this.userId, formData).subscribe({
          next: (response: any) => {
            console.log(response);
            this.route.navigate(['/login']);
            this.register.reset();
            console.log("User Updated");
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      }
      
    }else{
      if (this.register.valid) {
        this.ApiService.Register(formData).subscribe({
          next: (response: any) => {
            console.log(response);
            this.route.navigate(['/login']);
            this.register.reset();
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

  GetUserById() {
    this.ApiService.UserViewById(this.userId).subscribe({
      next: (resp: any) => {
        this.user = resp.data;
        console.log("details", this.user);
        this.setFormControl(this.user)
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }


  setFormControl(resp: any) {
    this.register.patchValue({
      email: resp.email,
      password: resp.password,
      fname: resp.fname,
      lname: resp.lname,
      role: resp.role,
      permission: resp.permission,
      idproofUrl: resp.idproof
    });
    console.log("patch", resp);

  }

}
