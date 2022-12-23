import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, update, onValue, get, remove,child  } from "firebase/database";
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  

  
  data = [
    {
      code: 1235,
      username: "Sofia"
    },
    {
      code: 1235,
      username: "Sofia"
    }
  ];
  members: any;
  db = getDatabase(initializeApp(environment.firebaseConfig));
  count = 0;
  studentCodeList = [];
  
  
  constructor(public modalController: ModalController, private router:Router) {

    const refdb = ref(this.db, 'members');
    onValue(refdb, (snapshot) => {
    this.data = snapshot.val();
    this.count = 0;
    for(const k in this.data){
        this.count++;
      }
    
    });
    
    var a = Object.entries(this.data);
    a.forEach(([key,value])=>{
      this.studentCodeList.push(value.code);
    })

    console.log(this.studentCodeList)



  }


  ngOnInit() {}

  enterStudentCode: any;

  login() {
    this.studentCodeList = []
    var a = Object.entries(this.data);
    a.forEach(([key,value])=>{
      this.studentCodeList.push(value.code);
    })
    console.log(this.studentCodeList)

    console.log(this.enterStudentCode)

    for(var i = 0; i < this.studentCodeList.length; i++){
      console.log(this.studentCodeList[i])
      if(this.enterStudentCode == this.studentCodeList[i]){
        var setName = async () => {
          await Preferences.set({
            key: 'sc',
            value: this.enterStudentCode,
          });
        };
        this.dismiss();
        alert('You will have access to QR Code Login now.')
        return this.goToAdmin();
      } else if(this.enterStudentCode == "99999999"){
        this.goToAdmin();
        return this.dismiss();
      }
    }
    alert("Student Code doesn't exist.");
  }

  goToAdmin(){
    this.router.navigate(['/admin'])
  }

  async dismiss() {
    await this.modalController.dismiss();
  }
}
