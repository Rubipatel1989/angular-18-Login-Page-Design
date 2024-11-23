import { CommonModule, JsonPipe } from '@angular/common';
import { Component,ElementRef,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';

@Component({
  selector: 'app-profile-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.css'
})
export class ProfileUpdateComponent {
  @ViewChild('formContainer', { static: true }) formContainer!: ElementRef;
  @ViewChild('imageContainer', { static: true }) imageContainer!: ElementRef;
  
  user = {
    userDetails: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '1234567890',
      image: null,
      role: 0,
    },
  };

  profileObj: any = {
    name: this.user.userDetails.name,
    email: this.user.userDetails.email,
    phone: this.user.userDetails.phone,
    password: '',
    confirmPassword: '',
  };

  profilePhoto: File | null = null;
  imagePreview: string | null = this.user.userDetails.image
    ? `/images/profileImages/${this.user.userDetails.image}`
    : '/assets/images/profileImages/ProfileImage.png';

  errorMessage: string = '';
  successMessage: string = '';
  formValue: any;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    // Animate the form elements
    gsap.from(this.formContainer.nativeElement, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.2,
    });

    gsap.from('.form-group', {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.2,
      delay: 0.5,
    });

    gsap.from('.btn', {
      scale: 0,
      duration: 0.5,
      ease: 'back.out(1.7)',
      stagger: 0.2,
      delay: 1.5,
    });

    // Animate the left-hand image container
    gsap.from(this.imageContainer.nativeElement, {
      opacity: 0,
      x: -100,
      duration: 1,
      ease: 'power2.out',
      delay: 0.3,
    });
  }

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files?.[0]) {
      this.profilePhoto = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result as string);
      reader.readAsDataURL(this.profilePhoto);
    }
  }

  onUpdate() {
    if (this.profileObj.password !== this.profileObj.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.profileObj.name);
    formData.append('email', this.profileObj.email);
    formData.append('phone', this.profileObj.phone);

    if (this.profileObj.password) {
      formData.append('password', this.profileObj.password);
    }

    if (this.profilePhoto) {
      formData.append('profile_photo', this.profilePhoto);
    }

    this.http.post('/update-profile', formData).subscribe(
      (response: any) => {
        if (response.success) {
          this.successMessage = response.message;
          this.errorMessage = '';
        } else {
          this.successMessage = '';
          this.errorMessage = response.message;
        }
      },
      (error) => {
        this.successMessage = '';
        this.errorMessage = 'An error occurred while updating the profile.';
      }
    );
  }

  onReset(form: any) {
    form.resetForm();
    this.profileObj = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    };
    this.profilePhoto = null;
    this.imagePreview = '/images/ProfileImage.png';
    this.successMessage = '';
    this.errorMessage = '';
  }
}
