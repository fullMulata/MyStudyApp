import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tomato } from './tomato';

describe('Tomato', () => {
  let component: Tomato;
  let fixture: ComponentFixture<Tomato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tomato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tomato);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
