/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       25 Nov 2013     lalmaula
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */
function DeptList(type) {
	//var columns = new Array();

	//columns[1] = new nlobjSearchColumn( 'entityid','customer');
	//columns[0] = new nlobjSearchColumn('name');
	//columns[1] = new nlobjSearchColumn('internalid');

//	var searchResults =  nlapiSearchRecord('userrole', null,null,columns);

//	for ( var i = 0; searchResults != null && i < searchResults.length; i++ )
//	{
//	var searchresult = searchResults[ i ];
//	var compname = searchresult.getValue( 'name');
//	var supid = searchresult.getValue('internalid');
//	// var person = nlapiLookupField('employee',supid,'supervisor' );


//	nlapiLogExecution('DEBUG','Role/id :'+compname +supid);
	
/*	  var filters = new Array();
	  filters[0] = new nlobjSearchFilter('role', null,'is', 1021);
	  var columns = new Array();
	  columns[0] = new nlobjSearchColumn('email');

	  results = nlapiSearchRecord('employee', null, filters, columns);
	  var emails = '';

	  for (var i = 0; results != null && i < results.length; i++) {
		  nlapiLogExecution('DEBUG','email addr cc '+results[i].getValue('email'));
		  
	   emails = emails + results[i].getValue('email') + ',' ;
	  }
	  emails = emails.substring(0,emails.length -1);
nlapiLogExecution('DEBUG','emails :'+emails);
	  nlapiSendEmail(-5, emails, 'Test', 'Test', null, null, null, null);
	
*/
	 
	//  var filters = nlobjSearchFilter('custrecord_pp_er_routing_seq', null,'equalto', 3);
	//  var  columns =  nlobjSearchColumn('custrecord_pp_er_approver_type');

	//  var seqrecs = nlapiSearchRecord('customrecord_pp_er_approval_rec',null, new nlobjSearchFilter('custrecord_pp_er_routing_seq',null,'equalto',3),new nlobjSearchColumn('custrecord_pp_er_approver_type')); 
	//  var seqrec = seqrecs[0].getText('custrecord_pp_er_approver_type');
	  
	  
	//  nlapiLogExecution('DEBUG','approver rec'+seqrec);
/*	var filters = new Array();
	  filters[0] = new nlobjSearchFilter( 'internalid', 'job', 'anyof', 346 );
	var columns = new Array();
	 columns[0] = new nlobjSearchColumn('internalid');
    var searchResults =  nlapiSearchRecord('projecttask', null,filters,columns);
	
	for ( var i = 0; searchResults != null && i < searchResults.length; i++ )
	{
	
	nlapiLogExecution('DEBUG','search result id'+ searchResults[i].getValue('internalid'));
	var createTaskRecReference = nlapiCopyRecord('projecttask', searchResults[i].getValue('internalid'));
	createTaskRecReference.setFieldValue('id',null);
	createTaskRecReference.setFieldValue('company',762);
	
	var recProjTaskId = nlapiSubmitRecord(createTaskRecReference);
	}
	*/
/*	var context = nlapiGetContext();
	var paramfield = context.getSetting('SCRIPT','custscript2');
	
	var record = nlapiLoadRecord('job', 788);

    var i;
    nlapiLogExecution('DEBUG','res cnt'+record.getLineItemCount('jobresources'));
	
	for ( i = 1; i <= record.getLineItemCount('jobresources'); i++)
	{
		var tot_hours = 0;
		var res = record.getLineItemValue('jobresources','jobresource',i);
		nlapiLogExecution('DEBUG','resource is'+res);
		
		var filters = new Array();
		  filters[0] = new nlobjSearchFilter( 'internalid', 'job', 'anyof', 788 );
		
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
		  var resrec = nlapiCreateRecord('resourceallocation');
			resrec.setFieldValue('allocationresource',res);
			resrec.setFieldValue('project',788);
			resrec.setFieldValue('allocationamount',tot_hours);
			resrec.setFieldValue('startdate',record.getFieldValue('startdate'));
			resrec.setFieldValue('enddate',record.getFieldValue('calculatedenddate'));
			resrec.setFieldValue('allocationtype',2);
			nlapiSubmitRecord(resrec);
	}
	
*/	
	
	//function searchRecords()

	   // perform a summary search: return all sales orders total amounts by customer for those with total sales > 1000
/*	   var filter = new nlobjSearchFilter( 'internalid', 'job', 'anyof', 788 );
	   var service_item = new nlobjSearchColumn('serviceitem', 'assignee', 'group');
	   var billing_class = new nlobjSearchColumn('price','assignee','group');
	   var hours = new nlobjSearchColumn('estimatedwork', 'assignee', 'sum');
	   var cost = new nlobjSearchColumn('cost','assignee','sum');
	 
	   var searchresults = nlapiSearchRecord('projecttask', null, filter, [service_item, billing_class,hours,cost]);
	   for ( var i = 0; i < searchresults.length; i++ )
	   {
	      // access the values this time using the name and summary type
	      var service_item = searchresults[i].getValue('serviceitem', null, 'group');
	      var itemName = searchresults[i].getText('serviceitem', null, 'group');
	      var hours = searchresults[i].getValue('estimatedwork', null, 'sum');
	      var cost = searchresults[i].getValue('cost', null, 'sum');
	      nlapiLogExecution('DEBUG',' item ' + itemName,' value '+hours+cost); 
	   }

*/	   
/*	   var filters = new Array();
	   filters[0] = new nlobjSearchFilter('internalid', 'job', 'is', 788);
	  var columns = new Array();
	//   columns[0] = new nlobjSearchColumn('resource', 'projecttaskassignment');
	   columns[0] = new nlobjSearchColumn('billingclass', 'projecttaskassignment');
	   columns[1] = new nlobjSearchColumn('serviceitem', 'projecttaskassignment');
	   columns[2] = new nlobjSearchColumn('estimatedwork', 'projecttaskassignment');
	  //search for records
	   var searchresults = nlapiSearchRecord('projecttask', null, filters, columns);
	   var  billing_class ={};
	//   var service_item ={};
	   if (searchresults)
	   {
	   for ( var i = 0; i < searchresults.length; i++ ) { 
	  var result = searchresults[i] ;
	//  var resourceID = result.getValue('resource', 'projecttaskassignment');
	  var billingclassID = result.getValue('billingclass','projecttaskassignment');
	  var serviceitemID = result.getValue('serviceitem', 'projecttaskassignment');
	   billing_class[billingclassID] = serviceitemID;
	  // service_item[serviceitemID] = serviceitemID;
	  } 
	   
	   
	   var key ;
	   for (key in billing_class) 
	   { 
		   if (billing_class.hasOwnProperty(key)) 
	   { nlapiLogExecution('DEBUG', ' Found billing class Key :' + key + ':' + billing_class[billingclassID]); }
	   }

	   var lineItem_TotalValue = {};
	    for (var i = 1; i <= lineItemCount; i++) {
	        if (!lineItem_TotalValue[salesOrder.getLineItemValue('item', 'item', i)]) {
	        	
	            lineItem_TotalValue[salesOrder.getLineItemValue('item', 'item', i)] = parseInt(salesOrder.getLineItemValue('item', 'amount', i), 10);
	            
	        }
	        else {
	            lineItem_TotalValue[salesOrder.getLineItemValue('item', 'item', i)] += parseInt(salesOrder.getLineItemValue('item', 'amount', i), 10);
	        }
	    }
	
	/*   for (key in service_item) 
	   { 
		   if (service_item.hasOwnProperty(key)) 
	   { nlapiLogExecution('DEBUG', ' Found service item Key :', key); }
	   }
*/


/*	   var menu = {};
   menu[0].width = 300;
	   menu.height[0] = 200;
	   menu.title[0] ="Menu";
	   
	   menu.width[1] = 100;
	   menu.height[1] = 50;
	   menu.title[1] ="Title";
	 menu = [    {width:  300,  height: 200,title: "Menu" },
          {width: 100, height: 50, title: "Title"}
	   ]; 

	 
	   for(var key in menu) { 
		   var val = menu[key];
		   
 nlapiLogExecution('DEBUG','Key: '+key+ ' value: '+val); 
       for (var subkey in val)
	   { var x = val[subkey];
	     nlapiLogExecution('DEBUG','Subkey: '+subkey+ ' value: '+x); }
 } */

	   
	   //var rec = nlapiLoadRecord('opportunity',3973);
	   //var fields = rec.getAllLineItemFields('item'); 
	   
	   //for (var i = 0; i < fields.length; i++)
		//		{
		//				nlapiLogExecution('DEBUG','Fields :'+fields[i]+rec.getLineItemValue('item',fields[i],1));
	//	}
	  
	   var email = 'lalmaula@projectp.com';
	   var rec =2134;
	   var records = new Object();
	    records['entity'] = '2134';
	   var msg = 'https://system.netsuite.com/app/common/entity/custjob.nl?id=';
	   var msgrec = msg.concat(rec);
	   var message = 'A new estimate project has been created.<a href= ';
	   var msg2 ='>View Record</a>';
	   var x = (message.concat(msgrec)).concat(msg2);
		   
		   
	    nlapiLogExecution('DEBUG','message'+message);
	    
	   
			  nlapiSendEmail(-5, email, 'Estimating Project created', x, null, null,records, null);
			  
		//  var rec = nlapiLoadRecord('job',897);
	/*	  var filters = new Array();
		   filters[0] = new nlobjSearchFilter('internalid','job', 'is',897 );
		   filters[1] = new nlobjSearchFilter('type',null,'is','Estimate');

		   var columns = new Array();

		  columns[0] = new nlobjSearchColumn('tranid',null,'count');
		  
		  var searchresults = nlapiSearchRecord('transaction', null, filters, columns);
		   if (searchresults)
		   {
		   
		   var noofEstimates = searchresults[0].getValue('tranid',null,'count');
		   nlapiLogExecution('DEBUG','existing no of estimates'+noofEstimates);
		   } */
		/*	var intNumberLines = rec.getLineItemCount('timegrid');
			nlapiLogExecution('DEBUG','no of lines'+intNumberLines);
			
			 var arTimeGridColumns = ['sunday','monday','tuesday','wednesday','thursday',
			                             'friday','saturday'];
			 nlapiLogExecution('DEBUG',arTimeGridColumns[1]);
			
		 //   for(var intLineCounter = 1; intLineCounter <= intNumberLines; intLineCounter++)
		  //  {
			    	//var fields  = rec.getLineItemValue('timeentry', 'customer',1);
                   // var subrec = rec.getAllLineItemFields('timegrid');           
                   var te = rec.viewLineItemSubrecord('timesheet','timeentry',1); */
		           //  var fields = rec.getAllSubLists();
					// loop through all the returned fields
				//	for (var i = 0; i < fields.length; i++)
			//	{
				//		nlapiLogExecution('DEBUG','Fields :'+fields[i]);
			//	}
			    	//var proj = rec.getLineItemValue('timegrid', 'customer', intLineCounter);
			    	
			    	//nlapiLogExecution('DEBUG','hours '+fields.getFieldValue('timeentry_hours_1'));                                    
			          //  nlapiLogExecution('DEBUG','project '+fields.getFieldValue('timeentry_customer_1'));
					//	nlapiLogExecution('DEBUG',' Field '+fields+te.getLineItemValue('customer'));
				//	}
			//    }
			          /*
						// reference a Customer saved search
						var results = nlapiSearchRecord('timesheet', 'customsearch275');
						var result = results[0];
					
						// return all columns associated with this search
						var columns = result.getAllColumns();
						var columnLen = columns.length;
						// loop through all columns and pull UI labels, formulas, and functions that have
						// been specified for columns
						for (i = 0; i <= columnLen; i++)
						{
						var column = columns[i];
						var label = column.getLabel();
						var formula = column.getFormula();
						var functionName = column.getFunction();
						var value = result.getValue(column);
						nlapiLogExecution('DEBUG','column + value'+column+value);
						}		
						
								*/
	   
	/*   var emails = '';
	   var filters = new Array();
	   filters[0] = new nlobjSearchFilter('internalid','timesheet', 'is', 22 );
	 //  filters[1] = new nlobjSearchFilter('role','jobresources','is','Project Manager');

	   var columns = new Array();

	  columns[0] = new nlobjSearchColumn('customer',null,'group');
	//  columns[1] = new nlobjSearchColumn('hours',null
	//   columns[0] = new nlobjSearchColumn('resource','projecttaskassignment','group');
	  // columns[1] = new nlobjSearchColumn('email','jobresources');
	 //search for records
	   var searchresults = nlapiSearchRecord('timeentry', null, filters, columns);
	   if (searchresults)
	   {
	   for ( var i = 0; i < searchresults.length; i++ ) { 
	   var result = searchresults[i] ;
	   var proj = result.getValue('customer',null,'group');
	   var rec = nlapiLoadRecord('job',proj);
	   var intNumberLines = rec.getLineItemCount('jobresources');
	   for(var intLineCounter = 1; intLineCounter <= intNumberLines; intLineCounter++)
	   {
	    var em = rec.getLineItemValue('jobresources','email',intLineCounter);
	    var resrole = rec.getLineItemText('jobresources','role',intLineCounter);
	    if (resrole == 'Project Manager')
	    	{
	    nlapiLogExecution('DEBUG','email '+em);
	    
	    emails = emails + em +',' ;
	  	  }
	  	  
	   }
	  // var ts = result.getValue('timesheet');
	  // nlapiLogExecution('DEBUG','project '+proj);
	   }
	   }
	   
	   emails = emails.substring(0,emails.length -1);
       nlapiLogExecution('DEBUG','emails :'+emails);
      // var mailRec = nlapiMergeRecord(5, 'job', newRecordId);
      
       var message = '<a href="https://system.netsuite.com/app/accounting/transactions/timesheet.nl?id="+22+">View Record</a>';
  	 
 	  nlapiSendEmail(-5, emails, 'Timesheet Approval Required ', message, null, null,null, null);
 	   */
	   
   
}
