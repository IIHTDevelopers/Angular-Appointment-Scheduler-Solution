import { Component } from '@angular/core';

interface Appointment {
  id: number;
  name: string;
  date: string;
  time: string;
  description: string;
}

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
  appointments: Appointment[] = [];
  newAppointment: Appointment = {} as Appointment;
  editedAppointment: Appointment = {} as Appointment;
  isEditing = false;
  searchKeyword = '';

  constructor() { }

  addAppointment(): void {
    this.newAppointment.id = this.appointments.length + 1;
    this.appointments.push({ ...this.newAppointment });
    this.newAppointment = {} as Appointment;
  }

  editAppointment(appointment: Appointment): void {
    this.isEditing = true;
    this.editedAppointment = { ...appointment };
  }

  saveEditedAppointment(): void {
    const index = this.appointments.findIndex(appointment => appointment.id === this.editedAppointment.id);
    if (index !== -1) {
      this.appointments[index] = { ...this.editedAppointment };
    }
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editedAppointment = {} as Appointment;
  }

  deleteAppointment(appointment: Appointment): void {
    this.appointments = this.appointments.filter(item => item.id !== appointment.id);
  }

  get filteredAppointments(): Appointment[] {
    return this.appointments.filter(appointment =>
      appointment.description.toString().toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }
}
