/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       03 Dec 2013     lalmaula
 *
 */
function onClickSubmit(){
	

	
    if(startModifiedDate != null && startModifiedDate != nlapiLookupField(nlapiGetRecordType(), nlapiGetRecordId(), 'lastmodifieddate')) {
		alert('The record has been modified.  Please save changes before submitting for approval.');
		return false;
	}
    
    nlapiLogExecution('DEBUG','In onClickSubmit'+nlapiGetRecordId());
    var  record = nlapiLoadRecord('expensereport',nlapiGetRecordId());
    record.setFieldValue('custbody_pp_er_approval_seq',1);
    record.setFieldValue('custpage_er_project',nlapiGetFieldText('custbodypp_er_project'));
    
    
	return true;

    try
    {
    	
    var id = nlapiSubmitRecord(record, true);
    }

  catch (e)
    {
      nlapiLogExecution('ERROR', e.getCode(), e.getDetails());
    }

}