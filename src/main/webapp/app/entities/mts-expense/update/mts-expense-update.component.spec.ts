import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MtsExpenseService } from '../service/mts-expense.service';
import { IMtsExpense } from '../mts-expense.model';
import { MtsExpenseFormService } from './mts-expense-form.service';

import { MtsExpenseUpdateComponent } from './mts-expense-update.component';

describe('MtsExpense Management Update Component', () => {
  let comp: MtsExpenseUpdateComponent;
  let fixture: ComponentFixture<MtsExpenseUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let mtsExpenseFormService: MtsExpenseFormService;
  let mtsExpenseService: MtsExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), MtsExpenseUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(MtsExpenseUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MtsExpenseUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    mtsExpenseFormService = TestBed.inject(MtsExpenseFormService);
    mtsExpenseService = TestBed.inject(MtsExpenseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const mtsExpense: IMtsExpense = { id: 456 };

      activatedRoute.data = of({ mtsExpense });
      comp.ngOnInit();

      expect(comp.mtsExpense).toEqual(mtsExpense);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMtsExpense>>();
      const mtsExpense = { id: 123 };
      jest.spyOn(mtsExpenseFormService, 'getMtsExpense').mockReturnValue(mtsExpense);
      jest.spyOn(mtsExpenseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ mtsExpense });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: mtsExpense }));
      saveSubject.complete();

      // THEN
      expect(mtsExpenseFormService.getMtsExpense).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(mtsExpenseService.update).toHaveBeenCalledWith(expect.objectContaining(mtsExpense));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMtsExpense>>();
      const mtsExpense = { id: 123 };
      jest.spyOn(mtsExpenseFormService, 'getMtsExpense').mockReturnValue({ id: null });
      jest.spyOn(mtsExpenseService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ mtsExpense: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: mtsExpense }));
      saveSubject.complete();

      // THEN
      expect(mtsExpenseFormService.getMtsExpense).toHaveBeenCalled();
      expect(mtsExpenseService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMtsExpense>>();
      const mtsExpense = { id: 123 };
      jest.spyOn(mtsExpenseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ mtsExpense });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(mtsExpenseService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
