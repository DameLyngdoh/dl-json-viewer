/**
 * Class containing static methods for JSON comparison and manipulation.
 */
export class DLJSONUtilities {
    /**
     * Compares two objects to see if their are equal or not. The objects may be native 
     * (number, string, etc.) or objects (arrays or JSON objects). In case, of arrays, the 
     * arrayEquals method will be called and in case of JSON objects, the jsonHasSimilarProperties 
     * with compareValue flag set to true will be used.
     * @param {object} A The first object.
     * @param {object} B The second object.
     * @returns {boolean} Returns true if the two objects are equal or false otherwise.
     */
    static compareObjects(A: any, B: any): boolean {
        if (A==null) {
            if (B!=null) {
                return false;
            }
            return true;
        }
        if (A==undefined) {
            if (B!=undefined) {
                return false;
            }
            return true;
        }

        if (Array.isArray(A)) {
            if (Array.isArray(B)) {
                if (!DLJSONUtilities.arrayEquals(A, B)) {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        else if (DLJSONUtilities.isJSONObject(A)) {
            if (DLJSONUtilities.isJSONObject(B)) {
                if (!DLJSONUtilities.jsonHasSimilarProperties(A, B, true)) {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        else {
            if (A !== B) {
                return false;
            }
        }
        return true;
    }

    /**
     * Checks if an object contains all the properties (including nested properties) of a 
     * reference source object. The object may have additional properties which may not be 
     * present in the source object, but they will not have any influence on the output.
     * @param {object} obj The object to be checked.
     * @param {object} source The source object to check against.
     * @param {boolean} compareValues If true, then the values of the properties will also be checked for equality.
     * @returns {boolean} Returns true if all the properties of the source object are present in the object or false otherwise.
     */
    static jsonHasAllProperties(obj: any, source: any, compareValues: boolean): boolean {
        if (!DLJSONUtilities.isJSONObject(obj)) {
            throw new Error('obj parameter must be a valid JSON object.');
        }
        if (!DLJSONUtilities.isJSONObject(source)) {
            throw new Error('source parameter must be a valid JSON object.');
        }

        let sourceKeys: string[] = Object.keys(source);

        for ( let i = 0; i < sourceKeys.length; i++) {
            if (!obj.hasOwnProperty(sourceKeys[i])) {
                return false;
            }
            if (DLJSONUtilities.isPropertyObject(obj, sourceKeys[i])) {
                if (!DLJSONUtilities.jsonHasAllProperties(obj[sourceKeys[i]], source[sourceKeys[i]], compareValues)) {
                    return false;
                }
            }
            else if (compareValues && !DLJSONUtilities.compareObjects(obj[sourceKeys[i]], source[sourceKeys[i]]) ){
                return false;
            }
        }
        return true;
    }

    /**
     * Checks if a JSON object has properties with identical data-type as that of a source 
     * object used for reference.
     * @param {object} obj The object to be verified.
     * @param {object} source The source object to use as reference.
     * @returns {boolean} Returns true if all the properties of object are present in source object and have the same data-type.
     */
    static jsonSimilarPropertiesDataType(obj: any, source: any): boolean {
        if (!DLJSONUtilities.isJSONObject(obj)) {
            throw new Error('obj parameter must be a valid JSON object.');
        }
        if (!DLJSONUtilities.isJSONObject(source)) {
            throw new Error('source parameter must be a valid JSON object.');
        }

        let sourceKeys: string[] = Object.keys(source);

        for ( let i = 0; i < sourceKeys.length; i++) {
            // Checking if object has the property
            if (!obj.hasOwnProperty(sourceKeys[i])) {
                return false;
            }

            // Checking if the property is of the same type
            if (typeof obj[sourceKeys[i]] != typeof source[sourceKeys[i]]) {
                return false;
            }
            else if (Array.isArray(obj[sourceKeys[i]])) {
                if (!Array.isArray(source[sourceKeys[i]])) {
                    return false;
                }
            }

            if (DLJSONUtilities.isPropertyObject(obj, sourceKeys[i])) {
                if (!DLJSONUtilities.jsonSimilarPropertiesDataType(obj[sourceKeys[i]], source[sourceKeys[i]])) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Checks if all the properties of an object are present in the reference source object 
     * and there are no additional properties within the object which are not present in the 
     * source reference. This is similar to a deep compare of two objects when the compareValue 
     * flag is set to true.
     * @param {object} obj The object to be verified.
     * @param {object} source The reference object.
     * @param {boolean} compareValues If true, then the values of the properties will also be compared.
     * @returns {boolean} Returns true if the two objects are identical or false otherwise.
     */
    static jsonHasSimilarProperties(obj: any, source: any, compareValues: boolean): boolean {
        if (!DLJSONUtilities.isJSONObject(obj)) {
            throw new Error('obj parameter must be a valid JSON object.');
        }
        if (!DLJSONUtilities.isJSONObject(source)) {
            throw new Error('source parameter must be a valid JSON object.');
        }
        
        let sourceKeys: string[] = Object.keys(source);
        let objKeys: string[] = Object.keys(obj);

        // If lengths are unequal
        if (sourceKeys.length != objKeys.length) {
            return false;
        }

        // Comparing values and properties existence
        for (let i = 0; i < sourceKeys.length; i++) {
            if (!obj.hasOwnProperty(sourceKeys[i])) {
                return false;
            }
            if (!DLJSONUtilities.isPropertyObject(obj, sourceKeys[i]) && !DLJSONUtilities.isPropertyObject(source, sourceKeys[i]) && compareValues) {
                if (!DLJSONUtilities.compareObjects(obj[sourceKeys[i]], source[sourceKeys[i]])) {
                    return false;
                }
            }
        }

        // Comparing nested objects
        for (let i = 0; i < sourceKeys.length; i++) {
            if (DLJSONUtilities.isPropertyObject(obj, sourceKeys[i])) {
                if (DLJSONUtilities.isPropertyObject(source, sourceKeys[i])) {
                    if (!DLJSONUtilities.jsonHasSimilarProperties(obj[sourceKeys[i]], source[sourceKeys[i]], compareValues)) {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Checks if two arrays are equal or not; having identical elements in the same order. If the 
     * element is an array then it will also undergo similar check and if the element is a JSON 
     * object then a deep compare will be performed.
     * @param {object} arr1 The first array object.
     * @param {object} arr2 The second array object.
     * @returns {boolean} Returns true if the two arrays are identical or false otherwise.
     */
    static arrayEquals(arr1: any[], arr2: any[]): boolean {
        if (arr1.length != arr2.length) {
            return false;
        }
        for (let i = 0; i < arr1.length; i++) {
            if (!DLJSONUtilities.compareObjects(arr1[i], arr2[i])) {
                return false;
            }
        }
        return true;
    }

    /**
     * Verifies if an object is a valid JSON object or not.
     * @param {object} obj The object to be verified.
     * @returns {boolean} Returns true when the object is a valid JSON object or false otherwise.
     */
    static isJSONObject(obj: any): boolean {
        return !(obj == null || obj == undefined || typeof obj != 'object' || (typeof obj == 'object' && Array.isArray(obj)));
    }

    /**
     * Checks if a property of an object is a valid JSON object.
     * @param {object} obj The object containing the property.
     * @param {string} property The property of the object to be verified.
     * @returns {boolean} Returns true if the property is a valid JSON object or false otherwise.
     */
    static isPropertyObject(obj: any, property: string): boolean {
        if (!DLJSONUtilities.isJSONObject(obj)) {
            throw new Error('Object is not a valid JSON object.');
        }
        if (!obj.hasOwnProperty(property)) {
            return false;
        }
        return DLJSONUtilities.isJSONObject(obj[property]);
    }

    /**
     * Appends all properties in source which are not present in the object to the object.
     * @param {object} obj The object to have properties appended to.
     * @param {object} source The source object to look for the additional properties.
     */
   static jsonPutAll(obj: any, source: any): void {
        if (!DLJSONUtilities.isJSONObject(obj)) {
            throw new Error('obj parameter must be a valid JSON object.');
        }
        if (!DLJSONUtilities.isJSONObject(source)) {
            throw new Error('source parameter must be a valid JSON object.');
        }

        let sourceKeys: string[] = Object.keys(source);

        for (let i = 0; i < sourceKeys.length; i++) {
            if (!obj.hasOwnProperty(sourceKeys[i])) {
                obj[sourceKeys[i]] = source[sourceKeys[i]];
            }
            else if (DLJSONUtilities.isJSONObject(obj[sourceKeys[i]])) {
                DLJSONUtilities.jsonPutAll(obj[sourceKeys[i]], source[sourceKeys[i]]);
            }
        }
    }
}