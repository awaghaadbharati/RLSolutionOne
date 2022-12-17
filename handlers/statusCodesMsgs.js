
function fetchColumnNamesList(arr){
	var colList = arr.map(valu => valu.columnName);
	
	return colList;
}
module.exports={
	httpStatusCodes :
	{
	 OK: 200,
	 BAD_REQUEST: 400,
	 NOT_FOUND: 404,
	 INTERNAL_SERVER: 500
	},
	commonErrorMessages:{
		internalError:{"WHException":{"maxSeverity":3, "errors":["Query Execution encountered error= Internal Error"]}},
		noDataError:{"WHException":{"maxSeverity":3, "errors":["Query Execution encountered error=No data found"]}},
		reqParamError:{"WHException":{"maxSeverity":3, "errors":["API Path not supported"]}},
		reqIncorrectParamError:{"WHException":{"maxSeverity":3, "errors":["Invalid parameter"]}}
	}

}