function resetDefaultSuggestion() {
  browser.omnibox.setDefaultSuggestion({
    description: 'Multiple search'
  });
}

resetDefaultSuggestion();

browser.omnibox.onInputChanged.addListener(function(text, suggest) {
  // Suggestion code will end up here.
    var x=findSearchName(text);
	browser.omnibox.setDefaultSuggestion({'description': x});
   // browser.omnibox.SuggestResult({'description': findSearchName(searchEngText)});
});

browser.omnibox.onInputCancelled.addListener(function() {
  resetDefaultSuggestion();
});

function navigate(text) {

	var url = findURL(text);
	
if( url != ''){	
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    browser.tabs.update(tabs[0].id, {url: url});
  });
}
else{

	var querying = browser.tabs.query({currentWindow: true});
	querying.then(function(tabs){

		for (let tab of tabs) {
	   	 // tab.url requires the `tabs` permission
  			  console.log(tab.url);
 			 }
		console.log("tab url is::::"+tabs.url);
		}, null);

}
}

browser.omnibox.onInputEntered.addListener(function(text) {
  navigate(text);
});


function findURL(text){
	var parts = text.split(" ");
	var partOne = parts[0];
	var searchURL = findSearchEngin(partOne);

	console.log("Search URL"+searchURL);
	if(searchURL == ''){
		return '';
	}
	console.log(searchURL);
	var  queryParts = [];


  parts.forEach(part => {
    if (parts.indexOf(part) != 0) {
      queryParts.push(part);
    }
  });

	query = queryParts.join(' ');
		
	console.log(queryParts);

	
	return searchURL+query;
}

function findSearchEngin(searchEngText){
	
	if(searchEngText == 'w'){ 
		return 'https://wikipedia.org/wiki/Search?search=';
	}
	else if(searchEngText == 'g'){
       // browser.omnibox.SuggestResult({description: 'you are in google search'});
		return 'https://www.google.co.in/search?q=';     
	}
	else if(searchEngText == 'b'){
		return 'http://www.bing.com/search?q=';
	}
	else if(searchEngText == 'd'){
		return 'https://duckduckgo.com/?q=';
	}
	else if(searchEngText == 'y'){
		return 'https://www.youtube.com/results?search_query=';
	}
	else if(searchEngText == 't'){
                return 'https://twitter.com/search?q=';
        }
	else if(searchEngText == 'gh'){
                return 'https://github.com/search?q=';
        }
	else if(searchEngText == 'ya'){
                return 'https://www.yandex.com/search/?text=';
        }
	else if(searchEngText == 'wp'){
                return 'https://en.search.wordpress.com/?src=organic&q=';
        }
	else if(searchEngText == 'a'){
                return 'https://www.amazon.in/s/field-keywords=';
        }
	else if(searchEngText == 's'){
		return 'http://stackoverflow.com/search';
	}
    else if(searchEngText == 'f'){
        return 'https://www.facebook.com/search/top/?q=';
    }
    else if(searchEngText == 'l'){
                return 'https://www.linkedin.com/search/results/index/?keywords=';
        }
	return '';
}



function findSearchName(searchEngText){

        if(searchEngText == 'w'){
                return 'you are in wiki search';
        }
        else if(searchEngText == 'g'){
                return 'you are in google search';
        }
        else if(searchEngText == 'b'){
                return 'you are in bing search';
        }
        else if(searchEngText == 'd'){
                return 'you are in duckduckgo search';
        }
        else if(searchEngText == 'y'){
                return 'you are in youtube search';
        }
        else if(searchEngText == 't'){
                return 'you are in twitter search';
        }
        else if(searchEngText == 'gh'){
                return 'you are in github search';
        }
        else if(searchEngText == 'ya'){
                return 'you are in yandex search';
        }
        else if(searchEngText == 'wp'){
                return 'you are in wordpress search';
        }
        else if(searchEngText == 'a'){
                return 'you are in amazon.in search';
        }
        else if(searchEngText == 's'){
                return 'you are in stackoverflow search';
        }
        else if(searchEngText == 'f'){
                return 'you are in facebook search';
        }
        else if(searchEngText == 'l'){
                return 'you are in linkedin search';
        }

        else if(searchEngText == 'fl'){
                return 'you are in flipkart search';
        }
        else if(searchEngText == 'ya'){
                return 'you are in yahoo search';
        }
        else if(searchEngText == 'aol'){
                return 'you are in aol search';
        }
        else if(searchEngText == 'ly'){
                return 'you are in lycos search';
        }
        else
            return 'search destination is not available';
        return '';
}


