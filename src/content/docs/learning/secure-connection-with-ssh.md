---
title: Secure connection with SSH
description: Making sure you connect to the right host
sidebar:
    order: 10
---

During your first attempt to ssh into a server you just set-up, you will certainly be greeted by the following prompt:

```
$ ssh example.com
The authenticity of host 'example.com (1.2.3.4)' can't be established.
ED25519 key fingerprint is SHA256:ZanqD8SVaT2MBvUqmeBLZF/QNvL6W5pd2uiQnCsp57M.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

This means that your laptop/workstation tries to connect to the remote ssh server, which presents it with a public key it has never met before. SSH Key fingerprints could be described as the terms & conditions of remote login: nobody has the time for that, and everyone accepts them blindly.

This is actually not as unreasonsable as not reading the terms: the name of this behaviour is called [TOFU, for "Trust On First Use"](https://en.wikipedia.org/wiki/Trust_on_first_use). It is something secure messengers like Signal or WhatsApp do by default.

Let's try to understand what those keys are, what happens when we attempt to log in with SSH, how to check the fingerprint is valid, what we really risk, and how we can harden our SSH server.

## Asymmetric cryptography basics

Asymmetric cryptography relies on key pairs: a public and a private key that work together. The public key can be shared, and the private key must never leave your host and must be stored in a secure way.

A key can also be seen as a function.

- Take some text, use the public key to encrypt it, and only the private key will ever be able to decrypt the result. The public key can't be used to reverse the encryption it has performed.
- Take some text, use your private key to encrypt it, and only your public key will ever be able to decrypt the result: this proves you are the author of the encrypted text. Since in practice everyone can decrypt the text you didn't really encrypt it: you signed it.

Another way to see it is that your public key is what allows you to identify, i.e. say who you are. Your private key is what allows you to authenticate, i.e. prove who you are, without ever disclosing the private key itself.

Asymmetric encryption can be quite expensive (i.e. slow) and has limitations on the size of messages it can encrypt. This is why it is often used only as a first step between peers, to safely share a much less resource intensive symmetric key they will use during the rest of the exchange.

You don't need to know much more about asymmetric cryptography theory to understand the stakes at play during a SSH fingerprint check. All of the above will also help you understading how to go beyond passwords for authentication!

## What happens when you log in with SSH

When your ssh client tries to connect to your ssh server (i.e. when you type `ssh example.com` in your terminal), the server will present a public key to your client. Your client is going to lookup in its `~/.ssh/known_hosts` file to see if there is a match. If it's the first time it's seeing this host, you're going to get the same prompt as in this page's introduction.

If your client trusts the server identified by the public key, they will negotiate temporary session keys to protect the rest of the communication. If you're interested in learning more about SSH and the client-server dance, you read [this Hostinger post](https://www.hostinger.com/tutorials/ssh-tutorial-how-does-ssh-work).

## How to check if the fingerprint is valid

You can use the `ssh-keyscan` utility on your laptop/workstation to retrieve the fingerprints of the keys of the remote host.

```
$ ssh-keyscan example.com | ssh-keygen -l -f -
```

Then, to make sure the correct keys/fingerprints have been sent to you, you need to connect to the remove host using a trusted channel. Since you don't trust its public key yet, this trusted channel can't be ssh.

Connecting to your host using a KVM provided by your service provider can be considered a trusted channel. Using this KVM, log in to your host and use `ssh-keygen` again to display the fingerprint of the key. In the following example, the `ed25519` key is used, but make sure you use the key your ssh client will rely on.

```
# for key in /etc/ssh/ssh_host_*.pub; do ssh-keygen -lf $key; done
```

If the fingerprint match, you're good to go.

## What's the threat anyway?

One important question we haven't answered so far is: what are we really protecting from?

Your main risk is to connect to a server impersonating your server: a man in the middle attack. If that server managed to spoof yours and you trusted it, you'd end up copying your commands, files, on a remote host that is not yours, giving away your passwords and secrets for free… which is clearly bad.

It's worth noting that spoofing a server is not a trivial attack. As a self-hoster who just set up their server and who attempt to SSH into it, it's very unlikely that someone will manage to spoof your server right away.

:::tip
Unless you are the target of an intelligence agency, the risk of someone spoofing your server is very low, and it's usually acceptable to Trust On First Use.
:::

## Ditch passwords for convenience and security

As you have probably noticed, once you accepted the public key of the server it prompts you for a password. Passwords are a notoriously bad authentication method: they are often easy to guess by attackers and they are often difficult to remember for people using them.

Fortunately, SSH supports key-based authentication. As we have seen in [Asymmetric Cryptography Basics](#asymmetric-cryptography-basics), asymmetric keys can be used to prove who you are, which is exactly what a password is about. When you try to authenticate with a key, the remote host will generate a secret, encrypt it with your public key, and hand the result over to you. Only your private key can decrypt it: returning the decrypted secret proves that you own the private key.

Thanks to the `ssh-copy-id` utility, you can use password-based authentication to copy your laptop/workstation's public key on the remote host. The following command will prompt you for your password, and drop your public key on the remote host using that connection:

```
$ ssh-copy-id yourRemoteUser@example.com
```

You can then try to authenticate against the remote host using your regular `ssh yourRemoteUser@example.com` and will not be prompted for a password. Convenient!

## Harden your ssh

Key-based authentication is great, but it remains possible for attackers to try to force their way to your server by trying guessing your passwords. In theory, with enough tries they could eventually succeed. It is possible to disable password-based authentication entirely, so all the password-based authentication attempts will fail.

:::caution
Disabling password-based authentication on your ssh server means you can't log in with your password to copy your public key!

Make sure to only disable password-based authentication **after** doing the `ssh-copy-id` dance!
:::

To do so, we need to set the following key/value in `/etc/ssh/sshd_config`:

```
PasswordAuthentication no
```

For the ssh server to take it into account, we need to restart it. When logged in into the server, run the following command:

```
$ sudo systemctl restart sshd
```

A general good practice is to disable root login as well since it's a fixed username for which an attacker "only" needs to find the password.

:::caution
Before disabling root login, make sure you have a non-root user on your remote server and that you can ssh into the server with that user.
:::

To disable root login, we need to set the following key/value in `/etc/ssh/sshd_config`

```
PermitRootLogin no
```

:::note
Please note that both the `PasswordAuthentication` and `PermitRootLogin` keys might already exist in your `/etc/ssh/sshd_config` file.

Make sure to update the value if they already exist, instead of setting the value twice.
:::

### Additional resources

If you want to tweak your sshd further, [Mozilla's OpenSSH guidelines](https://infosec.mozilla.org/guidelines/openssh) are concise and useful.
