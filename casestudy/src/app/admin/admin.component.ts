import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileServiceService } from '../profile-service.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private http:HttpClientModule,private connectserver:ProfileServiceService) { }
  ngOnInit(): void {}
  message:any;
  form=new FormGroup({
    name:new FormControl("",[Validators.required, Validators.minLength(3)]),
    email: new FormControl("",[ Validators.required,Validators.email]),
    password:new FormControl("",[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
      Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    ]),
      confirmpassword:new FormControl("",[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
        Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    
    ])
  })

  //getting formcontrol value
  get f(){
    return this.form.controls;
  }

  submit(){
    if(this.form.value.password===this.form.value.confirmpassword)
    {
    this.connectserver.postadmin(this.form.value).subscribe(data=>{
      console.log(this.form.value); 
      console.log(data);
      this.message="submitted successfully!"
    })
  }  else {
    this.message="password mismatch!!";
  }
  }
}
