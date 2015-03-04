/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       06 Jun 2014     lalmaula
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function ERFilessuitelet(request, response){

	

        var wfInstance = nlapiTriggerWorkflow('expensereport', request.getParameter('tranid'), 143, 'workflowaction208');
        nlapiSetRedirectURL('RECORD', 'expensereport', request.getParameter('tranid'));
 
	
}
