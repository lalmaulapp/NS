/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       06 Nov 2013     lalmaula
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm} form Current form
 * @param {nlobjRequest} request Request object
 * @returns {Void}
 */
function userEventBeforeLoad(type, form, request){
	
	//if (type =='create' )
//	{ 
		
		var newExpRec = nlapiGetNewRecord();
	//var context = nlapiGetContext();
	//var paramfield = context.getSetting('SCRIPT','custscript1');
//var filterexpr = 0||
//	[['allowexpenses','is','T'] , 'AND',  [['limittimetoassignees','is','F']
//	         , 'OR', [['limittimetoassignees','is','T'], 'AND', 
//	               ['jobresource','is', 'employee']]
// ]];
  


//var columns = new Array();

//columns[0] = new nlobjSearchColumn( 'entityid' );
//columns[1] = new nlobjSearchColumn( 'internalid' );

var select = form.addField('proj','select','Select Project');

//var searchResults =  nlapiSearchRecord('job', null,filterexpr,columns);
\*
for ( var i = 0; searchResults != null && i < searchResults.length; i++ )
{
var searchresult = searchResults[ i ];

var eid = searchresult.getValue('entityid');
var intid= searchresult.getValue('internalid');

nlapiLogExecution('DEBUG',' ProjID: '+eid+' Int ID: '+intid);

*\
select.addSelectOption(intid,eid);
}
}
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit
 *                      approve, reject, cancel (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF)
 *                      markcomplete (Call, Task)
 *                      reassign (Case)
 *                      editforecast (Opp, Estimate)
 * @returns {Void}
 */
function userEventBeforeSubmit(type){
 
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit,
 *                      approve, cancel, reject (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF only)
 *                      dropship, specialorder, orderitems (PO only) 
 *                      paybills (vendor payments)
 * @returns {Void}
 */
function userEventAfterSubmit(type){
  
}
