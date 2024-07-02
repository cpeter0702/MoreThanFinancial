import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MoneyFlowViewService } from '../service/money-flow-view.service';

import { MoneyFlowViewComponent } from './money-flow-view.component';

describe('MoneyFlowView Management Component', () => {
  let comp: MoneyFlowViewComponent;
  let fixture: ComponentFixture<MoneyFlowViewComponent>;
  let service: MoneyFlowViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'money-flow-view', component: MoneyFlowViewComponent }]),
        HttpClientTestingModule,
        MoneyFlowViewComponent,
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
      .overrideTemplate(MoneyFlowViewComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MoneyFlowViewComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MoneyFlowViewService);

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
    expect(comp.moneyFlowViews?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to moneyFlowViewService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getMoneyFlowViewIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getMoneyFlowViewIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
