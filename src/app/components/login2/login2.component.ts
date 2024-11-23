import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-login2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login2.component.html',
  styleUrl: './login2.component.css'
})
export class Login2Component implements AfterViewInit {
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

    // Step 1: Intro Animation
    timeline
      .to('.intro-logo', {
        opacity: 1,
        scale: 1.2,
        duration: 0.5,
        ease: 'power3.out',
      })
      .to('.intro-logo', {
        scale: 0.8,
        duration: 0.5,
        ease: 'power3.inOut',
      })
      .to('#introAnimation', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          document.getElementById('introAnimation')?.remove();
        },
      });

    // Step 2: Top Animated Text
    timeline.from('.animated-title', {
      opacity: 0,
      y: -50, // Slide in from top
      duration: 0.5,
      ease: 'bounce.out',
    });

    // Step 3: Animate Logo Box with Scale and Bounce
    timeline.from(this.logoBox.nativeElement, {
      opacity: 0,
      scale: 0.5, // Zoom-in effect
      y: -50, // Slide from above
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });

    // Step 4: Animate Logo Image with Fade and Scale
    timeline.from(this.logoImage.nativeElement, {
      opacity: 0,
      scale: 0.7, // Subtle zoom-in effect
      duration: 0.5,
      ease: 'power2.out',
    });

    // Step 5: Animate Login Box with Elastic Slide-In
    timeline.from(this.loginBox.nativeElement, {
      opacity: 0,
      x: 100, // Slide from the right
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)', // Elastic bounce effect
    });

    // Step 6: Staggered Input Fields Animation with Rotation
    timeline.from('.form-group', {
      opacity: 0,
      y: 50, // Slide from below
      rotation: 10, // Subtle rotation
      duration: 0.5,
      stagger: 0.2, // Staggered effect
      ease: 'back.out(1.7)', // Smooth bounce effect
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
