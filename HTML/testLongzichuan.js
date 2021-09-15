function getLong (a, b) {


    let shortArr = (a.split(""))
    let longArr = (b.split(""))
    let unionArr = ([...shortArr, ...longArr]);
    let differenceArr = ([...unionArr].filter(x => !longArr.has(x)));
    return differenceArr;
}
getLong("ba","bba")