/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       17 Mar 2014     lalmaula
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */
function copyrule(type) {
	
	//var data = nlapiSearchRecord('projecttask', customsearch69, new
	//		nlobjSearchFilter('company', null, 'anyOf', nlapiGetRecordId()),
	//		[new nlobjSearchColumn('taskname'), new nlobjSearchColumn('resname'), 
	//		new nlobjSearchColumn('serviceitem')]);
	//var rec = nlapiLoadRecord('job',2041);
	//var fields = rec.getAllFields(); 
	//  var fields = rec.getAllSublists() ;
	//for (var i = 0; i < fields.length; i++)
	//{
	//nlapiLogExecution('DEBUG','Fields :'+fields[i]+rec.getValue(fields[i]));
//		nlapiLogExecution('DEBUG','Sublists :'+fields[i]);
//	}
	
	var searchResults = nlapiSearchRecord('projecttask', null, new
			nlobjSearchFilter('company', null, 'is', 2041),
		[new nlobjSearchColumn('title'), 
		 new nlobjSearchColumn('resource','projectTaskAssignment'), 
			new nlobjSearchColumn('serviceitem','projecttaskassignment'),
			new nlobjSearchColumn('billingclass','projecttaskassignment'),
			new nlobjSearchColumn('estimatedwork','projecttaskassignment'),
			new nlobjSearchColumn('unitprice','projecttaskassignment'),
			new nlobjSearchColumn('price','projecttaskassignment'),
			new nlobjSearchColumn('cost','projecttaskassignment')
			]);
	
	for ( var i = 0; searchResults != null && i < searchResults.length; i++ )
	{
	var searchresult = searchResults[ i ];
	nlapiLogExecution('DEBUG','ID, name, order :'+searchresult.getValue('title')+searchresult.getValue('resource') +searchresult.getValue('serviceitem') + searchresult.getValue('billingclass'));
	}
	
	/*var filters = new Array();
	filters[0] = new nlobjSearchFilter('entityid', 'job', 'is', 'PP Template' );
	
	var columns = new Array();
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('name');
	columns[2] = new nlobjSearchColumn('ruleorder');
	var searchResults =  nlapiSearchRecord('chargerule',null ,filters,columns);

	for ( var i = 0; searchResults != null && i < searchResults.length; i++ )
	{
	var searchresult = searchResults[ i ];
	nlapiLogExecution('DEBUG','ID, name, order :'+searchresult.getValue('internalid') +searchresult.getValue('name') + searchresult.getValue('ruleorder'));
	}
	*/

}
