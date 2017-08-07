# AWS-CF-ASG-WEBSERVER
This is a cloudformation template to launch a web server under Autoscaling group with scaling a CPU policy

Below is the High level flow of the beta working model. (Design V1)
![V2 Design](https://raw.githubusercontent.com/ameenibrahim/AWS-CF-ASG-WEBSERVER/master/Designs/V1-Py-CF-Ansible.jpg)

1. Python takes Input data and uses wrapper script is used to invoke Cloudformation template
2. Cloudformation template creates the following resources
    a. Auto scaling group
    b. Elastic Load balancer
    c. Ansible Master (to configure server)
3. ASG will launch the first instance and will call back the Ansible master service (running in bottle /py as runit script)
4. Ansible will configure the EC2 machine with the dependencies (IP address as input)
5. ASG will pause for the HealthCheck Cooldown period
6. Post In-service DNS is created and pointed to ELB

