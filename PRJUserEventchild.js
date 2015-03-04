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
 
/*	if (type=='edit' || 'view')
	{
		nlapiLogExecution('DEBUG','in PRJ UE');
	
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
	
	var data = nlapiSearchRecord('projecttask', null, new
			nlobjSearchFilter('company', null, 'anyOf', nlapiGetRecordId()),columns);
	
	
	// return all columns associated with this search
	if (data)
	{	*/

		var rec =  nlapiGetNewRecord();
		//Call the nlobjRecord selectNewLineItem method to add a new line.
		//Note: Call selectLineItem(...) if the line already exists and you are just updating it. 
		

	nlapiLogExecution('DEBUG','project id '+rec.getId());
	nlapiLogExecution('DEBUG','lines'+rec.getLineItemCount('recmachcustrecord12'));
	nlapiLogExecution('DEBUG','currency of project is '+rec.getFieldValue('currency'));
for ( var i = 1; i<= rec.getLineItemCount('recmachcustrecord12'); i++ )
   {
	
	rec.selectNewLineItem('recmachcustrecord12');
	nlapiLogExecution('DEBUG','TASK'+rec.getLineItemValue('recmachcustrecord12','custrecord11',i));
	nlapiLogExecution('DEBUG','start date'+nlapiLookupField('projecttask',rec.getLineItemValue('recmachcustrecord12','custrecord11',i),'startdate'));
	//Set the value for the record name
	/*   rec.setLineItemValue('recmachcustrecord12','custrecord11',i,data[i-1].getValue(columns[0]));
		projtaskassign.setLineItemValue('resource',i,data[i-1].getValue(columns[1]));
		projtaskassign.setLineItemValue('serviceitem',i,data[i-1].getValue(columns[2]));
		projtaskassign.setLineItemValue('billingclass',i,data[i-1].getValue(columns[3])); */
rec.setLineItemValue('recmachcustrecord12','custrecord17',i,nlapiLookupField('projecttask',rec.getLineItemValue('recmachcustrecord12','custrecord11',i),'startdate'));
	/*	projtaskassign.setLineItemValue('unitprice',i,data[i-1].getValue(columns[5]));
		projtaskassign.setLineItemValue('price',i,data[i-1].getValue(columns[6]));
		projtaskassign.setLineItemValue('cost',i,data[i-1].getValue(columns[7]));
		projtaskassign.setLineItemValue('grossprofit',i,data[i-1].getValue(columns[8]));
		projtaskassign.setLineItemValue('startdate',i,data[i-1].getValue(columns[9]));
		projtaskassign.setLineItemValue('enddate',i,data[i-1].getValue(columns[10]));
		projtaskassign.setLineItemValue('units',i,data[i-1].getValue(columns[11])); */
		//rec.setLineItemValue('recmachcustrecord12','custrecord20',i,data[i-1].getValue(columns[12])); 
	   
	   rec.commitLineItem('recmachcustrecord12');
   }

    
//}
//}
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
	
	if (type=='edit'|| 'create')
	{
		nlapiLogExecution('DEBUG','in PRJ before submit');
		var rec =  nlapiGetNewRecord();

		nlapiLogExecution('DEBUG','project id '+rec.getId());
		nlapiLogExecution('DEBUG','lines'+rec.getLineItemCount('recmachcustrecord12'));
		
		
		var searchresults = nlapiSearchRecord('projecttask', null, filter, null);
		 for ( var i = 0; searchresults != null && i < searchresults.length; i++ )
		 {
		 var searchresult = searchresults[ i ];
		 nlapiDeleteRecord(searchresults[i].getRecordType(), searchresults[i].getId());
		 }
		 
	for ( var i = 1; i<= rec.getLineItemCount('recmachcustrecord12'); i++ )
	   {
		
		rec.selectNewLineItem('recmachcustrecord12');
		nlapiLogExecution('DEBUG','TASK'+rec.getLineItemValue('recmachcustrecord12','custrecord11',i));
		nlapiLogExecution('DEBUG','start date'+nlapiLookupField('projecttask',rec.getLineItemValue('recmachcustrecord12','custrecord11',i),'startdate'));
		rec.setLineItemValue('recmachcustrecord12','custrecord17',i,nlapiLookupField('projecttask',rec.getLineItemValue('recmachcustrecord12','custrecord11',i),'startdate'));
		rec.setLineItemValue('recmachcustrecord12','custrecord18',i,nlapiLookupField('projecttask',rec.getLineItemValue('recmachcustrecord12','custrecord11',i),'enddate'));
		rec.setLineItemValue('recmachcustrecord12','custrecord21',i,rec.getLineItemValue('recmachcustrecord12','custrecord19',i)*rec.getLineItemValue('recmachcustrecord12','custrecord20',i));
		 rec.commitLineItem('recmachcustrecord12');
	   }
}
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
	 
	 var columns =new Array();

		columns[0] = new nlobjSearchColumn('title'); 
	
	 var searchresults = nlapiSearchRecord('projecttask', null, new nlobjSearchFilter('internalid', 'job', 'anyof', nlapiGetRecordId()),columns);
	 for ( var i = 0; searchresults != null && i < searchresults.length; i++ )
	 {
	 var searchresult = searchresults[ i ];
	 
	 
	nlapiLogExecution('DEBUG','Task is'+searchresult.getValue('title'));
	 var task = nlapiLoadRecord('projecttask',searchresult.getId());
		  
	 var lineCount = task.getLineItemCount('assignee');
	  nlapiLogExecution('DEBUG','Task'+searchresult.getId()+'Lines'+lineCount);
	 for (var j = lineCount; j>0; j--) {
			task.selectLineItem('assignee',j);
			nlapiLogExecution('DEBUG','removing line'+task.getLineItemValue('assignee','resource',j));
			task.removeLineItem('assignee', j);
		//	task.commitLineItem('assignee');
	 }
		
			 nlapiSubmitRecord(task);
			
	 }
	
	 
	  for (var lineNo=1; lineNo <=  proj.getLineItemCount('recmachcustrecord12'); lineNo++)
	 {
	      recProjectTask = nlapiLoadRecord('projecttask', proj.getLineItemValue('recmachcustrecord12','custrecord11',lineNo));
	   nlapiLogExecution('DEBUG','Loaded task'+proj.getLineItemValue('recmachcustrecord12','custrecord11',lineNo));
	      recProjectTask.selectNewLineItem('assignee'); 
		  recProjectTask.setCurrentLineItemValue('assignee', 'resource', proj.getLineItemValue('recmachcustrecord12','custrecord13',lineNo)); 
		  recProjectTask.setCurrentLineItemValue('assignee','estimatedwork',proj.getLineItemValue('recmachcustrecord12','custrecord19',lineNo));
		  recProjectTask.setCurrentLineItemValue('assignee','unitcost',proj.getLineItemValue('recmachcustrecord12','custrecord20',lineNo));
		  recProjectTask.setCurrentLineItemValue('assignee','unitprice',proj.getLineItemValue('recmachcustrecord12','custrecord22',lineNo));
		  recProjectTask.setCurrentLineItemValue('assignee','units',proj.getLineItemValue('recmachcustrecord12','custrecord14',lineNo));
		  recProjectTask.setCurrentLineItemValue('assignee','serviceitem',proj.getLineItemValue('recmachcustrecord12','custrecord15',lineNo));
		  recProjectTask.commitLineItem('assignee');
		  nlapiSubmitRecord(recProjectTask); 
		}
	
  
}
