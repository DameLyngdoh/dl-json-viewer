# JSON Viewer for Angular
A module which renders or displays a JSON object in proper indentation (or beautified form) in an Angular application.

## Build
Run `ng build dl-json-viewer` to build the project. The build artifacts will be stored in the `projects/dl-json-viewer/dist/` directory.

## Installation
### NPM

```sh
npm i dl-json-viewer-angular
```

## Usage
### Import
Add `DLJSONViewerModule` to your application's or module's imports. For example to import the module to your application, `app.module.ts` should have the following:

```typescript
import { DLJsonViewerModule } from 'dl-json-viewer';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DLJsonViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

### Use
Add the `lib-dl-json-viewer` directive/element to your component with the appropriate inputs to render the object.

```html
<lib-dl-json-viewer [obj]="jsonObj" [tab-space]="4" [config]="config"></lib-dl-json-viewer>
```

The above code snippet will show the object `jsonObj` (in the current component's members) with an indentation of 4 spaces.

### Component Inputs

|Input|Type|Description|
|-|-|-|
|`obj`|`any`|The JSON object or array or native to be rendered by the component.|
|`tab-space`|`number`|The number of spaces to use for indentation.|
|`config`|`any`|The configuration object. See Configuration for more information.|

### Configuration
The configuration object contains the following properties:

|Property|Type|Description|
|-|-|-|
|`marker`|`object`|The object which contains strings to demarcate an object or array.|
|`marker.array`|`object`|The object which contains strings to demarcate an array.|
|`marker.array`|`object`|The object which contains strings to demarcate an object.|
|`marker.array.separator`|`string`|The string which separates elements in an array.|
|`marker.array.open`|`string`|The string which indicates the start of an array.|
|`marker.array.close`|`string`|The string which indicates the end of an array.|
|`marker.object.separator`|`string`|The string which separates elements (key-value pair) in an object.|
|`marker.object.keyValueSeparator`|`string`|The string which separates the key from value in an element.|
|`marker.object.open`|`string`|The string which indicates the start of an object.|
|`marker.object.close`|`string`|The string which indicates the end of an object.|

Below is the object structure and the default values:

```typescript
const DefaultConfig: any = {
    "markers": {
        "array": {
            "separator": ",",
            "open": "[",
            "close": "]"
        },
        "object": {
            "separator": ",",
            "open": "{",
            "close": "}",
            "keyValueSeparator": ":"
        }
    }
};
```

The default values for the configuration is the `DefaultConfig` object which can be found in the `default.config.ts` file.

## Demo
This application is a demonstration of the use of the component. The `app` component contains the `jsonObj` field which is passed as input to `json` of the component. This object is bound (two-way) to the text-area input in the view, so when there is text input in the text-area and the *View* button is clicked then the `viewJSON` method in the app component is called which updates the input of the JSON viewer component and the object is then rendered in the view. To run the application use the Angular CLI command:

```sh
ng serve
```

## Documentation
The documentation for this project is generated using [Compodoc](https://compodoc.app/) tool. You can find the documentation at `doc/index.html`.
