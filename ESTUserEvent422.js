/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       11 Feb 2014     lalmaula
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
	
	if ( type == 'create')
	{
	// Done in Page init on create - set estimate seq in title, set oppty #
	// Here: update orig oppty amt back to estimate total
	// set project status to Estimate Complete
	// resource allocations on project
  
	 var opp = nlapiLoadRecord('opportunity',nlapiGetFieldValue('opportunity'));
	 opp.setFieldValue('projectedtotal',nlapiGetFieldValue('total'));
	 opp.setFieldValue('rangelow',nlapiGetFieldValue('total'));
	 opp.setFieldValue('rangehigh',nlapiGetFieldValue('total')); 
	
	 

	   
	 //Delete service item types that may exist on opportunity
	 
	 var opplines = opp.getLineItemCount('item');
	 for ( var i =opplines; i >= 1;i--)
	 {
		// nlapiLogExecution('DEBUG','desc '+opp.getLineItemValue('item','description',i));
			 if  (opp.getLineItemValue('item','itemtype',i) =='Service')
			 {
			
			 opp.removeLineItem('item',i);
			// nlapiLogExecution('DEBUG','removed line '+i);	
			// nlapiLogExecution('DEBUG','lines left'+opp.getLineItemCount('item'));
			 }
		 
	 }
	 //opp.commitLineItem('item');
	// nlapiSubmitRecord(opp); 
	 var estrec = nlapiGetNewRecord();
	 opp.setFieldValue('custbody_pp_opp_latest_estimate',nlapiLookupField('estimate',estrec.getId(),'tranid'));
	 var lines = estrec.getLineItemCount('item');
	 nlapiLogExecution('DEBUG','no of lines'+lines);
	 for ( var lineitem = 1; lineitem <= lines ;lineitem++ )
		{
		 opp.selectNewLineItem('item');
		 nlapiLogExecution('DEBUG','desc is '+estrec.getLineItemValue('item','description',lineitem));
		//    opp.setLineItemValue('item','linenumber',lineitem,lineitem);
		 opp.setCurrentLineItemValue('item','description',estrec.getLineItemValue('item','description',lineitem));
			opp.setCurrentLineItemValue('item','item',estrec.getLineItemValue('item','item',lineitem));
			 nlapiLogExecution('DEBUG','item is '+estrec.getLineItemValue('item','item',lineitem));
			opp.setCurrentLineItemValue('item','rate',estrec.getLineItemValue('item','rate',lineitem));
			opp.setCurrentLineItemValue('item','quantity',estrec.getLineItemValue('item','quantity',lineitem));
			opp.setCurrentLineItemValue('item','amount',estrec.getLineItemValue('item','amount',lineitem));
			opp.setCurrentLineItemValue('item','price',estrec.getLineItemValue('item','price',lineitem));
			opp.setCurrentLineItemValue('item','fromjob',estrec.getLineItemValue('item','fromjob',lineitem));
			opp.setCurrentLineItemValue('item','isestimate',estrec.getLineItemValue('item','isestimate',lineitem));
			opp.setCurrentLineItemValue('item','costestimatetype',estrec.getLineItemValue('item','costestimatetype',lineitem));
			opp.setCurrentLineItemValue('item','costestimate',estrec.getLineItemValue('item','costestimate',lineitem));
			opp.commitLineItem('item');
			
		}
	 nlapiSubmitRecord(opp);
	 
	 var proj = nlapiLoadRecord('job',nlapiGetFieldValue('job'));
	// proj.setFieldValue('entitystatus',19);
	
	 //Delete existing resource allocations
	 var filter = new nlobjSearchFilter('project', null, 'is', proj.getId() ); 
	 var searchresults = nlapiSearchRecord('resourceallocation', null, filter, null);
	 for ( var i = 0; searchresults != null && i < searchresults.length; i++ )
	 {
	 var searchresult = searchresults[ i ];
	 nlapiDeleteRecord(searchresults[i].getRecordType(), searchresults[i].getId());
	 }
	 
	 
	 //Recreate new allocations
	 var filter = new nlobjSearchFilter('internalid', 'job', 'is', proj.getId() ); 
	 var resourceID = new nlobjSearchColumn('resource', 'projecttaskassignment','group');
	 var start_date = new nlobjSearchColumn('startdate','projecttaskassignment','min');
	 var end_date = new nlobjSearchColumn('enddate','projecttaskassignment','max');
	 var hours = new nlobjSearchColumn('estimatedwork', 'projecttaskassignment', 'sum');
	
	 var sortcol = resourceID.setSort();
	 var searchResults =  nlapiSearchRecord('projecttask', null,filter,[resourceID,start_date,end_date,hours,sortcol]);
	 if (searchResults)
		   {
		   for ( var i = 0; i < searchResults.length; i++ ) { 
		  var result = searchResults[i] ;
		  
		  var resourceID = result.getValue('resource', 'projecttaskassignment','group');
		  nlapiLogExecution('DEBUG','resource id'+resourceID);
		  
		  var stdt = result.getValue('startdate','projecttaskassignment','min');
		  var enddt = result.getValue('enddate','projecttaskassignment','max');
		  var hours = result.getValue('estimatedwork', 'projecttaskassignment','sum');
		  nlapiLogExecution('DEBUG','tot hours '+hours);
		  if ( hours > 0 )
		  {	  
		  var resrec = nlapiCreateRecord('resourceallocation');
			resrec.setFieldValue('allocationresource',resourceID);
			resrec.setFieldValue('project',proj.getId());
			resrec.setFieldValue('allocationamount',hours);
			resrec.setFieldValue('startdate',stdt);
			resrec.setFieldValue('enddate',enddt);
			resrec.setFieldValue('allocationtype',2);
			nlapiSubmitRecord(resrec);
		  }
	      }
		  }
	
	 nlapiLogExecution('DEBUG','Status is '+proj.getFieldText('entitystatus'));
	 nlapiSubmitRecord(proj);
	 //send saved search to salesrep and dept supervisor
	 nlapiLogExecution('DEBUG','Dept is '+estrec.getFieldText('department'));
	 var dept_super = nlapiLookupField('department',estrec.getFieldValue('department'),'custrecordpp_er_dept_supervisor' );
     var dept_super_email =nlapiLookupField('employee',dept_super,'email');
    
     var salesrep_email = nlapiLookupField('employee',estrec.getFieldValue('salesrep'),'email');

     
     var filters = new Array();
     filters[0] = new nlobjSearchFilter( 'internalid', 'job', 'anyof', proj.getId() );
     var columns = new Array();
     columns[0] = new nlobjSearchColumn('internalid');
     var results = nlapiSearchRecord('projecttask', 'customsearch54', filters, columns);
     
     
     // Set XML header
     xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
     xml += '<document xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';

     // Header
     xml += '<row>';
     xml += ' <Col0> Project </Col0>';
     xml += ' <Col1> Task Name </Col1>';
     xml += ' <Col2> Service Item </Col2>';
     xml += ' <Col3> Billing Class </Col3>';
     xml += ' <Col4> Estimated Work </Col4>';
     xml += ' <Col5> Estimated Cost </Col5>';
     xml += ' <Col6> Estimated Revenue </Col6>';
     xml += '</row>'; 

     // Contents 
     for( var x=0;x<results.length;x++)
     {
       xml += '<row>';
       xml += ' <Col0>' + results[x].getValue('project') + '</Col0>';
       xml += ' <Col1>' + results[x].getValue('name') + '</Col1>';
       xml += ' <Col2>' + results[x].getValue('serviceitem') + '</Col2>';
       xml += ' <Col3>' + results[x].getValue('billingclass') + '</Col3>';
       xml += ' <Col4>' + results[x].getValue('estimatedwork') + '</Col4>';
       xml += ' <Col5>' + results[x].getValue('cost') + '</Col5>';
       xml += ' <Col6>' + results[x].getValue('estimatedrevenue') + '</Col6>';
       xml += '</row>';

     }

     // Close document
     xml += '</document>';

    // Create File 
    var file = nlapiCreateFile('searchresults.xml', 'XMLDOC', xml);
     var filepdf =  nlapiXMLToPDF(xml);

	  nlapiSendEmail(-5, dept_super_email, 'Proposal Estimate created', 'A new proposal estimate has been created for:', salesrep_email, null,null, filepdf);
	  
	 
}
}