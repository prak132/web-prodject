# Project Nebulus

[![CodeFactor](https://www.codefactor.io/repository/github/projectnebulus/projectnebulus/badge/main?s=984a8cc42046715d68584c438c428701c76bc2e9)](https://www.codefactor.io/repository/github/projectnebulus/projectnebulus/overview/main)

## Table of Contents

- [Setup (normal)](#setup-normal)
  - [Clone the Repository](#clone-the-repository)
  - [Install Python 3.10](#install-python-310)
    - [Install from python.org](#install-from-pythonorg)
    - [MacOS homebrew](#macos-homebrew)
    - [Linux](#linux)
  - [Install Poetry](#install-poetry)
  - [Install Dependencies](#install-dependencies)
  - [Run](#run)
- [Setup (docker)](#setup-docker)
- [Setup (Pre-hosted Website)](#website)

## Setting up (normal)

### Clone the Repository

```bash
$ git clone https://github.com/ProjectNebulus/ProjectNebulus.git [optional directory]
```

### Install Python 3.10

#### Install from [python.org](https://www.python.org/downloads/release/python-3100/)

#### MacOS ([homebrew](https://brew.sh/))

```bash
$ brew install python@3.10
```

#### Linux

## Ubuntu / Debian

```bash
$ sudo apt install python3
```

## Arch Linux

```bash
$ sudo pacman -S python3
```

## Other Distros

Install using poetry.

### [Install Poetry](https://python-poetry.org/docs/#installation)

### Install Dependencies

```bash
$ poetry install
```

### Run

```bash
$ poetry run python main.py
```

## Setup (docker)

You can grab the [pre-built version](https://github.com/ProjectNebulus/ProjectNebulus/actions/workflows/docker-image.yml) or build the docker container from scratch. You can build it just like any other docker container, but you **must** remember to turn off cache. The website should automatically start on port 8080. If you encounter any problems, file an issue.

## Website
Main Site [this link](https://beta.nebulus.ml/)!
Repl.it Site [this link](https://project-nebulus.nicholasxwang.repl.co/)!
