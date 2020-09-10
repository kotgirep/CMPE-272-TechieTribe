Role Name : apache
=========

In this role, we can deploy and undeploy apache webservers on hosts. The user can also change the port to their requirements, with the default being port 80 

Requirements
------------

We need Ansible software to be installed in order to use this role on the server.

Role Variables
--------------

port_value is by default set to 80

Tags
--------------

* Tag for deploying server: deploy_server
* Tag for undeploying server: undeploy_server


Example Playbook
----------------

```
    roles:
    - role: apache
    vars:
      port_value: 8080
```      

Author Information
------------------
@TechieTribe 
