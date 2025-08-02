import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDraggable]',
  standalone: true,
})
export class DraggableDirective {
  private isDragging = false;
  private offsetX = 0;
  private offsetY = 0;

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.position = 'absolute'; // Required for moving
    this.el.nativeElement.style.cursor = 'move';
  }

  @HostListener('mousedown', ['$event'])
  startDrag(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (['INPUT', 'TEXTAREA', 'BUTTON'].includes(target.tagName)) {
      return;
    }

    this.isDragging = true;
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.offsetX = event.clientX - rect.left;
    this.offsetY = event.clientY - rect.top;
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;

    const el = this.el.nativeElement;
    const rect = el.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = event.clientX - this.offsetX;
    let top = event.clientY - this.offsetY;

    // Clamp inside viewport
    left = Math.max(0, Math.min(left, viewportWidth - rect.width));
    top = Math.max(0, Math.min(top, viewportHeight - rect.height));

    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
  }

  @HostListener('document:mouseup')
  stopDrag() {
    this.isDragging = false;
  }
}
