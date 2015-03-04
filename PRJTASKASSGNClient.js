/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       08 Apr 2014     lalmaula
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */
function clientPageInit(type){
	
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
function clientFieldChanged(type, name, linenum){
	//alert('in cliend field changed'+type+name+linenum);

/*	if (type =='recmachcustrecord12') 
	{
		if (name =='custrecord11')
	   {
		nlapiSetCurrentLineItemValue('recmachcustrecord12','custrecord17',nlapiLookupField('projecttask',nlapiGetCurrentLineItemValue('recmachcustrecord12','custrecord11'),'startdate'));
		nlapiSetCurrentLineItemValue('recmachcustrecord12','custrecord18',nlapiLookupField('projecttask',nlapiGetCurrentLineItemValue('recmachcustrecord12','custrecord11'),'enddate'));
	   }
	if (name =='custrecord13' )
		{
		//alert('resource is '+nlapiGetCurrentLineItemText('recmachcustrecord12','custrecord13'));
		nlapiSetCurrentLineItemValue('recmachcustrecord12','custrecord20',nlapiLookupField('employee',nlapiGetCurrentLineItemValue('recmachcustrecord12','custrecord13'),'laborcost'));
		nlapiSetCurrentLineItemValue('recmachcustrecord12','custrecord16',nlapiLookupField('employee',nlapiGetCurrentLineItemValue('recmachcustrecord12','custrecord13'),'billingclass'));
		
	
	
	
	var bcrec = nlapiLoadRecord('billingclass',nlapiLookupField('employee',nlapiGetCurrentLineItemValue('recmachcustrecord12','custrecord13'),'billingclass'));
	for ( var j = 1; j<= bcrec.getLineItemCount('pricecost'); j++ )
	 {
	    if ( bcrec.getLineItemValue('pricecost','currency_id',j) == nlapiGetFieldValue('currency') )
	    	{
	    	     nlapiSetCurrentLineItemValue('recmachcustrecord12','custrecord22',bcrec.getLineItemValue('pricecost','price',j));
	    		
	    	}
	  }
		}
	
    
	}  */
	if ( name =='custentity_pp_proj_multiplier')
    {
		
	var proj = nlapiLoadRecord('job',nlapiGetRecordId());
	 var filter = new nlobjSearchFilter('internalid', 'job', 'is', proj.getId() );
	 var unitprice = new nlobjSearchColumn('unitprice','projecttaskassignment');
	 
	 var searchResults =  nlapiSearchRecord('projecttask', null,filter,unitprice);
	 if (searchResults)
		   {
		   for ( var i = 0; i < searchResults.length; i++ ) { 
		  var result = searchResults[i] ;
		  var  unit_price = result.getValue('unitprice','projecttaskassignment');
	//	  alert ('unitprice is'+unit_price);
		  var asgn= nlapiLoadRecord('projecttask',searchResults[i].getId());
		  for ( var j = 1; j <= asgn.getLineItemCount('assignee');j++)
			{ 
			  asgn.selectLineItem('assignee',j);
	
			  
		  asgn.setCurrentLineItemValue('assignee','unitprice', nlapiGetFieldText('custentity_pp_proj_multiplier')*asgn.getLineItemValue('assignee','unitprice',j));  
		//  alert('with multiplier'+asgn.getLineItemValue('assignee','unitprice',j));
		  asgn.commitLineItem('assignee');
			}
		
		 
		 nlapiSubmitRecord(asgn); 
		   }
		   
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
	
	//alert('in post sourcing'+type+name);
	
   
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @returns {Void}
 */
function clientLineInit(type) {
	
	if ( type == 'recmachcustrecord12')
	{
	nlapiSetCurrentLineItemValue('recmachcustrecord12','custrecord14',100);
	}
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @returns {Boolean} True to save line item, false to abort save
 */
function clientValidateLine(type){
	
	if ( type =='recmachcustrecord12')
   {		
	//check against saved tasks	
/*	var taskfilters = new Array();

	taskfilters[0] = new nlobjSearchFilter('company', null, 'anyOf', nlapiGetRecordId());
	taskfilters[1] = new nlobjSearchFilter('id',null,'is',nlapiGetCurrentLineItemValue('recmachcustrecord12','custrecord11'));


	
	var searchResults =  nlapiSearchRecord('projecttask', null, taskfilters,null);
	
	for ( var i = 0; searchResults != null && i < searchResults.length; i++ )
	{
	var searchresult = searchResults[ i ];
	var task = nlapiLoadRecord('projecttask',searchresult.getId());
	  
	 var lineCount = task.getLineItemCount('assignee');
	  nlapiLogExecution('DEBUG','Task'+searchresult.getId()+'Lines'+lineCount);
	  
	  for (var j =1; j<= lineCount; j++) {
		
		  if (nlapiGetCurrentLineItemValue('recmachcustrecord12','custrecord13') == task.getLineItemValue('assignee','resource',j))
		  {
			  alert('This resource already exists on the task');
			  return false;
		  }
	  }
	  
	 } */
	//check within entered but not saved yet lines
	
	var currLine = nlapiGetCurrentLineItemIndex('recmachcustrecord12');
	var lines = nlapiGetLineItemCount('recmachcustrecord12');
	for (var l =1; l <= lines; l++) {
		if ( currLine != l)
			{
			if (nlapiGetCurrentLineItemValue('recmachcustrecord12','custrecord13')== nlapiGetLineItemValue('recmachcustrecord12','custrecord13',l)&& 
					nlapiGetCurrentLineItemValue('recmachcustrecord12','custrecord11')== nlapiGetLineItemValue('recmachcustrecord12','custrecord11',l) )
				{alert ('This task and resource combination already exists'); return false;}
			}
	}
	
	}
	
	

    return true;
    
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @returns {Void}
 */
function clientRecalc(type){
 
	// Run through each line 
	for ( var i = 1; i <= nlapiGetLineItemCount('recmachcustrecord12'); i++)
	{
	
	nlapiSetLineItemValue('recmachcustrecord12','custrecord21',i, nlapiFormatCurrency(nlapiGetLineItemValue('recmachcustrecord12', 'custrecord19', i)*
			nlapiGetLineItemValue('recmachcustrecord12', 'custrecord20', i)));
	nlapiSetLineItemValue('recmachcustrecord12','custrecord23',i, nlapiFormatCurrency(nlapiGetLineItemValue('recmachcustrecord12', 'custrecord19', i)*
			nlapiGetLineItemValue('recmachcustrecord12', 'custrecord22', i)*nlapiGetFieldValue('custentity_pp_proj_multiplier')));
	nlapiSetLineItemValue('recmachcustrecord12','custrecord24',i, nlapiFormatCurrency(nlapiGetLineItemValue('recmachcustrecord12', 'custrecord23', i) -
			nlapiGetLineItemValue('recmachcustrecord12', 'custrecord21', i)));
	}
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
