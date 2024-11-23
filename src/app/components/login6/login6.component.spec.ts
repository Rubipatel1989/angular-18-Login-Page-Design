import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login6Component } from './login6.component';

describe('Login6Component', () => {
  let component: Login6Component;
  let fixture: ComponentFixture<Login6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login6Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
