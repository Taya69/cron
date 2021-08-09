import { Component, OnInit } from '@angular/core';
import { GetUserService } from 'src/app/get-user.service';
import { User } from 'src/interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: GetUserService) { }
  labelPosition: 'before' | 'after' = 'after';
  ngOnInit(): void {
   this.userService.getFirstSetting().subscribe(data => {
     data.methodOfSaving === 'base' ? this.labelPosition = 'after' : this.labelPosition = 'before'
   })
  }
  setSettings() {
    let methodOfSaving = this.labelPosition === 'before'? 'file' : 'base'
    this.userService.getFirstSetting().subscribe(data => {
      this.userService.updateSetting(data._id!, {methodOfSaving: methodOfSaving}).subscribe()
    })
  }
}
