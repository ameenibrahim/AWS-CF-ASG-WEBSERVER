var aws = require('aws-sdk');
aws.config.region = 'ap-southeast-1';
var asg = new aws.AutoScaling();
var elb = new aws.ELB();


exports.handler = function (event, context) {
    console.log("Received Event: ",JSON.stringify(event,null,2));


asg.describeAutoScalingGroups(function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else    {
        for (var i = 0; i < data.AutoScalingGroups.length; i++){
                //console.log(data.AutoScalingGroups[i].Instances);
                for(var j = 0; j < data.AutoScalingGroups[i].LoadBalancerNames.length; j++){

                    var asgName = data.AutoScalingGroups[i].AutoScalingGroupName
                    console.log("AutoScaling Group Name: ",asgName);
                    var MinSize = data.AutoScalingGroups[i].MinSize
                    var DesiredCapacity = data.AutoScalingGroups[i].DesiredCapacity
                    var MaxSize = data.AutoScalingGroups[i].MaxSize 
                    var asgparams = {
                            AutoScalingGroupName: asgName,
                            MinSize: MaxSize,
                            DesiredCapacity: MaxSize,
                            MaxSize: MaxSize
                    }
                    console.log("Updating the ASG instance count to double the current");
                    asg.updateAutoScalingGroup(asgparams, function(err, data) {
                          if (err) console.log(err, err.stack); // an error occurred
                          else     console.log(data); 
                    });
                    setTimeout(function(){
                         var responseBody = JSON.stringify({
                         Status: "SUCCESS",
                         Reason: "Updated Instance Count",
                         PhysicalResourceId: 'updateinstance_custom_resource',
                         StackId: JSON.parse(message).StackId,
                                 RequestId: JSON.parse(message).RequestId,
                                 LogicalResourceId: JSON.parse(message).LogicalResourceId
                         });
         
                         //console.log("Response body:\n", responseBody);
                         var responseurl = JSON.parse(message).ResponseURL;
                         var https = require("https");
                         var url = require("url");
         
                         var parsedUrl = url.parse(responseurl);
                         var options = {
                             hostname: parsedUrl.hostname,
                             port: 443,
                             path: parsedUrl.path,
                             method: "PUT",
                             headers: {
                                 "content-type": "",
                                 "content-length": responseBody.length
                             }
                         };
         
                         var request = https.request(options, function(response) {
                             console.log("Status code: " + response.statusCode);
                         // console.log("Status message: " + response.statusMessage);
                         });
         
                         request.on("error", function(error) {
                             console.log("send(..) failed executing https.request(..): " + error);
                         });
                         request.write(responseBody);
                         request.end();
                    },120000);
                }
            }
        }
    });

asg.describeAutoScalingGroups(function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else    {
            for (var i = 0; i < data.AutoScalingGroups.length; i++){
                    //console.log(data.AutoScalingGroups[i].Instances);
                    for(var j = 0; j < data.AutoScalingGroups[i].LoadBalancerNames.length; j++){
    
                        var asgName = data.AutoScalingGroups[i].AutoScalingGroupName
                        console.log("AutoScaling Group Name: ",asgName);
                        var MinSize = data.AutoScalingGroups[i].MinSize
                        var DesiredCapacity = data.AutoScalingGroups[i].DesiredCapacity
                        var MaxSize = data.AutoScalingGroups[i].MaxSize
                        var asgparams = {
                                AutoScalingGroupName: asgName,
                                MinSize: MinSize,
                                DesiredCapacity: MinSize,
                                MaxSize: MaxSize
                        }
                        console.log("Updating the ASG instance count to double the current");
                        asg.updateAutoScalingGroup(asgparams, function(err, data) {
                            if (err) console.log(err, err.stack); // an error occurred
                            else     console.log(data); 
                        });
                        setTimeout(function(){
                            var responseBody = JSON.stringify({
                            Status: "SUCCESS",
                            Reason: "Updated Instance Count",
                            PhysicalResourceId: 'updateinstance_custom_resource',
                            StackId: JSON.parse(message).StackId,
                                    RequestId: JSON.parse(message).RequestId,
                                    LogicalResourceId: JSON.parse(message).LogicalResourceId
                            });
            
                            //console.log("Response body:\n", responseBody);
                            var responseurl = JSON.parse(message).ResponseURL;
                            var https = require("https");
                            var url = require("url");
            
                            var parsedUrl = url.parse(responseurl);
                            var options = {
                                hostname: parsedUrl.hostname,
                                port: 443,
                                path: parsedUrl.path,
                                method: "PUT",
                                headers: {
                                    "content-type": "",
                                    "content-length": responseBody.length
                                }
                            };
            
                            var request = https.request(options, function(response) {
                                console.log("Status code: " + response.statusCode);
                            // console.log("Status message: " + response.statusMessage);
                            });
            
                            request.on("error", function(error) {
                                console.log("send(..) failed executing https.request(..): " + error);
                            });
                            request.write(responseBody);
                            request.end();
                        },120000);
                    }
                }
            }
        });
}