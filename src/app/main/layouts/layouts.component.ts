import { Component, OnInit } from '@angular/core';
import { GetUserService } from 'src/app/get-user.service';
import { User } from 'src/interfaces/user';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsMainComponent implements OnInit {

  constructor(private userService: GetUserService) { }
  user: User = {email: '', password: ''}
  ngOnInit(): void {    
    this.userService.findUserById(String(localStorage.getItem('id'))).subscribe(data => {      
      this.user = data
    })
  }
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
  }
}
