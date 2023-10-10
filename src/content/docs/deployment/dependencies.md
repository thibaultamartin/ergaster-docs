---
title: Dependencies
description: Getting your computer ready to deploy services
sidebar:
    order: 20
---

- git (to clone the infra repo)
- ansible (to deploy the services)
- requirements from ansible galaxy (so it can execute the playbooks)
- an IDE that supports ansible linting to edit your inventory, variables, secrets, and gets hints of where you might have done typos

:::tip
Thib is using VSCode to edit his playbooks. It supports the [Ansible plugin](https://marketplace.visualstudio.com/items?itemName=redhat.ansible), which comes with a linter and useful error messages.
:::
