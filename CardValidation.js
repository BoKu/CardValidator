function isMedicareCardValid(cardNumber)
{
    // check for length
    if (cardNumber.length < 10)
    {
        return false;
    }
    //
    if (cardNumber.length > 11)
    {
        return false;
    }
    if (cardNumber.charAt(0) > 1 && cardNumber.charAt(0) < 7)
    {
    }
    else
    {
        //addTrace("First digit of the medicare card must be in range of 2 to 6");
        return false;
    }
    // now validate the check sum for digit 2 to 8
    // multiply digit 1-8 by 1,3,7,9,1,3,7,9 respectively
    var d1 = cardNumber.charAt(0) * 1;
    var d2 = cardNumber.charAt(1) * 3;
    var d3 = cardNumber.charAt(2) * 7;
    var d4 = cardNumber.charAt(3) * 9;
    var d5 = cardNumber.charAt(4) * 1;
    var d6 = cardNumber.charAt(5) * 3;
    var d7 = cardNumber.charAt(6) * 7;
    var d8 = cardNumber.charAt(7) * 9;
    // sum it up
    var dtot = d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8;
    // divide by 10 and get the remainder
    var rm = dtot % 10;
    // the check sum digit is digit 9 of the card number
    var dcheck = cardNumber.charAt(8);
    if (rm != dcheck)
    {
        //addTrace("Invalid medicare card number::Failed check sum test");
        return false;
    }
    //
    return true;
}

