import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

interface Student {
  name: string;
  avatar: string;
  department: string;
  year: string;
  arrears: number;
  status: string;
}
@Component({
  selector: 'app-available-students',
  standalone: false,
  templateUrl: './available-students.component.html',
  styleUrl: './available-students.component.scss'
})
export class AvailableStudentsComponent {
  searchControl = new FormControl('');
  students: Student[] = [
    {
      name: 'Raj Kumar',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      department: 'Automobile',
      year: '3 (6)',
      arrears: 0,
      status: 'Available'
    },
    {
      name: 'Davis Calzoni',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      department: 'Computer Science',
      year: '2 (4)',
      arrears: 3,
      status: 'Available'
    },
    {
      name: 'Mira Donin',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      department: 'Electrical and Electronics',
      year: '3 (6)',
      arrears: 2,
      status: 'Available'
    },
    {
      name: 'Kaiya Siphron',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      department: 'Information Technology',
      year: '3 (6)',
      arrears: 1,
      status: 'Available'
    },
    {
      name: 'Terry Bator',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      department: 'Metallurgical',
      year: '3 (6)',
      arrears: 5,
      status: 'Available'
    },
    {
      name: 'Desirae Kenter',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      department: 'Mining',
      year: '3 (6)',
      arrears: 2,
      status: 'Available'
    },
    {
      name: 'Haylie Botosh',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      department: 'Robotics',
      year: '3 (6)',
      arrears: 0,
      status: 'Available'
    }
  ];
}
