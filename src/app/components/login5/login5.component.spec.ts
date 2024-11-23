import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login5Component } from './login5.component';

describe('Login5Component', () => {
  let component: Login5Component;
  let fixture: ComponentFixture<Login5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
