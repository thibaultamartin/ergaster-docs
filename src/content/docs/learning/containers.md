---
title: Containers
description: The shipping revolution applied to software
sidebar:
    order: 20
    badge:
        text: WIP
        variant: caution
---

:::caution
This section is a work in progress
:::

## Explain containers like I'm 5

Containers are a self-contained format that allows developers to package an app and all of its dependencies. The app has everything it needs to run, and the host operating system is completely abstracted from the application.

They are basically a virtual machine you ship with your appliation. In practice you're not _really_ shipping the operating system your VM relies on, but a base image plus an additional "layer" containing your app and its dependencies. This makes containers very easy to deploy either on servers on laptops, and very easy to update as well since you don't need to re-ship the base image on every update.

Containers are also stateless. That means they don't keep data over restarts. Fortunately for us, the data can be made persistent by using volumes and mapping them to directories inside the containers.

[This micronugget](https://www.youtube.com/watch?v=aLipr7tTuA4) is a great introduction to containers if you want to go a little further.

## Benefits over a regular app deployment

Containers solves the "works of my machine" problem: because you are shipping a tiny virtual machine with batteries included, you don't have to worry about making sure you have the right dependencies installed for your app to run.

Containers can take a bit more space than regular apps, but it's a trade off well worth it. You're trading a few extra megabytes of space against being to install an app on any linux distribution, that will have a consistent behaviour everywhere.

## Containers engines, containers runtimes

The TLDR is that containers engines are what you will interact with to manage your containers, while containers runtimes are the low level dependencies containers engines rely on. Most mainstream containers runtimes will be [OCI](https://opencontainers.org/) compliant.

To get a great glossary of containers, [this RedHat article is a fantastic resource](https://developers.redhat.com/blog/2018/02/22/container-terminology-practical-introduction).

## Podman is really great

## Passing info to the apps: environment variables

## Passing info to the engine: labels
