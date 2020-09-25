import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenForgotComponent } from './token-forgot.component';

describe('TokenForgotComponent', () => {
  let component: TokenForgotComponent;
  let fixture: ComponentFixture<TokenForgotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenForgotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
