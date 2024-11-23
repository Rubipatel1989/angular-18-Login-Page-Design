import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('formContainer', { static: true }) formContainer!: ElementRef;
  registerObj: any = {
    first_name: '',
    last_name:'',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };
  successMessage: string = '';
  errorMessage: string = '';
  formValue: any;
  ngAfterViewInit() {
    // Animate the form container
    gsap.to(this.formContainer.nativeElement, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.2
    });

    // Animate the form groups
    gsap.to('.form-group', {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.2,
      delay: 0.5,
    });

    // Animate the buttons
    gsap.to('.btn', {
      scale: 0,
      duration: 0.5,
      ease: 'back.out(1.7)',
      stagger: 0.2,
      delay: 1.5
    });

  }


  onRegister() {
    this.formValue = this.registerObj;
    if (this.registerObj.password !== this.registerObj.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    console.log("Form Submitted", this.registerObj);
  }

  onReset(form: any) {
    form.resetForm();
    this.registerObj = {
      first_name: '',
      last_name:'',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    };
    this.successMessage = '';
    this.errorMessage = '';
  }

  imagePreview: string | null = '/assets/images/profileImages/ProfileImage.png';


  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

}
