import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPanelCredentialsComponent } from './topic-panel-credentials.component';

describe('TopicPanelCredentialsComponent', () => {
  let component: TopicPanelCredentialsComponent;
  let fixture: ComponentFixture<TopicPanelCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicPanelCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicPanelCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
