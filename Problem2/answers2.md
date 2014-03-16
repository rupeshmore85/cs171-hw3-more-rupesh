1. Look at the data given in the Wiki table. Describe the data types. What is different from the datasets you've used before?

Solution:

I. Datatype used is Numeric, String.
II. Integers were in string data format with commas to represent the position. 
Used a Convert to Int function for removing the comma in the string and converting the string into integer(ParseInt).
III. At work i have used SUBSTR, INSTR, TRIM functions in Oracle SQL to remove the commas etc.

------------------------------------------------------------------------------------------------------------------

2. Take a look at the DOM tree for the Wikipedia table. 
Formulate in jQuery selector syntax the selection that would give you the DOM element for the second row in the Wikipedia table. 
Write down in selection syntax how you would get all table rows that are not the header row.

Solution:

I. Formulate in jQuery selector syntax the selection that would give you the DOM element for the second row in the Wikipedia table.

  $.ajax({
        url: "http://en.wikipedia.org/wiki/World_population_estimates",
        type: 'GET',
        cache: false,
        success: function(data) {
            var root;
            root = $("<div></div>")
            root.html(data.responseText)
			var tabledata= root.find(".wikitable");
    		var rows = tabledata.find("tbody tr");
   			var secondRow= rows[2];
   			}
   		});

Finding the tbody and tr from the wikitable will give the header and the tr's (rows), rows[0] will be the header, rows[1] will be the first row and rows[2] will give the expected 2nd row.
   		
II. Write down in selection syntax how you would get all table rows that are not the header row.

  $.ajax({
        url: "http://en.wikipedia.org/wiki/World_population_estimates",
        type: 'GET',
        cache: false,
        success: function(data) {
            var root;
            root = $("<div></div>")
            root.html(data.responseText)
			var tabledata= root.find(".wikitable");
    		var rows = tabledata.find("tbody tr td");
   			}
   		});
   		
This will give you all the rows td elements hence eliminating the header of the wikitable.