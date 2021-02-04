import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHelpCardComponent } from './search-help-card.component';

describe('SearchHelpCardComponent', () => {
  let component: SearchHelpCardComponent;
  let fixture: ComponentFixture<SearchHelpCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchHelpCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHelpCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
