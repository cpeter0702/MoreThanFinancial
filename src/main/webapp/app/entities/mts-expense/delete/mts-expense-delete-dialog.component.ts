import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IMtsExpense } from '../mts-expense.model';
import { MtsExpenseService } from '../service/mts-expense.service';

@Component({
  standalone: true,
  templateUrl: './mts-expense-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class MtsExpenseDeleteDialogComponent {
  mtsExpense?: IMtsExpense;

  constructor(
    protected mtsExpenseService: MtsExpenseService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.mtsExpenseService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
