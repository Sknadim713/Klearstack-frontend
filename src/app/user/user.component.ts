import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../Core/service.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatIconModule
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  constructor(private _Service: ServiceService, private _route: Router) { }
  role: any;
  displayedColumns: string[] = ['Sr.no', 'email', 'fname', 'lname', 'role', 'createdAt'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  private ApiSubscribe: Subscription = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.role = sessionStorage.getItem('role');
      if (this.role === 'admin') {
        this.displayedColumns.push('permission', 'action');
      }
    }
    this.GetUser();
  }

  GetUser() {
    this.ApiSubscribe = this._Service.GetUser().subscribe(
      (response: any) => {
        this.dataSource.data = response.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.ApiSubscribe) {
      this.ApiSubscribe.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  RequestApprove(userId: string, event: MatSlideToggleChange): void {
    const permission = event.checked;
    this._Service.Permission(userId, { permission }).subscribe(response => {
      console.log('Permission updated successfully', response);
      this.GetUser();
    }, error => {
      console.error('Error updating permission', error);
    });
  }

  viewDetails(userId: string): void {
    console.log('View details for user:', userId);
    sessionStorage.setItem('userId', userId);
    this._route.navigate(['/viewUser'])

  }



  deleteUser(userId: string): void {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) {
      return;
    }
    this._Service.UserDeleteById(userId).subscribe(response => {
      console.log('User Deleted successfully', response);
      this.GetUser();
    }, error => {
      console.error('Error Deleting User', error);
    });
  }

}
