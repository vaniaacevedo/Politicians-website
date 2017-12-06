//this variable contains the value of the data attribute
var congress = $("body").data("congress");
//this variable builds my json url
var jsonURL = "scripts/congress-113-" + congress + ".json"

var members = [];

var filter = {
        parties: {
            D: true,
            R: true,
            I: true
        },
        activeState: ""
    }

$.getJSON(jsonURL, function(data) {
    //variable containing the json data   
    members = data.results[0].members;

    createSelect();
    updateTable();
});

function updateTable() {
    $("#senate-data tbody").html("");
    createTable();
}

//////////////////////////////////////////////////////////////

function createTable() {
    //loop to iterate through the data
    for (var i = 0; i < members.length; i++) {

             var senator = members[i];

        if (filter.parties[senator.party]) { // checking for the party

            if (senator.state == filter.activeState || filter.activeState == "") {

                //Condition to attach the middle name        
                var name = senator.first_name;
                if (senator.middle_name) {
                    name = name + " " + senator.middle_name + " " + senator.last_name;
                } else {
                    name = name + " " + senator.last_name;
                }
                //creating the links to each senator
                var link = $("<a>").attr('href', senator.url).attr("target", "_blank").text(name);
                //Jquery allows to create an element on the fly        
                var row = $("<tr>").addClass(senator.party).addClass(senator.state);
                var tableRows = [];
                //appending content to each <td> (also created on the fly)
                row.append($("<td>").append(link));
                row.append($("<td>").text(senator.party));
                row.append($("<td>").text(senator.state));
                row.append($("<td>").text(senator.seniority));
                row.append($("<td>").text(senator.votes_with_party_pct));
                tableRows.push(row);

                //finally appending the content attached to the row to the tbody
                $("#senate-data tbody").append(tableRows);
            }

        }

    }

}

//////////////////////////////////////////////////////////////////////

//to filter the table

$(".partyselector").on("change", function() {

    var party = $(this).attr("name");

    var checked = $(this).prop("checked");

    filter.parties[party] = checked
       updateTable();
       console.log(filter)

    // if (checked) {
    //     $("." + party).show()
    // } else {

    //     $("tr." + party).toggle(checked)
    // }

});

///////////////////////////////////////////////////////////////////////////////////   

// //to get the each of the States in the select menu

// var select=$("#places");
// $.getJSON("scripts/statesList.json",function(data){
//     var states=data.states;

//     for (var i = 0; i <states.length; i++) {
//       var singleState=states[i];

//       select.append( $("<option>").text(singleState.code ) );

//     }
// });

////////////////////////////////////////////////////////////////////

//to populate the States in the select menu

// function createSelect(members){

//  var select=$("#places");

//  for (var i = 0; i <members.length; i++) {

//     var senator = members[i]; 

//     select.append( $("<option value= ' " +(senator.state)+ " '>").text(senator.state) );
// }  

// };

//////////////////////////////////////////////////////////////

//To populate select menu

function createSelect() {

    var select = $("#places");
    var states = [];
    for (var i = 0; i < members.length; i++) {

        var senator = members[i];

        states.push(senator.state)

    }
    console.log(states)
    states = Array.from(new Set(states)).sort();
    console.log(states);

    var options = []

    for (var i = 0; i < states.length; i++) {

        var option = $("<option value='" + (states[i]) + "'>")

        option.text(states[i]);
        options.push(option);

    }

    select.append(options);

}

////////////////////////////////////////////////////////////////////////////////

//To filter the select menu

$("#places").change(function() {
    var activeSt = $(this).val();
filter.activeState = activeSt;
       updateTable();
       console.log(filter)

});

    // if (activeSt == "") {
    //     $("tbody tr").show()
    // } else {
    //     $("tbody tr").hide()

    //     $("tbody tr." + activeSt).show()
    //     // $("tbody tr").each(function(i, tr) {
    //     //     var shouldShow = $(tr).hasClass(activeSt)
    //     //     $(tr).toggle(shouldShow)
    //     // })
    // }

//////////////////////////////////////////////////////////////////////////////////

//to toggle text  and slide down or up


$("#toggle").click(function() {
    var elem = $("#toggle").text();
    if (elem == "Read More") {
        $("#toggle").text("Read Less");
        $("#text").slideDown();
    } else {
        $("#toggle").text("Read More");
        $("#text").slideUp();
    }
});