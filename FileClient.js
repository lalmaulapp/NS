/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       06 Jun 2014     lalmaula
 *
 */
function ER_Files_Client(){
if ( nlapiGetFieldValue('custbody1') == 0 )
{
var checked = confirm(' No files have been attached. Are you sure you want to save this record?'); 
  if (checked){ 
	window.location = nlapiResolveURL('SUITELET', 'customscript50', 'customdeploy1' + '&tranid=' + nlapiGetRecordId());
}
}
}