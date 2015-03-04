/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       29 Apr 2014     lalmaula
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
/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       11 Feb 2014     lalmaula
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

Number.prototype.round = function(places)
{
   return +(Math.round(this + "e+" + places)  + "e-" + places);
}
	
Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

	if ( type == 'create')
	{
	// Done in Page init on create - set estimate seq in title, set oppty #
	// Here: update orig oppty amt back to estimate total
	// set project status to Estimate Complete
	// resource allocations on project
  
	 var opp = nlapiLoadRecord('opportunity',nlapiGetFieldValue('opportunity'));
		   
	 //Delete service item types that may exist on opportunity
	 
	 var opplines = opp.getLineItemCount('item');
	 for ( var i =opplines; i >= 1;i--)
	 {
		// nlapiLogExecution('DEBUG','desc '+opp.getLineItemValue('item','description',i));
			 if  (opp.getLineItemValue('item','itemtype',i) =='Service')
			 {
			
			 opp.removeLineItem('item',i);
			// nlapiLogExecution('DEBUG','removed line '+i);	
			// nlapiLogExecution('DEBUG','lines left'+opp.getLineItemCount('item'));
			 }
		 
	 }
	 //opp.commitLineItem('item');
	// nlapiSubmitRecord(opp); 
	 var estrec = nlapiGetNewRecord();

	 opp.setFieldValue('custbody_pp_opp_latest_estimate',nlapiLookupField('estimate',estrec.getId(),'tranid'));
	 var lines = estrec.getLineItemCount('item');
	 nlapiLogExecution('DEBUG','no of lines'+lines);
	 for ( var lineitem = 1; lineitem <= lines ;lineitem++ )
		{
		 opp.selectNewLineItem('item');
		 nlapiLogExecution('DEBUG','desc is '+estrec.getLineItemValue('item','description',lineitem));
		//    opp.setLineItemValue('item','linenumber',lineitem,lineitem);
		 opp.setCurrentLineItemValue('item','description',estrec.getLineItemValue('item','description',lineitem));
			opp.setCurrentLineItemValue('item','item',estrec.getLineItemValue('item','item',lineitem));
			 nlapiLogExecution('DEBUG','item is '+estrec.getLineItemValue('item','item',lineitem));
			opp.setCurrentLineItemValue('item','rate',estrec.getLineItemValue('item','rate',lineitem));
			opp.setCurrentLineItemValue('item','quantity',estrec.getLineItemValue('item','quantity',lineitem));
			opp.setCurrentLineItemValue('item','amount',estrec.getLineItemValue('item','amount',lineitem));
			opp.setCurrentLineItemValue('item','price',estrec.getLineItemValue('item','price',lineitem));
			opp.setCurrentLineItemValue('item','fromjob',estrec.getLineItemValue('item','fromjob',lineitem));
			opp.setCurrentLineItemValue('item','isestimate',estrec.getLineItemValue('item','isestimate',lineitem));
			opp.setCurrentLineItemValue('item','costestimatetype',estrec.getLineItemValue('item','costestimatetype',lineitem));
			opp.setCurrentLineItemValue('item','costestimate',estrec.getLineItemValue('item','costestimate',lineitem));
			opp.commitLineItem('item');
			
		}
                   	 
	 nlapiSubmitRecord(opp);
nlapiLogExecution('DEBUG','before second submit');
    var opp2= nlapiLoadRecord('opportunity',nlapiGetFieldValue('opportunity'));
        var  linetot = 0;
	 for ( var i =1; i <=  opp2.getLineItemCount('item'); i ++)
	 {
	    linetot +=parseFloat(opp2.getLineItemValue('item','amount',i));		 
	 }

          opp2.setFieldValue('projectedtotal',linetot);
          opp2.setFieldValue('rangelow',linetot);
          opp2.setFieldValue('rangehigh',linetot); 
	

nlapiSubmitRecord(opp2);
nlapiLogExecution('DEBUG','after second submit');


    	 
	 var proj = nlapiLoadRecord('job',nlapiGetFieldValue('job'));
	// proj.setFieldValue('entitystatus',19);
	
	 //Delete existing resource allocations
	 var filter = new nlobjSearchFilter('project', null, 'is', proj.getId() ); 
	 var searchresults = nlapiSearchRecord('resourceallocation', null, filter, null);
	 for ( var i = 0; searchresults != null && i < searchresults.length; i++ )
	 {
	 var searchresult = searchresults[ i ];
	 nlapiDeleteRecord(searchresults[i].getRecordType(), searchresults[i].getId());
	 }
	 
	 
	 //Recreate new allocations
	 var filter = new nlobjSearchFilter('internalid', 'job', 'is', proj.getId() ); 
	 var resourceID = new nlobjSearchColumn('resource', 'projecttaskassignment','group');
	 var start_date = new nlobjSearchColumn('startdate','projecttaskassignment','min');
	 var end_date = new nlobjSearchColumn('enddate','projecttaskassignment','max');
	 var hours = new nlobjSearchColumn('estimatedwork', 'projecttaskassignment', 'sum');
	
	 var sortcol = resourceID.setSort();
	 var searchResults =  nlapiSearchRecord('projecttask', null,filter,[resourceID,start_date,end_date,hours,sortcol]);
	 if (searchResults)
		   {
		   for ( var i = 0; i < searchResults.length; i++ ) { 
		  var result = searchResults[i] ;
		  
		  var resourceID = result.getValue('resource', 'projecttaskassignment','group');
		  nlapiLogExecution('DEBUG','resource id'+resourceID);
		  
		  var stdt = result.getValue('startdate','projecttaskassignment','min');
		  var enddt = result.getValue('enddate','projecttaskassignment','max');
		  var hours = result.getValue('estimatedwork', 'projecttaskassignment','sum');
		  nlapiLogExecution('DEBUG','tot hours '+hours);
		  if ( hours > 0 )
		  {	  
		  var resrec = nlapiCreateRecord('resourceallocation');
			resrec.setFieldValue('allocationresource',resourceID);
			resrec.setFieldValue('project',proj.getId());
			resrec.setFieldValue('allocationamount',hours);
			resrec.setFieldValue('startdate',stdt);
			resrec.setFieldValue('enddate',enddt);
			resrec.setFieldValue('allocationtype',2);
			nlapiSubmitRecord(resrec);
		  }
	      }
		  }
	
	 nlapiLogExecution('DEBUG','Status is '+proj.getFieldText('entitystatus'));
	 nlapiSubmitRecord(proj);
	 //send saved search to salesrep and dept supervisor
	 nlapiLogExecution('DEBUG','Dept is '+estrec.getFieldText('department'));
	 var dept_super = nlapiLookupField('department',estrec.getFieldValue('department'),'custrecordpp_er_dept_supervisor' );
     var dept_super_email =nlapiLookupField('employee',dept_super,'email');
    
     var salesrep_email = nlapiLookupField('employee',estrec.getFieldValue('salesrep'),'email');

    /* 
     var filters = new Array();
     filters[0] = new nlobjSearchFilter( 'company', null, 'is', proj.getId() );
     var columns = new Array();
     columns[0] = new nlobjSearchColumn('company');
  columns[1] = new nlobjSearchColumn('title');
     
  columns[2] = new nlobjSearchColumn('serviceitem','projecttaskassignment');
     columns[3] = new nlobjSearchColumn('billingclass','projecttaskassignment');
     columns[4] = new nlobjSearchColumn('estimatedwork','projecttaskassignment');
     columns[5] = new nlobjSearchColumn('cost','projecttaskassignment');
     columns[6] = new nlobjSearchColumn('price','projecttaskassignment');
     
     
     
     
     
     var results = nlapiSearchRecord('projecttask', null, filters, columns);
     
     
     // Set XML header
     var xml = '<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n';
   xml += '<pdfset>';
   
   xml += '<pdf>';
    xml += '<body size="letter-landscape" font-size="8pt">';
      
       xml +=  ' <b>Sales Estimate Report for Project  : </b>' +results[0].getText('company') +' <b>  Estimate #  </b>' + estrec.getFieldValue('title') ;
  
    xml +='<table width="1500">';
    xml +='<thead>';
    xml += ' <tr font-weight="bold"><td width="100"> Task Name </td>';
     xml += ' <td  width="100"> Service Item </td>';
     xml += ' <td width ="100"> Billing Class </td>';
     xml += ' <td width="50" align="right"> Hours</td>';
     xml += ' <td width="100" align="right"> Cost </td>';
     xml += ' <td width="100" align="right"> Revenue </td> ';
     xml += ' <td width= "75" align="right"> Profit </td> ';
     xml += ' <td width="75" align="right"> Gross Profit % </td></tr>';
     xml +='</thead>';

     xml +='<tbody>';
      
     var hours_tot = 0.00; 
     var cost_tot = 0.00;
     var rev_tot =0.00;
   
    // Contents 
     for( var x=0;x<results.length;x++)
     {
   
     
       xml +=  ' <tr><td>' + results[x].getValue('title')  +'</td> ';
       xml +=  '<td>' + results[x].getText('serviceitem','projecttaskassignment') + '</td>';
       xml += ' <td>' + results[x].getText('billingclass','projecttaskassignment') + '</td>';
       xml += ' <td align="right">' + results[x].getValue('estimatedwork','projecttaskassignment') + '</td>';
  
       hours_tot +=parseFloat(Number(results[x].getValue('estimatedwork','projecttaskassignment') ));
    xml += ' <td align="right">$' + results[x].getValue('cost','projecttaskassignment') + '</td>';
    
       cost_tot += parseFloat(Number(results[x].getValue('cost','projecttaskassignment')));
  xml += ' <td align="right">$' + results[x].getValue('price','projecttaskassignment') + '</td>';
    rev_tot += parseFloat(Number(results[x].getValue('price','projecttaskassignment') ));
      
       var   profit = results[x].getValue('price','projecttaskassignment')- results[x].getValue('cost','projecttaskassignment');
       xml += ' <td align="right">$' + profit.format(2,3) + '</td>';
       var pct = new Number(  (profit*100)/results[x].getValue('price','projecttaskassignment') );
       var p = pct.round(2);
       if ( ! isNaN(p))
      {
        xml += ' <td align="right">' + p+ '%</td>';
      }
       xml +='</tr>';
       
     } 
   var gp = new Number( ( (rev_tot - cost_tot)*100)/rev_tot);
   var g = gp.round(2);

    xml += '<tr><td></td><td></td><td></td><td align="right">'+hours_tot+'</td><td align="right">$'+cost_tot.format(2,3)+'</td><td align="right">$'+rev_tot.format(2,3)+'</td><td align="right">$'+(rev_tot-cost_tot).format(2,3)+'</td><td align="right">'+g+'%</td></tr>';  
  xml +='</tbody>';
      
 xml +='</table>';
     
xml += '</body>';
     
xml += '</pdf>';
     // Close document
     xml += '</pdfset>';

    // Create File 
   // var file = nlapiCreateFile('searchresults.xml', 'XMLDOC', xml);
   var filepdf =  nlapiXMLToPDF(xml);

	  nlapiSendEmail(-5, dept_super_email, 'Proposal Estimate created', 'A new proposal estimate has been created for:', salesrep_email, null,null, filepdf);
	
*/
	//  nlapiSendEmail(-5, dept_super_email, 'Proposal Estimate created', x, salesrep_email, null,null, file);
	  
	 
}
}
  

