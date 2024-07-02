import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { NayaxTransactionsService } from '../service/nayax-transactions.service';

import { NayaxTransactionsComponent } from './nayax-transactions.component';

describe('NayaxTransactions Management Component', () => {
  let comp: NayaxTransactionsComponent;
  let fixture: ComponentFixture<NayaxTransactionsComponent>;
  let service: NayaxTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'nayax-transactions', component: NayaxTransactionsComponent }]),
        HttpClientTestingModule,
        NayaxTransactionsComponent,
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
      .overrideTemplate(NayaxTransactionsComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NayaxTransactionsComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(NayaxTransactionsService);

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
    expect(comp.nayaxTransactions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to nayaxTransactionsService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getNayaxTransactionsIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getNayaxTransactionsIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
