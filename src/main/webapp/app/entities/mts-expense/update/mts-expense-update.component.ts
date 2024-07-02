import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { MtsExpenseService } from '../service/mts-expense.service';
import { IMtsExpense } from '../mts-expense.model';
import { MtsExpenseFormService, MtsExpenseFormGroup } from './mts-expense-form.service';

@Component({
  standalone: true,
  selector: 'jhi-mts-expense-update',
  templateUrl: './mts-expense-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class MtsExpenseUpdateComponent implements OnInit {
  isSaving = false;
  mtsExpense: IMtsExpense | null = null;

  editForm: MtsExpenseFormGroup = this.mtsExpenseFormService.createMtsExpenseFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected mtsExpenseService: MtsExpenseService,
    protected mtsExpenseFormService: MtsExpenseFormService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mtsExpense }) => {
      this.mtsExpense = mtsExpense;
      if (mtsExpense) {
        this.updateForm(mtsExpense);
      }
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(
          new EventWithContent<AlertError>('moreThanFinancialApp.error', { ...err, key: 'error.file.' + err.key }),
        ),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const mtsExpense = this.mtsExpenseFormService.getMtsExpense(this.editForm);
    if (mtsExpense.id !== null) {
      this.subscribeToSaveResponse(this.mtsExpenseService.update(mtsExpense));
    } else {
      this.subscribeToSaveResponse(this.mtsExpenseService.create(mtsExpense));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMtsExpense>>): void {
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

  protected updateForm(mtsExpense: IMtsExpense): void {
    this.mtsExpense = mtsExpense;
    this.mtsExpenseFormService.resetForm(this.editForm, mtsExpense);
  }
}
