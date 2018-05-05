import { DressColorsState, AddColor, RemoveColor } from './../state/dress-colors.state';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

  @ViewChild('name') name;

  @Select(DressColorsState.getAllColors) colors$: Observable<any>;
  @Select(DressColorsState.isLoading) loading$: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  addColor(name: string) {
    this.store.dispatch(
      new AddColor(name)
    ).subscribe(() => {
      this.name.nativeElement.value = '';
    });
  }

  removeColor(name: string) {
    this.store.dispatch(
      new RemoveColor(name)
    ).subscribe(() => {
      console.log('Removed!');
    });
  }
}
