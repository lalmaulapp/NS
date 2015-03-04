/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       05 Jun 2014     lalmaula
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function Rejectsuitelet(request, response){

	   if ( request.getMethod() == 'GET' )
	  {
			
	    var form = nlapiCreateForm('Rejection Reason');
	    var field=form.addField('rejfield', 'text', 'Rejection Reason');
	    var recId = request.getParameter('id');
	    field.setMandatory( true );
	    form.setScript('customscript101');
	    form.addSubmitButton('Send Email');
	    response.writePage( form );
	   }
	   

	   else
	   {   
		   var author = nlapiGetUser();
		 var field = request.getParameter('rejfield') ; 
		 nlapiLogExecution('DEBUG','rejection reason'+field);
		 var  reason = response.write(request.getParameter('rejfield'));
		
		 var  recId = request.getParameter('id');
		 nlapiLogExecution('DEBUG', recId);
		// var mailRec = nlapiMergeRecord(2, 'expensereport', recId);
	      var records = new Object();
	      records['transaction'] = recId;
	     // nlapiSendEmail(author,'lalmaula@projectp.com', 'Expense Report Rejection', field);
		  nlapiSendEmail(author,'lalmaula@projectp.com', 'Expense Report Rejection', field+reason, null, null,records, null);
	    
	   }


}
