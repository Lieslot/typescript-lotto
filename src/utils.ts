function pickUniqueNumbersInRange(start: number, end: number, count: number) {
    
    const numbers: number[] = [];
    
    while (count--) {
        let random = Math.floor(Math.random() * (end - start + 1)) + start;
        
        while (numbers.includes(random)) {
            random = Math.floor(Math.random() * (end - start + 1)) + start;
        }

        numbers.push(random);
    }

    return numbers;
}

export { pickUniqueNumbersInRange };