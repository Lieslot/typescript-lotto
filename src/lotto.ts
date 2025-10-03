import { Errors } from './common';
import  { pickUniqueNumbersInRange } from './utils';


class Lotto {

    constructor(public _lottoNumbers: number[]) {
        this.validate(_lottoNumbers);
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
        if (lottoNumbers.length !== 6) {
            throw new Error(Errors.INVALID_LENGTH);
        }
    }

    private validateNumber(lottoNumbers: number[]) {
        if (lottoNumbers.some(number => number < 1 || number > 45)) {
            throw new Error(Errors.INVALID_NUMBER);
        }
    }

    public get lottoNumbers() {
        return this._lottoNumbers;
    }

}

class Price {

    private _price: number;

    constructor(price: number) {
        this.validate(price);
        this._price = price;
    }

    private validate(price: number) {

        if (price % 1000 !== 0 || price < 1000) {
            throw new Error(Errors.INVALID_PRICE);
        }
    }

    public calculateIssuedCount() {
        return this._price / 1000;
    }
}


const issueLottoByPrice = (price: number) : Lotto[] => {

    const issuedCount = new Price(price).calculateIssuedCount();

    const lottos: Lotto[] = [];

    for (let i = 0; i < issuedCount; i++) {
        lottos.push(generateRandomLotto());
    }

    return lottos;
}


const generateRandomLotto = () => {
    return new Lotto(pickUniqueNumbersInRange(1, 45, 6));
}

export { issueLottoByPrice, Lotto, Price };