import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MoneyFlowViewDetailComponent } from './money-flow-view-detail.component';

describe('MoneyFlowView Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneyFlowViewDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: MoneyFlowViewDetailComponent,
              resolve: { moneyFlowView: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(MoneyFlowViewDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load moneyFlowView on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', MoneyFlowViewDetailComponent);

      // THEN
      expect(instance.moneyFlowView).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
