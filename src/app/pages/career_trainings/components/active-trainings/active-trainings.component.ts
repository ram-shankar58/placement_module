import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { careerTrainingsSandbox } from '../../career_trainings.sandbox';
@Component({
  standalone: false,
  selector: 'app-active-trainings',
  templateUrl: './active-trainings.component.html',
  styleUrls: ['./active-trainings.component.scss']
})
export class ActiveTrainingsComponent implements OnInit {
  issidebarvisible = false;
  searchTerm = '';
  addTrainingForm!: FormGroup;

  showStartClock = false;
  showEndClock = false;

  batchDropdownOpen = false;
  selectedBatches: string[] = [];
  batchesList: string[] = [];
  batchInput: string = '';
  trainingTypes: string[] =  [
  'Soft Skills',
  'Group Discussion',
  'Aptitude & Reasoning',
  'Technical Skills'
];

  modeOfTraining = 'On-campus';

  trainings: any[] = [];

  constructor(
    private fb: FormBuilder,
    public careerTrainingsSandbox: careerTrainingsSandbox
  ) {}

  

  ngOnInit(): void {
    this.addTrainingForm = this.fb.group({
      trainingTitle: ['', Validators.required],
      trainingAbout: [''],
      trainingType: [''],
      modeOfTraining: ['On-campus'],
      trainingDate: [null],
      startTime: [''],
      endTime: [''],
      venue: [''],
      trainerName: [''],
      applicableBatches: [[]],
      recursiveTraining: [false],
      repeatTraining: ['Week'],
      selectDay: ['Monday'],
      repeatUntill: ['']
    });

    const currentYear = new Date().getFullYear();
    this.batchesList = [
      (currentYear - 1).toString(),
      currentYear.toString(),
      (currentYear + 1).toString(),
      (currentYear + 2).toString()
    ];

    // Fetch from backend
    this.careerTrainingsSandbox.careerTrainingList();
    this.careerTrainingsSandbox.careerTrainingList$.subscribe(data => {
      if (data && data.status === true && Array.isArray(data.data)) {
        this.trainings = data.data.map((item: any) => ({
          ...item, // <-- this keeps all backend fields for modal use
          id: item.careerId,
          title: item.trainingTitle,
          description: item.trainingAbout,
          type: item.trainingType,
          date: this.parseDDMMYYYY(item.trainingDate),
          mode: item.modeTraining,
          trainer: item.trainerName,
          batches: Array.isArray(item.applicableBatches) ? item.applicableBatches.map((b: string) => b.replace(/^Batch\s*/i, '').trim()).join(', ') : '',
          recurring: item.recursiveTraining,
          repeat: item.repeatTraining,
          day: item.selectDay,
          repeatUntil: item.repeatUntill
        }));
      }
    });
  }

  onBatchCheckboxChange(batch : string, event: Event){
    if((event.target as HTMLInputElement).checked){
      if(!this.selectedBatches.includes(batch)) this.selectedBatches.push(batch);
    }
    else{
      this.selectedBatches = this.selectedBatches.filter(b => b!==batch);
    }
    this.addTrainingForm.get('batches')?.setValue(this.selectedBatches);
  }

  toggleSidebar(): void {
    this.issidebarvisible = !this.issidebarvisible;
    if (this.issidebarvisible) {
      this.addTrainingForm.reset({
        modeOfTraining: this.modeOfTraining,
        batches: [],
        recursiveTraining: false
      });
      this.selectedBatches = [];
    }
  }

  // Add this helper method in your component
  parseDDMMYYYY(dateStr: string): Date | null {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  // Time picker handlers
  onStartTimeSelected(time: string) {
    this.addTrainingForm.get('startTime')?.setValue(time);
    this.showStartClock = false;
  }
  onEndTimeSelected(time: string) {
    this.addTrainingForm.get('endTime')?.setValue(time);
    this.showEndClock = false;
  }

  // Batch dropdown handlers
  toggleBatchDropdown() {
    this.batchDropdownOpen = !this.batchDropdownOpen;
  }
  toggleBatch(batch: string, event: Event) {
    event.stopPropagation();
    if (this.selectedBatches.includes(batch)) {
      this.selectedBatches = this.selectedBatches.filter(b => b !== batch);
    } else {
      this.selectedBatches.push(batch);
    }
    this.addTrainingForm.get('batches')?.setValue(this.selectedBatches);
  }

  closeBatchDropdown() {
    this.batchDropdownOpen = false;
  }

  removeBatch(batch: string, event: Event) {
    event.stopPropagation();
    this.selectedBatches = this.selectedBatches.filter(b => b !== batch);
    this.addTrainingForm.get('batches')?.setValue(this.selectedBatches);
  }

  addBatchFromInput() {
    const batch = this.batchInput.trim();
    if (batch && !this.selectedBatches.includes(batch)) {
      this.selectedBatches.push(batch);
      this.addTrainingForm.get('batches')?.setValue(this.selectedBatches);
    }
    this.batchInput = '';
  }

  // Mode selection
  setMode(mode: string) {
    this.modeOfTraining = mode;
    this.addTrainingForm.get('modeOfTraining')?.setValue(mode);
  }

  ngbDateToISO(dateObj: any): string | null{
    if(!dateObj) return null;
    const day=String(dateObj.day).padStart(2, '0');
    const month=String(dateObj.month).padStart(2,'0');
    const year = dateObj.year;
    return new Date(`${year}-${month}-${day}`).toISOString();
  }
  // Form submission
  onSubmit() {
    if (this.addTrainingForm.invalid) {
      return;
    }
    const formValue = this.addTrainingForm.value;
    const payload = {
      trainingTitle: formValue.trainingTitle,
      trainingAbout: formValue.trainingAbout,
      trainingType: formValue.trainingType,
      modeTraining: formValue.modeOfTraining,
      trainingDate: this.ngbDateToISO(formValue.trainingDate),
      startTime: formValue.startTime,
      endTime: formValue.endTime,
      venue: formValue.venue,
      trainerName: formValue.trainerName,
      applicableBatches: Array.isArray(formValue.applicableBatches) ? formValue.applicableBatches : (this.selectedBatches || []),
      recursiveTraining: formValue.recursiveTraining,
      repeatTraining: formValue.repeatTraining,
      selectDay: formValue.selectDay,
      repeatUntill: this.ngbDateToISO(formValue.repeatUntill)
    };
    this.careerTrainingsSandbox.addCareerTraining(payload);
    this.issidebarvisible = false;
    // Optionally, refresh the list after add
    setTimeout(() => this.careerTrainingsSandbox.careerTrainingList(), 500);
  }
    // Add this helper in your component:
  private ngbDateToString(dateObj: any): string | null {
    if (!dateObj) return null;
    const day = String(dateObj.day).padStart(2, '0');
    const month = String(dateObj.month).padStart(2, '0');
    const year = dateObj.year;
    return `${day}/${month}/${year}`;
  }

  // In your component class
selectedTraining: any = null;
isTrainingDetailPopupVisible = false;

openTrainingDetails(training: any) {
  this.selectedTraining = training;
  this.isTrainingDetailPopupVisible = true;
}

closeTrainingDetails() {
  this.isTrainingDetailPopupVisible = false;
  this.selectedTraining = null;
}



// Add this method to your component class
editTraining(training: any): void {
  // Implement your logic to edit the training here
  // For example, open the sidebar in edit mode and populate the form
  this.selectedTraining = training;
  this.issidebarvisible = true;
  // Populate the form with the selected training details if needed

}
}