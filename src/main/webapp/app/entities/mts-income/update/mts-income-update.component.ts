import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IMtsIncome } from '../mts-income.model';
import { MtsIncomeService } from '../service/mts-income.service';
import { MtsIncomeFormService, MtsIncomeFormGroup } from './mts-income-form.service';

@Component({
  standalone: true,
  selector: 'jhi-mts-income-update',
  templateUrl: './mts-income-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class MtsIncomeUpdateComponent implements OnInit {
  isSaving = false;
  mtsIncome: IMtsIncome | null = null;

  editForm: MtsIncomeFormGroup = this.mtsIncomeFormService.createMtsIncomeFormGroup();

  constructor(
    protected mtsIncomeService: MtsIncomeService,
    protected mtsIncomeFormService: MtsIncomeFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mtsIncome }) => {
      this.mtsIncome = mtsIncome;
      if (mtsIncome) {
        this.updateForm(mtsIncome);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const mtsIncome = this.mtsIncomeFormService.getMtsIncome(this.editForm);
    if (mtsIncome.id !== null) {
      this.subscribeToSaveResponse(this.mtsIncomeService.update(mtsIncome));
    } else {
      this.subscribeToSaveResponse(this.mtsIncomeService.create(mtsIncome));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMtsIncome>>): void {
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

  protected updateForm(mtsIncome: IMtsIncome): void {
    this.mtsIncome = mtsIncome;
    this.mtsIncomeFormService.resetForm(this.editForm, mtsIncome);
  }
}
