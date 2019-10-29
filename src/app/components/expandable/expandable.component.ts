import { Component, OnInit, Input, Renderer, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent implements OnInit {

  @ViewChild('expandWrapper', {static: false}) expandWrapper;
  @Input('expanded') expanded;
  @Input('expandedlow') expandedlow;
  @Input ('expandHeight') expandHeight;
  @Input('doctor') doctor;
  @Input ('available') available;
  @Input('horas') horas;

  currentHeight: number = 0;

  constructor( public renderer: Renderer) { }

  ngOnInit() {
    this.renderer.setElementStyle(this.expandHeight.nativeElement, 'height', this.expandHeight + 'px');
  }

}
