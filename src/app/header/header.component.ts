import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string | null = null;
  userfname: string | null = null;

  constructor(private route: Router) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.username = sessionStorage.getItem('username');
      this.userfname = sessionStorage.getItem('userfname');
    }
  }

  Logout() {

    sessionStorage.removeItem("userID");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("permission");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userfname");

    this.route.navigate(['/login']);
  }
}
