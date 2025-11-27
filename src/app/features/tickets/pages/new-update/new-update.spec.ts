import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUpdate } from './new-update';

describe('NewUpdate', () => {
  let component: NewUpdate;
  let fixture: ComponentFixture<NewUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
