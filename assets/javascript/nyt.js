var searchWord = "";
var numberRecords = 0;
var startYear = 0;
var endYear = 0;
var queryURL = "";
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=35fc9770385e4cb2863655172794d8b8";
//console.log(url);

// List of our form input vars that relate to NYT API data fields 
// searchTerm = q (refers to NYT API result)
// numberRecords = refers to the number of Articles user want to display (array index max) 
// startYear = begin_date (YYYYMMDD format) avoid error add MMDD 0101 to url
// endYear = end_date (YYYYMMDD format) avoid error add MMDD 0101 to url
// Display on bottom form
       //  console.log(result.response.docs[0].headline.main);
       //  console.log(result.response.docs[0].pub_date);
       //  console.log(result.response.docs[0].lead_paragraph);
       //  console.log(result.response.docs[0].web_url);
       //  console.log(result.response.docs[0].byline.original);

$('#searchButton').on('click', function(){
      searchWord = $("#searchTerm").val().trim();
      console.log(searchWord);
      numberRecords = $("#numberRecords option:selected").val();
      // numberRecords = $('#numberRecords').val();
      console.log(numberRecords);

      startYear = $("#startYear").val().trim();
      console.log(startYear);

      endYear = $("#endYear").val().trim();
      console.log(endYear);

      queryURL= url + "&sort=newest&q=" + searchWord + "&begin_date=" + startYear + "0101" + "&end_date=" + endYear + "0101";
      console.log(queryURL);
      runQuery (queryURL, numberRecords);
      return false;
});


function runQuery(queryAPI, recs){
  console.log(queryAPI);
  console.log(recs);
  // query request
  $.ajax({
    url: queryAPI,
    method: 'GET'})
    .done(function(result) {
      console.log(result);
      var arrayDocs = result.response.docs.length;
      // Check if the array from the docs is bigger than records requested
      // if it is then set arrayDocs to records(articles) requested
      if (arrayDocs > recs) {
        arrayDocs = recs;
      };

      for (var i = 0; i < arrayDocs; i++) {
        console.log("i=" + i);
        console.log("resultdoc docs index length=" + result.response.docs.length);
        console.log(result.response.docs[i].headline.main);
        $('#headline').append("<h1>"+result.response.docs[i].headline.main+"</h1>");
        
        console.log(result.response.docs[i].pub_date);
        var publicationDate = moment(result.response.docs[i].pub_date).format('MMMM Do YYYY, h:mm:ss a');
        console.log(publicationDate);
        $('#headline').append("<p>Publication Date: "+publicationDate+"</p>");
        
        console.log(result.response.docs[i].lead_paragraph);
        $('#headline').append("<p>Article Snippet: "+result.response.docs[i].lead_paragraph+"</p>");
        
        console.log(result.response.docs[i].web_url);
        $('#headline').append("<p>See Article: "+result.response.docs[i].web_url+"</p>");      
        // $('#headline').append("<p>See Article: "+result.response.docs[i].web_url+"</p>");
        
        console.log(result.response.docs[i].byline.original);
        $('#headline').append("<p>Author: "+result.response.docs[i].byline.original+"</p>");
      };
    });
};