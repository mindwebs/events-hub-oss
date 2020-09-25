import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketanalyticsComponent } from './ticketanalytics.component';

describe('TicketanalyticsComponent', () => {
  let component: TicketanalyticsComponent;
  let fixture: ComponentFixture<TicketanalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketanalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
