import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, update, onValue, get, remove,child  } from "firebase/database";
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
  providers: [DatePipe]
})
export class AttendancePage implements OnInit {
  
  
  classes = [
    {
      className: "Maths",
      classTime:{
        '22-1-2222' : 
        {
          123124 : false,
          412312 : false
        },
        '21-5-1222' : {},
        '25-2-2222' : {}
      },
      studentCode:
      [
        123424,
        412312,
      ]
    },
    {
      className: "English",
      classTime:{
        '22-1-2222' : 
        {
          123124 : false,
          412312 : false
        },
        '21-5-1222' : {},
        '25-2-2222' : {}
      },
      studentCode:
      [
        123424,
        412312,
      ]
    },
  ]

  count = 0;

  db = getDatabase(initializeApp(environment.firebaseConfig));
  constructor(private datePipe: DatePipe, private router:Router) {
    const refdb = ref(this.db, 'classes');
      onValue(refdb, (snapshot) => {
      this.classes = snapshot.val();
      this.count = 0;
      for(const k in this.classes){
          this.count++;
      }
   });}

  

  currentClass = undefined;
  currentClassName: any;

  classTime = {
    'Waiting' : 
    {
      123124 : false,
      412312 : false
    },
  };

  newClassName: any;
  newclassTime: any;
  newAddclassTime: any;
  studentCode =
    {
      // 123424: false,
      // 412312: false
    };
  

  ngOnInit() {
    
  }

  goToAdmin(){
    this.router.navigate(['/admin'])
  }

  dateChange(value:any){
    this.newclassTime = value;
    console.log(this.newclassTime);
  }
  dateChange1(value:any){
    this.newAddclassTime = value;
    console.log(this.newAddclassTime);
  }
  
  handleChange(ev:any, ct:any){
    var a = ev.target;
    console.log(ct);
    var b = [];
    var count2 = 0;
    for(var k in ev.target.value){
      console.log(k);
      count2++;
    }
    for(var i = 0; i < count2; i++){
      a.value[i].value = !a.value[i].value;
      b.push(a.value[i].key);
    }
    // var b = [];
    console.log(a.value);
    console.log(b);

    var d = {};
    var oa = Object.entries(this.classTime);
    
    oa.forEach(([key,value]) => {
      if(key == ct.key){
        console.log(value);
        value = a.value;
        d = Object.assign(value , a.value);
        console.log(value);
        console.log(oa);

      }
    })

    // console.log('classes/' + this.currentClass + '/classTime/' + ct.key + '/');
    // update(ref(this.db, 'classes/' + this.currentClass + '/classTime/' + ct.key + '/'), oa);
    

  }

  addClass(){

    
      
      
      var newmap = new Map();
      newmap.set(this.studentCode, false);
      var newobj = Object.fromEntries(newmap);

      var obj = {
        'Waiting' : 
          {
            123124 : false,
            412312 : false
          },
      }
      var map = new Map();
      map.set(this.newclassTime, {});
      obj = Object.fromEntries(map);

      console.log(obj)
      var oa = Object.entries(obj);

      oa.forEach(([key, value]) => {
        value = Object.assign(value, newobj)
      })

      console.log(obj);
      this.classTime = obj;
      


      set(ref(this.db, 'classes/' + this.count), {
        className: this.newClassName,
        classTime: this.classTime,
        studentCode: this.studentCode
      });
      this.currentClassName = this.newClassName;
    
    
  }

  addClassTime(){

    if(this.currentClass == null){
      alert("Please Pick a class to edit");
      console.log(this.currentClass);
      return;
    }

    if(this.newAddclassTime == null || this.newAddclassTime == ""){
      alert("Please Pick a time to edit");
      console.log(this.newAddclassTime);
      return;
    }

    var oa = Object.entries(this.classes);
    //console.log("oa: " + oa);
    oa.forEach(([key,value]) => {
      if(key == this.currentClass){
        //console.log(value.classTime);
        
        var map = new Map(Object.entries(value.classTime));
        map.set(this.newAddclassTime, value.studentCode);
        var obj = Object.fromEntries(map);
        Object.assign(value.classTime, obj);
        Object.assign(this.classTime, obj)
        //console.log(value.classTime);
      }
      //console.log("key: " + key);
      //console.log("value: " + value.classTime);
    })
    
    this.classes = Object.assign(Object.fromEntries(oa));


    update(ref(this.db, 'classes/'), this.classes);
  }

  loadClass(ev:any){
    

    this.currentClass = ev.target.value;
    
    const oa = Object.entries(this.classes);
    //console.log("oa: " + oa);
    oa.forEach(([key,value]) => {
      if(key == this.currentClass){
        this.classTime = Object.assign(value.classTime);
        this.currentClassName = value.className;
      }
      //console.log("key: " + key);
      //console.log("value: " + value.classTime);
    })

    console.log(this.classTime);

  }
}
