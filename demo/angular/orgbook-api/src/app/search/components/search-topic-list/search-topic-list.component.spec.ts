import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTopicListComponent } from './search-topic-list.component';

describe('SearchTopicListComponent', () => {
  let component: SearchTopicListComponent;
  let fixture: ComponentFixture<SearchTopicListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTopicListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTopicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
