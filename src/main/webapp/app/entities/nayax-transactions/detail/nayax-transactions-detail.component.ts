import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { INayaxTransactions } from '../nayax-transactions.model';

@Component({
  standalone: true,
  selector: 'jhi-nayax-transactions-detail',
  templateUrl: './nayax-transactions-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class NayaxTransactionsDetailComponent {
  @Input() nayaxTransactions: INayaxTransactions | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
