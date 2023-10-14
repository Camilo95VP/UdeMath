/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Banner1Component } from './banner1.component';

describe('Banner1Component', () => {
  let component: Banner1Component;
  let fixture: ComponentFixture<Banner1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Banner1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Banner1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
