# Home Work 1 - Ansible 

In the DCloud lab, https://dcloud2-sjc.cisco.com/content/demo/90426?returnPathTitleKey=content-view 
Configure Ansible server on ubuntu to deploy a webserver on centos1 and centos2, and bring it up on port 8080 with a web page that is accessible on from the Windows 10 Workstation, wkst1, that displays the message: “Hello World print from CentosX.” (Where X is 1 or 2 depending on the server)



## Steps
* Install Ansible on Ubuntu Server
```
$ sudo apt-get update
$ sudo apt-get install software-properties-common 
$ sudo apt-add-repository ppa:ansible/ansible 
$ sudo apt-get update 
$ sudo apt-get install ansible
```
* Configure the hosts file 
```
$ cat /etc/ansible/hosts
[webservers]
198.18.134.49
198.18.134.50
```
* Create rsa key pair and copy the public key to remote hosts
```
$ ssh-keygen -t rsa
$ ssh-copy-id demouser@198.18.134.49
$ ssh-copy-id demouser@198.18.134.50
```
* Run Ansible's built-in ping module to check the connection
```
$ ansible -m ping all
```
* Commands to run playbook (with tags) to deploy and undeploy webserver 
```
$ ansible-playbook -k -K server_playbook.yml --tags "deploy_server"
$ ansible-playbook -k -K server_playbook.yml --tags "undeploy_server"
```

