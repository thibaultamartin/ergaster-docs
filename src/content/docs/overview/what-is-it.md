---
title: What is this about?
description: Those docs are not for a general purpose
sidebar:
    order: 10
---

This is the documentation of Thib's personal infrastructure. Disaster Recovery Plans include documentation about a setup that is as foolproof as possible. Since maintaining documentation is expensive, doing it collaboratively allows us to dillute the costs within the community.

## Is this for you?

This documents aims to be a comprehensive guide to deploy a _limited_ set of services _and maintain them in the long run_. It should be general purpose enough to help hobbyist with a basic understanding of Linux to get started and learn along the way.

By following this documentation you can learn to deploy your own self-hosted set of servers with a decent level of confidence that your are doing things right at your scale. It can help you grow your skills, and why not grow a career in the field.

:::tip
The "Deployment" section is meant to be a step-by-step guide to deploy the services on the servers. The concepts and rationale behind the choices are detailed in greater length in the "Learning the concepts" section.
:::

Keep in mind the techniques described in this documentation have self-hosting for individuals as a primary focus. Larger organisations will have different constraints, and require additional skills not described in this document.

:::caution
This documentation is provided as is without any guarantee of any kind. Its issues tracker is not meant for support.

**Always make sure you are confident that you really understand what you're doing before trusting your services with your data.**

Thib also [strongly advise against using this setup to provide services for others](https://ergaster.org/posts/2023/08/09-i-dont-want-to-host-services-but-i-do/). Use this documentation responsibly for your own growth.
:::

## Threat modeling

Nothing is secure forever, but please bear in mind that even if we pool knowledge in this document _you're a single person hosting services_. You are more likely to do mistake and to be vulnerable to attacks than a service provided by _Big Tech™_ that has a large security team and on-call SREs.

:::caution
Please **DO NOT** offer services you host as a single person to others who don't have at least the same understanding of the infrastructure and consequences as you do.

If you are an activist or a minority threatened by a large actor such as a government, please **DO NOT** use this setup. It follows the industry's best practices as much as possible, but it takes large security and SRE teams with advanced knowledge to give strong protections against such actors.
:::

This documentation is meant for people who want to learn how to deploy sturdy, sustainable services, as independent of the hardware as possible and for themselves. The major threats considered in this setup are

- Low effort mass surveillance (most notably [surveillance capitalism](https://en.wikipedia.org/wiki/Surveillance_capitalism))
- Script kiddies and automated trivial attacks
- Yourself, since you could lock yourself out of your infrastructure by losing your devices (or if they are stolen)

## Sharing the costs of documentation

The more people use a deployment similar to this one, the more this documentation takes value, the less expensive it is to maintain thanks to all the hobbyist bumping into rough corners and contributing fixes to it.

This documentation and the ansible playbooks should be generic enough for everyone to use them to deploy their own setup. You will see occasional "tip" callouts telling you what Thib is using, for the sake of providing a limited amount of examples.
