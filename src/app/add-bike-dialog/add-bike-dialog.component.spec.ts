import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBikeDialogComponent } from './add-bike-dialog.component';

describe('AddBikeDialogComponent', () => {
  let component: AddBikeDialogComponent;
  let fixture: ComponentFixture<AddBikeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBikeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBikeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
