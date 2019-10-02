import { DLJVObjectType } from './objectType.enum';

/**
 * Wrapper class for an object. Wraps any object and additionally contains meta-data of the object.
 */
export class JVObject {
    /**
     * The type of object.
     * @see ObjectType
     */
    private _type: DLJVObjectType;
    
    /**
     * The keys/properties of the object, in case the object is a JSON object.
     */
    private _keys: string[]|null;
    
    /**
     * The value or the object itself.
     */
    private _data: any|null|undefined;

    get type(): DLJVObjectType {
        return this._type;
    }
    get data(): any|null|undefined {
        return this._data;
    }
    get keys(): string[]|null {
        return this._keys;
    }
    set type(type: DLJVObjectType) {
        this._type = type;
    }
    set data(data: any|null|undefined) {
        this._data = data;
    }
    set keys(keys: string[]|null) {
        this._keys = keys;
    }

    constructor(type: DLJVObjectType, data: any) {
        this.type = type;
        this.data = data;
        this.keys = null;
    }

    /**
     * Factory method that returns a new JVObject object according to the input object passed.
     * @param {object} obj The input object for this factory method to wrap.
     * @returns {object} Returns a new JVObject of this value.
     */
    static objectFactory(obj: any|null|undefined): JVObject {
        if (JVObject.isNative(obj)) {
            // Adding string quotations
            if (typeof obj == 'string') {
                return new JVObject(DLJVObjectType.Native, "\"" + obj + "\"");
            }
            return new JVObject(DLJVObjectType.Native, obj);
        }
        else if (Array.isArray(obj)){
            let arr = Array.from(obj);
            let data: JVObject[] = [];
            let isNative: boolean = true;
            for(let i = 0; i < arr.length; i++) {
                data.push(JVObject.objectFactory(arr[i]));
                isNative = JVObject.isNative(arr[i]);
            }
            if (isNative) {
                return new JVObject(DLJVObjectType.NativeArray, data);
            }
            return new JVObject(DLJVObjectType.Array, data);
        }
        else if (typeof obj === 'object') {
            let keys: string[] = Object.keys(obj);
            let data: any = {};
            for (let i = 0; i<keys.length; i++) {
                data[keys[i]] = JVObject.objectFactory(obj[keys[i]]);
            }
            let result: JVObject = new JVObject(DLJVObjectType.Object, data);
            result.keys = keys;
            return result;
        }
    }

    /**
     * Checks if an object is a native type or not.
     * @param {object} value The object to be checked.
     * @returns {boolean} Returns true if the object is of type native or false otherwise.
     */
    static isNative(value: any): boolean {
        return value === undefined || value === null || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string';
    }
}