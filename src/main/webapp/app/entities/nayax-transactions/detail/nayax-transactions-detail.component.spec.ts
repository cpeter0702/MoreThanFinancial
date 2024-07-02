import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { NayaxTransactionsDetailComponent } from './nayax-transactions-detail.component';

describe('NayaxTransactions Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NayaxTransactionsDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: NayaxTransactionsDetailComponent,
              resolve: { nayaxTransactions: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(NayaxTransactionsDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load nayaxTransactions on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', NayaxTransactionsDetailComponent);

      // THEN
      expect(instance.nayaxTransactions).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
