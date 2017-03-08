//counter codes
var button=document.getElementById('counter');
var counter=0;

button.onclick=function() {
    // make a request to the cunter endpoint
        var request=new XMLHttpRequest();
    //capture the responce and store it in a variable
        request.onreadystatechange=function() {
            if(request.readyState===XMLHttpRequest.DONE) {
                //Take some action
                if(request.status===200) {
                    var counter=request.responceText;
                    var span=document.getElementById('count');
                    span.innerHTML=counter.toString();
                }
            }
            //Not done yet
        };
    // Make the request
        request.open('GET','http://arunkiliyangad.imad.hasura-app.io/counter',true);
        request.send(null);
    
};