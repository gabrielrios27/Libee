import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Libee';
  startLoader: boolean;

  form: FormGroup;
  invalidForm: boolean;
  openMenuNav: boolean;
  constructor(private _fb: FormBuilder, private _userSvc: UserService) {
    this.startLoader = true;
    this.form = this._fb.group({
      name: [[Validators.required]],
      email: [
        [
          Validators.email,
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      imSuper: [[Validators.required]],
      iWorkAs: [],
    });
    this.invalidForm = false;
    this.openMenuNav = false;
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.startLoader = false;
    }, 1000);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.invalidForm = true;
      return;
    }
    this.invalidForm = false;
    const { name, email, imSuper, iWorkAs } = this.form.value;

    this._userSvc.signUp(name, email, imSuper, iWorkAs).subscribe({
      next: (resp: any) => {
        console.log('Formulario enviado: ', resp);
      },
      error: (error: any) => {
        console.log('Error en envío de fomulario ');
      },
    });
  }
  OnNavBtn() {
    this.openMenuNav = !this.openMenuNav;
  }
  closeNavBtn() {
    this.openMenuNav = false;
  }
}
