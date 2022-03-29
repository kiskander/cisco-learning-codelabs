---
title: Configuring IOS-XE with Ansible
updated: 2022-03-16
categories: [tfx, gcp]
tags: [VertexAI, ML Pipeline, TFX, MLOps]
duration: 25:00
authors: Jason Belk
---

{{< step label="DevBox" duration="5:00" >}}

Reserve the [IOS XE on CSR Recommended Code](https://devnetsandbox.cisco.com/RM/Diagram/Index/05097c44-b162-4ea5-a1df-a449b4bd81c8) DevNet sandbox, which will give you a CSR1000v IOS-XE virtual network device and a Linux jump host to execute your code on.

Log into the VPN and log into the DevBox.

```bash
~$ ssh developer@10.10.20.20
Warning: Permanently added '10.10.20.20' (ED25519) to the list of known hosts.
Last login: Mon Mar 14 10:25:25 2022 from 192.168.254.11
[developer@devbox ~]$
```

It is highly recommended to use something like [VS Code Remote Development using SSH](https://code.visualstudio.com/docs/remote/ssh) to edit your text files on the jump host. Otherwise, you will have to use `vi` to edit files. 

{{< /step >}}

{{< step label="Creating Your Device Inventory" duration="5:00" >}}

Ansible has two main files it needs to run:

1. The Inventory
2. The Playbook

The inventory file lists the device names, IP addresses, device types, device groups and (for learning purposes) credentials.

For organizational purposes, we will create a directory to store everything we need in there. Create a directory and a file called `inventory` in it.

```bash
mkdir ansible
touch ansible/inventory
cd ansible
```

Put the following contents in the `inventory` file:


```ini
csr1 ansible_host=10.10.20.48 ansible_network_os=ios ansible_user=developer ansible_ssh_pass=C1sco12345 ansible_connection=network_cli
```

Note that there are no spaces between the variable names like `ansible_host` and the variable values. Also, Ansible has built-in variable names, so the variable names have to be spelled correctly. 

This inventory file has one network device called `csr` with an IP address of 10.10.20.48, defined as an IOS device and all the devices Ansible col

{{< /step >}}

{{< step label="Building the Playbook" duration="10:00" >}}

Now create the playbook file `pb-conf-snmp.yaml` in the `ansible` directory (pb is short for playbook), and put the following contents in it:

```yaml
---
  - name: PLAY 1 - DEPLOYING SNMP CONFIGURATIONS ON IOS
    hosts: "csr1"
    connection: network_cli
    gather_facts: no
    tasks:
      - name: "TASK 1 in PLAY 1 - CONFIGURE SNMP LINES"
        ios_config:
          lines:
            - snmp-server community code-demo RO
            - snmp-server location RENO
            - snmp-server contact JASON_BELK
      - name: "TASK 2 in PLAY 1 - VERIFY SNMP LINES PRESENT"
        ios_command:
          commands:
            - "show run | include snmp-server"
```

Ansible playbooks use the YAML data encoding format that is indentation based. The first level of indentation (name/hosts/connection/gather_facts/tasks) are the "play" level inputs, defining the connection type and devices that will be touched. Since Ansible is loading in the inventory file, it matches the device name `csr` to the inventory file and the device type from there as well. The spelling needs to match between the inventory and the playbook. 

The next level of indentation are a list of "tasks" that are executed upon the hosts in sequential order. Each task has a name and a function it is executing using "modules" from the [Ansible list of modules](https://docs.ansible.com/ansible/2.9/modules/list_of_all_modules.html).

In this case, our playbook is connecting to `csr` and executing two tasks. The first task uses the `ios_config` module to push a list of IOS SNMP config to the devices. If the config is already present, Ansible will not push it, as it checks the running config for us in the background.

The second task uses the `ios_command` module and has a list of one command to check the running-configuration to see if it has the lines of configuration present.



{{< /step >}}

{{< step label="Running the Playbook" duration="5:00" >}}

Before we run the playbook, because of the way the sandbox is set up, we need to ignore the SSH keys of the network device, or Ansible will throw an error. To do that issue the following command in the DevBox terminal:

```bash
export ANSIBLE_HOST_KEY_CHECKING=False
```

Now to run the playbook, issue the following command:

```bash
ansible-playbook -i inventory pb-conf-snmp.yaml -v
```

The command `ansible-playbook` runs the playbook, loading in the inventory file with the `-i inventory` flag and giving the name of the playbook with `pb-conf-snmp.yaml`. The `-v` command is added to give an additional level of output, as by default Ansible will not display the `ios_command` show commands to the terminal output without it.

Your output should look like this:

```bash
[developer@devbox ansible]$ ansible-playbook -i inventory pb-conf-snmp.yaml -v
No config file found; using defaults
/home/developer/ansible/inventory did not meet host_list requirements, check plugin documentation if this is unexpected
/home/developer/ansible/inventory did not meet script requirements, check plugin documentation if this is unexpected

PLAY [PLAY 1 - DEPLOYING SNMP CONFIGURATIONS ON IOS] ******************************************

TASK [TASK 1 in PLAY 1 - CONFIGURE SNMP LINES] ************************************************
changed: [csr1] => {"banners": {}, "changed": true, "commands": ["snmp-server community code-demo RO", "snmp-server location RENO"], "updates": ["snmp-server community code-demo RO", "snmp-server location RENO"]}

TASK [TASK 2 in PLAY 1 - VERIFY SNMP LINES PRESENT] *******************************************
ok: [csr1] => {"changed": false, "stdout": ["snmp-server community belk-demo RO\nsnmp-server community belk-demo1 RO\nsnmp-server community code-demo RO\nsnmp-server location RENO\nsnmp-server contact JASON_BELK"], "stdout_lines": [["snmp-server community belk-demo RO", "snmp-server community belk-demo1 RO", "snmp-server community code-demo RO", "snmp-server location RENO", "snmp-server contact JASON_BELK"]]}

PLAY RECAP ************************************************************************************
csr1                       : ok=2    changed=1    unreachable=0    failed=0

[developer@devbox ansible]$
```

You can see from the second task output that the lines are now present. Ansible stored the "show" command output in the form of a Python list, so if the data needed to be parsed and evaluated, it could be. 

Congrats! You used Ansible to configure an IOS-XE device!

{{< /step >}}
