---
title: Configure and deploy the main services
description: Running the playbook against your primary VPS
sidebar:
    order: 30
---

The repository contains two playbooks:

- `services.yml` which will prepare the services server and deploy the services on it
- `monitoring` which will prepare the monitoring server, and deploy the monitoring stack on it

In this section we're going to configure the playbook for services server.

## Update the inventory

The first thing to do is to update the inventory to tell it where our production servers live. For now, we can add exclusively the services server. Let's assume your services server has a fixed public ip, that you own the `example.com` domain, and have added an `A` DNS record for `services.example.com` to point there.

Open the `inventory/production.ini` file, creating it if necessary, and add the following content:

```ini
[services]
services.example.com
```

Ansible will know that it needs to run the `services.yml` playbook on `services.example.com`, thanks to the line `hosts: services` at the beginning of the playbook.

## SSH into your server

To make deployment much easier and secure, copy your laptop/workstation's public key on your remote host using this command on your local machine:

```
$ ssh-copy-id yourRemoteUser@example.com
```

You will be prompted for your remote user password. Once the key is copied, you should be able to log in seamlessly! Note that if your private key is encrypted, you will be prompted for the password to decrypt it.

## Host variables

The ansible playbook relies on host variables to configure the various services. This goes from specifying your domain name to more sensitive information such as database passwords. The latter can be encrypted at rest to be decrypted when playing the playbook.

To start creating host vars for your services server, create the `inventory/host_vars/services.example.com` directory and open a `vars.yml` inside it.

:::tip
The variables only need to be populated the first time you deploy your services, or when you want to change their content.

When recovering from a disaster, you should be able to use the variables stored in your private repository.
:::

### General purpose variables

Add the following variables to your `vars.yml`:

```yaml
use_le_production_ca: false
le_mail: yourmail@example.com
base_domain: example.com
```

`use_le_production_ca` should be set to false for starters. It will intruct your traefik to retrieve certificates from Let's Encrypt's staging Certificate Authority. This will give you certificates that are not trusted by most web browsers, but will allow you to test your setup safely.

The production Certificate Authority of Let's Encrypt is rate limited. Traefik will retry automatically to get new certificates in case of failure, which can get you a temporary ban.

`le_mail` is the mail Let's Encrypt will use to send you warnings when your certificates are about to expire. By default, traefik should renew certificates ahead of time so you never receive those warnings. If you receive one for a domain you're actively using, pay extra attention. 

Make sure this email address is valid and that the corresponding mailbox is monitored. Given the importance of this email address, Let's Encrypt will refuse to issue certificates if the domain is `example.com`.

:::tip
If you're not sure what Let's Encrypt, Certificates, or Certificate Authory are, head out to [/learning/certificates](/learning/certificates)
:::

Finally `base_domain` is the base domain your services will use. This playbook assumes all your services will run on subdomains created from this domain (e.g. `matrix.example.com`, `cloud.example.com`, `hdoc.example.com`).

### Encrypting variables with ansible-vault

Storing secrets like database passwords in plaintext is not great. Fortunately, we can use ansible's `ansible-vault` utility to encrypt variables. They will then be stored encrypted in our host vars, and will be decrypted by ansible when it needs it, using our vault password.

The ansible documentation can be overwhelming, so let's keep things simple here: we are going to use a single password to encrypt everything, since we're a team of one admin managing all those services. For the sake of simplicity and sturdiness we will not make ansible look up in a password manager, but we will make it prompt us for our password when reading a playbook.

To encrypt a variable, enter `ansble-vault encrypt_string <yourstring>`. It will prompt you for a password to encrypt/decrypt the string, and will output the encrypted content.

For example with the string "test" and the password "mypassword"

```
$ ansible-vault encrypt_string "test"
New Vault password: 
Confirm New Vault password: 
Encryption successful
!vault |
          $ANSIBLE_VAULT;1.1;AES256
          33366333626335623936623137386430366630666262663963396631633338346437323163343730
          6330613330633138626137353938383565613130653036660a346666306137616461396239363935
          66316133363637343665663138393937366632636263393566323464333433386435376439396464
          3032376165323938660a363033353737653939366263663533633638313765633963656462313365
          3537
```

### Matrix variables

