import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchaddComponent } from './branchadd.component';

describe('BranchaddComponent', () => {
  let component: BranchaddComponent;
  let fixture: ComponentFixture<BranchaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
