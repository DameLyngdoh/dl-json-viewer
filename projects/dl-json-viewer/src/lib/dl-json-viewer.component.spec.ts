import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlJsonViewerComponent } from './dl-json-viewer.component';

describe('DlJsonViewerComponent', () => {
  let component: DlJsonViewerComponent;
  let fixture: ComponentFixture<DlJsonViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlJsonViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlJsonViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
