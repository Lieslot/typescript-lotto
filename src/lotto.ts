import { Errors, LOTTO_NUMBER_COUNT, LOTTO_NUMBER_RANGE, PRICE_UNIT } from './common';
import  { pickUniqueNumbersInRange } from './utils';


class Lotto {

    private readonly _lottoNumbers: number[];

    constructor(lottoNumbers: number[]) {
        this.validate(lottoNumbers);
        this._lottoNumbers = lottoNumbers;
    }

    private validate(lottoNumbers: number[]) {
        this.validateLength(lottoNumbers);
        this.validateNumber(lottoNumbers);
        this.validateDuplicate(lottoNumbers);
    }

    private validateDuplicate(lottoNumbers: number[]) {
        if (lottoNumbers.some((number, index) => lottoNumbers.indexOf(number) !== index)) {
            throw new Error(Errors.DUPLICATE_NUMBER);
        }
    }

    private validateLength(lottoNumbers: number[]) {
        if (lottoNumbers.length !== LOTTO_NUMBER_COUNT) {
            throw new Error(Errors.INVALID_LENGTH);
        }
    }

    private validateNumber(lottoNumbers: number[]) {
        if (lottoNumbers.some(number => number < LOTTO_NUMBER_RANGE.MIN || number > LOTTO_NUMBER_RANGE.MAX)) {
            throw new Error(Errors.INVALID_NUMBER);
        }
    }

    public get lottoNumbers(): number[] {
        return [...this._lottoNumbers];
    }

    public has(number: number) : boolean {
        return this._lottoNumbers.includes(number);
    }

}
class Price {

    private readonly _price: number;

    constructor(price: number) {
        this.validate(price);
        this._price = price;
    }

    private validate(price: number) {

        if (price % PRICE_UNIT !== 0 || price < PRICE_UNIT) {
            throw new Error(Errors.INVALID_PRICE);
        }
    }

    public calculateIssuedCount() : number {
        return this._price / PRICE_UNIT;
    }

    public get price() : number {
        return this._price;
    }
}


const issueLottoByPrice = (price: Price) : Lotto[] => {

    const issuedCount = price.calculateIssuedCount();

    const lottos: Lotto[] = [];

    for (let i = 0; i < issuedCount; i++) {
        lottos.push(generateRandomLotto());
    }

    return lottos;
}


const generateRandomLotto = () => {
    return new Lotto(pickUniqueNumbersInRange(LOTTO_NUMBER_RANGE.MIN, LOTTO_NUMBER_RANGE.MAX, LOTTO_NUMBER_COUNT));
}

export { issueLottoByPrice, Lotto, Price };