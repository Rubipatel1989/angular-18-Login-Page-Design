import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  userRole: string = 'Admin';
  isEditingFirstName: boolean = false;
  isEditingEmail: boolean = false;
  isEditingPhone: boolean = false;

  password: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;

  previewImage: string | null = null; // Holds the preview image URL

  user = {
    userDetails: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      image: '' // Image filename
    }
  };

  // Toggles edit mode for specific fields
  toggleEdit(field: 'isEditingFirstName' | 'isEditingEmail' | 'isEditingPhone'): void {
    this[field] = !this[field];
  }

  // Handle form submission
  submitForm(): void {
    if (this.password !== this.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }
    this.passwordMismatch = false;

    console.log('Updated User:', this.user.userDetails);
    console.log('Password:', this.password ? 'Updated' : 'Not updated');
  }

  // Handle file change for profile photo
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result; // Set the preview image
      };
      reader.readAsDataURL(file);

      console.log('Selected file:', file.name);
      // Simulate setting the uploaded file name (adjust this based on your backend logic)
      this.user.userDetails.image = file.name;
    }
  }
}
