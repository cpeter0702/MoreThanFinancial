import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IMoneyFlowView } from '../money-flow-view.model';

@Component({
  standalone: true,
  selector: 'jhi-money-flow-view-detail',
  templateUrl: './money-flow-view-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class MoneyFlowViewDetailComponent {
  @Input() moneyFlowView: IMoneyFlowView | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
