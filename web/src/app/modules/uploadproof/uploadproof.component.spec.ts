import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadproofComponent } from './uploadproof.component';

describe('UploadproofComponent', () => {
  let component: UploadproofComponent;
  let fixture: ComponentFixture<UploadproofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadproofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadproofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
