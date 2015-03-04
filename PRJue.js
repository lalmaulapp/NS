/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       14 Apr 2014     lalmaula
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

var billing_classes = new Object();
function userEventBeforeLoad(type, form, request){
	var rec =  nlapiGetNewRecord();
nlapiLogExecution('DEBUG','project id '+rec.getId());
nlapiLogExecution('DEBUG','lines'+rec.getLineItemCount('recmachcustrecord12'));
nlapiLogExecution('DEBUG','currency of project is '+rec.getFieldValue('currency'));


var columns =new Array();

columns[0] = new nlobjSearchColumn('name'); 
//columns[1] = new nlobjSearchColumn('pricecost','price');

var searchresults = nlapiSearchRecord('billingclass', null, null,columns);
for ( var i = 0; searchresults != null && i < searchresults.length; i++ )
{
var searchresult = searchresults[ i ];
 var id = searchresult.getId();
 var name = searchresult.getValue('name');
// nlapiLogExecution('DEBUG','name'+name+'id'+id);
 
   var bcrec = nlapiLoadRecord('billingclass',id);
   billing_classes.id =id;
   billing_classes.name = name;
   nlapiLogExecution('DEBUG','number of currency recs'+bcrec.getLineItemCount('pricecost'));
 for ( var j = 1; j<= bcrec.getLineItemCount('pricecost'); j++ )
 {
    if ( bcrec.getLineItemValue('pricecost','currency_id',j) == rec.getFieldValue('currency') )
    	{
    	     billing_classes.rate =bcrec.getLineItemValue('pricecost','price',j);
    		//var fields = bcrec.getAllLineItemFields('pricecost');
    		//for (var k = 0; k < fields.length; k++)
    		//{
    	  //nlapiLogExecution('DEBUG','Fields :'+fields[k]+bcrec.getLineItemValue('pricecost',fields[k],1));
    	//	}
    		//nlapiLogExecution('DEBUG','rate'+bcrec.getLineItemValue('pricecost','price',j));
    	}
  }
    	
}

var sublist = form.getSubList('recmachcustrecord12');
var resfld = sublist.addField('custpageresource','select','Resource').setMandatory(true).setLayoutType('normal','startcol');

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
	nlapiLogExecution('DEBUG','in after submit'+type);
	if (type == 'edit')
	{	
 //check if task dates have changed. If so, update resource allocation dates
	  var oldRecord = nlapiGetOldRecord(); 
	  var newRecord = nlapiGetNewRecord();;
	 
	  if ( (oldRecord.getFieldValue('startdate') != newRecord.getFieldValue('startdate') )&& oldRecord.getFieldValue('startdate') !=null)
		  {
		  nlapiLogExecution('DEBUG','old start date'+oldRecord.getFieldValue('startdate'));
		  nlapiLogExecution('DEBUG','new start date'+newRecord.getFieldValue('startdate'));
		  //Check if allocations exist -- if not, don't proceed
		    nlapiLogExecution('DEBUG','project dates have changed');
		//Delete existing resource allocations
			 var filter = new nlobjSearchFilter('project', null, 'is', newRecord.getId() ); 
			 var searchresults = nlapiSearchRecord('resourceallocation', null, filter, null);
			 if (searchresults)
			{ 
				 var proj= nlapiLoadRecord('job',newRecord.getId());
			nlapiLogExecution('DEBUG','allocations exist');
			 for ( var i = 0; searchresults != null && i < searchresults.length; i++ )
			 {
			 var searchresult = searchresults[ i ];
			 nlapiDeleteRecord(searchresults[i].getRecordType(), searchresults[i].getId());
			 }
			 
			 nlapiLogExecution('DEBUG','deleted allocations, creating new');
			 //Recreate new allocations
			 var filter = new nlobjSearchFilter('internalid', 'job', 'is', newRecord.getId() ); 
			 var resourceID = new nlobjSearchColumn('resource', 'projecttaskassignment','group');
			 var start_date = new nlobjSearchColumn('startdate','projecttaskassignment','min');
			 var end_date = new nlobjSearchColumn('enddate','projecttaskassignment','max');
			 var hours = new nlobjSearchColumn('estimatedwork', 'projecttaskassignment', 'sum');
			
			 var sortcol = resourceID.setSort();
			 var searchResults =  nlapiSearchRecord('projecttask', null,filter,[resourceID,start_date,end_date,hours,sortcol]);
			 if (searchResults)
				   {
				   for ( var i = 0; searchResults != null && i < searchResults.length; i++ ) { 
				  var result = searchResults[i] ;
				  var hours = result.getValue('estimatedwork', 'projecttaskassignment','sum');
				  if ( hours > 0 )
				  {	  
				  var resourceID = result.getValue('resource', 'projecttaskassignment','group');
				  nlapiLogExecution('DEBUG','resource id'+resourceID);
				  
				  var stdt = result.getValue('startdate','projecttaskassignment','min');
				  var enddt = result.getValue('enddate','projecttaskassignment','max');
				  nlapiLogExecution('DEBUG','tot hours '+hours+'St date '+stdt+'End date '+enddt);
				 
				  var resrec = nlapiCreateRecord('resourceallocation');
					resrec.setFieldValue('allocationresource',resourceID);
					resrec.setFieldValue('project',newRecord.getId());
					resrec.setFieldValue('allocationamount',hours);
					resrec.setFieldValue('startdate',stdt);
					resrec.setFieldValue('enddate',enddt);
					resrec.setFieldValue('allocationtype',2);
					nlapiSubmitRecord(resrec);
				  }
			      }
				  }
			
			
			 nlapiSubmitRecord(proj);
			}
		  } //end compare dates
	    if (oldRecord.getFieldText('entitystatus') != newRecord.getFieldText('entitystatus'))
	    	{
	    	if (newRecord.getFieldText('entitystatus') == 'In Progress')
	    		{
	    		newRecord.setFieldValue('allowtime','T');
	    		}
	    	}
	    
	}
	  
}
