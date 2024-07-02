import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MoneyFlowViewService } from '../service/money-flow-view.service';
import { IMoneyFlowView } from '../money-flow-view.model';
import { MoneyFlowViewFormService } from './money-flow-view-form.service';

import { MoneyFlowViewUpdateComponent } from './money-flow-view-update.component';

describe('MoneyFlowView Management Update Component', () => {
  let comp: MoneyFlowViewUpdateComponent;
  let fixture: ComponentFixture<MoneyFlowViewUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let moneyFlowViewFormService: MoneyFlowViewFormService;
  let moneyFlowViewService: MoneyFlowViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), MoneyFlowViewUpdateComponent],
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
      .overrideTemplate(MoneyFlowViewUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MoneyFlowViewUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    moneyFlowViewFormService = TestBed.inject(MoneyFlowViewFormService);
    moneyFlowViewService = TestBed.inject(MoneyFlowViewService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const moneyFlowView: IMoneyFlowView = { id: 456 };

      activatedRoute.data = of({ moneyFlowView });
      comp.ngOnInit();

      expect(comp.moneyFlowView).toEqual(moneyFlowView);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMoneyFlowView>>();
      const moneyFlowView = { id: 123 };
      jest.spyOn(moneyFlowViewFormService, 'getMoneyFlowView').mockReturnValue(moneyFlowView);
      jest.spyOn(moneyFlowViewService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ moneyFlowView });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: moneyFlowView }));
      saveSubject.complete();

      // THEN
      expect(moneyFlowViewFormService.getMoneyFlowView).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(moneyFlowViewService.update).toHaveBeenCalledWith(expect.objectContaining(moneyFlowView));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMoneyFlowView>>();
      const moneyFlowView = { id: 123 };
      jest.spyOn(moneyFlowViewFormService, 'getMoneyFlowView').mockReturnValue({ id: null });
      jest.spyOn(moneyFlowViewService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ moneyFlowView: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: moneyFlowView }));
      saveSubject.complete();

      // THEN
      expect(moneyFlowViewFormService.getMoneyFlowView).toHaveBeenCalled();
      expect(moneyFlowViewService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMoneyFlowView>>();
      const moneyFlowView = { id: 123 };
      jest.spyOn(moneyFlowViewService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ moneyFlowView });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(moneyFlowViewService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
