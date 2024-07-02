import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MtsIncomeDetailComponent } from './mts-income-detail.component';

describe('MtsIncome Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MtsIncomeDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: MtsIncomeDetailComponent,
              resolve: { mtsIncome: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(MtsIncomeDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load mtsIncome on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', MtsIncomeDetailComponent);

      // THEN
      expect(instance.mtsIncome).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
