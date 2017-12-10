

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
            "total": 0 + "%"
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

function countMembersLoyalty(members) {

    for (var i = 0; i < members.length; i++) {

        var senator = members[i]
        
        if (senator.party == "R") {
           var nRepublicans=statistics["representatives"].republicans++
           ptcRepublicans+=senator.votes_with_party_pct;

        }  else if (senator.party == "D") {
           nDemocrats++
           ptcDemocrats+=senator.votes_with_party_pct
        }  else {
           nIndependents++
           ptcIndependents+=senator.votes_with_party_pct
        }  
    
           totalRepresentatives++
    }    

        var avgR = (ptcRepublicans / nRepublicans);
        var avgD = (ptcDemocrats / nDemocrats);
        var avgI = (ptcIndependents / nIndependents);
  
$("#attendance1 tr.rep td.number").text(nRepublicans);
$("#attendance1 tr.dem td.number").text(nDemocrats);
$("#attendance1 tr.ind td.number").text(nIndependents);
$("#attendance1 tr.tot td.number").text(totalRepresentatives);

$("#attendance1 tr.rep td.vote").text(avgR.toFixed(2));
$("#attendance1 tr.dem td.vote").text(avgD.toFixed(2));
$("#attendance1 tr.ind td.vote").text(avgI.toFixed(2));

}

function missedVotes(){

    members.sort(function(a, b){
        return a.missed_votes_pct-b.missed_votes_pct
    })

    var leastEngaged = members.slice(0,10)
    var mostEngaged = members.slice(-10)

    console.log(leastEngaged)
    console.log(mostEngaged)

}
































// var nDemocrats = 0;
// var nIndependents = 0;
// var totalRepresentatives = 0;

// var missedVotesRepublicans = 0;
// var missedVotesDemocrats = 0;
// var missedVotesIndependents = 0;
// var totalMissedVotes = 0;

// var ptcVotesRepublicans = 0;
// var ptcVotesDemocrats = 0;
// var ptcIndependents = 0;
// var totalNumberPtcVotes = 0;
















