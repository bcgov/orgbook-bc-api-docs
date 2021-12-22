import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTopicFacetListComponent } from './search-topic-facet-list.component';

describe('SearchTopicFacetListComponent', () => {
  let component: SearchTopicFacetListComponent;
  let fixture: ComponentFixture<SearchTopicFacetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTopicFacetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTopicFacetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
