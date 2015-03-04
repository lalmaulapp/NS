/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       18 Dec 2013     lalmaula
 *Answer Id: 19605
 */

/**
 * @returns {Void} Any or no return value
 */
function copyfromtemplateWA() {
	
    var opptyrec = nlapiGetNewRecord();
    
    var customer = opptyrec.getFieldValue('entity');
nlapiLogExecution('DEBUG','customer on opportunity '+customer);
    var projstartdate = new Date(opptyrec.getFieldValue('expectedclosedate'));
    var dept = opptyrec.getFieldValue('department');
    nlapiLogExecution('DEBUG','opp date'+projstartdate) ;
  nlapiLogExecution('DEBUG','department is '+dept) ;

	nlapiLogExecution('DEBUG','entity is '+customer);
	var title = opptyrec.getFieldValue('title');
	var opp = opptyrec.getFieldValue('tranid');
        var opptype = opptyrec.getFieldText('custbody_pp_sf_oppty_type');
	
	nlapiLogExecution('DEBUG','oppty title is '+title);
	
	var filters = new Array();
	filters[0] = new nlobjSearchFilter('entityid', null, 'is', 'PP Template');

	var columns = new Array();
	columns[0] = new nlobjSearchColumn('entityid');

	var temprec = nlapiSearchRecord('job', null, filters, null);
    var template_id = temprec[0].getId();
		nlapiLogExecution('DEBUG','template id', template_id);
       if ( opptype != 'Change Order')
       {
	  if (template_id !=null)
      {
	
	    var createProjRecReference = nlapiCopyRecord('job', template_id);
	    //nlapiLogExecution('DEBUG','template id ',recs.getId());

	    //Create a new project record
	     nlapiLogExecution('DEBUG','new internal id',createProjRecReference.getId());
    	//Assign the values of the template record to the new one

	    
	   // Check for existing projects,skip the rest if it already exists
	   var fldMap = new Array();
	   fldMap[0] = new nlobjSearchFilter('entityid', null, 'is', title);
                        fldMap[1] = new nlobjSearchFilter('parent',null,'anyof',customer);
	   var duplicateRecords = nlapiSearchRecord( 'job', null,fldMap,null );
                      nlapiLogExecution('DEBUG','About to search job');
	   for ( var i = 0; duplicateRecords !=null && i < duplicateRecords.length; i++ )
	   {
		  var duplicateRecord = duplicateRecords[ i ];
	
		  var record = duplicateRecord.getId( );
		  nlapiLogExecution('DEBUG','Project already exists',record);
	   }
	  if ( !record )
	  {
	     //Make sure to place the id field as null
	     createProjRecReference.setFieldValue('id',null);
	     createProjRecReference.setFieldValue('entityid', title);
	     createProjRecReference.setFieldValue('companyname',title);
	     createProjRecReference.setFieldValue('parent',customer);
	     createProjRecReference.setFieldValue('custentity_pp_proj_dept',dept);
	     createProjRecReference.setFieldValue('startdate',nlapiDateToString(nlapiAddDays(projstartdate,21)));
	     createProjRecReference.setFieldText('entitystatus', 'Proposal');
	     //createProjRecReference.setFieldValue('custentity7',opp);

	     var newRecordId = nlapiSubmitRecord(createProjRecReference, true, true);
	

	     nlapiLogExecution('DEBUG','newRecordId', newRecordId);
	
		
	     var filters = new Array();
	     filters[0] = new nlobjSearchFilter( 'internalid', 'job', 'anyof', template_id );
	     var columns = new Array();
	     columns[0] = new nlobjSearchColumn('internalid');
         var searchResults =  nlapiSearchRecord('projecttask', null,filters,columns);
	
	    for ( var i = 0; searchResults != null && i < searchResults.length; i++ )
	    {
	
	       nlapiLogExecution('DEBUG','search result id'+ searchResults[i].getValue('internalid'));
	       var createTaskRecReference = nlapiCopyRecord('projecttask', searchResults[i].getValue('internalid'));
	       createTaskRecReference.setFieldValue('id',null);
	       createTaskRecReference.setFieldValue('company',newRecordId);
	
	
           var recProjTaskId = nlapiSubmitRecord(createTaskRecReference);
	    }
	      //send email to Dept. Supervisor on Opportunity
	
	      var dept_super = nlapiLookupField('department',opptyrec.getFieldValue('department'),'custrecordpp_er_dept_supervisor' );
	      var dept_super_email =nlapiLookupField('employee',dept_super,'email');
          var email = '';
	      var email = dept_super_email;
	 
	
	       var records = new Object();
           records['entity'] = newRecordId;
           var msg = 'https://system.netsuite.com/app/common/entity/custjob.nl?id=';
           var msgrec = msg.concat(newRecordId);
           var message = 'A new estimate project has been created.<a href= ';
           var msg2 ='>View Record</a>';
           var x = (message.concat(msgrec)).concat(msg2);
  
		  nlapiSendEmail(-5, email, 'Estimating Project created', x, null, null,records, null);
		  
		  
	    
	     return newRecordId;
         } //no duplicates

	return record;
} //template id exists
}
return 1;

}
