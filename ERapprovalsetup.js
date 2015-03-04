/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       26 Nov 2013     lalmaula
 *
 */

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
	
	
	if (name =='custrecord_pp_er_approver_type')
{

	if ( nlapiGetFieldText('custrecord_pp_er_approver_type') == 'Person' )
		{
			
		
			nlapiDisableField('custrecord_pp_er_role');
		}
	else
		 {
	     
	       nlapiDisableField('custrecord_pp_er_approver_field');
		 } 
	       

}
}
function userEventBeforeLoad(type, form, request){
	var approver_type = nlapiGetFieldText('custrecord_pp_er_approver_type');
	
	if ( approver_type == 'Person' )
		{
		form.getField('custrecord_pp_er_approver_field').setMandatory(true);
	    form.getField('custrecord_pp_er_role').setDisplayType('disabled');
		}
	else
		{
		form.getField('custrecord_pp_er_role').setMandatory(true);
	 form.getField('custrecord_pp_er_approver_field').setDisplayType('disabled');
		}

}
