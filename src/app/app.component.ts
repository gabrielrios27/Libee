import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  @ViewChild('imgPhone') imgPhone!: ElementRef;
  @ViewChild('about') about!: ElementRef;

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
    // Mock para cards con miembros del equipo
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
    // Para loader inicial de carga de pagina
    setTimeout(() => {
      this.startLoader = false;
      this.onWindowScroll();
    }, 1000);
    // this.scrollSpyService.getObservable('window').subscribe((e: any) => {
    //   const elements = document.querySelectorAll('.animated-image');
    //   let i = 1;
    //   elements.forEach((element: any) => {
    //     const sectionOffsetTop = element
    //       .closest('section')
    //       .getBoundingClientRect().top;

    //     const imageOffsetTop =
    //       element.getBoundingClientRect().top - sectionOffsetTop;
    //     const windowHeight = window.innerHeight;
    //     i++;
    //     if ((i = 2)) {
    //       console.log(
    //         '------------------------------------------------------- '
    //       );
    //       console.log('sectionOffsetTop: ', sectionOffsetTop);
    //       console.log('imageOffsetTop: ', imageOffsetTop);
    //       console.log(window.scrollY + windowHeight);
    //     }

    //     if (
    //       window.scrollY + windowHeight >=
    //       sectionOffsetTop + imageOffsetTop
    //     ) {
    //       element.style.transform = 'none';
    //     } else {
    //       element.style.transform = 'scale(0.5)';
    //     }
    //   });
    // });
  }
  // Para agrandar imagen de telefono cuando usuario llega a su sección
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const imageElement = this.imgPhone.nativeElement;
    const sectionElement = this.about.nativeElement;

    const sectionOffsetTop = sectionElement.getBoundingClientRect().top;
    const imageOffsetTop =
      imageElement.getBoundingClientRect().top - sectionOffsetTop;
    const windowHeight = window.innerHeight;

    console.log('window.scrollY : ', window.scrollY);
    console.log('windowHeight : ', windowHeight);
    console.log('sectionOffsetTop : ', sectionOffsetTop);
    console.log('imageOffsetTop : ', imageOffsetTop);

    if (
      window.scrollY + windowHeight >=
      sectionOffsetTop + imageOffsetTop * 3
    ) {
      imageElement.style.transform = 'none';
      console.log('scale');
    } else {
      console.log('none');
      imageElement.style.transform = 'scale(0.5)';
    }
  }

  // Click en submit form
  onSubmit() {
    console.log('this.form.invalid: ', this.form.invalid);

    if (this.form.invalid) {
      this.invalidForm = true;
      return;
    }
    this.invalidForm = false;
    const { name, email, imSuper, iWorkAs } = this.form.value;

    console.log('Enviado: ', this.form.value);
    // El siguiente servicio solo funcionara una vez que se escriba el endpoint real en el servicio
    this._userSvc.signUp(name, email, imSuper, iWorkAs).subscribe({
      next: (resp: any) => {
        console.log('Formulario enviado: ', resp);
      },
      error: (error: any) => {
        console.log('Error en envío de fomulario ');
      },
    });
  }
  // Para comportamiento de botón hamburguesa
  OnNavBtn() {
    this.openMenuNav = !this.openMenuNav;
  }
  closeNavBtn() {
    this.openMenuNav = false;
  }
}
