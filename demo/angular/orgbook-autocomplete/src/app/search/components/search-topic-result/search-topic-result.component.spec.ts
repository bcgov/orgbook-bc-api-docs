import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTopicResultComponent } from './search-topic-result.component';

describe('SearchTopicResultComponent', () => {
  let component: SearchTopicResultComponent;
  let fixture: ComponentFixture<SearchTopicResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTopicResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTopicResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
