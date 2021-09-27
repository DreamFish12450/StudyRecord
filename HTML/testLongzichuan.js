function getLong (a, b) {


    let shortArr = (a.split(""))
    let longArr = (b.split(""))
    let unionArr = ([...shortArr, ...longArr]);
    let differenceArr = ([...unionArr].filter(x => !longArr.includes(x)));
    return differenceArr;
}
getLong("ba","bba")