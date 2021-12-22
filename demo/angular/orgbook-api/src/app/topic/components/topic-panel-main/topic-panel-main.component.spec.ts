import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPanelMainComponent } from './topic-panel-main.component';

describe('TopicPanelMainComponent', () => {
  let component: TopicPanelMainComponent;
  let fixture: ComponentFixture<TopicPanelMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicPanelMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicPanelMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
