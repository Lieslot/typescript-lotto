import { Lotto, Price } from "./lotto";
import { WinningLotto } from "./winninglotto";


type RankPair = {number: number, bonus: boolean}
type ScoreBoard = Record<Rank, number>;


enum Rank {
    FIRST, // 6個一致
    SECOND, // 5個一致 + ボーナス一致
    THIRD, // 5個一致
    FOURTH, // 4個一致
    FIFTH, // 3個一致
    NONE, // ランクなし
}

const RankPrice: Record<Rank, number> = {
    [Rank.FIRST]: 2000000000,
    [Rank.SECOND]: 30000000,
    [Rank.THIRD]: 1500000,
    [Rank.FOURTH]: 50000,
    [Rank.FIFTH]: 5000,
    [Rank.NONE]: 0,
}

const RankCondition : {
    condition: RankPair,
    rank: Rank,
}[] =
[
        {condition: {number: 6, bonus: false}, rank: Rank.FIRST},
        {condition: {number: 6, bonus: true}, rank: Rank.FIRST},
        {condition: {number: 5, bonus: true}, rank: Rank.SECOND},
        {condition: {number: 5, bonus: false}, rank: Rank.THIRD},
        {condition: {number: 4, bonus: false}, rank: Rank.FOURTH},
        {condition: {number: 4, bonus: true}, rank: Rank.FOURTH},
        {condition: {number: 3, bonus: false}, rank: Rank.FIFTH},
        {condition: {number: 3, bonus: true}, rank: Rank.FIFTH},
]

const findRank = (condition: RankPair): Rank => {
    const rank = RankCondition.find(
        rank => rank.condition.number === condition.number &&
        rank.condition.bonus === condition.bonus)?.rank;
    if (rank === undefined) {
        return Rank.NONE;
    }
    return rank;
}

const calculateRankCondition = (lotto: Lotto, winningLotto: WinningLotto): RankPair => {
    let matchCount = 0;
    let bonusMatch = false;

    for (const lottoNumber of lotto.lottoNumbers) {
        if (winningLotto.has(lottoNumber)) {
            matchCount++;
        }
        if (winningLotto.hasBonusNumber(lottoNumber)) {
            bonusMatch = true;
        }
    }

    return {number: matchCount, bonus: bonusMatch};

}


const calculateRank = (lotto: Lotto, winningLotto: WinningLotto): Rank => {
    const rankPair = calculateRankCondition(lotto, winningLotto);
    return findRank(rankPair);
}



const calculateStastics = (winningLotto: WinningLotto, lottos: Lotto[]): ScoreBoard => {

    const stastics : ScoreBoard = {
        [Rank.FIRST]: 0,
        [Rank.SECOND]: 0,
        [Rank.THIRD]: 0,
        [Rank.FOURTH]: 0,
        [Rank.FIFTH]: 0,
        [Rank.NONE]: 0,
    }

    for (const lotto of lottos) {
        const rank : Rank = calculateRank(lotto, winningLotto);
        stastics[rank]++;
    }

    return stastics;
}

const calculateTotal = (stastics: ScoreBoard): number => {
    let total = 0;
    for (const rankStr in stastics) {
        const rank = Number(rankStr) as Rank;
        if (rank === Rank.NONE) {
            continue;
        }
        total += (stastics[rank] || 0) * RankPrice[rank];
    }
    return total;
}

const calculateProfitRate = (stastics: ScoreBoard, price: Price): string => {
    const total = calculateTotal(stastics);
    console.log(`total: ${total}, price: ${price.price}`);
    return  (total * 100 / price.price).toFixed(1);
}



export { calculateStastics, calculateRank, Rank, calculateProfitRate };