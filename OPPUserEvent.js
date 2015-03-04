/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       31 Mar 2014     lalmaula
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
function userEventBeforeLoad(type, form, request){
	
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
	

    if (type != 'create')
    { 
        //get the old record and the old values
        var oldRecord = nlapiGetOldRecord(); 
        var olddept = oldRecord.getFieldValue('department');
        var oldname = oldRecord.getFieldValue('title');
        var olddate = oldRecord.getFieldValue('expectedclosedate');
        var oldstatus = oldRecord.getFieldText('entitystatus');
        var oldcust = oldRecord.getFieldValue('entity');
        //get the new record and the new values
        var newRecord = nlapiLoadRecord('opportunity', nlapiGetRecordId());
        var newdept = newRecord.getFieldValue('department');
        var newname = newRecord.getFieldValue('title');
        var newdate = newRecord.getFieldValue('expectedclosedate');
        var newproj = newRecord.getFieldValue('job');
        var newstatus = newRecord.getFieldText('entitystatus');
        var newcust = newRecord.getFieldValue('entity');
        var newsalesrep = newRecord.getFieldValue('salesrep');
        
        if (newproj != null)
        {
        nlapiLogExecution('DEBUG','dates '+olddate+newdate);
        
    
    	var project= nlapiLoadRecord('job',newproj);
    
    	
        if (newdept != olddept) 
            { 
             project.setFieldValue('custentity_pp_proj_dept',newdept);
            }
        if ( newdate != olddate)
        { 
        	 nlapiLogExecution('DEBUG','dates  not same ');
        	 var projstart = new Date(nlapiAddDays(nlapiStringToDate(newdate),21));
        	 nlapiLogExecution('DEBUG','projstart'+projstart);
         project.setFieldValue('startdate',nlapiDateToString(projstart));
        }
        if  ( newname != oldname)
        {
        	 project.setFieldValue('companyname',newname);
        	
        }   
      
        if (newstatus == 'Finalize Booking' )
        	{
        	project.setFieldText('entitystatus','Awarded');
        	
        	 var dept_super = nlapiLookupField('department',newdept,'custrecordpp_er_dept_supervisor' );
             var dept_super_email =nlapiLookupField('employee',dept_super,'email');
             var records = new Object();
             records['entity'] = project.getId();
             var msg = 'https://system.sandbox.netsuite.com/app/common/entity/custjob.nl?id=';
             var msgrec = msg.concat(project.getId());
             var message = 'Please work with Project Accounting to finalize project setup. The project can be accessed at the following link.<a href= ';
             var msg2 ='>View Record</a>';
             var x = (message.concat(msgrec)).concat(msg2);
             nlapiSendEmail(-5, dept_super_email, 'The opportunity '+newname+' has entered Finalize Booking stage',x , null, null,records, null);
       	    	    
        	
        	
         	}
        if ( newstatus == 'Closed Won')
        	{
        	var salesrep_email =nlapiLookupField('employee',newsalesrep,'email');
        	var msg='https://system.sandbox.netsuite.com/app/accounting/transactions/opprtntylist.nl?id=';
        	var msgrec = msg.concat(newRecord.getId());
        	var message = 'The opportunity can be accessed at the following link.<a href= ';
        	var msg2 ='>View Record</a>';
            var x = (message.concat(msgrec)).concat(msg2);
        	var records = new Object();
            records['transaction'] =newRecord.getId();
            nlapiSendEmail(-5, salesrep_email, 'The opportunity '+newname+' has entered Won/Closed stage', x, null, null,records);
        	}
        if  ( newcust != oldcust)
        {
        	 project.setFieldValue('parent',newcust);
        	
        }  
        var p = nlapiSubmitRecord(project);
        nlapiLogExecution('DEBUG', 'project record updated successfully', 'ID = ' + p);
    	}
    }   
}
