import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileServiceService } from '../profile-service.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.css']
})
export class FarmerComponent implements OnInit {

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
    ]),
      description:new FormControl(""),
      bank_deatils:new FormGroup({
        account_number:new FormControl("",[Validators.required]),
        bank_name:new FormControl("",[Validators.required]),
        ifsc_code:new FormControl("",[Validators.required])
      })
      
  })

  //getting formcontrol value
  get f(){
    return this.form.controls;
  }

  submit(){
    if(this.form.value.password===this.form.value.confirmpassword)
    {
    this.connectserver.postdealer(this.form.value).subscribe(data=>{
      console.log(this.form.value); 
      console.log(data);
      this.message="submitted successfully!"
    })
  }  else {
    this.message="password mismatch!!";
  }
  }
}
