---
title: Technical overview
description: Understanding the architecture and the tech behind the deployment
sidebar:
    order: 20
---

This piece of documentation is inspired by the blog post [My Server Can Burn, My Services Will Run](https://ergaster.org/posts/2023/10/05-my-server-can-burn/).

## Goals and anti-goals

When it comes to self-hosting, services need to be sturdy, cheap & easy to maintain. They need few moving parts, and hardware needs to be considered as disposable and unreliable.

This documentation is meant for [_self_](https://ergaster.org/posts/2023/08/09-i-dont-want-to-host-services-but-i-do/) hosting. Scalability is not one a concern beyond regular capacity planning. No surges in use are to be expected, and this setup is not meant to scale suddenly.

Regular growth of the services is expected nonetheless. A typical example is Nextcloud: the amount of storage use is expected to grow.
We need to have a good idea of what is happening on our server to be ale to take action, through monitoring.

This setup includes a disposable staging environment that matches the production, where changes can be tested before deploying services in production. That staging environment needs to be disposable to avoid burning resources and money on it when it's not needed.

It needs to be easy to move services between servers. Restoring from backups needs to be as simple reasonably possible.

## Global architecture

Our setup should be fairly modular and it should be possible to run the various services on different servers seamlessly. The bare minimum is a single VPS, but the recommended minimal setup is to have a main "services" VPS, and a separate monitoring server.

The [backups need to be externalised to off-site](https://en.wikipedia.org/wiki/Disaster_recovery#Strategies) S3-compatible buckets. This means you need to have distinct providers for your servers and for your S3 bucket. Not only do these providers need to be different, they also need to be separated by a reasonsable distance. What represents a reaonsable distance (different city, country, continent…) is up to you.
