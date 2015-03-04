/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       22 Jan 2014     lalmaula
 *
 */

/**
 * @returns {Void} Any or no return value
 */
function workflowAction() {
	
       var record = nlapiGetNewRecord()	;
       
	   var i;
	    nlapiLogExecution('DEBUG','res cnt'+record.getLineItemCount('jobresources'));
		// create the resource allocations from the assignments
		for ( i = 1; i <= record.getLineItemCount('jobresources'); i++)
		{
			var tot_hours = 0;
			var res = record.getLineItemValue('jobresources','jobresource',i);
			nlapiLogExecution('DEBUG','resource is'+res);
			
			var filters = new Array();
			  filters[0] = new nlobjSearchFilter( 'internalid', 'job', 'anyof', record.getId() );
			
			var columns = new Array();
			 columns[0] = new nlobjSearchColumn('internalid');
		    var searchResults =  nlapiSearchRecord('projecttask', null,filters,columns);
			
			for ( var j = 0; searchResults != null && j < searchResults.length; j++ )
			{
				var id = searchResults[j].getId(); 
				recProjectTask = nlapiLoadRecord('projecttask', id);
				nlapiLogExecution('DEBUG','task is'+id );

			    for ( var k=1; k <= recProjectTask.getLineItemCount('assignee'); k++)
			    	{
			    	if (recProjectTask.getLineItemValue('assignee','resource',k)== res)
			    		{
				tot_hours += recProjectTask.getLineItemValue('assignee','estimatedwork',k);
			    		}
			    	}
			  
			    	
			} 
			  nlapiLogExecution('DEBUG','tot hours'+tot_hours);
			  if ( tot_hours > 0 )
			  {	  
			  var resrec = nlapiCreateRecord('resourceallocation');
				resrec.setFieldValue('allocationresource',res);
				resrec.setFieldValue('project',record.getId());
				resrec.setFieldValue('allocationamount',tot_hours);
				resrec.setFieldValue('startdate',record.getFieldValue('startdate'));
				resrec.setFieldValue('enddate',record.getFieldValue('calculatedenddate'));
				resrec.setFieldValue('allocationtype',2);
				nlapiSubmitRecord(resrec);
			  }
		}

	//create estimate
		
		var estrec = nlapiCreateRecord('estimate');
		estrec.setFieldValue('entity',record.getFieldValue('parent'));
		estrec.setFieldValue('job', record.getId());
		var today = new Date();
		estrec.setFieldValue('trandate', nlapiDateToString(today));
		estrec.setFieldText('entitystatus','Proposal');
		estrec.setFieldValue('probability',50);
				
		nlapiLogExecution('DEBUG','project id '+record.getFieldValue('entityid'));
    	var projfilter = new Array();
	    projfilter[0] = new nlobjSearchFilter( 'title', null, 'is', record.getFieldValue('entityid') );
				
		var oppcolumns = new Array();
		oppcolumns[0] = new nlobjSearchColumn('internalid');
		var searchOpp =  nlapiSearchRecord('opportunity', null,projfilter,oppcolumns);
		estrec.setFieldValue('opportunity',searchOpp[0].getId());
		estrec.setFieldValue('expectedclosedate',nlapiDateToString(today));
		
		estrec.selectNewLineItem('item');
		estrec.setCurrentLineItemValue('item','item',112);
		estrec.setCurrentLineItemValue('item','taxcode',-7);
		estrec.setCurrentLineItemValue('item','quantity',2);
		estrec.setCurrentLineItemValue('item','istaxable','F');
	//	assignee has serviceitem, billingclass -- get bill rate billingclass record, field is price
	//	cost, estimatedwork (hours)
	//	quantity
	//	rate 
	//	amount
	 //   estrec.setCurrentLineItemValue('item',	'fromjob', 'T');
	//	costestimate
	//    estrec.setCurrentLineItemValue('item',	'isestimate', 'T' );// billable estimate
	    estrec.commitLineItem('item');
		nlapiSubmitRecord(estrec,true);
		

}
