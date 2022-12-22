import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, update, onValue, get, remove,child  } from "firebase/database";
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { doc } from 'firebase/firestore';



(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  providers: [DatePipe]
})
export class ReportPage implements OnInit {

  pdfObj = null;

  
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
  abc = "";

  db = getDatabase(initializeApp(environment.firebaseConfig));
  constructor(private datePipe: DatePipe) {
    const refdb = ref(this.db, 'classes');
      onValue(refdb, (snapshot) => {
      this.classes = snapshot.val();
      this.count = 0;
      for(const k in this.classes){
          this.count++;
      }
   });}

  ngOnInit() {
  }

  externalDataRetrievedFromServer = [
    { name: 'Bartek', age: 34 , c:'a'},
    { name: 'John', age: 27 , c:'b'},
    { name: 'Elizabeth', age: 30, c:'c' },
  ];

  externalDataRetrievedFromServer2 = [
    { name: 'Bartek', age: [34,44] , c:'a'},
    { name: 'John', age: [27,22] , c:'b'},
    { name: 'Elizabeth', age: [30,44], c:'c' },
  ];


  classTime = {};
  studentCode = {};

  




  buildTableBody(data, columns) {
    var body = [];

    body.push(columns);
    console.log(body);
    
    data.forEach(function(row) {
        var dataRow = [];
        var count = 0;
        columns.forEach(function(column) {
          if(count > 0){
            for(var i = 0; i < row[column].length; i++){
              console.log(row[column][i]);
            }
          }
          count++;
        })
        
        

        body.push(dataRow);
    });
    return body;
  }


  table(data, columns) {
      return {
          table: {
              headerRows: 1,
              body: this.buildTableBody(data, columns)
          }
      };
    }

    pdfDownload(){

    console.log(JSON.stringify(this.classes))

    var thisClassName = [];
    thisClassName.push({ text: 'ClassName' });

    var thisClassTime = [];
    thisClassTime.push({ text: 'ClassTime' });

    var thisStudentCode = [];
    thisStudentCode.push({ text: 'StudentCode'});


    var a = Object.entries(this.classes);
    console.log("a: " + a);
    var b = {};
    //Loop depends on the number of class, key = number of class, value = specific class
    
    a.forEach(([key, value]) =>
    {
      //Want to get class name, so
      thisClassName.push(value.className);
      thisStudentCode.push(value.studentCode);


      b = value.classTime;
      console.log("b: " + b);
      
      var c = Object.entries(b);
      c.forEach(([key, value])=>
      {
        //This is  key = '20-22-2022' :  value = { 222 : false ...}
        //Want to get classTime, so taking key
        thisClassTime.push(key);
        console.log("c: " + c);
        console.log("c.value: " + value);

        var d = Object.entries(c.values);
        

        d.forEach(([key,value]) => 
        {
          console.log("d: " + d);
          console.log("d.value: " + d);
        })
      }) 
    })
    


    var superCollection = [];
    for(var i = 0; i < thisClassName.length; i++){
      superCollection.push(thisClassName);
      superCollection.push(thisClassTime);
      superCollection.push(thisStudentCode);
    }




    const docDef = 
    {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins:[20,10,40,60],
      content:
      [
        {
          table: 
          {
            headerRows: 1,
            body: 
            [
              [
                {text: 'className'},
                {text: 'classTime'},
                {text: 'studentCode'}
              ],
              [
                '123',
                {
                  table:
                  {
                    HeadersRows:1,
                    body: [[{text: 'studentCode'}, {text: 'Attended'}],
                          [['123'],['123']]]
                  }
                },
                '123'
              ]
            ]
          }
      }
    ]
  }

    this.pdfObj = pdfMake.createPdf(docDef);
    pdfMake.createPdf(docDef).open();
    //this.pdfObj.download('School Report.pdf');
  }

}
