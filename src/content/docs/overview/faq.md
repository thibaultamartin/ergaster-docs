---
title: FAQ
description: Frequently Asked Questions
sidebar:
    order: 900
---

This documentation is rather opinionated. Since some questions are arising regularly, let's list them and their answer here.

## Why do you use RHEL?

The playbook I use for ergaster infra is only tested for [Red Hat Enterprise Linux (RHEL)](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux), the Linux distribution commercialised by Red Hat and that comes with a free tier for up to 16 machines. It should work decently well with [CentOS Stream](https://centos.org/), [Rocky Linux](https://rockylinux.org/) and [Alma Linux](https://almalinux.org/) as well.

I am using RHEL because I trust Red Hat as a provider. They sell support to large enterprises, usually test their software decently and have comprehensive documentation. Red Hat has also initiatived the Podman and Ansible projects which I rely extensively on. I generally trust them to release sturdy software I can trust.

## Can you add Debian/Arch/other support?

Ansible makes it possible to add support for Debian, Arch and other Linux distributions. Releasing this playbook comes with responsibility: despite all the warnings that it is provided as is, some people are going to blindly trust it. While I'm not responsible for others, I don't want to make it easier for them to do mistakes, especially when it comes to some of their most precious data.

I am releasing my playbook documentation publicly so others can benefit from it and contribute back if they see inaccuracies. The goal here is to lower the cost of documentation. If I made the playbook compatible witg Debian, Arch or others, I would need to test it for Debian, Arch, or other. This is significant overhead that I am not willing to spend for free.

## Can you add this new service?

Probably not. There are two reasons at play here.

The first one is that **I want to minimise the surface of attack of my server by exposing as few apps as possible, and as securely as possible**. Adding services to a deployment makes its complexity grow. While updates can be automated to a certain extent, it takes to handle major upgrades.

The second one is that **I want to make sure I understand what a service is doing before deploying it. I want to document it and implement the monitoring for it**. What is its normal behaviour? What should I keep an eye on? At what point should my server notify me that something is very wrong and it's time for me to have a serious look at it? All of this takes significant time. Sometimes, hosting a new service for the sake of it is not worth it.

:::tip
This guide is primarily meant for me, Thib. If you feel like you need to host another service and are confident you understand it well and can document it well, I encourage you [to fork this repo](https://github.com/thibaultamartin/ergaster-docs) and write your own docs!

You can keep this repo as an upstream and rebase your docs regularly.
:::

## Why Astro Starlight and not a wiki?

This documentation is primarily written for me, Thib. While it can be collaborative, I can't afford to let everyone edit it. I want to have a proper review process before merging the changes, and Pull Requests are a very good tool to review technical docs like this one, and [Astro Starlight](https://starlight.astro.build) is a very convenient tool to publish them quickly.

If you feel like a wiki is a better fit for your, you can reuse any information from this documentation to start yours. I'll be delighted to know this work inspired others!

## Isn't it ironic to host a self-hosting doc on Cloudflare Pages and GitHub?

I'd say it's quite the opposite. One of the purposes of this documentation is to have a guide I can read in panic mode when everything has gone south.

When my server is on fire, the last thing I want is to have to fight it to access to the docs to put the fires away. I picked CloudFlare Pages out of convenience, but other providers like GitHub Pages could work equally well.
