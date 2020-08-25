import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedTopicCardComponent } from './related-topic-card.component';

describe('RelatedTopicCardComponent', () => {
  let component: RelatedTopicCardComponent;
  let fixture: ComponentFixture<RelatedTopicCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedTopicCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedTopicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
