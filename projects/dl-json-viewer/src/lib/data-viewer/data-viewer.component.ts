import { Component, OnInit, Input } from '@angular/core';
import { JVObject } from '../object.model';

@Component({
  selector: 'lib-data-viewer',
  templateUrl: './data-viewer.component.html',
  styleUrls: ['./data-viewer.component.css']
})
/**
 * Primary component that displays an object. If nested objects are 
 * present, then recursive calls to the component are performed with 
 * updated tabSpaceIndex.
 */
export class DataViewerComponent implements OnInit {

  /**
   * Current nested index. 0 for topmost object.
   */
  @Input('tab-space-index')tabSpaceIndex: number;
  
  /**
   * Amount of spaces to use for tab-space.
   */
  @Input('tab-space')tabSpace: number;
  
  /**
   * Object to display in viewer.
   */
  @Input('obj')obj: JVObject;
  
  /**
   * Configuration object.
   */
  @Input('config')config: any;

  /**
   * Markers for viewer (includes separators)
   */
  public markers: any;

  /**
   * ObjectType mapping with reference to ObjectType enum.
   */
  public Type: any = { "Array": 1, "Native": 2, "NativeArray": 0, "Object": 3 };
  
  constructor() { }

  ngOnInit() {
    this.markers = this.config.markers;
  }
  
  /**
   * Generates an array of n numbers from 0 to n (excluding n).
   * @param n The number of numbers to generate in the array.
   * @returns Array of numbers [0, 1, ..., n].
   */
  public arrayN(n: number): number[] {
    return Array(n);
  }
}