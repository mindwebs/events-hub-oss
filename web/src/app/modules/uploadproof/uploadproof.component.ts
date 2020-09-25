import { Component, OnInit } from '@angular/core';
import { ApicallsService } from 'src/app/services/apicalls.service';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-uploadproof',
  templateUrl: './uploadproof.component.html',
  styleUrls: ['./uploadproof.component.scss']
})
export class UploadproofComponent implements OnInit {

  submitEnable: boolean = true;
  apicall: boolean = false;
  errorMsg: boolean = false;
  public imagePath;
  imgURL: any;
  imageSrc: any;
  videoFlag: boolean = false;
  sellersPermitFile: any;
  //base64s
  sellersPermitString: string;
  //json
  finalJson: {} = {};
  // errorMsg: boolean = false;
  currentId: number = 0;
  userloader: boolean = false;
  nfocus: any = '';
  token: any;

  constructor(
    private apicallService: ApicallsService,
    private subscribeService: SubscriptionsService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscribeService.userData.subscribe((usertoken: any) => {
      if (!usertoken) {
        this.token = localStorage.getItem('userToken');
        if (this.token != '') {
          this.checkToken();
        } else {
          alert('User not Authorized');
        }
      }
    });
  }

  checkToken(): void {
    let load: any = {
      "token": this.token
    };
    this.apicall = true;
    this.apicallService.loginTokenApi(load)
      .then((res: HttpResponse<any>) => {
        // this.apicall = false;
        if (res.status == 200) {
          this.subscribeService.setUserData(this.token);
          this.subscribeService.setUserName(res.body['username']);
          this.subscribeService.setUserDP(res.body['profilepic']);
          this.subscribeService.setUserLogin(res.body['lastLoggedIn']);
        }
      })
      .catch((e: any) => {
        this.apicall = false;
        console.log(e);
      })
  }

  addPictures() {
    this.apicall = true;
      this.finalJson = {
        "card": this.sellersPermitString,
        "token": this.token
      }
      this.apicallService.postID(this.finalJson
      ).then((response: HttpResponse<any>) => {
        console.log(response);
        this.apicall = false;
        if(response.status == 200) {
          this.router.navigate(['../purchase'], { relativeTo: this.route }).catch();
        }
      }).catch((err: any) => {
        this.apicall = false;
        // this.router.navigate(['../heatmap'], { relativeTo: this.route }).catch();
        console.log(err);
      })
  }

  public picked(event, field) {
    console.log(event);
    this.currentId = field;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if (field == 1) {
        this.sellersPermitFile = file;
        this.handleInputChange(file); //turn into base64
      }
    }
    else {
      alert("No file selected");
    }
  }

  handleInputChange(files) {
    var file = files;
    this.submitEnable=true;
    var pattern1 = /image-*/;
    var reader = new FileReader();
    this.imgURL = "";
    if (!file.type.match(pattern1)) {
      alert('invalid format');
      return;
    }
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    this.submitEnable=false;
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    //this.imageSrc = base64result;
    let id = this.currentId;
    switch (id) {
      case 1:
        this.sellersPermitString = base64result;
        break
    }
  }



}
