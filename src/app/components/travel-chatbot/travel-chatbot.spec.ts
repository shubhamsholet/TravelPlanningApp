import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelChatbot } from './travel-chatbot';

describe('TravelChatbot', () => {
  let component: TravelChatbot;
  let fixture: ComponentFixture<TravelChatbot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelChatbot],
    }).compileComponents();

    fixture = TestBed.createComponent(TravelChatbot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
