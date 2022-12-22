import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { Component } from '@angular/core';
import { getDatabase, ref, set, update, onValue, get, remove,child  } from "firebase/database";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //ngmodel
  user: any;



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
  
  goToAdmin(){
      this.router.navigate(['/admin'])
    }
  
  constructor(private router:Router) {

      const refdb = ref(this.db, 'members');
      onValue(refdb, (snapshot) => {
      this.data = snapshot.val();
      this.count = 0;
      for(const k in this.data){
          this.count++;
      }
      
    });

    

  }

    
    

  generateMember(){

    
    // get(child(ref(this.db), 'members/')).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     const data = snapshot.val();
        
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
    const oe = Object.entries(this.data);
    var isRepeatedName = false;
    oe.forEach(([key,value])=>{
      if(this.user == value.username){
        isRepeatedName = true;
      }
    })
    if(this.user != null && this.user != "" && !isRepeatedName)
    {
      console.log(this.count);
      const code = Math.round( (1000000000 * Math.random()) )
      set(ref(this.db, 'members/' + this.count), {
        username: this.user,
        code: code,
      });
    }
  }

  removeRow(index: any){
    //console.log(index);
    const oe = Object.entries(this.data);
    var count1 = 0;
    oe.forEach(([key,value])=>{
      
      //console.log(value.code + ":" + index.code)
      if(value.code == index.code){
        remove(ref(this.db, 'members/' + count1));
      }
      count1++;
    })
    
  }

}
