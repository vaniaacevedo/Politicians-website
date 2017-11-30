//this variable contains the value of the data attribute
var congress=$("body").data("congress"); 
//this variable builds my json url
var jsonURL="scripts/congress-113-" + congress + ".json"

$.getJSON(jsonURL, function(data){
 //variable containing the json data   
    var members = data.results[0].members;
    createTable(members);
});

function createTable(members){
//loop to iterate through the data
    for (var i = 0; i < members.length; i++) {
        var senator = members[i];        
//Condition to attach the middle name        
        var name=senator.first_name;
        if(senator.middle_name) {
            name = name + " " + senator.middle_name + " " + senator.last_name;
        } else {
            name = name + " " + senator.last_name;
    }
//creating the links to each senator
      var link = $("<a>").attr('href', senator.url).attr("target","_blank").text(name);  
 //Jquery allows to create an element on the fly        
        var row = $("<tr>");
        var tableRows=[];           
//appending content to each <td> (also created on the fly)
        row.append( $("<td>").append(link) );
        row.append( $("<td>").text(senator.party) );
        row.append( $("<td>").text(senator.state) );
        row.append( $("<td>").text(senator.seniority) );
        row.append( $("<td>").text(senator.votes_with_party_pct) );
        tableRows.push(row);

//finally appending the content attached to the row to the tbody
         $("#senate-data").append(tableRows);
    }
}









    
   
    

