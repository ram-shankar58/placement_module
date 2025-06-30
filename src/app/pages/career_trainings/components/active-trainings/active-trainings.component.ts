import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone:false,
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
  trainingTypes: string[] = ['Technical', 'Soft Skills', 'Aptitude', 'HR', 'Other'];

  modeOfTraining = 'On-campus';

  trainings = [
    {
      date: new Date(2024, 4, 12),
      type: 'Soft Skills',
      title: 'Resume Building Workshop',
      description: 'Learn to craft ATS-friendly resumes tailored for top companies.',
      mode: 'On-campus',
      venue: 'Seminar Hall, ABC Engineering College',
      startTime: '10:00',
      endTime: '12:00',
      batches: '2024, 2025',
      trainer: 'Arvind Kumar',
      recurring: true
    },
    {
      date: new Date(2024, 4, 16),
      type: 'Group Discussion (GD)',
      title: 'Inceptos',
      description: 'Maui he tatai hei whakamanaahia i na oke pukenga...',
      mode: 'Virtual',
      venue: 'Lacinia aliquam convallis',
      startTime: '10:00',
      endTime: '12:00',
      batches: '2024, 2025',
      trainer: 'Arvind Kumar',
      recurring: false
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addTrainingForm = this.fb.group({
      trainingTitle: ['', Validators.required],
      trainingDescription: [''],
      modeOfTraining: [this.modeOfTraining, Validators.required],
      trainingDate: [null, Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      venue: [''],
      batches: [[]],
      trainerName: ['']
    });
    const currentYear=new Date().getFullYear();
    this.batchesList= [
      (currentYear-1).toString(),
      (currentYear).toString(),
      (currentYear+1).toString(),
      (currentYear+2).toString()
    ]
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
        batches: []
      });
      this.selectedBatches = [];
    }
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

  // Form submission
  onSubmit() {
    if (this.addTrainingForm.invalid) {
      // Show error or toast
      return;
    }
    const formValue = this.addTrainingForm.value;
    // Handle form submission logic here
    // For example, add to trainings array or send to API
    this.issidebarvisible = false;
  }
}