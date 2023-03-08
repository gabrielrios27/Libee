import { Component, Input, OnInit } from '@angular/core';

import { Member } from './../../interfaces/user.interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() member: Member;
  @Input() index: number;
  isMiddle: boolean;

  constructor() {
    this.member = {} as Member;
    this.index = 0;
    this.isMiddle = false;
  }

  ngOnInit(): void {
    console.log('this.index: ',this.index);
    
    if (this.index === 2) {
      this.isMiddle = true;
    }
  }
}
