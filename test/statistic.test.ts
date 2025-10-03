import { Lotto, Price } from "../src/lotto";
import { WinningLotto } from "../src/winninglotto";
import { calculateRank, Rank, calculateProfitRate } from "../src/stastics";


// 統計計算テスト
describe('Rank', () => {
    it('1位の場合', () => {
        const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
        const winningLotto = new WinningLotto(new Lotto([1, 2, 3, 4, 5, 6]), 7);
        const rank = calculateRank(lotto, winningLotto);
        expect(rank).toBe(Rank.FIRST);
    });
    it('2位の場合', () => {
        const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

        const winningLotto = new WinningLotto(new Lotto([1, 2, 3, 4, 5, 8]), 6);
        const rank = calculateRank(lotto, winningLotto);
        expect(rank).toBe(Rank.SECOND);
    });
    it('3位の場合', () => {
        const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
        const winningLotto = new WinningLotto(new Lotto([1, 2, 3, 4, 5, 9]), 7);
        const rank = calculateRank(lotto, winningLotto);
        expect(rank).toBe(Rank.THIRD);
    });



    describe('ボーナス番号が一致しない場合', () => {
        it('4位の場合', () => {
            const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
            const winningLotto = new WinningLotto(new Lotto([1, 2, 3, 4, 7, 8]), 9);
            const rank = calculateRank(lotto, winningLotto);
            expect(rank).toBe(Rank.FOURTH);
        });
            
        it('5位の場合', () => {
            const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
            const winningLotto = new WinningLotto(new Lotto([1, 2, 3, 7, 8, 9]), 10);
            const rank = calculateRank(lotto, winningLotto);
            expect(rank).toBe(Rank.FIFTH);
        });
    });

    describe('ボーナス番号が一致する場合', () => {

        it('4位の場合', () => {
            const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
            const winningLotto = new WinningLotto(new Lotto([1, 2, 3, 4, 7, 8]), 6);
            const rank = calculateRank(lotto, winningLotto);
            expect(rank).toBe(Rank.FOURTH);
        });
        it('5位の場合', () => {
            const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
            const winningLotto = new WinningLotto(new Lotto([1, 2, 3, 7, 8, 9]), 6);
            const rank = calculateRank(lotto, winningLotto);
            expect(rank).toBe(Rank.FIFTH);
        });
    });
});

describe('calculateProfitRate', () => {

    it('余りがある場合', () => {
        const stastics = {
            [Rank.FIRST]: 0,
            [Rank.SECOND]: 0,
            [Rank.THIRD]: 0,
            [Rank.FOURTH]: 0,
            [Rank.FIFTH]: 1,
            [Rank.NONE]: 1,
        }; // 5000
        const price = new Price(8000);
        const profitRate = calculateProfitRate(stastics, price);
        expect(profitRate).toBe('62.5');
    });
    it('小数点以下2桁の場合 - round down', () => {
        const stastics = {
            [Rank.FIRST]: 0,
            [Rank.SECOND]: 0,
            [Rank.THIRD]: 0,
            [Rank.FOURTH]: 0,
            [Rank.FIFTH]: 1,
            [Rank.NONE]: 1,
        }; // 5000
        const price = new Price(7000);
        const profitRate = calculateProfitRate(stastics, price);
        expect(profitRate).toBe('71.4');
    });

    it('小数点以下2桁の場合 - round up', () => {
        const stastics = {
            [Rank.FIRST]: 0,
            [Rank.SECOND]: 0,
            [Rank.THIRD]: 0,
            [Rank.FOURTH]: 0,
            [Rank.FIFTH]: 1,
            [Rank.NONE]: 1,
        }; // 5000
        const price = new Price(9000);
        const profitRate = calculateProfitRate(stastics, price);
        expect(profitRate).toBe('55.6');
    });

});