import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewitemformComponent } from './newitemform.component';

describe('NewitemformComponent', () => {
  let component: NewitemformComponent;
  let fixture: ComponentFixture<NewitemformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewitemformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewitemformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
