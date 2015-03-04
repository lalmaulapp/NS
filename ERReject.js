/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       06 Jun 2014     lalmaula
 *
 */

/**
 * @returns {Void} Any or no return value
 */
function ERReject() {

	 nlapiSubmitField('expensereport', nlapiGetRecordId(), 'approvalstatus', 3);
	 
	 
	 var oData = new Object(); 
	  oData.custparam_tranid =nlapiGetRecordId();
	 
	 nlapiSetRedirectURL('SUITELET', 'customscript47', 'customdeploy1', null, oData);

}
