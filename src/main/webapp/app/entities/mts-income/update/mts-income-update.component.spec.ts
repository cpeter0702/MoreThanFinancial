import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MtsIncomeService } from '../service/mts-income.service';
import { IMtsIncome } from '../mts-income.model';
import { MtsIncomeFormService } from './mts-income-form.service';

import { MtsIncomeUpdateComponent } from './mts-income-update.component';

describe('MtsIncome Management Update Component', () => {
  let comp: MtsIncomeUpdateComponent;
  let fixture: ComponentFixture<MtsIncomeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let mtsIncomeFormService: MtsIncomeFormService;
  let mtsIncomeService: MtsIncomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), MtsIncomeUpdateComponent],
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
      .overrideTemplate(MtsIncomeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MtsIncomeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    mtsIncomeFormService = TestBed.inject(MtsIncomeFormService);
    mtsIncomeService = TestBed.inject(MtsIncomeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const mtsIncome: IMtsIncome = { id: 456 };

      activatedRoute.data = of({ mtsIncome });
      comp.ngOnInit();

      expect(comp.mtsIncome).toEqual(mtsIncome);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMtsIncome>>();
      const mtsIncome = { id: 123 };
      jest.spyOn(mtsIncomeFormService, 'getMtsIncome').mockReturnValue(mtsIncome);
      jest.spyOn(mtsIncomeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ mtsIncome });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: mtsIncome }));
      saveSubject.complete();

      // THEN
      expect(mtsIncomeFormService.getMtsIncome).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(mtsIncomeService.update).toHaveBeenCalledWith(expect.objectContaining(mtsIncome));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMtsIncome>>();
      const mtsIncome = { id: 123 };
      jest.spyOn(mtsIncomeFormService, 'getMtsIncome').mockReturnValue({ id: null });
      jest.spyOn(mtsIncomeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ mtsIncome: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: mtsIncome }));
      saveSubject.complete();

      // THEN
      expect(mtsIncomeFormService.getMtsIncome).toHaveBeenCalled();
      expect(mtsIncomeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMtsIncome>>();
      const mtsIncome = { id: 123 };
      jest.spyOn(mtsIncomeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ mtsIncome });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(mtsIncomeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
