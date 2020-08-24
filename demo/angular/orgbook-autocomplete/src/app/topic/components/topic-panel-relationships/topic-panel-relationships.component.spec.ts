import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPanelRelationshipsComponent } from './topic-panel-relationships.component';

describe('TopicPanelRelationshipsComponent', () => {
  let component: TopicPanelRelationshipsComponent;
  let fixture: ComponentFixture<TopicPanelRelationshipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicPanelRelationshipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicPanelRelationshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
