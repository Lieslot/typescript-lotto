import * as readline from "readline";
import { issueLottoByPrice, Lotto, Price } from "./lotto";
import { Errors, LOTTO_NUMBER_RANGE } from "./common";
import { WinningLotto } from "./winninglotto";
import { calculateProfitRate, calculateStastics, Rank } from "./stastics";


const rl : readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (question : string) : Promise<string> => {
    return new Promise((resolve) => {
        rl.question(question, (answer : string) => {
            resolve(answer);
        });
    });
}


const inputUntilSuccess = async (func : () => Promise<any>) : Promise<any> => {
    while (true) {
        try {
            return await func();
        } catch (error: unknown) {
            const err = error as Error;
            console.log(err.message);
            continue;
        }
    }
}


const inputPrice = async () : Promise<number> => {
    const priceInput = parseInt(await ask('구입금액을 입력해 주세요.\n'), 10);
    if (priceInput % 1000 !== 0 || priceInput < 1000 || isNaN(priceInput)) {
        throw new Error(Errors.INVALID_PRICE);
    }
    return priceInput;
}

const inputWinningLotto = async () : Promise<Lotto> => {

    const winningLottoInput = await ask('당첨 번호를 입력해 주세요.\n');
    const lotto = new Lotto(winningLottoInput.split(',').map(Number));
    return new Promise<Lotto>((resolve) => {
        resolve(lotto);
    });
}

const inputBonusNumber = async () : Promise<number> => {
    const bonusNumberInput = await ask('보너스 번호를 입력해 주세요.\n');
    const bonusNumber = parseInt(bonusNumberInput, 10);

    if (isNaN(bonusNumber) || bonusNumber < LOTTO_NUMBER_RANGE.MIN || bonusNumber > LOTTO_NUMBER_RANGE.MAX) {
        throw new Error(Errors.INVALID_NUMBER);
    }
    return bonusNumber;
}

const inputWinningLottoAndBonusNumber = async () : Promise<WinningLotto>=> {
    const winningLotto = await inputUntilSuccess(inputWinningLotto);
    const bonusNumber = await inputUntilSuccess(inputBonusNumber);

    return new WinningLotto(winningLotto, bonusNumber);
}



(async () => {
    // 1. ユーザーが金額を入力
    const price : Price = new Price(await inputUntilSuccess(inputPrice));
    // 2. 発行する個数を計算

    const randomLottos = issueLottoByPrice(price);

    console.log(`${randomLottos.length}개를 구매했습니다.`);
    console.log(randomLottos.map(lotto => `[${lotto.lottoNumbers.join(', ')}]`).join('\n'));

    // 3. あたりくじの番号を入力
    const winningLotto = await inputUntilSuccess(inputWinningLottoAndBonusNumber);

    // 4. あたり統計の計算
    const stastics = calculateStastics(winningLotto, randomLottos);

    // 5. 収益率の計算
    const profitRate = calculateProfitRate(stastics, price);

    // 6. あたり統計と収益率を出力  ]

    console.log("당첨 통계")
    console.log("---")
    console.log(`3개 일치 (5,000원) - ${stastics[Rank.FIFTH]}개`)
    console.log(`4개 일치 (50,000원) - ${stastics[Rank.FOURTH]}개`)
    console.log(`5개 일치 (1,500,000원) - ${stastics[Rank.THIRD]}개`)
    console.log(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${stastics[Rank.SECOND]}개`)
    console.log(`6개 일치 (2,000,000,000원) - ${stastics[Rank.FIRST]}개`)
    console.log(`총 수익률은 ${profitRate}%입니다.`)

    rl.close();
})();

