import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../theme/theme.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  name: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule, RouterLink, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

  themes = signal<boolean>(false);

  constructor(private themeService: ThemeService) {
    this.themeService.typeTheme$.subscribe(theme => this.themes.set(theme));
  }

  public navItems: NavItem[] = [
    { name: 'Cuentas', icon: 'work', path: 'dashboard' },
    // { name: 'Agregar usuario', icon: 'person_add', path: 'add-user' },
    // { name: 'Graficas', icon: 'bar_chart', path: 'graphs' },
  ];

}
