import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FooterComponent, RouterModule], // Include RouterModule
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'] // Corrected to styleUrls (plural)
})
export class LayoutComponent {

}
