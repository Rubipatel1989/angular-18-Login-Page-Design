import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-login6',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login6.component.html',
  styleUrl: './login6.component.css'
})
export class Login6Component implements AfterViewInit {
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

    // Intro Animation for the Logo (initial introAnimation)
    timeline
      .to('.intro-logo', {
        opacity: 1,
        scale: 1.2,
        duration: 0.2,
        ease: 'power3.out',
      })
      .to('.intro-logo', {
        scale: 0.8,
        duration: 0.2,
        ease: 'power3.inOut',
      })
      .to('#introAnimation', {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
        onComplete: () => {
          document.getElementById('introAnimation')?.remove();
        },
      });

    // Top Logo Animation
    timeline.from(this.logoImage.nativeElement, {
      opacity: 0, // Fade in effect
      scale: 0.5, // Scale from smaller size
      y: -30, // Slide in from top
      duration: 1,
      ease: 'bounce.out', // Bounce effect
      delay: 0.2, // Slight delay after intro animation
    });

    // Animation for Login Box
    timeline.from(this.loginBox.nativeElement, {
      opacity: 0,
      scale: 0.5, // Scale effect
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)', // Elastic bounce effect
    });

    // Animation for Input Fields
    timeline.from('.form-group', {
      opacity: 0,
      scale: 0.5, // Scale effect
      duration: 0.6,
      stagger: 0.2, // Sequential animation
      ease: 'elastic.out(1, 0.5)', // Smooth bounce effect
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
