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
    countMembers(members);
    missedVotes(members);
    missedVotesTop(members);
    loyalMembers(members);
    loyalMembersTop(members);

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

});

//////////////////////////////////////////////////////////////

//To populate select menu

function createSelect() {

    var select = $("#places");
    var states = [];
    for (var i = 0; i < members.length; i++) {

        var senator = members[i];

        states.push(senator.state)

    }
    states = Array.from(new Set(states)).sort();

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

});

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

//////////////////////////////////////////////////////////////////////////////////

var statistics = {

    "representatives": {
        "republicans": 0,
        "democrats": 0,
        "independents": 0,
        "total": 0
    },

    "ptcOfParties": {
        "ptc_republicans": 0,
        "ptc_democrats": 0,
        "ptc_independents": 0,
        "total": 0
    },

    "numMissedVotes": {
        "missedVotesR": 0,
        "missedVotesD": 0,
        "missedVotesI": 0,
        "total": 0
    },

    "numVotesWithPartyPct": {
        "VotesRepublicans": 0,
        "VotesDemocrats": 0,
        "VotesIndependents": 0,
        "Total": 0
    }

};

///////////////////////////////////////////////////////////////////////////////////
//to create the table at glance

function countMembers(members) {
    var nDemocrats = 0;
    var nRepublicans = 0;
    var nIndependents = 0;
    var totalRepresentatives = 0;

    var avgI = 0;
    var avgR = 0;
    var avgD = 0;

    var missedVotesRepublicans = 0;
    var missedVotesDemocrats = 0;
    var missedVotesIndependents = 0;
    var totalMissedVotes = 0;

    var ptcVotesRepublicans = 0;
    var ptcVotesDemocrats = 0;
    var ptcVotesIndependents = 0;
    var totalNumberPtcVotes = 0;

    for (var i = 0; i < members.length; i++) {

        var senator = members[i]

        if (senator.party == "R") {
            nRepublicans++
            ptcVotesRepublicans += senator.votes_with_party_pct;
            //missedVotesRepublicans+=senator.missed_votes;
            var avgR = (ptcVotesRepublicans / nRepublicans);


        } else if (senator.party == "D") {
            nDemocrats++
            ptcVotesDemocrats += senator.votes_with_party_pct;
            //missedVotesDemocrats+=senator.missed_votes;

            var avgD = (ptcVotesDemocrats / nDemocrats);

        } else {
            nIndependents++
            ptcVotesIndependents += senator.votes_with_party_pct
            //missedVotesIndependents+=senator.missed_votes;
            var avgI = (ptcVotesIndependents / nIndependents);

        }

        totalRepresentatives++
    }

    totalMissedVotes = missedVotesRepublicans + missedVotesDemocrats + missedVotesIndependents;

    $("#attendance1 tr.rep td.number").text(nRepublicans);
    $("#attendance1 tr.dem td.number").text(nDemocrats);
    $("#attendance1 tr.ind td.number").text(nIndependents);
    $("#attendance1 tr.tot td.number").text(totalRepresentatives);

    $("#attendance1 tr.rep td.vote").text(avgR.toFixed(2));
    $("#attendance1 tr.dem td.vote").text(avgD.toFixed(2));
    $("#attendance1 tr.ind td.vote").text(avgI.toFixed(2));

}

function missedVotes() {

    var counter = 0
    var sorted= members.sort(function(a, b) {
        return a.missed_votes_pct - b.missed_votes_pct
    });

    var counter = members.length;
    var tenPercent = counter * 0.1;
    for (var i = 0; i < tenPercent; i++) {
        console.log(i, sorted[i]);
        console.log(sorted[i]);

        var name = [sorted[i].first_name, sorted[i].middle_name, sorted[i].last_name].join(" ").replace("  ", " ");
        var row = $("<tr>")
        var tableRows = [];

        $("<td>").text(name).appendTo(row);
        $("<td>").text(sorted[i].missed_votes).appendTo(row);
        $("<td>").text(sorted[i].missed_votes_pct).appendTo(row);
        tableRows.push(row);
        //finally appending the content attached to the row to the tbody
        $("#bottom tbody").append(tableRows);

    }
    
}

function missedVotesTop() {

    var counter = 0
    var sorted= members.sort(function(a, b) {
        return b.missed_votes_pct - a.missed_votes_pct
    });

    console.log(sorted);

    var counter = members.length;
    var tenPercent = counter * 0.1;
    for (var i = 0; i < tenPercent; i++) {
        console.log(i, sorted[i]);
        console.log(sorted[i]);

        var name = [sorted[i].first_name, sorted[i].middle_name, sorted[i].last_name].join(" ").replace("  ", " ");
        var row = $("<tr>")
        var tableRows = [];

        $("<td>").text(name).appendTo(row);
        $("<td>").text(sorted[i].missed_votes).appendTo(row);
        $("<td>").text(sorted[i].missed_votes_pct).appendTo(row);
        tableRows.push(row);
        //finally appending the content attached to the row to the tbody
        $("#top tbody").append(tableRows);

    }
    
}

function loyalMembers() {

    var counter = 0
    var sorted= members.sort(function(a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct
    });
    var counter = members.length;
    var tenPercent = counter * 0.1;
    for (var i = 0; i < tenPercent; i++) {
        console.log(i, sorted[i]);
        console.log(sorted[i]);
        var numberOfVotes = sorted[i].total_votes * sorted[i].votes_with_party_pct / 100;

        var name = [sorted[i].first_name, sorted[i].middle_name, sorted[i].last_name].join(" ").replace("  ", " ");
        var row = $("<tr>")
        var tableRows = [];

        $("<td>").text(name).appendTo(row);
        $("<td>").text(numberOfVotes.toFixed(2)).appendTo(row);
        $("<td>").text(sorted[i].votes_with_party_pct).appendTo(row);
        
        tableRows.push(row);
        
        $("#loyalB tbody").append(tableRows);

    }
    
}

function loyalMembersTop() {

    var counter = 0
    var sorted= members.sort(function(a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct
    });
    var counter = members.length;
    var tenPercent = counter * 0.1;
    for (var i = 0; i < tenPercent; i++) {
        console.log(i, sorted[i]);
        console.log(sorted[i]);
        var numberOfVotes = sorted[i].total_votes * sorted[i].votes_with_party_pct / 100;

        var name = [sorted[i].first_name, sorted[i].middle_name, sorted[i].last_name].join(" ").replace("  ", " ");
        var row = $("<tr>")
        var tableRows = [];

        $("<td>").text(name).appendTo(row);
        $("<td>").text(numberOfVotes.toFixed(2)).appendTo(row);
        $("<td>").text(sorted[i].votes_with_party_pct).appendTo(row);
        
        tableRows.push(row);
        
        $("#loyalT tbody").append(tableRows);

    }
    
}
