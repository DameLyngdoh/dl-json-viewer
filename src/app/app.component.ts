import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  jsonString: string = "";
  showOutput: boolean = false;

  public jsonObj: any = {
    "a": 1.2,
    "b": "abcd",
    "c": [1,2,3],
    "deff": {
      "2": 23
    }
  };
  title = 'json-viewer-angular-component';

  constructor() { }

  ngOnInit(): void {
    document.getElementById('main-container').style.height = window.innerHeight + 'px';
  }

  /**
   * 
   */
  public viewJSON(): void {
    this.showOutput = false;
    let tempObj: any;
    try {
      tempObj = JSON.parse(this.jsonString);
    }
    catch(err) {
      return;
    }
    console.log(tempObj);
    this.jsonObj = tempObj;
    this.showOutput = true;
  }
}
