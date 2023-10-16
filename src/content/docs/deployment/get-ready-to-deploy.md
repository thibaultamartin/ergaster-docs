---
title: Get ready to deploy
description: Getting your computer ready to deploy services
sidebar:
    order: 20
---

The software we're installing is going to be on servers. Whether it's a [blade server](https://en.wikipedia.org/wiki/Blade_server), a [VPS](https://en.wikipedia.org/wiki/Virtual_private_server) or a [Raspberry Pi](https://www.raspberrypi.com/products/raspberry-pi-5/) that runs in your living room (which I strongly advise against), everything on the server can be considered as "remote".

You will need a laptop or a workstation from which you will perform the operations on your servers. Your laptop needs to be able to clone the "installation recipe" it will follow, it needs to be able to connect to the servers on your behalf, and it needs to be able to read and perform the installation recipe for you. The "recipe" is actually called a playbook, and that's the term we're going to use in the rest of the document.

:::tip
Ansible has some jargon that can be unsettling. Head out to [/learning/ansible](/learning/ansible/) to get a good idea of what ansible does and how the concepts are called.
:::

## Install git and clone the recipe

Install [git](https://git-scm.com/) on your laptop/workstation, and clone {{ TODO set up public repo }} using the following command

```shell
$ git clone {{ TODO set up public repo }}
```

## Install ansible

The repository you have cloned is an ansible playbook. To be able to execute it, you need to [install ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installing-and-upgrading-ansible).

## Install ansible modules

Ansible is able to do a lot of things on its own, but it relies on collections (i.e. modules) to support even more actions.
Make sure you're in the project's directory, and [install the collections from the requirements file](https://docs.ansible.com/ansible/latest/collections_guide/collections_installing.html#install-multiple-collections-with-a-requirements-file) with the following command

```sh
$ ansible-galaxy install -r requirements.yml
```

## Install an IDE

Ansible playbooks are nothing but yaml (or ini) files that can be edited by even the simplest text editors. There is value in getting a fully fledged IDE able to parse your playbooks, roles, inventories etc. If you introduce typos, use the wrong syntax, or misuse one of the modules, the IDE will be able to point out what is causing issues, saving you a lot of trouble.

:::tip
Thib is using VSCode to edit his playbooks. It supports the [Ansible plugin](https://marketplace.visualstudio.com/items?itemName=redhat.ansible), which comes with a linter and useful error messages.
:::
