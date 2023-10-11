---
title: Get the servers
description: Provisioning the servers you need
sidebar:
    order: 10
---

- Can be a VPS, an EC2 instance on AWS, a baremetal server.
- Needs to run a recent Linux (of the RHEL/Rocky/CentOS family)
- At least one S3-compatible bucket, from a provider that support [Object Locks](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html) (so your backups can't get deleted if your server gets infected)

:::tip
Thib is running his infrastructure on VPS from [netcup.eu](https://netcup.eu) and storing backups on a bucket from [Scaleway](https://scaleway.com)
:::
