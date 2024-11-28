import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private darkMode = new BehaviorSubject<boolean>(false);
    typeTheme$ = this.darkMode.asObservable();

    constructor() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.darkMode.next(savedTheme === 'dark');
        }
        this.updateTheme();
    }

    isDarkMode(): boolean {
        return this.darkMode.value;
    }

    themeClaro(): void {
        this.darkMode.next(this.darkMode.value === false);
        this.updateTheme();
        localStorage.setItem('theme', this.darkMode.value ? 'dark' : 'light');
    }

    themeOscuro(): void {
        this.darkMode.next(this.darkMode.value === false);
        this.updateTheme();
        localStorage.setItem('theme', this.darkMode.value ? 'dark' : 'light');
    }

    private updateTheme(): void {
        document.body.classList.toggle('dark-theme', this.darkMode.value);
    }

}