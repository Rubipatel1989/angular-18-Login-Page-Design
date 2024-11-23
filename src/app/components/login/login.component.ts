import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('formContainer', { static: true }) formContainer!: ElementRef;
  @ViewChild('logoBox', { static: true }) logoBox!: ElementRef;
  @ViewChild('logoImage', { static: true }) logoImage!: ElementRef;
  @ViewChild('loginBox', { static: true }) loginBox!: ElementRef;
  @ViewChild('loginButton', { static: true }) loginButton!: ElementRef;


  email: string = '';
  password: string = '';
  submitState: 'default' | 'loading' | 'done' = 'default';
  showPassword: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) { }
  ngAfterViewInit() {
    const timeline = gsap.timeline();

    // Top Animated Text
    timeline.from('.animated-title', {
      opacity: 0,
      y: -50, // Slide in from top
      duration: 1,
      ease: 'bounce.out',
    });

    // Step 1: Animate Logo Box with Scale and Bounce
    timeline.from(this.logoBox.nativeElement, {
      opacity: 0,
      scale: 0.5, // Zoom-in effect
      y: -50, // Slide from above
      duration: 1.2,
      ease: 'elastic.out(1, 0.5)',
    });

    // Step 2: Animate Logo Image with Fade and Scale
    timeline.from(this.logoImage.nativeElement, {
      opacity: 0,
      scale: 0.7, // Subtle zoom-in effect
      duration: 0.8,
      ease: 'power2.out',
    });

    // Step 3: Animate Login Box with Elastic Slide-In
    timeline.from(this.loginBox.nativeElement, {
      opacity: 0,
      x: 100, // Slide from the right
      duration: 1,
      ease: 'elastic.out(1, 0.5)', // Elastic bounce effect
    });

    // Step 4: Staggered Input Fields Animation with Rotation
    timeline.from('.form-group', {
      opacity: 0,
      y: 50, // Slide from below
      rotation: 10, // Subtle rotation
      duration: 0.6,
      stagger: 0.2, // Staggered effect
      ease: 'back.out(1.7)', // Smooth bounce effect
    });

    // Step 5: Animate Submit Button with Bounce
    timeline.from(this.loginButton.nativeElement, {
      opacity: 0,
      scale: 0.8, // Zoom-in effect
      y: -50, // Drop-in from above
      duration: 0.8,
      ease: 'bounce.out',
    });

    // Optional: Add subtle hover effect on the button after animation
    timeline.to(this.loginButton.nativeElement, {
      scale: 1.05,
      repeat: -1, // Infinite repeat
      yoyo: true, // Back and forth
      duration: 1,
      ease: 'power1.inOut',
      delay: 1, // Add a slight delay after the initial animation
    });
  }
  



  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    this.submitState = 'loading';

    setTimeout(() => {
      this.submitState = 'done';
      this.router.navigate(['/home']);
    }, 2000); // Simulate login success
  }
}
