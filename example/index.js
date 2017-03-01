function addOne(num) {
    let num;

    if (typeof num !== 'number') {
        console.warn('Cannot add 1 to type', typeof num);
        num = 0;
    }

    if (num < 0) {
        console.info('Less than 0', num);
    }

    return num + 1;
}

const added = addOne(9);

console.log(added);
