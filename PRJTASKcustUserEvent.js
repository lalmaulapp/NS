/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       18 Apr 2014     lalmaula
 *
 */

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
