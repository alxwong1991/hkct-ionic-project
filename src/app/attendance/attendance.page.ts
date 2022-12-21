import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, update, onValue, get, remove,child  } from "firebase/database";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  classes = [
    {
    className: "Maths",
    classTime:[
        '24-1-2022',
        '24-5-1222'
      ],
    studentCode:[
      123124,
      412312
    ]
    },
    {
      className: "English",
      classTime:[
          '22-1-2222',
          '21-5-1222',
          '25-2-2222'
        ],
        studentCode:[
          123124,
          412312
        ]
      },
  ]

  count = 0;

  db = getDatabase(initializeApp(environment.firebaseConfig));
  constructor() {
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
  classTime: string[] = [];

  newClassName: any;
  newclassTime: any;
  studentCode: any;
  
  ngOnInit() {
  }
  
  addClass(){
    this.classTime.push(this.newclassTime)
    set(ref(this.db, 'classes/' + this.count), {
      className: this.newClassName,
      classTime: this.classTime,
      studentCode: this.studentCode
    });
  }

  addClassTime(act:string){

    var updateClassTime:string[] = [];

    const oa = Object.entries(this.classes);
    //console.log("oa: " + oa);
    oa.forEach(([key,value]) => {
      if(key == this.currentClass){
        updateClassTime = value.classTime;
      }
      //console.log("key: " + key);
      //console.log("value: " + value.classTime);
    })
    updateClassTime.push(act);
    console.log(updateClassTime);


    update(ref(this.db, 'classes/' + this.currentClass + 'classTime'), updateClassTime);
  }

  loadClass(ev:any){
    

    this.currentClass = ev.target.value;
    
    const oa = Object.entries(this.classes);
    //console.log("oa: " + oa);
    oa.forEach(([key,value]) => {
      if(key == this.currentClass){
        this.classTime = value.classTime;
        this.currentClassName = value.className;
      }
      //console.log("key: " + key);
      //console.log("value: " + value.classTime);
    })

    //console.log(this.classTime);

  }
}
