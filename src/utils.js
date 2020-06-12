export function newCondition(id, fld, op, val) {
    return {
        id: id,
        type: 'cond',
        dataLength: 3,
        field: fld,
        operator: op,
        value: val,
    }
}

export function newOperator(id, op) {
    return {
        id: id,
        type: 'op',
        dataLength: 1,
        value: op,
    }
}