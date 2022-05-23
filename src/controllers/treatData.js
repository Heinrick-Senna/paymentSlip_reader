exports.treatingTicket = (req, res) => {
    try {
        const { ticket } = req.params;
        let type;

        // validando o input e o tipo de boleto
        validateInput(ticket);
        type = getType(ticket);

        return res.json(type == 'bill' ? treatBill(ticket) : treatTitle(ticket));

    } catch(err) {
        return res.status(400).json({
            menssagem: err,
            status: 400
        });
    } 
}

function validateInput(string) {
    if (!string) throw 'A linha digitável não pode estar em branco.';

    if (string.replace(' ', '') != string) throw 'A linha digitável não pode conter espaços em branco.';

    if (isNaN(string) || string.replace('.', '') != string) throw 'A linha digitável deve conter apenas números.';

    

    return;
}

function getType(string) {
    switch (string.length) {
        case 47:
            return 'bill';
        case 48:
            return 'title';
        default:
            throw 'A linha digitável deve conter 47 ou 48 caractéres';
    }
}

function treatBill(str) {
    let initialCode = str.substring(0, 4),
        values = str.substring(33), 
        lastDigits = str.substring(4, 31);

    validateDV([str.substring(0, 10), str.substring(10, 21), str.substring(21, 32)])

    lastDigits = removeChar(lastDigits, 6);
    lastDigits = removeChar(lastDigits, 16);

    let verificationCode = dvCode(initialCode + values + lastDigits),
        barCode = initialCode + verificationCode + values + lastDigits;

    return {barCode: barCode, ...calculateBillInfos(values)};
}

function validateDV(sections) {
    for (let i = 0; i < sections.length; i++) {
        let section = sections[i].substring(sections[i].length - 1, 0), 
            dvCode = sections[i].substring(sections[i].length - 1)
    
        let sumOfAll = 0;
        for (let j = section.length - 1; j >= 0; j--) {
            let numberToUse;
            if (section.length % 2 != 0) {
                if ((j % 2) == 0) numberToUse = 2;
                else numberToUse = 1;
            } else {
                if ((j % 2) != 0) numberToUse = 2;
                else numberToUse = 1;
            }
    
            let multiplication = parseInt(section[j]) * numberToUse;
                multiplication = multiplication.toString();
                multiplication = multiplication.length > 1 ? parseInt(multiplication[0]) + parseInt(multiplication[1]) : parseInt(multiplication[0]);
    
            sumOfAll += parseInt(multiplication)
        }
    
        let rest = sumOfAll % 10,
            calcCode = (Math.ceil(rest / 10) * 10) - rest;
    
    
        if (calcCode != dvCode) throw `O ${i+1}º código verificador não confere`; 
    }
}

function dvCode(digits) {
    let initNumber = 4, someOfAll = 0;
    
    for (let i = 0; i < digits.length; i++) {
        initNumber = initNumber == 1 ? 9 : initNumber;
        someOfAll += initNumber * parseInt(digits[i]);
        initNumber--;
    }
    
    let dvCode = 11 - (someOfAll % 11);
    return dvCode == 0 || dvCode ==  10 || dvCode == 11 ? 1 : dvCode;
}

function calculateBillInfos(str) {
    let returnObj = {};
    
    let strPayment = str.substring(4).substring(8, 0),
        floatPoint = str.substring(12);

    let amount = Number(parseInt(strPayment) + '.' + floatPoint).toFixed(2);

    if (amount.toString() != '0.00' && amount) returnObj.amount = amount;

    let baseDate = new Date('1997/10/07'),
        strDate = parseInt(str.substring(0, 4));

    returnObj.expirationDate = new Date(baseDate.setDate(baseDate.getDate() + strDate)).toISOString().substring(0, 10);

    return returnObj;
}

function treatTitle(str) {

    validateDV([str.substring(0, 12), str.substring(12, 24), str.substring(24, 36), str.substring(36, 48)]);
    
    str = removeChar(str, 12);
    str = removeChar(str, 23);
    str = removeChar(str, 34);
    str = str.substring(str.length-1, 0);
    
    let values = str.substring(4).substring(0, 11) + str.substring(19).substring(0, 8);

    return {barCode: str, ...calculateInfosTitle(values)};
}

function calculateInfosTitle(str) {
    let returnObj = {}, 
        strPayment = str.substring(9, 0);
        floatPoint = str.substring(9).substring(0, 2);

    let amount = Number(parseInt(strPayment) + '.' + floatPoint).toFixed(2);

    if (amount.toString() != '0.00' && amount) returnObj.amount = amount;

    let strDate = str.substring(11);
        strDate = strDate.substring(0, 4) + '-' + strDate.substring(4).substring(0, 2) + '-' + strDate.slice(6);
    
    let date = new Date(strDate);

    if (date.toString() != 'Invalid Date') returnObj.expirationDate = date.toISOString().substring(0, 10);

    return returnObj;
}

function removeChar(str, i) {
    return str.substring(i-1, 0) + str.substring(i);
}