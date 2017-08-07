# AWS-CF-ASG-WEBSERVER
This is a cloudformation template to launch a web server under Autoscaling group with scaling a CPU policy

## Steps to execute: (without the PY script)

  - Open Cloudformation Service in AWS console as an IAM elevated user (Power or Admin)
  - Select Create stack Option and select the file from disk (select the file https://github.com/ameenibrahim/AWS-CF-ASG-WEBSERVER/blob/master/Cloudformation/webserver-asg.yml)
  - Choose from the given options (Description given near the feilds)
  - Launch stack and wait for the Site to come up (e.g http://test-3-stackelb-ft01ek9w588v-1053622300.us-east-1.elb.amazonaws.com/)
  
### PRE-REQUISTIES
  - VPC should alreaby be created
  - Private subnets should be available with NAT gateway or NAT instance
  - Public subnets with IGW should be available
  - SSL certificate should be available in AWS Cert manager
  - VPN server / Bastion server with sec-grp should be available for SSH 
  - SSH Keypairs should be available in EC2 Keypairs


## Design

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

### Planned tasks

1. scale a ec2 from baked preconfigured AMI
2. pull env_configs  from s3 (using the env-id tag) - pertaining to stack
3. pull the correct code base - pertaining to the tag

### Note:
> *(deployment time)* > *(autoscaling time)*
> *bake ami steps(configure server + install code)*  **+** *autoscaling steps (bootstrap env variable)* = **deployment steps**