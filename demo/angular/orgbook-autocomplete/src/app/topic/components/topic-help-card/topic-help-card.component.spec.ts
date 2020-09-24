import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicHelpCardComponent } from './topic-help-card.component';

describe('TopicHelpCardComponent', () => {
  let component: TopicHelpCardComponent;
  let fixture: ComponentFixture<TopicHelpCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicHelpCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicHelpCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
