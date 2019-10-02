import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { JVObject } from './object.model';
import { DLJSONUtilities } from 'dl-json-utilities'; 
import { DefaultConfig } from './default.config';
@Component({
  selector: 'lib-dl-json-viewer',
  templateUrl: './dl-json-viewer.component.html',
  styles: ['./dl-json-viewer.component.css']
})
/**
 * Component which calls data-viewer component to diplay the data. 
 * Also, this component implements OnChanges interface which updates 
 * the data-viewer component with new input when there is change in input 
 * from the parent component.
 */
export class DlJsonViewerComponent implements OnInit, OnChanges {
  
  /**
   * The JSON object to render.
   */
  @Input('json') json: any;
  
  /**
   * Number of tab-space(s) to use.
   */
  @Input('tab-space') tabSpace: number = 4;
  
  /**
   * Configuration object.
   * @see DefaultConfig
   */
  @Input('config') config: any = undefined;

  /**
   * Wrapper object received after passing json to JVObject factory.
   * @see JVObject
   */
  public obj: JVObject;
  
  constructor() { }

  ngOnInit() {
    // Validating configurations
    // If no configuration is specified
    if (this.config == null || this.config == undefined) {
      this.config = DefaultConfig;
    }
    // If configuration specified is invalid
    else if (!DLJSONUtilities.jsonSimilarPropertiesDataType(DefaultConfig, this.config)) {
      throw new Error('ConfigException: Invalid configuration object.');
    }
    // If conifguration object is valid, then add remaining properties from default
    else {
      DLJSONUtilities.jsonPutAll(this.config, DefaultConfig);
    }
    this.obj = JVObject.objectFactory(this.json);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.obj = JVObject.objectFactory(changes.json.currentValue);
  }
}
