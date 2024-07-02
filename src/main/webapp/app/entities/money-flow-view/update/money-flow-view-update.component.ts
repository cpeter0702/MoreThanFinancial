import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IMoneyFlowView } from '../money-flow-view.model';
import { MoneyFlowViewService } from '../service/money-flow-view.service';
import { MoneyFlowViewFormService, MoneyFlowViewFormGroup } from './money-flow-view-form.service';

@Component({
  standalone: true,
  selector: 'jhi-money-flow-view-update',
  templateUrl: './money-flow-view-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class MoneyFlowViewUpdateComponent implements OnInit {
  isSaving = false;
  moneyFlowView: IMoneyFlowView | null = null;

  editForm: MoneyFlowViewFormGroup = this.moneyFlowViewFormService.createMoneyFlowViewFormGroup();

  constructor(
    protected moneyFlowViewService: MoneyFlowViewService,
    protected moneyFlowViewFormService: MoneyFlowViewFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ moneyFlowView }) => {
      this.moneyFlowView = moneyFlowView;
      if (moneyFlowView) {
        this.updateForm(moneyFlowView);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const moneyFlowView = this.moneyFlowViewFormService.getMoneyFlowView(this.editForm);
    if (moneyFlowView.id !== null) {
      this.subscribeToSaveResponse(this.moneyFlowViewService.update(moneyFlowView));
    } else {
      this.subscribeToSaveResponse(this.moneyFlowViewService.create(moneyFlowView));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMoneyFlowView>>): void {
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

  protected updateForm(moneyFlowView: IMoneyFlowView): void {
    this.moneyFlowView = moneyFlowView;
    this.moneyFlowViewFormService.resetForm(this.editForm, moneyFlowView);
  }
}
