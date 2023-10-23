import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit{
  @Input() size!: string
  @Input() buttonText!: string
  @Input() isActive: boolean = false
  @Output() onClickBtn = new EventEmitter();

  ngOnInit(): void {
  }

  onClick() {
    this.onClickBtn.emit();
  }
}