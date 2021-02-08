import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTopicFacetComponent } from './search-topic-facet.component';

describe('SearchTopicFacetComponent', () => {
  let component: SearchTopicFacetComponent;
  let fixture: ComponentFixture<SearchTopicFacetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTopicFacetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTopicFacetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
