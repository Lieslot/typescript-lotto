import { Lotto } from "../src/lotto";
import { WinningLotto } from "../src/winninglotto";
import { calculateRank, Rank } from "../src/stastics";


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

