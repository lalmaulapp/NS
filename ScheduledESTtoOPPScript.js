/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       06 Mar 2014     lalmaula
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */
function scheduled(type) {
	
	// var opp = nlapiLoadRecord('opportunity',nlapiGetFieldValue('opportunity'));
	 
	// var estrec = nlapiLoadRecord('estimate',4914);
	 var opp = nlapiCreateRecord('opportunity');
	 opp.setFieldValue('projectedtotal',100);
	// opp.setFieldValue('rangelow',getFieldValue('total'));
	// opp.setFieldValue('rangehigh',nlapiGetFieldValue('total'));
	 opp.setFieldValue('entity',169);
	 opp.setFieldValue('entitystatus',7);
	 opp.setFieldValue('title', 'test');
	
	 
	 var today = new Date();
	 var tomorrow = nlapiAddDays(today, 1);
	 
	 opp.setFieldValue('expectedclosedate' , nlapiDateToString(tomorrow));
	
	// var lines = estrec.getLineItemCount('item');
	// nlapiLogExecution('DEBUG','no of lines'+lines);
	// for ( var lineitem = 1; lineitem <= lines ;lineitem++ )
	//	{
		opp.selectNewLineItem('item');
		// nlapiLogExecution('DEBUG','desc is '+estrec.getLineItemValue('item','description',lineitem));
		//    opp.setLineItemValue('item','linenumber',lineitem,lineitem);
		// opp.setLineItemValue('item','description',lineitem,estrec.getLineItemValue('item','description',lineitem));
		//	opp.setLineItemValue('item','item',lineitem,estrec.getLineItemValue('item','item',lineitem));
		 opp.setCurrentLineItemValue('item','item',41);
//			 nlapiLogExecution('DEBUG','item is '+estrec.getLineItemValue('item','item',lineitem));
	//		opp.setLineItemValue('item','rate',lineitem,estrec.getLineItemValue('item','rate',lineitem));
		//	opp.setLineItemValue('item','quantity',lineitem,estrec.getLineItemValue('item','quantity',lineitem));
		//	opp.setLineItemValue('item','amount',lineitem,estrec.getLineItemValue('item','amount',lineitem));
		//	opp.setLineItemValue('item','costestimatetype',lineitem,estrec.getLineItemValue('item','costestimatetype',lineitem));
		//	opp.setLineItemValue('item','costestimate',lineitem,estrec.getLineItemValue('item','costestimate',lineitem));
			
	//	}
	 opp.commitLineItem('item'); 
		 nlapiSubmitRecord(opp);
	 

}
