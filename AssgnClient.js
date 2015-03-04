/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       01 May 2014     lalmaula
 *
 */

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
if ( type == 'assignee')
{
       if (name =='resource')
      {
           var restype = nlapiLookupField('entity',nlapiGetCurrentLineItemValue('assignee','resource'),'type');

        

            if (restype =='Employee' )
            {
                    var dept = nlapiLookupField('employee',nlapiGetCurrentLineItemValue('assignee','resource'),'department');
            }
       
   if (restype =='GenericRsrc')
   {
      var dept = nlapiLookupField('genericresource',nlapiGetCurrentLineItemValue('assignee','resource'),'custentity_pp_proj_dept');
		    	} 

         
              var  si = nlapiLookupField('department',dept,'custrecord_pp_dept_service_item');
			   	
               nlapiSetCurrentLineItemValue('assignee','serviceitem',si);

          }//name is resource
} //type is assignee
 
	
}
