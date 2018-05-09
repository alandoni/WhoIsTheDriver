export default class {

    concat(array, array1) {
        if (!array) {
            array = [];
        }
        if (!array1) {
            array1 = [];
        }
        for (const obj of array1) {
            array.push(obj);
        }
        return array;
    }

    copy(array) {
        const newArray = array.slice();
        return newArray;
    }
}