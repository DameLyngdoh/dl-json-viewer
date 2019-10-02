"use strict";
exports.__esModule = true;
var dLJSONUtilities_1 = require("./dLJSONUtilities");
/**
 * Variable for demo purposes.
 */
var a;
/**
 * Variable for demo purposes.
 */
var b;
// Equality Comparison Natives
a = 10;
b = 10;
console.log(dLJSONUtilities_1.DLJSONUtilities.compareObjects(a, b));
// Inequality Comparison
a = {
    "property1": 67
};
b = {
    "property1": 999
};
console.log(dLJSONUtilities_1.DLJSONUtilities.compareObjects(a, b));
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
console.log(dLJSONUtilities_1.DLJSONUtilities.jsonHasAllProperties(a, b, false));
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
console.log(dLJSONUtilities_1.DLJSONUtilities.jsonHasAllProperties(a, b, false));
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
console.log(dLJSONUtilities_1.DLJSONUtilities.jsonHasAllProperties(a, b, true));
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
console.log(dLJSONUtilities_1.DLJSONUtilities.jsonSimilarPropertiesDataType(a, b));
// Array Equals
a = [1, "33", [2, 3], { "a": 1, "b": { "c": 3 } }];
b = [1, "33", [2, 3], { "a": 1, "b": { "c": 3 } }];
console.log(dLJSONUtilities_1.DLJSONUtilities.arrayEquals(a, b));
// Is Property Object True
a = {
    "D": {
        "f": 90
    }
};
console.log(dLJSONUtilities_1.DLJSONUtilities.isPropertyObject(a, "D"));
