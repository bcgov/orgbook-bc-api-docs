import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTopicListNavComponent } from './search-topic-list-nav.component';

describe('SearchTopicListNavComponent', () => {
  let component: SearchTopicListNavComponent;
  let fixture: ComponentFixture<SearchTopicListNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTopicListNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTopicListNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
