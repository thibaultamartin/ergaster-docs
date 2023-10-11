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

TODO ssh-copy-id

## Host variables

The ansible playbook relies on host variables to configure the various services. This goes from specifying your domain name to more sensitive information such as database passwords. The latter can be encrypted at rest to be decrypted when playing the playbook.

To start creating host vars for your services server, create the `inventory/host_vars/services.example.com` directory and open a `vars.yml` inside it.

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

### Matrix variables

TODO

### Nextcloud variables

TODO

### Hedgedoc variables

TODO

### Authentik variables

TODO

## Running the playbook

To be able to run, ansible needs to:

- Know what playbook to run
- Know where to run it, with `-i inventory/production.ini`
- Be able to ssh into your server as your user
- Know your user password so it can escalate privileges with `sudo`, with the `-K` flag
- Know your vault password so it can decrypt secrets and use them when deploying services , with the `--ask-vault-password` flag

The final command to run is:

```
ansible-playbook services.yml -i inventory/production.ini -K --ask-vault-password
```
