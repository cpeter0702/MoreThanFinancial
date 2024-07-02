import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MtsExpenseService } from '../service/mts-expense.service';

import { MtsExpenseComponent } from './mts-expense.component';

describe('MtsExpense Management Component', () => {
  let comp: MtsExpenseComponent;
  let fixture: ComponentFixture<MtsExpenseComponent>;
  let service: MtsExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'mts-expense', component: MtsExpenseComponent }]),
        HttpClientTestingModule,
        MtsExpenseComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              }),
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(MtsExpenseComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MtsExpenseComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MtsExpenseService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        }),
      ),
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.mtsExpenses?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to mtsExpenseService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getMtsExpenseIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getMtsExpenseIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
