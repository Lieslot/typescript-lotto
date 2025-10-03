

enum Errors{
    DUPLICATE_NUMBER = '[ERROR] 番号が重複しています',
    INVALID_NUMBER = '[ERROR] 番号が1-45の間ではありません',
    INVALID_LENGTH = '[ERROR] 番号の個数が6個ではありません',
    INVALID_PRICE = '[ERROR] 金額が1000単位ではありません',
    INVALID_NUMBER_FORMAT = '[ERROR] 番号が数字ではありません',
    INVALID_PRICE_FORMAT = '[ERROR] 金額が数字ではありません',
    INVALID_LENGTH_FORMAT = '[ERROR] 番号の個数が数字ではありません',
    INVALID_RANK = '[ERROR] ランクが見つかりません',
}

export { Errors }