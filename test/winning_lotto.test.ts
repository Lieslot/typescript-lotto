import { Lotto } from "../src/lotto";
import { Errors } from "../src/common";
import { WinningLotto } from "../src/winninglotto";


describe('WinningLotto', () => {
    it('lottoが重複している場合', () => {
        expect(() => new WinningLotto(new Lotto([1, 2, 3, 4, 5, 5]), 6)).toThrow(Errors.DUPLICATE_NUMBER);
    });

    it('bonusNumberが重複している場合', () => {
        expect(() => new WinningLotto(new Lotto([1, 2, 3, 4, 5, 6]), 6)).toThrow(Errors.DUPLICATE_NUMBER);
    });
    
});