On either your laptop/workstation or remote server, assuming `podman` is installed, you need to generate Synapse's configuration files. A reminder that this only needs to be done once.

The following command will make Synapse generate a configuration file and signing key in the current directory. Both `SYNAPSE_SERVER_NAME` and `SYNAPSE_REPORT_STATS` don't really matter since they will be updated later.

```
$ podman run -it --rm \
  --mount type=bind,src=$(pwd),dst=/data \
  -e SYNAPSE_SERVER_NAME=example.org \
  -e SYNAPSE_REPORT_STATS=yes \
  matrixdotorg/synapse:v1.94.0 \
  generate
```

This will generate three files:

- `homeserver.yaml` which contains most of the variables we need to set as host variables
- `example.com.signing.key` which contains the signing key we will set as a host variable
- `example.com.log.config` which we can discard right away

In `homeserver.yaml` lookup for the following variables, [encrypt them using `ansible-vault`](#encrypting-variables-with-ansible-vault), and copy the key-value pair in your host vars file:

- `registration_shared_secret`
- `macaroon_secret_key`
- `form_secret`

Copy the full content of the `example.com.signing.key` file, [encrypt it using `ansible-vault`](#encrypting-variables-with-ansible-vault), and add it to your host vars file under the `synapse_signing_key` key.

You can then run `openssl rand -base64 27` several times to generate secrets for the following variables:

- `synapse_pg_password`
- `ssync_secret`
- `ssync_pg_password`

Don't forget to [encrypt them using `ansible-vault`](#encrypting-variables-with-ansible-vault), and your `inventory/host_vars/example.com/vars.yml` should look like follows:

```
matrix_server_name: example.com
synapse_pg_username: synapse
synapse_pg_password: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  <encrypted>
synapse_registration_shared_secret: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  <encrypted secret>
synapse_macaroon_secret_key: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  <encrypted secret>
synapse_form_secret: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  <encrypted secret>
synapse_signing_key: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  <encrypted secret>
ssync_domain: sliding.matrix.{{base_domain}}
ssync_secret: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  <encrypted secret>
ssync_pg_password: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  <encrypted secret>
```

### Nextcloud variables

Nextcloud doesn't need much pre-configuration to get started. You only need to configure the domain on which it is going to run, and two secrets related to the Nextcloud database: the root password, and the nextcloud user password.

As previously, you can use `openssl rand -base64 27` several times to generate secrets for the following variables:

- `nextcloud_db_root_password`
- `nextcloud_db_password`

Don't forget to [encrypt them using `ansible-vault`](#encrypting-variables-with-ansible-vault), and the nextcloud section of your `inventory/host_vars/example.com/vars.yml` should look like follows:

```
nextcloud_domain: cloud.example.com
nextcloud_db_root_password: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  <encrypted secret>
nextcloud_db_password: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  <encrypted secret>
```



### Hedgedoc variables

Similarly for hedgedoc, you only need to define the domain, the database password, and the session secret.

You can use `openssl rand -base64 64` several times to generate secrets for the following variables:

- `hedgedoc_db_password`
- `hedgedoc_session_secret`

The session secret which is a fixed secret hedgedoc relies on to sign the session cookies. [As per the doc](https://docs.hedgedoc.org/configuration/), not setting it means it will be generated randomly at restart, which would log off all users. **Make sure the secret is 64 characters long!**

Don't forget to [encrypt the passwords with `ansible-vault`](#encrypting-variables-with-ansible-vault), and the nextcloud section of your `inventory/host_vars/example.com/vars.yml` should look like follows:

```
hedgedoc_domain: hdoc.example.com
hedgedoc_db_password: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  <encrypted secret>
hedgedoc_session_secret: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  <encrypted secret>
```

## Running the playbook

To be able to run, ansible needs to:

- Know what playbook to run
- Know where to run it, with `-i inventory/production.ini`
- Be able to ssh into your server as your user
- Know your user password so it can escalate privileges with `sudo`, with the `-K` flag
- Know your vault password so it can decrypt secrets and use them when deploying services , with the `--ask-vault-password` flag

The final command to run is:

```sh
$ ansible-playbook services.yml -i inventory/production.ini -K --ask-vault-password
```

:::tip
Don't forget to [set up the DNS records](/deployment/get-ready-to-deploy#set-up-the-dns-records) before running the command.
:::
