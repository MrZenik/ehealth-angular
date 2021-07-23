import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.css']
})
export class ExceptionComponent implements OnInit {
  @Input() error: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
