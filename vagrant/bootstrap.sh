#!/usr/bin/env bash
set -ex

# install gnome gui for centos
yum groupinstall -y 'gnome desktop'
yum install -y 'xorg*'

# https://unix.stackexchange.com/questions/181009/gnome-license-not-accepted-issue-when-system-has-been-rebooted
yum remove -y initial-setup initial-setup-gui

# enable gui by default
systemctl isolate graphical.target
systemctl set-default graphical.target
