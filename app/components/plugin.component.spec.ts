/* tslint:disable:no-unused-variable */
import { PluginComponent } from './plugin.component';

import { TestBed }      from '@angular/core/testing';

import { By }           from '@angular/platform-browser';

////////  SPECS  /////////////

/// Delete this
describe('Smoke test', () => {
  it('should run a passing test', () => {
    expect(true).toEqual(true, 'should pass');
  });
});

describe('PluginComponent with TCB', function () {
  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [PluginComponent]});
  });

  it('should instantiate component', () => {
    let fixture = TestBed.createComponent(PluginComponent);
    expect(fixture.componentInstance instanceof PluginComponent).toBe(true, 'should create PluginComponent');
  });

  it('should have expected <h1> text', () => {
    let fixture = TestBed.createComponent(PluginComponent);
    fixture.detectChanges();

    let h1 = fixture.debugElement.query(el => el.name === 'h1').nativeElement;  // it works

        h1 = fixture.debugElement.query(By.css('h1')).nativeElement;            // preferred

    expect(h1.innerText).toMatch(/angular app/i, '<h1> should say something about "Angular App"');
  });
});
