---

title: "Configuring Cisco IOS with Netmiko"
date: 2022-03-29T13:44:24-07:00
categories: [code]
tags: [code]
status: Published
authors: Jason Belk
duration: 15
---

{{< step label="Overview" duration="1:00" >}}

[Netmiko](https://github.com/ktbyers/netmiko/tree/master) is a very popular open-source Python library written by a network engineer for network engineers to "simplify CLI connections to network devices."

It supports a variety of [platforms](https://github.com/ktbyers/netmiko/blob/master/PLATFORMS.md) and is a great tool for network engineers to learn how Python can be used to interact with their infrastructure.

### What you’ll Learn

- How to connect to an IOS-XE device with Netmiko
- How to send show commands to the IOS-XE Device
- How to send configuration commands to the IOS-XE Device
- Call to Action

### What you'll need

- Access to a [Sandbox with Netmiko installed and an IOS-XE Device](https://devnetsandbox.cisco.com/RM/Diagram/Index/43964e62-a13c-4929-bde7-a2f68ad6b27c?diagramType=Topology)
- Text editor (such as VS Code) to remotely edit files on the jump host or your local Netmiko installation.
- A basic understanding of Python

{{</step >}}

{{< step label="Connecting to a Device with Netmiko" duration="4:00" >}}

In order to connect to the device, Netmiko needs to know some basic data about the device we are connecting to (so it can use the right device drivers behind the scenes), such as:

- IP Address: `10.10.20.175`
- Username: `cisco`
- Password: `cisco`
- [Platform]((<https://github.com/ktbyers/netmiko/blob/master/netmiko/ssh_dispatcher.py#L121>): `cisco_ios_telnet` (spelled this way so Netmiko recognizes it, we are using telnet in the sandbox, if we had SSH going to the device instead it would simply be `cisco_ios`)

Netmiko uses Python objects and classes to abstract the complexity of the code. All we need to do is create an object using the `ConnectHandler` class, with the right required inputs, and it will create a Python device object for us. We can then use that device object with the associated object methods to execute our desired tasks, such as connecting to the device or sending commands.

### Creating the Code

Create a Python file called `learn_netmiko.py` and put the following lines in it. Feel free to execute it at the end of each step, adding the code to the file as you go. At the top of the file you will need the following import statement to load in the netmiko connection code `from netmiko import ConnectHandler`.

First, we define a few variables to plug into the inputs for when the device object is created. Then we create and name the device object.

```python
from netmiko import ConnectHandler
host = '10.10.20.175'
username = 'cisco'
password = 'cisco'
platform = 'cisco_ios_telnet'
device_object = ConnectHandler(device_type=platform, ip=host, username=username, password=password)
```

Next, we use one of the methods from the `device_object` to test our connection to the device, making sure our credentials and IP address are correct.

```python
print(device_object.is_alive())
```

### Output

Your output should look like this:

```bash
(py3venv) [developer@devbox ~]$ python learn_netmiko.py
True
(py3venv) [developer@devbox ~]$
```

The output is saying that the device is alive because it was able to successfully connect to it.

{{</step >}}

{{<step label="How to Send Show Commands" duration="5:00" >}}

### Show Version

Now that we have a device object, we can start sending show commands to it and work with the output. Netmiko uses the `send_command` method to send commands, and behind the scenes already has a `term len 0` so the output is all in one text string. It will return the output in a string, that we can capture with a `sh_ver_output` variable, and then print to view.

```python
sh_ver_output = device_object.send_command('show version')
print(sh_ver_output)
```

Your output (truncated for space) should look like this:

```
(py3venv) [developer@devbox ~]$ python learn_netmiko.py
True
Cisco IOS XE Software, Version 17.03.02
Cisco IOS Software [Amsterdam], Virtual XE Software (X86_64_LINUX_IOSD-UNIVERSALK9-M), Version 17.3.2, RELEASE SOFTWARE (fc3)
....
(py3venv) [developer@devbox ~]$
```

Now that we have the output, we can do a simple check to see what version is present, as we know what format the output will be, by adding the following lines (and removing the `print(sh_ver_output)` statement so we don't have the full version output every time we test the script):

```python
if "Version 17.03.02" in sh_ver_output:
    print("Device is compliant")
else:
    print("Device is not compliant")
```

### Summary

Your script should look like this now:

```python
from netmiko import ConnectHandler
host = '10.10.20.175'
username = 'cisco'
password = 'cisco'
platform = 'cisco_ios_telnet'
device_object = ConnectHandler(device_type=platform, ip=host, username=username, password=password)
print(device_object.is_alive())
sh_ver_output = device_object.send_command('show version')
# print(sh_ver_output)
if "Version 17.03.02" in sh_ver_output:
    print("Device is compliant")
else:
    print("Device is not compliant")
```

Your output should look like this:

```bash
(py3venv) [developer@devbox ~]$ python learn_netmiko.py
True
Device is compliant
(py3venv) [developer@devbox ~]$
```

{{</step >}}

{{<step label="How to Send Configuration Commands" duration="5:00" >}}

Netmiko allows you to send configuration commands both from Python string variables (as we used for "show version"), and with a file input. This can be very useful because you may already have a cut sheet ready, and a script to send the commands to a list of devices. Even though you can use the `send_command` to send configuration commands, it is a bit easier to just put the commands in file for this simple demo.

To add a new loopback, add the following commands to a file in the same directory as your script, calling the file `loopback_commands.txt`:

```
interface Loopback1337
 description Added by Netmiko
 ip address 172.16.254.128 255.255.255.252
```

We use the `config_file` parameter in the `send_config_from_file` method on the same `device_object` to tell Netmiko which commands to send to the device:

```python
device_object.send_config_from_file(config_file='/home/developer/loopback_commands.txt')
```

In order to verify the commands are present, we can add a verification show command:

```python
sh_int_output = device_object.send_command('show run | section interface')
print(sh_int_output)
```

### Summary

Your code should look like this now:

```python
from netmiko import ConnectHandler
host = '10.10.20.175'
username = 'cisco'
password = 'cisco'
platform = 'cisco_ios_telnet'
device_object = ConnectHandler(device_type=platform, ip=host, username=username, password=password)
print(device_object.is_alive())
sh_ver_output = device_object.send_command('show version')
# print(sh_ver_output)
if "Version 17.03.02" in sh_ver_output:
    print("Device is compliant")
else:
    print("Device is not compliant")
device_object.send_config_from_file(config_file='/home/developer/loopback_commands.txt')
sh_int_output = device_object.send_command('show run | section interface')
print(sh_int_output)
```

Your output should look like this, with the new Loopback present (output truncated for relevance):

```
(py3venv) [developer@devbox ~]$ python learn_netmiko.py
True
Device is compliant
interface Loopback0
 description to
 no ip address
 shutdown
interface Loopback1337
 description Added by Netmiko
 no ip address
interface GigabitEthernet1
 description to port6.sandbox-backend
 vrf forwarding Mgmt-intf
 ip address 10.10.20.175 255.255.255.0
...
(py3venv) [developer@devbox ~]$
```

{{</step >}}

{{<step label="Congratulations" duration="1:00" >}}

Congrats! Netmiko is a powerful library with a lot of relevance to network engineers. Check out some of these other resources to learn more about automation and networking.

## Learn More

- [Cisco Learning Network DevNet Certification Community](https://learningnetwork.cisco.com/s/topic/0TO3i0000008jY5GAI/devnet-certifications-community)
- [DevNet Certification Training Videos](https://learningnetwork.cisco.com/s/devnet-training-videos)
- [Train Your Team with Automation Bootcamps](https://developer.cisco.com/automation-bootcamp/)

{{</step >}}
