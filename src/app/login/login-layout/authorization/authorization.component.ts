import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { GetUserService } from '../../../get-user.service'
import {Router} from '@angular/router'
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { A11yModule } from '@angular/cdk/a11y';
import { User } from 'src/interfaces/user';


@Component({
  selector: 'app-login',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  user: User = {email: '', password: ''}
  hide: boolean = true;
  email1: string = '';
  password: string = ''
  constructor(private fb: FormBuilder, private userService: GetUserService, private router: Router, public dialog: MatDialog) {
  }
  ngOnInit() {
        
  } 
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(1)]]
  }) 
  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }    
    this.userService.login(this.email1, this.password).subscribe((data)=> {
     
      if (data === undefined){
        this.dialog.open(DialogDataExampleDialog);
                  return     
              } else {
                this.router.navigate(['/home'])
                localStorage.setItem("token", String(data.token))
                localStorage.setItem("id", data.user._id!)             
              }
            }          
    )
  }
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}