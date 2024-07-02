import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { INayaxTransactions } from '../nayax-transactions.model';
import { NayaxTransactionsService } from '../service/nayax-transactions.service';
import { NayaxTransactionsFormService, NayaxTransactionsFormGroup } from './nayax-transactions-form.service';

@Component({
  standalone: true,
  selector: 'jhi-nayax-transactions-update',
  templateUrl: './nayax-transactions-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class NayaxTransactionsUpdateComponent implements OnInit {
  isSaving = false;
  nayaxTransactions: INayaxTransactions | null = null;

  editForm: NayaxTransactionsFormGroup = this.nayaxTransactionsFormService.createNayaxTransactionsFormGroup();

  constructor(
    protected nayaxTransactionsService: NayaxTransactionsService,
    protected nayaxTransactionsFormService: NayaxTransactionsFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nayaxTransactions }) => {
      this.nayaxTransactions = nayaxTransactions;
      if (nayaxTransactions) {
        this.updateForm(nayaxTransactions);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const nayaxTransactions = this.nayaxTransactionsFormService.getNayaxTransactions(this.editForm);
    if (nayaxTransactions.id !== null) {
      this.subscribeToSaveResponse(this.nayaxTransactionsService.update(nayaxTransactions));
    } else {
      this.subscribeToSaveResponse(this.nayaxTransactionsService.create(nayaxTransactions));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INayaxTransactions>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(nayaxTransactions: INayaxTransactions): void {
    this.nayaxTransactions = nayaxTransactions;
    this.nayaxTransactionsFormService.resetForm(this.editForm, nayaxTransactions);
  }
}
