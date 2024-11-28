import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../theme/theme.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AccountService } from '../../../accounts/account.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule, MatFormFieldModule],
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {
  public searchTerm: string = '';
  themes = signal<boolean>(false);
  private allAccounts: any[] = [];
  private searchTerms = new Subject<string>();

  constructor(private themeService: ThemeService, private accountService: AccountService) {
    this.themeService.typeTheme$.subscribe(theme => this.themes.set(theme));
  }

  ngOnInit() {
    this.accountService.accounts$.subscribe(accounts => {
      this.allAccounts = accounts;
    });

    this.searchTerms.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(() => {
      this.search();
    });
  }

  onSearchChange(term: string): void {
    this.searchTerms.next(term);
  }

  search() {
    if (this.searchTerm.trim() == '') {
      this.accountService.updateAccounts(this.allAccounts);
    } else {
      const filteredAccounts = this.allAccounts.filter(account =>
        account.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.accountService.updateAccounts(filteredAccounts);
    }
  }
}