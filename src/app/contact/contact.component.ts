import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AppService } from '../app.service';
import { Contact } from '../app.interface';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  Form!: FormGroup;
  alert: boolean = false;
  socialList = [{
    url: environment.LINKEDIN,
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/linkedin.svg',
    style: 'filter: invert(35%) sepia(14%) saturate(6468%) hue-rotate(173deg) brightness(93%) contrast(102%);'
  }, {
    url: environment.GITHUB,
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/github.svg',
    style: ''
  }, {
    url: environment.DEV,
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/dev-dot-to.svg',
    style: ''
  }, {
    url: environment.UPWORK,
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/upwork.svg',
    style: 'filter: invert(69%) sepia(100%) saturate(322%) hue-rotate(50deg) brightness(91%) contrast(95%);'
  }, {
    url: environment.EMAIL,
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/gmail.svg',
    style: 'filter: invert(32%) sepia(77%) saturate(1154%) hue-rotate(334deg) brightness(94%) contrast(91%);'
  }]

  get form() {
    return this.Form.controls;
  }
  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit(): void {
    this.defineForm();
  }
  defineForm() {
    this.Form = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', ([Validators.required, Validators.email])],
      subject: ['', ([Validators.required, Validators.minLength(4)])],
      message: ['', ([Validators.required, Validators.minLength(20)])],
    })

  }

  saveContact() {
    if (this.Form.invalid) {
      this.Form.markAllAsTouched();
      return;
    }

    const save_obj: Contact = {
      name: this.Form.value.fullName,
      email: this.Form.value.email,
      message: this.Form.value.message,
      subject: this.Form.value.subject,
    };
    this.appService.saveContact(save_obj).subscribe((res: any) => {
      this.Form.reset();
      this.alert = true;
    }, err => {
      console.log('err: ', err);
    })

  }

}