function isDVAValid(DVANo)
{
	var WarCodes = "|A|AGX|BUR|BW|CGW|CN|CNK|CNX|CNS|FIJ|GHA|GW|HKS|HKX|IND|IV|KM|KYA|MAL|MAU|MLS|MTX|MWI|N|NF|NG|NGR|NK|NRD|NSM|NSS|NSW|NX|P|PAD|PAM|PCA|PCR|PCV|PK|PMS|PSM|PSW|PWO|PX|Q|RD|RDX|SA|SAX|SL|SM|SR|SS|SUD|SWP|TZA|V|X|";
	var HospitalMedicalPrefix = false;
	var warCode = "|";
	var LastWCPos = 1;
	if (DVANo == "")
	{
		return false;
	}
	
	if (DVANo.length < 7 || DVANo.length > 9)
	{
		return false;
	}

	DVANo = DVANo.toUpperCase();

	if ("NVQSWT".indexOf(DVANo.charAt(0)) < 0)
	{
	    if ("HM".indexOf(DVANo.charAt(0)) >= 0)
		{
			HospitalMedicalPrefix = true;
		}
		else
		{
			return false;
		}
	}

	warCode += DVANo.charAt(1);
	for (var wc = 2; wc < 5; wc++)
	{
	    if (!isNumber(DVANo.charAt(wc)))
		{
		    warCode += DVANo.charAt(wc);
		}
		else
		{
			break;
		}
		LastWCPos = wc;
	}
	warCode += "|";

	if (WarCodes.indexOf(warCode) < 0)
	{
		if (HospitalMedicalPrefix)
		{
		    if (!WarCodes.indexOf(warCode.substring(1)) >= 0)
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	}
	
	for (var bal = LastWCPos + 1; bal < DVANo.length - 1; bal++)
	{
	    if (!isNumber(DVANo.charAt(bal)))
		{
			return false;
		}
	}
	
	return true;
}

function isNumber(n)
{
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isHealthcarePensionPharmacyValid(CardNo) {
	if (CardNo.length < 10 || CardNo.length > 11) {
		return false;
	}

	CardNo = CardNo.toUpperCase();

	var CheckSum = 0;

	for (var i = 0; i < 9; i++) {
		if (!isNumber(CardNo.charAt(i))) {
			return false;
		}
		switch (i) {
			case 0:
				CheckSum += 512 * CardNo.charAt(i);
				break;
			case 1:
				CheckSum += 256 * CardNo.charAt(i);
				break;
			case 2:
				CheckSum += 128 * CardNo.charAt(i);
				break;
			case 3:
				CheckSum += 64 * CardNo.charAt(i);
				break;
			case 4:
				CheckSum += 32 * CardNo.charAt(i);
				break;
			case 5:
				CheckSum += 16 * CardNo.charAt(i);
				break;
			case 6:
				CheckSum += 8 * CardNo.charAt(i);
				break;
			case 7:
				CheckSum += 4 * CardNo.charAt(i);
				break;
			case 8:
				CheckSum += 2 * CardNo.charAt(i);
				break;
		}
	}

	var ck = CheckSum % 11;

	var CheckDigit = "XVTSLKJHCBA"[ck];

	if (CheckDigit != CardNo[9]) {
		return false;
	}

	if (CardNo.length == 11) {
		if (isNumber(CardNo.charAt(10))) {
			return false;
		}
	}

	return true;
}

function isSafetyNetCardValid(CardNo, CardType) {
	if (CardNo.length != 11) {
		return false;
	}

	CardNo = CardNo.toUpperCase();

	switch (CardType) {
		case 1:
			if (CardNo.substring(0, 2) != "SN") {
				return false;
			}
			break;
		case 2:
			if (CardNo.substring(0, 2) != "CN") {
				return false;
			}
			break;
		default:
			return false;
	}

	var currentDateTime = new Date();

	if (CardNo[2] != currentDateTime.getFullYear().toString()[3]) {
		return false;
	}

	var CheckSum = 0;

	for (var i = 2; i < 10; i++) {
		if (!isNumber(CardNo.charAt(i))) {
			return false;
		}
		switch (i) {
			case 2:
				CheckSum += parseInt(CardNo.substring(i, i + 1));
				break;
			case 3:
				CheckSum += 3 * parseInt(CardNo.substring(i, i + 1));
				break;
			case 4:
				CheckSum += 7 * parseInt(CardNo.substring(i, i + 1));
				break;
			case 5:
				CheckSum += 9 * parseInt(CardNo.substring(i, i + 1));
				break;
			case 6:
				CheckSum += parseInt(CardNo.substring(i, i + 1));
				break;
			case 7:
				CheckSum += 3 * parseInt(CardNo.substring(i, i + 1));
				break;
			case 8:
				CheckSum += 7 * parseInt(CardNo.substring(i, i + 1));
				break;
			case 9:
				CheckSum += 9 * parseInt(CardNo.substring(i, i + 1));
				break;
		}
	}

	var CheckDigit = CheckSum % 10;
	if (CheckDigit.toString() != CardNo.substring(10, 11)) {
		return false;
	}

	return true;
}

function isSafetyNetCardValidForDate(CardNo, CardType, VisitDate) {

	if (CardNo.length != 11) {
		return false;
	}

	CardNo = CardNo.toUpperCase();

	switch (CardType) {
		case 1:
			if (CardNo.substring(0, 2) != "SN") {
				return false;
			}
			break;
		case 2:
			if (CardNo.substring(0, 2) != "CN") {
				return false;
			}
			break;
		default:
			return false;
	}

	if (CardNo[2] != VisitDate.getFullYear().toString()[3]) {
		return false;
	}

	var CheckSum = 0;

	for (var i = 2; i < 10; i++) {
		if (!isNumber(CardNo.charAt(i))) {
			return false;
		}
		switch (i) {
			case 2:
				CheckSum += parseInt(CardNo.substring(i, i + 1));
				break;
			case 3:
				CheckSum += 3 * parseInt(CardNo.substring(i, i + 1));
				break;
			case 4:
				CheckSum += 7 * parseInt(CardNo.substring(i, i + 1));
				break;
			case 5:
				CheckSum += 9 * parseInt(CardNo.substring(i, i + 1));
				break;
			case 6:
				CheckSum += parseInt(CardNo.substring(i, i + 1));
				break;
			case 7:
				CheckSum += 3 * parseInt(CardNo.substring(i, i + 1));
				break;
			case 8:
				CheckSum += 7 * parseInt(CardNo.substring(i, i + 1));
				break;
			case 9:
				CheckSum += 9 * parseInt(CardNo.substring(i, i + 1));
				break;
		}
	}

	var CheckDigit = CheckSum % 10;
	if (CheckDigit.toString() != CardNo.substring(10, 11)) {
		return false;
	}

	return true;
}
