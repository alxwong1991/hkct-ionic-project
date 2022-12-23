import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, update, onValue, get, remove, child } from "firebase/database";
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
      classTime: {
        '22-1-2222':
        {
          123124: false,
          412312: false
        },
        '21-5-1222': {},
        '25-2-2222': {}
      },
      studentCode:
        [
          123424,
          412312,
        ]
    },
    {
      className: "English",
      classTime: {
        '22-1-2222':
        {
          123124: false,
          412312: false
        },
        '21-5-1222': {},
        '25-2-2222': {}
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
  constructor(private datePipe: DatePipe, private router: Router) {
    const refdb = ref(this.db, 'classes');
    onValue(refdb, (snapshot) => {
      this.classes = snapshot.val();
      this.count = 0;
      for (const k in this.classes) {
        this.count++;
      }
    });
  }



  currentClass = undefined;
  currentClassName: any;

  classTime = {
    'Waiting':
    {
      123124: false,
      412312: false
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

  newStudentCode: any;


  ngOnInit() {

  }

  goToAdmin() {
    this.router.navigate(['/admin'])
  }

  dateChange(value: any) {
    this.newclassTime = value;
    console.log(this.newclassTime);
  }
  dateChange1(value: any) {
    this.newAddclassTime = value;
    console.log(this.newAddclassTime);
  }

  handleChange(ev: any, ct: any) {
    var a = ev.target;
    console.log(ct);
    var b = [];
    var count2 = 0;

    for (var k in ev.target.value) {
      console.log(k);
      count2++;
    }

    var map = new Map();
    for (var i = 0; i < count2; i++) {
      a.value[i].value = !a.value[i].value;
      b.push(a.value[i].key);
      map.set(b[i], a.value[i].value);
    }
    var c = Object.fromEntries(map);

    update(ref(this.db, 'classes/' + this.currentClass + '/classTime/' + ct.key + '/'), c);


  }

  addClass() {

    var newStudentCodeArray = [];
    if (this.newStudentCode.includes(",")) {
      newStudentCodeArray = this.newStudentCode.split(",");
      console.log(newStudentCodeArray);
    }

    var newmap = new Map();
    for (var i = 0; i < newStudentCodeArray.length; i++) {
      newmap.set(newStudentCodeArray[i], false);
    }
    console.log(newmap);
    var newobj = Object.fromEntries(newmap);
    console.log(newobj);

    var obj = {
      'Waiting':
      {
        123124: false,
        412312: false
      },
    }
    var map = new Map();
    map.set(this.newclassTime, {});
    obj = Object.fromEntries(map);
    console.log(obj)

    var oa = Object.entries(obj);
    console.log(oa)

    oa.forEach(([key, value]) => {
      value = Object.assign(value, newobj)
    })

    console.log(obj);
    this.classTime = obj;
    console.log(this.classTime)



    set(ref(this.db, 'classes/' + this.count), {
      className: this.newClassName,
      classTime: this.classTime,
      studentCode: newStudentCodeArray
    });
    this.currentClassName = this.newClassName;


  }

  addClassTime() {

    if (this.currentClass == null) {
      alert("Please Pick a class to edit");
      console.log(this.currentClass);
      return;
    }

    if (this.newAddclassTime == null || this.newAddclassTime == "") {
      alert("Please Pick a time to edit");
      console.log(this.newAddclassTime);
      return;
    }

    var oa = Object.entries(this.classes);
    //console.log("oa: " + oa);
    oa.forEach(([key, value]) => {
      if (key == this.currentClass) {
        //console.log(value.classTime);

        // new
        var newmap = new Map();

        var count3 = 0;
        for (const k in value.studentCode) {
          console.log(k)
          count3++;
        }

        console.log(count3)
        for (var i = 0; i < value.studentCode.length; i++) {
          newmap.set(value.studentCode[i], false);
        }

        var newobj = Object.fromEntries(newmap);
        console.log(newobj)

        var obj = {
          'Waiting':
          {
            123124: false,
            412312: false
          },
        }
        var map = new Map();
        map.set(this.newAddclassTime, {});
        obj = Object.fromEntries(map);
        console.log(obj)

        //console.log(obj)
        var oa = Object.entries(obj);
        console.log(oa);

        oa.forEach(([key, value]) => {
          value = Object.assign(value, newobj)
        })
        console.log(oa);
        // new




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

  loadClass(ev: any) {


    this.currentClass = ev.target.value;

    const oa = Object.entries(this.classes);
    //console.log("oa: " + oa);
    oa.forEach(([key, value]) => {
      if (key == this.currentClass) {
        this.classTime = Object.assign(value.classTime);
        this.currentClassName = value.className;
      }
      //console.log("key: " + key);
      //console.log("value: " + value.classTime);
    })

    console.log(this.classTime);

  }
}
