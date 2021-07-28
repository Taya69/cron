import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetUserService } from 'src/app/get-user.service';
import { Location } from '@angular/common';
import { User } from 'src/interfaces/user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {  
  
  email: string = ''
  password: string = ''
  firstName: string | undefined = '';
  lastName: string | undefined = '';
  user1: User = {email: '', password: ''};
  edit: boolean = true; 
  labelPosition: 'before' | 'after' = 'after';
  constructor( private userService: GetUserService, private location: Location, private fb: FormBuilder,
   private http: HttpClient ) { }
 
   loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(1)]]
  })
  ngOnInit(): void {    
    const id = String(localStorage.getItem('id')); 
     this.userService.findUserById(id).subscribe(data => {
       this.user1 = data
       this.email = data.email
       this.password = data.password
       this.firstName = data.firstName
       this.lastName = data.lastName
     }) 
  }
  
  goBack () {
    this.location.back();
  }
  save () {
   if (!this.edit) { return}   
    this.userService.editUser({
      email: this.email,       
      firstName: this.firstName,
      lastName: this.lastName
    }, this.user1._id!).subscribe() 
   }  
}
