/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       27 Jan 2014     lalmaula
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */

function  getAgg() {
	   
	    var salesOrder = nlapiLoadRecord('expensereport', 3237); 
	    var lineItemCount = salesOrder.getLineItemCount('expense');
	    
	    nlapiLogExecution('DEBUG','lines total : '+lineItemCount);
	    
	    
	    var filters = new Array();
	     filters[0] = new nlobjSearchFilter( 'internalid',null , 'is', 3237 );
	     var columns = new Array();
		    columns[0] = new nlobjSearchColumn('currency', null, 'group');
		    columns[1] = new nlobjSearchColumn('account', null,'group');
		    columns[2] = new nlobjSearchColumn('amount', null, 'sum');
		   
		   var searchresults = nlapiSearchRecord('expensereport', null, filters, columns);
		   for ( var i = 0; i < searchresults.length; i++ )
		   {
		      // access the values this time using the name and summary type
		      var curr = searchresults[i].getValue('currency', null, 'group');
		      var cat = searchresults[i].getText('account', null, 'group');
		      var amt = searchresults[i].getValue('amount', null, 'sum');
		     nlapiLogExecution('DEBUG',' item ' + cat + curr,' value '+amt); 
		   }

	/*    var lineItem_TotalValue = {};
	    for(var i = 1; i <= lineItemCount; i++) {
  if ( lineItem_TotalValue[salesOrder.getLineItemValue('expense', 'category', i)] == undefined)
	  {
	  lineItem_TotalValue[salesOrder.getLineItemValue('expense', 'category', i)] =salesOrder.getLineItemValue('expense', 'category', i);
	     if (lineItem_TotalValue[salesOrder.getLineItemValue('expense', 'category', i)[salesOrder.getLineItemValue('expense', 'currency', i)]] == undefined)
	    {
		  nlapiLogExecution('DEBUG','create',i+'; '+salesOrder.getLineItemValue('expense', 'category', i) + '; '+ salesOrder.getLineItemValue('expense', 'currency', i));
	     
	      lineItem_TotalValue[salesOrder.getLineItemValue('expense', 'category', i)[salesOrder.getLineItemValue('expense', 'currency', i)]]=parseInt(salesOrder.getLineItemValue('expense', 'amount', i), 10);
	      nlapiLogExecution('DEBUG',lineItem_TotalValue[salesOrder.getLineItemValue('expense', 'category', i)[salesOrder.getLineItemValue('expense', 'currency', i)]]);
	    //  lineItem_TotalValue[salesOrder.getLineItemValue('expense', 'category', i)][salesOrder.getLineItemValue('expense', 'currency', i)].amt= parseInt(salesOrder.getLineItemValue('expense', 'amount', i), 10);
	     }
	     
	     else{
	 //   	 nlapiLogExecution('DEBUG','append',i+'; '+salesOrder.getLineItemValue('expense', 'category', i) + ';'+ salesOrder.getLineItemValue('expense', 'currency', i));
	    //	 nlapiLogExecution('DEBUG','append');
	    	 lineItem_TotalValue[salesOrder.getLineItemValue('expense', 'category', i)[salesOrder.getLineItemValue('expense', 'currency', i)]] += parseInt(salesOrder.getLineItemValue('expense', 'amount', i), 10);
	    	  }
	  }
	     else {
	    	 
	    	  if (lineItem_TotalValue[salesOrder.getLineItemValue('expense', 'category', i)[salesOrder.getLineItemValue('expense', 'currency', i)]] == undefined)
	  	    {
	  		  nlapiLogExecution('DEBUG','create',i+'; '+salesOrder.getLineItemValue('expense', 'category', i) + '; '+ salesOrder.getLineItemValue('expense', 'currency', i));
	  	     
	  	      lineItem_TotalValue[salesOrder.getLineItemValue('expense', 'category', i)[salesOrder.getLineItemValue('expense', 'currency', i)]]=parseInt(salesOrder.getLineItemValue('expense', 'amount', i), 10);
	  	    }
	    	  else{
	    	 nlapiLogExecution('DEBUG','append',i+'; '+salesOrder.getLineItemValue('expense', 'category', i) + ';'+ salesOrder.getLineItemValue('expense', 'currency', i));
	    	 lineItem_TotalValue[salesOrder.getLineItemValue('expense', 'category', i)[salesOrder.getLineItemValue('expense', 'currency', i)]] += parseInt(salesOrder.getLineItemValue('expense', 'amount', i), 10);
	    	  }
	     }
	    	     
	  nlapiLogExecution('DEBUG',' amount'+lineItem_TotalValue[salesOrder.getLineItemValue('expense', 'category', i)[salesOrder.getLineItemValue('expense', 'currency', i)]]);
	     //   	}
	      //      lineItem_TotalValue[salesOrder.getLineItemValue('expense', 'category', i)] = parseInt(salesOrder.getLineItemValue('expense', 'amount', i), 10);
	       // }
	  //      else {
	   //         lineItem_TotalValue[salesOrder.getLineItemValue('expense', 'category', i)] += parseInt(salesOrder.getLineItemValue('expense', 'amount', i), 10);
	    //    }
	  
	   
	    } // end for
	
	      var key;
		   for ( key in lineItem_TotalValue) 
		   { 
			   var obj = lineItem_TotalValue[key];
			   if (lineItem_TotalValue.hasOwnProperty(key))
				   			   {nlapiLogExecution('DEBUG', ' Found  Key :' + key + ':' , obj); }
			   
		   for(var subkey in obj){
		     if ( obj.hasOwnProperty(subkey))
		   { nlapiLogExecution('DEBUG', ' Found  Key :' + subkey + ':' + obj[subkey]); }
		   }
		   }

	    

}
*/

}