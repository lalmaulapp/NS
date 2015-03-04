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
       
//	   var i;
	//    nlapiLogExecution('DEBUG','res cnt'+record.getLineItemCount('jobresources'));
		// create the resource allocations from the assignments
	//	for ( i = 1; i <= record.getLineItemCount('jobresources'); i++)
	//	{
	//		var tot_hours = 0;
	//		var res = record.getLineItemValue('jobresources','jobresource',i);
	//		nlapiLogExecution('DEBUG','resource is'+res);
			
			var filter = new nlobjSearchFilter('internalid', 'job', 'is', record.getId() );
			
			//var columns = new Array();
			 //columns[0] = new nlobjSearchColumn('internalid');
			 
			 var resourceID = new nlobjSearchColumn('resource', 'projecttaskassignment','group');
			  var hours = new nlobjSearchColumn('estimatedwork', 'projecttaskassignment', 'sum');
			  var sortcol = resourceID.setSort();
		    var searchResults =  nlapiSearchRecord('projecttask', null,filter,[resourceID,hours,sortcol]);
		//    var  res_tot ={};
		    if (searchResults)
			   {
			   for ( var i = 0; i < searchResults.length; i++ ) { 
			  var result = searchResults[i] ;
			  
			  var resourceID = result.getValue('resource', 'projecttaskassignment','group');
			  nlapiLogExecution('DEBUG','resource id'+resourceID);
			  
			  var hours = result.getValue('estimatedwork', 'projecttaskassignment','sum');
			//  res_tot[resourceID] +=hours;
			   
		/*	for ( var j = 0; searchResults != null && j < searchResults.length; j++ )
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
			  
			    	
			} */
			  nlapiLogExecution('DEBUG','tot hours '+hours);
			  if ( hours > 0 )
			  {	  
			  var resrec = nlapiCreateRecord('resourceallocation');
				resrec.setFieldValue('allocationresource',resourceID);
				resrec.setFieldValue('project',record.getId());
				resrec.setFieldValue('allocationamount',hours);
				resrec.setFieldValue('startdate',record.getFieldValue('startdate'));
				resrec.setFieldValue('enddate',record.getFieldValue('calculatedenddate'));
				resrec.setFieldValue('allocationtype',2);
				nlapiSubmitRecord(resrec);
			  }
		}

	//create estimate
		
	/*	var estrec = nlapiCreateRecord('estimate');
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
	 //   estrec.commitLineItem('item');
	//	nlapiSubmitRecord(estrec,true);
		*/
			   }
}
