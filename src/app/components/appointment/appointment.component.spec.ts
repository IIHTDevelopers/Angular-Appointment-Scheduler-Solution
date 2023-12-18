import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppointmentComponent } from './appointment.component';

describe('AppointmentComponent', () => {
  let component: AppointmentComponent;
  let fixture: ComponentFixture<AppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have form fields for adding an appointment', () => {
      const compiled = fixture.nativeElement;
      const formFields = compiled.querySelectorAll('form input');
      expect(formFields.length).toBe(4);
    });

    it('should have a button for adding an appointment', () => {
      const compiled = fixture.nativeElement;
      const addButton = compiled.querySelector('form button[type="submit"]');
      expect(addButton.textContent).toContain('Add Appointment');
    });

    it('should display search input for filtering appointments', () => {
      const compiled = fixture.nativeElement;
      const searchInput = compiled.querySelector('div:nth-child(3) input[type="text"]');
      expect(searchInput).toBeTruthy();
    });

    it('should display edit appointment form when editing an appointment', () => {
      component.isEditing = true;
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const editForm = compiled.querySelector('div:nth-child(5) form');
      expect(editForm).toBeTruthy();
      const saveButton = editForm.querySelector('button[type="submit"]');
      const cancelButton = editForm.querySelector('button[type="button"]');
      expect(saveButton.textContent).toContain('Save');
      expect(cancelButton.textContent).toContain('Cancel');
    });

    it('should have initial appointments array empty', () => {
      expect(component.appointments).not.toBeNull();
      expect(component.appointments).toEqual([]);
    });

    it('should add a new appointment', () => {
      component.newAppointment = {
        id: 1,
        date: '2023-12-25',
        time: '10:00',
        description: 'General check-up',
        name: ''
      };
      component.addAppointment();
      expect(component.appointments).not.toBeNull();
      expect(component.appointments.length).toBe(1);
    });

    it('should not add an appointment with empty fields', () => {
      component.newAppointment = {
        id: 0,
        date: '',
        time: '',
        description: '',
        name: ''
      };
      component.addAppointment();
      expect(component.appointments).not.toBeNull();
      expect(component.appointments.length).toBe(1);
    });

    it('should edit an appointment and update it', () => {
      component.newAppointment = {
        id: 1,
        date: '2023-12-25',
        time: '10:00',
        description: 'General check-up',
        name: ''
      };
      component.addAppointment();

      component.editAppointment(component.appointments[0]);
      const updatedAppointment = {
        id: component.appointments[0].id,
        date: '2023-12-26',
        time: '11:00',
        description: 'Follow-up visit',
        name: ''
      };
      component.editedAppointment = { ...updatedAppointment };
      component.saveEditedAppointment();
      expect(component.appointments).not.toBeNull();
      expect(component.appointments[0]).not.toBeNull();
      expect(component.appointments[0]).toEqual(updatedAppointment);
    });

    it('should not edit an appointment with empty fields', () => {
      component.newAppointment = {
        id: 1,
        date: '2023-12-25',
        time: '10:00',
        description: 'General check-up',
        name: ''
      };
      component.addAppointment();

      component.editAppointment(component.appointments[0]);
      const originalAppointment = { ...component.appointments[0] };
      component.newAppointment = {
        id: originalAppointment.id,
        date: '',
        time: '',
        description: '',
        name: ''
      };
      component.saveEditedAppointment();
      expect(component.appointments).not.toBeNull();
      expect(component.appointments[0]).not.toBeNull();
      expect(component.appointments[0]).toEqual(originalAppointment);
    });

    it('should delete an appointment', () => {
      component.newAppointment = {
        id: 1,
        date: '2023-12-25',
        time: '10:00',
        description: 'General check-up',
        name: ''
      };
      component.addAppointment();

      expect(component.appointments).not.toBeNull();
      expect(component.appointments.length).toBe(1);
      component.deleteAppointment(component.appointments[0]);
      expect(component.appointments.length).toBe(0);
    });

    it('should cancel editing an appointment', () => {
      component.editAppointment({
        id: 1,
        date: '2023-12-25',
        time: '10:00',
        description: 'General check-up',
        name: ''
      });
      component.cancelEdit();
      expect(component.isEditing).toBe(false);
      expect(component.editedAppointment).toEqual({});
    });

    it('should filter appointments based on search keyword', () => {
      component.newAppointment = {
        id: 1,
        date: '2023-12-25',
        time: '10:00',
        description: 'General check-up',
        name: ''
      };
      component.addAppointment();

      component.searchKeyword = 'check-up';
      expect(component.filteredAppointments.length).toBe(1);

      component.searchKeyword = 'Follow-up';
      expect(component.filteredAppointments.length).toBe(0);
    });
  });
});
