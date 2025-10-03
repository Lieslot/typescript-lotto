import { Errors } from "./common";
import { Lotto } from "./lotto";

class WinningLotto {

    private _winningLotto: Lotto;
    private _bonusNumber: number;

    constructor(winningLotto: Lotto, bonusNumber: number) {
        this.validate(winningLotto, bonusNumber);
        this._winningLotto = winningLotto;
        this._bonusNumber = bonusNumber;
    }

    private validate(winningLotto: Lotto, bonusNumber: number) {

        if (winningLotto.has(bonusNumber)) {
            throw new Error(Errors.DUPLICATE_NUMBER);
        }

    }

    public has(number: number) {
        return this._winningLotto.has(number);
    }

    public hasBonusNumber(number: number) {
        return this._bonusNumber === number;
    }

    public get winningLotto() {
        return this._winningLotto;
    }

}

export { WinningLotto };