/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       21 Nov 2013     lalmaula
 *
 */

/**
 * @returns {Void} Any or no return value
 */
function approvertype()
{
	  var rec = nlapiGetNewRecord();
	  var seq = rec.getFieldValue('custbody_pp_er_approval_seq');
	  
	  nlapiLogExecution('DEBUG','Approval sequence is '+seq);
    
     // var fields = ['custrecord_pp_er_approver_type'];
	 // var columns = nlapiLookupField('customrecord_pp_er_approval_rec',seq , fields,true);
	  
	  var seqrecs = nlapiSearchRecord('customrecord_pp_er_approval_rec',null, new nlobjSearchFilter('custrecord_pp_er_routing_seq',null,'equalto',seq),new nlobjSearchColumn('custrecord_pp_er_approver_type')); 
	 
	  if ( seqrecs !=null )
	  {
	  var approver_type= seqrecs[0].getText('custrecord_pp_er_approver_type');
	
	  
	  
	  nlapiLogExecution('DEBUG','approver type'+approver_type);
	  if (approver_type !=null)
	  {	  
	     if (approver_type == 'Person' )
	     {  
		    return 'P';
	     }
	     if (approver_type == 'Role')
		    return 'R';
	  }
     
	  }
	  else
		  return 'X';
}

function workflowAction() {
    var rec = nlapiGetNewRecord();
    
    var dept = rec.getFieldValue('department');
	   nlapiLogExecution('DEBUG','department is '+dept);
    
    var seq = rec.getFieldValue('custbody_pp_er_approval_seq');
    nlapiLogExecution('DEBUG','Sequence is'+seq);
 
 
   var columns = new Array();
   columns[0] = new nlobjSearchColumn('custrecord_pp_er_routing_seq');
   columns[1] = new nlobjSearchColumn('custrecord_pp_er_approver_type');
   columns[2] = new nlobjSearchColumn('custrecord_pp_er_approver_field');
   columns[3] = new nlobjSearchColumn('custrecord_pp_er_role');
   
   var seqrecs = nlapiSearchRecord('customrecord_pp_er_approval_rec',null, new nlobjSearchFilter('custrecord_pp_er_routing_seq',null,'equalto',seq),columns); 
  
   var approver_type= seqrecs[0].getText('custrecord_pp_er_approver_type');     
   var routing_seq =  seqrecs[0].getText('custrecord_pp_er_routing_seq');
   var approver_field = seqrecs[0].getText('custrecord_pp_er_approver_field');
   var approver_rec = approver_field.substring(0,approver_field.indexOf(".")); 
   var apprvr = approver_field.substring(approver_field.indexOf(".")+1,approver_field.length);
   var role =  seqrecs[0].getValue('custrecord_pp_er_role');
    nlapiLogExecution('DEBUG','approver type'+approver_type);
    nlapiLogExecution('DEBUG','field'+approver_field);
    nlapiLogExecution('DEBUG','rec'+approver_rec);
    nlapiLogExecution('DEBUG','approver '+apprvr);
    nlapiLogExecution('DEBUG','ROLE'+role) ;
   
   
   if (approver_type == 'Person' )
   {  
	   if  (approver_rec =='employee')
		   {
	   var emp = rec.getFieldValue('entity');
	   var person = nlapiLookupField(approver_rec,emp,approver_field.substring(approver_field.indexOf(".")+1,approver_field.length));
	   if (apprvr == 'approver' )
		{ 
	 
	   nlapiLogExecution('DEBUG','approver person id'+person);	
	   var expapprover = person;
	   var x = nlapiLookupField('employee',person,'approvallimit');
	   nlapiLogExecution('DEBUG','approval limit'+x);
	   if (x.length == 0)
		   return person;
	   else
	  {
	   var amt = rec.getFieldValue('amount');
	   nlapiLogExecution('DEBUG','er amount'+amt);
		do {		
		if (  (amt <=x ) && x.length !=0 && x !=null)
			{
			
			return expapprover;
			}
		else {
			  if (amt > x )
			  {
			   var  parentrec = nlapiLookupField('employee',person,'approver');
			   var  parentlimit = nlapiLookupField('employee',parentrec,'approvallimit');
			           expapprover = parentrec;
	                   x= parentlimit;
			  }
	                  
			 }
	} while(x !=null);
	  } //else x not null
	  } //approver
	   else // employee supervisor or proj manager
	   return person;
		   } //employee record
		   
	   if (approver_rec =='department')
		   {
		   var dept = rec.getFieldValue('department');
		   nlapiLogExecution('DEBUG','department is '+dept);
		   var person = nlapiLookupField(approver_rec,dept,approver_field.substring(approver_field.indexOf(".")+1,approver_field.length));
		   nlapiLogExecution('DEBUG','person id'+person);	
		   return person;
		   }
   
    }
  if (approver_type =='Role')
	  {
	  
	  var filters = new Array();
	  filters[0] = new nlobjSearchFilter('role', null,'is', role);
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
      var mailRec = nlapiMergeRecord(5, 'expensereport', rec.getId());
      var records = new Object();
      records['transaction'] = rec.getId();
	  nlapiSendEmail(-5, emails, mailRec.getName(), mailRec.getValue(), null, null,records, null);
	

	  return role;
	  

	  
	  }
    
 
	
	
	
	
}
function setflags()
{
	   var rec = nlapiGetNewRecord();
	    var seq = rec.getFieldValue('custbody_pp_er_approval_seq');
	    nlapiLogExecution('DEBUG','Sequence is'+seq);
	    
	    var columns = new Array();
	    columns[0] = new nlobjSearchColumn('custrecord_pp_er_next_approval_status');
	    columns[1] = new nlobjSearchColumn('custrecord_pp_er_sup_approval');
	    columns[2] = new nlobjSearchColumn('custrecord_pp_er_acc_approval');
	 
	    
	    var seqrecs = nlapiSearchRecord('customrecord_pp_er_approval_rec',null, new nlobjSearchFilter('custrecord_pp_er_routing_seq',null,'equalto',seq),columns); 
	   
	    var next_approval_status= seqrecs[0].getText('custrecord_pp_er_next_approval_status');     
	    var sup_approval =  seqrecs[0].getText('custrecord_pp_er_sup_approval');
	    var acc_approval = seqrecs[0].getText('custrecord_pp_er_acc_approval');
	    
	   
	    rec.setFieldText('approvalstatus',next_approval_status);
		rec.setFieldText('supervisorapproval',sup_approval);
		rec.setFieldText('accountingapproval', acc_approval);
}
function get_override_approver()
{
	    var rec = nlapiGetNewRecord();
	    
	    var seq = rec.getFieldValue('custbody_pp_er_approval_seq');
	    nlapiLogExecution('DEBUG','Sequence is'+seq);
	 
	 
	   var columns = new Array();
	   columns[0] = new nlobjSearchColumn('custrecord_pp_er_over_role');
	   var seqrecs = nlapiSearchRecord('customrecord_pp_er_approval_rec',null, new nlobjSearchFilter('custrecord_pp_er_routing_seq',null,'equalto',seq),columns); 
	  
	   var over_role =  seqrecs[0].getValue('custrecord_pp_er_over_role');
	   return over_role;
	}