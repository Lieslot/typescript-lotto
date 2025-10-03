import { Errors } from '../src/common';
import { Lotto } from '../src/lotto';


describe('Lotto', () => {
    it('重複している場合', () => {
        expect(() => new Lotto([1, 2, 3, 4, 5, 5])).toThrow(Errors.DUPLICATE_NUMBER);
    });
    // 6個ではない場合
    it('6個ではない場合', () => {
        expect(() => new Lotto([1, 2, 3, 4, 5])).toThrow(Errors.INVALID_LENGTH);
    });

    // 数字が1-45の間ではない場合
    it('数字が1-45の間ではない場合', () => {
        expect(() => new Lotto([1, 2, 3, 4, 5, 46])).toThrow(Errors.INVALID_NUMBER);
    });

});


