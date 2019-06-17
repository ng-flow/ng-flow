import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { subscription } from '@testing/test-subscription';
import { HostData } from './host-data';
import { HostComponent } from './host.component';
import { HostService } from './host.service';

describe('LocalStore (integration tests)', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: HostComponent;
  let service: HostService;
  let http: HttpTestingController;

  beforeEach(async(() =>
    TestBed
      .configureTestingModule({
        declarations: [HostComponent],
        imports: [HttpClientTestingModule],
      })
      .compileComponents(),
  ));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(HostService);
    http = TestBed.get(HttpTestingController);

    fixture.detectChanges();
  });

  it('should has initial state', () => {
    const loaded = subscription(component.loaded$);
    const loading = subscription(component.loading$);
    const error = subscription(component.error$);
    const data = subscription(component.data$);

    expect(loaded.values).toEqual([false]);
    expect(loading.values).toEqual([false]);
    expect(error.values).toEqual([null]);
    expect(data.values).toEqual([null]);
  });

  it('should update state', () => {
    const item1 = fixture.debugElement.query(By.css('#item-1'));
    const item2 = fixture.debugElement.query(By.css('#item-2'));

    const loadedSub = subscription(component.loaded$);
    const loadingSub = subscription(component.loading$);
    const errorSub = subscription(component.error$);
    const dataSub = subscription(component.data$);

    item1.triggerEventHandler('click', {});

    expect(loadedSub.values).toEqual([false]);
    expect(loadingSub.values).toEqual([false, true]);
    expect(errorSub.values).toEqual([null]);
    expect(dataSub.values).toEqual([null]);

    const data1: HostData = {value: 'TEST_1'};
    http.expectOne('data/1').flush(data1);

    expect(loadedSub.values).toEqual([false, true]);
    expect(loadingSub.values).toEqual([false, true, false]);
    expect(errorSub.values).toEqual([null]);
    expect(dataSub.values).toEqual([null, data1]);

    item2.triggerEventHandler('click', {});

    expect(loadedSub.values).toEqual([false, true]);
    expect(loadingSub.values).toEqual([false, true, false, true]);
    expect(errorSub.values).toEqual([null]);
    expect(dataSub.values).toEqual([null, data1]);

    const data2: HostData = {value: 'TEST_2'};
    http.expectOne('data/2').flush(data2);

    expect(loadedSub.values).toEqual([false, true]);
    expect(loadingSub.values).toEqual([false, true, false, true, false]);
    expect(errorSub.values).toEqual([null]);
    expect(dataSub.values).toEqual([null, data1, data2]);

    item1.triggerEventHandler('click', {});

    expect(loadedSub.values).toEqual([false, true]);
    expect(loadingSub.values).toEqual([false, true, false, true, false, true]);
    expect(errorSub.values).toEqual([null]);
    expect(dataSub.values).toEqual([null, data1, data2]);

    http.expectOne('data/1').flush({}, {status: 400, statusText: 'Bad request'});

    expect(loadedSub.values).toEqual([false, true]);
    expect(loadingSub.values).toEqual([false, true, false, true, false, true, false]);
    expect(errorSub.values.length).toEqual(2);
    expect(errorSub.values[1] instanceof HttpErrorResponse);
    expect(dataSub.values).toEqual([null, data1, data2]);
  });
});
