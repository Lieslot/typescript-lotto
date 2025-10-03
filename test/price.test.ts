import { Errors } from "../src/common";
import { Price } from "../src/lotto";

describe('Price', () => {
    it('1000単位ではない場合', () => {
        expect(() => new Price(1001)).toThrow(Errors.INVALID_PRICE);
    });
    it('1000以下の場合', () => {
        expect(() => new Price(800)).toThrow(Errors.INVALID_PRICE);
    });
    it('1000単位の場合', () => {
        const price = new Price(3000);
        expect(price.calculateIssuedCount()).toBe(3);
    });
});


