import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-custom-timepicker',
  templateUrl: './custom-timepicker.component.html',
  styleUrls: ['./custom-timepicker.component.scss']
})
export class CustomTimepickerComponent {
  selectedHour = 4;
  selectedMinute = 40;
  isSelectingHour = true;
  meridian: 'AM' | 'PM' = 'AM';

  manualTimeInput = '04:40';

  @Output() timeSelected = new EventEmitter<string>();

  get displayTime(): string {
    return `${this.selectedHour.toString().padStart(2, '0')}:${this.selectedMinute.toString().padStart(2, '0')}`;
  }

  setMeridian(value: 'AM' | 'PM') {
    if (this.meridian !== value) {
      if (value === 'PM' && this.selectedHour < 12) {
        // this.selectedHour += 12;
      } else if (value === 'AM' && this.selectedHour >= 12) {
        this.selectedHour -= 12;
        if (this.selectedHour === 0) {
          this.selectedHour = 12;
        }
      }
      this.meridian = value;
      this.updateManualInput();
      // this.emitTime();
    }
  }


  selectHour(hour: number) {
    this.selectedHour = hour;
    this.isSelectingHour = false;
    this.updateManualInput();
  }

  selectMinute(min: number) {
    this.selectedMinute = min;
    this.updateManualInput();
    this.emitTime();
  }

  emitTime() {
    let hour = this.selectedHour;
    if (this.meridian === 'PM' && hour < 12) hour += 12;
    if (this.meridian === 'AM' && hour === 12) hour = 0;

    const time = `${hour.toString().padStart(2, '0')}:${this.selectedMinute.toString().padStart(2, '0')}`;
    this.timeSelected.emit(time);
  }

  updateManualInput() {
    this.manualTimeInput = this.displayTime;
  }

  onManualTimeBlur() {
    const regex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
    if (regex.test(this.manualTimeInput)) {
      const [h, m] = this.manualTimeInput.split(':').map(Number);
      this.selectedHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
      this.meridian = h >= 12 ? 'PM' : 'AM';
      this.selectedMinute = m;
      this.emitTime();
    } else {
      alert('Invalid time format. Please use HH:MM.');
      this.updateManualInput(); // Reset to valid
    }
  }
}
