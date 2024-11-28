import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from './theme.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MatIconModule, MatMenuModule],
  styleUrls: ["./theme.component.css"],
  template: `
  <button mat-button [matMenuTriggerFor]="menu" class="btn-theme" style="background-color: transparent;   border: 0.1px solid rgba(150, 145, 145, 0.466);
; color: white; border-radius: 5px; pading: 10px;">
    <mat-icon style="padding: 3px 1px;">{{ themeService.isDarkMode() ? 'dark_mode' : 'light_mode' }}</mat-icon>
  </button>
  <mat-menu #menu="matMenu" xPosition="before" class="menu-div" style="padding:10px; background-color: red:!important; color: white;">
      <button mat-menu-item (click)="themeService.themeClaro()">Claro</button>
      <button mat-menu-item (click)="themeService.themeOscuro()">Oscuro</button>
  </mat-menu>
  `
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) { }
}