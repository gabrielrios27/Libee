import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Member } from './interfaces/user.interfaces';
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

  mockMembers: Member[];
  constructor(private _fb: FormBuilder, private _userSvc: UserService) {
    this.startLoader = true;
    this.form = this._fb.group({
      name: [null, [Validators.required]],
      email: [
        null,
        [
          Validators.email,
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      imSuper: [null, [Validators.required]],
      iWorkAs: [],
    });
    this.invalidForm = false;
    this.openMenuNav = false;
    this.mockMembers = [
      {
        name: 'Zoe',
        age: 23,
        profesion: ['RRHH', 'Psicologa'],
        afinity: 80,
        poi: ['hexa', 'diamont', 'diamont', 'purple'],
        img: '../assets/images/members/ZOE.png',
      },
      {
        name: 'Seba',
        age: 28,
        profesion: ['Full stack', 'Data Sc.'],
        afinity: 99,
        poi: ['hexa', 'diamont', 'diamont', 'purple'],
        img: '../assets/images/members/SEBA.png',
      },
      {
        name: 'Ayelén',
        age: 32,
        profesion: ['Arquitecta', 'Paisajista'],
        afinity: 82,
        poi: ['hexa', 'purple', 'diamont', 'purple'],
        img: '../assets/images/members/AYELEN.png',
      },
      {
        name: 'Gonza',
        age: 33,
        profesion: ['Admin.', 'Abogado'],
        afinity: 85,
        poi: ['hexa', 'hexa', 'purple', 'purple'],
        img: '../assets/images/members/GONZA.png',
      },
      {
        name: 'Juan',
        age: 26,
        profesion: ['Creativo', 'Ux - Ui'],
        afinity: 98,
        poi: ['hexa', 'purple', 'purple', 'purple'],
        img: '../assets/images/members/JUAN.png',
      },
    ];
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.startLoader = false;
    }, 1000);
  }

  onSubmit() {
    console.log('this.form.invalid: ', this.form.invalid);

    if (this.form.invalid) {
      this.invalidForm = true;
      return;
    }
    this.invalidForm = false;
    const { name, email, imSuper, iWorkAs } = this.form.value;

    console.log('Enviado: ', this.form.value);

    // this._userSvc.signUp(name, email, imSuper, iWorkAs).subscribe({
    //   next: (resp: any) => {
    //     console.log('Formulario enviado: ', resp);
    //   },
    //   error: (error: any) => {
    //     console.log('Error en envío de fomulario ');
    //   },
    // });
  }
  OnNavBtn() {
    this.openMenuNav = !this.openMenuNav;
  }
  closeNavBtn() {
    this.openMenuNav = false;
  }
}
