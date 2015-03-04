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
	
//	if (type =='create' || type =='edit')
//	{ 
		
//			form.setScript('customscript195');
//		    form.addButton('custpage_submit','Submit for Approval', 'onClickSubmit()');
//			nlapiLogExecution('DEBUG','appr seq '+nlapiGetFieldValue('custbody_pp_er_approval_seq' ) +type);
//		if (nlapiGetFieldValue('custbody_pp_er_approval_seq' ) !=null)
//		{
//			
//
//			  var submitButton = form.getButton('custpage_submit'); 
//			  if (submitButton != null) 
//			      submitButton.setDisabled(true); 
//		
//		}
//	 nlapiInsertLineItem('expense', 1);
//	 nlapiSetCurrentLineItemValue('expense','category',1);
//	 nlapiSetCurrentLineItemValue('expense','amount',1);
//	 nlapiCommitLineItem('expense');
//	 nlapiSelectLineItem('expense',1);
//		nlapiRemoveLineItem('expense', 1) ;
	
		
//	}
/*
	if (type == 'create')
		{
	 nlapiInsertLineItem('expense', 1);
	 nlapiSetCurrentLineItemValue('expense','category',1);
	 nlapiSetCurrentLineItemValue('expense','amount',1);
	 nlapiSetCurrentLineItemValue('expense','isbillable','T');
	 nlapiCommitLineItem('expense');
	// 
//nlapiRemoveLineItem('expense', 1) ;
	var lineCount = nlapiGetLineItemCount('expense');
	//alert('line item count'+lineCount);
for (var i= lineCount; i>0; i--) {
	//alert('in loop'+lineCount);
	nlapiSelectLineItem('expense',i);
	nlapiRemoveLineItem('expense', i);
	}
		} 
		*/
	
	if (type == 'view')
	{
		 nlapiSetFieldText('custpage_er_project',nlapiGetFieldText('custbodypp_er_project'));
		 form.getField('custbodypp_er_project').setDisplayType('normal');
	}
  
		if (type =='create' || type =='edit')
		{ 
		//	nlapiInsertLineItem('expense',1);
		//	nlapiRemoveLineItem('expense',1);
			var newExpRec = nlapiGetNewRecord();	
			var select = form.addField('custpage_er_project','select','Project');
		    select.setMandatory( true );
	        
		    
	if ( type =='edit')	 
		{
	var filterexpr = 0||
	[['allowexpenses','is','T'] , 'AND',  [['limittimetoassignees','is','F']
		         , 'OR', [['limittimetoassignees','is','T'], 'AND', 
		     ['jobresource','is', newExpRec.getFieldValue('entity')]]
		                	 ]];
	}
	
	    
		    if (type =='create')
		    	{
		    
		    	var filterexpr = 0||
		    	[['allowexpenses','is','T'] , 'AND',  [['limittimetoassignees','is','F']
		    		         , 'OR', [['limittimetoassignees','is','T'], 'AND', 
		    		             ['jobresource','is', nlapiGetUser()]]
		    	 ]];
		    		
		    //	 else
		    //		 {	var filterexpr = 0||
		    //	[['allowexpenses','is','T'] , 'AND',  [['limittimetoassignees','is','F']
		    //		         , 'OR', [['limittimetoassignees','is','T'], 'AND', 
		    //		             ['jobresource','is', nlapiGetFieldText('entity')]]
		    //	 ]];
		    //	}
		    	select.addSelectOption('', '', true);
		    	}

	var columns = new Array();

	columns[0] = new nlobjSearchColumn( 'entityid' );
	//columns[1] = new nlobjSearchColumn( 'internalid' );

	
	var searchResults =  nlapiSearchRecord('job', null,filterexpr,columns);
	
	for ( var i = 0; searchResults != null && i < searchResults.length; i++ )
	{
	var searchresult = searchResults[ i ];

	var eid = searchresult.getValue('entityid');
//	var intid= searchresult.getValue('internalid');

	select.addSelectOption(eid,eid);
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
 **/
function PP_ER_userEventBeforeSubmit(type){

	if ( type == 'create'|| type =='edit')
		{
	var projtype = nlapiLookupField('job', nlapiGetFieldValue('custbodypp_er_project'), 'jobtype', true);
		
		if (projtype =='Indirect')
			{
			var rec = nlapiGetNewRecord();
			var numLines = nlapiGetLineItemCount('expense');
			for (var i=1; i<= numLines; i++)
			{
				rec.setLineItemValue('expense','isbillable',i,'F');
			}
			
			}
		}
}
