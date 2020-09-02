function($scope, $http, $sce) {
  /* widget controller */
  var c = this;

	var arrOrderedFormFields = [
		"Description of Intended Use",
		"Access Rights",
		"Access Method",
		"Impact on System",
		"Additional Information Requested",
		"Description of Application or Project",
		"Necessity of Data",
		"Scope and Control",
		"Requested Information Map",
		"Data Steward Response"
	];
	var requestedTerms = [];
	var glossaries = [];
	var attributes = [];
	var dsaAttributes = [];
	var dsas = [];
	var policies = [];

	$http.get('/api/bryu/infohub_domain_data/getRequestDetails/' + c.data.dsrId).then(function(response) {
		var results = response.data.result.aaData[0];
		c.data.title = results.assetName;
		for(var rt in results.requestedTerms) {
			var reqTermCommId = results.requestedTerms[rt].reqTermCommId;
			var vocabName = results.requestedTerms[rt].reqTermVocabName;
			var signifiers = results.requestedTerms[rt].reqTermSignifier;
			if(glossaries.indexOf(vocabName) == -1) {
				glossaries.push(vocabName);
			}
			//requestedTerms[vocabName].push(signifiers);
			var termMap = {"vocabName" : vocabName, "signifiers" : signifiers, "reqTermCommId" : reqTermCommId};
			requestedTerms.push(termMap);
		}
		for(var attr in results.attributes){
			var signifier = results.attributes[attr].attrSignifier;
			var value = results.attributes[attr].attrValue;
			var attMap = {"attrSignifier" : signifier, "attrValue" : value};
			attributes.push(attMap);
		}
		for(var p in results.policies) {
			policies.push(results.policies[p]);
		}
		for(var agreements in results.dsas) {
			var dsa = results.dsas[agreements];
			dsa.custodian = dsa.custodianFirstName + " " + dsa.custodianLastName;
			dsa.steward = dsa.stewardFirstName + " " + dsa.stewardLastName;
			var dsaId = results.dsas[agreements].dsaId;
			console.log(results.dsas[agreements]);
			dataForDSA(dsaId);
			dsas.push(dsa);
		}

		c.data.results = results;
		c.data.arrOrderedFormFields = arrOrderedFormFields;
		c.data.requestedTerms = requestedTerms;
		c.data.glossaries = glossaries;
		c.data.attributes = attributes;
		c.data.dsas = dsas;
		c.data.policies = policies;
		c.data.virtualTables = results.necessaryVirtualTables;
		c.data.samlResponses = results.necessarySamlResponses;
		c.data.apis = results.necessaryApis;
		c.data.tables = results.necessaryTables;
		console.log(attributes['Application or Project Name']);
		console.log(requestedTerms);
		console.log(glossaries);
		console.log(results);
	});

	dataForDSA = function (dsaId) {
		$http.get('/api/bryu/infohub_domain_data/getRequestDetails/' + dsaId).then(function(response) {
			var results = response.data.result.aaData[0];
			for(var attr in results.attributes){
				var signifier = results.attributes[attr].attrSignifier;
				var value = results.attributes[attr].attrValue;
				var attMap = {"attrSignifier" : dsaId + signifier, "attrValue" : value};
				dsaAttributes.push(attMap);
			}
			c.data.dsaAttributes = dsaAttributes;
		});
	}

	$scope.findAttrByKey = function(attributes, attrSignifier){
		for(var attr in attributes){
			if(attributes[attr].attrSignifier == attrSignifier){
				var txt = document.createElement("textarea");
				txt.innerHTML = attributes[attr].attrValue;
				return txt.value;
			}
		}
	}

	$scope.findAttrByKeyNoEscape = function(attributes, attrSignifier){
		for(var attr in attributes){
			if(attributes[attr].attrSignifier == attrSignifier){
				return $sce.trustAsHtml(attributes[attr].attrValue);
			}
		}
	}

	$scope.findDSAAttrByKey = function(attributes, attrSignifier){
		for(var attr in attributes){
			if(attributes[attr].attrSignifier == attrSignifier){
				return attributes[attr].attrValue;
			}
		}
	}

	$scope.dsaGlossaryFoundRequired = function(requestedTerms, dsa){
		for(var rt in requestedTerms){
			if(requestedTerms[rt].reqTermCommId == dsa.dsaCommunityId){
				return true;
			}
		}
		return false;
	}

	c.print = function () {
		window.print();
	}
}
