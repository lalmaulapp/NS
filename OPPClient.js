/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       18 Mar 2014     lalmaula
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */
function clientPageInit(type){
	
	//var rec =  nlapiGetNewRecord();
	var searchresult = nlapiSearchRecord('transaction', 'customsearch75', new
			nlobjSearchFilter('internalid', 'opportunity', 'is', nlapiGetRecordId()),new nlobjSearchColumn('tranid',null,'max'));
	
	nlapiSetFieldValue('custbody_pp_opp_latest_estimate',searchresult[0].getValue('tranid',null,'max'));
 

   
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @param {Number} linenum Optional line item number, starts from 1
 * @returns {Void}
 */
function clientFieldChanged(type, name, linenum){
 
}
