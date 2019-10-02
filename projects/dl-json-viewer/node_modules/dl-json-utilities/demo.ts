import { DLJSONUtilities } from './dLJSONUtilities';

/*
 * Expected console output:
 * true 
 * false
 * true 
 * false
 * false
 * false
 * true 
 * true 
 */


/**
 * Variable for demo purposes.
 */
let a: any;
/**
 * Variable for demo purposes.
 */
let b: any;

// Equality Comparison Natives
a = 10;
b = 10;
console.log(DLJSONUtilities.compareObjects(a,b));


// Inequality Comparison
a = {
    "property1": 67
};
b = {
    "property1": 999
};
console.log(DLJSONUtilities.compareObjects(a,b));


// Has All Properties Equality
a = {
    "p1": 1,
    "p2": "xyz",
    "p3": {
        "p4": [1, 2],
        "p5": 0
    }
};
b = {
    "p2": "UVW",
    "p3": {
        "p4": [1, 2]
    }
};
console.log(DLJSONUtilities.jsonHasAllProperties(a, b, false));


// Has All Properties Inequality
a = {
    "p1": 1,
    "p2": "xyz",
    "p3": {
        "p4": [1, 2],
        "p5": 0
    }
};
b = {
    "p2": "UVW",
    "p3": {
        "p4": [1, 2],
        "p6": 909
    }
};
console.log(DLJSONUtilities.jsonHasAllProperties(a, b, false));


// Has All Properties Value Inequality
a = {
    "p1": 1,
    "p2": "xyz",
    "p3": {
        "p4": [1, 2],
        "p5": 0
    }
};
b = {
    "p2": "UVW",
    "p3": {
        "p4": [1, 2]
    }
};
console.log(DLJSONUtilities.jsonHasAllProperties(a, b, true));


// Has Similar Properties Data Type Inequality
a = {
    "p1": 1,
    "p2": "xyz",
    "p3": {
        "p4": [1, 2],
        "p5": 0
    }
};
b = {
    "p2": "UVW",
    "p3": {
        "p4": [1, 2],
        "p5": "0"
    }
};
console.log(DLJSONUtilities.jsonSimilarPropertiesDataType(a, b));


// Array Equals
a = [1, "33", [2,3], {"a": 1, "b": {"c": 3}}];
b = [1, "33", [2,3], {"a": 1, "b": {"c": 3}}];
console.log(DLJSONUtilities.arrayEquals(a, b));


// Is Property Object True
a = {
    "D": {
        "f": 90
    }
}
console.log(DLJSONUtilities.isPropertyObject(a, "D"));