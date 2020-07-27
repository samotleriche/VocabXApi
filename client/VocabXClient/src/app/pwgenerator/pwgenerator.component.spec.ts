import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwgeneratorComponent } from './pwgenerator.component';

describe('PwgeneratorComponent', () => {
  let component: PwgeneratorComponent;
  let fixture: ComponentFixture<PwgeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwgeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwgeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
