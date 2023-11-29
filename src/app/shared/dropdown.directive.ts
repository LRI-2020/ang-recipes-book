import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
@HostListener('click') onClick(){

  let dropDownButton = this.elemRef.nativeElement.querySelector('button.dropdown-toggle');
  dropDownButton.classList.toggle('show');
  let ariaAttr = dropDownButton.getAttribute('aria-expanded') === 'true'?'false':'true';
  dropDownButton.setAttribute('aria-expanded',ariaAttr);

  let dropMenu = this.elemRef.nativeElement.querySelector('ul.dropdown-menu');
  dropMenu.classList.toggle('show');
  if(dropMenu.getAttribute('data-bs-popper')){
    dropMenu.removeAttribute('data-bs-popper')

  }
  else{
    dropMenu.setAttribute('data-bs-popper','static');
  }
}
  constructor(private elemRef:ElementRef, private renderer:Renderer2) { }

}
