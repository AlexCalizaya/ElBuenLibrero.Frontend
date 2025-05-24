import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDataModalComponent } from './client-data-modal.component';

describe('ClientDataModalComponent', () => {
  let component: ClientDataModalComponent;
  let fixture: ComponentFixture<ClientDataModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDataModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
