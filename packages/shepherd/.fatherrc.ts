/*
export default {
    target: 'node',
    cjs: { type: 'babel', lazy: true },
    disableTypeCheck: false,
};
*/
export default {
    target: 'browser',
    cjs:false,
    esm: { type: 'babel', importLibToEs: true },
    disableTypeCheck: false,
};
