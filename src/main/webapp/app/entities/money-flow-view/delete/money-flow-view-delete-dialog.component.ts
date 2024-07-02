import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IMoneyFlowView } from '../money-flow-view.model';
import { MoneyFlowViewService } from '../service/money-flow-view.service';

@Component({
  standalone: true,
  templateUrl: './money-flow-view-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class MoneyFlowViewDeleteDialogComponent {
  moneyFlowView?: IMoneyFlowView;

  constructor(
    protected moneyFlowViewService: MoneyFlowViewService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.moneyFlowViewService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
