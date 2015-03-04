/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       01 Feb 2014     ppdefault
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
function ueOpprAfterSubmit(type){
	
	nlapiLogExecution('DEBUG', 'Opportunity Save', 'type = '+ type);
	
	var recOpportunity = nlapiGetNewRecord();
	
	var opprName = recOpportunity.getFieldValue('opportunity');
	
	nlapiLogExecution('DEBUG', 'Opportunity Save', 'opprname = '+ opprName);
	
	var opprStatus = recOpportunity.getFieldValue('status');
	
	nlapiLogExecution('DEBUG', 'Opportunity Save', 'opprstatus = '+opprStatus);
	
	if (opprStatus == 'Closed Won') {
							
			var filters = new Array();
			filters[0] = new nlobjSearchFilter( 'opportunity', null, 'equalto', opprName, null);
		
			var columns = new Array();
			columns[0] = new nlobjSearchColumn( 'opportunity' );
		
			var searchresults = nlapiSearchRecord('estimate', null, filters, columns);
			
			// Search Estimate corresponding to the opportunity.
		
			for ( var i = 0; searchresults != null && i < searchresults.length; i++ )
			{
				var searchresult = searchresults[i];				
				
				if (searchResult.getFieldValue('opportunity') == opprName) {break;}
				
			}
			
			nlapiLogExecution('DEBUG', 'Opportunity Save', 'Opportunity = ' + searchResult.getFieldValue('opportunity'));
			nlapiLogExecution('DEBUG', 'Opportunity Save', 'record type = '+searchresult.getRecordType());
			nlapiLogExecution('DEBUG', 'Opportunity Save', 'record id = '+searchresult.getRecordId());
			
			var recEstimate = nlapiLoadRecord(searchresult.getRecordType(), searchresult.getRecordId());
			
			var projectName = recEstimate.getFieldValue('job');
			nlapiLogExecution('DEBUG', 'Opportunity Save', 'job = '+ projectName);
			
			// Set estimate status to Purchasing.
			recEstimate.setFieldValue('Status', 'Purchasing');
			nlapiSubmitRecord(recEstimate);
			
			// Search the project record 						
			var filters2 = new Array();
			filters2[0] = new nlobjSearchFilter('companyname', null,'equalto', projectName, null);
			
			var columns2 = new Array();
			columns2[0] = new nlobjSearchColumn('companyname');
			
			var searchRsltsPrj = nlapiSearchRecord('job', null, filters2, columns2);
			
			for (var i = 0; searchRsltsPrj != null && i < searchRsltsPrj.length; i++)
		    {
				var searchRsltsPrjRec = searchRsltsPrj[i];
				
				if (searchRsltsPrjRec.getFieldValue('companyname') == projectName){break;}
		    }
			
			nlapiLogExecution('DEBUG', 'Opportunity Save', 'companyname = '+searchRsltsPrjRec.getFieldValue('companyname'));
			var recProject = nlapiLoadRecord(searchRsltsPrjRec.getRecordType(), searchRsltsPrjRec.getRecordId());
			nlapiLogExecution('DEBUG', 'Opportunity Save', 'project record type = '+searchRsltsPrjRec.getRecordType());
			nlapiLogExecution('DEBUG', 'Opportunity Save', 'project record id = '+searchRsltsPrjRec.getRecordId());
			// Update the project status to Awarded.
			recProject.setFieldValue('status', 'Awarded');
			nlapiSubmitRecord(recProject);
			
			//Create Sales order
			/*var recSalesOrder = nlapiCreateRecord('salesorder', {recordmode: 'dynamic'});
			
			recSalesOrder.setFieldValue('entity', recEstimate.getFieldValue('entity'));
			recSalesOrder.setFieldValue('currency', recEstimate.getFieldValue('currency'));
			recSalesOrder.setFieldValue('orderstatus', 'pending');
			recSalesOrder.setFieldValue('opportunity', recEstimate.getFieldValue('opportunity'));
			recSalesOrder.setFieldValue('exchangerate', recEstimate.getFieldValue('exchangerate'));
			recSalesOrder.setFieldValue('trandate', recEstimate.getFieldValue('exchangerate'));
			
			nlapiSubmitRecord(recSalesOrder);*/
	}
  
}
