import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core'

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss'],
})
export class PagerComponent implements OnInit {
  /** Current page */
  @Input() page: number

  /** Current zoom level */
  @Input() zoom: number

  /** Total pages */
  @Input() numPages: number

  /** Emits when the current page has changed */
  @Output() pageChange: EventEmitter<number> = new EventEmitter()

  /** Emits when the zoom has changed */
  @Output() zoomChange: EventEmitter<number> = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}

  public nextPage(): void {
    this.pageChange.emit(this.page + 1)
  }

  public previousPage(): void {
    this.pageChange.emit(this.page - 1)
  }

  public zoomIn(): void {
    this.zoom = Math.round((this.zoom + 0.1) * 100) / 100
    this.zoomChange.emit(this.zoom)
  }

  public zoomOut(): void {
    this.zoom = Math.round((this.zoom - 0.1) * 100) / 100
    this.zoomChange.emit(this.zoom)
  }
}
