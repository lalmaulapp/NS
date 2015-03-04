/*
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       30 Oct 2013     lalmaula
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */
function PP_ER_clientPageInit(type){
  
	
	
if (type == 'create')
{

	  var today = new Date();
      var dayofweek = today.getDay();
    if (dayofweek == 0)
    {nlapiSetFieldValue('trandate',nlapiDateToString(nlapiAddDays(today,6) ));}
    else
    {nlapiSetFieldValue('trandate',nlapiDateToString(nlapiAddDays(today,6-dayofweek)));}
    
   
	nlapiSetFieldValue('department',nlapiGetDepartment());
	nlapiSetFieldText('custbody_pp_er_status','');
	nlapiSetFieldValue('custbody_pp_er_status','');
    var empid =nlapiGetFieldValue('entity');
//alert ('emp id in clien page init'+empid);
    if (empid  == '')
    	{
    	empid = nlapiGetUser();
   // 	alert ('emp id after set to user'+empid);
    	}
	if ( empid != '')
		{
		
	nlapiRemoveSelectOption('custpage_er_project',null);
	var filterexpr = 0||
	[['allowexpenses','is','T'] , 'AND',  [['limittimetoassignees','is','F']
		         , 'OR', [['limittimetoassignees','is','T'], 'AND', 
		     ['jobresource','is', empid]]
		                	 ]];

	var columns = new Array();
	columns[0] = new nlobjSearchColumn( 'entityid' );

	var searchResults =  nlapiSearchRecord('job', null,filterexpr,columns);
	
	for ( var i = 0; searchResults != null && i < searchResults.length; i++ )
	{
	var searchresult = searchResults[ i ];

	var eid = searchresult.getValue('entityid');
	nlapiInsertSelectOption('custpage_er_project',eid,eid);
	}
	nlapiInsertSelectOption('custpage_er_project', '','', true);
		}

    nlapiSetFieldText('custbodypp_er_project',nlapiGetFieldText('custpage_er_project'));
	
  	
		}
  
	if (type == 'edit')
		{
	  nlapiSetFieldText('custpage_er_project',nlapiGetFieldText('custbodypp_er_project'));
	 
		
		}
 
}
/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @returns {Boolean} True to continue save, false to abort save
 */
function clientSaveRecord(){
	

    return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @param {Number} linenum Optional line item number, starts from 1
 * @returns {Boolean} True to continue changing field value, false to abort value change
 */
function clientValidateField(type, name, linenum){
	
	
	    
    return true;
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
function PP_ER_clientFieldChanged(type, name, linenum){
 

	if (name == 'trandate')
	{
	 var    dayofweek =nlapiStringToDate(nlapiGetFieldValue('trandate')).getDay();
	 
	 if ( dayofweek != 6)
		 {
		 var x = nlapiDateToString(nlapiAddDays(nlapiStringToDate(nlapiGetFieldValue('trandate')),6))	;
	 var y = nlapiDateToString(nlapiAddDays(nlapiStringToDate(nlapiGetFieldValue('trandate')),6-dayofweek));
	
	  if (dayofweek == 0)
	  { 
	  nlapiSetFieldValue('trandate',x);
	  }
	   else
	   {nlapiSetFieldValue('trandate',y);
	   }
	}
	}

if (name=='custpage_er_project')
	{
	//alert('Selected option '+ nlapiGetFieldText('custpage_er_project'));

	  nlapiSetFieldText('custbodypp_er_project',nlapiGetFieldText('custpage_er_project'));
	
	 
	}

if ( name=='entity')
	{
	
	var empid =nlapiGetFieldValue('entity');
	
	//alert('name'+name+empid);
	if ( empid != null)
		{
	nlapiRemoveSelectOption('custpage_er_project',null);
	var filterexpr = 0||
	[['allowexpenses','is','T'] , 'AND',  [['limittimetoassignees','is','F']
		         , 'OR', [['limittimetoassignees','is','T'], 'AND', 
		     ['jobresource','is', empid]]
		                	 ]];
	
	var columns = new Array();
	columns[0] = new nlobjSearchColumn( 'entityid' );

	var searchResults =  nlapiSearchRecord('job', null,filterexpr,columns);
	
	for ( var i = 0; searchResults != null && i < searchResults.length; i++ )
	{
	var searchresult = searchResults[ i ];

	var eid = searchresult.getValue('entityid');
//	alert( 'project :'+eid);
	nlapiInsertSelectOption('custpage_er_project',eid,eid);
	
	}
	nlapiInsertSelectOption('custpage_er_project', '','', true);
		}
	}
 
	
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @returns {Void}
 */
function clientPostSourcing(type, name) {
	
	
	
	if ( type == 'expense' )
		//&& name =='custbodypp_er_project')
	{
		//alert('in post sourcing');
		// nlapiInsertLineItem('expense', 1);
		// nlapiSetCurrentLineItemValue('expense','category',1);
		// nlapiSetCurrentLineItemValue('expense','amount',1);
		// nlapiSetCurrentLineItemValue('expense','isbillable','T');
		// nlapiCommitLineItem('expense');
		// nlapiSelectLineItem('expense',1);
		// nlapiRemoveLineItem('expense', 1) ;
		// nlapiCommitLineItem('expense');
		
	  nlapiSetCurrentLineItemValue('expense','customer',nlapiGetFieldValue('custbodypp_er_project'));	

	
	  
		var projtype = nlapiLookupField('job', nlapiGetFieldValue('custbodypp_er_project'), 'jobtype', true);
//		alert('in  line init'+projtype);
		if (projtype =='Indirect')
			{
			nlapiSetCurrentLineItemValue('expense','isbillable','F');
	     nlapiDisableLineItemField('expense','isbillable',true); //disable billable checkbox
			}
		else
			{
			nlapiSetCurrentLineItemValue('expense','isbillable','T');
			   nlapiDisableLineItemField('expense','isbillable',false); //enable billable checkbox
			}
		
	}
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @returns {Void}
 */
function PP_ER_clientLineInit(type) {
	
	//alert('in  line init'+nlapiGetCurrentLineItemValue('expense','amount'));
	
	return true;

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @returns {Boolean} True to save line item, false to abort save
 */
function PP_ER_clientValidateLine(type){
//alert('in validate line'+nlapiGetCurrentLineItemValue('expense','amount'));


	return true;

	
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @returns {Void}
 */
function PP_ER_clientRecalc(type){
	
	// initialize total
	var tot_bill = 0;
    var i;
	// Run through each line item looking for billable expense items.
	for ( i = 1; i <= nlapiGetLineItemCount('expense'); i++)
	{
	
		// Set item_amount for the current item.
		var item_amount = parseFloat(nlapiGetLineItemValue('expense', 'amount', i));
				
		// If the item is a service item, add its value to the total.
		if (nlapiGetLineItemValue('expense', 'isbillable', i) == 'T')
		{
			tot_bill += item_amount;
		}
		
	}
	
	// Set the service bookings custom field to the total of all service items.
	nlapiSetFieldValue('custbodypp_er_tot_bill', nlapiFormatCurrency(tot_bill));

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @returns {Boolean} True to continue line item insert, false to abort insert
 */
function clientValidateInsert(type){
  
 
	return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @returns {Boolean} True to continue line item delete, false to abort delete
 */
function clientValidateDelete(type){
   
    return true;
}
