import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { NayaxTransactionsService } from '../service/nayax-transactions.service';
import { INayaxTransactions } from '../nayax-transactions.model';
import { NayaxTransactionsFormService } from './nayax-transactions-form.service';

import { NayaxTransactionsUpdateComponent } from './nayax-transactions-update.component';

describe('NayaxTransactions Management Update Component', () => {
  let comp: NayaxTransactionsUpdateComponent;
  let fixture: ComponentFixture<NayaxTransactionsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let nayaxTransactionsFormService: NayaxTransactionsFormService;
  let nayaxTransactionsService: NayaxTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), NayaxTransactionsUpdateComponent],
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
      .overrideTemplate(NayaxTransactionsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NayaxTransactionsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    nayaxTransactionsFormService = TestBed.inject(NayaxTransactionsFormService);
    nayaxTransactionsService = TestBed.inject(NayaxTransactionsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const nayaxTransactions: INayaxTransactions = { id: 456 };

      activatedRoute.data = of({ nayaxTransactions });
      comp.ngOnInit();

      expect(comp.nayaxTransactions).toEqual(nayaxTransactions);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INayaxTransactions>>();
      const nayaxTransactions = { id: 123 };
      jest.spyOn(nayaxTransactionsFormService, 'getNayaxTransactions').mockReturnValue(nayaxTransactions);
      jest.spyOn(nayaxTransactionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nayaxTransactions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nayaxTransactions }));
      saveSubject.complete();

      // THEN
      expect(nayaxTransactionsFormService.getNayaxTransactions).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(nayaxTransactionsService.update).toHaveBeenCalledWith(expect.objectContaining(nayaxTransactions));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INayaxTransactions>>();
      const nayaxTransactions = { id: 123 };
      jest.spyOn(nayaxTransactionsFormService, 'getNayaxTransactions').mockReturnValue({ id: null });
      jest.spyOn(nayaxTransactionsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nayaxTransactions: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nayaxTransactions }));
      saveSubject.complete();

      // THEN
      expect(nayaxTransactionsFormService.getNayaxTransactions).toHaveBeenCalled();
      expect(nayaxTransactionsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INayaxTransactions>>();
      const nayaxTransactions = { id: 123 };
      jest.spyOn(nayaxTransactionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nayaxTransactions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(nayaxTransactionsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
