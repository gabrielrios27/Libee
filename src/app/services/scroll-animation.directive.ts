import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[scroll-animation]',
})
export class ScrollAnimationDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const imageElement = this.elementRef.nativeElement;
    const sectionElement = imageElement.closest('.way__metod');

    const sectionOffsetTop = sectionElement.getBoundingClientRect().top;
    const imageOffsetTop =
      imageElement.getBoundingClientRect().top - sectionOffsetTop;
    const windowHeight = window.innerHeight;

    if (
      window.scrollY + windowHeight >=
      sectionOffsetTop + imageOffsetTop * 25
    ) {
      imageElement.style.transform = 'none';
    } else {
      imageElement.style.transform = 'scale(0.5)';
    }
  }
}
