/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       03 Apr 2014     lalmaula
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
 
//if ( form =='Custom Project Form 2')	
//{
	if (type=='edit' || 'view')
	{
		nlapiLogExecution('DEBUG','in PRJ UE');
	// add a sublist to the form. Specify an internal ID for the sublist, 
	//a sublist type, sublist UI label, and the tab the sublist will appear on
	
	// perform a  record search. Set search filters and return columns 
	
	 var columns =new Array();

	columns[0] = new nlobjSearchColumn('title'); 
	columns[1] = new nlobjSearchColumn('resource','projectTaskAssignment');
	columns[2] = 	new nlobjSearchColumn('serviceitem','projecttaskassignment');
	columns[3] = 	new nlobjSearchColumn('billingclass','projecttaskassignment');
	columns[4] =	new nlobjSearchColumn('estimatedwork','projecttaskassignment');
	columns[5] = 	new nlobjSearchColumn('unitprice','projecttaskassignment');
	columns[6] = 	new nlobjSearchColumn('price','projecttaskassignment');
	columns[7] =	new nlobjSearchColumn('cost','projecttaskassignment');
	columns[8] = new nlobjSearchColumn('grossprofit','projecttaskassignment');
	columns[9] = new nlobjSearchColumn('startdate');
	columns[10] = new nlobjSearchColumn('enddate');
	columns[11] = new nlobjSearchColumn('units','projecttaskassignment');
	columns[12] = new nlobjSearchColumn('unitcost','projecttaskassignment');
	
		//]);
		//*/
	var data = nlapiSearchRecord('projecttask', null, new
			nlobjSearchFilter('company', null, 'anyOf', nlapiGetRecordId()),columns);
	// display the search results on the Custom  sublist
	var projtaskassign = form.addSubList('custpage_projtaskassign', 'inlineeditor', 'Project Task Assignments','schedule');
	// add fields to the sublist
	nlapiLogExecution('DEBUG','project internal id'+nlapiGetRecordId());
	
	var taskselect = projtaskassign.addField('title', 'select', ' Task Name');
	taskselect.setMandatory(true);
	
	var taskcols = new Array();

	taskcols[0] = new nlobjSearchColumn( 'title' );
//	taskcols[1] = new nlobjSearchColumn( 'internalid' );

	
	var searchResults =  nlapiSearchRecord('projecttask', 'customsearch69', new
			nlobjSearchFilter('company', null, 'anyOf', nlapiGetRecordId()),taskcols);
	
	for ( var i = 0; searchResults != null && i < searchResults.length; i++ )
	{
	var searchresult = searchResults[ i ];

	var eid = searchresult.getValue('title');
   // var intid= searchresult.getValue('internalid');

	taskselect.addSelectOption(eid,eid);
	}
	
	
	
	var resfld =projtaskassign.addField('resource', 'select', 'Resource Name').setMandatory(true);
	var rescols  = new Array ();
	rescols[0] =  new nlobjSearchColumn('entityid');
	var searchResults = nlapiSearchRecord('genericresource',null,null,rescols);
	for ( var i = 0; searchResults != null && i < searchResults.length; i++ )
	{
	var searchresult = searchResults[ i ];
	resfld.addSelectOption(searchresult.getId(),searchresult.getValue('entityid'));
	}

	var empcols  = new Array ();
	empcols[0] =  new nlobjSearchColumn('entityid');
	var searchResults = nlapiSearchRecord('employee',null,null,empcols);
	for ( var i = 0; searchResults != null && i < searchResults.length; i++ )
	{
	var searchresult = searchResults[ i ];
	resfld.addSelectOption(searchresult.getId(),searchresult.getValue('entityid'));
	}
	

	
	projtaskassign.addField('units','percent', 'Units');
	projtaskassign.addField('serviceitem', 'select', 'Service Item','item');
	projtaskassign.addField('billingclass', 'select', 'Billing Class','billingclass');
	projtaskassign.addField('startdate', 'date', 'Task Start Date');
	projtaskassign.addField('enddate', 'date', 'Task End Date');
	projtaskassign.addField('estimatedwork','float', 'Estimated Work').setMandatory(true);
	projtaskassign.addField('unitcost','currency', 'Unit Cost').setMandatory(true);
	projtaskassign.addField('cost','currency', 'Estimated Cost');
	projtaskassign.addField('unitprice','float', 'Unit Price');
	projtaskassign.addField('price','currency', 'Estimated Revenue');
	projtaskassign.addField('grossprofit','currency', 'Estimated Gross Profit');

	
	form.getSubList('custpage_projtaskassign').getField('startdate').setDisplayType('disabled');
	form.getSubList('custpage_projtaskassign').getField('enddate').setDisplayType('disabled');
	form.getSubList('custpage_projtaskassign').getField('cost').setDisplayType('disabled');
	form.getSubList('custpage_projtaskassign').getField('grossprofit').setDisplayType('disabled');
	form.getSubList('custpage_projtaskassign').getField('price').setDisplayType('disabled');
//	projtaskassign.setLineItemValues(data);
	
	// return all columns associated with this search
	if (data)
	{	
	//var columns = data[0].getAllColumns();

	// for (i = 0; columns != null && i < columns.length; i++)
//	{
	//    var column = columns[i];
	 //  var value = data[0].getValue(column);
	  //  var name = columns[i].getName();
	   // nlapiLogExecution('DEBUG','Column '+column+name+value);
	//}

//	}
	nlapiLogExecution('DEBUG','Data.length'+data.length);
for ( var i = 1; data != null && i <= data.length; i++ )
   {
	
	   projtaskassign.setLineItemValue('title',i,data[i-1].getValue(columns[0]));
		projtaskassign.setLineItemValue('resource',i,data[i-1].getValue(columns[1]));
		projtaskassign.setLineItemValue('serviceitem',i,data[i-1].getValue(columns[2]));
		projtaskassign.setLineItemValue('billingclass',i,data[i-1].getValue(columns[3]));
		projtaskassign.setLineItemValue('estimatedwork',i,data[i-1].getValue(columns[4]));
		projtaskassign.setLineItemValue('unitprice',i,data[i-1].getValue(columns[5]));
		projtaskassign.setLineItemValue('price',i,data[i-1].getValue(columns[6]));
		projtaskassign.setLineItemValue('cost',i,data[i-1].getValue(columns[7]));
		projtaskassign.setLineItemValue('grossprofit',i,data[i-1].getValue(columns[8]));
		projtaskassign.setLineItemValue('startdate',i,data[i-1].getValue(columns[9]));
		projtaskassign.setLineItemValue('enddate',i,data[i-1].getValue(columns[10]));
		projtaskassign.setLineItemValue('units',i,data[i-1].getValue(columns[11]));
		projtaskassign.setLineItemValue('unitcost',i,data[i-1].getValue(columns[12]));
    }
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
	nlapiLogExecution('DEBUG','in before submit'+type);
	 var proj = nlapiLoadRecord('job',nlapiGetRecordId());
	 nlapiLogExecution('DEBUG','project in before submit'+nlapiGetRecordId());
	 nlapiLogExecution('DEBUG','lines count '+proj.getLineItemCount('custpage_projtaskassign'));

 
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
	nlapiLogExecution('DEBUG','in after submit'+type);
	 var proj = nlapiLoadRecord('job',nlapiGetRecordId());
	 nlapiLogExecution('DEBUG','project in after submit'+nlapiGetRecordId());
	 var sublist = getSubList('custpage_projtaskassign').getLineItemCount();
	 nlapiLogExecution('DEBUG','lines count '+sublist);
	  for (var lineNo=1; lineNo <= sublist; lineNo++)
	 {
	      recProjectTask = nlapiLoadRecord('projecttask', proj.getLineItemValue('custpage_projtaskassign','title',lineNo));
	   nlapiLogExecution('DEBUG','Loaded task'+proj.getLineItemValue('custpage_projtaskassign','title',lineNo));
	      recProjectTask.selectNewLineItem('assignee'); 
		  recProjectTask.setCurrentLineItemValue('assignee', 'resource', proj.getLineItemValue('custpage_projtaskassign','resource',lineNo)); 
		  recProjectTask.setCurrentLineItemValue('assignee','estimatedwork',proj.getLineItemValue('custpage_projtaskassign','estimatedwork',lineNo));
		  recProjectTask.setCurrentLineItemValue('assignee','unitcost',proj.getLineItemValue('custpage_projtaskassign','unitcost',lineNo));
		  recProjectTask.commitLineItem('assignee');
		  nlapiSubmitRecord(recProjectTask); 
		}
	
  
}
