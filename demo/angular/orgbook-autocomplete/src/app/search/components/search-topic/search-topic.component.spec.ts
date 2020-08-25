import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTopicComponent } from './search-topic.component';

describe('SearchTopicComponent', () => {
  let component: SearchTopicComponent;
  let fixture: ComponentFixture<SearchTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
